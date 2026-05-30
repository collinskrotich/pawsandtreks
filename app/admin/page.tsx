"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type GalleryRow = {
  id: string;
  uploadthing_key: string;
  url: string;
  alt: string;
  location: string;
  sort_order: number;
  is_published: boolean;
};

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  cover_image_url: string | null;
  category: string;
  author: string;
  read_time: string | null;
  is_published: boolean;
};

type UploadedImage = {
  key: string;
  url: string;
};

const initialGalleryForm = {
  alt: "",
  location: "",
  sortOrder: "0",
  isPublished: true,
};

const initialBlogForm = {
  slug: "",
  title: "",
  excerpt: "",
  contentText: "",
  category: "",
  author: "Paws & Treks Team",
  readTime: "",
  coverImageUrl: "",
  isPublished: false,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminPage() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [previewImageAlt, setPreviewImageAlt] = useState<string>("Image preview");
  const [galleryItems, setGalleryItems] = useState<GalleryRow[]>([]);
  const [blogItems, setBlogItems] = useState<BlogRow[]>([]);

  const [galleryForm, setGalleryForm] = useState(initialGalleryForm);
  const [blogForm, setBlogForm] = useState(initialBlogForm);

  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const selectedGallery = useMemo(
    () => galleryItems.find((item) => item.id === editingGalleryId),
    [galleryItems, editingGalleryId]
  );

  const galleryLocationOptions = useMemo(() => {
    const locations = new Set(
      galleryItems
        .map((item) => item.location?.trim())
        .filter((value): value is string => Boolean(value))
    );

    if (galleryForm.location.trim()) {
      locations.add(galleryForm.location.trim());
    }

    return Array.from(locations).sort((a, b) => a.localeCompare(b));
  }, [galleryItems, galleryForm.location]);

  const loadData = useCallback(async () => {
    const [galleryRes, blogsRes] = await Promise.all([
      fetch("/api/gallery", { cache: "no-store" }),
      fetch("/api/blogs", { cache: "no-store" }),
    ]);

    if (!galleryRes.ok || !blogsRes.ok) {
      throw new Error("Failed to load admin data");
    }

    const [galleryData, blogsData] = await Promise.all([galleryRes.json(), blogsRes.json()]);
    setGalleryItems(Array.isArray(galleryData) ? galleryData : []);
    setBlogItems(Array.isArray(blogsData) ? blogsData : []);
  }, []);

  useEffect(() => {
    loadData().catch(() => {
      setMessage("Failed to load admin data.");
    });
  }, [loadData]);

  const submitGallery = async () => {
    if (!uploadedImage && !selectedGallery) {
      setMessage("Upload an image first before saving.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        uploadthingKey: uploadedImage?.key ?? selectedGallery?.uploadthing_key,
        url: uploadedImage?.url ?? selectedGallery?.url,
        alt: galleryForm.alt,
        location: galleryForm.location,
        sortOrder: Number(galleryForm.sortOrder || 0),
        isPublished: galleryForm.isPublished,
      };

      const isEdit = Boolean(editingGalleryId);
      const res = await fetch(isEdit ? `/api/gallery/${editingGalleryId}` : "/api/gallery", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save gallery image");
      }

      setMessage(isEdit ? "Gallery image updated." : "Gallery image created.");
      setGalleryForm(initialGalleryForm);
      setEditingGalleryId(null);
      setUploadedImage(null);
      await loadData();
    } catch {
      setMessage("Failed to save gallery image.");
    } finally {
      setLoading(false);
    }
  };

  const editGalleryItem = (row: GalleryRow) => {
    setEditingGalleryId(row.id);
    setUploadedImage({ key: row.uploadthing_key, url: row.url });
    setGalleryForm({
      alt: row.alt,
      location: row.location,
      sortOrder: String(row.sort_order),
      isPublished: row.is_published,
    });
  };

  const deleteGalleryItem = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      if (editingGalleryId === id) {
        setEditingGalleryId(null);
        setGalleryForm(initialGalleryForm);
        setUploadedImage(null);
      }
      setMessage("Gallery image deleted.");
      await loadData();
    } catch {
      setMessage("Failed to delete gallery image.");
    } finally {
      setLoading(false);
    }
  };

  const submitBlog = async () => {
    setLoading(true);
    setMessage("");

    try {
      const content = blogForm.contentText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const payload = {
        slug: blogForm.slug || slugify(blogForm.title),
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        content,
        coverImageUrl: blogForm.coverImageUrl || null,
        category: blogForm.category,
        author: blogForm.author,
        readTime: blogForm.readTime || null,
        isPublished: blogForm.isPublished,
      };

      const isEdit = Boolean(editingBlogId);
      const res = await fetch(isEdit ? `/api/blogs/${editingBlogId}` : "/api/blogs", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const details = await res.json().catch(() => null);
        const messageFromApi =
          details?.error?.formErrors?.[0] ||
          details?.error?.fieldErrors?.coverImageUrl?.[0] ||
          details?.error ||
          "Failed to save blog";
        throw new Error(String(messageFromApi));
      }

      setMessage(isEdit ? "Blog updated." : "Blog created.");
      setEditingBlogId(null);
      setBlogForm(initialBlogForm);
      await loadData();
    } catch (error) {
      const messageFromError = error instanceof Error ? error.message : "Failed to save blog post.";
      setMessage(messageFromError);
    } finally {
      setLoading(false);
    }
  };

  const editBlogItem = (row: BlogRow) => {
    setEditingBlogId(row.id);
    setBlogForm({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      contentText: Array.isArray(row.content) ? row.content.join("\n") : "",
      category: row.category,
      author: row.author,
      readTime: row.read_time ?? "",
      coverImageUrl: row.cover_image_url ?? "",
      isPublished: row.is_published,
    });
  };

  const deleteBlogItem = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      if (editingBlogId === id) {
        setEditingBlogId(null);
        setBlogForm(initialBlogForm);
      }
      setMessage("Blog deleted.");
      await loadData();
    } catch {
      setMessage("Failed to delete blog post.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      <section>
        <div className="flex items-center justify-between gap-4 mb-2">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
        <p className="text-muted-foreground">Manage gallery images and blog posts.</p>
        {message && <p className="mt-3 text-sm text-primary">{message}</p>}
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4 rounded-lg border p-5">
          <h2 className="text-xl font-semibold">Gallery Manager</h2>
          <p className="text-sm text-muted-foreground">
            Upload an image to UploadThing, then save metadata to publish it on the gallery page.
          </p>

          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const first = res?.[0]?.serverData;
              if (!first) return;
              setUploadedImage({ key: first.key, url: first.url });
              setMessage("Image uploaded to UploadThing. Fill details and save.");
            }}
            onUploadError={() => setMessage("Upload failed. Please retry.")}
          />

          {uploadedImage?.url && (
            <div className="rounded-md border p-3">
              <button
                type="button"
                className="block w-full"
                onClick={() => {
                  setPreviewImageUrl(uploadedImage.url);
                  setPreviewImageAlt("Uploaded preview");
                }}
              >
                <img src={uploadedImage.url} alt="Uploaded preview" className="aspect-square w-full object-cover rounded" />
              </button>
              <p className="text-xs mt-2 text-muted-foreground break-all">{uploadedImage.key}</p>
            </div>
          )}

          <Input
            placeholder="Alt text"
            value={galleryForm.alt}
            onChange={(e) => setGalleryForm((prev) => ({ ...prev, alt: e.target.value }))}
          />
          <select
            value={galleryForm.location}
            onChange={(e) => setGalleryForm((prev) => ({ ...prev, location: e.target.value }))}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="" disabled>
              Select location/category
            </option>
            {galleryLocationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <Input
            type="number"
            min={0}
            placeholder="Sort order"
            value={galleryForm.sortOrder}
            onChange={(e) => setGalleryForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={galleryForm.isPublished}
              onChange={(e) => setGalleryForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
            />
            Published
          </label>
          <div className="flex gap-2">
            <Button onClick={submitGallery} disabled={loading}>
              {editingGalleryId ? "Update Image" : "Create Image"}
            </Button>
            {editingGalleryId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingGalleryId(null);
                  setGalleryForm(initialGalleryForm);
                  setUploadedImage(null);
                }}
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border p-5 max-h-[780px] overflow-y-auto">
          <h3 className="text-lg font-semibold">Gallery Records ({galleryItems.length})</h3>
          {galleryItems.map((item) => (
            <div key={item.id} className="rounded-md border p-3 space-y-2">
              <button
                type="button"
                className="block w-full"
                onClick={() => {
                  setPreviewImageUrl(item.url);
                  setPreviewImageAlt(item.alt);
                }}
              >
                <img src={item.url} alt={item.alt} className="aspect-square w-full object-cover rounded" />
              </button>
              <p className="font-medium text-sm">{item.alt}</p>
              <p className="text-xs text-muted-foreground">{item.location} • sort {item.sort_order}</p>
              <p className="text-xs text-muted-foreground">{item.is_published ? "Published" : "Draft"}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setPreviewImageUrl(item.url);
                    setPreviewImageAlt(item.alt);
                  }}
                >
                  Full View
                </Button>
                <Button size="sm" variant="outline" onClick={() => editGalleryItem(item)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteGalleryItem(item.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4 rounded-lg border p-5">
          <h2 className="text-xl font-semibold">Blog Manager</h2>
          <p className="text-sm text-muted-foreground">
            Add, edit, publish, and delete blog posts shown on the blog page.
          </p>

          <Input
            placeholder="Title"
            value={blogForm.title}
            onChange={(e) =>
              setBlogForm((prev) => ({
                ...prev,
                title: e.target.value,
                slug: prev.slug || slugify(e.target.value),
              }))
            }
          />
          <Input
            placeholder="Slug"
            value={blogForm.slug}
            onChange={(e) => setBlogForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
          />
          <Input
            placeholder="Category"
            value={blogForm.category}
            onChange={(e) => setBlogForm((prev) => ({ ...prev, category: e.target.value }))}
          />
          <Input
            placeholder="Author"
            value={blogForm.author}
            onChange={(e) => setBlogForm((prev) => ({ ...prev, author: e.target.value }))}
          />
          <Input
            placeholder="Read time (e.g. 6 min read)"
            value={blogForm.readTime}
            onChange={(e) => setBlogForm((prev) => ({ ...prev, readTime: e.target.value }))}
          />
          <Input
            placeholder="Cover image URL"
            value={blogForm.coverImageUrl}
            onChange={(e) => setBlogForm((prev) => ({ ...prev, coverImageUrl: e.target.value }))}
          />
          <Textarea
            placeholder="Excerpt"
            value={blogForm.excerpt}
            onChange={(e) => setBlogForm((prev) => ({ ...prev, excerpt: e.target.value }))}
          />
          <Textarea
            className="min-h-[180px]"
            placeholder="Blog content lines, one paragraph per line"
            value={blogForm.contentText}
            onChange={(e) => setBlogForm((prev) => ({ ...prev, contentText: e.target.value }))}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={blogForm.isPublished}
              onChange={(e) => setBlogForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
            />
            Published
          </label>

          <div className="flex gap-2">
            <Button onClick={submitBlog} disabled={loading}>
              {editingBlogId ? "Update Blog" : "Create Blog"}
            </Button>
            {editingBlogId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingBlogId(null);
                  setBlogForm(initialBlogForm);
                }}
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border p-5 max-h-[820px] overflow-y-auto">
          <h3 className="text-lg font-semibold">Blog Records ({blogItems.length})</h3>
          {blogItems.map((item) => (
            <div key={item.id} className="rounded-md border p-3 space-y-2">
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">/{item.slug}</p>
              <p className="text-xs text-muted-foreground">{item.category} • {item.read_time ?? "No read time"}</p>
              <p className="text-xs text-muted-foreground">{item.is_published ? "Published" : "Draft"}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => editBlogItem(item)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteBlogItem(item.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {previewImageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 p-4 sm:p-8 flex items-center justify-center"
          onClick={() => setPreviewImageUrl(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-sm border border-white/40 rounded px-3 py-1"
            onClick={() => setPreviewImageUrl(null)}
          >
            Close
          </button>
          <img
            src={previewImageUrl}
            alt={previewImageAlt}
            className="max-h-[90vh] max-w-[95vw] object-contain rounded"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
