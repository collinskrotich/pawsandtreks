import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";

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

  return httpServer;
}
