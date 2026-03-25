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
  return NextResponse.json(inquiry, { status: 201 });
}

export async function GET() {
  const inquiries = await storage.getInquiries();
  return NextResponse.json(inquiries);
}
