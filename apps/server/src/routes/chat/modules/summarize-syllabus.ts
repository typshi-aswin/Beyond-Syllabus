import { Chat } from "@/lib/genkit";
import { z } from "genkit";

export const SummarizeSyllabusInputSchema = z.object({
  syllabusText: z
    .string()
    .describe("The text content of the syllabus to be summarized."),
});
export type SummarizeSyllabusInput = z.infer<
  typeof SummarizeSyllabusInputSchema
>;

export const SummarizeSyllabusOutputSchema = z.object({
  summary: z
    .string()
    .describe("A summary of the key learning objectives of the syllabus."),
});
export type SummarizeSyllabusOutput = z.infer<
  typeof SummarizeSyllabusOutputSchema
>;

const summarizeSyllabusPrompt = Chat.definePrompt({
  name: "summarizeSyllabusPrompt",
  input: { schema: SummarizeSyllabusInputSchema },
  output: { schema: SummarizeSyllabusOutputSchema },
  prompt: `You are an expert academic assistant. Your task is to summarize the key learning objectives of a given syllabus. Focus on extracting the core knowledge and skills that students are expected to gain.

Syllabus Text: {{{syllabusText}}}`,
});

const summarizeSyllabusFlow = Chat.defineFlow(
  {
    name: "summarizeSyllabusFlow",
    inputSchema: SummarizeSyllabusInputSchema,
    outputSchema: SummarizeSyllabusOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await summarizeSyllabusPrompt(input);
      if (!output) {
        throw new Error("AI did not return any output.");
      }
      return output;
    } catch (e) {
      console.error("Error summarizing syllabus:", e);
      return {
        summary:
          "I encountered an error while summarizing the syllabus. Please try again with the syllabus content.",
      };
    }
  }
);

export async function summarizeSyllabus(
  input: SummarizeSyllabusInput
): Promise<SummarizeSyllabusOutput> {
  return summarizeSyllabusFlow(input);
}
