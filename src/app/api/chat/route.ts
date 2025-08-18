import { NextResponse } from "next/server";
import { chatWithSyllabus } from "@/ai/flows/chat-with-syllabus";
import { generateModuleTasks } from "@/ai/flows/generate-module-tasks";

export async function POST(req: Request) {
  try {
    const { model, messages, moduleTitle, moduleContent } = await req.json();

    // If no messages yet, generate initial module tasks
    if ((!messages || messages.length === 0) && moduleTitle && moduleContent) {
      const moduleTasks = await generateModuleTasks({ moduleTitle, moduleContent });

      const systemMessage = {
        role: "system",
        content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
      };

      const assistantMessage = {
        role: "assistant",
        content: moduleTasks.introductoryMessage,
      };

      return NextResponse.json({
        messages: [systemMessage, assistantMessage],
        suggestions: moduleTasks.suggestions,
      });
    }

    // Otherwise, handle normal chat
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { response: "No messages provided. Please start the chat.", suggestions: [] },
        { status: 400 }
      );
    }

    const input = {
      history: messages,
      message: messages[messages.length - 1].content,
      model,
    };

    const result = await chatWithSyllabus(input);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return NextResponse.json(
      {
        response:
          "I'm having trouble processing your request. Try rephrasing your message or changing the model.",
        suggestions: [
          "Try using a different AI model",
          "Rephrase your question",
          "Check your internet connection",
        ],
      },
      { status: 500 }
    );
  }
}
