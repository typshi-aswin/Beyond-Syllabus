"use server";

/**
 * @fileOverview An AI agent that summarizes a syllabus into key learning objectives.
 *
 * - summarizeSyllabus - A function that handles the syllabus summarization process.
 */

import { ai } from "@/ai/ai"; // <-- Still using your Groq instance

export interface SummarizeSyllabusInput {
  syllabusText: string;
}

export interface SummarizeSyllabusOutput {
  summary: string;
}

export async function summarizeSyllabus(
  input: SummarizeSyllabusInput
): Promise<SummarizeSyllabusOutput> {
  return summarizeSyllabusFlow(input);
}

// ---------------------- Prompt & Flow ----------------------
const summarizeSyllabusFlow = async (
  input: SummarizeSyllabusInput
): Promise<SummarizeSyllabusOutput> => {
  const chatCompletion = await ai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an expert academic assistant. Your task is to summarize the key learning objectives of a given syllabus. Focus on extracting the core knowledge and skills that students are expected to gain.

Syllabus Text: ${input.syllabusText}`,
      },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.9,
    max_completion_tokens: 1024,
    top_p: 0.95,
  });

  const summary = chatCompletion.choices?.[0]?.message?.content || "";
  return { summary };
};
