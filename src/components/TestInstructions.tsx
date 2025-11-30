import { useState } from "react";
import { ChevronLeft, User as UserIcon, Globe, Clock } from "lucide-react";
import { getUser } from "@/utils/user";
import { useNavigate } from "react-router-dom";

// interface TestInstructionsProps {
//   user: User;
//   onBack: () => void;
//   onProceed: () => void;
// }

export const TestInstructions = () => {
  const [language, setLanguage] = useState("English");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const user = getUser();
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-800 dark:text-zinc-300 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="h-16 border-b border-zinc-200 rounded-2xl dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
        <h1 className="font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-tight text-lg truncate">
          Bihar शिक्षक TRE 3.0 (Class 11-12) (Computer Science) Official Paper
        </h1>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Clock className="w-4 h-4" />
          <span>DURATION: 150 MINS</span>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Instructions Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* General Instructions Section */}
            <section>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                General Instructions:
              </h2>
              <ol className="list-decimal list-outside pl-5 space-y-3 text-sm md:text-base text-zinc-700 dark:text-zinc-400 font-sans leading-relaxed">
                <li>
                  The clock will be set at the server. The countdown timer at
                  the top right corner of screen will display the remaining time
                  available for you to complete the examination. When the timer
                  reaches zero, the examination will end by itself. You need not
                  terminate the examination or submit your paper.
                </li>
                <li>
                  The Question Palette displayed on the right side of screen
                  will show the status of each question using one of the
                  following symbols:
                  {/* Legend Grid */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-100 dark:bg-zinc-900/50 p-4 rounded-sm border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 shadow-sm flex items-center justify-center font-mono text-xs">
                        1
                      </div>
                      <span className="text-xs">
                        You have not visited the question yet.
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-red-500 text-white flex items-center justify-center font-mono text-xs clip-path-polygon">
                        2
                      </div>
                      <span className="text-xs">
                        You have not answered the question.
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-emerald-500 text-white flex items-center justify-center font-mono text-xs">
                        3
                      </div>
                      <span className="text-xs">
                        You have answered the question.
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-mono text-xs">
                        4
                      </div>
                      <span className="text-xs">
                        You have NOT answered the question, but have marked the
                        question for review.
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-mono text-xs relative">
                        5
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                      </div>
                      <span className="text-xs">
                        The question(s) "Answered and Marked for Review" will be
                        considered for evaluation.
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  The <strong>Mark For Review</strong> status for a question
                  simply indicates that you would like to look at that question
                  again. If a question is answered, but marked for review, then
                  the answer will be considered for evaluation unless the status
                  is modified by the candidate.
                </li>
              </ol>
            </section>

            {/* Navigating Section */}
            <section>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                Navigating to a Question:
              </h3>
              <div className="space-y-2 text-sm md:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                <p>3. To answer a question, do the following:</p>
                <ol className="list-[lower-alpha] list-outside pl-5 space-y-1 mt-1">
                  <li>
                    Click on the question number in the Question Palette at the
                    right of your screen to go to that numbered question
                    directly. Note that using this option does NOT save your
                    answer to the current question.
                  </li>
                  <li>
                    Click on <strong>Save & Next</strong> to save your answer
                    for the current question and then go to the next question.
                  </li>
                  <li>
                    Click on <strong>Mark for Review & Next</strong> to save
                    your answer for the current question and also mark it for
                    review, and then go to the next question.
                  </li>
                </ol>
              </div>
            </section>

            {/* Language & Declaration */}
            <section className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-sm shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-900">
                <label className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-500" />
                  Choose your default language:
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer min-w-[150px]"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
              <p className="text-xs text-red-500 mb-6">
                Please note all questions will appear in your default language.
                This language can be changed for a particular question later on.
              </p>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-sm">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    id="declaration"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-5 h-5 border-2 border-zinc-400 dark:border-zinc-600 rounded-sm cursor-pointer accent-emerald-500"
                  />
                </div>
                <label
                  htmlFor="declaration"
                  className="text-sm text-zinc-800 dark:text-zinc-300 cursor-pointer select-none leading-snug"
                >
                  <span className="font-bold">Declaration:</span> I have read
                  all the instructions carefully and have understood them. I
                  agree not to cheat or use unfair means in this examination. I
                  understand that using unfair means of any sort for my own or
                  someone else's advantage will lead to my immediate
                  disqualification.
                </label>
              </div>
            </section>
          </div>
        </div>

        {/* Right Sidebar: Profile (Hidden on mobile) */}
        <aside className="hidden lg:flex w-72 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black flex-col items-center p-8 text-center shrink-0">
          <div className="w-32 h-32 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6 border-4 border-white dark:border-zinc-900 shadow-md">
            <UserIcon className="w-16 h-16" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
            {user.name.split("_")[0]}
          </h2>
          <p className="text-zinc-500 font-mono text-sm">
            CANDIDATE_ID: {user.id}
          </p>
        </aside>
      </main>

      {/* Footer Actions */}
      <footer className="h-20 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-4 md:px-6 flex items-center justify-between sticky bottom-0 z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] dark:shadow-none">
        <button
          //   onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-mono text-sm font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors rounded-sm"
        >
          <ChevronLeft className="w-4 h-4" /> PREVIOUS
        </button>

        <button
          //   onClick={onProceed}
          disabled={!isChecked}
          onClick={() => navigate("/runner")}
          className={`
            px-8 py-3 bg-emerald-600 text-white font-mono text-sm font-bold tracking-wide rounded-sm transition-all shadow-lg
            ${
              isChecked
                ? "hover:bg-emerald-500 hover:shadow-emerald-500/25 cursor-pointer transform hover:-translate-y-0.5"
                : "opacity-50 cursor-not-allowed grayscale"
            }
          `}
        >
          I AM READY TO BEGIN
        </button>
      </footer>
    </div>
  );
};
