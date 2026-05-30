import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorizedJsonResponse } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { updateGalleryImageSchema } from "@/lib/content-schema";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return unauthorizedJsonResponse();
  }

  const { id } = await context.params;
  const body = await request.json();
  const parsed = updateGalleryImageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const setClauses: string[] = [];
  const values: unknown[] = [];

  if (data.uploadthingKey !== undefined) {
    values.push(data.uploadthingKey);
    setClauses.push(`uploadthing_key = $${values.length}`);
  }
  if (data.url !== undefined) {
    values.push(data.url);
    setClauses.push(`url = $${values.length}`);
  }
  if (data.alt !== undefined) {
    values.push(data.alt);
    setClauses.push(`alt = $${values.length}`);
  }
  if (data.location !== undefined) {
    values.push(data.location);
    setClauses.push(`location = $${values.length}`);
  }
  if (data.sortOrder !== undefined) {
    values.push(data.sortOrder);
    setClauses.push(`sort_order = $${values.length}`);
  }
  if (data.isPublished !== undefined) {
    values.push(data.isPublished);
    setClauses.push(`is_published = $${values.length}`);
  }

  values.push(id);

  const { rows } = await db.query(
    `
      UPDATE gallery_images
      SET ${setClauses.join(", ")}, updated_at = now()
      WHERE id = $${values.length}
      RETURNING id, uploadthing_key, url, alt, location, sort_order, is_published, created_at, updated_at
    `,
    values
  );

  if (!rows[0]) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return unauthorizedJsonResponse();
  }

  const { id } = await context.params;

  const { rowCount } = await db.query("DELETE FROM gallery_images WHERE id = $1", [id]);

  if (!rowCount) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
