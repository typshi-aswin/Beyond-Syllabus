"use server";

/**
 * @fileOverview An AI agent that summarizes a syllabus into key learning objectives.
 *
 * - summarizeSyllabus - A function that handles the syllabus summarization process.
 * - SummarizeSyllabusInput - The input type for the summarizeSyllabus function.
 * - SummarizeSyllabusOutput - The return type for the summarizeSyllabus function.
 */

import { ai } from "../genkit";
import { z } from "genkit";

const SummarizeSyllabusInputSchema = z.object({
  syllabusText: z
    .string()
    .describe("The text content of the syllabus to be summarized."),
});
export type SummarizeSyllabusInput = z.infer<
  typeof SummarizeSyllabusInputSchema
>;

const SummarizeSyllabusOutputSchema = z.object({
  summary: z
    .string()
    .describe("A summary of the key learning objectives of the syllabus."),
});
export type SummarizeSyllabusOutput = z.infer<
  typeof SummarizeSyllabusOutputSchema
>;

export async function summarizeSyllabus(
  input: SummarizeSyllabusInput
): Promise<SummarizeSyllabusOutput> {
  return summarizeSyllabusFlow(input);
}

const prompt = ai.definePrompt({
  name: "summarizeSyllabusPrompt",
  input: { schema: SummarizeSyllabusInputSchema },
  output: { schema: SummarizeSyllabusOutputSchema },
  prompt: `You are an expert academic assistant. Your task is to summarize the key learning objectives of a given syllabus. Focus on extracting the core knowledge and skills that students are expected to gain.

Syllabus Text: {{{syllabusText}}}`,
});

const summarizeSyllabusFlow = ai.defineFlow(
  {
    name: "summarizeSyllabusFlow",
    inputSchema: SummarizeSyllabusInputSchema,
    outputSchema: SummarizeSyllabusOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
