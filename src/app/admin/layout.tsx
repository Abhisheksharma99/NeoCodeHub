import type { Metadata } from "next";
import { AdminAuthProvider } from "./_components/AdminAuth";
import AdminSidebar from "./_components/AdminSidebar";
import AdminHeader from "./_components/AdminHeader";

export const metadata: Metadata = {
  title: "Admin | NeoCodeHub",
  description: "NeoCodeHub admin dashboard for managing proposals, content, and analytics",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen flex bg-neutral-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </AdminAuthProvider>
  );
}
