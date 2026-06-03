import { Router } from "express";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });

// POST /api/payments/intent — create a Stripe Payment Intent
router.post("/intent", authenticate, async (req: AuthRequest, res) => {
  const { bookingId } = req.body;
  const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { listing: true } });
  if (!booking || booking.buyerId !== req.userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(booking.totalAmount * 100), // cents
    currency: "usd",
    metadata: { bookingId, buyerId: req.userId! },
  });
  res.json({ clientSecret: intent.client_secret });
});

// POST /api/payments/webhook — Stripe webhook handler
router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    res.status(400).send("Webhook signature verification failed");
    return;
  }
  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const { bookingId } = intent.metadata;
    await prisma.payment.create({
      data: {
        bookingId,
        amount: intent.amount / 100,
        stripePaymentId: intent.id,
        status: "succeeded",
      },
    });
    await prisma.booking.update({ where: { id: bookingId }, data: { status: "CONFIRMED" } });
  }
  res.json({ received: true });
});

export default router;
