// frontend/src/ai/flows/generate-module-tasks.ts
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
});
export type GenerateModuleTasksInput = z.infer<typeof GenerateModuleTasksInputSchema>;

const GenerateModuleTasksOutputSchema = z.object({
  tasks: z.array(z.string()).describe('A list of 2-4 learning tasks based on the module content.'),
  realWorldApplications: z.string().describe('An explanation of 2-3 real-world applications of the module content.'),
});
export type GenerateModuleTasksOutput = z.infer<typeof GenerateModuleTasksOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateModuleTasksPrompt',
  input: { schema: GenerateModuleTasksInputSchema },
  output: { schema: GenerateModuleTasksOutputSchema },
  prompt: `You are an expert curriculum assistant. Your task is to generate specific, actionable learning tasks and concise real-world applications for the provided syllabus module.

Syllabus Module Content:
"{{{moduleContent}}}"

Guidelines:
1. Generate 2 to 4 distinct learning tasks that a student could perform to understand the material.
2. Describe 2 to 3 real-world applications of the module's concepts.
3. Ensure the output is in the specified JSON format.
`,
});


const generateModuleTasksFlow = ai.defineFlow(
  {
    name: 'generateModuleTasks',
    inputSchema: GenerateModuleTasksInputSchema,
    outputSchema: GenerateModuleTasksOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate module tasks.");
    }
    return output;
  }
);


export async function generateModuleTasks(input: GenerateModuleTasksInput): Promise<GenerateModuleTasksOutput> {
    return generateModuleTasksFlow(input);
}
