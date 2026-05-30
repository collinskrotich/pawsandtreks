import { readFileSync } from "node:fs";
import pg from "pg";

function extractArrayLiteral(source, variableName) {
  const pattern = new RegExp(`const\\s+${variableName}\\s*:[^=]*=\\s*\\[([\\s\\S]*?)\\];`);
  const match = source.match(pattern);
  if (!match) {
    throw new Error(`Could not find array for ${variableName}`);
  }

  return Function(`return ([${match[1]}]);`)();
}

function parseDateOrNull(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const gallerySource = readFileSync("./app/gallery/page.tsx", "utf8");
  const blogSource = readFileSync("./app/blog/page.tsx", "utf8");

  const allImages = extractArrayLiteral(gallerySource, "allImages");
  const blogPosts = extractArrayLiteral(blogSource, "blogPosts");

  const client = new pg.Client({ connectionString: dbUrl });
  await client.connect();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM gallery_images");
    await client.query("DELETE FROM blog_posts");

    for (let i = 0; i < allImages.length; i += 1) {
      const item = allImages[i];
      await client.query(
        `
          INSERT INTO gallery_images (uploadthing_key, url, alt, location, sort_order, is_published)
          VALUES ($1, $2, $3, $4, $5, true)
        `,
        [`seed-${i + 1}`, item.src, item.alt, item.location, i]
      );
    }

    for (const post of blogPosts) {
      await client.query(
        `
          INSERT INTO blog_posts (
            slug,
            title,
            excerpt,
            content,
            cover_image_url,
            category,
            author,
            read_time,
            is_published,
            published_at
          )
          VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7, $8, true, $9)
        `,
        [
          post.id,
          post.title,
          post.excerpt,
          JSON.stringify(post.content),
          post.image,
          post.category,
          post.author,
          post.readTime,
          parseDateOrNull(post.date),
        ]
      );
    }

    await client.query("COMMIT");
    console.log(`Seed complete: ${allImages.length} gallery images, ${blogPosts.length} blog posts.`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
