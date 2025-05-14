import { auth } from "@/auth";
import { supabaseAdmin } from "@/superbase/superbaseConfig";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {

    const session = await auth()
  const userId = session.user.id;
  const body = await req.json();

  const { name, phone, dob, updated_at } = body;

  const { error } = await supabaseAdmin
    .from("users")
    .update({
      name,
      phone: parseInt(phone),
      dob,
      updated_at
    })
    .eq("id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "User data updated successfully" });
}
