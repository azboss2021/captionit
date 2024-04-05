/* eslint-disable camelcase */
import { createTransaction } from "@/lib/actions";
import { PRODUCT_TYPE } from "@/lib/constants";
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();

  console.log(body);

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.LOCAL_STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, subscription, metadata } = event.data.object;

    if (subscription && PRODUCT_TYPE === "subscription") {
      const transaction = {
        stripeId: id,
        subscriptionId: subscription as string,
        amount: amount_total ? amount_total : 0,
        product: metadata?.product || "",
        buyerId: metadata?.buyerId || "",
        createdAt: new Date(),
      };

      const newTransaction = await createTransaction(transaction);

      return NextResponse.json({ message: "OK", transaction: newTransaction });
    } else if (PRODUCT_TYPE === "credits") {
      const transaction = {
        stripeId: id,
        amount: amount_total ? amount_total : 0,
        product: metadata?.product || "",
        credits: Number(metadata?.credits),
        buyerId: metadata?.buyerId || "",
        createdAt: new Date(),
      };

      const newTransaction = await createTransaction(transaction);

      return NextResponse.json({ message: "OK", transaction: newTransaction });
    } else if (PRODUCT_TYPE === "one_time") {
      const transaction = {
        stripeId: id,
        amount: amount_total ? amount_total : 0,
        product: metadata?.product || "",
        buyerId: metadata?.buyerId || "",
        createdAt: new Date(),
      };

      const newTransaction = await createTransaction(transaction);

      return NextResponse.json({ message: "OK", transaction: newTransaction });
    } else {
    }
  }

  return new Response("", { status: 200 });
}
