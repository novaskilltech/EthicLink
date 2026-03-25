"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { ThemeType } from "@/lib/types";

async function getAuthUser() {
  return { uid: "test-user-id" };
}

export async function updateTheme(theme: ThemeType) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  try {
    await db.collection("profiles").doc(user.uid).set({
      theme: theme
    }, { merge: true });

    revalidatePath("/dashboard/appearance");
    revalidatePath("/[slug]");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update theme" };
  }
}
