import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth";
import listingsRoutes from "./routes/listings";
import bookingsRoutes from "./routes/bookings";
import usersRoutes from "./routes/users";
import messagesRoutes from "./routes/messages";
import paymentsRoutes from "./routes/payments";
import notificationsRoutes from "./routes/notifications";
import adminRoutes from "./routes/admin";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.io for real-time chat
const io = new SocketServer(httpServer, {
  cors: { origin: process.env.CLIENT_URL ?? "http://localhost:3000", credentials: true },
});

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api", limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Socket.io – real-time chat
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("join_conversation", (conversationId: string) => {
    socket.join(conversationId);
  });

  socket.on("send_message", (data: { conversationId: string; message: object }) => {
    io.to(data.conversationId).emit("new_message", data.message);
  });

  socket.on("typing", (data: { conversationId: string; userId: string }) => {
    socket.to(data.conversationId).emit("user_typing", data.userId);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT ?? 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Marketa API running on http://localhost:${PORT}`);
});

export { io };
