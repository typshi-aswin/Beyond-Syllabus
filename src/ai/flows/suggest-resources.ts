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
  ).describe('A list of 3 to 5 relevant online resources.'),
});
export type SuggestResourcesOutput = z.infer<typeof SuggestResourcesOutputSchema>;

export async function suggestResources(input: SuggestResourcesInput): Promise<SuggestResourcesOutput> {
  return suggestResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResourcesPrompt',
  input: {schema: SuggestResourcesInputSchema},
  output: {schema: SuggestResourcesOutputSchema},
  prompt: `You are an AI assistant specialized in finding high-quality, relevant online resources for university students.
  For the given syllabus section, you must suggest a list of 3 to 5 online resources that will help a student understand the material better.

  You must provide your response in the JSON format specified by the output schema.

  Guidelines:
  1.  **Prioritize Quality:** Suggest resources from reputable sources like university websites (.edu), well-known educational platforms (Coursera, edX, Khan Academy), established technical blogs, and official documentation.
  2.  **Variety of Media:** Include a mix of resources, such as articles, video tutorials (especially from YouTube), and interactive demos if possible.
  3.  **Validate URLs:** Ensure all URLs you provide are valid, complete, and lead directly to the resource. Do not provide broken or placeholder links.
  4.  **Relevance:** The description for each resource should clearly explain how it relates to the specified syllabus section.

  Example of a good resource:
  {
    "title": "MIT OpenCourseWare - Introduction to Algorithms",
    "url": "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/",
    "description": "A full university course on algorithms, covering topics like data structures, sorting, and graph algorithms which are central to the provided syllabus section."
  }

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
    try {
      const {output} = await prompt(input);
      if (!output) {
        // If the model returns no output, return an empty list of resources.
        return { resources: [] };
      }
      return output;
    } catch (error) {
      console.error('Error in suggestResourcesFlow:', error);
      // In case of an error, return an empty list of resources to prevent crashing.
      return { resources: [] };
    }
  }
);
