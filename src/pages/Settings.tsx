import React, { useState } from "react";
import YourExams from "@/components/YourExams";
import Profile from "@/components/Profile";
import Account from "@/components/Account";
import Pass from "@/components/Pass";

export const Settings: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    "PROFILE" | "YOUR_EXAMS" | "ACCOUNT" | "PASS" | "PASS_PRO"
  >("YOUR_EXAMS");

  return (
    <div className="animate-in fade-in duration-300 w-full">
      <h1 className="text-3xl font-mono font-bold text-zinc-900 dark:text-white tracking-tight mb-8">
        Settings
      </h1>

      {/* Settings Tabs */}
      <div className="flex items-center gap-8 border-b border-zinc-200 dark:border-zinc-800 mb-10 overflow-x-auto scrollbar-hide">
        {(
          ["PROFILE", "YOUR_EXAMS", "ACCOUNT", "PASS", "PASS_PRO"] as const
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`pb-3 text-sm font-mono whitespace-nowrap transition-all relative ${
              activeSubTab === tab
                ? "text-emerald-600 dark:text-emerald-500 font-bold"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            }`}
          >
            {tab.replace("_", " ")}
            {activeSubTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
            )}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div>
        {activeSubTab === "YOUR_EXAMS" && <YourExams />}

        {activeSubTab === "PROFILE" && <Profile />}

        {activeSubTab === "ACCOUNT" && <Account />}

        {(activeSubTab === "PASS" || activeSubTab === "PASS_PRO") && <Pass />}
      </div>
    </div>
  );
};
