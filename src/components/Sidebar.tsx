import { useCallback, useRef, KeyboardEvent } from "react";

import { logoutUser } from "@/feature/user/userSlice";
import {
  Archive,
  BarChart3,
  Dumbbell,
  Layers,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import { selectActiveTab, setActiveTab } from "@/feature/tabs/tabSlice";
import { useAppDispatch, useAppSelector, useHideOnScroll } from "@/hooks/hooks";
import { TabType } from "@/types";

// Ordered list of main tabs (for keyboard navigation)
const TABS: { id: TabType; icon: any; label: string; mobileLabel?: string }[] =
  [
    {
      id: "OVERVIEW",
      icon: LayoutDashboard,
      label: "COMMAND_CENTER",
      mobileLabel: "HOME",
    },
    {
      id: "TEST_SERIES",
      icon: Layers,
      label: "TEST_SERIES",
      mobileLabel: "TESTS",
    },
    { id: "PYQ", icon: Archive, label: "PREV_YR_QUES", mobileLabel: "PYQ" },
    {
      id: "PRACTICE",
      icon: Dumbbell,
      label: "PRACTICE_DRILLS",
      mobileLabel: "DRILLS",
    },
    {
      id: "ANALYTICS",
      icon: BarChart3,
      label: "PERFORMANCE",
      mobileLabel: "STATS",
    },
  ];

export default function Sidebar() {
  const show = useHideOnScroll();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveTab);

  // Refs for all tab buttons (including SETTINGS as last item)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleItemKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const total = itemRefs.current.length;
      if (!total) return;

      let nextIndex = index;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          nextIndex = (index + 1) % total;
          itemRefs.current[nextIndex]?.focus();
          break;

        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          nextIndex = (index - 1 + total) % total;
          itemRefs.current[nextIndex]?.focus();
          break;

        case "Home":
          e.preventDefault();
          itemRefs.current[0]?.focus();
          break;

        case "End":
          e.preventDefault();
          itemRefs.current[total - 1]?.focus();
          break;

        default:
          break; // let Space/Enter trigger button click by default
      }
    },
    []
  );

  return (
    <aside
      aria-label="Dashboard navigation"
      role="tablist"
      aria-orientation="vertical"
      className={`w-full md:w-20 lg:w-64 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-row md:flex-col justify-between sticky top-[calc(100vh-4rem)]  md:top-16 h-auto md:h-[calc(100vh-4rem)] z-30 overflow-x-auto md:overflow-visible scrollbar-hide transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full md:translate-y-0"
      }`}
    >
      <div className="p-2 md:p-4 flex flex-row md:flex-col gap-2 w-full md:w-auto justify-between md:justify-start">
        {TABS.map((tab, index) => (
          <SidebarItem
            key={tab.id}
            id={tab.id}
            icon={tab.icon}
            label={tab.label}
            mobileLabel={tab.mobileLabel}
            index={index}
            registerRef={(el) => (itemRefs.current[index] = el)}
            onKeyDown={handleItemKeyDown}
          />
        ))}

        {/* SETTINGS tab as the last "tab" in the sequence for keyboard navigation */}
        {/* <button
          type="button"
          role="tab"
          aria-selected={activeTab === "SETTINGS"}
          aria-current={activeTab === "SETTINGS" ? "page" : undefined}
          aria-label="CONFIG tab"
          tabIndex={activeTab === "SETTINGS" ? 0 : -1}
          ref={(el) => (itemRefs.current[TABS.length] = el)}
          onKeyDown={(e) => handleItemKeyDown(e, TABS.length)}
          onClick={() => dispatch(setActiveTab("SETTINGS"))}
          className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm whitespace-nowrap ${
            activeTab === "SETTINGS"
              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          <UserCircle className="w-4 h-4 shrink-0" />
          <span className="lg:inline font-mono text-sm">CONFIG</span>
        </button> */}

        {/* Mobile Logout (not part of tablist) */}
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
          className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors mb-2 rounded-sm ${
            activeTab === "SETTINGS"
              ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline font-mono text-sm">
            SYSTEM_CONFIG
          </span>
        </button>
        <button
          onClick={() => dispatch(logoutUser())}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors hover:bg-red-50 dark:hover:bg-red-950/20 rounded-sm"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="hidden lg:inline font-mono text-sm">
            TERMINATE_SESSION
          </span>
        </button>
      </div>
    </aside>
  );
}
