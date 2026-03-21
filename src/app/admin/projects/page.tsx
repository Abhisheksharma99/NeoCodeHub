"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineRocketLaunch,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePhoto,
} from "react-icons/hi2";
import ImageUpload from "../_components/ImageUpload";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  image: string;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "in-progress",
    image: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "in-progress",
    image: "",
  });
  const [editSaving, setEditSaving] = useState(false);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    try {
      setSaving(true);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create project");
      const created = await res.json();
      setProjects((prev) => [...prev, created]);
      setForm({ title: "", description: "", category: "", status: "in-progress", image: "" });
      setShowForm(false);
      showToast("Project created successfully");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to create project", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast("Project deleted");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete project", "error");
    }
  };

  const handleEditStart = (project: Project) => {
    setEditingId(project.id);
    setEditForm({
      title: project.title,
      description: project.description,
      category: project.category,
      status: project.status,
      image: project.image,
    });
  };

  const handleEditSave = async () => {
    if (!editingId || !editForm.title.trim()) return;
    try {
      setEditSaving(true);
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...editForm }),
      });
      if (!res.ok) throw new Error("Failed to update project");
      const updated = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...updated } : p))
      );
      showToast("Project updated successfully");
      setEditingId(null);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update project", "error");
    } finally {
      setEditSaving(false);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
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
            <HiOutlineRocketLaunch className="h-8 w-8" />
            Projects
          </h1>
          <p className="text-neutral-500 mt-1">
            Manage your portfolio showcase projects
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-all font-heading"
        >
          <HiOutlinePlusCircle className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <h3 className="font-heading font-semibold text-neutral-900 mb-4">
            New Project
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Title
              </label>
              <input
                className={inputClass}
                placeholder="Project name"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Category
              </label>
              <input
                className={inputClass}
                placeholder="e.g. Web Development"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Description
            </label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={2}
              placeholder="Brief project description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <ImageUpload
              label="Project Image"
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
            />
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
              {saving ? "Saving..." : "Save Project"}
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
              <div className="h-32 w-full bg-neutral-100 rounded-xl mb-4" />
              <div className="h-4 w-20 bg-neutral-100 rounded mb-4" />
              <div className="h-5 w-3/4 bg-neutral-100 rounded mb-2" />
              <div className="h-4 w-full bg-neutral-50 rounded mb-3" />
              <div className="h-px bg-neutral-100 mb-3" />
              <div className="h-3 w-24 bg-neutral-50 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: easeOut }}
              className={`group rounded-2xl border bg-white overflow-hidden transition-all ${
                editingId === project.id
                  ? "border-neutral-900 shadow-md"
                  : "border-neutral-200 hover:shadow-md"
              }`}
            >
              {editingId === project.id ? (
                <div className="p-5 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Title
                    </label>
                    <input
                      className={inputClass}
                      placeholder="Project name"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={2}
                      placeholder="Brief project description"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Category
                    </label>
                    <input
                      className={inputClass}
                      placeholder="e.g. Web Development"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Status
                    </label>
                    <select
                      className={inputClass}
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                    >
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <ImageUpload
                      label="Project Image"
                      value={editForm.image}
                      onChange={(url) =>
                        setEditForm({ ...editForm, image: url })
                      }
                    />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={handleEditCancel}
                      disabled={editSaving}
                      className="px-4 py-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all disabled:opacity-50"
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
              ) : (
                <>
                  {/* Project Image Thumbnail */}
                  {project.image ? (
                    <div className="w-full h-36 bg-neutral-50">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-36 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                      <HiOutlinePhoto className="h-8 w-8 text-neutral-300" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                          project.status === "completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {project.status === "completed" ? "Completed" : "In Progress"}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditStart(project)}
                          className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                        >
                          <HiOutlinePencilSquare className="h-3.5 w-3.5 text-neutral-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <HiOutlineTrash className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-heading font-semibold text-neutral-900">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
                      <span className="text-xs text-neutral-400">{project.category}</span>
                    </div>
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
