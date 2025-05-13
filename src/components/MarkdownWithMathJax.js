import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./css/markdownMath.css"; // custom fix CSS
// Import mhchem extension for KaTeX
import "katex/dist/contrib/mhchem.min.js"; // Required for chemical equations

// Enhanced conversion function to better handle chemical formulas
export function convertToValidKaTeX(rawInput) {
  return rawInput
    .replace(/\\\\/g, "\\")                         // turn \\ into \
    .replace(/\\\(/g, "$")                         // replace \( with $
    .replace(/\\\)/g, "$")                         // replace \) with $
    .replace(/\s{2,}/g, " ")                        // normalize multiple spaces
    .replace(/\s*\\n\s*/g, "\\\\")                    // remove line breaks like \\ between content
    .replace(/\\text\s*\{/g, "\\text{")             // normalize \text{ usage
    // Don't auto-convert chemical notations when \ce{} is used
    .replace(/([A-Z][a-z]?)(\d+)([+\-])/g, (match, element, num, charge) => {
      // Skip conversion if this is inside a \ce{} command
      if (rawInput.includes("\\ce{")) {
        return match;
      }
      return `${element}^{${num}${charge}}`;
    })
    .replace(/([A-Z][a-z]?)(\d+)/g, (match, element, num) => {
      // Skip conversion if this is inside a \ce{} command
      if (rawInput.includes("\\ce{")) {
        return match;
      }
      return `${element}_{${num}}`;
    })
    // Ensure \ce{} command is properly formatted
    .replace(/\\ce\s*\{/g, "\\ce{")
    .trim();
}

// Normalize LaTeX content for better rendering
export function normalizeLatexContent(input) {
  return input
    .replace(/\\n/g, "\n")
    .replace(/\$\$(?!\n)/g, "\n$")
    .replace(/(?<!\n)\$\$/g, "$\n")
    .replace(/\\\\([a-zA-Z])/g, "\\$1")
    .replace(/\s{2,}/g, " ")
    .replace(/\\(text|frac|begin|end)\s+/g, "\\$1 ")
    // Don't add spaces in chemical formulas using \ce
    .replace(/([A-Z][a-z]?)\^{(\d+[+\-])}/g, (match, element, charge) => {
      if (input.includes("\\ce{")) {
        return match;
      }
      return `${element}\\,^{${charge}}`;
    })
    // Fix chemical equation arrows
    .replace(/(-?>|->|→)/g, "\\rightarrow")
    // Ensure proper spacing in reactions
    .replace(/\+/g, " + ")
    .replace(/\\rightarrow/g, " \\rightarrow ")
    // Fix multiple spaces created by replacements
    .replace(/\s{2,}/g, " ");
}


// Component for rendering chemical formulas directly
export function ChemicalFormula({ formula }) {
  // Parse formula to handle superscripts and subscripts correctly
  const parsedFormula = formula.replace(/([A-Z][a-z]?)(\d+)([+\-])?/g, (match, element, num, charge) => {
    if (charge) {
      return `<span class="formula-container"><span class="element">${element}</span><span class="superscript">${num}${charge}</span></span>`;
    } else {
      return `<span class="formula-container"><span class="element">${element}</span><span class="subscript">${num}</span></span>`;
    }
  });
  
  return <span dangerouslySetInnerHTML={{ __html: parsedFormula }} />;
}

export default function MarkdownWithMath({ content }) {
  // Check if content contains chemical equations
  const hasChemicalEquations = content.includes("\\ce{");
  
  const cleanContent = convertToValidKaTeX(content);
  const sanitizedContent = normalizeLatexContent(cleanContent);

  // Configure KaTeX options
  const katexOptions = {
    throwOnError: false,
    strict: false,
    trust: true,
    macros: {
      // Add any custom macros here if needed
    }
  };

  return (
    <div className="markdown-math-container">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[[rehypeKatex, katexOptions]]}
        components={{
          p: ({ node, children }) => (
            <p className="markdown-paragraph">{children}</p>
          ),
          // Add custom handling for code blocks that might contain chemical formulas
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            // Special handling for chemistry code blocks
            if (match && match[1] === 'chem') {
              return <ChemicalFormula formula={String(children).replace(/\n$/, '')} />;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}