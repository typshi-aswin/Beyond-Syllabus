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
      role: msg.role,
      content: [{ text: msg.content }],
    }));

    const result = await ai.generate({
      prompt: input.message,
      history: history,
    });

    const text = result.text();

    if (!text) {
        return { response: "I'm sorry, I couldn't generate a response. Please try again." };
    }

    return { response: text };
  }
);
