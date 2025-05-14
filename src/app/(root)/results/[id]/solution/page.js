// app/your-route/page.tsx

import { getResultSolution } from "@/lib/getResultSolution";
import ResultQuestionWiseDisplay from "@/components/ResultQuestionWiseDisplay";
import PushBackButton from "@/components/PushBackButton";

export function formatPaperName(slug) {
  return slug
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\s*\((.*?)\)/g, "") // Remove text in parentheses like (free)
    .split(" ") // Split by space
    .filter(Boolean) // Remove empty strings
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" ");
}
  

export async function generateMetadata({ params }) {
  const { id } = params;
  const p = id.split("-");

  try {
    const name = formatPaperName(p[0])

    return {
      title: `Solution: ${name || "Paper"}`,
      description: `View detailed solutions and your performance analysis for "${name}".`,
      openGraph: {
        title: `Solution: ${name || "Paper"}`,
        description: `Check your answers, see solutions, and analyze attempt history.`,
        url: `/results/${id}`,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `Solution: ${name || "Paper"}`,
        description: `Explore your performance on "${name}".`,
      },
    };
  } catch {
    return {
      title: "Solution Not Found",
      description: "This solution could not be found or does not exist.",
    };
  }
}

export default async function ResultSolutionPage({ params }) {
  const { id } = params;
  const p = id.split("-");

  try {
    const { paperData, userAnswer, filteredSubjectSection } =
      await getResultSolution(id);

    return (
      <div className="w-full relative p-4 space-y-8 max-w-4xl mx-auto mb-10 h-[calc(100vh-4rem)]">
        <div className="flex gap-4 items-center">
          <PushBackButton />
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Solution
          </h2>{" "}
          {": "}
          <span className="text-xl">{formatPaperName(p[0])}</span>
          {" - "}
          <span className="text-xl">Attempt: {p[1]}</span>
        </div>
        <ResultQuestionWiseDisplay
          paperData={paperData}
          userAnswer={userAnswer}
          subjectSections={filteredSubjectSection}
        />
      </div>
    );
  } catch (e) {
    return notFound();
  }
}
