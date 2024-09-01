import { streamText, convertToCoreMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const model = groq("llama3-8b-8192");

  const result = await streamText({
    model,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
