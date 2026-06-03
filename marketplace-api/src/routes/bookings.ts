import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

const bookingSchema = z.object({
  listingId: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

// GET /api/bookings/mine
router.get("/mine", authenticate, async (req: AuthRequest, res) => {
  const bookings = await prisma.booking.findMany({
    where: { OR: [{ buyerId: req.userId }, { sellerId: req.userId }] },
    include: { listing: { select: { id: true, title: true, images: true, price: true } }, buyer: { select: { id: true, name: true, avatar: true } }, seller: { select: { id: true, name: true, avatar: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(bookings);
});

// POST /api/bookings
router.post("/", authenticate, async (req: AuthRequest, res) => {
  const result = bookingSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  const listing = await prisma.listing.findUnique({ where: { id: result.data.listingId } });
  if (!listing || !listing.isActive) {
    res.status(404).json({ error: "Listing not available" });
    return;
  }
  if (listing.sellerId === req.userId) {
    res.status(400).json({ error: "Cannot book your own listing" });
    return;
  }
  const booking = await prisma.booking.create({
    data: {
      listingId: result.data.listingId,
      buyerId: req.userId!,
      sellerId: listing.sellerId,
      startDate: new Date(result.data.startDate),
      endDate: result.data.endDate ? new Date(result.data.endDate) : undefined,
      notes: result.data.notes,
      totalAmount: listing.price,
    },
    include: { listing: true, buyer: { select: { id: true, name: true } }, seller: { select: { id: true, name: true } } },
  });
  res.status(201).json(booking);
});

// PATCH /api/bookings/:id/status
router.patch("/:id/status", authenticate, async (req: AuthRequest, res) => {
  const { status } = req.body;
  const allowed = ["CONFIRMED", "CANCELLED", "COMPLETED"];
  if (!allowed.includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }
  const booking = await prisma.booking.findUnique({ where: { id: req.params.id } });
  if (!booking) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (booking.buyerId !== req.userId && booking.sellerId !== req.userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const updated = await prisma.booking.update({ where: { id: req.params.id }, data: { status } });
  res.json(updated);
});

export default router;
