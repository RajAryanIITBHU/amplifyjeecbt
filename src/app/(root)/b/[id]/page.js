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
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const Page = () => {
  const [value, setValue] = useState(`
This is inline math: $E=mc^2$  
This is block math:  

$$
\\int_0^\\infty e^{-x} dx = 1
$$
  `);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">LaTeX Markdown Preview</h1>

      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mb-5 max-h-52"
        rows={5}
        placeholder="Type math here..."
      />

      <div className="prose max-w-none">
        <MarkdownWithMath content={value} />
      </div>
    </div>
  );
};

export default Page;

