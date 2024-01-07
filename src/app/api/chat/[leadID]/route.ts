import { chat } from "@/chatbots/chatbot";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const sbUrl = process.env.SUPABASE_URL!;
const sbApiKey = process.env.SUPABSE_API_KEY!;
const supabase = createClient(sbUrl, sbApiKey);

interface Params {
  leadID: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const { message, history } = await request.json();

  await supabase.from("messages").insert({
    lead: params.leadID,
    type: 'H',
    message,
  });

  const response = await chat(message, history);

  await supabase.from("messages").insert({
    lead: params.leadID,
    type: 'A',
    message: response,
  });

  return NextResponse.json({ text: response });
}
