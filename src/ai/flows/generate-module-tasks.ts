// src/ai/flows/generate-module-tasks.ts
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * @fileOverview An AI agent that generates learning tasks and real-world applications for a given module content.
 *
 * - generateModuleTasks - A function that handles the task and application generation process.
 * - GenerateModuleTasksInput - The input type for the generateModuleTasks function.
 * - GenerateModuleTasksOutput - The return type for the generateModuleTasks function.
 */

const GenerateModuleTasksInputSchema = z.object({
  moduleContent: z
    .string()
    .describe('The text content of the syllabus module to generate tasks and applications for.'),
  moduleTitle: z.string().describe('The title of the syllabus module.'),
});
export type GenerateModuleTasksInput = z.infer<typeof GenerateModuleTasksInputSchema>;

const GenerateModuleTasksOutputSchema = z.object({
  introductoryMessage: z.string().describe("A welcoming, introductory message that includes a brief overview of what the user can expect, including learning tasks and real-world applications."),
  suggestions: z.array(z.string()).describe("A list of 3-4 short, engaging follow-up questions a student might ask based on the module content."),
});
export type GenerateModuleTasksOutput = z.infer<typeof GenerateModuleTasksOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateModuleTasksPrompt',
  input: { schema: GenerateModuleTasksInputSchema },
  output: { schema: GenerateModuleTasksOutputSchema },
  system: `
You are an expert curriculum assistant. Your task is to generate a welcoming, introductory message for a student about a specific syllabus module, including learning tasks, real-world applications, and follow-up questions. Follow the JSON format strictly.
  `,
  prompt: `
Module Content:
"{{{moduleContent}}}"

Module Title:
"{{{moduleTitle}}}"

Guidelines:
1. Start with a friendly greeting mentioning the module title.
2. Include 2–4 distinct learning tasks in markdown list format.
3. Include 2–3 real-world applications in markdown list format.
4. Generate 3–4 short, engaging follow-up questions separately.
5. Return output strictly in the provided JSON format.
  `
});


const generateModuleTasksFlow = ai.defineFlow(
  {
    name: 'generateModuleTasks',
    inputSchema: GenerateModuleTasksInputSchema,
    outputSchema: GenerateModuleTasksOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);

      if (!output) {
        throw new Error("AI did not return any output.");
      }

      return output;
    } catch (e) {
      console.error(`Error generating tasks for module "${input.moduleTitle}":`, e);
      // Fallback output
      return {
        introductoryMessage: `Hello! I had a little trouble generating the introduction for "${input.moduleTitle}". Please paste the syllabus content again or ask me a question to get started!`,
        suggestions: [
          `What are the key topics in "${input.moduleTitle}"?`,
          'Can you give me an overview?',
          'What are the real-world applications?',
        ],
      };
    }
  }
);

export async function generateModuleTasks(
  input: GenerateModuleTasksInput
): Promise<GenerateModuleTasksOutput> {
  return generateModuleTasksFlow(input);
}
