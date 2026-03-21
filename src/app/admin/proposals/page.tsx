"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLink,
  HiOutlineUser,
  HiOutlineBuildingOffice2,
  HiOutlineRocketLaunch,
  HiOutlineChatBubbleLeftRight,
  HiOutlineGlobeAlt,
  HiOutlineClipboard,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineTrash,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

interface ProposalLink {
  id: string;
  name: string;
  company: string;
  project: string;
  message: string;
  ref: string;
  service: string;
  url: string;
  createdAt: string;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const referralSources = [
  { value: "", label: "Select source..." },
  { value: "linkedin", label: "LinkedIn" },
  { value: "upwork", label: "Upwork" },
  { value: "fiverr", label: "Fiverr" },
  { value: "clutch", label: "Clutch" },
  { value: "email", label: "Email" },
  { value: "twitter", label: "Twitter / X" },
  { value: "referral", label: "Referral" },
  { value: "website", label: "Website" },
];

const serviceTypes = [
  { value: "", label: "Select service..." },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "ai-ml", label: "AI & Machine Learning" },
  { value: "cloud-solutions", label: "Cloud Solutions" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "devops", label: "DevOps" },
  { value: "full-stack", label: "Full-Stack Development" },
  { value: "consulting", label: "Technical Consulting" },
];

export default function ProposalsPage() {
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<ProposalLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingProposal, setSavingProposal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    project: "",
    message: "",
    ref: "",
    service: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/proposals");
      if (!res.ok) throw new Error("Failed to fetch proposals");
      const data = await res.json();
      setHistory(data);
    } catch {
      showToast("Failed to load proposal history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://neocodehub.com";

  const generateUrl = useCallback(() => {
    if (!form.name.trim()) return "";

    const segments: string[] = ["/for"];
    segments.push(toSlug(form.name));
    if (form.company.trim()) segments.push(toSlug(form.company));
    if (form.project.trim()) segments.push(toSlug(form.project));

    let url = baseUrl + segments.join("/");

    const params: string[] = [];
    if (form.message.trim()) params.push(`msg=${toSlug(form.message)}`);
    if (form.ref) params.push(`ref=${form.ref}`);
    if (form.service) params.push(`service=${form.service}`);

    if (params.length > 0) url += "?" + params.join("&");

    return url;
  }, [form, baseUrl]);

  const generatedUrl = generateUrl();

  const handleCopy = async () => {
    if (!generatedUrl) return;
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    showToast("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!generatedUrl || !form.name.trim()) return;

    const link: Omit<ProposalLink, "id"> = {
      ...form,
      url: generatedUrl,
      createdAt: new Date().toISOString(),
    };

    try {
      setSavingProposal(true);
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(link),
      });
      if (!res.ok) throw new Error("Failed to save proposal");
      const created = await res.json();
      setHistory((prev) => [created, ...prev].slice(0, 50));
      showToast("Link saved to history!");
    } catch {
      showToast("Failed to save proposal link");
    } finally {
      setSavingProposal(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/proposals?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete proposal");
      setHistory((prev) => prev.filter((l) => l.id !== id));
      showToast("Proposal link deleted");
    } catch {
      showToast("Failed to delete proposal link");
    }
  };

  const handleLoad = (link: ProposalLink) => {
    setForm({
      name: link.name,
      company: link.company,
      project: link.project,
      message: link.message,
      ref: link.ref,
      service: link.service,
    });
  };

  const handleCopyLink = async (url: string) => {
    await navigator.clipboard.writeText(url);
    showToast("Link copied!");
  };

  const handleReset = () => {
    setForm({
      name: "",
      company: "",
      project: "",
      message: "",
      ref: "",
      service: "",
    });
  };

  // URL segment visualization
  const urlSegments = generatedUrl
    ? (() => {
        const parts: { label: string; value: string; color: string }[] = [];
        parts.push({ label: "Base", value: baseUrl, color: "text-neutral-400" });
        parts.push({ label: "Route", value: "/for", color: "text-blue-500" });
        if (form.name.trim())
          parts.push({ label: "Name", value: "/" + toSlug(form.name), color: "text-emerald-500" });
        if (form.company.trim())
          parts.push({ label: "Company", value: "/" + toSlug(form.company), color: "text-purple-500" });
        if (form.project.trim())
          parts.push({ label: "Project", value: "/" + toSlug(form.project), color: "text-amber-500" });

        const params: string[] = [];
        if (form.message.trim()) params.push(`msg=${toSlug(form.message)}`);
        if (form.ref) params.push(`ref=${form.ref}`);
        if (form.service) params.push(`service=${form.service}`);
        if (params.length > 0)
          parts.push({ label: "Params", value: "?" + params.join("&"), color: "text-orange-500" });

        return parts;
      })()
    : [];

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-400";
  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all appearance-none cursor-pointer";
  const labelClass =
    "flex items-center gap-1.5 text-sm font-medium text-neutral-700 mb-1.5";

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-neutral-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-neutral-900 flex items-center gap-3">
          <HiOutlineLink className="h-8 w-8" />
          Proposal Link Generator
        </h1>
        <p className="text-neutral-500 mt-1">
          Create personalized URLs for client proposals and project pitches
        </p>
      </div>

      {/* URL Preview */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <div
          className={`rounded-2xl border p-6 transition-all duration-500 ${
            generatedUrl
              ? "border-neutral-300 bg-white shadow-lg"
              : "border-neutral-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <HiOutlineSparkles className="h-4 w-4 text-neutral-400" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-neutral-400">
              Generated URL
            </span>
          </div>

          {generatedUrl ? (
            <>
              <div className="bg-neutral-50 rounded-xl p-4 font-mono text-sm break-all border border-neutral-100">
                {urlSegments.map((seg, i) => (
                  <span key={i} className={`${seg.color} font-medium`}>
                    {seg.value}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex gap-2 flex-wrap">
                  {urlSegments.map((seg, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-50 border border-neutral-100 text-[10px] font-medium text-neutral-500"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${seg.color.replace(
                          "text-",
                          "bg-"
                        )}`}
                      />
                      {seg.label}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 ml-auto">
                  <button
                    onClick={handleSave}
                    disabled={savingProposal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-all disabled:opacity-50"
                  >
                    <HiOutlinePlus className="h-3.5 w-3.5" /> {savingProposal ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-all"
                  >
                    {copied ? (
                      <HiOutlineCheck className="h-3.5 w-3.5" />
                    ) : (
                      <HiOutlineClipboard className="h-3.5 w-3.5" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-xs font-medium text-white hover:bg-neutral-800 transition-all"
                  >
                    <HiOutlineArrowTopRightOnSquare className="h-3.5 w-3.5" />{" "}
                    Preview
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-neutral-50 rounded-xl p-8 text-center border border-dashed border-neutral-200">
              <HiOutlineLink className="h-8 w-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm text-neutral-400">
                Fill in the form below to generate a personalized URL
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
        >
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-bold font-heading text-neutral-900 mb-1">
              Client & Project Details
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              Fill in the details to create a personalized proposal link
            </p>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <HiOutlineUser className="h-3.5 w-3.5 text-neutral-400" />
                    Client Name *
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. John Doe"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <HiOutlineBuildingOffice2 className="h-3.5 w-3.5 text-neutral-400" />
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Acme Corp"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <HiOutlineRocketLaunch className="h-3.5 w-3.5 text-neutral-400" />
                  Project Name
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. E-Commerce Platform Redesign"
                  value={form.project}
                  onChange={(e) =>
                    setForm({ ...form, project: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <HiOutlineWrenchScrewdriver className="h-3.5 w-3.5 text-neutral-400" />
                    Service Type
                  </label>
                  <select
                    className={selectClass}
                    value={form.service}
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value })
                    }
                  >
                    {serviceTypes.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    <HiOutlineGlobeAlt className="h-3.5 w-3.5 text-neutral-400" />
                    Lead Source
                  </label>
                  <select
                    className={selectClass}
                    value={form.ref}
                    onChange={(e) =>
                      setForm({ ...form, ref: e.target.value })
                    }
                  >
                    {referralSources.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <HiOutlineChatBubbleLeftRight className="h-3.5 w-3.5 text-neutral-400" />
                  Custom Proposal Note
                </label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={2}
                  placeholder="e.g. We'd love to help transform your digital presence with our expertise"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
                <p className="text-xs text-neutral-400 mt-1.5">
                  This message appears in the personalized banner when the
                  client visits the link
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    handleSave();
                    handleCopy();
                  }}
                  disabled={!generatedUrl || savingProposal}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 text-sm font-semibold text-white hover:bg-neutral-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed font-heading"
                >
                  <span className="flex items-center justify-center gap-2">
                    <HiOutlinePlus className="h-4 w-4" />
                    Save & Copy Link
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
        >
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold font-heading text-neutral-900 flex items-center gap-2">
                  <HiOutlineClock className="h-5 w-5 text-neutral-400" />
                  History
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {history.length} saved link{history.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-neutral-100 animate-pulse"
                  >
                    <div className="h-4 w-24 bg-neutral-100 rounded mb-2" />
                    <div className="h-3 w-32 bg-neutral-50 rounded mb-2" />
                    <div className="h-3 w-16 bg-neutral-50 rounded" />
                  </div>
                ))}
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-10">
                <HiOutlineLink className="h-8 w-8 text-neutral-200 mx-auto mb-2" />
                <p className="text-sm text-neutral-400">No saved links yet</p>
                <p className="text-xs text-neutral-300 mt-1">
                  Generated links will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {history.map((link) => (
                  <div
                    key={link.id}
                    onClick={() => handleLoad(link)}
                    className="group p-3 rounded-xl border border-neutral-100 hover:border-neutral-300 transition-all cursor-pointer hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm text-neutral-900 truncate">
                          {link.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          {link.company && (
                            <span className="text-xs text-neutral-500 truncate">
                              {link.company}
                            </span>
                          )}
                          {link.project && (
                            <>
                              <span className="text-xs text-neutral-300">
                                /
                              </span>
                              <span className="text-xs text-neutral-500 truncate">
                                {link.project}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          {link.service && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-500">
                              {serviceTypes.find(
                                (s) => s.value === link.service
                              )?.label || link.service}
                            </span>
                          )}
                          <span className="text-[10px] text-neutral-300">
                            {new Date(link.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(link.url);
                          }}
                          className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                          title="Copy link"
                        >
                          <HiOutlineClipboard className="h-3.5 w-3.5 text-neutral-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(link.id);
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <HiOutlineTrash className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
