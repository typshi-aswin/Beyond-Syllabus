"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import generateModuleTasks from "@/ai/flows/generate-module-tasks";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const moduleTitle = searchParams.get("title") || "";
  const moduleContent = searchParams.get("content") || "";

  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (moduleContent) {
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
        .catch(() => setError("Failed to generate tasks/applications."))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleContent]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", content: input }]);
    setLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          {
            role: "assistant",
            content: `AI: (This is a placeholder. Integrate with your chat API to answer: "${input}")`,
          },
        ]);
        setLoading(false);
      }, 1200);
    } catch (e) {
      setError("Failed to get AI response.");
      setLoading(false);
    }
    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="w-full py-4 px-4 bg-card shadow-md sticky top-0 z-10">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          AI Chat for Module: <span className="text-primary">{moduleTitle}</span>
        </h1>
      </header>
      <main className="flex-1 flex flex-col justify-end w-full max-w-2xl mx-auto px-2 sm:px-4 py-2">
        <div className="flex-1 overflow-y-auto mb-2">
          <div className="flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[90%] md:max-w-[70%] rounded-xl px-4 py-2 text-base whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "self-end bg-primary text-primary-foreground"
                    : msg.role === "assistant"
                    ? "self-start bg-muted text-foreground"
                    : "self-center text-xs text-muted-foreground"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="self-start flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> AI is thinking...
              </div>
            )}
            {error && (
              <div className="self-center text-destructive">{error}</div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2 w-full bg-card p-2 rounded-xl shadow-lg sticky bottom-0"
        >
          <input
            className="flex-1 border border-input rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI about this module..."
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded-lg text-base"
          >
            Send
          </Button>
        </form>
      </main>
    </div>
  );
}