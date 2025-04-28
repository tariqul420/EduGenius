// import { xai } from "@ai-sdk/xai";
// import { streamText } from "ai";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req) {
//   const { messages } = await req.json();

//   const result = streamText({
//     model: xai("grok-2-1212", { useSearchGrounding: true }),
//     messages,
//   });

//   return result.toDataStreamResponse({
//     sendSources: true,
//   });
// }

// import { google } from "@ai-sdk/google";
// import { streamText } from "ai";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req) {
//   const { messages } = await req.json();

//   const result = streamText({
//     model: google("gemini-2.0-flash-001", { useSearchGrounding: true }),
//     messages,
//   });

//   return result.toDataStreamResponse({
//     sendSources: true,
//   });
// }

// import { xai } from "@ai-sdk/xai";
// import { streamText } from "ai";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req) {
//   const { messages } = await req.json();

//   const result = streamText({
//     model: xai("grok-2-1212"),
//     messages,
//   });

//   return result.toDataStreamResponse();
// }

// // app/api/chat/route.js
// import { GoogleGenerativeAI } from "@google/generative-ai"; // Make sure to install this package

// const { GEMINI_API_KEY } = process.env;
// const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

// // app/api/chat/route.js
// export async function POST(req) {
//   try {
//     const { messages } = await req.json();
//     const latestMessage = messages[messages.length - 1];

//     // Authentication and model setup...

//     const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-001" });
//     const response = await model.generateContent(latestMessage.content);
//     const responseText = response.response.text();

//     console.log({
//       id: crypto.randomUUID(), // Generate a unique ID for this message
//       role: "assistant",
//       content: responseText,
//       createdAt: new Date(),
//     });

//     // Return in the EXACT format expected by useChat
//     return new Response(
//       JSON.stringify({
//         id: crypto.randomUUID(), // Generate a unique ID for this message
//         role: "assistant",
//         content: responseText,
//         createdAt: new Date(),
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       },
//     );
//   } catch (error) {
//     console.error("Error generating message:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to generate message" }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       },
//     );
//   }
// }

// app/api/chat/route.js
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Use the google model with streamText for proper streaming
    const result = streamText({
      model: google("gemini-2.0-flash-001", { useSearchGrounding: true }),
      messages,
    });

    // Return the streaming response in the format expected by useChat
    return result.toDataStreamResponse({
      sendSources: true,
    });
  } catch (error) {
    console.error("Error generating message:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
