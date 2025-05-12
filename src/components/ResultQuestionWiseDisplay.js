"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { calculateResults } from "@/utils/calculateResult";
import { extractSubjectResults } from "@/utils/extractSubjectResult";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "./ui/badge";
import { capitalize } from "@/utils/localStorageHelper";
import LatexText from "./LatexText";

const ResultQuestionWiseDisplay = ({
  paperData,
  userAnswer,
  totalMarks,
  subjectSections,
}) => {
  console.log(paperData, userAnswer);
  const [subject, setSubject] = useState("Mathematics");
  const [section, setSection] = useState("Section 1");

  const correctClass =
    "border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-700";
  const incorrectClass =
    "border-red-500 bg-red-50 dark:bg-red-900/70 dark:border-red-700";
  const defaultClass =
    "border-muted bg-background text-foreground dark:bg-transparent dark:border-muted";

  return (
    <>
      <Accordion type="multiple" className="w-full space-y-2">
        {Object.entries(subjectSections).map(([subject, sections]) => {
          const stats = sections.reduce(
            (acc, section) => {
              for (const q of section.questions) {
                if (q.status === "correct") acc.correct += 1;
                else if (q.status === "incorrect") acc.incorrect += 1;
                if (q.status !== "unseen") acc.attempted += 1;
                acc.total += 1;
              }
              return acc;
            },
            { correct: 0, incorrect: 0, attempted: 0, total: 0 }
          );

          return (
            <AccordionItem
              key={subject}
              value={subject}
              className="rounded-xl border bg-card text-card-foreground shadow-sm"
            >
              <AccordionTrigger className="p-4 ">
                <div className="flex justify-between  w-full pr-8">
                  <h3 className="text-base font-semibold capitalize">
                    {subject}
                  </h3>
                  <div className="text-xs text-muted-foreground flex gap-4 mt-1">
                    <span>✅ Correct: {stats.correct}</span>
                    <span>❌ Incorrect: {stats.incorrect}</span>
                    <span>✏️ Attempted: {stats.correct + stats.incorrect}</span>
                    <span>📋 Total: {stats.total}</span>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="p-4 space-y-6">
                {sections.map((section, idx) => (
                  <div key={section.name + idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-muted-foreground">
                        Section {idx + 1}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {section.questions.length} Questions
                      </span>
                    </div>

                    <ScrollArea className="w-full overflow-auto rounded-md border border-muted p-2">
                      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                        {section.questions.map((q, i) => (
                          <Badge
                            key={q.id}
                            title={`${capitalize(q.status)}`}
                            className={`w-10 h-10 flex items-center justify-center text-base font-medium rounded-md transition-colors cursor-default select-none ${
                              q.status === "correct"
                                ? "bg-green-100 text-green-800"
                                : q.status === "incorrect"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {i + 1}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <Card className="w-full py-6 rounded-2xl shadow-md">
        <CardHeader className="flex gap-6">
          <Select
            value={subject}
            onValueChange={(s) => {
              setSubject(s);
              setSection("Section 1");
            }}
          >
            <SelectTrigger className="min-w-36">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(paperData)
                .filter(
                  (s) =>
                    Array.isArray(paperData[s]) &&
                    paperData[s].length > 0 &&
                    paperData[s][0] !== ""
                )
                .map((s) => (
                  <SelectItem key={s} value={capitalize(s)}>
                    {capitalize(s)}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select value={section} onValueChange={setSection}>
            <SelectTrigger className="min-w-28">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({
                length: Array.isArray(paperData[subject.toLowerCase()])
                  ? paperData[subject.toLowerCase()].length
                  : 0,
              }).map((_, idx) => (
                <SelectItem key={idx} value={`Section ${idx + 1}`}>
                  Section {idx + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Number buttons */}
          <div className="flex flex-wrap gap-2">
            {paperData[subject.toLowerCase()]
              ?.find((s) => s.name === section)
              ?.questions.map((q, i) => {
                const userResponse = userAnswer[subject.toLowerCase()]?.find(
                  (u) => u.id === q.id
                );

                const status = userResponse?.status || "unseen";
                const correct =
                  q.options?.[parseInt(q.correctAnswer)]?.id ?? q.correctAnswer;
                const isCorrect = userResponse?.answer === correct;

                let className =
                  "rounded-md px-3 py-2 text-sm font-medium border transition-colors";

                if (status === "answered") {
                  className += isCorrect
                    ? " bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700"
                    : " bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700";
                } else if (status === "seen") {
                  className +=
                    " bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700";
                } else {
                  className +=
                    " bg-muted text-muted-foreground border-muted dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
                }

                return (
                  <button key={i} className={className}>
                    {i + 1}
                  </button>
                );
              })}
          </div>

          {/* Questions */}
          {paperData[subject.toLowerCase()]
            ?.find((s) => s.name === section)
            ?.questions.map((question, index) => {
              const sectionMeta = paperData[subject.toLowerCase()]?.find(
                (s) => s.name === section
              );

              const type = sectionMeta?.type || "single-mcq";

              const userResponse = userAnswer[subject.toLowerCase()]?.find(
                (u) => u.id === question.id
              );

              const userAns = userResponse?.answer;
              const correctAns =
                type === "single-mcq" || type === "multi-mcq"
                  ? question.options?.[parseInt(question.correctAnswer)]?.id ??
                    question.correctAnswer
                  : question.correctAnswer;

              const isCorrect =
                type === "multi-mcq"
                  ? Array.isArray(userAns) &&
                    Array.isArray(correctAns) &&
                    userAns.sort().join(",") === correctAns.sort().join(",")
                  : userAns === correctAns;

              return (
                <div
                  key={question.id}
                  className="border rounded-xl p-4 mb-4 space-y-2 bg-muted/20"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">
                      Q{index + 1} ({type})
                    </div>
                    {userResponse?.answer !== undefined &&
                    userResponse?.answer !== null ? (
                      <Badge
                        variant={isCorrect ? "success" : "destructive"}
                        className="capitalize"
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Unanswered</Badge>
                    )}
                  </div>

                  <div className="mt-1">
                    {question.content && (
                      <LatexText
                        text={question.content.replace(/\\\\/g, "\\")}
                      />
                    )}
                    {question.imageUrl && (
                      <img
                        src={question.imageUrl}
                        alt="question"
                        className="max-w-full max-h-64 mt-2 dark:invert"
                      />
                    )}
                  </div>

                  {/* Different render per question type */}
                  {type === "single-mcq" && (
                    <ul className="space-y-2 mt-3 ">
                      {question.options.map((opt, i) => {
                        const isUserAnswer =
                          userAns === opt.id || userAns === i.toString();
                        const isCorrectAnswer =
                          i.toString() === question.correctAnswer;

                        return (
                          <li
                            key={opt.id}
                            className={`border rounded-md px-3 py-2 flex items-center justify-between ${
                              isCorrectAnswer
                                ? correctClass
                                : isUserAnswer
                                ? incorrectClass
                                : defaultClass
                            }`}
                          >
                            <div className="flex-1 flex flex-col items-start">
                              {opt.text && (
                                <LatexText
                                  text={opt.text.replace(/\\\\/g, "\\")}
                                />
                              )}
                              {opt.imageUrl && (
                                <img
                                  src={opt.imageUrl}
                                  alt="question"
                                  className="max-w-96 max-h-64 mt-2 dark:invert object-contain"
                                />
                              )}
                            </div>
                            {isUserAnswer && !isCorrectAnswer && (
                              <Badge variant="outline">Your Answer</Badge>
                            )}
                            {isCorrectAnswer && (
                              <Badge variant="success">Correct</Badge>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {type === "multi-mcq" && (
                    <ul className="space-y-2 mt-3">
                      {question.options.map((opt, i) => {
                        const isUserAnswer = userAns?.includes(opt.id);
                        const isCorrectAnswer =
                          question.correctAnswer?.includes?.(i.toString());

                        return (
                          <li
                            key={opt.id}
                            className={`border rounded-md px-3 py-2 flex items-center justify-between ${
                              isCorrectAnswer
                                ? "border-green-500 bg-green-50"
                                : isUserAnswer
                                ? "border-red-500 bg-red-50"
                                : "border-muted"
                            }`}
                          >
                            {opt.text && (
                              <LatexText
                                text={opt.text.replace(/\\\\/g, "\\")}
                              />
                            )}
                            {opt.imageUrl && (
                              <img
                                src={opt.imageUrl}
                                alt="question"
                                className="max-w-96 max-h-64 mt-2 dark:invert object-contain"
                              />
                            )}
                            {isUserAnswer && (
                              <Badge variant="outline">Your Answer</Badge>
                            )}
                            {isCorrectAnswer && (
                              <Badge variant="success">Correct</Badge>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {(type === "integer" || type === "decimal") && (
                    <div className="space-y-2 mt-3">
                      <div>
                        <strong>Your Answer: </strong>
                        <span>{userAns ?? <em>Unanswered</em>}</span>
                      </div>
                      <div>
                        <strong>Correct Answer: </strong>
                        <span>{correctAns}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </CardContent>
      </Card>
    </>
  );
};

export default ResultQuestionWiseDisplay;
