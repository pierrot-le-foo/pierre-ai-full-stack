import { OpenAIEmbeddings } from "@langchain/openai";
import { VercelPostgres } from "@langchain/community/vectorstores/vercel_postgres";
import { config as envConfig } from "dotenv";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { configPool } from "@/lib/pg";
import { createPool, sql } from '@vercel/postgres';
import { postgresConnectionString } from '@vercel/postgres';


interface Payload {
  file: string;
  name: string;
  description: string;
}

envConfig();

console.log(12, postgresConnectionString('pool'))




const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {
  const { file, name, description } = (await request.json()) as Payload;

  const content = await readFile(file, "utf-8");

  const client = await createPool().connect()

  const config = {
    // postgresConnectionOptions: configPool,
    client,
    tableName: "documents",
    columns: {
      idColumnName: "id",
      vectorColumnName: "embedding",
      contentColumnName: "content",
      metadataColumnName: "metadata",
    },
  };

  const vercelPostgresStore = await VercelPostgres.initialize(
    embeddings,
    config
  );

  const ids = await vercelPostgresStore.addDocuments([
    { pageContent: content, metadata: { name, description } },
  ]);

  return NextResponse.json({ ids });
}
