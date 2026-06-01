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
