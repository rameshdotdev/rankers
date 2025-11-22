import { selectActiveTab, setActiveTab } from "@/feature/tabs/tabSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { TabType } from "@/types";
import { LucideIcon } from "lucide-react";
import React from "react";

interface SidebarItemProps {
  id: TabType;
  icon: LucideIcon;
  label: string;
  mobileLabel?: string;

  // 👇 for keyboard support & focus management (from parent Sidebar)
  index: number;
  registerRef: (el: HTMLButtonElement | null) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => void;
}

const SidebarItem = ({
  id,
  icon: Icon,
  label,
  mobileLabel,
  index,
  registerRef,
  onKeyDown,
}: SidebarItemProps) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveTab);

  const isActive = activeTab === id;

  return (
    <button
      ref={registerRef}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-current={isActive ? "page" : undefined}
      aria-label={`${label} tab`}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={(e) => onKeyDown(e, index)}
      onClick={() => dispatch(setActiveTab(id))}
      className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm whitespace-nowrap ${
        isActive
          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800"
          : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="hidden lg:inline">{label}</span>
      <span className="inline lg:hidden md:hidden">{mobileLabel || label}</span>
    </button>
  );
};

export default SidebarItem;
