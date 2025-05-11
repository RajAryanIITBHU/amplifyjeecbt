"use client";

import LatexText from "@/components/LatexText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const Page = () => {
  const [value, setValue] = useState(``);
  const [v, setV] = useState(``);

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          MathJax + Chemistry Renderer
        </h1>

        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mb-5 max-h-52"
          rows={5}
          placeholder="Type math or chemical markup here..."
        />
        {/* <LatexText text={value.replace(/\\\\/g, "\\")} /> */}

        <Button onClick={()=>{
          setV(JSON.stringify(value))
        }}></Button>

        <p>{v}</p>
        
      </div>
    </div>
  );
};

export default Page;
