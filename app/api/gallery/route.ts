import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorizedJsonResponse } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { createGalleryImageSchema } from "@/lib/content-schema";

export async function GET(request: NextRequest) {
  const publishedOnly = request.nextUrl.searchParams.get("published") === "true";

  const query = publishedOnly
    ? `
      SELECT id, uploadthing_key, url, alt, location, sort_order, is_published, created_at, updated_at
      FROM gallery_images
      WHERE is_published = true
      ORDER BY sort_order ASC, created_at DESC
    `
    : `
      SELECT id, uploadthing_key, url, alt, location, sort_order, is_published, created_at, updated_at
      FROM gallery_images
      ORDER BY sort_order ASC, created_at DESC
    `;

  const { rows } = await db.query(query);
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorizedJsonResponse();
  }

  const body = await request.json();
  const parsed = createGalleryImageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { uploadthingKey, url, alt, location, sortOrder, isPublished } = parsed.data;

  const { rows } = await db.query(
    `
      INSERT INTO gallery_images (uploadthing_key, url, alt, location, sort_order, is_published)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, uploadthing_key, url, alt, location, sort_order, is_published, created_at, updated_at
    `,
    [uploadthingKey, url, alt, location, sortOrder, isPublished]
  );

  return NextResponse.json(rows[0], { status: 201 });
}
