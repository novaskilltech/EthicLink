"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { ThemeType, ButtonStyle } from "@/lib/types";

async function getAuthUser() {
  return { uid: "test-user-id" };
}

export async function updateTheme(
  data: { theme?: ThemeType; themeColor?: string; bgColor?: string; buttonStyle?: ButtonStyle },
  userId?: string
) {
  const user = await getAuthUser();
  const targetUid = userId || user?.uid;
  if (!targetUid) throw new Error("Unauthorized");

  try {
    const updateData: any = {};
    if (data.theme !== undefined) updateData.theme = data.theme;
    if (data.themeColor !== undefined) updateData.themeColor = data.themeColor;
    if (data.bgColor !== undefined) updateData.bgColor = data.bgColor;
    if (data.buttonStyle !== undefined) updateData.buttonStyle = data.buttonStyle;

    await db.collection("profiles").doc(targetUid).set(updateData, { merge: true });

    revalidatePath("/dashboard/appearance");
    revalidatePath("/[slug]", "page");
    return { success: true };
  } catch (error) {
    console.error("updateTheme Error:", error);
    return { error: "Failed to update theme" };
  }
}
