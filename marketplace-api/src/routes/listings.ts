import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

const listingSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string(),
  condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR", "POOR"]),
  location: z.string(),
  images: z.array(z.string().url()).min(1),
  tags: z.array(z.string()).optional(),
});

// GET /api/listings — browse with filters
router.get("/", async (req, res) => {
  const { query, category, condition, minPrice, maxPrice, sortBy, page = "1", limit = "20" } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: Record<string, unknown> = { isActive: true };
  if (query) where.OR = [{ title: { contains: String(query), mode: "insensitive" } }, { description: { contains: String(query), mode: "insensitive" } }];
  if (category) where.category = String(category);
  if (condition) where.condition = String(condition);
  if (minPrice || maxPrice) where.price = { gte: minPrice ? Number(minPrice) : undefined, lte: maxPrice ? Number(maxPrice) : undefined };

  const orderBy: Record<string, string> = {};
  if (sortBy === "price_asc") orderBy.price = "asc";
  else if (sortBy === "price_desc") orderBy.price = "desc";
  else orderBy.createdAt = "desc";

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({ where, orderBy, skip, take: Number(limit), include: { seller: { select: { id: true, name: true, avatar: true, isVerified: true, rating: true } } } }),
    prisma.listing.count({ where }),
  ]);

  res.json({ data: listings, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
});

// GET /api/listings/:id
router.get("/:id", async (req, res) => {
  const listing = await prisma.listing.findUnique({
    where: { id: req.params.id },
    include: { seller: { select: { id: true, name: true, avatar: true, isVerified: true, rating: true, bio: true, createdAt: true } }, reviews: { include: { reviewer: { select: { id: true, name: true, avatar: true } } } } },
  });
  if (!listing) {
    res.status(404).json({ error: "Listing not found" });
    return;
  }
  // Increment views
  await prisma.listing.update({ where: { id: req.params.id }, data: { views: { increment: 1 } } });
  res.json(listing);
});

// POST /api/listings (auth required)
router.post("/", authenticate, async (req: AuthRequest, res) => {
  const result = listingSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }
  const listing = await prisma.listing.create({
    data: { ...result.data, sellerId: req.userId!, tags: result.data.tags ?? [] },
  });
  res.status(201).json(listing);
});

// PATCH /api/listings/:id (auth required, must be owner)
router.patch("/:id", authenticate, async (req: AuthRequest, res) => {
  const listing = await prisma.listing.findUnique({ where: { id: req.params.id } });
  if (!listing) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (listing.sellerId !== req.userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  const updated = await prisma.listing.update({ where: { id: req.params.id }, data: req.body });
  res.json(updated);
});

// DELETE /api/listings/:id (auth required, must be owner)
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  const listing = await prisma.listing.findUnique({ where: { id: req.params.id } });
  if (!listing || listing.sellerId !== req.userId) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  await prisma.listing.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
