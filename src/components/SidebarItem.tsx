import { selectActiveTab, setActiveTab } from "@/feature/tabs/tabSlice";
import { TabType } from "@/types";
import { useDispatch, useSelector } from "react-redux";

const SidebarItem = ({
  id,
  icon: Icon,
  label,
  mobileLabel,
}: {
  id: TabType;
  icon: any;
  label: string;
  mobileLabel?: string;
}) => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  return (
    <button
      onClick={() => dispatch(setActiveTab(id))}
      className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-sm transition-all font-mono text-sm whitespace-nowrap ${activeTab === id ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"}`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="hidden lg:inline">{label}</span>
      <span className="inline lg:hidden md:hidden">{mobileLabel || label}</span>
    </button>
  );
};

export default SidebarItem;
