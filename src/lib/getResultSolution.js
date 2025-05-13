
import { cache } from "react";
import { supabaseAdmin } from "@/superbase/superbaseConfig";
import { evaluateQuestionStatus } from "@/utils/evaluateQuestionStatus";
import { auth } from "@/auth";

export const getResultSolution = cache(async (id) => {
  const session = await auth();
  const p = id.split("-");

  const { data, error } = await supabaseAdmin
    .from("results")
    .select(`paper_id, submitted_at, userAnswer, papers (name, paper)`)
    .eq("user_id", session.user.id)
    .eq("id", parseInt(p[3]))
    .single();

  if (
    error ||
    data.papers.name.toLowerCase().trim().replace(/\s+/g, "_") !== p[0]
  ) {
    throw new Error("Not found");
  }

  const paperData = JSON.parse(data.papers.paper);
  const userAnswer = JSON.parse(data.userAnswer);

  const subjectSections = evaluateQuestionStatus(paperData, {
    attempt: parseInt(p[1]),
    data: userAnswer,
    isRealAttempt: false,
    timestamp: data.submitted_at,
  });

  const filteredSubjectSection = Object.fromEntries(
    Object.entries(subjectSections).filter(
      ([_, sections]) => sections.length > 0
    )
  );

  return { paperData, userAnswer, filteredSubjectSection };
});
