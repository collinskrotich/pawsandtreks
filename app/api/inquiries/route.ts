import { NextRequest, NextResponse } from "next/server";
import { insertInquirySchema } from "@/lib/schema";
import { storage } from "@/lib/storage";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = insertInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  
  const inquiry = await storage.createInquiry(parsed.data);
  
  // Send to n8n webhook if configured
  const n8nWebhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
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
          inquiryId: inquiry.id,
        }),
      });
    } catch (error) {
      console.error("Failed to send inquiry to n8n webhook:", error);
      // Don't fail the request if webhook fails
    }
  }
  
  return NextResponse.json(inquiry, { status: 201 });
}

export async function GET() {
  const inquiries = await storage.getInquiries();
  return NextResponse.json(inquiries);
}
