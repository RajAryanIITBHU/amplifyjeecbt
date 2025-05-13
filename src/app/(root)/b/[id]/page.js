// "use client";

// import LatexText from "@/components/LatexText";
// import MarkdownWithMath from "@/components/MarkdownWithMathJax";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import React, { useState } from "react";

// const Page = () => {
//   const [value, setValue] = useState(``);

//   const sample = `
// This is inline math: $E=mc^2$  
// This is block math:  
// $$
// \\int_0^\\infty e^{-x} dx = 1
// $$
// `;

//   return (
//     <div>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">
//           MathJax + Chemistry Renderer
//         </h1>

//         <Textarea
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           className="mb-5 max-h-52"
//           rows={5}
//           placeholder="Type math or chemical markup here..."
//         />
//         <LatexText text={value.replace(/\\\\/g, "\\")} />

     
//       </div>
//       <div className="prose max-w-none">
//         <MarkdownWithMath content={value} />
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import MarkdownWithMath from "@/components/MarkdownWithMathJax";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");

  console.log(value)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">LaTeX Markdown Preview</h1>

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mb-5 max-h-52"
        rows={5}
        placeholder="Type math here..."
      />

      <p>{JSON.stringify(value)}</p>



      {/* <div className="prose max-w-5xl break-words">
        <MarkdownWithMath content={value} />
      </div>
      <div className="prose max-w-5xl break-words">
        <MarkdownWithMath content={ "$$\\text{Consider the following unbalanced reactions:} \\n \\text{Cu + conc. HNO}_3 \\to P + Q + R \\\\ P + \\text{H}_2\\text{S} + \\text{NH}_4\\text{OH} \\to S \\; (\\text{a precipitate}) + R + T \\\\ Q + R \\xrightarrow{\\text{boil}} \\text{HNO}_3 + U \\\\ \\text{Choose the correct statement(s):}$$"} />
      </div> */}
    </div>
  );
};

export default Page;

