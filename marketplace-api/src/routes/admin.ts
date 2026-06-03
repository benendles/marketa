import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, requireAdmin, AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

router.use(authenticate, requireAdmin);

// GET /api/admin/stats
router.get("/stats", async (_req, res) => {
  const [totalUsers, totalListings, totalBookings, payments] = await Promise.all([
    prisma.user.count(),
    prisma.listing.count(),
    prisma.booking.count(),
    prisma.payment.aggregate({ _sum: { amount: true } }),
  ]);
  res.json({
    totalUsers,
    totalListings,
    totalBookings,
    totalRevenue: payments._sum.amount ?? 0,
  });
});

// GET /api/admin/users
router.get("/users", async (req, res) => {
  const { page = "1", limit = "20" } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const [users, total] = await Promise.all([
    prisma.user.findMany({ skip, take: Number(limit), orderBy: { createdAt: "desc" }, select: { id: true, name: true, email: true, role: true, isVerified: true, isSuspended: true, createdAt: true } }),
    prisma.user.count(),
  ]);
  res.json({ data: users, total, page: Number(page) });
});

// PATCH /api/admin/users/:id/suspend
router.patch("/users/:id/suspend", async (req, res) => {
  const { isSuspended } = req.body;
  const user = await prisma.user.update({ where: { id: req.params.id }, data: { isSuspended } });
  res.json(user);
});

// PATCH /api/admin/listings/:id/feature
router.patch("/listings/:id/feature", async (req, res) => {
  const { isFeatured } = req.body;
  const listing = await prisma.listing.update({ where: { id: req.params.id }, data: { isFeatured } });
  res.json(listing);
});

// DELETE /api/admin/listings/:id
router.delete("/listings/:id", async (req, res) => {
  await prisma.listing.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export default router;
