import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorizedJsonResponse } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { updateBlogPostSchema } from "@/lib/content-schema";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return unauthorizedJsonResponse();
  }

  const { id } = await context.params;
  const body = await request.json();
  const parsed = updateBlogPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const setClauses: string[] = [];
  const values: unknown[] = [];

  const addField = (column: string, value: unknown, useJsonCast = false) => {
    values.push(value);
    setClauses.push(`${column} = $${values.length}${useJsonCast ? "::jsonb" : ""}`);
  };

  if (data.slug !== undefined) addField("slug", data.slug);
  if (data.title !== undefined) addField("title", data.title);
  if (data.excerpt !== undefined) addField("excerpt", data.excerpt);
  if (data.content !== undefined) addField("content", JSON.stringify(data.content), true);
  if (data.coverImageUrl !== undefined) addField("cover_image_url", data.coverImageUrl);
  if (data.category !== undefined) addField("category", data.category);
  if (data.author !== undefined) addField("author", data.author);
  if (data.readTime !== undefined) addField("read_time", data.readTime);
  if (data.isPublished !== undefined) addField("is_published", data.isPublished);
  if (data.publishedAt !== undefined) addField("published_at", data.publishedAt);

  values.push(id);

  const { rows } = await db.query(
    `
      UPDATE blog_posts
      SET ${setClauses.join(", ")}, updated_at = now()
      WHERE id = $${values.length}
      RETURNING id, slug, title, excerpt, content, cover_image_url, category, author, read_time, is_published, published_at, created_at, updated_at
    `,
    values
  );

  if (!rows[0]) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
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

  const { rowCount } = await db.query("DELETE FROM blog_posts WHERE id = $1", [id]);

  if (!rowCount) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
