import { OpenAIEmbeddings } from "@langchain/openai";
import { VercelPostgres } from "@langchain/community/vectorstores/vercel_postgres";
import { config as envConfig } from "dotenv";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { configPool } from "@/lib/pg";
import { createPool, sql } from '@vercel/postgres';
import { postgresConnectionString } from '@vercel/postgres';
import { join } from "path";


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

  const content = `[
    {
      "title": "JavaScript",
      "category": "language",
      "stars": 5,
      "icon": "js.png",
      "focus": 5
    },
    {
      "title": "TypeScript",
      "category": "language",
      "stars": 5,
      "icon": "ts.png",
      "focus": 7
    },
    {
      "title": "Python",
      "category": "language",
      "stars": 4,
      "icon": "py.png",
      "focus": 7
    },
    {
      "title": "PHP",
      "category": "language",
      "stars": 3,
      "focus": 1,
      "icon": "php.png"
    },
    {
      "title": "Rust",
      "category": "language",
      "stars": 2,
      "focus": 2,
      "icon": "rust.jpg"
    },
    {
      "title": "Java",
      "category": "language",
      "stars": 2,
      "focus": 1,
      "icon": "java.png"
    },
    {
      "title": "Go",
      "category": "language",
      "stars": 1,
      "focus": 2,
      "icon": "go.png"
    },
    {
      "title": "Bash",
      "category": "language",
      "stars": 4,
      "focus": 2,
      "icon": "bash.png"
    },
    {
      "title": "Langchain",
      "category": "AI",
      "stars": 4,
      "focus": 7,
      "icon": "langchain.png"
    },
    {
      "title": "PostgreSQL",
      "category": "database",
      "stars": 4,
      "focus": 4,
      "icon": "postgres.png",
      "square": true
    },
    {
      "title": "MongoDB",
      "category": "database",
      "stars": 5,
      "focus": 4,
      "icon": "mongodb.png"
    },
    {
      "title": "FaunaDB",
      "category": "database",
      "stars": 3,
      "focus": 2,
      "icon": "fauna.jpg"
    },
    {
      "title": "React",
      "category": "UI",
      "stars": 5,
      "focus": 6,
      "icon": "react.png"
    },
    {
      "title": "React Native",
      "category": "UI",
      "stars": 4,
      "focus": 2,
      "icon": "react-native.png"
    },
    {
      "title": "Material UI",
      "category": "UI",
      "stars": 5,
      "focus": 3,
      "icon": "mui.png"
    },
    {
      "title": "Storybook",
      "category": "UI",
      "stars": 4,
      "focus": 2,
      "icon": "storybook.png"
    },
    {
      "title": "Jest",
      "category": "Testing",
      "stars": 5,
      "focus": 2,
      "icon": "jest.png"
    },
    {
      "title": "Cypress",
      "category": "Testing",
      "stars": 5,
      "focus": 2,
      "icon": "cypress.jpg"
    },
    {
      "title": "OpenAI",
      "category": "AI",
      "stars": 5,
      "focus": 5,
      "icon": "openai.png"
    },
    {
      "title": "ChromaDB",
      "category": "AI",
      "stars": 4,
      "focus": 4,
      "icon": "chroma.png"
    },
    {
      "title": "FAISS",
      "category": "AI",
      "stars": 4,
      "focus": 4,
      "icon": "faiss.webp"
    },
    {
      "title": "Pinecone",
      "category": "AI",
      "stars": 4,
      "focus": 4,
      "icon": "pinecone.png"
    },
    {
      "title": "Llama",
      "category": "AI",
      "stars": 4,
      "focus": 7,
      "icon": "llama.png"
    },
    {
      "title": "Whisper",
      "category": "AI",
      "stars": 5,
      "focus": 3,
      "icon": "whisper.webp"
    },
    {
      "title": "Easy OCR",
      "category": "AI",
      "stars": 5,
      "focus": 2,
      "icon": "easyocr.png"
    },
    {
      "title": "RTL",
      "category": "Testing",
      "stars": 5,
      "focus": 2,
      "icon": "rtl.png"
    },
    {
      "title": "Elastic Search",
      "category": "database",
      "stars": 3,
      "focus": 2,
      "icon": "elastic.png"
    },
    {
      "title": "TailWindCSS",
      "category": "UI",
      "stars": 4,
      "focus": 2,
      "icon": "tailwind.png"
    },
    {
      "title": "Puppeteer",
      "category": "Testing",
      "stars": 4,
      "focus": 1,
      "icon": "puppeteer.png"
    },
    {
      "title": "HTML 5",
      "category": "UI",
      "stars": 5,
      "focus": 3,
      "icon": "html5.jpg"
    },
    {
      "title": "CSS",
      "category": "UI",
      "stars": 4,
      "focus": 3,
      "icon": "css.png"
    },
    {
      "title": "SASS",
      "category": "UI",
      "stars": 4,
      "focus": 3,
      "icon": "sass.png"
    },
    {
      "title": "HuggingFace",
      "category": "AI",
      "stars": 4,
      "focus": 6,
      "icon": "hf-logo.png"
    },
    {
      "title": "NextJS",
      "category": "Backend",
      "stars": 5,
      "focus": 4,
      "icon": "next-js.svg"
    },
    {
      "title": "AWS Lambda",
      "category": "Backend",
      "stars": 2,
      "focus": 2,
      "icon": "lambda.png"
    },
    {
      "title": "Azure",
      "category": "Backend",
      "stars": 2,
      "focus": 2,
      "icon": "azure.png"
    },
    {
      "title": "GraphQL",
      "category": "Backend",
      "stars": 5,
      "focus": 7,
      "icon": "graphql.png"
    },
    {
      "title": "Apollo",
      "category": "Backend",
      "stars": 5,
      "focus": 4,
      "icon": "apollo.png"
    },
    {
      "title": "Firebase",
      "category": "Backend",
      "stars": 5,
      "focus": 3,
      "icon": "firebase.png"
    },
    {
      "title": "Supabase",
      "category": "Backend",
      "stars": 4,
      "focus": 2,
      "icon": "supabase.png"
    },
    {
      "title": "FastAPI",
      "category": "Backend",
      "stars": 4,
      "focus": 3,
      "icon": "fastapi.svg"
    },
    {
      "title": "LangServe",
      "category": "Backend",
      "stars": 4,
      "focus": 3,
      "icon": "langserve.png"
    },
    {
      "title": "OpenGraph",
      "category": "Other",
      "stars": 5,
      "focus": 1,
      "icon": "og.png"
    },
    {
      "title": "TensorFlow",
      "category": "AI",
      "stars": 3,
      "focus": 7,
      "icon": "tensorflow.png"
    },
    {
      "title": "PyTorch",
      "category": "AI",
      "stars": 3,
      "focus": 5,
      "icon": "pytorch.png"
    },
    {
      "title": "Zapier",
      "category": "AI",
      "stars": 4,
      "focus": 6,
      "icon": "zapier.png"
    },
    {
      "title": "Make",
      "category": "AI",
      "stars": 4,
      "focus": 5,
      "icon": "make.png"
    }
  ]`;

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
