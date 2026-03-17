"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiOutlineStar,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

interface Testimonial {
  id: string;
  author: string;
  company: string;
  role: string;
  content: string;
  rating: number;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState({
    author: "",
    company: "",
    role: "",
    content: "",
    rating: 5,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    author: "",
    company: "",
    role: "",
    content: "",
    rating: 5,
  });
  const [editSaving, setEditSaving] = useState(false);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load testimonials", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleAdd = async () => {
    if (!form.author.trim() || !form.content.trim()) return;
    try {
      setSaving(true);
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create testimonial");
      const created = await res.json();
      setTestimonials((prev) => [...prev, created]);
      setForm({ author: "", company: "", role: "", content: "", rating: 5 });
      setShowForm(false);
      showToast("Testimonial added successfully");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to create testimonial", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      showToast("Testimonial deleted");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete testimonial", "error");
    }
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setEditForm({
      author: t.author,
      company: t.company,
      role: t.role,
      content: t.content,
      rating: t.rating,
    });
  };

  const handleEditSave = async () => {
    if (!editingId || !editForm.author.trim() || !editForm.content.trim()) return;
    try {
      setEditSaving(true);
      const res = await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...editForm }),
      });
      if (!res.ok) throw new Error("Failed to update testimonial");
      const updated = await res.json();
      setTestimonials((prev) =>
        prev.map((t) => (t.id === updated.id ? updated : t))
      );
      setEditingId(null);
      showToast("Testimonial updated successfully");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update testimonial", "error");
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
            <HiOutlineChatBubbleLeftRight className="h-8 w-8" />
            Testimonials
          </h1>
          <p className="text-neutral-500 mt-1">
            Manage client testimonials and reviews
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-all font-heading"
        >
          <HiOutlinePlusCircle className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <h3 className="font-heading font-semibold text-neutral-900 mb-4">
            New Testimonial
          </h3>
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input className={inputClass} placeholder="Client name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              <input className={inputClass} placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <input className={inputClass} placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Testimonial content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setForm({ ...form, rating: star })}
                    className={`p-1 transition-colors ${
                      star <= form.rating ? "text-amber-400" : "text-neutral-200"
                    }`}
                  >
                    <HiOutlineStar className="h-5 w-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all">Cancel</button>
            <button
              onClick={handleAdd}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-all font-heading disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 bg-white p-5 animate-pulse"
            >
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="h-3.5 w-3.5 bg-neutral-100 rounded" />
                ))}
              </div>
              <div className="h-4 w-full bg-neutral-50 rounded mb-2" />
              <div className="h-4 w-2/3 bg-neutral-50 rounded mb-4" />
              <div className="h-px bg-neutral-100 mb-3" />
              <div className="h-4 w-24 bg-neutral-100 rounded mb-1" />
              <div className="h-3 w-32 bg-neutral-50 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: easeOut }}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 hover:shadow-md transition-all"
            >
              {editingId === t.id ? (
                <div className="space-y-3">
                  <input
                    className={inputClass}
                    placeholder="Client name"
                    value={editForm.author}
                    onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                  />
                  <input
                    className={inputClass}
                    placeholder="Company"
                    value={editForm.company}
                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  />
                  <input
                    className={inputClass}
                    placeholder="Role"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  />
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    placeholder="Testimonial content"
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setEditForm({ ...editForm, rating: star })}
                          className={`p-1 transition-colors ${
                            star <= editForm.rating ? "text-amber-400" : "text-neutral-200"
                          }`}
                        >
                          <HiOutlineStar className="h-5 w-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSave}
                      disabled={editSaving}
                      className="px-4 py-2 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-all font-heading disabled:opacity-50"
                    >
                      {editSaving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <HiOutlineStar
                          key={j}
                          className={`h-3.5 w-3.5 ${
                            j < t.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(t)}
                        className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                      >
                        <HiOutlinePencilSquare className="h-3.5 w-3.5 text-neutral-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <HiOutlineTrash className="h-3.5 w-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 italic leading-relaxed">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    <p className="font-heading font-semibold text-sm text-neutral-900">
                      {t.author}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {t.role}{t.company ? `, ${t.company}` : ""}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
