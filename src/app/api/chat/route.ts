import { PromptTemplate } from "langchain/prompts";
import { LLMChain, ConversationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { ChatMessageHistory } from "langchain/memory";
// import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, AIMessage, HumanMessage } from "langchain/schema";
import { BufferMemory } from "langchain/memory";
import { renderTextDescription } from "langchain/tools/render";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { AgentStep } from "@langchain/core/agents";
import { BaseMessage } from "@langchain/core/messages";
import { formatLogToString } from "langchain/agents/format_scratchpad/log";
import { ReActSingleInputOutputParser } from "langchain/agents/react/output_parser";
import { AgentExecutor } from "langchain/agents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { CohereEmbeddings } from "@langchain/cohere";
import { VercelPostgres } from "@langchain/community/vectorstores/vercel_postgres";



const PROMPT = `
Your name is Pierre Drouillet.
    
You are a seasoned AI full stack developer who goes by the name of Pierre Drouillet with 10+ years of experience in IT.

You are talking with prospective client who is looking to build a new AI product and are looking to hire you.

You answer any questions they have about Pierre Drouillet to convince them to hire you.

You must return a final answer, not an action. If you can't return a final answer, return "none".

Begin!


{chat_history}
Human: {human_input}
{agent_scratchpad}
`;

const model = new ChatOpenAI({
  openAIApiKey: "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",
  temperature: 0,
  modelName: "gpt-4",
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: "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",
});

const modelWithStop = model.bind({
  stop: ["\nObservation"],
});

const tools: any[] = [];

const modelForFunctionCalling = new ChatOpenAI({
  openAIApiKey: "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",
  modelName: "gpt-4",
  temperature: 0,
});

const jsonModeModel = new ChatOpenAI({
  modelName: "gpt-4-1106-preview",
  openAIApiKey: "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",
  maxTokens: 128,
}).bind({
  response_format: {
    type: "json_object",
  },
});

// const llm = new OpenAI({
//   openAIApiKey: "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",
//   temperature: 0,
// });

export async function POST(request: Request) {
  const { message } = await request.json();

  const config = {
    tableName: "documents",
    postgresConnectionOptions: {
      connectionString: "postgres://postgres:mypassword@0.0.0.0:4789/postgres",
    },
    columns: {
      idColumnName: "id",
      vectorColumnName: "vector",
      contentColumnName: "content",
      metadataColumnName: "metadata",
    },
  };

  const prompt = new PromptTemplate({
    inputVariables: [
      "chat_history",
      "human_input",
      "agent_scratchpad",
      "tools",
      "tool_names",
    ],
    template: PROMPT,
  });

  const vercelPostgresStore = await VercelPostgres.initialize(
    new CohereEmbeddings(),
    config
  );

  const toolNames = tools.map((tool) => tool.name);
  const promptWithInputs = await prompt.partial({
    tools: renderTextDescription(tools),
    tool_names: toolNames.join(","),
  });

  const memory = new BufferMemory({ memoryKey: "chat_history" });

  const runnableAgent = RunnableSequence.from([
    {
      human_input: (i: {
        input: string;
        steps: AgentStep[];
        chat_history: BaseMessage[];
      }) => i.input,
      agent_scratchpad: (i: {
        input: string;
        steps: AgentStep[];
        chat_history: BaseMessage[];
      }) => formatLogToString(i.steps),
      chat_history: (i: {
        input: string;
        steps: AgentStep[];
        chat_history: BaseMessage[];
      }) => i.chat_history,
    },
    promptWithInputs,
    modelWithStop,
    new ReActSingleInputOutputParser({ toolNames }),
  ]);

  const executor = AgentExecutor.fromAgentAndTools({
    agent: runnableAgent,
    tools,
    memory,
    handleParsingErrors: true,
  });

  const result0 = await executor.invoke({ input: message });
  console.log(`Got output ${result0.output}`);

  // const history = new ChatMessageHistory();

  // history.addMessage(new SystemMessage({ content: PROMPT }));
  // history.addMessage(new HumanMessage({ content: message }));

  // const messages = await history.getMessages()

  // const output = await chat.invoke(messages);

  // console.log(output);
}
