"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { Profile } from "@/lib/types";

async function getAuthUser() {
  return { uid: "test-user-id" };
}

export async function getProfile(userId?: string) {
  const id = userId || (await getAuthUser())?.uid;
  if (!id) return null;

  try {
    const doc = await db.collection("profiles").doc(id).get();
    if (!doc.exists) return null;
    return doc.data() as Profile;
  } catch (error) {
    console.error("getProfile Error:", error);
    return null;
  }
}

export async function updateProfile(data: any, userId?: string) {
  const user = await getAuthUser();
  const targetUid = userId || user?.uid;
  if (!targetUid) throw new Error("Unauthorized");

  try {
    const updateData = { ...data };
    if (updateData.avatarUrl !== undefined) {
      updateData.image = updateData.avatarUrl;
    } else if (updateData.image !== undefined) {
      updateData.avatarUrl = updateData.image;
    }

    await db.collection("profiles").doc(targetUid).set(updateData, { merge: true });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("updateProfile Error:", error);
    return { error: "Failed to update profile" };
  }
}

export async function getPublicProfile(slug: string) {
  try {
    const snapshot = await db.collection("profiles").where("slug", "==", slug).limit(1).get();
    if (snapshot.empty) return null;
    
    const profile = snapshot.docs[0].data();
    const linksSnapshot = await db.collection("links")
      .where("uid", "==", profile.uid)
      .get();
      
    const links = linksSnapshot.docs
      .map((doc: any) => ({ id: doc.id, ...doc.data() }))
      .filter((link: any) => link.active === true)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      
    return {
      ...profile,
      links
    };
  } catch (error) {
    console.error("getPublicProfile Error:", error);
    return null;
  }
}

export async function getProfileAnalytics(slug: string) {
  if (!slug) return { views: 0, clicks: 0, ctr: "0.0%", dailyClicks: [0, 0, 0, 0, 0, 0, 0] };

  try {
    const snapshot = await db.collection("analytics")
      .where("pageId", "==", slug)
      .get();

    let views = 0;
    let clicks = 0;

    const dailyClicks = [0, 0, 0, 0, 0, 0, 0]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
    const now = new Date();
    const last7DaysLimit = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    snapshot.docs.forEach((doc: any) => {
      const data = doc.data();
      if (data.type === "PAGE_VIEW") {
        views++;
      } else if (data.type === "LINK_CLICK") {
        clicks++;
        if (data.timestamp) {
          const date = new Date(data.timestamp);
          if (date >= last7DaysLimit) {
            const jsDay = date.getDay();
            const index = jsDay === 0 ? 6 : jsDay - 1;
            dailyClicks[index] = (dailyClicks[index] || 0) + 1;
          }
        }
      }
    });

    const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) + "%" : "0.0%";

    return {
      views,
      clicks,
      ctr,
      dailyClicks
    };
  } catch (error) {
    console.error("getProfileAnalytics Error:", error);
    return { views: 0, clicks: 0, ctr: "0.0%", dailyClicks: [0, 0, 0, 0, 0, 0, 0] };
  }
}

export async function resetProfileAnalytics(slug: string) {
  if (!slug) return { success: false, error: "Slug requis" };
  try {
    const snapshot = await db.collection("analytics")
      .where("pageId", "==", slug)
      .get();

    const batch = db.batch();
    snapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("resetProfileAnalytics Error:", error);
    return { success: false, error: "Failed to reset analytics" };
  }
}

