import { z } from "zod";

export const insertInquirySchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  safari: z.string().optional().nullable(),
  message: z.string(),
});

export const insertBookingSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  safari: z.string().optional().nullable(),
  departureDate: z.string().optional().nullable(),
  returnDate: z.string().optional().nullable(),
  adults: z.number().optional().nullable(),
  children: z.number().optional().nullable(),
  message: z.string().optional().nullable(),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = InsertInquiry & { id: string; createdAt: Date | null };

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = InsertBooking & { id: string; createdAt: Date | null };
