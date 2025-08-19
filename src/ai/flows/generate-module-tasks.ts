'use server';

import { ai } from '@/ai/ai';
import { z } from 'genkit';

/**
 * @fileOverview An AI agent that generates learning tasks and real-world applications for a given module content.
 */

const GenerateModuleTasksInputSchema = z.object({
  moduleContent: z.string().describe('The text content of the syllabus module to generate tasks and applications for.'),
  moduleTitle: z.string().describe('The title of the syllabus module.'),
  model: z.string().optional().describe('Optional AI model to use for generation.'),
});
export type GenerateModuleTasksInput = z.infer<typeof GenerateModuleTasksInputSchema>;

const GenerateModuleTasksOutputSchema = z.object({
  introductoryMessage: z.string().describe("A welcoming, introductory message that includes a brief overview of what the user can expect, including learning tasks and real-world applications."),
  suggestions: z.array(z.string()).describe("A list of 3-4 short, engaging follow-up questions a student might ask based on the module content."),
});
export type GenerateModuleTasksOutput = z.infer<typeof GenerateModuleTasksOutputSchema>;

// ---------------------- Flow Logic ----------------------

  const generateModuleTasksFlow = async (input: GenerateModuleTasksInput): Promise<GenerateModuleTasksOutput> => {
  const promptText = `
You are an expert curriculum assistant. Generate a welcoming introductory message for a syllabus module, including:
- 2–4 learning tasks (markdown list)
- 2–3 real-world applications (markdown list)
- 3–4 follow-up questions

Return output strictly in JSON format:
{
  "introductoryMessage": "...",
  "suggestions": ["...", "..."]
}
Module Title: "${input.moduleTitle}"
Module Content: "${input.moduleContent}"
`;

  try {
    const chatCompletion = await ai.chat.completions.create({
      messages: [{ role: 'user', content: promptText }],
      model: input.model || 'meta-llama/llama-4-maverick-17b-128e-instruct',
      temperature: 0.6,
      max_completion_tokens: 2048,
      top_p: 0.95,
    });

    let outputText = chatCompletion.choices?.[0]?.message?.content || '';

    // === Sanitize AI output: remove ```json or ``` wrappers ===
    outputText = outputText
      .trim()
      .replace(/^```json\s*/, '')
      .replace(/^```/, '')
      .replace(/```$/, '');

    const output = JSON.parse(outputText);
    return output as GenerateModuleTasksOutput;
  } catch (e) {
    console.error(`Error generating tasks for module "${input.moduleTitle}":`, e);

    return {
      introductoryMessage: `Hello! I ran into some issues generating the introduction for "${input.moduleTitle}". You can try again or change the AI model if needed.`,
      suggestions: [
        `Try using a different AI model for "${input.moduleTitle}"`,
        `Rephrase your module content and try again`,
        `What are the key topics in "${input.moduleTitle}"?`,
        'Can you provide a brief overview of this module?',
      ],
    };
  }
};

export async function generateModuleTasks(
  input: GenerateModuleTasksInput
): Promise<GenerateModuleTasksOutput> {
  return generateModuleTasksFlow(input);
}
