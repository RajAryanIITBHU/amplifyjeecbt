"use client";

import ResultTable from "@/components/ResultTable";

export default function ScoreSummary({ result }) {

  return (
    <section className="w-full">
      <div className="max-w-4xl mx-auto">
        
        {result ? <ResultTable result={result} /> : <p>Loading result...</p>}
      </div>
    </section>
  );
}
