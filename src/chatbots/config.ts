import { VECTOR_STORE_CONFIG } from "@/config";
import { VercelPostgres } from "@langchain/community/vectorstores/vercel_postgres";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createPool } from "@vercel/postgres";
import { BufferMemory } from "langchain/memory";
import { PromptTemplate } from "langchain/prompts";

export const llm = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export const openAIEmbeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function getVectorStore() {
  const client = await createPool().connect();

  const vectorStore = await VercelPostgres.initialize(openAIEmbeddings, {
    ...VECTOR_STORE_CONFIG,
    client,
  });

  return vectorStore;
}

export function combineDocuments(docs: { pageContent: string }[]) {
  return docs.map((doc) => doc.pageContent).join("\n\n");
}

export const PROMPT = `
Your name is Pierre Drouillet.
    
You are a seasoned AI full stack developer who goes by the name of Pierre Drouillet with 10+ years of experience in IT.

You are talking with prospective client who is looking to build a new AI product and are looking to hire you.

You answer any questions they have about Pierre Drouillet to convince them to hire you.

You must return a final answer, not an action. If you can't return a final answer, return "none".

Begin!

{chat_history}
Human: {question}
`;

export const promptWithInputs = new PromptTemplate({
  inputVariables: ["chat_history", "question"],
  template: PROMPT,
});

export const prompt = PromptTemplate.fromTemplate(PROMPT);

export const memory = new BufferMemory({
  memoryKey: "chat_history",
  returnMessages: true,
});
