import { z } from "zod";

const absoluteOrRelativeImagePath = z
  .string()
  .trim()
  .refine((value) => {
    if (value.startsWith("/")) {
      return true;
    }

    return z.string().url().safeParse(value).success;
  }, "Cover image must be an absolute URL or a relative path starting with '/'");

export const createGalleryImageSchema = z.object({
  uploadthingKey: z.string().min(1),
  url: z.string().url(),
  alt: z.string().min(2),
  location: z.string().min(2),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const updateGalleryImageSchema = createGalleryImageSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  "At least one field is required"
);

export const createBlogPostSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.array(z.string()).min(1),
  coverImageUrl: absoluteOrRelativeImagePath.optional().nullable(),
  category: z.string().min(2),
  author: z.string().min(2).default("Paws & Treks Team"),
  readTime: z.string().optional().nullable(),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().nullable(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  "At least one field is required"
);
