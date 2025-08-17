import { NextResponse } from "next/server";
import { chatWithSyllabus } from "@/ai/flows/chat-with-syllabus"; // ✅ import your flow

export async function POST(req: Request) {
  try {
    const { model, messages } = await req.json();

    // Convert messages into the flow input shape
    const input = {
      history: messages, // already [{ role, content }]
      message: messages[messages.length - 1].content, // latest user message
      model, // pass through selected model
    };

    // Call your syllabus-aware flow
    const result = await chatWithSyllabus(input);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return NextResponse.json(
      { response: "Error occurred", suggestions: [] },
      { status: 500 }
    );
  }
}
