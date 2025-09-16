'use server';

import { ai } from '@/ai/ai';
import { z } from 'genkit';

/**
 * @fileOverview An AI agent that generates learning tasks and real-world applications for a given module content.
 */

const GenerateModuleTasksInputSchema = z.object({
  moduleContent: z.string().describe(
    'The text content of the syllabus module to generate tasks and applications for.'
  ),
  moduleTitle: z.string().describe('The title of the syllabus module.'),
  model: z
    .string()
    .optional()
    .describe(
      'Optional: the AI model to use (e.g., openai/gpt-4o-mini, anthropic/claude-3, etc.).'
    ),
});
export type GenerateModuleTasksInput = z.infer<
  typeof GenerateModuleTasksInputSchema
>;

const GenerateModuleTasksOutputSchema = z.object({
  introductoryMessage: z
    .string()
    .describe(
      'A welcoming, introductory message that includes a brief overview of what the user can expect, including learning tasks and real-world applications.'
    ),
  suggestions: z
    .array(z.string())
    .describe(
      'A list of 3-4 short, engaging follow-up questions a student might ask based on the module content.'
    ),
});
export type GenerateModuleTasksOutput = z.infer<
  typeof GenerateModuleTasksOutputSchema
>;

// ---------------------- Flow Logic ----------------------
const generateModuleTasksFlow = async (
  input: GenerateModuleTasksInput
): Promise<GenerateModuleTasksOutput> => {
  const promptText = `You are an expert curriculum assistant. Create a premium-feel introductory message for a syllabus module with the following structure:

- A short, engaging welcome line with emojis.
- 2–4 learning tasks (as a markdown bullet list with emojis).
- 2–3 real-world applications (as a markdown bullet list with emojis).
- 3–4 reflective follow-up questions (numbered list with ❓ emoji).

Return output strictly in JSON format:

{
  "introductoryMessage": "...",
  "suggestions": ["...", "..."]
}

Input values:
Module Title: "${input.moduleTitle}"
Module Content: "${input.moduleContent}"
`;
  try {
    const chatCompletion = await ai.chat.completions.create({
      messages: [{ role: 'user', content: promptText }],
      model: input.model || 'openai/gpt-oss-20b', // ✅ safe fallback
      temperature: 0.6,
      max_completion_tokens: 2048,
      top_p: 0.95,
    });

    let outputText = chatCompletion.choices?.[0]?.message?.content || '';

    // === Sanitize AI output ===
    outputText = outputText
      .trim()
      .replace(/^```json\s*/i, '') // remove ```json at start
      .replace(/^```/i, '') // remove plain ```
      .replace(/```$/i, ''); // remove closing ```

    // Try parsing JSON safely
    const firstBrace = outputText.indexOf('{');
    const lastBrace = outputText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      outputText = outputText.substring(firstBrace, lastBrace + 1);
    }

    const output = JSON.parse(outputText);
    return output as GenerateModuleTasksOutput;
  } catch (e) {
    console.error(
      `Error generating tasks for module "${input.moduleTitle}":`,
      e
    );

    // Fallback output
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
