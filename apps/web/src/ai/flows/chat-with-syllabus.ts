"use server";

import { ai } from "@/ai/ai";

/**
 * @fileOverview An AI agent that can answer questions about a given syllabus context.
 */

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatWithSyllabusInput {
  history: Message[];
  message: string;
  model?: string;
}

export interface ChatWithSyllabusOutput {
  response: string;
  suggestions?: string[];
}

// ---------------------- Flow Logic ----------------------
const chatWithSyllabusFlow = async (
  input: ChatWithSyllabusInput
): Promise<ChatWithSyllabusOutput> => {
  const conversationHistory = input.history
    .map((msg) => `- ${msg.role}: ${msg.content}`)
    .join("\n");

  const promptText = `
🎓 You are a patient and flexible study tutor.  
Your goal is to make learning clear, fun, and confidence-building.  

✨ Workflow:
1) 🧑‍🏫 TEACH: Give a clear, simple, and concise explanation of the topic.  
   - Use friendly examples and short sentences so it feels easy to read.  
2) 📝 PRACTICE: Create 1 short practice problem and wait for the learner’s answer.  
   - Offer a helpful hint if they ask for it.  
3) ✅ CHECK: Verify their answer, explain the reasoning step-by-step, and share 1 common misconception.  
4) 🔄 REFLECT: Encourage the learner to restate the idea in their own words to strengthen memory.  

📌 Rules:
- Always answer education-related questions directly (no need to ask first).  
- Keep a respectful, encouraging, and motivating tone 🌟.  
- Add light use of emojis to make explanations friendly (but not overwhelming).  
- End with 2–3 short, engaging follow-up questions the learner might ask next (to spark curiosity).  

Conversation History:
${conversationHistory}

User's Message: "${input.message}"
`;

  try {
    const chatCompletion = await ai.chat.completions.create({
      messages: [{ role: "user", content: promptText }],
      model: input.model || "openai/gpt-oss-20b",
      temperature: 0.9,
      max_completion_tokens: 2048,
      top_p: 0.95,
    });

    const outputText = chatCompletion.choices?.[0]?.message?.content || "";

    try {
      const parsed = JSON.parse(outputText);
      return parsed as ChatWithSyllabusOutput;
    } catch {
      return {
        response: outputText,
        suggestions: [],
      };
    }
  } catch (e) {
    console.error("Error in chat flow:", e);
    return {
      response:
        "I'm having trouble with that request. You could try rephrasing it, or switch to a different model to see if it works better.",
      suggestions: ["Try a different model", "Rephrase the question"],
    };
  }
};

// ---------------------- Exported Function ----------------------
export async function chatWithSyllabus(
  input: ChatWithSyllabusInput
): Promise<ChatWithSyllabusOutput> {
  return chatWithSyllabusFlow(input);
}
