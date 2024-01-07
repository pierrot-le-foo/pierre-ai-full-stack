import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { answerChain, retrieverChain, standaloneQuestionChain } from "@/chains";
import { ChatMessage, ChatMessageType } from "@/types";

function formatConvHistory(messages: ChatMessage[]) {
  return messages
    .map((message, i) => {
      if (message.type === ChatMessageType.Human) {
        return `Human: ${message}`;
      } else {
        return `AI: ${message}`;
      }
    })
    .join("\n");
}

export async function chat(question: string, convHistory: ChatMessage[]) {
  const chain = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.question,
      conv_history: ({ original_input }) => original_input.conv_history,
    },
    answerChain,
  ]);

  const response = await chain.invoke({
    question: question,
    conv_history: formatConvHistory(convHistory),
  });

  return response;
}
