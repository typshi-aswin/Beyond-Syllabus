'use server';

/**
 * @fileOverview A flow that suggests relevant online resources for a given syllabus section.
 */

import { ai } from '@/ai/ai';
import { z } from 'genkit';

const SuggestResourcesInputSchema = z.object({
  syllabusSection: z.string().describe('The syllabus section to find resources for.'),
});
export type SuggestResourcesInput = z.infer<typeof SuggestResourcesInputSchema>;

const SuggestResourcesOutputSchema = z.object({
  resources: z.array(
    z.object({
      title: z.string().describe('The title of the resource.'),
      url: z.string().url().describe('The URL of the resource.'),
      description: z.string().describe('A brief description of the resource and its relevance to the syllabus section.'),
    })
  ).describe('A list of 3 to 5 relevant online resources.'),
});
export type SuggestResourcesOutput = z.infer<typeof SuggestResourcesOutputSchema>;

// ---------------------- Flow Logic ----------------------
const suggestResourcesFlow = async (input: SuggestResourcesInput): Promise<SuggestResourcesOutput> => {
  const promptText = `
You are an expert curriculum assistant. Your goal is to find 3-5 high-quality online resources for a university student studying the following syllabus section.

Syllabus Section:
"${input.syllabusSection}"

Guidelines:
1. Provide a mix of resource types (e.g., video, article, tutorial).
2. Prioritize reputable sources like university websites, established educational platforms, and well-known technical blogs.
3. Ensure all URLs are valid and directly accessible.
4. The description should clearly explain the resource's relevance.
5. You MUST return the data in the following JSON format:

{
  "resources": [
    {
      "title": "Resource Title",
      "url": "https://...",
      "description": "Why this resource is useful for the syllabus section"
    }
  ]
}
`;

  try {
    const completion = await ai.chat.completions.create({
      messages: [{ role: 'user', content: promptText }],
      model: 'qwen/qwen3-32b',
      temperature: 0.6,
      max_completion_tokens: 2048,
      top_p: 0.95,
    });

    const outputText = completion.choices?.[0]?.message?.content || '';
    const output = JSON.parse(outputText);

    if (!output || !output.resources || output.resources.length === 0) {
      return { resources: [] };
    }

    return output as SuggestResourcesOutput;
  } catch (error) {
    console.error('Error in suggestResourcesFlow:', error);
    return { resources: [] };
  }
};

// Main function for frontend
export async function suggestResources(input: SuggestResourcesInput): Promise<SuggestResourcesOutput> {
  return suggestResourcesFlow(input);
}
