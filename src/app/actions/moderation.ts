"use server";

import { db } from "@/lib/firebase-admin";

export async function createReport(data: {
  targetUid: string;
  targetSlug: string;
  reason: string;
  details?: string;
}) {
  if (!data.targetUid || !data.targetSlug || !data.reason) {
    return { success: false, error: "Champs requis manquants" };
  }

  try {
    await db.collection("reports").add({
      targetUid: data.targetUid,
      targetSlug: data.targetSlug,
      reason: data.reason,
      details: data.details || "",
      createdAt: new Date(),
      status: "pending"
    });

    return { success: true };
  } catch (error) {
    console.error("createReport Error:", error);
    return { success: false, error: "Erreur serveur lors de la soumission du signalement" };
  }
}
