import { logoutUser } from "@/feature/user/userSlice";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import {
  Archive,
  BarChart3,
  Dumbbell,
  Layers,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";
import { selectActiveTab, setActiveTab } from "@/feature/tabs/tabSlice";

export default function Sidebar() {
  const show = useHideOnScroll();
  const dispatch = useDispatch();

  const activeTab = useSelector(selectActiveTab);
  return (
    <aside
      className={`w-full md:w-20 lg:w-64 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-row md:flex-col justify-between sticky top-[calc(100vh-4rem)]  md:top-16 h-auto md:h-[calc(100vh-4rem)] z-30 overflow-x-auto md:overflow-visible scrollbar-hide transition-transform duration-300 ${
        show ? "-translate-y-0" : "translate-y-full md:translate-y-0"
      }`}
    >
      <div className="p-2 md:p-4 flex flex-row md:flex-col gap-2 w-full md:w-auto justify-between md:justify-start">
        <SidebarItem
          id="OVERVIEW"
          icon={LayoutDashboard}
          label="COMMAND_CENTER"
          mobileLabel="HOME"
        />
        {/* <SidebarItem
          id="TARGETS"
          icon={Target}
          label="TARGET_PROTOCOLS"
          mobileLabel="TARGETS"
        /> */}

        <div className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 my-2 hidden md:block"></div>

        <SidebarItem
          id="TEST_SERIES"
          icon={Layers}
          label="TEST_SERIES"
          mobileLabel="TESTS"
        />
        <SidebarItem
          id="PYQ"
          icon={Archive}
          label="PREV_YR_QUES"
          mobileLabel="PYQ"
        />
        <SidebarItem
          id="PRACTICE"
          icon={Dumbbell}
          label="PRACTICE_DRILLS"
          mobileLabel="DRILLS"
        />

        <div className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 my-2 hidden md:block"></div>

        <SidebarItem
          id="ANALYTICS"
          icon={BarChart3}
          label="PERFORMANCE"
          mobileLabel="STATS"
        />
        <button
          onClick={() => dispatch(setActiveTab("SETTINGS"))}
          className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm whitespace-nowrap ${activeTab === "SETTINGS" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"}`}
        >
          <UserCircle className="w-4 h-4 shrink-0" />
          <span className="lg:inline font-mono text-sm">CONFIG</span>
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
        <button
          onClick={() => dispatch(setActiveTab("SETTINGS"))}
          className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors mb-2 rounded-sm ${activeTab === "SETTINGS" ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"}`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline font-mono text-sm">
            SYSTEM_CONFIG
          </span>
        </button>
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
