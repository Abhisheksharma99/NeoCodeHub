"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "./AdminAuth";
import {
  HiOutlineSquares2X2,
  HiOutlineLink,
  HiOutlineDocumentText,
  HiOutlineRocketLaunch,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineChartBarSquare,
} from "react-icons/hi2";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: HiOutlineSquares2X2,
  },
  {
    name: "Proposals",
    href: "/admin/proposals",
    icon: HiOutlineLink,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: HiOutlineRocketLaunch,
  },
  {
    name: "Blog",
    href: "/admin/blog",
    icon: HiOutlineDocumentText,
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: HiOutlineChatBubbleLeftRight,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: HiOutlineChartBarSquare,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: HiOutlineCog6Tooth,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAdminAuth();

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-neutral-800">
        <Link
          href="/admin"
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center">
            <span className="text-neutral-900 font-bold text-lg font-heading">
              N
            </span>
          </div>
          <div>
            <span className="font-heading font-bold text-white text-lg">
              NeoCodeHub
            </span>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full"
        >
          <HiOutlineArrowLeftOnRectangle className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-neutral-900 text-white shadow-lg"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? (
          <HiOutlineXMark className="h-5 w-5" />
        ) : (
          <HiOutlineBars3 className="h-5 w-5" />
        )}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-neutral-900 flex-col flex-shrink-0 min-h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-neutral-900 flex flex-col z-40 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
