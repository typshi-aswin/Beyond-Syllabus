"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Wand2, Send, BrainCircuit, User, Copy, Check, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import { generateModuleTasks, GenerateModuleTasksOutput } from "@/ai/flows/generate-module-tasks";
import { chatWithSyllabus, Message } from "@/ai/flows/chat-with-syllabus";
import { Header } from "@/components/common/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatHistorySidebar } from "@/components/common/ChatHistorySidebar";
import { 
  ChatSession, 
  createNewChatSession, 
  saveChatSession, 
  getChatSessionsList, 
  getChatSession,
  extractTitleFromMarkdown,
  deleteChatSession
} from "@/lib/chat-history";

export default function ChatWithFilePage() {
    const [markdown, setMarkdown] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAwaitingAi, setIsAwaitingAi] = useState(false);
    const [chatTitle, setChatTitle] = useState<string>("AI Assistant");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
    
    // New state for content/chat mode
    const [showChatInterface, setShowChatInterface] = useState(false);
    
    // History-related state
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    // Thinking animation states
    const [thinkingText, setThinkingText] = useState("AI is thinking");
    const thinkingTexts = [
        "AI is thinking",
        "Analyzing your content", 
        "Generating insights",
        "Crafting response",
        "Almost there"
    ];

    // Cycle through thinking texts
    useEffect(() => {
        if (loading || isAwaitingAi) {
            const interval = setInterval(() => {
                setThinkingText(prev => {
                    const currentIndex = thinkingTexts.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % thinkingTexts.length;
                    return thinkingTexts[nextIndex];
                });
            }, 2000); // Change text every 2 seconds
            
            return () => clearInterval(interval);
        }
    }, [loading, isAwaitingAi]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const copyToClipboard = async (text: string, messageIndex: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessageIndex(messageIndex);
            setTimeout(() => setCopiedMessageIndex(null), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    // Load chat sessions on component mount
    useEffect(() => {
        const sessions = getChatSessionsList();
        setChatSessions(sessions);
    }, []);

    // Auto-save current session
    useEffect(() => {
        if (currentSessionId && (messages.length > 0 || markdown.trim())) {
            const timeoutId = setTimeout(() => {
                saveCurrentSession();
            }, 1000);
            
            return () => clearTimeout(timeoutId);
        }
    }, [currentSessionId, messages, markdown, suggestions]);

    const saveCurrentSession = () => {
        if (!currentSessionId) return;
        
        const session: ChatSession = {
            id: currentSessionId,
            title: extractTitleFromMarkdown(markdown) || "Untitled Chat",
            createdAt: new Date(),
            lastModified: new Date(),
            markdown,
            messages,
            suggestions
        };
        
        const existingSession = getChatSession(currentSessionId);
        if (existingSession) {
            session.createdAt = existingSession.createdAt;
        }
        
        saveChatSession(session);
        
        const updatedSessions = getChatSessionsList();
        setChatSessions(updatedSessions);
    };

    const createNewChat = () => {
        // Check if current session is already empty/new - if so, don't create another
        if (currentSessionId && 
            !markdown.trim() && 
            messages.length === 0 && 
            suggestions.length === 0) {
            // Current session is already empty, don't create a new one
            return;
        }
        
        // Always save current session if it exists
        if (currentSessionId) {
            saveCurrentSession();
        }
        
        const newSession = createNewChatSession();
        setCurrentSessionId(newSession.id);
        
        // Reset all state
        setMarkdown("");
        setMessages([]);
        setInput("");
        setSuggestions([]);
        setError(null);
        setChatTitle("AI Assistant");
        setShowChatInterface(false); // Reset to content input mode
        
        // Update sessions list
        setChatSessions(prev => [newSession, ...prev]);
    };

    const editContent = () => {
        setShowChatInterface(false);
        setSidebarCollapsed(false); // Expand sidebar when editing content
    };

    const loadSession = (sessionId: string) => {
        // Check if current session is empty and should be deleted
        if (currentSessionId && currentSessionId !== sessionId) {
            const isCurrentSessionEmpty = !markdown.trim() && 
                                        messages.length === 0 && 
                                        suggestions.length === 0;
            
            if (isCurrentSessionEmpty) {
                // Delete the empty session instead of saving it
                setChatSessions(prev => prev.filter(s => s.id !== currentSessionId));
                // Also delete from localStorage
                deleteChatSession(currentSessionId);
            } else {
                // Save the session if it has content
                saveCurrentSession();
            }
        }
        
        const session = getChatSession(sessionId);
        if (!session) return;
        
        setCurrentSessionId(sessionId);
        setMarkdown(session.markdown);
        setMessages(session.messages);
        setSuggestions(session.suggestions);
        setChatTitle(session.title);
        setError(null);
        setInput("");
        
        // Show chat interface if session has content or messages
        const hasContent = Boolean(session.markdown.trim()) || session.messages.length > 0;
        setShowChatInterface(hasContent);
        
        // Minimize sidebar when loading a session with content
        if (hasContent) {
            setSidebarCollapsed(true);
        }
    };

    const deleteSession = (sessionId: string) => {
        setChatSessions(prev => prev.filter(s => s.id !== sessionId));
        
        // If deleting current session, handle it smartly
        if (currentSessionId === sessionId) {
            // Check if there are other sessions to switch to
            const remainingSessions = chatSessions.filter(s => s.id !== sessionId);
            
            if (remainingSessions.length > 0) {
                // Switch to the most recent session
                const mostRecentSession = remainingSessions[0];
                loadSession(mostRecentSession.id);
            } else {
                // No other sessions exist, reset to clean state without creating new session
                setCurrentSessionId(null);
                setMarkdown("");
                setMessages([]);
                setInput("");
                setSuggestions([]);
                setError(null);
                setChatTitle("AI Assistant");
                setShowChatInterface(false); // Return to content input mode
            }
        }
    };

    const handleGenerateTasks = async () => {
        if (!markdown.trim()) {
            setError("Please paste your syllabus content first.");
            return;
        }
        
        // Create new session if none exists
        if (!currentSessionId) {
            const newSession = createNewChatSession();
            setCurrentSessionId(newSession.id);
            setChatSessions(prev => [newSession, ...prev]);
        }
        
        setLoading(true);
        setError(null);
        setIsAwaitingAi(true);
        setMessages([]);
        setSuggestions([]);
        setShowChatInterface(true); // Show chat interface
        setSidebarCollapsed(true); // Minimize sidebar when starting chat

        // Extract title from markdown
        const extractedTitle = extractTitleFromMarkdown(markdown);
        setChatTitle(extractedTitle);

        try {
            const result = await generateModuleTasks({ 
                moduleContent: markdown, 
                moduleTitle: extractedTitle 
            });
            setMessages([
                {
                    role: "system",
                    content: `You are an expert assistant for the provided syllabus content.\n\n${markdown}`
                },
                {
                    role: "assistant",
                    content: result.introductoryMessage
                }
            ]);
            setSuggestions(result.suggestions);
        } catch (e: any) {
             setError("Failed to generate an introduction for the provided content. Please try again.");
        } finally {
            setLoading(false);
            setIsAwaitingAi(false);
        }
    };
    
    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
        setTimeout(() => {
          document.getElementById('chat-submit-button')?.click();
        }, 50);
    };

    const handleSend = async () => {
        if (!input.trim() || isAwaitingAi) return;
        
        // Ensure we have a session before sending
        if (!currentSessionId) {
            const newSession = createNewChatSession();
            setCurrentSessionId(newSession.id);
            setChatSessions(prev => [newSession, ...prev]);
        }
        
        setSuggestions([]);
        const userMessage: Message = { role: 'user', content: input };
        const currentMessages = [...messages, userMessage];
        setMessages(currentMessages);
        setInput("");
        setLoading(true);
        setIsAwaitingAi(true);
        setError(null);
        
        try {
            const chatHistory = currentMessages.filter((m): m is { role: 'user' | 'assistant', content: string } => m.role !== 'system');
            const result = await chatWithSyllabus({ history: chatHistory, message: input });
            const assistantMessage: Message = { role: 'assistant', content: result.response };
            setMessages(msgs => [...msgs, assistantMessage]);
            setSuggestions(result.suggestions || []);

        } catch (e) {
            console.error("Error getting AI response:", e);
            setError("Sorry, something went wrong. Please try again.");
        } finally {
            setLoading(false);
            setIsAwaitingAi(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-muted/30 dark:bg-background">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <ChatHistorySidebar
                    sessions={chatSessions}
                    currentSessionId={currentSessionId}
                    onSessionSelect={loadSession}
                    onNewChat={createNewChat}
                    onDeleteSession={deleteSession}
                    isCollapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
                
                <main className="flex-1 overflow-hidden">
                    {!showChatInterface ? (
                        // Content Input Mode
                        <div className="container mx-auto px-4 py-8 h-full flex flex-col justify-center max-w-7xl">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-center mb-10"
                            >
                                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Chat with Any Syllabus</h1>
                                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                                    Paste any syllabus or educational content below. Our AI will help you understand it, generate learning tasks, and answer your questions.
                                </p>
                            </motion.div>

                            <Card className="w-full max-w-6xl mx-auto shadow-lg rounded-2xl bg-card/80 backdrop-blur-sm border">
                                <CardContent className="p-8 space-y-6">
                                    <h2 className="text-2xl font-semibold text-center">Enter Your Content</h2>
                                    <Textarea
                                        placeholder="Paste your syllabus markdown here..."
                                        value={markdown}
                                        onChange={(e) => setMarkdown(e.target.value)}
                                        className="min-h-[500px] w-full text-base rounded-xl focus-visible:ring-primary bg-background/70 resize-none"
                                        disabled={isAwaitingAi}
                                    />
                                    <Button 
                                        onClick={handleGenerateTasks} 
                                        disabled={loading || !markdown.trim()} 
                                        className="w-full text-lg py-6 group"
                                        size="lg"
                                    >
                                        {isAwaitingAi && loading ? (
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        ) : (
                                            <Wand2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                                        )}
                                        Generate Insights & Start Chat
                                    </Button>
                                    {error && (
                                        <Alert variant="destructive">
                                            <BrainCircuit className="h-4 w-4" />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        // Chat Interface Mode
                        <div className="container mx-auto px-4 py-8 h-full">
                            <div className="flex justify-between items-center mb-6">
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex-1"
                                >
                                    <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent truncate">
                                        {chatTitle}
                                    </h1>
                                    <p className="text-muted-foreground text-sm">
                                        Chat with your syllabus content
                                    </p>
                                </motion.div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={editContent}
                                    className="flex items-center gap-2"
                                >
                                    <Edit3 className="h-4 w-4" />
                                    Edit Content
                                </Button>
                            </div>

                            <Card className="shadow-lg rounded-2xl bg-card/80 backdrop-blur-sm border h-[calc(100vh-14rem)]">
                                <CardContent className="flex flex-col overflow-hidden p-4 h-full">
                                   <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                                    {messages.filter(m => m.role !== 'system').length === 0 && !loading && (
                                         <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-500/30">
                                             <Sparkles className="h-4 w-4 text-primary" />
                                             <AlertTitle>Ready to Assist!</AlertTitle>
                                             <AlertDescription>
                                                 Your AI study assistant will appear here once you generate insights.
                                             </AlertDescription>
                                         </Alert>
                                    )}
                                     {error && (
                                        <Alert variant="destructive">
                                            <BrainCircuit className="h-4 w-4" />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>
                                                {error}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                    {messages.filter(m => m.role !== 'system').map((msg, idx) => (
                                         <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex items-start gap-3 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                          {msg.role === 'assistant' && (
                                            <Avatar className="w-8 h-8 border">
                                                <AvatarFallback className="bg-primary/10"><Sparkles className="h-4 w-4 text-primary" /></AvatarFallback>
                                            </Avatar>
                                          )}
                                          <div className="relative group max-w-md md:max-w-lg">
                                              <div
                                                className={`rounded-2xl px-4 py-3 text-base shadow-md prose prose-sm dark:prose-invert prose-headings:font-semibold prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 ${msg.role === 'user'
                                                        ? 'bg-primary text-primary-foreground rounded-br-none'
                                                        : 'bg-card text-card-foreground rounded-bl-none border'
                                                    }`}
                                              >
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                              </div>
                                              {msg.role === 'assistant' && (
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
                                          {msg.role === 'user' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback><User className="h-4 w-4"/></AvatarFallback>
                                            </Avatar>
                                          )}
                                        </motion.div>
                                    ))}
                                    {(loading || isAwaitingAi) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex justify-start items-center gap-3"
                                        >
                                            <Avatar className="w-8 h-8 border">
                                                <AvatarFallback className="bg-primary/10">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Sparkles className="h-4 w-4 text-primary" />
                                                    </motion.div>
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="bg-card rounded-2xl px-4 py-3 shadow-md border">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.1, 1] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                    >
                                                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                                    </motion.div>
                                                    <motion.span
                                                        key={thinkingText}
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -5 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-sm font-medium"
                                                    >
                                                        {thinkingText}
                                                    </motion.span>
                                                    <motion.div
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                                                        className="flex gap-0.5"
                                                    >
                                                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                                                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                                                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={chatEndRef} />
                                   </div>
                                    {suggestions.length > 0 && !loading && (
                                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                        {suggestions.map((s, i) => (
                                        <Button key={i} variant="outline" size="sm" onClick={() => handleSuggestionClick(s)}>
                                            {s}
                                        </Button>
                                        ))}
                                    </div>
                                    )}
                                    <div className="border-t bg-card/40 pt-4">
                                        <form
                                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                            className="flex gap-2"
                                        >
                                            <input
                                                id="chat-input-field"
                                                className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="Ask about your syllabus..."
                                                disabled={loading || messages.length === 0}
                                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                                            />
                                            <Button id="chat-submit-button" type="submit" size="icon" disabled={loading || !input.trim()}>
                                                <Send className="h-5 w-5" />
                                            </Button>
                                        </form>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
