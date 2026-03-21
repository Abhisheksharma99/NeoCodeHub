"use client";

import Link from "next/link";
import { useAdminAuth } from "./AdminAuth";
import { HiOutlineBell, HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

export default function AdminHeader() {
  const { user } = useAdminAuth();

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
      <div className="md:pl-0 pl-12">
        <h2 className="text-sm text-neutral-400">Welcome back,</h2>
        <p className="font-heading font-semibold text-neutral-900">
          {user?.name || "Admin"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
        >
          <HiOutlineArrowTopRightOnSquare className="h-3.5 w-3.5" />
          View Site
        </Link>
        <button className="relative p-2 rounded-xl hover:bg-neutral-100 transition-all">
          <HiOutlineBell className="h-5 w-5 text-neutral-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="h-9 w-9 rounded-xl bg-neutral-900 flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            {user?.name?.[0] || "A"}
          </span>
        </div>
      </div>
    </header>
  );
}
