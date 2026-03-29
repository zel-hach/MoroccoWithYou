"use client";

import DashboardHeader from "../Components/Dashboard/DashboardHeader";
import DashboardSidebar from "../Components/Dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-[#323232] text-slate-50">
      <DashboardSidebar />
      <div className="min-h-screen pl-64 lg:pl-72">
        <DashboardHeader />
        <div className="p-4 sm:p-6 lg:p-8 w-full">{children}</div>
      </div>
    </div>
  );
}
