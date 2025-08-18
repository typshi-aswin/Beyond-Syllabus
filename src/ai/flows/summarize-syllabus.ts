'use server';

/**
 * @fileOverview An AI agent that summarizes a syllabus into key learning objectives.
 *
 * - summarizeSyllabus - A function that handles the syllabus summarization process.
 * - SummarizeSyllabusInput - The input type for the summarizeSyllabus function.
 * - SummarizeSyllabusOutput - The return type for the summarizeSyllabus function.
 */

import { ai } from '@/ai/ai'; // <-- Now using your Groq instance
import { z } from 'genkit'; // You can still use zod from genkit

const SummarizeSyllabusInputSchema = z.object({
  syllabusText: z
    .string()
    .describe('The text content of the syllabus to be summarized.'),
});
export type SummarizeSyllabusInput = z.infer<typeof SummarizeSyllabusInputSchema>;

const SummarizeSyllabusOutputSchema = z.object({
  summary: z.string().describe('A summary of the key learning objectives of the syllabus.'),
});
export type SummarizeSyllabusOutput = z.infer<typeof SummarizeSyllabusOutputSchema>;

export async function summarizeSyllabus(
  input: SummarizeSyllabusInput
): Promise<SummarizeSyllabusOutput> {
  return summarizeSyllabusFlow(input);
}

// ---------------------- Prompt & Flow ----------------------
const summarizeSyllabusFlow = async (input: SummarizeSyllabusInput): Promise<SummarizeSyllabusOutput> => {
  const chatCompletion = await ai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `You are an expert academic assistant. Your task is to summarize the key learning objectives of a given syllabus. Focus on extracting the core knowledge and skills that students are expected to gain .

Syllabus Text: ${input.syllabusText}`,
      },
    ],
    model: 'llama-3.1-8b-instant',
    temperature: 0.6,
    max_completion_tokens: 1024,
    top_p: 0.95,
  });

  const summary = chatCompletion.choices?.[0]?.message?.content || '';
  return { summary };
};
