import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const sbUrl = process.env.SUPABASE_URL!;
const sbApiKey = process.env.SUPABSE_API_KEY!;
const supabase = createClient(sbUrl, sbApiKey);

interface Params {
  leadID: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const { name, company, email, message } = await request.json();

  const req = await supabase.from("requests").insert({
    lead: params.leadID,
    name,
    company,
    email,
    message,
  });

  console.log(req);

  return NextResponse.json({ sent: true });
}
