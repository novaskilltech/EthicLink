"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { LayoutPreset } from "@/lib/types";

async function getAuthUser() {
  return { uid: "test-user-id" };
}

export async function getAppearance() {
  const user = await getAuthUser();
  if (!user) return LayoutPreset.STACK_VERTICAL;

  const doc = await db.collection("profiles").doc(user.uid).get();
  const profile = doc.data();

  return profile?.layoutPreset ?? LayoutPreset.STACK_VERTICAL;
}

export async function updateAppearance(data: { layoutPreset: LayoutPreset }) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  try {
    await db.collection("profiles").doc(user.uid).set({
      layoutPreset: data.layoutPreset
    }, { merge: true });

    revalidatePath("/dashboard/appearance");
    revalidatePath("/[slug]");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update appearance" };
  }
}
