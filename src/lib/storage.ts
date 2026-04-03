import { randomUUID } from "crypto";
import type { Inquiry, InsertInquiry, Booking, InsertBooking } from "./schema";

class MemStorage {
  private inquiries: Map<string, Inquiry>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.inquiries = new Map();
    this.bookings = new Map();
  }

  private generateBookingId(): string {
    // Format: PAWS + 6 random digits + 1 random letter
    const randomDigits = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `PAWS${randomDigits}${randomLetter}`;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = { ...insertInquiry, id, createdAt: new Date() };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.generateBookingId();
    const booking: Booking = { ...insertBooking, id, createdAt: new Date() };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
}

export const storage = new MemStorage();
