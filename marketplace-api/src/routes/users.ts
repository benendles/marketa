import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// GET /api/users/:id — public profile
router.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: { id: true, name: true, avatar: true, bio: true, location: true, role: true, isVerified: true, createdAt: true, listings: { where: { isActive: true }, take: 6 }, reviewsReceived: { include: { reviewer: { select: { id: true, name: true, avatar: true } } }, take: 10 } },
  });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

// PATCH /api/users/me — update own profile
router.patch("/me", authenticate, async (req: AuthRequest, res) => {
  const { name, bio, location, avatar } = req.body;
  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { name, bio, location, avatar },
    select: { id: true, name: true, email: true, avatar: true, bio: true, location: true, role: true, isVerified: true },
  });
  res.json(user);
});

export default router;
