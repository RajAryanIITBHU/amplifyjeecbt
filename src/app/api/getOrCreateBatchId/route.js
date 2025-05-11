// app/api/get-or-create-batch-id/route.js

import { supabaseAdmin } from "@/superbase/superbaseConfig";

export async function POST(req) {
  const { batchName } = await req.json();

  const { data: existing } = await supabaseAdmin
    .from("batches")
    .select("id")
    .eq("name", batchName)
    .maybeSingle();

  if (existing) {
    return Response.json({ batchId: existing.id });
  }

  const { data: created, error } = await supabaseAdmin
    .from("batches")
    .insert({ name: batchName })
    .select("id")
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ batchId: created.id });
}
