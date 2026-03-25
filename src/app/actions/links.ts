"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

// Helper to get authenticated user (Stub for MVP)
async function getAuthUser() {
  // TODO: Implement actual session verification from cookies
  return { uid: "test-user-id" }; 
}

export async function getLinks(userId: string) {
  try {
    const snapshot = await db.collection("links")
      .where("uid", "==", userId)
      .orderBy("order", "asc")
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore getLinks Error:", error);
    return [];
  }
}

export async function addLink(data: { label: string; url: string }) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  try {
    const count = (await db.collection("links").where("uid", "==", user.uid).count().get()).data().count;
    
    await db.collection("links").add({
      uid: user.uid,
      label: data.label,
      url: data.url,
      order: count,
      active: true,
      createdAt: new Date().toISOString(),
    });

    revalidatePath("/dashboard/links");
    return { success: true };
  } catch (error) {
    console.error("AddLink Error:", error);
    return { error: "Failed to add link" };
  }
}


export async function deleteLink(id: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  try {
    await db.collection("links").doc(id).delete();
    revalidatePath("/dashboard/links");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete link" };
  }
}

export async function reorderLinks(items: { id: string; order: number }[]) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  try {
    const batch = db.batch();
    items.forEach(item => {
      const ref = db.collection("links").doc(item.id);
      batch.update(ref, { order: item.order });
    });

    await batch.commit();
    revalidatePath("/dashboard/links");
  } catch (error) {
    console.error("Reorder Error:", error);
  }
}
