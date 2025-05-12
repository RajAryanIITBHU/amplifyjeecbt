import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getUserTests } from "@/lib/fetch-user-tests";
import { supabaseAdmin } from "@/superbase/superbaseConfig";
import { getOverallStats } from "@/utils/getOverAllStats";
import { CircleCheck, CircleX, NotebookText, Pencil, Target } from "lucide-react";
import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 300 // cache for 5 minutes

function formatResultsByBatchAndTest(data) {
  const result = {};

  for (const item of data) {
    const key = `${item.batch}-${item.testId}`;
    result[key] = item.results.map((entry) => ({
      timestamp: entry.timestamp,
      data: entry.data,
    }));
  }

  return result;
}


const ResultPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return <div className="p-6">Please log in to view your results.</div>;
  }

  const { data:resultData, error } = await supabaseAdmin
    .from("results")
    .select(
      `
    id,result, score,is_real_attempt,batch_id,paperTotal, paper_id,submitted_at,paperTotal,
    papers ( name )
  `
    )
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Error fetching user results", error);
    return;
  }

  const groupedResults = {};

  for (const row of resultData) {
    const paperId = row.paper_id;
    const paperName = row.papers?.name || "Unknown";

    if (typeof row.result === "string") {
      try {
        row.result = JSON.parse(row.result);
      } catch (e) {
        console.warn("Failed to parse result JSON for row:", row);
        row.result = {};
      }
    }
    if (!groupedResults[paperId]) {
      groupedResults[paperId] = {
        paper_id: paperId,
        paper_name: paperName,
        results: [],
      };
    }

    groupedResults[paperId].results.push(row);
  }

  const resultArray = Object.values(groupedResults);

  console.log(resultArray);

  return (
    <div className="bg-background py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary tracking-tight">
            Test Results
          </h2>
          <div className="text-muted-foreground text-sm">
            Total Tests: {resultArray.length}
          </div>
        </div>

        <Separator className="mb-6" />

        {resultArray.length > 0 ? (
          <div className="grid gap-8">
            {resultArray.map((test) => (
              <div
                key={test.paper_id}
                className="bg-card border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Test Header */}
                <div className="bg-muted/50 p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2 md:mb-0">
                    {test.paper_name}
                  </h3>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>📊</span>
                    <span>Total Attempts: {test.results.length}</span>
                  </div>
                </div>

                {/* Attempts List */}
                <div className="p-4 md:p-6 space-y-4">
                  {test.results.map((attempt, index) => {
                    const stats = getOverallStats(attempt.result);
                    return (
                      <Link
                        href={`/results/${test.paper_name
                          .toLowerCase()
                          .trim()
                          .replace(/\s+/g, "_")}-${index+1}-${test.paper_id}-${attempt.id}`}
                        key={attempt.submitted_at}
                        className="block"
                      >
                        <div className="bg-accent/50 border rounded-xl p-4 md:p-6 hover:bg-muted/30 transition-colors duration-200 group">
                          {/* Attempt Header */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                            <div className="flex items-center gap-4 mb-2 sm:mb-0">
                              <span className="font-medium text-primary group-hover:text-primary/80 transition-colors">
                                Attempt #{index + 1}
                              </span>
                              <Badge
                                variant={
                                  attempt.is_real_attempt
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {attempt.is_real_attempt ? "Real" : "Not Real"}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              🕒{" "}
                              {new Date(attempt.submitted_at).toLocaleString(
                                "en-IN",
                                {
                                  timeZone: "Asia/Kolkata",
                                  hour12: true,
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                }
                              )}
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left Side: Detailed Stats */}
                            <div className="flex flex-wrap gap-4 items-center">
                              <div className="flex items-center gap-2">
                                <CircleCheck className="size-4 text-green-600" />
                                <span className="text-sm">Correct:</span>
                                <span className="font-semibold text-green-600">
                                  {stats.totalCorrect}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CircleX className="size-4 text-red-600" />
                                <span className="text-sm">Wrong:</span>
                                <span className="font-semibold text-red-600">
                                  {stats.totalIncorrect}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Pencil className="size-4 text-blue-500" />
                                <span className="text-sm">Attempted:</span>
                                <span className="font-semibold text-blue-500">
                                  {stats.totalAttempted}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <NotebookText className="size-4 text-muted-foreground" />
                                <span className="text-sm">
                                  Total Questions:
                                </span>
                                <span className="font-semibold text-muted-foreground">
                                  {stats.totalQuestions}
                                </span>
                              </div>
                            </div>

                            {/* Right Side: Total Marks */}
                            <div className="flex justify-end items-center gap-3">
                              <Target className="size-5 text-primary" />
                              <div className="text-sm">Total Marks:</div>
                              <div className="text-2xl font-bold text-primary">
                                {stats.totalMarks} / {attempt.paperTotal}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No results available
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
