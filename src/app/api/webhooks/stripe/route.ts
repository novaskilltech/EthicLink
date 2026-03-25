import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/firebase-admin";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    // Determine plan from metadata (priceId or plan name)
    const plan = session.metadata.plan || "PRO";

    try {
      await db.collection("profiles").doc(session.metadata.userId).update({
        stripeId: session.customer as string,
        subscription: subscription.id,
        plan: plan,
      });
    } catch (e) {
      console.error("Firestore Update Error (Webhook):", e);
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    // Logic for recurring payments
    const subscriptionId = session.subscription as string;
    
    try {
      const snapshot = await db.collection("profiles")
        .where("subscription", "==", subscriptionId)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        await doc.ref.update({ plan: "PRO" });
      }
    } catch (e) {
      console.error("Firestore Update Error (Invoice):", e);
    }
  }

  return new NextResponse(null, { status: 200 });
}
