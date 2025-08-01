"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Sparkles } from "lucide-react";
import { chatWithSyllabus, ChatWithSyllabusInput, Message } from "@/ai/flows/chat-with-syllabus";
import { generateModuleTasks } from "@/ai/flows/generate-module-tasks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/common/Footer";

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
      const systemMessage: Message = {
        role: "system",
        content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
      };
      setMessages([systemMessage]);
      setLoading(true);
      generateModuleTasks({ moduleContent })
        .then((result) => {
          setMessages([
            systemMessage,
            {
              role: "assistant",
              content: `Hello! I can help you with **${moduleTitle}**. Here are some tasks and applications to get you started:\n\n📝 **Learning Tasks:**\n${result.tasks.map((t) => `• ${t}`).join("\n")}\n\n🌍 **Real-world Applications:**\n${result.realWorldApplications}`,
            },
          ]);
        })
        .catch(() => setError("Failed to generate initial tasks and applications."))
        .finally(() => setLoading(false));
    }
  }, [moduleContent, moduleTitle]);

  useEffect(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const currentMessages: Message[] = [...messages, userMessage];
    setMessages(currentMessages);
    setInput("");
    setLoading(true);
    setError(null);
    
    try {
      const chatHistory = currentMessages.filter((m): m is { role: 'user' | 'assistant', content: string } => m.role !== 'system');
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
    <div className="flex flex-col h-screen bg-background">
      <header className="w-full py-4 px-4 bg-card/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-10">
        <h1 className="text-lg md:text-xl font-bold text-center text-foreground">
          AI Chat: <span className="text-primary">{moduleTitle}</span>
        </h1>
      </header>
      <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-2 sm:px-4 py-4">
        <div className="flex-1 overflow-y-auto pr-4 space-y-6">
          <AnimatePresence>
            {messages.filter(m => m.role !== 'system').map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><Sparkles className="h-4 w-4 text-primary" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs md:max-w-lg rounded-2xl px-4 py-3 text-base whitespace-pre-wrap shadow-md ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card text-card-foreground rounded-bl-none border"
                  }`}
                >
                  {msg.content}
                </div>
                 {msg.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start items-center gap-3"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback><Sparkles className="h-4 w-4 text-primary" /></AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 text-muted-foreground bg-card rounded-2xl px-4 py-3 border shadow-md">
                <Loader2 className="h-5 w-5 animate-spin" /> Thinking...
              </div>
            </motion.div>
          )}
          {error && (
            <div className="text-center text-destructive py-4">{error}</div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="mt-4 sticky bottom-4">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2 w-full bg-card/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border"
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
              className="rounded-xl w-12 h-12"
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
