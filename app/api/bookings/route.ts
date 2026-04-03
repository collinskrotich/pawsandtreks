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
  
  // Send to n8n webhook if configured
  const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nWebhookUrl) {
    try {
      await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsed.data,
          submittedAt: new Date().toISOString(),
          bookingId: booking.id,
        }),
      });
    } catch (error) {
      console.error("Failed to send booking to n8n webhook:", error);
      // Don't fail the request if webhook fails
    }
  }
  
  return NextResponse.json(booking, { status: 201 });
}

export async function GET() {
  const bookings = await storage.getBookings();
  return NextResponse.json(bookings);
}
