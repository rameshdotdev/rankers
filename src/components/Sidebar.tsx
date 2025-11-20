import { logoutUser } from "@/feature/user/userSlice";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Settings,
  Target,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const show = useHideOnScroll();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "TARGETS" | "ANALYTICS"
  >("OVERVIEW");

  return (
    <aside
      className={`w-full md:w-20 lg:w-64 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-row md:flex-col justify-between sticky top-[calc(100vh-4rem)] h-auto md:h-[calc(100vh-4rem)] z-30 overflow-x-auto md:overflow-visible scrollbar-hide transition-transform duration-300 ${
        show ? "-translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="p-2 md:p-4 flex flex-row md:flex-col gap-2 w-full md:w-auto justify-between md:justify-start">
        <button
          onClick={() => setActiveTab("OVERVIEW")}
          className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm whitespace-nowrap ${activeTab === "OVERVIEW" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"}`}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline">COMMAND_CENTER</span>
          <span className="inline lg:hidden md:hidden">DASHBOARD</span>
        </button>

        <button
          onClick={() => setActiveTab("TARGETS")}
          className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm whitespace-nowrap ${activeTab === "TARGETS" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"}`}
        >
          <Target className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline">TARGET_PROTOCOLS</span>
          <span className="inline lg:hidden md:hidden">TARGETS</span>
        </button>

        <button
          onClick={() => setActiveTab("ANALYTICS")}
          className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm whitespace-nowrap ${activeTab === "ANALYTICS" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"}`}
        >
          <BarChart3 className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline">PERFORMANCE</span>
          <span className="inline lg:hidden md:hidden">STATS</span>
        </button>

        {/* Mobile Logout */}
        <button
          onClick={() => dispatch(logoutUser())}
          className="md:hidden flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm whitespace-nowrap text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="inline lg:hidden md:hidden">LOGOUT</span>
        </button>
      </div>

      <div className="hidden md:block p-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer transition-colors">
          <Settings className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline font-mono text-sm">
            SYSTEM_CONFIG
          </span>
        </div>
        <div
          onClick={() => dispatch(logoutUser())}
          className="flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors hover:bg-red-50 dark:hover:bg-red-950/20 rounded-sm"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline font-mono text-sm">
            TERMINATE_SESSION
          </span>
        </div>
      </div>
    </aside>
  );
}
