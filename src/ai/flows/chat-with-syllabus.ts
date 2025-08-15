// src/ai/flows/chat-with-syllabus.ts
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {MessageData} from 'genkit';

/**
 * @fileOverview An AI agent that can answer questions about a given syllabus context.
 *
 * - chatWithSyllabus - A function that handles the chat conversation.
 * - ChatWithSyllabusInput - The input type for the chatWithSyllabus function.
 * - ChatWithSyllabusOutput - The return type for the chatWithSyllabus function.
 */
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Define the schema for a single message in the chat history
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

// Define the input schema for the chat flow
const ChatWithSyllabusInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The history of the conversation so far.'),
  message: z.string().describe('The latest message from the user.'),
});
export type ChatWithSyllabusInput = z.infer<typeof ChatWithSyllabusInputSchema>;

// Define the output schema for the chat flow
const ChatWithSyllabusOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user's message."),
   suggestions: z.array(z.string()).optional().describe("A list of 3-4 short, engaging follow-up questions the user might ask next.")
});
export type ChatWithSyllabusOutput = z.infer<typeof ChatWithSyllabusOutputSchema>;

// The main function that will be called from the frontend
export async function chatWithSyllabus(input: ChatWithSyllabusInput): Promise<ChatWithSyllabusOutput> {
  return chatWithSyllabusFlow(input);
}


const prompt = ai.definePrompt({
  name: 'chatTutorPrompt',
  input: { schema: ChatWithSyllabusInputSchema },
  output: { schema: ChatWithSyllabusOutputSchema },
  system: `You are a patient and flexible study tutor. Follow this workflow strictly:
1) CALIBRATE: ask 2–3 questions to gauge the learner's level, goals, or interests.
2) PLAN: propose a short plan (3–5 steps) to approach the topic or study goal.
3) TEACH: explain briefly, then ask a guiding question.
4) PRACTICE: generate 1 problem; wait for the user's answer; give a hint if requested.
5) CHECK: verify the answer, show reasoning, and provide 1 common misconception tip.
6) REFLECT: ask the learner to restate the idea in their own words.

Rules:
- You may answer any questions related to study, learning strategies, educational concepts, or planning study schedules.
- Politely decline only questions that are clearly unrelated to learning, education, or study planning.
- Prefer asking questions over giving direct answers; reveal steps gradually.
- Maintain a respectful and encouraging tone.
- Always provide 3–4 short, engaging follow-up questions the student might ask next.

Return all outputs strictly in this JSON format:

\`\`\`json
{
  "response": "Your teaching output following the steps above...",
  "suggestions": [
    "Follow-up question 1",
    "Follow-up question 2",
    "Follow-up question 3"
  ]
}
\`\`\`

Conversation History:
{{#each history}}
- {{role}}: {{{content}}}
{{/each}}

User's Message: "{{{message}}}"`,
  prompt: `Based on the conversation history and the user's latest message, provide a response and a new set of suggestions.`
});




// Define the Genkit flow for the chat functionality
const chatWithSyllabusFlow = ai.defineFlow(
  {
    name: 'chatWithSyllabusFlow',
    inputSchema: ChatWithSyllabusInputSchema,
    outputSchema: ChatWithSyllabusOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output) {
        return { response: "I'm sorry, I couldn't generate a response. Please try again." };
      }
      return output;
    } catch(e) {
      console.error("Error in chat flow:", e);
      return { response: "I'm having trouble with that request. Could you try rephrasing it?" };
    }
  }
);
