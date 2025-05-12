import { supabaseAdmin } from "@/superbase/superbaseConfig";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id"), 10);

  if (isNaN(id)) {
    return Response.json({ error: "Invalid or missing ID" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("papers")
    .select("paper")
    .eq("id", id)
    .single(); // Expects exactly one row

  if (error) {
    return Response.json({ error: error.message }, { status: 404 });
  }

  return Response.json({ paper: data }, { status: 200 });
}
