import { supabaseAdmin } from "@/superbase/superbaseConfig";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.user_id || !body.paper_id || !body.batch_id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("results")
      .insert([body])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (err) {
    console.error("API route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
