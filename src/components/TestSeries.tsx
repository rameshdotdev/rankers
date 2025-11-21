import React, { useState } from "react";
import {
  Search,
  Users,
  Zap,
  Clock,
  FileText,
  ChevronRight,
  Globe,
  Flame,
  Timer,
  Filter,
  TrendingUp,
} from "lucide-react";

// --- MOCK DATA ---

const CATEGORIES = [
  "All",
  "Regulatory Body Exams",
  "SSC",
  "PG Entrance Exam",
  "Fitter",
  "Teaching Exams",
  "Electrician",
  "AE/JE Exams",
  "Paramedical Exams",
  "Electronic Mechanic",
  "Banking",
  "Railways",
];

const ENROLLED_SERIES = [
  {
    id: "es1",
    title: "RRB Group D Mock Test Series 2024-25",
    progress: "1/1959 tests",
    icon: "🚂",
    color: "bg-red-50 dark:bg-red-900/20 text-red-600",
  },
  {
    id: "es2",
    title: "RPF Constable Mock Test Series",
    progress: "1/1197 tests",
    icon: "👮",
    color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
  },
];

const LIVE_TESTS = [
  {
    id: "lt1",
    title: "All India RRB Group D: Ultimate Live Test",
    tags: ["LIVE TEST", "FREE"],
    questions: 100,
    mins: 90,
    marks: 100,
    date: "20 Nov, 15:00 to 22 Nov, 21:00",
    languages: ["English", "Hindi", "+ 5 More"],
    status: "LIVE",
  },
  {
    id: "lt2",
    title: "RRB Group D: (New Exam Date Out) Mega Mock",
    tags: ["LIVE TEST", "FREE"],
    questions: 100,
    mins: 90,
    marks: 100,
    date: "18 Nov, 2:25 to 21 Nov, 21:00",
    languages: ["English", "Hindi", "+ 6 More"],
    status: "LIVE",
  },
  {
    id: "lt3",
    title: "RRB Group D - (Official Mock Link Out)",
    tags: ["LIVE TEST", "FREE"],
    questions: 100,
    mins: 90,
    marks: 100,
    date: "20 Nov, 14:30 to 22 Nov, 21:00",
    languages: ["English", "Hindi", "+ 5 More"],
    status: "LIVE",
  },
];

interface SeriesItem {
  id: string;
  title: string;
  users: string;
  totalTests: number;
  freeTests: number;
  languages: string[];
  features: string[];
  icon: string;
  category: string;
  progress?: string;
}

const SERIES_LIST: SeriesItem[] = [
  {
    id: "s1",
    title: "RRB Group D Mock Test Series 2024-25",
    users: "2146.0k",
    totalTests: 1959,
    freeTests: 0,
    languages: ["English", "Hindi"],
    features: [
      "40 New Pattern Full Test",
      "312 RRB NTPC 2025 PYST",
      "12 Ultimate Live Test",
      "+1595 more tests",
    ],
    icon: "🚂",
    category: "Railways",
  },
  {
    id: "s2",
    title: "SSC CHSL Mock Test Series 2025 (Tier I & II)",
    users: "1007.2k",
    totalTests: 2154,
    freeTests: 24,
    languages: ["English", "Hindi"],
    features: [
      "20 Exam Day Special",
      "45 SSC CGL 2025 Similar PYP",
      "2 Live Test",
      "+2087 more tests",
    ],
    icon: "🏛️",
    category: "SSC",
  },
  {
    id: "s3",
    title: "UP Home Guard Mock Test Series 2025",
    users: "43.2k",
    totalTests: 177,
    freeTests: 3,
    languages: ["English", "Hindi"],
    features: [
      "1 Live Test",
      "25 Similar Exam GK PYST",
      "89 Chapter Test",
      "+62 more tests",
    ],
    icon: "🛡️",
    category: "Regulatory Body Exams",
  },
  {
    id: "s4",
    title: "SSC CPO Mock Test Series",
    users: "399.1k",
    totalTests: 850,
    freeTests: 10,
    languages: ["English", "Hindi"],
    features: [
      "10 Full Length Mocks",
      "Previous Year Papers",
      "Sectional Tests",
      "+500 more tests",
    ],
    icon: "👮",
    category: "SSC",
  },
];

export const TestSeries: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSeries = SERIES_LIST.filter((series) => {
    const matchesCategory =
      activeCategory === "All" ||
      series.category === activeCategory ||
      (activeCategory === "SSC" && series.title.includes("SSC"));
    const matchesSearch = series.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-0">
      {/* 1. Enrolled Section */}
      <section>
        <h2 className="text-lg md:text-xl font-mono font-bold text-zinc-900 dark:text-zinc-100 mb-4 md:mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-500" />
          Your Enrolled Test Series
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ENROLLED_SERIES.map((series) => (
            <div
              key={series.id}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-sm hover:border-emerald-500/50 transition-all cursor-pointer group flex items-center justify-between shadow-sm active:scale-[0.98] duration-200"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${series.color}`}
                >
                  {series.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1 mb-1">
                    {series.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500">
                    {series.progress}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* 2. Live Tests Section */}
      <section>
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500 fill-current" />
            <span>
              Live Tests &{" "}
              <span className="text-emerald-500 hidden sm:inline">
                Free Quizzes
              </span>
            </span>
          </h2>
          <button className="text-xs font-mono text-emerald-600 dark:text-emerald-500 hover:underline bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full whitespace-nowrap">
            View All
          </button>
        </div>

        {/* Full Bleed Mobile Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
          {LIVE_TESTS.map((test) => (
            <div
              key={test.id}
              className="snap-center min-w-[85vw] sm:min-w-[300px] md:min-w-[350px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all"
            >
              {/* Top Tags */}
              <div className="flex gap-2 mb-4">
                {test.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] font-bold font-mono px-2 py-1 rounded-sm text-white ${tag === "LIVE TEST" ? "bg-rose-600 animate-pulse" : "bg-emerald-500"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 line-clamp-2 h-12 text-base md:text-lg">
                {test.title}
              </h3>

              <div className="flex items-center gap-3 text-[10px] md:text-xs text-zinc-500 font-mono mb-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" /> {test.questions} Qs
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {test.mins} Mins
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {test.marks} Marks
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                  <Timer className="w-3 h-3 text-rose-500" />
                  <span className="truncate">{test.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">
                    <Globe className="w-3 h-3" /> {test.languages.join(", ")}
                  </div>
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2 px-4 rounded-sm transition-colors shadow-lg shadow-emerald-500/20 whitespace-nowrap">
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* 2. Live Tests Section */}
      <section>
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Popular Test Series
          </h2>
          <button className="text-xs font-mono text-emerald-600 dark:text-emerald-500 hover:underline bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full whitespace-nowrap">
            View All
          </button>
        </div>

        {/* Full Bleed Mobile Scroll Container */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {SERIES_LIST.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all group flex flex-col"
            >
              {/* Card Header */}
              <div className="p-4 md:p-5 bg-gradient-to-br from-fuchsia-50 to-blue-50 dark:from-fuchsia-900/10 dark:to-blue-900/10 border-b border-zinc-100 dark:border-zinc-800/50">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-xl shadow-sm">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-amber-600 dark:text-amber-500 bg-amber-100 dark:bg-amber-900/20 px-2 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                    <Flame className="w-3 h-3 fill-current" />
                    {item.users} Users
                  </div>
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                  {item.title}
                </h3>

                <div className="mt-4 w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-2"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-mono text-zinc-500">
                  <span>{item.progress || "0%"} Completed</span>
                  <span>{item.totalTests} Total Tests</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-6">
                  {item.features.slice(0, 3).map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400"
                    >
                      <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0"></div>
                      <span>{feat}</span>
                    </div>
                  ))}
                  {item.features.length > 3 && (
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-500 font-mono pl-3.5">
                      {item.features[3]}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-mono mb-4 bg-sky-50 dark:bg-sky-900/10 px-2 py-1.5 rounded self-start">
                  <Globe className="w-3 h-3" />
                  {item.languages.join(", ")}
                </div>

                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 font-bold text-xs rounded-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                    View Test Series
                  </button>
                  <button className="px-3 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-emerald-500 text-zinc-400 hover:text-emerald-500 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* 3. Browse Categories Section */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-lg md:text-xl font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Filter className="w-5 h-5 text-fuchsia-500" />
            Test Series by Categories
          </h2>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search Test Series"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm focus:outline-none focus:border-emerald-500 transition-colors font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Sidebar / Mobile Tabs */}
          <aside className="w-full lg:w-64 shrink-0 z-10">
            <div className="flex lg:flex-col overflow-x-auto pb-2 lg:pb-0 gap-2 lg:gap-0 lg:bg-white lg:dark:bg-zinc-950 lg:border lg:border-zinc-200 lg:dark:border-zinc-800 lg:rounded-sm lg:overflow-hidden lg:sticky lg:top-4 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    whitespace-nowrap px-4 py-2 lg:py-3 text-sm font-mono transition-all rounded-full lg:rounded-none border lg:border-0 lg:border-l-4 text-left shrink-0
                    ${
                      activeCategory === cat
                        ? "bg-emerald-600 text-white border-emerald-600 lg:bg-emerald-50 lg:dark:bg-emerald-900/10 lg:text-emerald-700 lg:dark:text-emerald-400 lg:border-emerald-500 font-bold shadow-sm lg:shadow-none"
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 lg:hover:bg-zinc-50 lg:dark:hover:bg-zinc-900 lg:border-transparent"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Content Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredSeries.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all group flex flex-col"
              >
                {/* Card Header */}
                <div className="p-4 md:p-5 bg-gradient-to-br from-fuchsia-50 to-blue-50 dark:from-fuchsia-900/10 dark:to-blue-900/10 border-b border-zinc-100 dark:border-zinc-800/50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-amber-600 dark:text-amber-500 bg-amber-100 dark:bg-amber-900/20 px-2 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                      <Flame className="w-3 h-3 fill-current" />
                      {item.users} Users
                    </div>
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mt-4 w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-2"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] font-mono text-zinc-500">
                    <span>{item.progress || "0%"} Completed</span>
                    <span>{item.totalTests} Total Tests</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-6">
                    {item.features.slice(0, 3).map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400"
                      >
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0"></div>
                        <span>{feat}</span>
                      </div>
                    ))}
                    {item.features.length > 3 && (
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-500 font-mono pl-3.5">
                        {item.features[3]}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-mono mb-4 bg-sky-50 dark:bg-sky-900/10 px-2 py-1.5 rounded self-start">
                    <Globe className="w-3 h-3" />
                    {item.languages.join(", ")}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500 font-bold text-xs rounded-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                      View Test Series
                    </button>
                    <button className="px-3 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-emerald-500 text-zinc-400 hover:text-emerald-500 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
