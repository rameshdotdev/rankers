import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/Sidebar";
import { getUser } from "@/utils/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-800 dark:text-zinc-300 flex flex-col md:flex-row transition-colors duration-300">
        {/* Sidebar Navigation - Horizontal on Mobile, Vertical on Desktop */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-y-auto min-h-[calc(100vh-8rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
