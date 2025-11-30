import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  User as UserIcon,
  Info,
  Maximize2,
  Minimize2,
  PauseCircle,
  PlayCircle,
  AlertTriangle,
  LogOut,
  Clock,
  Bookmark,
  RotateCcw,
  Save,
} from "lucide-react";
import { Question, QuestionStatus } from "../types";

// interface TestRunnerProps {
//   onExit: () => void;
//   onComplete: (result: TestResult) => void;
// }

// --- MOCK DATA FOR SECTIONS ---
const SECTIONS = [
  "Language (Part-I)",
  "General Studies (Part-II)",
  "Computer Science (Part-III)",
];

const MOCK_QUESTIONS: Question[] = [
  // SECTION 1: LANGUAGE
  {
    id: "q1",
    section: SECTIONS[0],
    type: "COMPREHENSION",
    passage:
      "Kerala is just the place for you if you love variety. There is something here to please everyone. You are sure to fall in love with the serene beauty of Kerala's magical backwaters. When you have experienced that, you can sample the excitement of Kerala's bustling cities or retreat into the villages to see at first-hand how time can stand still. Better still, take a trip to the spice gardens in the hills, to inhale the fragrance of fresh cardamoms if that makes your tastebuds tingle.",
    text: "Why would foreign bargain-hunter visitors never face a problem in Kerala?",
    options: [
      "Many foreign languages are spoken in Kerala",
      "Hindi is the language of communication in the cities of kerala.",
      "English is spoken and understood everywhere in Kerala.",
      "More than one of the above",
      "None of the above",
    ],
    correctIndex: 2,
    positiveMarks: 1,
    negativeMarks: 0,
  },
  {
    id: "q2",
    section: SECTIONS[0],
    text: 'Choose the correct antonym for the word: "Fragrance"',
    options: ["Aroma", "Stench", "Scent", "Perfume", "None of the above"],
    correctIndex: 1,
    positiveMarks: 1,
    negativeMarks: 0,
  },

  // SECTION 2: GENERAL STUDIES
  {
    id: "q3",
    section: SECTIONS[1],
    text: 'Which Article of the Indian Constitution deals with the "Abolition of Untouchability"?',
    options: [
      "Article 16",
      "Article 17",
      "Article 18",
      "More than one of the above",
      "None of the above",
    ],
    correctIndex: 1,
    positiveMarks: 1,
    negativeMarks: 0,
  },
  {
    id: "q4",
    section: SECTIONS[1],
    text: "Who is the current Chief of Defence Staff (CDS) of India?",
    options: [
      "Gen. Anil Chauhan",
      "Gen. Bipin Rawat",
      "Gen. MM Naravane",
      "More than one of the above",
      "None of the above",
    ],
    correctIndex: 0,
    positiveMarks: 1,
    negativeMarks: 0,
  },

  // SECTION 3: COMPUTER SCIENCE
  {
    id: "q5",
    section: SECTIONS[2],
    text: "Which of the following is NOT a valid access modifier in Java?",
    options: ["public", "protected", "friend", "private", "None of the above"],
    correctIndex: 2,
    positiveMarks: 1,
    negativeMarks: 0,
  },
  {
    id: "q6",
    section: SECTIONS[2],
    text: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(n^2)", "O(log n)", "O(1)", "None of the above"],
    correctIndex: 2,
    positiveMarks: 1,
    negativeMarks: 0,
  },
];

export const TestRunner: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(SECTIONS[0]);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Map Question ID to Status
  const [questionStatus, setQuestionStatus] = useState<{
    [key: string]: QuestionStatus;
  }>({});
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(9000); // 150 mins
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Feature States
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Filter questions for current section
  const sectionQuestions = MOCK_QUESTIONS.filter(
    (q) => q.section === currentSection
  );
  const activeQuestion = sectionQuestions[currentQIndex];

  useEffect(() => {
    // Initialize all as NOT_VISITED
    const initialStatus: { [key: string]: QuestionStatus } = {};
    MOCK_QUESTIONS.forEach((q) => {
      initialStatus[q.id] = QuestionStatus.NOT_VISITED;
    });
    setQuestionStatus(initialStatus);

    // Fullscreen change listener
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Timer Logic with Pause check
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Update status to NOT_ANSWERED when visiting if it was NOT_VISITED
  useEffect(() => {
    if (activeQuestion && !isPaused) {
      setQuestionStatus((prev) => {
        if (prev[activeQuestion.id] === QuestionStatus.NOT_VISITED) {
          return { ...prev, [activeQuestion.id]: QuestionStatus.NOT_ANSWERED };
        }
        return prev;
      });
    }
  }, [activeQuestion, isPaused]);

  // --- FEATURES ---
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(
          `Error attempting to enable fullscreen mode: ${e.message} (${e.name})`
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")} : ${mins.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: optIndex }));
  };

  const handleSaveAndNext = () => {
    if (answers[activeQuestion.id] !== undefined) {
      setQuestionStatus((prev) => ({
        ...prev,
        [activeQuestion.id]: QuestionStatus.ANSWERED,
      }));
    } else {
      setQuestionStatus((prev) => ({
        ...prev,
        [activeQuestion.id]: QuestionStatus.NOT_ANSWERED,
      }));
    }
    moveToNext();
  };

  const handleMarkReviewAndNext = () => {
    if (answers[activeQuestion.id] !== undefined) {
      setQuestionStatus((prev) => ({
        ...prev,
        [activeQuestion.id]: QuestionStatus.ANSWERED_AND_MARKED,
      }));
    } else {
      setQuestionStatus((prev) => ({
        ...prev,
        [activeQuestion.id]: QuestionStatus.MARKED_FOR_REVIEW,
      }));
    }
    moveToNext();
  };

  const handleClearResponse = () => {
    const newAnswers = { ...answers };
    delete newAnswers[activeQuestion.id];
    setAnswers(newAnswers);
    setQuestionStatus((prev) => ({
      ...prev,
      [activeQuestion.id]: QuestionStatus.NOT_ANSWERED,
    }));
  };

  const moveToNext = () => {
    if (currentQIndex < sectionQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Try to move to next section
      const currSecIdx = SECTIONS.indexOf(currentSection);
      if (currSecIdx < SECTIONS.length - 1) {
        if (
          confirm(
            `You have reached the end of ${currentSection}. Proceed to ${SECTIONS[currSecIdx + 1]}?`
          )
        ) {
          setCurrentSection(SECTIONS[currSecIdx + 1]);
          setCurrentQIndex(0);
        }
      }
    }
  };

  const handleSubmit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => console.log(err));
    }

    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    MOCK_QUESTIONS.forEach((q) => {
      const ans = answers[q.id];
      if (ans === undefined) {
        unattempted++;
      } else if (ans === q.correctIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    // onComplete({
    //   totalQuestions: MOCK_QUESTIONS.length,
    //   correctAnswers: correct,
    //   wrongAnswers: wrong,
    //   unattempted,
    //   score: Math.round((correct / MOCK_QUESTIONS.length) * 100),
    //   accuracy: correct + wrong > 0 ? (correct / (correct + wrong)) * 100 : 0,
    //   timeTaken: 9000 - timeLeft,
    // });
  };

  const getStatusColor = (status: QuestionStatus) => {
    switch (status) {
      case QuestionStatus.ANSWERED:
        return "bg-emerald-500 text-white clip-path-polygon-flat";
      case QuestionStatus.NOT_ANSWERED:
        return "bg-red-500 text-white clip-path-polygon-flat";
      case QuestionStatus.MARKED_FOR_REVIEW:
        return "bg-purple-600 text-white rounded-full";
      case QuestionStatus.ANSWERED_AND_MARKED:
        return 'bg-purple-600 text-white rounded-full relative after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:bg-green-500 after:rounded-full after:border after:border-white';
      default:
        return "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-sm";
    }
  };

  const stats = {
    answered: Object.values(questionStatus).filter(
      (s) => s === QuestionStatus.ANSWERED
    ).length,
    notAnswered: Object.values(questionStatus).filter(
      (s) => s === QuestionStatus.NOT_ANSWERED
    ).length,
    notVisited: Object.values(questionStatus).filter(
      (s) => s === QuestionStatus.NOT_VISITED
    ).length,
    marked: Object.values(questionStatus).filter(
      (s) => s === QuestionStatus.MARKED_FOR_REVIEW
    ).length,
    ansMarked: Object.values(questionStatus).filter(
      (s) => s === QuestionStatus.ANSWERED_AND_MARKED
    ).length,
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 font-sans select-none relative overflow-hidden">
      {/* PAUSE OVERLAY */}
      {isPaused && (
        <div className="absolute inset-0 z-[100] bg-white/90 dark:bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-200 p-4">
          <div className="p-8 text-center max-w-md w-full">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-500 animate-pulse">
              <PauseCircle className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Test Paused
            </h2>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 mb-8 font-mono">
              The timer has been stopped. The questions are hidden.
            </p>
            <div className="space-y-3">
              <button
                onClick={togglePause}
                className="w-full flex items-center justify-center gap-2 px-8 py-3 md:py-4 bg-emerald-600 text-white font-bold rounded-sm hover:bg-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/25"
              >
                <PlayCircle className="w-5 h-5" /> RESUME TEST
              </button>
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 px-8 py-3 md:py-4 bg-white dark:bg-zinc-900 text-red-500 font-bold rounded-sm border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              >
                <LogOut className="w-5 h-5" /> SUBMIT & EXIT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="h-14 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-3 md:px-4 shrink-0 transition-colors duration-300 z-20">
        <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
          <div className="p-1.5 bg-zinc-900 text-white rounded-sm shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <h1 className="text-xs md:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
            <span className="md:hidden">TRE 3.0 (Comp Sci)</span>
            <span className="hidden md:inline">
              Bihar शिक्षक TRE 3.0 (Class 11-12) (Computer Science) Official
              Paper
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 px-2 md:px-3 py-1.5 rounded-sm">
            <span className="text-[10px] md:text-xs font-bold text-zinc-500 hidden sm:inline">
              Time Left
            </span>
            <Clock className="w-3 h-3 text-zinc-500 sm:hidden" />
            <span
              className={`font-mono text-sm md:text-base font-bold px-1 md:px-2 rounded ${timeLeft < 300 ? "bg-red-100 text-red-600 animate-pulse" : "bg-zinc-200 dark:bg-black text-zinc-900 dark:text-white"}`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="flex items-center gap-1 md:gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-2 md:pl-4">
            <button
              onClick={toggleFullscreen}
              className="hidden sm:block p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded text-zinc-500 hover:text-emerald-500 transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={togglePause}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded text-zinc-500 hover:text-emerald-500 transition-colors"
              title="Pause / Minimize"
            >
              <PauseCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* SUB-HEADER / SECTIONS */}
      <div className="h-10 bg-blue-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-2 md:px-4 overflow-x-auto scrollbar-hide shrink-0 transition-colors duration-300 gap-2">
        <span className="text-[10px] md:text-xs font-bold text-zinc-500 whitespace-nowrap">
          SECTIONS |
        </span>
        {SECTIONS.map((sec) => (
          <button
            key={sec}
            onClick={() => {
              setCurrentSection(sec);
              setCurrentQIndex(0);
            }}
            className={`
              h-full px-3 md:px-4 text-[10px] md:text-xs font-bold whitespace-nowrap border-b-2 transition-colors flex items-center
              ${
                currentSection === sec
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              }
            `}
          >
            {sec}
            {sec === currentSection && (
              <Info className="w-3 h-3 ml-2 text-white/50" />
            )}
          </button>
        ))}
      </div>

      {/* MAIN BODY (SPLIT VIEW) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT: QUESTION AREA */}
        <main
          className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 mr-0`}
        >
          {/* Question Header Strip */}
          <div className="min-h-[3rem] border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between px-3 py-2 bg-white dark:bg-zinc-950 shrink-0 gap-2 transition-colors duration-300">
            <div className="flex items-center gap-2 md:gap-4">
              <h2 className="text-xs md:text-sm font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                Q. {currentQIndex + 1}
              </h2>
              {activeQuestion.type === "COMPREHENSION" && (
                <span className="hidden sm:inline-block text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded border border-purple-200 whitespace-nowrap">
                  COMPREHENSION
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              <div className="flex items-center gap-1 text-[10px] md:text-xs whitespace-nowrap">
                <span className="font-bold text-zinc-500 hidden sm:inline">
                  Marks
                </span>
                <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                  +{activeQuestion.positiveMarks}
                </span>
                <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">
                  -{activeQuestion.negativeMarks}
                </span>
              </div>
              <div className="text-[10px] md:text-xs text-zinc-500 hidden sm:flex items-center gap-1 whitespace-nowrap">
                View in{" "}
                <span className="font-bold text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 px-1 rounded">
                  English ▾
                </span>
              </div>
              <button className="text-[10px] md:text-xs text-zinc-500 hidden sm:flex items-center gap-1 hover:text-red-500 whitespace-nowrap">
                <AlertTriangle className="w-3 h-3" /> Report
              </button>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 overflow-y-auto bg-white dark:bg-black p-3 md:p-4 flex flex-col md:flex-row gap-4 transition-colors duration-300">
            {/* Passage Panel (If Comprehension) */}
            {activeQuestion.type === "COMPREHENSION" &&
              activeQuestion.passage && (
                <div className="md:w-1/2 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 pr-0 md:pr-4 pb-4 md:pb-0 shrink-0">
                  <h3 className="underline font-bold text-xs md:text-sm mb-2 text-zinc-800 dark:text-zinc-200">
                    Comprehension:
                  </h3>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-sm border border-zinc-100 dark:border-zinc-800 max-h-[200px] md:max-h-none overflow-y-auto">
                    <p className="text-xs md:text-sm leading-relaxed text-zinc-800 dark:text-zinc-300 font-serif">
                      {activeQuestion.passage}
                    </p>
                  </div>
                </div>
              )}

            {/* Question Panel */}
            <div
              className={`flex-1 ${activeQuestion.type === "COMPREHENSION" ? "" : "max-w-4xl mx-auto"}`}
            >
              <h3 className="font-bold underline text-xs md:text-sm mb-2 text-zinc-800 dark:text-zinc-200">
                Question:
              </h3>
              <p className="text-sm md:text-base font-medium text-zinc-900 dark:text-zinc-100 mb-6 leading-relaxed">
                {activeQuestion.text}
              </p>

              <div className="space-y-3">
                {activeQuestion.options.map((opt, idx) => {
                  const isSelected = answers[activeQuestion.id] === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      className="flex items-start gap-3 cursor-pointer group p-2 rounded-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                    >
                      <div
                        className={`
                          w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors
                          ${isSelected ? "border-blue-500" : "border-zinc-400 group-hover:border-blue-400"}
                        `}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <span
                        className={`text-sm ${isSelected ? "text-zinc-900 dark:text-white font-medium" : "text-zinc-700 dark:text-zinc-400"}`}
                      >
                        {opt}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS - Mobile Optimized */}
          <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2 md:px-4 md:h-16 flex flex-col md:flex-row items-center justify-between gap-2 shrink-0 transition-colors duration-300 pb-safe">
            {/* Secondary Actions */}
            <div className="grid grid-cols-2 w-full md:w-auto gap-2">
              <button
                onClick={handleMarkReviewAndNext}
                className="flex items-center justify-center gap-2 px-3 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-[10px] md:text-xs font-bold text-zinc-700 dark:text-zinc-300 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                <Bookmark className="w-3 h-3 md:hidden" />
                <span className="md:inline">Review & Next</span>
              </button>
              <button
                onClick={handleClearResponse}
                className="flex items-center justify-center gap-2 px-3 py-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-[10px] md:text-xs font-bold text-zinc-700 dark:text-zinc-300 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                <RotateCcw className="w-3 h-3 md:hidden" />
                <span className="md:inline">Clear Response</span>
              </button>
            </div>

            {/* Primary Action */}
            <button
              onClick={handleSaveAndNext}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 md:py-2 bg-blue-600 text-white text-sm font-bold rounded-sm hover:bg-blue-500 shadow-sm transition-colors whitespace-nowrap"
            >
              <Save className="w-4 h-4 md:hidden" />
              Save & Next
            </button>
          </footer>
        </main>

        {/* RIGHT: PALETTE SIDEBAR (Desktop) */}
        {isSidebarOpen && (
          <aside className="w-80 bg-blue-50/50 dark:bg-zinc-900/50 border-l border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 overflow-hidden hidden lg:flex transition-colors duration-300">
            {/* Profile Section */}
            <div className="p-4 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                <UserIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  Ramesh
                </h3>
                <p className="text-xs text-zinc-500">Candidate</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="p-4 grid grid-cols-2 gap-y-3 gap-x-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-emerald-500 text-white text-[10px] flex items-center justify-center rounded-sm font-bold clip-path-polygon-flat">
                  {stats.answered}
                </div>
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                  Answered
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-sm font-bold clip-path-polygon-flat">
                  {stats.notAnswered}
                </div>
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                  Not Answered
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-zinc-100 border border-zinc-300 text-zinc-600 text-[10px] flex items-center justify-center rounded-sm font-bold">
                  {stats.notVisited}
                </div>
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                  Not Visited
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-purple-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  {stats.marked}
                </div>
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                  Marked for Review
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <div className="w-5 h-5 bg-purple-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-1.5 after:h-1.5 after:bg-green-500 after:rounded-full after:border after:border-white">
                  {stats.ansMarked}
                </div>
                <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 leading-tight">
                  Answered & Marked for Review
                </span>
              </div>
            </div>

            {/* Palette Section Name */}
            <div className="bg-blue-200 dark:bg-zinc-800 px-4 py-2 font-bold text-xs text-zinc-800 dark:text-zinc-200">
              SECTION : {currentSection}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-5 gap-2">
                {sectionQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`
                        w-10 h-10 flex items-center justify-center text-sm font-bold shadow-sm transition-all rounded-sm
                        ${getStatusColor(questionStatus[q.id])}
                        ${currentQIndex === idx ? "ring-2 ring-offset-1 ring-blue-500" : ""}
                      `}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette Footer */}
            <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2 transition-colors duration-300">
              <button className="w-full py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-sm border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/50">
                Question Paper
              </button>
              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-emerald-500 text-white text-xs font-bold rounded-sm hover:bg-emerald-600 shadow-md transition-colors"
              >
                Submit Test
              </button>
            </div>
          </aside>
        )}

        {/* Mobile Toggle for Palette */}
        <div
          className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 lg:hidden transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -left-10 top-0 w-10 h-14 bg-blue-600 text-white flex items-center justify-center rounded-l-md shadow-lg border-l border-t border-b border-white/20"
          >
            {isSidebarOpen ? (
              <ChevronRight size={24} />
            ) : (
              <ChevronLeft size={24} />
            )}
          </button>

          {/* Mobile Drawer Content */}
          <div className="w-72 h-[70vh] bg-white dark:bg-zinc-900 shadow-2xl border-l border-zinc-200 dark:border-zinc-800 overflow-y-auto flex flex-col rounded-l-sm">
            <div className="p-4 font-bold border-b border-zinc-200 dark:border-zinc-800 dark:text-white bg-zinc-50 dark:bg-zinc-950">
              Question Palette
            </div>
            <div className="p-4 grid grid-cols-5 gap-2 flex-1 content-start">
              {sectionQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQIndex(idx);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                        w-10 h-10 flex items-center justify-center text-sm font-bold rounded-sm shadow-sm
                        ${getStatusColor(questionStatus[q.id])}
                        ${currentQIndex === idx ? "ring-2 ring-offset-1 ring-blue-500" : ""}
                      `}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-sm font-bold transition-colors"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
