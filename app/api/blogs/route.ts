import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorizedJsonResponse } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { createBlogPostSchema } from "@/lib/content-schema";

export async function GET(request: NextRequest) {
  const publishedOnly = request.nextUrl.searchParams.get("published") === "true";

  const query = publishedOnly
    ? `
      SELECT id, slug, title, excerpt, content, cover_image_url, category, author, read_time, is_published, published_at, created_at, updated_at
      FROM blog_posts
      WHERE is_published = true
      ORDER BY COALESCE(published_at, created_at) DESC
    `
    : `
      SELECT id, slug, title, excerpt, content, cover_image_url, category, author, read_time, is_published, published_at, created_at, updated_at
      FROM blog_posts
      ORDER BY created_at DESC
    `;

  const { rows } = await db.query(query);
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorizedJsonResponse();
  }

  const body = await request.json();
  const parsed = createBlogPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const {
    slug,
    title,
    excerpt,
    content,
    coverImageUrl,
    category,
    author,
    readTime,
    isPublished,
    publishedAt,
  } = parsed.data;

  const effectivePublishedAt = isPublished ? publishedAt ?? new Date().toISOString() : null;

  const { rows } = await db.query(
    `
      INSERT INTO blog_posts (slug, title, excerpt, content, cover_image_url, category, author, read_time, is_published, published_at)
      VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7, $8, $9, $10)
      RETURNING id, slug, title, excerpt, content, cover_image_url, category, author, read_time, is_published, published_at, created_at, updated_at
    `,
    [
      slug,
      title,
      excerpt,
      JSON.stringify(content),
      coverImageUrl ?? null,
      category,
      author,
      readTime ?? null,
      isPublished,
      effectivePublishedAt,
    ]
  );

  return NextResponse.json(rows[0], { status: 201 });
}
