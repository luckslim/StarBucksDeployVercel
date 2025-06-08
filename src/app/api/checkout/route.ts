import { stripe } from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const cart = body.cart;

  const line_items = cart.map((item: any) => ({
    price: item.idStripe,
    quantity: item.quantity,
  }));

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `https://star-bucks-deploy-vercel.vercel.app/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://star-bucks-deploy-vercel.vercel.app`,
    mode: "payment",
    line_items,
  });

  return NextResponse.json({ checkoutUrl: checkoutSession.url });
}
