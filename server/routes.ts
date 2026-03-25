import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertBookingSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/inquiries", async (req, res) => {
    const parsed = insertInquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const inquiry = await storage.createInquiry(parsed.data);
    return res.status(201).json(inquiry);
  });

  app.get("/api/inquiries", async (_req, res) => {
    const inquiries = await storage.getInquiries();
    return res.json(inquiries);
  });

  app.post("/api/bookings", async (req, res) => {
    const parsed = insertBookingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const booking = await storage.createBooking(parsed.data);
    return res.status(201).json(booking);
  });

  app.get("/api/bookings", async (_req, res) => {
    const bookings = await storage.getBookings();
    return res.json(bookings);
  });

  return httpServer;
}
