// src/ai/flows/suggest-resources.ts
'use server';

/**
 * @fileOverview A flow that suggests relevant online resources for a given syllabus section.
 *
 * - suggestResources - A function that suggests relevant online resources.
 * - SuggestResourcesInput - The input type for the suggestResources function.
 * - SuggestResourcesOutput - The return type for the suggestResources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  ).describe('A list of relevant online resources.'),
});
export type SuggestResourcesOutput = z.infer<typeof SuggestResourcesOutputSchema>;

export async function suggestResources(input: SuggestResourcesInput): Promise<SuggestResourcesOutput> {
  return suggestResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResourcesPrompt',
  input: {schema: SuggestResourcesInputSchema},
  output: {schema: SuggestResourcesOutputSchema},
  prompt: `You are an AI assistant helping students find relevant online resources for their syllabus.
  Given a syllabus section, you will suggest a list of online resources that can help the student understand the material better.
  The resources should be relevant to the syllabus section and should be easily accessible online.
  Make sure the url are valid.

  Syllabus Section: {{{syllabusSection}}}
  `,
});

const suggestResourcesFlow = ai.defineFlow(
  {
    name: 'suggestResourcesFlow',
    inputSchema: SuggestResourcesInputSchema,
    outputSchema: SuggestResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
