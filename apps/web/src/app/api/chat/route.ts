import { NextResponse } from "next/server";
import { chatWithSyllabus } from "@/ai/flows/chat-with-syllabus";
import { generateModuleTasks } from "@/ai/flows/generate-module-tasks";

export async function POST(req: Request) {
  try {
    const { model, messages, moduleTitle, moduleContent } = await req.json();

    // Case 1: No messages, but module info exists → bootstrap with module tasks
    if ((!messages || messages.length === 0) && moduleTitle && moduleContent) {
      const moduleTasks = await generateModuleTasks({ moduleTitle, moduleContent });

      const systemMessage = {
        role: "system" as const,
        content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
      };

      const assistantMessage = {
        role: "assistant" as const,
        content: moduleTasks.introductoryMessage,
      };

      return NextResponse.json({
        messages: [systemMessage, assistantMessage],
        suggestions: moduleTasks.suggestions ?? [],
      });
    }

    // Case 2: No messages at all (invalid request)
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        {
          messages: [],
          suggestions: [],
          error: "No messages provided. Please start the chat with module info.",
        },
        { status: 400 }
      );
    }

    // Case 3: Normal chat flow
    const input = {
      history: messages,
      message: messages[messages.length - 1].content,
      model,
    };

    const result = await chatWithSyllabus(input);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error in /api/chat:", err instanceof Error ? err.message : err);

    return NextResponse.json(
      {
        messages: [],
        suggestions: [
          "Try using a different AI model",
          "Rephrase your question",
          "Check your internet connection",
        ],
        error:
          "I'm having trouble processing your request. Try rephrasing your message or switching the model.",
      },
      { status: 500 }
    );
  }
}
