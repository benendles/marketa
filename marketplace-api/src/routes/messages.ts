import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// GET /api/messages/conversations
router.get("/conversations", authenticate, async (req: AuthRequest, res) => {
  const conversations = await prisma.conversation.findMany({
    where: { participants: { some: { userId: req.userId } } },
    include: {
      participants: { include: { user: { select: { id: true, name: true, avatar: true } } } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      listing: { select: { id: true, title: true, images: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
  res.json(conversations);
});

// GET /api/messages/conversations/:id
router.get("/conversations/:id", authenticate, async (req: AuthRequest, res) => {
  const messages = await prisma.message.findMany({
    where: { conversationId: req.params.id },
    include: { sender: { select: { id: true, name: true, avatar: true } } },
    orderBy: { createdAt: "asc" },
  });
  await prisma.message.updateMany({
    where: { conversationId: req.params.id, receiverId: req.userId, isRead: false },
    data: { isRead: true },
  });
  res.json(messages);
});

// POST /api/messages — send a message
router.post("/", authenticate, async (req: AuthRequest, res) => {
  const { receiverId, content, listingId, conversationId } = req.body;
  let convoId = conversationId;
  if (!convoId) {
    const existing = await prisma.conversation.findFirst({
      where: { participants: { every: { userId: { in: [req.userId!, receiverId] } } } },
    });
    if (existing) {
      convoId = existing.id;
    } else {
      const newConvo = await prisma.conversation.create({
        data: { listingId, participants: { create: [{ userId: req.userId! }, { userId: receiverId }] } },
      });
      convoId = newConvo.id;
    }
  }
  const message = await prisma.message.create({
    data: { conversationId: convoId, senderId: req.userId!, receiverId, content },
    include: { sender: { select: { id: true, name: true, avatar: true } } },
  });
  await prisma.conversation.update({ where: { id: convoId }, data: { updatedAt: new Date() } });
  res.status(201).json(message);
});

export default router;
