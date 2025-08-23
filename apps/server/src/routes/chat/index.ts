import { publicProcedure } from "@/lib/orpc";
import {
  chatWithSyllabus,
  ChatWithSyllabusInputSchema,
  ChatWithSyllabusOutputSchema,
  type ChatWithSyllabusInput,
  type ChatWithSyllabusOutput,
} from "@/routes/chat/modules/chat-with-syllabus";
import {
  generateModuleTasks,
  GenerateModuleTasksInputSchema,
  GenerateModuleTasksOutputSchema,
  type GenerateModuleTasksInput,
  type GenerateModuleTasksOutput,
} from "@/routes/chat/modules/generate-module-tasks";
import {
  summarizeSyllabus,
  SummarizeSyllabusInputSchema,
  SummarizeSyllabusOutputSchema,
  type SummarizeSyllabusInput,
  type SummarizeSyllabusOutput,
} from "@/routes/chat/modules/summarize-syllabus";

export const chatRoutes = {
  chatWithSyllabus: publicProcedure
    .input(ChatWithSyllabusInputSchema)
    .output(ChatWithSyllabusOutputSchema)
    .handler(async ({ input }) => {
      try {
        return await chatWithSyllabus(input);
      } catch (error) {
        console.error("Error in chatWithSyllabus route:", error);
        return {
          response:
            "I'm having trouble processing your request. Please try again.",
          suggestions: [
            "Can you rephrase your question?",
            "What specific topic would you like to learn about?",
          ],
        };
      }
    }),

  generateModuleTasks: publicProcedure
    .input(GenerateModuleTasksInputSchema)
    .output(GenerateModuleTasksOutputSchema)
    .handler(async ({ input }) => {
      try {
        return await generateModuleTasks(input);
      } catch (error) {
        console.error("Error in generateModuleTasks route:", error);
        return {
          introductoryMessage:
            "I encountered an issue generating the module introduction. Please try again with your syllabus content.",
          suggestions: [
            `What are the key topics in "${input.moduleTitle}"?`,
            "Can you give me an overview?",
            "What are the real-world applications?",
          ],
        };
      }
    }),

  summarizeSyllabus: publicProcedure
    .input(SummarizeSyllabusInputSchema)
    .output(SummarizeSyllabusOutputSchema)
    .handler(async ({ input }) => {
      try {
        return await summarizeSyllabus(input);
      } catch (error) {
        console.error("Error in summarizeSyllabus route:", error);
        return {
          summary:
            "I encountered an error while summarizing the syllabus. Please try again with the syllabus content.",
        };
      }
    }),
};

export { chatWithSyllabus, generateModuleTasks, summarizeSyllabus };

export type {
  ChatWithSyllabusInput,
  ChatWithSyllabusOutput,
  GenerateModuleTasksInput,
  GenerateModuleTasksOutput,
  SummarizeSyllabusInput,
  SummarizeSyllabusOutput,
};
