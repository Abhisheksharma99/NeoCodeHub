"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePhoto,
} from "react-icons/hi2";
import ImageUpload from "../_components/ImageUpload";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  status: string;
  date: string;
  image: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    status: "draft",
    image: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    status: "draft",
    image: "",
  });

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blog");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load blog posts", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    try {
      setSaving(true);
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: new Date().toISOString().split("T")[0],
        }),
      });
      if (!res.ok) throw new Error("Failed to create blog post");
      const created = await res.json();
      setPosts((prev) => [...prev, created]);
      setForm({ title: "", excerpt: "", category: "", status: "draft", image: "" });
      setShowForm(false);
      showToast("Blog post created successfully");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to create blog post", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog post");
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showToast("Blog post deleted");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete blog post", "error");
    }
  };

  const handleEditStart = (post: BlogPost) => {
    setEditingId(post.id);
    setEditForm({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      status: post.status,
      image: post.image || "",
    });
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleEditSave = async () => {
    if (!editingId || !editForm.title.trim()) return;
    try {
      setEditSaving(true);
      const res = await fetch("/api/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...editForm }),
      });
      if (!res.ok) throw new Error("Failed to update blog post");
      const updated = await res.json();
      setPosts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...updated } : p))
      );
      showToast("Blog post updated successfully");
      setEditingId(null);
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to update blog post",
        "error"
      );
    } finally {
      setEditSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-400";

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 px-4 py-2.5 rounded-xl text-sm font-medium shadow-xl ${
              toast.type === "error"
                ? "bg-red-600 text-white"
                : "bg-neutral-900 text-white"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-neutral-900 flex items-center gap-3">
            <HiOutlineDocumentText className="h-8 w-8" />
            Blog Posts
          </h1>
          <p className="text-neutral-500 mt-1">Create and manage blog content</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-all font-heading"
        >
          <HiOutlinePlusCircle className="h-4 w-4" />
          New Post
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <h3 className="font-heading font-semibold text-neutral-900 mb-4">New Blog Post</h3>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Title</label>
              <input
                className={inputClass}
                placeholder="Blog post title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Excerpt</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={2}
                placeholder="Brief summary"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
                <input
                  className={inputClass}
                  placeholder="e.g. Development"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Status</label>
                <select
                  className={`${inputClass} appearance-none cursor-pointer`}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div>
              <ImageUpload
                label="Cover Image"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-all font-heading disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Post"}
            </button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <div className="grid grid-cols-[48px_1fr_120px_100px_80px] gap-4 px-6 py-3 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <span>Image</span>
            <span>Title</span>
            <span>Category</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid grid-cols-[48px_1fr_120px_100px_80px] gap-4 px-6 py-4 border-b border-neutral-100 last:border-0 animate-pulse items-center"
            >
              <div className="h-10 w-10 bg-neutral-100 rounded-lg" />
              <div>
                <div className="h-4 w-3/4 bg-neutral-100 rounded mb-1.5" />
                <div className="h-3 w-1/2 bg-neutral-50 rounded" />
              </div>
              <div className="h-4 w-16 bg-neutral-50 rounded" />
              <div className="h-5 w-16 bg-neutral-50 rounded" />
              <div className="flex gap-1">
                <div className="h-6 w-6 bg-neutral-50 rounded" />
                <div className="h-6 w-6 bg-neutral-50 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <div className="grid grid-cols-[48px_1fr_120px_100px_80px] gap-4 px-6 py-3 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <span>Image</span>
            <span>Title</span>
            <span>Category</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {posts.map((post, i) =>
            editingId === post.id ? (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-5 border-b border-neutral-100 last:border-0 bg-neutral-50/50"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Title</label>
                    <input
                      className={inputClass}
                      placeholder="Blog post title"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">Excerpt</label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={2}
                      placeholder="Brief summary"
                      value={editForm.excerpt}
                      onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">Category</label>
                      <input
                        className={inputClass}
                        placeholder="e.g. Development"
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">Status</label>
                      <select
                        className={`${inputClass} appearance-none cursor-pointer`}
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <ImageUpload
                      label="Cover Image"
                      value={editForm.image}
                      onChange={(url) => setEditForm({ ...editForm, image: url })}
                    />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={handleEditCancel}
                      disabled={editSaving}
                      className="px-4 py-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSave}
                      disabled={editSaving || !editForm.title.trim()}
                      className="px-4 py-2 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-all font-heading disabled:opacity-50"
                    >
                      {editSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[48px_1fr_120px_100px_80px] gap-4 px-6 py-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors items-center"
              >
                {/* Blog Image Thumbnail */}
                <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                      <HiOutlinePhoto className="h-4 w-4 text-neutral-300" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm text-neutral-900">{post.title}</p>
                  <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
                  <p className="text-[10px] text-neutral-300 mt-0.5">{post.date}</p>
                </div>
                <span className="text-xs text-neutral-500">{post.category}</span>
                <span
                  className={`inline-flex w-fit px-2 py-0.5 rounded-md text-[10px] font-medium ${
                    post.status === "published"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {post.status === "published" ? "Published" : "Draft"}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditStart(post)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <HiOutlinePencilSquare className="h-3.5 w-3.5 text-neutral-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <HiOutlineTrash className="h-3.5 w-3.5 text-red-400" />
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>
      )}
    </div>
  );
}
