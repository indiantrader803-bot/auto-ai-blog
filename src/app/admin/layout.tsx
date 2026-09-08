import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export const metadata = {
  title: "Admin Portal | AutoAI Engine",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-24 lg:pb-0">
          {children}
        </div>
      </div>
    </AdminAuthGuard>
  );
}
