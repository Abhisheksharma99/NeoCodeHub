"use client";

import { useState, useRef } from "react";
import { HiOutlinePhoto, HiOutlineTrash, HiOutlineArrowUpTray } from "react-icons/hi2";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Client-side validation
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Use jpg, png, gif, webp, or svg.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum size is 5MB.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    try {
      setUploading(true);
      setError(null);

      // Attempt to delete from Cloudinary or local uploads
      if (value.includes("res.cloudinary.com") || value.startsWith("/uploads/")) {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value }),
        });
      }

      onChange("");
    } catch {
      // Even if delete fails on server, clear the value locally
      onChange("");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative group rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden">
          <img
            src={value}
            alt="Uploaded image"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
            <button
              onClick={handleRemove}
              disabled={uploading}
              className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-medium inline-flex items-center gap-1.5 hover:bg-red-700 disabled:opacity-50"
            >
              <HiOutlineTrash className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 cursor-pointer transition-all ${
            dragOver
              ? "border-neutral-900 bg-neutral-100"
              : "border-neutral-300 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          {uploading ? (
            <>
              <div className="h-8 w-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
              <span className="text-sm text-neutral-500">Uploading...</span>
            </>
          ) : (
            <>
              <div className="h-10 w-10 rounded-xl bg-neutral-200 flex items-center justify-center">
                <HiOutlineArrowUpTray className="h-5 w-5 text-neutral-500" />
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-neutral-700">
                  Click to upload
                </span>
                <span className="text-sm text-neutral-400 ml-1">
                  or drag and drop
                </span>
              </div>
              <span className="text-xs text-neutral-400">
                JPG, PNG, GIF, WebP, SVG up to 5MB
              </span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
