"use server";

import { db } from "@/lib/firebase-admin";
import { revalidatePath } from "next/cache";
import { LinkItem } from "@/lib/types";

// Helper to get authenticated user (Stub for MVP)
async function getAuthUser() {
  return { uid: "test-user-id" }; 
}

export async function getLinks(userId?: string) {
  try {
    const id = userId || (await getAuthUser())?.uid;
    if (!id) return [];

    const snapshot = await db.collection("links")
      .where("uid", "==", id)
      .get();
    
    return snapshot.docs
      .map((doc: any) => ({ id: doc.id, ...doc.data() }))
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) as LinkItem[];
  } catch (error) {
    console.error("Firestore getLinks Error:", error);
    return [];
  }
}

async function fetchOpenGraphImage(targetUrl: string): Promise<string> {
  if (!targetUrl) return "";
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept": "text/html"
      }
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) return "";
    const html = await res.text();

    // 1. Try OpenGraph image
    const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    if (ogMatch && ogMatch[1]) {
      return resolveUrl(ogMatch[1], targetUrl);
    }

    // 2. Try Twitter image
    const twitterMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
                         html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i);
    if (twitterMatch && twitterMatch[1]) {
      return resolveUrl(twitterMatch[1], targetUrl);
    }

    // 3. Try standard shortcut icon or icon
    const iconMatch = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i) ||
                      html.match(/<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i);
    if (iconMatch && iconMatch[1]) {
      return resolveUrl(iconMatch[1], targetUrl);
    }

    // Fallback: domain-based favicon
    const parsed = new URL(targetUrl);
    return `${parsed.protocol}//${parsed.host}/favicon.ico`;
  } catch (error) {
    console.error("fetchOpenGraphImage Error:", error);
    try {
      const parsed = new URL(targetUrl);
      return `${parsed.protocol}//${parsed.host}/favicon.ico`;
    } catch {
      return "";
    }
  }
}

function resolveUrl(url: string, base: string): string {
  try {
    return new URL(url, base).toString();
  } catch {
    return url;
  }
}

export async function addLink(data: { label: string; url: string; description?: string; thumbnailUrl?: string }, userId?: string) {
  const user = await getAuthUser();
  const targetUid = userId || user?.uid;
  if (!targetUid) throw new Error("Unauthorized");

  try {
    const count = (await db.collection("links").where("uid", "==", targetUid).count().get()).data().count;
    
    let finalThumbnail = data.thumbnailUrl || "";
    if (!finalThumbnail && data.url) {
      finalThumbnail = await fetchOpenGraphImage(data.url);
    }

    await db.collection("links").add({
      uid: targetUid,
      label: data.label,
      url: data.url,
      description: data.description || "",
      thumbnailUrl: finalThumbnail,
      order: count,
      active: true,
      createdAt: new Date().toISOString(),
    });

    revalidatePath("/dashboard/links");
    revalidatePath("/[slug]");
    return { success: true };
  } catch (error) {
    console.error("AddLink Error:", error);
    return { error: "Failed to add link" };
  }
}

export async function updateLink(id: string, data: Partial<LinkItem>) {
  try {
    const updateData: any = {};
    if (data.label !== undefined) updateData.label = data.label;
    if (data.url !== undefined) updateData.url = data.url;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.thumbnailUrl !== undefined) updateData.thumbnailUrl = data.thumbnailUrl;
    if (data.active !== undefined) updateData.active = data.active;
    if (data.order !== undefined) updateData.order = data.order;

    // If URL is changing and no new custom thumbnail is provided, try to scrape it
    if (data.url && !data.thumbnailUrl) {
      const currentDoc = await db.collection("links").doc(id).get();
      const currentData = currentDoc.data();
      if (!currentData?.thumbnailUrl) {
        updateData.thumbnailUrl = await fetchOpenGraphImage(data.url);
      }
    }

    await db.collection("links").doc(id).update(updateData);
    
    revalidatePath("/dashboard/links");
    revalidatePath("/[slug]");
    return { success: true };
  } catch (error) {
    console.error("UpdateLink Error:", error);
    return { error: "Failed to update link" };
  }
}

export async function toggleLinkActive(id: string, active: boolean) {
  try {
    await db.collection("links").doc(id).update({ active });
    revalidatePath("/dashboard/links");
    revalidatePath("/[slug]");
    return { success: true };
  } catch (error) {
    console.error("ToggleLinkActive Error:", error);
    return { error: "Failed to toggle link status" };
  }
}

export async function deleteLink(id: string) {
  try {
    await db.collection("links").doc(id).delete();
    revalidatePath("/dashboard/links");
    return { success: true };
  } catch (error) {
    console.error("DeleteLink Error:", error);
    return { error: "Failed to delete link" };
  }
}

export async function reorderLinks(items: { id: string; order: number }[]) {
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
