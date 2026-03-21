"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineCog6Tooth,
  HiOutlineGlobeAlt,
  HiOutlineEnvelope,
  HiOutlineKey,
  HiOutlinePaintBrush,
  HiOutlineCheck,
} from "react-icons/hi2";

interface Settings {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  phone: string;
  address: string;
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
  primaryColor: string;
  accentColor: string;
}

const defaultSettings: Settings = {
  siteName: "NeoCodeHub",
  siteUrl: "https://neocodehub.com",
  contactEmail: "hello@neocodehub.com",
  phone: "+91 XXXXX XXXXX",
  address: "India",
  emailjsServiceId: "",
  emailjsTemplateId: "",
  emailjsPublicKey: "",
  primaryColor: "#171717",
  accentColor: "#a3a3a3",
};

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      const data = await res.json();
      setSettings({ ...defaultSettings, ...data });
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load settings", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed to save settings");
      showToast("Settings saved successfully");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-400";

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading text-neutral-900 flex items-center gap-3">
              <HiOutlineCog6Tooth className="h-8 w-8" />
              Settings
            </h1>
            <p className="text-neutral-500 mt-1">
              Configure your admin panel and site settings
            </p>
          </div>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 animate-pulse">
            <div className="h-5 w-32 bg-neutral-100 rounded mb-2" />
            <div className="h-4 w-48 bg-neutral-50 rounded mb-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-11 bg-neutral-50 rounded-xl" />
              <div className="h-11 bg-neutral-50 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
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
            <HiOutlineCog6Tooth className="h-8 w-8" />
            Settings
          </h1>
          <p className="text-neutral-500 mt-1">
            Configure your admin panel and site settings
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-all font-heading disabled:opacity-50"
        >
          {saving ? (
            "Saving..."
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="rounded-2xl border border-neutral-200 bg-white p-6"
      >
        <h2 className="text-lg font-bold font-heading text-neutral-900 mb-1 flex items-center gap-2">
          <HiOutlineGlobeAlt className="h-5 w-5 text-neutral-400" />
          General
        </h2>
        <p className="text-sm text-neutral-500 mb-5">
          Basic site information
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Site Name</label>
              <input
                className={inputClass}
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Site URL</label>
              <input
                className={inputClass}
                value={settings.siteUrl}
                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Settings */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
        className="rounded-2xl border border-neutral-200 bg-white p-6"
      >
        <h2 className="text-lg font-bold font-heading text-neutral-900 mb-1 flex items-center gap-2">
          <HiOutlineEnvelope className="h-5 w-5 text-neutral-400" />
          Contact Information
        </h2>
        <p className="text-sm text-neutral-500 mb-5">
          Contact details displayed on the website
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
              <input
                className={inputClass}
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
              <input
                className={inputClass}
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Address</label>
            <input
              className={inputClass}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            />
          </div>
        </div>
      </motion.div>

      {/* Email Integration */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
        className="rounded-2xl border border-neutral-200 bg-white p-6"
      >
        <h2 className="text-lg font-bold font-heading text-neutral-900 mb-1 flex items-center gap-2">
          <HiOutlineKey className="h-5 w-5 text-neutral-400" />
          EmailJS Integration
        </h2>
        <p className="text-sm text-neutral-500 mb-5">
          Configure email service for contact form
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Service ID</label>
            <input
              className={inputClass}
              placeholder="service_xxxxx"
              value={settings.emailjsServiceId}
              onChange={(e) => setSettings({ ...settings, emailjsServiceId: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Template ID</label>
            <input
              className={inputClass}
              placeholder="template_xxxxx"
              value={settings.emailjsTemplateId}
              onChange={(e) => setSettings({ ...settings, emailjsTemplateId: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Public Key</label>
            <input
              className={inputClass}
              placeholder="Your EmailJS public key"
              value={settings.emailjsPublicKey}
              onChange={(e) => setSettings({ ...settings, emailjsPublicKey: e.target.value })}
            />
          </div>
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
        className="rounded-2xl border border-neutral-200 bg-white p-6"
      >
        <h2 className="text-lg font-bold font-heading text-neutral-900 mb-1 flex items-center gap-2">
          <HiOutlinePaintBrush className="h-5 w-5 text-neutral-400" />
          Theme
        </h2>
        <p className="text-sm text-neutral-500 mb-5">
          Customize brand colors
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Primary Color</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="h-10 w-14 rounded-lg border border-neutral-200 cursor-pointer"
              />
              <input
                className={inputClass}
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Accent Color</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                className="h-10 w-14 rounded-lg border border-neutral-200 cursor-pointer"
              />
              <input
                className={inputClass}
                value={settings.accentColor}
                onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Admin Credentials */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
        className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
      >
        <h3 className="font-heading font-semibold text-amber-900 text-sm mb-1">
          Default Admin Credentials
        </h3>
        <p className="text-xs text-amber-700 leading-relaxed">
          Email: <code className="bg-amber-100 px-1 py-0.5 rounded">admin@neocodehub.com</code>{" "}
          Password: <code className="bg-amber-100 px-1 py-0.5 rounded">password</code>
          <br />
          Update these by integrating a proper authentication system (NextAuth.js, Clerk, etc.)
        </p>
      </motion.div>
    </div>
  );
}
