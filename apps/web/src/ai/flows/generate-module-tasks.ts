"use server";

import { ai } from "@/ai/ai";

/**
 * @fileOverview An AI agent that generates learning tasks and real-world applications for a given module content.
 */

export interface GenerateModuleTasksInput {
  moduleContent: string;
  moduleTitle: string;
  model?: string;
}

export interface GenerateModuleTasksOutput {
  introductoryMessage: string;
  suggestions: string[];
}

// ---------------------- Flow Logic ----------------------
const generateModuleTasksFlow = async (
  input: GenerateModuleTasksInput
): Promise<GenerateModuleTasksOutput> => {
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
      messages: [{ role: "user", content: promptText }],
      model: input.model || "openai/gpt-oss-20b",
      temperature: 0.6,
      max_completion_tokens: 2048,
      top_p: 0.95,
    });

    let outputText = chatCompletion.choices?.[0]?.message?.content || "";

    // === Sanitize AI output: remove ```json or ``` wrappers ===
    outputText = outputText
      .trim()
      .replace(/^```json\s*/, "")
      .replace(/^```/, "")
      .replace(/```$/, "");

    const output = JSON.parse(outputText);
    return output as GenerateModuleTasksOutput;
  } catch (e) {
    console.error(
      `Error generating tasks for module "${input.moduleTitle}":`,
      e
    );

    return {
      introductoryMessage: `Hello! I ran into some issues generating the introduction for "${input.moduleTitle}". You can try again or change the AI model if needed.`,
      suggestions: [
        `Try using a different AI model for "${input.moduleTitle}"`,
        `Rephrase your module content and try again`,
        `What are the key topics in "${input.moduleTitle}"?`,
        "Can you provide a brief overview of this module?",
      ],
    };
  }
};

export async function generateModuleTasks(
  input: GenerateModuleTasksInput
): Promise<GenerateModuleTasksOutput> {
  return generateModuleTasksFlow(input);
}
