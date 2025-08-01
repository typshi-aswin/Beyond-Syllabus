"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { chatWithSyllabus } from "@/ai/flows/chat-with-syllabus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define message type
interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

function ChatComponent() {
  const searchParams = useSearchParams();
  const moduleTitle = searchParams.get("title") || "Loading title...";
  const moduleContent = searchParams.get("content") || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (moduleContent && moduleTitle !== "Loading title...") {
      setMessages([
        {
          role: "system",
          content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
        },
      ]);
      setLoading(true);
      generateModuleTasks({ moduleContent })
        .then((result) => {
          setMessages((msgs) => [
            ...msgs,
            {
              role: "assistant",
              content: `📝 **Learning Tasks:**\n${result.tasks.map((t, i) => `${i + 1}. ${t}`).join("\n")}`,
            },
            {
              role: "assistant",
              content: `🌍 **Real-world Applications:**\n${result.realWorldApplications}`,
            },
          ]);
        })
        .catch(() => setError("Failed to generate initial tasks and applications."))
        .finally(() => setLoading(false));
    }
  }, [moduleContent, moduleTitle]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput("");
    setLoading(true);
    setError(null);
    
    try {
      const chatHistory = messages.filter(m => m.role !== 'system');
      const result = await chatWithSyllabus({ history: chatHistory, message: input });
      const assistantMessage: Message = { role: 'assistant', content: result.response };
      setMessages(msgs => [...msgs, assistantMessage]);

    } catch (e: any) {
      console.error("Error getting AI response:", e);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="w-full py-4 px-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-white">
          AI Chat for Module: <span className="text-primary">{moduleTitle}</span>
        </h1>
      </header>
      <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-2 sm:px-4 py-4">
        <div className="flex-1 overflow-y-auto pr-4 space-y-6">
          {messages.filter(m => m.role !== 'system').map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 text-base whitespace-pre-wrap shadow-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-white dark:bg-gray-800 text-foreground rounded-bl-none border border-gray-200 dark:border-gray-700"
                }`}
              >
                {msg.content}
              </div>
               {msg.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 text-muted-foreground bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-700">
                <Loader2 className="h-5 w-5 animate-spin" /> Thinking...
              </div>
            </div>
          )}
          {error && (
            <div className="text-center text-destructive py-4">{error}</div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="mt-4 sticky bottom-4">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2 w-full bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <input
              className="flex-1 bg-transparent border-none rounded-lg px-3 py-2 text-base text-foreground focus:outline-none focus:ring-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI about this module..."
              disabled={loading}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="rounded-lg"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <ChatComponent />
        </Suspense>
    )
}
