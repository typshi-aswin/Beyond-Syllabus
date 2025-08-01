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
});
export type ChatWithSyllabusOutput = z.infer<typeof ChatWithSyllabusOutputSchema>;

// The main function that will be called from the frontend
export async function chatWithSyllabus(input: ChatWithSyllabusInput): Promise<ChatWithSyllabusOutput> {
  return chatWithSyllabusFlow(input);
}

// Define the Genkit flow for the chat functionality
const chatWithSyllabusFlow = ai.defineFlow(
  {
    name: 'chatWithSyllabusFlow',
    inputSchema: ChatWithSyllabusInputSchema,
    outputSchema: ChatWithSyllabusOutputSchema,
  },
  async (input) => {
    // Convert the message history to the format Genkit expects
    const history: MessageData[] = input.history.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      content: [{ text: msg.content }],
    }));

    const result = await ai.generate({
      prompt: input.message,
      history: history,
       system: `In addition to answering based strictly on the syllabus content, you may also explain any terms or concepts that appear in your own answers, as long as they are logically connected to the syllabus topics or listed real-world applications.

For example:
• If you explain that "file systems use tree structures", and the user later asks "what is a directory?" or "what does hierarchical mean?", you may answer because those are part of your original explanation.
• If the user follows up on terms like "shortest path", "nodes", or "search", you may elaborate if they stem from previous answers about syllabus topics like graphs or trees.

However, you must not use this rule to drift into unrelated subjects. If a user tries to pivot to topics not logically connected to the syllabus or your previous answer (e.g., discussing cybersecurity, history, or unrelated technologies), you must politely decline.

Stay within scope but allow logical follow-ups. Track your own vocabulary to support natural exploration within syllabus boundaries.

`
    });

    const text = result.text;

    if (!text) {
        return { response: "I'm sorry, I couldn't generate a response. Please try again." };
    }

    return { response: text };
  }
);
