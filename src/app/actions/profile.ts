"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";

async function getAuthUser() {
  return { uid: "test-user-id" };
}

export async function getProfile(userId: string) {
  const doc = await db.collection("profiles").doc(userId).get();
  if (!doc.exists) return null;
  return doc.data();
}

export async function updateProfile(data: any) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  try {
    await db.collection("profiles").doc(user.uid).set(data, { merge: true });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update profile" };
  }
}

export async function getPublicProfile(slug: string) {
  const snapshot = await db.collection("profiles").where("slug", "==", slug).limit(1).get();
  if (snapshot.empty) return null;
  
  const profile = snapshot.docs[0].data();
  const links = await db.collection("links")
    .where("uid", "==", profile.uid) // We'll need to ensure profile contains uid
    .where("active", "==", true)
    .orderBy("order", "asc")
    .get();
    
  return {
    ...profile,
    links: links.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  };
}
