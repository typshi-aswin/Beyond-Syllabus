"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { User, Sparkles, Copy, Check, Loader2, Send, Menu } from "lucide-react";
import { Message } from "@/ai/flows/chat-with-syllabus";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MobileChatPanelsProps {
  setMessages: (messages: Message[]) => void;
  setChatHistory: (
    history: { id?: string; title: string; messages: Message[] }[]
  ) => void;

  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
  error: string | null;
  suggestions: string[];
  copiedMessageIndex: number | null;
  chatHistory: { id?: string; title: string; messages: Message[] }[];
  quickQuestions: string[];
  activeTab: "ai" | "quick" | "history";
  setActiveTab: (tab: "ai" | "quick" | "history") => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
  moduleTitle: string;
  moduleContent: string;
  copyToClipboard: (text: string, messageIndex: number) => void;
  handleSuggestionClick: (text: string) => void;
  handleSend: () => void;
  handleNewTopic: () => void;
}

const MobileChatPanels: FC<MobileChatPanelsProps> = ({
  messages,
  input,
  setInput,
  loading,
  error,
  suggestions,
  copiedMessageIndex,
  chatHistory,
  quickQuestions,
  activeTab,
  setActiveTab,
  setMessages,
  setChatHistory,
  chatEndRef,
  moduleTitle,

  moduleContent,
  copyToClipboard,
  handleSuggestionClick,
  handleSend,
  handleNewTopic,
}) => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Tabs */}
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

      {/* AI Panel */}
      <div
        className={`md:hidden flex-1 h-[100vh] overflow-auto p-4 ${
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

      {/* Quick Questions Panel */}
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
                setActiveTab("ai");
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

      {/* Chat History Panel */}
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
          <div className="flex flex-col gap-2">
            {chatHistory.map((chat, idx) => (
              <div
                key={chat.id ?? `mobile-history-${Date.now()}-${idx}`}
                className="flex justify-between items-center border rounded p-2 shadow-sm"
              >
                <Button
                  variant="ghost"
                  className="truncate text-left flex-1"
                  onClick={() => {
                    setMessages(chat.messages);
                    setActiveTab("ai");
                  }}
                >
                  {chat.title}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => {
                    if (confirm("Delete this chat history?")) {
                      setChatHistory(chatHistory.filter((_, i) => i !== idx));
                    }
                  }}
                  aria-label={`Delete chat titled ${chat.title}`}
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileChatPanels;
