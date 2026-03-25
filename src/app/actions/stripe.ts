"use server";

import { db } from "@/lib/firebase-admin";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

// Helper to get authenticated user (Stub for MVP)
async function getAuthUser() {
  return { uid: "test-user-id", email: "test@example.com" };
}

export async function createCheckoutSession(priceId: string) {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

  const origin = (await headers()).get("origin");

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${origin}/dashboard?success=true`,
    cancel_url: `${origin}/dashboard?canceled=true`,
    metadata: {
      userId: user.uid,
    },
  });

  return { url: session.url };
}

export async function getSubscriptionStatus() {
  const user = await getAuthUser();
  if (!user) return "free";

  const doc = await db.collection("profiles").doc(user.uid).get();
  return doc.data()?.plan || "free";
}
