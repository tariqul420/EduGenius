import { xai } from "@ai-sdk/xai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!process.env.XAI_API_KEY) {
      throw new Error("XAI_API_KEY is not set in environment variables");
    }

    const result = streamText({
      model: xai("grok-3", { apiKey: process.env.XAI_API_KEY }),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
