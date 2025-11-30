import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Clock,
  Search,
  Filter,
  BookOpen,
  Monitor,
  Globe,
  Download,
  PlayCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks";

export const PYQList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState<string>("ALL");
  const navigate = useNavigate();
  const PYQ_DATA = useAppSelector((store) => store.pyq.papers);
  const filteredPapers = PYQ_DATA.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.examCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExam =
      selectedExam === "ALL" || paper.examCategory.includes(selectedExam);
    return matchesSearch && matchesExam;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "LANG":
        return <Globe className="w-3 h-3" />;
      case "GS":
        return <BookOpen className="w-3 h-3" />;
      case "SUB":
        return <Monitor className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-500" />
            Previous Year Archives
          </h1>
          <p className="text-sm text-zinc-500 mt-1 font-mono">
            ACCESS_DB // SOLVED_PAPERS // 2018-2024
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by Exam or Year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm text-sm font-mono focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <button className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {["ALL", "BPSC TRE 3.0", "BPSC TRE 2.0", "BPSC TRE 1.0"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedExam(tab)}
            className={`
              px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap border transition-all
              ${
                selectedExam === tab
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border-zinc-900 dark:border-zinc-100 font-bold"
                  : "bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Papers List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm p-4 md:p-6 hover:border-emerald-500/50 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all group relative overflow-hidden"
            >
              {/* Decorative Stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-emerald-500 transition-colors"></div>

              <div className="flex flex-col md:flex-row justify-between gap-6 pl-2">
                {/* Left Content: Title & Meta */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-[10px] font-mono rounded border border-zinc-200 dark:border-zinc-800">
                      {paper.setNumber}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono rounded border border-emerald-200 dark:border-emerald-800/50">
                      {paper.examCategory}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      // {paper.classLevel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors">
                      {paper.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs font-mono text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {paper.date}
                      </div>
                      {paper.shift && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {paper.shift}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sections / Parts */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {paper.sections.map((sec, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-2 py-1 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded text-[10px] text-zinc-600 dark:text-zinc-400 font-mono"
                      >
                        {getIcon(sec.icon)}
                        {sec.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Content: Actions */}
                <div className="flex flex-row md:flex-col justify-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
                  <button
                    onClick={() => navigate("/instructions")}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold font-mono rounded-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors shadow-sm"
                  >
                    <PlayCircle className="w-4 h-4" />
                    ATTEMPT
                  </button>
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold font-mono rounded-sm hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-sm">
            <p className="font-mono text-zinc-500">
              NO ARCHIVES FOUND MATCHING PARAMETERS
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
