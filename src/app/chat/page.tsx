"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@/components/ui/button";

import {
  Loader2,
  Send,
  Sparkles,
  User,
  BrainCircuit,
  PlusIcon,
  Copy,
  Check,
  MoreHorizontalIcon,
  MoreVertical,
  MoreVerticalIcon,
  ThermometerIcon,
  MenuIcon,
  Menu,
  Brain,
  X,
} from "lucide-react";
import { chatWithSyllabus, Message } from "@/ai/flows/chat-with-syllabus";
import { generateModuleTasks } from "@/ai/flows/generate-module-tasks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/common/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "@/components/common/Header";

function ChatComponent() {
  const searchParams = useSearchParams();
  const moduleTitle = searchParams.get("title") || "Loading title...";
  const moduleContent = searchParams.get("content") || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(
    null
  );

  const chatEndRef = useRef<HTMLDivElement>(null);
  const copyToClipboard = async (text: string, messageIndex: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageIndex(messageIndex);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopiedMessageIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    if (moduleContent && moduleTitle !== "Loading title...") {
      const systemMessage: Message = {
        role: "system",
        content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
      };
      setMessages([systemMessage, { role: "assistant", content: "" }]); // Add placeholder for AI loading
      setLoading(true);
      generateModuleTasks({ moduleContent, moduleTitle })
        .then((result) => {
          setMessages([
            systemMessage,
            {
              role: "assistant",
              content: result.introductoryMessage,
            },
          ]);
          setSuggestions(result.suggestions);
        })
        .catch(() =>
          setError("Failed to generate initial tasks and applications.")
        )
        .finally(() => setLoading(false));
    }
  }, [moduleContent, moduleTitle]);

  useEffect(() => {
    setTimeout(
      () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  }, [messages, loading]);

  const [quickQuestions, setQuickQuestions] = useState<string[]>([
    "Why do I need to study this?",
    "What is the purpose of this module?",
    "How can I apply this in real life?",
  ]);
  const [showQuickPanel, setShowQuickPanel] = useState(true);
  const handleSuggestionClick = (
    suggestion: string,
    isQuickQuestion = false
  ) => {
    setInput(suggestion);
    // We need a small delay to allow the state to update before sending
    setTimeout(() => {
      document.getElementById("chat-submit-button")?.click();
    }, 50);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setSuggestions([]); // Clear suggestions on new message
    const userMessage: Message = { role: "user", content: input };
    const currentMessages: Message[] = [...messages, userMessage];
    setMessages(currentMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const chatHistory = currentMessages.filter(
        (m): m is { role: "user" | "assistant"; content: string } =>
          m.role !== "system"
      );
      const result = await chatWithSyllabus({
        history: chatHistory,
        message: input,
      });
      const assistantMessage: Message = {
        role: "assistant",
        content: result.response,
      };
      setMessages((msgs) => [...msgs, assistantMessage]);
      setSuggestions(result.suggestions || []);
    } catch (e: any) {
      console.error("Error getting AI response:", e);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      <Header />

      <main className=" mt-[11vh] flex-1 flex flex-col w-full max-w-4xl mx-auto px-2 sm:px-4 py-4">
        <h1 className="text-lg pb-10 md:text-xl font-bold text-center text-foreground truncate">
          AI Chat: <span className="text-primary">{moduleTitle}</span>
        </h1>
        <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-6">
          <AnimatePresence>
            {messages
              .filter((m) => m.role !== "system")
              .map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 w-full ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback className="bg-primary/10">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {msg.content ? (
                    <div className="relative group max-w-md md:max-w-lg ">
                      <div
                        className={`rounded-2xl px-4 py-3 text-base shadow-md prose prose-sm dark:prose-invert prose-headings:font-semibold prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "text-card-foreground rounded-bl-none border"
                        }`}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                      {msg.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -bottom-2 -right-2 opacity-30 group-hover:opacity-100 hover:opacity-100 transition-opacity bg-background hover:bg-accent border shadow-sm h-8 w-8 p-0 z-10"
                          onClick={() => copyToClipboard(msg.content, idx)}
                          title="Copy response"
                        >
                          {copiedMessageIndex === idx ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground bg-white dark:bg-black/50 rounded-2xl px-4 py-3 border shadow-md">
                      <Loader2 className="h-5 w-5 animate-spin" /> Thinking...
                    </div>
                  )}
                  {msg.role === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
          </AnimatePresence>
          {loading && messages[messages.length - 1]?.role === "user" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start items-center gap-3"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2 text-muted-foreground bg-black/50 rounded-2xl px-4 py-3  shadow-md">
                <Loader2 className="h-5 w-5 animate-spin" /> Thinking...
              </div>
            </motion.div>
          )}
          {error && <div className=" text-destructive py-4">{error}</div>}
          <div ref={chatEndRef} />
        </div>
        {/* Toggle Button (Hamburger) */}
        <div className="hidden md:block fixed right-4 top-24 z-50">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full shadow-md"
            onClick={() => setShowQuickPanel((prev) => !prev)}
          >
            {showQuickPanel ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        {/* Animated Quick Questions Panel */}
        <AnimatePresence>
          {showQuickPanel && quickQuestions.length > 0 && (
            <motion.div
              key="quick-questions-panel"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden md:flex flex-col gap-2 fixed right-4 top-36 p-3 bg-background border rounded-xl shadow-md w-fit z-40"
            >
              <p className="text-sm font-semibold flex items-center gap-1">
                <Menu size={16} /> Quick Questions
              </p>
              {quickQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="justify-start text-left text-[13px] hover:text-purple-600"
                  onClick={() => handleSuggestionClick(q, true)}
                >
                  {q}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 md:w-full">
          {suggestions.length > 0 && !loading && (
            <div className="flex flex-wrap gap-2   mb-2 md:w-full">
              <p className="flex">
                <Menu />
                Related
              </p>
              {suggestions.map((s, i) => (
                <div className="flex items-center justify-between w-full  border-b-[.8px] ">
                  <Button
                    key={i}
                    className="w-[350px] md:w-full text-wrap flex bg-transparent   hover:text-purple-600 hover:bg-transparent text-left md:h-[7vh] h-[10vh] text-[12px] md:text-[13px] text-black dark:text-white justify-start rounded"
                    size="sm"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </Button>
                  <PlusIcon size={20} className="text-purple-500" />
                </div>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2 w-full p-2 rounded-[35px] shadow-lg border"
          >
            <input
              className="flex-1 bg-transparent border-none rounded-lg px-3 py-2 text-base text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-0 disabled:opacity-70 text-[.7rem]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI about this module..."
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              id="chat-submit-button"
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="rounded-xl w-12 h-12 flex-shrink-0"
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
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-background text-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
          Loading Chat...
        </div>
      }
    >
      <ChatComponent />
    </Suspense>
  );
}
