import { NextRequest, NextResponse } from "next/server";
import { insertBookingSchema } from "@/lib/schema";
import { storage } from "@/lib/storage";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = insertBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const booking = await storage.createBooking(parsed.data);
  return NextResponse.json(booking, { status: 201 });
}

export async function GET() {
  const bookings = await storage.getBookings();
  return NextResponse.json(bookings);
}
