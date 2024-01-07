import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";

export async function getRetriever(name: string) {
  const openAIApiKey =  process.env.OPENAI_API_KEY!;

  const embeddings = new OpenAIEmbeddings({ openAIApiKey });
  const sbUrl = process.env.SUPABASE_URL!;
  const sbApiKey = process.env.SUPABSE_API_KEY!
  const client = createClient(sbUrl, sbApiKey);

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: name,
    queryName: `match_${name}`,
  });

  return vectorStore.asRetriever();
}
