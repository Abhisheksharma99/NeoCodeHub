"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineLink,
  HiOutlineRocketLaunch,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChartBarSquare,
  HiOutlineCog6Tooth,
  HiOutlinePlusCircle,
  HiOutlineArrowTrendingUp,
  HiOutlineEye,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const easeOut = [0.16, 1, 0.3, 1] as const;

const stats = [
  {
    title: "Proposals Sent",
    value: "---",
    change: "Personalized links",
    icon: HiOutlineLink,
    href: "/admin/proposals",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Projects",
    value: "50+",
    change: "Completed",
    icon: HiOutlineRocketLaunch,
    href: "/admin/projects",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Total Visitors",
    value: "---",
    change: "Track with analytics",
    icon: HiOutlineEye,
    href: "/admin/analytics",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Clients",
    value: "30+",
    change: "Worldwide",
    icon: HiOutlineUserGroup,
    href: "/admin/proposals",
    color: "bg-amber-50 text-amber-600",
  },
];

const quickActions = [
  {
    title: "Create Proposal Link",
    description: "Generate a personalized URL for a client",
    icon: HiOutlineLink,
    href: "/admin/proposals",
    primary: true,
  },
  {
    title: "Manage Projects",
    description: "Add or update showcase projects",
    icon: HiOutlineRocketLaunch,
    href: "/admin/projects",
  },
  {
    title: "Write Blog Post",
    description: "Create new blog content",
    icon: HiOutlineDocumentText,
    href: "/admin/blog",
  },
  {
    title: "View Analytics",
    description: "Check visitor statistics",
    icon: HiOutlineChartBarSquare,
    href: "/admin/analytics",
  },
  {
    title: "Testimonials",
    description: "Manage client testimonials",
    icon: HiOutlineChatBubbleLeftRight,
    href: "/admin/testimonials",
  },
  {
    title: "Settings",
    description: "Configure your admin panel",
    icon: HiOutlineCog6Tooth,
    href: "/admin/settings",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-neutral-900">
          Dashboard
        </h1>
        <p className="text-neutral-500 mt-1">
          Manage your agency, create proposals, and track performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: easeOut }}
            >
              <Link href={stat.href}>
                <div className="glass-card rounded-2xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`p-2.5 rounded-xl ${stat.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <HiOutlineArrowTrendingUp className="h-4 w-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
                  </div>
                  <p className="text-2xl font-bold font-heading text-neutral-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    {stat.title}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    {stat.change}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold font-heading text-neutral-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.06,
                  ease: easeOut,
                }}
              >
                <Link href={action.href}>
                  <div
                    className={`rounded-2xl p-5 border transition-all duration-300 cursor-pointer group hover:shadow-md ${
                      action.primary
                        ? "bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800"
                        : "bg-white border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2.5 rounded-xl ${
                          action.primary
                            ? "bg-white/10"
                            : "bg-neutral-100 group-hover:bg-neutral-200"
                        } transition-colors`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            action.primary
                              ? "text-white"
                              : "text-neutral-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-heading font-semibold text-sm ${
                            action.primary
                              ? "text-white"
                              : "text-neutral-900"
                          }`}
                        >
                          {action.title}
                        </h3>
                        <p
                          className={`text-xs mt-0.5 ${
                            action.primary
                              ? "text-neutral-400"
                              : "text-neutral-500"
                          }`}
                        >
                          {action.description}
                        </p>
                      </div>
                      <HiOutlinePlusCircle
                        className={`h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity ${
                          action.primary
                            ? "text-neutral-400"
                            : "text-neutral-400"
                        }`}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Getting Started Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: easeOut }}
      >
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-bold font-heading text-neutral-900 mb-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Create Proposal Link",
                description:
                  "Fill in client details, project info, and a custom message. The system generates a unique personalized URL.",
              },
              {
                step: "02",
                title: "Share with Client",
                description:
                  "Send the generated URL to your client. When they open it, they see a personalized banner with their name and project details.",
              },
              {
                step: "03",
                title: "Track & Convert",
                description:
                  "Monitor who visits your proposals. The personalized experience increases engagement and conversion rates.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold font-heading text-neutral-400">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-neutral-900 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
