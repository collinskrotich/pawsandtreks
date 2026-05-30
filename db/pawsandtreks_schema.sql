-- Paws & Treks content schema
-- Safe to run multiple times.

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Core table requested by user
CREATE TABLE IF NOT EXISTS public.pawsandtreks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'Paws & Treks',
  site_slug TEXT NOT NULL UNIQUE DEFAULT 'pawsandtreks',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Uploaded gallery images (UploadThing metadata + publish state)
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploadthing_key TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  location TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gallery_images_published ON public.gallery_images (is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_images_location ON public.gallery_images (location);
CREATE INDEX IF NOT EXISTS idx_gallery_images_sort_order ON public.gallery_images (sort_order, created_at DESC);

-- Blog posts managed from admin page
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  cover_image_url TEXT,
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Paws & Treks Team',
  read_time TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT blog_posts_content_is_array CHECK (jsonb_typeof(content) = 'array')
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts (created_at DESC);

COMMIT;
