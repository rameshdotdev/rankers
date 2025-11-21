import { getUser } from "@/utils/user";
import { MoreVertical, Target } from "lucide-react";
import { useMemo, useState } from "react";
type ExamCard = {
  id: string;
  title: string;
  code: string;
};
export default function YourExams() {
  const user = getUser();

  const [availableExams] = useState<ExamCard[]>([
    { id: "stet-cs", title: "Bihar STET Computer Science", code: "STET_CS" },
    { id: "ctet", title: "CTET Paper II", code: "CTET_II" },
    { id: "reet", title: "REET Level II", code: "REET_L2" },
  ]);

  // ---- DERIVED DATA ----
  const selectedExamDetails = useMemo(
    () =>
      availableExams.filter((exam) => user?.selectedExams?.includes(exam.id)),
    [availableExams, user.selectedExams]
  );

  // Example: "Add More Exams" internal logic
  const handleAddMoreExams = () => {
    // yaha par aap modal / side panel / route navigation use कर सकते हैं
    // फिलहाल demo के लिए हम बस next available exam add कर रहे हैं
    const remaining = availableExams.filter(
      (exam) => !user.selectedExams?.includes(exam.id)
    );

    if (remaining.length === 0) {
      alert("All exams already configured 🚀");
      return;
    }

    // const nextExamId = remaining[0].id;
    // setUser((prev) => ({
    //   ...prev,
    //   selectedExams: [...prev.selectedExams, nextExamId],
    // }));
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100">
          Active Protocols
        </h2>
        <span className="text-xs font-mono text-zinc-500">
          {user?.selectedExams?.length} EXAMS CONFIGURED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedExamDetails.length > 0 ? (
          selectedExamDetails.map((exam) => (
            <div
              key={exam.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 group-hover:border-emerald-500/50 transition-colors">
                  <Target className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                    {exam.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500">{exam.code}</p>
                </div>
              </div>
              <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-12 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-sm">
            <p className="font-mono text-zinc-500">
              NO ACTIVE PROTOCOLS DETECTED
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={handleAddMoreExams}
          className="px-8 py-3 rounded-full bg-emerald-500 text-white dark:text-black font-bold text-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
        >
          Add More Exams
        </button>
      </div>
    </div>
  );
}
