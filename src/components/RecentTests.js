import fs from "fs";
import path from "path";
import Link from "next/link";
import { Clock, Award, Calendar } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import UntilStartTimer from "./UntilStartTimer";
import moment from "moment";

const RecentTests = async ({ papers, query, filter }) => {
  let testData = papers;

  if (query) {
    testData = testData.filter((test) =>
      test.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filter) {
    const now = new Date();

    testData = testData.filter((test) => {
      const start = new Date(test.start);
      const end = new Date(test.end);

      if (filter === "ongoing") {
        return now >= start && now <= end;
      }

      if (filter === "yet-to-start") {
        return now < start;
      }

      if (filter === "ended") {
        return now > end;
      }
      return true;
    });
  }

  testData.sort(
    (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
  );

  if (testData.length === 0) {
    return (
      <div className="w-full px-4 py-12 text-center text-foreground/70 font-lg rounded-xl bg-background overflow-hidden">
        No Available Test
      </div>
    );
  }

  return (
    <div className="w-full bg-background rounded-xl">
      <h2 className="text-lg font-semibold py-4 mx-4 md:mx-6">Recent Tests</h2>
      <Separator />
      <ul className="flex flex-col">
        {testData.map((test, index) => {
          const duration =
            (new Date(test.end) - new Date(test.start)) / (1000 * 60);
          return (
            <li
              key={index}
              className="flex px-4 md:px-6 py-3.5 hover:bg-accent border-b items-center"
            >
              <div className="flex-1 flex flex-col gap-2">
                <span className="font-semibold">{test.name}</span>
                <div className="flex gap-6">
                  <span className="flex gap-1 text-sm font-light items-center text-accent-foreground opacity-80">
                    <Clock size={14} className="opacity-70" />
                    {duration} mins
                  </span>
                  <span className="flex gap-1 text-sm font-light items-center text-accent-foreground opacity-80">
                    <Award size={14} className="opacity-70" />
                    {test.total} marks
                  </span>
                  <span className="flex gap-1 text-sm font-light items-center text-accent-foreground opacity-80">
                    <Calendar size={14} className="opacity-70" />
                    {moment(test.start).format("HH:mm - DD MMMM, YYYY")}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 ">
                <div className="flex gap-1 text-sm font items-center text-accent-foreground opacity-80 justify-end">
                  <UntilStartTimer
                    className={"test-xs px-2 py-1 font-medium rounded-lg"}
                    start={test.start}
                    end={test.end}
                  />
                </div>
                <Button asChild className="text-white cursor-pointer">
                  <Link href={test.url || `/t/${test.batches.name}-${test.name.toLowerCase().trim().replace(/\s+/g, "_")}-${test.id}`}>View Test</Link>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentTests;
