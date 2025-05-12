import { notFound } from "next/navigation";
import { evaluateQuestionStatus } from "@/utils/evaluateQuestionStatus";
import { Badge } from "@/components/ui/badge";
import { getTestDataFromId } from "@/utils/getRawData";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { auth } from "@/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calculateResults } from "@/utils/calculateResult";
import { extractSubjectResults } from "@/utils/extractSubjectResult";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScoreSummary from "@/components/ScoreSummary";
import { capitalize } from "@/utils/localStorageHelper";
import { supabaseAdmin } from "@/superbase/superbaseConfig";
import ResultQuestionWiseDisplay from "@/components/ResultQuestionWiseDisplay";

export default async function ResultDetailPage({ params }) {
  const { id } = await params;
  const session = await auth();
  const p = id.split("-");

  const { data, error } = await supabaseAdmin
    .from("results")
    .select(
      `
    paper_id,
    userAnswer,
    result,
    submitted_at,
    papers (
      name,
      paper,
      created_at
    )
  `
    )
    .eq("user_id", session.user.id)
    .eq("id", parseInt(p[3]))
    .single();

  console.log(data);

  const paperData = JSON.parse(data.papers.paper);
  const userAnswer = JSON.parse(data.userAnswer);

  if (false) return notFound();

  const subjectSections = evaluateQuestionStatus(paperData, {
    attempt: parseInt(p[1]),
    data: userAnswer,
    isRealAttempt: false,
    timestamp: data.submitted_at,
  });

  const fullResult = calculateResults(paperData, userAnswer);
  const subjectResults = extractSubjectResults(fullResult);

  const totalMarks = Object.values(subjectResults).reduce(
    (sum, sub) => sum + (sub?.marks || 0),
    0
  );

  return (
    <>
      <div className="p-4 space-y-8 max-w-4xl mx-auto">
        <div className="flex gap-4">
          <Link
            href={"/results"}
            className="w-9 h-9 text-center flex justify-between items-center rounded border"
          >
            <ArrowLeft size={20} className="mx-auto" />
          </Link>
          <h2 className="text-2xl font-semibold tracking-tight">
            Test Overview:{" "}
            <span className="text-primary">
              {data.papers.name} - Attempt: {p[1]}
            </span>
          </h2>
        </div>

        <ScoreSummary result={fullResult} />

        

        <ResultQuestionWiseDisplay paperData={paperData} userAnswer={userAnswer} totalMarks={totalMarks} subjectSections={subjectSections}/>
      </div>
    </>
  );
}
