// src/ai/flows/generate-mindmap.ts
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/**
 * @fileOverview AI agent that converts syllabus Markdown into a mind map structure
 * ready to be rendered with React Flow.
 *
 * - generateMindMap - Generates nodes and edges from syllabus text.
 * - MindMapInput - The input type for the generateMindMap function.
 * - MindMapOutput - The return type for the generateMindMap function.
 */

// Input: syllabus as Markdown
const MindMapInputSchema = z.object({
  syllabus: z
    .string()
    .describe('The complete syllabus in Markdown format.'),
});

export type MindMapInput = z.infer<typeof MindMapInputSchema>;

// Output: React Flow nodes + edges
const MindMapOutputSchema = z.object({
  nodes: z.array(z.object({
    id: z.string().describe("Unique node ID"),
    label: z.string().describe("Text label for the node"),
    parentId: z.string().optional().describe("Parent node ID for hierarchy"),
  })),
  edges: z.array(z.object({
    id: z.string().describe("Unique edge ID"),
    source: z.string().describe("Source node ID"),
    target: z.string().describe("Target node ID"),
  }))
});

export type MindMapOutput = z.infer<typeof MindMapOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateMindMapPrompt',
  input: { schema: MindMapInputSchema },
  output: { schema: MindMapOutputSchema },
  prompt: `
You are a syllabus-to-mind-map converter.
Convert the given syllabus into a hierarchical mind map structure.

Rules:
1. Each major heading becomes a top-level node.
2. Subheadings and bullet points become child nodes linked to their parent.
3. Use short, clear labels for nodes (max 50 characters).
4. Return only valid JSON that matches the schema below.

JSON Schema:
{
  "nodes": [
    { "id": "1", "label": "Root Node" },
    { "id": "2", "label": "Child Node", "parentId": "1" }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2" }
  ]
}

Syllabus:
"""{{{syllabus}}}"""
`
});

const generateMindMapFlow = ai.defineFlow(
  {
    name: 'generateMindMap',
    inputSchema: MindMapInputSchema,
    outputSchema: MindMapOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);

      if (!output) {
        throw new Error("AI did not return any output.");
      }

      return output;
    } catch (e) {
      console.error("Error generating mind map:", e);
      // Fallback: simple placeholder mind map
      return {
        nodes: [
          { id: "1", label: "Mind Map Generation Failed" },
          { id: "2", label: "Please try again later", parentId: "1" }
        ],
        edges: [
          { id: "e1-2", source: "1", target: "2" }
        ]
      };
    }
  }
);

export async function generateMindMap(input: MindMapInput): Promise<MindMapOutput> {
  return generateMindMapFlow(input);
}
