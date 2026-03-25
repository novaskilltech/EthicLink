"use server";

import { db } from "./firebase-admin";

export async function trackPageView(pageId: string) {
  try {
    await db.collection("analytics").add({
      pageId,
      type: "PAGE_VIEW",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to track page view (Firestore):", error);
  }
}

export async function trackLinkClick(pageId: string, linkItemId: string) {
  try {
    await db.collection("analytics").add({
      pageId,
      linkItemId,
      type: "LINK_CLICK",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to track link click (Firestore):", error);
  }
}
