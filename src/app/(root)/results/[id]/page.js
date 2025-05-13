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
import { Button } from "@/components/ui/button";
import PushBackButton from "@/components/PushBackButton";

export default async function ResultDetailPage({ params }) {
  const { id } = await params;
  const session = await auth();
  const p = id.split("-");

  const { data, error } = await supabaseAdmin
    .from("results")
    .select(
      `
    paper_id,
    result,
    submitted_at,
    papers (name)
  `
    )
    .eq("user_id", session.user.id)
    .eq("id", parseInt(p[3]))
    .single();
    
  if (error || data.papers.name.toLowerCase().trim().replace(/\s+/g, "_") !== p[0]){

    console.log(error)
    return notFound();
  }

  console.log(data);

  // const paperData = JSON.parse(data.papers.paper);
  // const userAnswer = JSON.parse(data.userAnswer);

  if (typeof data.result === "string"){
    data.result = JSON.parse(data.result)
  }


  // const subjectSections = evaluateQuestionStatus(paperData, {
  //   attempt: parseInt(p[1]),
  //   data: userAnswer,
  //   isRealAttempt: false,
  //   timestamp: data.submitted_at,
  // });

  return (
    <>
      <div className="p-4 space-y-8 max-w-4xl mx-auto mb-10">
        <div className="flex items-center gap-4">
          <PushBackButton/>
          <h2 className="text-2xl font-semibold tracking-tight">
            Test Overview:{" "}
            <span className="text-primary">
              {data.papers.name} - Attempt: {p[1]}
            </span>
          </h2>
        </div>

        <ScoreSummary result={data.result} />

        {/* <ResultQuestionWiseDisplay paperData={paperData} userAnswer={userAnswer}  subjectSections={subjectSections}/> */}
        <div className="flex justify-start w-full">
          <Button asChild>
            <Link href={`/results/${id}/solution`}>View Solution</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
