"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { LayoutPreset } from "@/lib/types";

async function getAuthUser() {
  return { uid: "test-user-id" };
}

export async function getAppearance(userId?: string) {
  const id = userId || (await getAuthUser())?.uid;
  if (!id) return LayoutPreset.STACK_VERTICAL;

  try {
    const doc = await db.collection("profiles").doc(id).get();
    const profile = doc.data();
    return profile?.layoutPreset ?? LayoutPreset.STACK_VERTICAL;
  } catch (error) {
    console.error("getAppearance Error:", error);
    return LayoutPreset.STACK_VERTICAL;
  }
}

export async function updateAppearance(data: { layoutPreset: LayoutPreset }, userId?: string) {
  const user = await getAuthUser();
  const targetUid = userId || user?.uid;
  if (!targetUid) throw new Error("Unauthorized");

  try {
    await db.collection("profiles").doc(targetUid).set({
      layoutPreset: data.layoutPreset
    }, { merge: true });

    revalidatePath("/dashboard/appearance");
    revalidatePath("/[slug]", "page");
    return { success: true };
  } catch (error) {
    console.error("updateAppearance Error:", error);
    return { error: "Failed to update appearance" };
  }
}
