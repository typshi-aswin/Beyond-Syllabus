"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

import {
  Loader2,
  Send,
  Sparkles,
  User,
  PlusIcon,
  Copy,
  Check,
  Menu,
} from "lucide-react";

import { chatWithSyllabus, Message } from "@/ai/flows/chat-with-syllabus";
import { generateModuleTasks } from "@/ai/flows/generate-module-tasks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "@/components/common/Header";

export const ChatComponent = () => {
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

  const [chatHistory, setChatHistory] = useState<
    { title: string; messages: Message[] }[]
  >([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Why do I need to study this?",
    "What is the purpose of this module?",
    "How can I apply this in real life?",
  ];

  // Mobile tab state: "ai" | "quick" | "history"
  const [activeTab, setActiveTab] = useState<"ai" | "quick" | "history">("ai");

  // Scroll to bottom when messages update
  useEffect(() => {
    setTimeout(
      () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  }, [messages, loading]);

  // Generate initial module tasks
  useEffect(() => {
    if (!moduleContent || moduleTitle === "Loading title...") return;

    const systemMessage: Message = {
      role: "system",
      content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
    };

    setMessages([systemMessage]);
    setLoading(true);
    setError(null);

    generateModuleTasks({ moduleContent, moduleTitle })
      .then((result) => {
        setMessages([
          systemMessage,
          { role: "assistant", content: result.introductoryMessage },
        ]);
        setSuggestions(result.suggestions);
      })
      .catch(() =>
        setError("Failed to generate initial tasks and applications.")
      )
      .finally(() => setLoading(false));
  }, [moduleContent, moduleTitle]);

  // Copy assistant response to clipboard
  const copyToClipboard = async (text: string, messageIndex: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageIndex(messageIndex);
      setTimeout(() => setCopiedMessageIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    setTimeout(
      () => document.getElementById("chat-submit-button")?.click(),
      50
    );
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setSuggestions([]);
    setLoading(true);
    setError(null);

    try {
      const chatHistoryForApi = updatedMessages.filter(
        (m): m is { role: "user" | "assistant"; content: string } =>
          m.role !== "system"
      );

      const result = await chatWithSyllabus({
        history: chatHistoryForApi,
        message: input,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: result.response,
      };

      setMessages((msgs) => [...msgs, assistantMessage]);
      setSuggestions(result.suggestions || []);
    } catch (err) {
      console.error("Error getting AI response:", err);
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Save current chat to history & start new topic (keeps module system message)
  const handleNewTopic = () => {
    const firstUserMessage =
      messages.find((m) => m.role === "user")?.content || "";

    if (messages.length > 1) {
      setChatHistory((prev) => [
        ...prev,
        {
          title: `${moduleTitle}${
            firstUserMessage ? ` - ${firstUserMessage}` : ""
          }`,
          messages: messages.filter((m) => m.role !== "system"),
        },
      ]);
    }

    const systemMessage: Message = {
      role: "system",
      content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
    };

    setMessages([systemMessage]);
    setInput("");
    setSuggestions([]);
    setError(null);

    // On mobile, switch back to AI tab for the new topic
    setActiveTab("ai");
  };

  return (
    <div className="h-full mx-4 md:mx-10 my-6 md:my-10 bg-transparent">
      <Header />

      {/* Mobile Tabs (visible only on small screens) */}
      <div className="md:hidden mt-[10vh]">
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-2 text-center text-sm font-semibold ${
              activeTab === "ai"
                ? "bg-white/5 text-primary"
                : "text-white/70 bg-transparent"
            }`}
          >
            AI
          </button>
          <button
            onClick={() => setActiveTab("quick")}
            className={`flex-1 py-2 text-center text-sm font-semibold ${
              activeTab === "quick"
                ? "bg-white/5 text-primary"
                : "text-white/70 bg-transparent"
            }`}
          >
            Quick
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-2 text-center text-sm font-semibold ${
              activeTab === "history"
                ? "bg-white/5 text-primary"
                : "text-white/70 bg-transparent"
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Main layout: stacked on small screens, 3-column on md+ */}
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-10 mt-3 md:mt-[11vh] items-start justify-center h-[80vh]">
        {/* ---------- Left Column (Chat History) - desktop only */}
        <div className="hidden md:flex w-[20%] flex-col border-2 h-full border-white/20 p-3">
          <Button variant="outline" className="mb-4" onClick={handleNewTopic}>
            + New Topic
          </Button>
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Chat History</h3>
              <button
                className="text-xs text-primary hover:underline"
                onClick={handleNewTopic}
              >
                + New Topic
              </button>
            </div>

            {chatHistory.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No previous topics
              </p>
            ) : (
              chatHistory.map((chat, idx) => (
                <div
                  key={`history-${idx}`}
                  className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <div
                    className="flex-1"
                    onClick={() => {
                      setMessages([
                        {
                          role: "system",
                          content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
                        },
                        ...chat.messages,
                      ]);
                      // scroll to chat end once loaded
                      setTimeout(
                        () =>
                          chatEndRef.current?.scrollIntoView({
                            behavior: "smooth",
                          }),
                        120
                      );
                      // show AI column (desktop already visible)
                    }}
                  >
                    {chat.title}
                  </div>
                  <button
                    className="text-red-500 text-xs ml-2 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening chat when deleting
                      setChatHistory((prev) =>
                        prev.filter((_, i) => i !== idx)
                      );
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ---------- Chat Column (Desktop) */}
        <div className="hidden md:flex flex-col w-[60%] h-full overflow-y-auto pr-4 border-2 border-white/20 -mr-4 px-5 space-y-6 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
          <h1 className="text-lg pb-10 md:text-xl pt-5 font-bold text-center text-foreground truncate">
            AI Chat: <span className="text-primary">{moduleTitle}</span>
          </h1>

          <div className="flex-1 pr-4 -mr-4 space-y-6">
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
                      <div className="relative group max-w-md md:max-w-lg">
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
                            className="absolute -bottom-7 hover:bg-white/0 hover:text-green-600 transition-opacity bg-background h-8 w-8 p-0 z-10"
                            onClick={() => copyToClipboard(msg.content, idx)}
                            aria-label="Copy response"
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
                      <div className="flex items-center gap-2 text-muted-foreground bg-black/50 rounded-2xl px-4 py-3 border shadow-md">
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
                <div className="flex items-center gap-2 text-muted-foreground bg-black/50 rounded-2xl px-4 py-3 shadow-md">
                  <Loader2 className="h-5 w-5 animate-spin" /> Thinking...
                </div>
              </motion.div>
            )}

            {error && <div className="text-destructive py-4">{error}</div>}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions & Input */}
          {suggestions.length > 0 && !loading && (
            <div className="flex flex-wrap gap-2 mb-2 md:w-full">
              <p className="flex items-center gap-1 text-sm font-semibold">
                <Menu size={16} /> Related
              </p>
              {suggestions.map((s, i) => (
                <div
                  key={`suggestion-${i}`}
                  className="flex items-center justify-between w-full border-b-[0.8px]"
                >
                  <Button
                    className="w-[350px] md:w-full text-wrap flex bg-transparent hover:text-purple-600 hover:bg-transparent text-left md:h-[7vh] h-[10vh] text-[12px] md:text-[13px] text-black dark:text-white justify-start rounded"
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
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* ---------- Right Column (Features + Quick Questions) - desktop only */}
        <div className="hidden md:flex w-[20%] flex-col border-2 h-full border-white/20">
          {/* Feature Cards */}
          <div className="flex gap-3 p-3">
            {["Feature 1", "Feature 2", "Feature 3"].map((feature, i) => (
              <div
                key={`feature-${i}`}
                className="p-4 bg-black/10 border backdrop-blur-md rounded-xl shadow-lg w-[30%] h-[120px] flex gap-2"
              >
                <p className="text-sm font-semibold text-foreground">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="hidden md:flex flex-col gap-2 p-3 rounded-xl shadow-md w-fit h-fit z-40">
            <p className="text-sm font-semibold flex items-center gap-1">
              <Menu size={16} /> Quick Questions
            </p>
            {quickQuestions.map((q, i) => (
              <Button
                key={`quick-${i}`}
                variant="ghost"
                className="justify-start text-left border text-[13px] hover:text-purple-600"
                onClick={() => handleSuggestionClick(q)}
              >
                {q}
              </Button>
            ))}
          </div>
        </div>

        {/* ------------------ Mobile Panels (visible only on small screens) ------------------ */}
        {/* Mobile: Chat (AI) */}
        <div
          className={`md:hidden flex-1 h-[70vh] overflow-auto p-4 ${
            activeTab === "ai" ? "block" : "hidden"
          }`}
        >
          <div className="p-2">
            <h1 className="text-md pb-6 font-bold text-center text-foreground truncate">
              AI Chat: <span className="text-primary">{moduleTitle}</span>
            </h1>

            <div className="space-y-4">
              <AnimatePresence>
                {messages
                  .filter((m) => m.role !== "system")
                  .map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
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
                        <div className="relative group max-w-full">
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
                              className="absolute -bottom-7 hover:bg-white/0 hover:text-green-600 transition-opacity bg-background h-8 w-8 p-0 z-10"
                              onClick={() => copyToClipboard(msg.content, idx)}
                              aria-label="Copy response"
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
                        <div className="flex items-center gap-2 text-muted-foreground bg-black/50 rounded-2xl px-4 py-3 border shadow-md">
                          <Loader2 className="h-5 w-5 animate-spin" />{" "}
                          Thinking...
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
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-muted-foreground bg-black/50 rounded-2xl px-4 py-3 shadow-md">
                    <Loader2 className="h-5 w-5 animate-spin" /> Thinking...
                  </div>
                </div>
              )}

              {error && <div className="text-destructive py-4">{error}</div>}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && !loading && (
              <div className="flex flex-wrap gap-2 mt-4">
                <p className="flex items-center gap-1 text-sm font-semibold">
                  <Menu size={16} /> Related
                </p>
                {suggestions.map((s, i) => (
                  <div
                    key={`suggestion-mobile-${i}`}
                    className="w-full border-b-[0.8px]"
                  >
                    <Button
                      className="w-full text-wrap flex bg-transparent hover:text-purple-600 hover:bg-transparent text-left md:h-[7vh] h-[9vh] text-[13px] text-black dark:text-white justify-start rounded"
                      size="sm"
                      onClick={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="fixed bottom-4 left-4 right-4 md:hidden flex gap-2 w-auto p-2 rounded-[35px] shadow-lg border bg-background"
            >
              <input
                className="flex-1 bg-transparent border-none rounded-lg px-3 py-2 text-base text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-0 disabled:opacity-70 text-[.8rem]"
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
                id="chat-submit-button-mobile"
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                className="rounded-xl w-12 h-12 flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Mobile: Quick Questions panel */}
        <div
          className={`md:hidden h-[70vh] overflow-auto p-4 ${
            activeTab === "quick" ? "block" : "hidden"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Quick Questions</h3>
              <Button variant="outline" onClick={() => setActiveTab("ai")}>
                Open Chat
              </Button>
            </div>

            {quickQuestions.map((q, i) => (
              <Button
                key={`mobile-quick-${i}`}
                variant="ghost"
                className="justify-start text-left border w-full"
                onClick={() => {
                  handleSuggestionClick(q);
                  setActiveTab("ai"); // open chat when choosing quick question
                }}
              >
                {q}
              </Button>
            ))}

            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Features</h4>
              {["Feature 1", "Feature 2", "Feature 3"].map((feature, i) => (
                <div
                  key={`mobile-feature-${i}`}
                  className="p-4 bg-black/10 rounded-xl shadow-lg mb-2"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Chat History panel */}
        <div
          className={`md:hidden h-[70vh] overflow-auto p-4 ${
            activeTab === "history" ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Chat History</h3>
            <Button variant="outline" onClick={handleNewTopic}>
              + New Topic
            </Button>
          </div>

          {chatHistory.length === 0 ? (
            <p className="text-xs text-muted-foreground">No previous topics</p>
          ) : (
            chatHistory.map((chat, idx) => (
              <div
                key={`mobile-history-${idx}`}
                className="flex justify-between items-center cursor-pointer p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <div
                  className="flex-1"
                  onClick={() => {
                    setMessages([
                      {
                        role: "system",
                        content: `You are an expert assistant for the course module: ${moduleTitle}.\nModule Content:\n${moduleContent}`,
                      },
                      ...chat.messages,
                    ]);
                    setActiveTab("ai");
                    setTimeout(
                      () =>
                        chatEndRef.current?.scrollIntoView({
                          behavior: "smooth",
                        }),
                      120
                    );
                  }}
                >
                  {chat.title}
                </div>
                <button
                  className="text-red-500 text-xs ml-2 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setChatHistory((prev) => prev.filter((_, i) => i !== idx));
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
