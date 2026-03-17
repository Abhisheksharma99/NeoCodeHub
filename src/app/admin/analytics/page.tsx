"use client";

import { motion } from "framer-motion";
import {
  HiOutlineChartBarSquare,
  HiOutlineEye,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineGlobeAlt,
  HiOutlineDevicePhoneMobile,
  HiOutlineComputerDesktop,
  HiOutlineArrowTrendingUp,
  HiOutlineLink,
} from "react-icons/hi2";

const easeOut = [0.16, 1, 0.3, 1] as const;

const stats = [
  { label: "Total Visits", value: "---", icon: HiOutlineEye, color: "bg-blue-50 text-blue-600" },
  { label: "Unique Visitors", value: "---", icon: HiOutlineUserGroup, color: "bg-purple-50 text-purple-600" },
  { label: "Avg. Time on Site", value: "---", icon: HiOutlineClock, color: "bg-emerald-50 text-emerald-600" },
  { label: "Bounce Rate", value: "---", icon: HiOutlineArrowTrendingUp, color: "bg-amber-50 text-amber-600" },
];

const topPages = [
  { page: "/", visits: "---", label: "Home" },
  { page: "/for/*", visits: "---", label: "Proposal Links" },
  { page: "/#Services", visits: "---", label: "Services Section" },
  { page: "/#Contact", visits: "---", label: "Contact Section" },
  { page: "/#Tech", visits: "---", label: "Tech Stack" },
];

const referralSources = [
  { source: "Direct", percentage: "---" },
  { source: "LinkedIn", percentage: "---" },
  { source: "Google Search", percentage: "---" },
  { source: "Twitter / X", percentage: "---" },
  { source: "Upwork", percentage: "---" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-heading text-neutral-900 flex items-center gap-3">
          <HiOutlineChartBarSquare className="h-8 w-8" />
          Analytics
        </h1>
        <p className="text-neutral-500 mt-1">
          Track visitor activity and website performance
        </p>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="rounded-2xl border border-blue-200 bg-blue-50 p-5"
      >
        <div className="flex gap-3">
          <HiOutlineChartBarSquare className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading font-semibold text-blue-900 text-sm">
              Analytics Integration
            </h3>
            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
              Connect your analytics provider (Google Analytics, Vercel Analytics, Plausible, etc.) to see real visitor data here.
              For now, this page shows the dashboard layout with placeholder data. You can integrate by adding your tracking script to the root layout.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: easeOut }}
              className="rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <div className={`inline-flex p-2.5 rounded-xl ${stat.color} mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold font-heading text-neutral-900">
                {stat.value}
              </p>
              <p className="text-sm text-neutral-500 mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
          className="rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <h2 className="text-lg font-bold font-heading text-neutral-900 mb-4 flex items-center gap-2">
            <HiOutlineGlobeAlt className="h-5 w-5 text-neutral-400" />
            Top Pages
          </h2>
          <div className="space-y-3">
            {topPages.map((page, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {page.label}
                  </p>
                  <p className="text-xs text-neutral-400 font-mono">
                    {page.page}
                  </p>
                </div>
                <span className="text-sm font-heading font-semibold text-neutral-600">
                  {page.visits}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Referral Sources */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
          className="rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <h2 className="text-lg font-bold font-heading text-neutral-900 mb-4 flex items-center gap-2">
            <HiOutlineLink className="h-5 w-5 text-neutral-400" />
            Referral Sources
          </h2>
          <div className="space-y-3">
            {referralSources.map((ref, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0"
              >
                <p className="text-sm font-medium text-neutral-900">
                  {ref.source}
                </p>
                <span className="text-sm font-heading font-semibold text-neutral-600">
                  {ref.percentage}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
          className="rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <h2 className="text-lg font-bold font-heading text-neutral-900 mb-4">
            Devices
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-neutral-50 p-4 text-center">
              <HiOutlineComputerDesktop className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-xl font-bold font-heading text-neutral-900">---</p>
              <p className="text-xs text-neutral-500">Desktop</p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-4 text-center">
              <HiOutlineDevicePhoneMobile className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-xl font-bold font-heading text-neutral-900">---</p>
              <p className="text-xs text-neutral-500">Mobile</p>
            </div>
          </div>
        </motion.div>

        {/* Proposal Link Performance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
          className="rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <h2 className="text-lg font-bold font-heading text-neutral-900 mb-4 flex items-center gap-2">
            <HiOutlineLink className="h-5 w-5 text-neutral-400" />
            Proposal Link Performance
          </h2>
          <div className="space-y-3">
            {[
              { label: "Total proposal links created", value: "---" },
              { label: "Proposal links visited", value: "---" },
              { label: "Contact form submissions", value: "---" },
              { label: "Conversion rate", value: "---" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0"
              >
                <p className="text-sm text-neutral-600">{item.label}</p>
                <span className="text-sm font-heading font-semibold text-neutral-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
