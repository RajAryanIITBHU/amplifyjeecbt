import { supabaseAdmin } from "@/superbase/superbaseConfig";


export async function POST(request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseAdmin.from("papers").insert([body]);

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Failed to save test" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
    });
  }
}

// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export async function POST(req) {
//   try {
//     const { batchName, testId,testData } = await req.json();
//     const sanitizedBatchName = batchName
//       .toLowerCase()
//       .replace(/[^a-z0-9]/g, "-");

//     const dataDir = path.join(process.cwd(), "src", "data");
//     const batchDir = path.join(dataDir, sanitizedBatchName);

//     if (!fs.existsSync(dataDir)) {
//       fs.mkdirSync(dataDir, { recursive: true });
//     }
//     if (!fs.existsSync(batchDir)) {
//       fs.mkdirSync(batchDir);
//     }
//     const files = fs.readdirSync(batchDir);
//     const testNumber = files.length + 1;
//     const fileName = `${testId}.json`;

//     const filePath = path.join(batchDir, fileName);
//     fs.writeFileSync(filePath, JSON.stringify(testData, null, 2));

//     return NextResponse.json({ success: true, fileName, filePath });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to save batch" },
//       { status: 500 }
//     );
//   }
// }
