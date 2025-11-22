import React, { useState } from "react";
import {
  Construction,
  Bell,
  Lock,
  Cpu,
  Activity,
  Terminal,
  ShieldAlert,
} from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
  eta?: string;
  progress?: number;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description = "This module is currently undergoing final calibration.",
  eta = "Q1 2025",
  progress = 72,
}) => {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate API call
    setTimeout(() => setNotified(true), 800);
  };

  return (
    <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 animate-in fade-in duration-700">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-[size:40px_40px] bg-grid-pattern-light dark:bg-grid-pattern opacity-[0.03]"></div>
      </div>

      <div className="max-w-3xl w-full relative z-10 flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 mb-8">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
          <span className="text-[10px] font-mono font-bold text-yellow-700 dark:text-yellow-500 tracking-widest uppercase">
            System_Upgrade_In_Progress
          </span>
        </div>

        {/* Main Icon Graphic */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center relative z-10 shadow-xl">
            <Construction className="w-12 h-12 md:w-16 md:h-16 text-zinc-400 dark:text-zinc-600" />
            <div className="absolute -right-3 -bottom-3 bg-white dark:bg-zinc-950 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg">
              <Lock className="w-6 h-6 text-emerald-500" />
            </div>
          </div>

          {/* Decorative Lines */}
          <div className="absolute -left-12 top-1/2 w-8 h-px bg-zinc-300 dark:bg-zinc-700 hidden md:block"></div>
          <div className="absolute -right-12 top-1/2 w-8 h-px bg-zinc-300 dark:bg-zinc-700 hidden md:block"></div>
        </div>

        {/* Typography */}
        <h1 className="text-3xl md:text-5xl font-black font-mono text-zinc-900 dark:text-white mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-lg font-light leading-relaxed mb-8">
          {description}
        </p>

        {/* Progress Indicator */}
        <div className="w-full max-w-md mb-10">
          <div className="flex justify-between text-xs font-mono text-zinc-500 mb-2">
            <span>COMPILATION_STATUS</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12"></div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-zinc-400 mt-2">
            <span>EST. LAUNCH: {eta}</span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3" /> OPTIMIZING...
            </span>
          </div>
        </div>

        {/* Notification Form */}
        {notified ? (
          <div className="flex items-center gap-2 px-6 py-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-sm text-emerald-600 dark:text-emerald-500 animate-in zoom-in-95">
            <Activity className="w-5 h-5" />
            <span className="font-mono text-sm font-bold">
              NOTIFY_PROTOCOL_ACTIVATED
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleNotify}
            className="flex w-full max-w-sm items-center gap-2"
          >
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Terminal className="h-4 w-4 text-zinc-400" />
              </div>
              <input
                type="email"
                placeholder="ENTER_EMAIL_ID"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm text-sm font-mono placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 hover:text-white transition-colors flex items-center justify-center"
            >
              <Bell className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="inline-flex items-center gap-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> Secure Area
          </span>
          <span>//</span>
          <span>V.2.1.0 Build</span>
        </div>
      </div>
    </div>
  );
};
