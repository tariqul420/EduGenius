"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function testConnection() {
  try {
    const { sessionClaims } = await auth();
    const instructor = sessionClaims?.userId;
    if (!instructor) {
      throw new Error("User not authenticated");
    }

    const user = await currentUser();

    const response = await hf.textGeneration({
      model: "microsoft/DialoGPT-small",
      inputs: `Generate greeting like good morning, good afternoon, good night for name: ${user.firstName}  ${user.lastName}`,
      parameters: {
        max_new_tokens: 50,
        temperature: 0.9,
        return_full_text: false,
      },
    });
    return response.generated_text;
  } catch (error) {
    console.error("Connection failed:", error);
    throw new Error(`Hugging Face API Error: ${error.message}`);
  }
}

export async function generateQuiz(topic) {
  try {
    const response = await hf.textGeneration({
      // provider: "novita",
      model: "deepseek-ai/Janus-Pro-7B",
      messages: [
        {
          role: "user",
          content: `Create 5 multiple-choice questions about ${topic}. 
      Format: 
      Q1. Question
      a) Option 1
      b) Option 2
      c) Option 3
      d) Option 4
      Correct: Letter`,
        },
      ],
      max_tokens: 512,
    });

    return response.generated_text;
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    throw error;
  }
}
