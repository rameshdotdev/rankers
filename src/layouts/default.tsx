import React from "react";

// import { Navbar } from "@heroui/navbar";
import { Search, Terminal } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";

// --- GLOBAL THEME & UTILITIES ---

export const colors = {
  primary: "emerald-500",
  primaryDim: "emerald-900",
  accent: "fuchsia-500",
  warn: "red-500",
  text: "zinc-100",
  textBody: "zinc-300",
  textMuted: "zinc-500",
  bg: "black",
  surface: "zinc-950",
  surfaceHighlight: "zinc-900",
  border: "zinc-800",
};

export const styleUtils = {
  cyberGlow: `shadow-[0_0_15px_rgba(16,185,129,0.4)]`,
  monoStyle: `font-mono uppercase tracking-widest`,
  cardHover: `hover:border-${colors.primary} hover:bg-${colors.surfaceHighlight} transition-all duration-300 group`,
};

// Mocked Link Component (Fixes the isExternal warning)
const Link: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    isExternal?: boolean;
    href: string;
    title?: string;
  }
> = ({ children, className, href, isExternal, ...props }) => (
  <a
    href={href}
    className={className}
    target={isExternal ? "_blank" : undefined}
    rel={isExternal ? "noopener noreferrer" : undefined}
    {...props}
  >
    {children}
  </a>
);

export const title = ({
  color,
  size = "default",
  class: className = "",
}: {
  color?: string;
  size?: "sm" | "default" | "lg";
  class?: string;
}) => {
  let sizeClass =
    size === "lg"
      ? "text-5xl md:text-[9rem] lg:text-[10rem]"
      : size === "sm"
        ? "text-xl md:text-3xl"
        : "text-4xl md:text-7xl";
  const colorClass =
    color === "violet" ? `text-${colors.accent}` : `text-${colors.text}`;
  return `font-black leading-none tracking-tighter ${styleUtils.monoStyle} ${sizeClass} ${colorClass} ${className}`;
};

export const subtitle = ({ class: className = "" }: { class?: string }) =>
  `text-lg md:text-xl text-${colors.textBody} ${styleUtils.monoStyle} ${className}`;

export const buttonStyles = ({
  variant,
  radius,
  className = "",
}: {
  variant: "shadow" | "bordered";
  radius: "full" | "xl" | "sm";
  className?: string;
}) => {
  const base =
    "flex items-center justify-center font-bold transition duration-200 ease-in-out px-8 py-4 w-full sm:w-auto text-center whitespace-nowrap uppercase tracking-widest text-sm md:text-base relative overflow-hidden group";
  const radiusClass = radius === "full" ? "rounded-full" : "rounded-sm";

  if (variant === "shadow") {
    return `${base} ${radiusClass} bg-${colors.primary} text-black border border-${colors.primary} ${styleUtils.cyberGlow} hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 ${className}`;
  }
  return `${base} ${radiusClass} border border-${colors.primary} text-${colors.primary} bg-transparent hover:bg-${colors.primary}/10 ${className}`;
};

// === COMPONENT: NAVBAR ===
const Navbar = () => (
  <header
    className={`sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-${colors.border}`}
  >
    <div className="container mx-auto max-w-7xl h-20 flex items-center justify-between px-6">
      {/* Logo Area */}
      <div className="flex items-center space-x-3 group cursor-pointer">
        <div
          className={`p-2 bg-zinc-900 rounded-sm border border-zinc-800 group-hover:border-${colors.primary} transition-colors`}
        >
          <Terminal className={`text-${colors.primary} h-5 w-5`} />
        </div>
        <span
          className={`text-lg md:text-xl ${styleUtils.monoStyle} font-bold text-white tracking-[0.15em]`}
        >
          REVOLT<span className={`text-${colors.primary}`}>_SYS</span>
        </span>
      </div>

      {/* Search Area */}
      <div className="hidden lg:block flex-grow max-w-lg mx-12">
        <div className="relative group">
          <Search
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500 group-hover:text-${colors.primary} transition-colors`}
          />
          <input
            type="text"
            placeholder="SEARCH_DATABASE :: GATE / NET / BPSE"
            className={`w-full pl-12 pr-4 py-3 border border-${colors.border} bg-zinc-950 text-zinc-100 rounded-sm text-xs font-mono focus:ring-1 focus:ring-${colors.primary} focus:border-${colors.primary} focus:bg-black transition-all placeholder-zinc-600 outline-none`}
          />
        </div>
      </div>

      {/* Nav Links & User */}
      <div className="flex items-center space-x-6 md:space-x-8">
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/pyq"
            className={`text-xs ${styleUtils.monoStyle} text-zinc-400 hover:text-white hover:underline decoration-${colors.primary} underline-offset-4 transition-all`}
          >
            ARCHIVES
          </Link>
          <ThemeSwitch />
          <Link
            href="/profile"
            className={`text-xs ${styleUtils.monoStyle} text-zinc-400 hover:text-white hover:underline decoration-${colors.primary} underline-offset-4 transition-all`}
          >
            STATUS
          </Link>
        </nav>
        <div
          className={`h-9 w-9 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-${colors.primary} text-xs font-bold font-mono cursor-pointer hover:border-${colors.primary} hover:bg-zinc-800 transition-all`}
        >
          JD
        </div>
      </div>
    </div>
  </header>
);

// === COMPONENT: DEFAULT LAYOUT ===
export const DefaultLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <div
    className={`relative flex flex-col min-h-screen bg-black font-sans text-${colors.text} selection:bg-${colors.primary} selection:text-black overflow-x-hidden`}
  >
    {/* Global CSS Injections */}
    <style
      dangerouslySetInnerHTML={{
        __html: `
            html, body { background-color: #000; }
            @keyframes scanline {
                0% { background-position: 0 0; }
                100% { background-position: 0 30px; }
            }
            .scanline-bg {
                background: repeating-linear-gradient(to bottom, transparent 0px, transparent 1px, rgba(0, 0, 0, 0.2) 1px, rgba(0, 0, 0, 0.2) 3px);
                background-size: 100% 3px;
                animation: scanline 8s linear infinite;
                pointer-events: none;
            }
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #000; }
            ::-webkit-scrollbar-thumb { background: #333; }
            ::-webkit-scrollbar-thumb:hover { background: #10b981; }
        `,
      }}
    />

    <Navbar />

    <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16 relative z-10">
      {children}
    </main>

    <footer className="w-full flex items-center justify-center py-8 border-t border-zinc-900 mt-auto">
      <Link
        isExternal
        className="flex items-center gap-2 text-current hover:opacity-80 transition-opacity"
        href="https://heroui.com"
        title="heroui.com homepage"
      >
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
          Powered by
        </span>
        <p
          className={`text-${colors.primary} text-xs font-mono font-bold uppercase tracking-widest`}
        >
          HeroUI
        </p>
      </Link>
    </footer>
  </div>
);
