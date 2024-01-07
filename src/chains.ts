import { PromptTemplate } from "@langchain/core/prompts";
import { PROMPT_PIERRE, PROMPT_STANDALONE } from "./prompts";
import { combineDocuments, llm } from "./chatbots/config";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { getRetriever } from "./retriever";

export const standaloneQuestionChain = PromptTemplate.fromTemplate(PROMPT_STANDALONE)
.pipe(llm)
.pipe(new StringOutputParser());

export const retrieverChain = async () => RunnableSequence.from([
  (prevResult) => prevResult.standalone_question,
  await getRetriever('documents'),
  combineDocuments,
]);

export const answerPrompt = PromptTemplate.fromTemplate(PROMPT_PIERRE);

export const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());