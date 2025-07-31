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
  tasks: z.array(z.string()).describe('A list of learning tasks based on the module content.'),
  realWorldApplications: z.string().describe('An explanation of the real-world applications of the module content.'),
});
export type GenerateModuleTasksOutput = z.infer<typeof GenerateModuleTasksOutputSchema>;

const generateModuleTasksFlow = ai.defineFlow(
  {
    name: 'generateModuleTasks',
    inputSchema: GenerateModuleTasksInputSchema,
    outputSchema: GenerateModuleTasksOutputSchema,
  },
  async (input) => {
    const prompt = `Given the following syllabus module content, generate a list of specific learning tasks a student could perform to understand this material and explain its real-world applications.

Module Content:
${input.moduleContent}

Output Format:
Tasks:
- [Task 1]
- [Task 2]
...

Real-World Applications:
[Explanation]`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.0-flash',
      config: {
        temperature: 0.7,
      },
    });

    // Handle both .text property and .candidates[0].text (Genkit/GoogleAI SDK)
    const text =
      typeof llmResponse.text === 'function'
        ? llmResponse.text()
        : llmResponse.text ||
          (llmResponse.candidates && llmResponse.candidates[0] && llmResponse.candidates[0].text) ||
          '';

    const tasksMatch = text.match(/Tasks:\n([\s\S]*?)\nReal-World Applications:/);
    const applicationsMatch = text.match(/Real-World Applications:\n([\s\S]*)/);

    const tasks = tasksMatch ? tasksMatch[1].split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace(/^- /, '').trim()) : [];
    const realWorldApplications = applicationsMatch ? applicationsMatch[1].trim() : 'Could not generate real-world applications.';

    return {
      tasks,
      realWorldApplications,
    };
  }
);

export default generateModuleTasksFlow; // Explicitly export the flow as default
