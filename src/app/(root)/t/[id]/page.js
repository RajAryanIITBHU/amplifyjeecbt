import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getTestDataFromId } from "@/utils/getRawData";
import { auth } from "@/auth";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import UntilStartTimer from "@/components/UntilStartTimer";
import OpenBankingWindow from "@/components/SecurePopUp";
import StartTestBtn from "@/components/StartTestBtn";
import { supabaseAdmin } from "@/superbase/superbaseConfig";
import moment from "moment";


const questionTypes = {
  "single-mcq": " Single Choice",
  "multi-mcq": " Multi Choice",
  "integer": " Integer Type",
  "decimal": " Decimal Type",
}

export async function generateMetadata({ params }) {
  const { id } =await params;
  const readableName = id.split("-")[1]
    .replace(/\_/g, " ") 
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: readableName || "Test",
  };
}

export default async function TestDetailsPage({ params }) {
  const { id } =await params;
  const p = id.split("-");

  // const data = await getTestDataFromId(id);
  const session = await auth()

  const { data: paper, error } = await supabaseAdmin
    .from("papers")
    .select("*")
    .eq("id", parseInt(p[2]))
    .single();

    const { data: attemptCount, count, error: attemptCountErr } = await supabaseAdmin
      .from("results")
      .select("*", { count: "exact", head: true })
      .eq("user_id", session.user.id)
      .eq("paper_id", parseInt(p[2]));


  
  const parsedPaperData = JSON.parse(paper.paper);

  if (!paper) return (
    <section className="w-full bg-accent relative min-h-[calc(100dvh-4rem)] flex justify-center items-center">
      <Card className="p-6 rounded-xl bg-background gap-4 min-w-sm -mt-10">
        <span className="flex gap-3 items-center text-lg font-medium">
          <CircleAlert size={22} />
          No Test Found
        </span>
        <p>The Test file has either be deleted or never esixted before.</p>
        <Link
          href={"/"}
          className="text-primary-foreground hover:text-primary-foreground/80 underline underline-offset-4"
        >
          Home
        </Link>
      </Card>
    </section>
  );

  if (
    !Object.values(session?.user?.batches).includes(p[0]) &&
    p[0] !== "FREE"
  ) {
    return (
      <section className="w-full bg-accent relative min-h-[calc(100dvh-4rem)] flex justify-center items-center">
        <Card className="p-6 rounded-xl bg-background gap-4 min-w-sm -mt-10">
          <span className="flex gap-3 items-center text-lg font-medium">
            <CircleAlert size={22} />
            Unautherised User
          </span>
          <p>You are not allowed to give this test.</p>
          <Link
            href={"/"}
            className="text-primary-foreground hover:text-primary-foreground/80 underline underline-offset-4"
          >
            Home
          </Link>
        </Card>
      </section>
    );
  }
  
  
  return (
    <section className="w-full flex flex-col bg-accent relative min-h-[calc(100dvh-4rem)] items-center">
      <div className="max-w-4xl w-full h-full flex-1 p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl text-center">{paper.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-lg space-y-2">
            <p>
              <strong>Duration:</strong>{" "}
              {(new Date(paper.end) - new Date(paper.start)) / (1000 * 60)} mins
            </p>
            <p>
              <strong>Format:</strong> Computer-Based Test (CBT)
            </p>
            <p>
              <strong>Schedule:</strong> {moment(paper.start).format("HH:mm - DD MMMM, YYYY")}
            </p>
          </CardContent>
        </Card>

        {/* Sections Table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Test Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Question Types</TableHead>
                  <TableHead>Total Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parsedPaperData.mathematics.length > 0 && (
                  <TableRow key={"mathematics"}>
                    <TableCell>Mathematics</TableCell>

                    <TableCell>
                      {parsedPaperData.mathematics.length > 1
                        ? [
                            parsedPaperData.mathematics.map(
                              (sec) => questionTypes[sec.type]
                            ),
                          ].join(", ")
                        : questionTypes[parsedPaperData.mathematics[0].type]}
                    </TableCell>
                    <TableCell className={"pl-4"}>
                      {parsedPaperData.mathematics
                        .map(
                          (sec, sec_i) =>
                            parseInt(sec.marks) * sec.questions.length
                        )
                        .reduce((acc, curr) => acc + curr, 0)}
                    </TableCell>
                  </TableRow>
                )}

                {parsedPaperData.physics.length > 0 && (
                  <TableRow key={"physics"}>
                    <TableCell>Physics</TableCell>

                    <TableCell>
                      {parsedPaperData.physics.length > 1
                        ? [
                            parsedPaperData.physics.map(
                              (sec) => questionTypes[sec.type]
                            ),
                          ].join(", ")
                        : questionTypes[parsedPaperData.physics[0].type]}
                    </TableCell>
                    <TableCell className={"pl-4"}>
                      {parsedPaperData.physics
                        .map(
                          (sec, sec_i) =>
                            parseInt(sec.marks) * sec.questions.length
                        )
                        .reduce((acc, curr) => acc + curr, 0)}
                    </TableCell>
                  </TableRow>
                )}

                {parsedPaperData.chemistry.length > 0 && (
                  <TableRow key={"chemistry"}>
                    <TableCell>Chemistry</TableCell>

                    <TableCell>
                      {parsedPaperData.chemistry.length > 1
                        ? [
                            parsedPaperData.chemistry.map(
                              (sec) => questionTypes[sec.type]
                            ),
                          ].join(", ")
                        : questionTypes[parsedPaperData.chemistry[0].type]}
                    </TableCell>
                    <TableCell className={"pl-4"}>
                      {parsedPaperData.chemistry
                        .map(
                          (sec, sec_i) =>
                            parseInt(sec.marks) * sec.questions.length
                        )
                        .reduce((acc, curr) => acc + curr, 0)}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell className={"font-medium"}>Total</TableCell>
                  <TableCell className={"pl-4"}>
                    {paper.total}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {parsedPaperData.syllabus.isSyllabus && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Syllabus</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion
                type="multiple"
                defaultValue={["mathematics", "physics", "chemistry"]}
              >
                {["mathematics", "physics", "chemistry"].map(
                  (subject, subindex) => {
                    if (
                      parsedPaperData.syllabus[subject].length >= 1 &&
                      parsedPaperData.syllabus[subject][0] !== ""
                    ) {
                      return (
                        <AccordionItem key={subindex} value={subject}>
                          <AccordionTrigger className={"text-lg"}>
                            {subject.charAt(0).toUpperCase() + subject.slice(1)}
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc pl-4">
                              {parsedPaperData.syllabus[subject].map((topic, idx) => (
                                <li key={idx}>{topic}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    }
                  }
                )}
              </Accordion>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="flex mt-4 px-0 sticky bottom-0 left-0 justify-center w-full bg-sidebar py-4">
        <div className="max-w-4xl w-full flex justify-between px-10 gap-6 items-center ">
          <div className="">
            Attempts: {count}/{paper.max_attempts}
          </div>
          <StartTestBtn
            id={id}
            startDate={paper.start}
            endDate={paper.end}
            maxAttempts={paper.max_attempts}
            userAttempts={count}
            rawStartDate={paper.start}
          />
        </div>
      </div>
    </section>
  );
}
