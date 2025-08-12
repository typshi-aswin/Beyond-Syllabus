"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Wand2, Send, BrainCircuit, User, Copy, Check, Edit3, Menu, Plus as PlusIcon, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);
    const latestMessageRef = useRef<HTMLDivElement>(null);

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
        // Scroll to the latest message (beginning of the last message)
        if (messages.length > 0 && !loading) {
            // Small delay to ensure the message is rendered
            setTimeout(() => {
                latestMessageRef.current?.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "start",  // Show the top of the element
                    inline: "nearest" 
                });
            }, 100);
        } else if (loading) {
            // While loading, scroll to the loading indicator
            setTimeout(() => {
                chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages, loading]);

    // Auto-resize textarea when markdown changes
    useEffect(() => {
        resizeTextarea();
    }, [markdown]);

    // Additional effect to handle textarea resize when switching to content input mode
    useEffect(() => {
        if (!showChatInterface && markdown.trim()) {
            // Small delay to ensure the textarea is rendered and visible
            const timer = setTimeout(() => {
                resizeTextarea();
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [showChatInterface]);

    // Auto-focus chat input when switching to chat interface
    useEffect(() => {
        if (showChatInterface && chatInputRef.current && !loading) {
            const timer = setTimeout(() => {
                chatInputRef.current?.focus();
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [showChatInterface, loading]);

    // Auto-focus chat input after sending a message
    useEffect(() => {
        if (showChatInterface && chatInputRef.current && !loading && !isAwaitingAi) {
            const timer = setTimeout(() => {
                chatInputRef.current?.focus();
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [messages, loading, isAwaitingAi, showChatInterface]);

    // Auto-focus chat input when loading session with content
    useEffect(() => {
        if (showChatInterface && chatInputRef.current && messages.length > 0) {
            const timer = setTimeout(() => {
                chatInputRef.current?.focus();
            }, 200);
            
            return () => clearTimeout(timer);
        }
    }, [currentSessionId, showChatInterface]);

    const copyToClipboard = async (text: string, messageIndex: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessageIndex(messageIndex);
            setTimeout(() => setCopiedMessageIndex(null), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    // Helper function to resize textarea
    const resizeTextarea = () => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 240) + 'px';
            
            // Enable/disable scrolling based on content height
            if (textarea.scrollHeight > 240) {
                textarea.style.overflowY = 'auto';
            } else {
                textarea.style.overflowY = 'hidden';
            }
        }
    };

    // Load chat sessions on component mount
    useEffect(() => {
        const sessions = getChatSessionsList();
        setChatSessions(sessions);
    }, []);

    // Auto-save current session - only save if chat interface is shown (content has been submitted)
    useEffect(() => {
        if (currentSessionId && showChatInterface && (messages.length > 0 || markdown.trim())) {
            const timeoutId = setTimeout(() => {
                saveCurrentSession();
            }, 1000);
            
            return () => clearTimeout(timeoutId);
        }
    }, [currentSessionId, messages, markdown, suggestions, showChatInterface]);

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
            suggestions.length === 0 &&
            !showChatInterface) {
            // Current session is already empty and unused, don't create a new one
            return;
        }
        
        // Only save current session if it has been actually used (chat interface was shown)
        if (currentSessionId && showChatInterface) {
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
        
        // Close mobile sidebar when creating new chat
        setMobileSidebarOpen(false);
        
        // Don't add to sessions list until actually used
    };

    const editContent = () => {
        setShowChatInterface(false);
        setSidebarCollapsed(false); // Expand sidebar when editing content
        
        // Trigger textarea resize after a short delay to ensure it's rendered
        setTimeout(() => {
            resizeTextarea();
        }, 150);
    };

    const editSessionContent = (sessionId: string) => {
        // Load the session and switch to edit mode
        loadSession(sessionId);
        setShowChatInterface(false); // Switch to content input mode
        setSidebarCollapsed(false); // Expand sidebar
    };

    const editSessionTitle = (sessionId: string, newTitle: string) => {
        // Update the session title
        const session = getChatSession(sessionId);
        if (session) {
            const updatedSession = { ...session, title: newTitle, lastModified: new Date() };
            saveChatSession(updatedSession);
            
            // Update local state
            setChatSessions(prev => prev.map(s => s.id === sessionId ? updatedSession : s));
            
            // Update current chat title if this is the active session
            if (currentSessionId === sessionId) {
                setChatTitle(newTitle);
            }
        }
    };

    const loadSession = (sessionId: string) => {
        // Check if current session is empty and should be deleted
        if (currentSessionId && currentSessionId !== sessionId) {
            const isCurrentSessionEmpty = !markdown.trim() && 
                                        messages.length === 0 && 
                                        suggestions.length === 0;
            
            if (isCurrentSessionEmpty || !showChatInterface) {
                // Delete the empty/unused session instead of saving it
                setChatSessions(prev => prev.filter(s => s.id !== currentSessionId));
                // Also delete from localStorage
                deleteChatSession(currentSessionId);
            } else {
                // Save the session only if it has been used (chat interface was shown)
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
        } else {
            // If session exists but not in list, add it (for cases where new chat was created but not used until now)
            const sessionExists = chatSessions.some(s => s.id === currentSessionId);
            if (!sessionExists) {
                const currentSession = getChatSession(currentSessionId);
                if (currentSession) {
                    setChatSessions(prev => [currentSession, ...prev]);
                }
            }
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
        <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#181824] dark:to-[#232946] overflow-hidden">
            <Header />
            <div className="flex flex-1 overflow-hidden relative">
                {/* Desktop Sidebar */}
                <div className="hidden md:block">
                    <ChatHistorySidebar
                        sessions={chatSessions}
                        currentSessionId={currentSessionId}
                        onSessionSelect={loadSession}
                        onNewChat={createNewChat}
                        onDeleteSession={deleteSession}
                        onEditTitle={editSessionTitle}
                        isCollapsed={sidebarCollapsed}
                        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                    />
                </div>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {mobileSidebarOpen && (
                        <div className="md:hidden fixed inset-0 z-50 flex">
                            {/* Backdrop */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
                                onClick={() => setMobileSidebarOpen(false)}
                            />
                            {/* Sidebar */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="relative w-80 max-w-[85vw]"
                            >
                                <ChatHistorySidebar
                                    sessions={chatSessions}
                                    currentSessionId={currentSessionId}
                                    onSessionSelect={(sessionId) => {
                                        loadSession(sessionId);
                                        setMobileSidebarOpen(false);
                                    }}
                                    onNewChat={() => {
                                        createNewChat();
                                        setMobileSidebarOpen(false);
                                    }}
                                    onDeleteSession={deleteSession}
                                    onEditTitle={editSessionTitle}
                                    isCollapsed={false}
                                    onToggleCollapse={() => setMobileSidebarOpen(false)}
                                />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <main className="flex-1 overflow-hidden flex flex-col items-center justify-center">
                    {!showChatInterface ? (
                        // Content Input Mode (ChatGPT style)
                        <div className="flex flex-col items-center justify-center w-full h-full py-16 px-4 relative">
                            {/* Mobile History Button - Top Right */}
                            {chatSessions.length > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setMobileSidebarOpen(true)}
                                    className="md:hidden absolute top-4 right-4 z-10 flex items-center gap-2"
                                >
                                    <History className="h-4 w-4" />
                                    <span className="text-xs">History</span>
                                </Button>
                            )}
                            
                            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Introducing BeyondSyllabus</h1>
                            <p className="text-lg md:text-xl text-center text-muted-foreground mb-10 max-w-2xl">
                                Paste any syllabus or educational content below. Our AI will help you understand it, generate learning tasks, and answer your questions.
                            </p>
                            <div className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-background/80 backdrop-blur-lg border border-border flex items-start p-6">
                                <form onSubmit={e => { e.preventDefault(); handleGenerateTasks(); }} className="w-full flex items-start gap-4">
                                    <div className="flex-1">
                                        <textarea
                                            ref={textareaRef}
                                            placeholder="Paste your syllabus or markdown here..."
                                            value={markdown}
                                            onChange={e => setMarkdown(e.target.value)}
                                            className="w-full text-lg px-4 py-3 bg-transparent border-none focus:outline-none placeholder:text-muted-foreground resize-none"
                                            disabled={isAwaitingAi}
                                            autoFocus
                                            rows={1}
                                            style={{
                                                minHeight: '48px',
                                                maxHeight: '240px',
                                                height: 'auto',
                                                overflowY: 'hidden',
                                                scrollbarWidth: 'thin',
                                                scrollbarColor: 'hsl(var(--muted-foreground) / 0.2) transparent'
                                            }}
                                        />
                                        <style jsx>{`
                                          textarea::-webkit-scrollbar {
                                            width: 6px;
                                          }
                                          textarea::-webkit-scrollbar-track {
                                            background: transparent;
                                          }
                                          textarea::-webkit-scrollbar-thumb {
                                            background-color: hsl(var(--muted-foreground) / 0.2);
                                            border-radius: 3px;
                                          }
                                          textarea::-webkit-scrollbar-thumb:hover {
                                            background-color: hsl(var(--muted-foreground) / 0.4);
                                          }
                                        `}</style>
                                    </div>
                                    {markdown.trim() && (
                                        <Button
                                            type="submit"
                                            disabled={loading || !markdown.trim()}
                                            className="p-2 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md hover:scale-105 transition-transform flex-shrink-0 mt-1"
                                            size="sm"
                                        >
                                            {isAwaitingAi && loading ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <Send className="h-5 w-5" />
                                            )}
                                        </Button>
                                    )}
                                </form>
                            </div>
                            {error && (
                                <Alert variant="destructive" className="mt-4 max-w-3xl mx-auto">
                                    <BrainCircuit className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    ) : (
                        // Chat Interface Mode
                        <div className="w-full h-full flex flex-col px-4 py-4 md:container md:mx-auto">
                            <div className="flex justify-between items-center mb-4">
                                {/* Mobile Menu Button */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setMobileSidebarOpen(true)}
                                    className="md:hidden flex items-center gap-2 mr-2 flex-shrink-0"
                                >
                                    <Menu className="h-4 w-4" />
                                </Button>
                                
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex-1 min-w-0"
                                >
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent truncate">
                                        {chatTitle}
                                    </h1>
                                    <p className="text-muted-foreground text-xs md:text-sm">
                                        Chat with your syllabus content
                                    </p>
                                </motion.div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={editContent}
                                    className="hidden sm:flex items-center gap-2 flex-shrink-0"
                                >
                                    <Edit3 className="h-4 w-4" />
                                    <span className="hidden md:inline">Edit Content</span>
                                </Button>
                                {/* Mobile Edit Button */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={editContent}
                                    className="sm:hidden flex-shrink-0"
                                >
                                    <Edit3 className="h-4 w-4" />
                                </Button>
                            </div>

                            <Card className="shadow-lg rounded-2xl bg-card/80 backdrop-blur-sm border flex-1 flex flex-col min-h-0">
                                <CardContent className="flex flex-col p-3 md:p-4 h-full">
                                    {/* Scrollable Messages and Suggestions Container */}
                                    <div className="flex-1 overflow-y-auto scroll-smooth pr-1 md:pr-2"
                                         style={{ 
                                           scrollbarWidth: 'thin',
                                           scrollbarColor: 'hsl(var(--muted-foreground) / 0.2) transparent'
                                         }}>
                                       <style jsx>{`
                                         div::-webkit-scrollbar {
                                           width: 6px;
                                         }
                                         div::-webkit-scrollbar-track {
                                           background: transparent;
                                         }
                                         div::-webkit-scrollbar-thumb {
                                           background-color: hsl(var(--muted-foreground) / 0.2);
                                           border-radius: 3px;
                                         }
                                         div::-webkit-scrollbar-thumb:hover {
                                           background-color: hsl(var(--muted-foreground) / 0.4);
                                         }
                                       `}</style>
                                       
                                       {/* Messages Area */}
                                       <div className="space-y-4 md:space-y-6">
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
                                    {messages.filter(m => m.role !== 'system').map((msg, idx) => {
                                        const filteredMessages = messages.filter(m => m.role !== 'system');
                                        const isLastMessage = idx === filteredMessages.length - 1;
                                        
                                        return (
                                         <motion.div
                                            key={idx}
                                            ref={isLastMessage ? latestMessageRef : null}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex items-start gap-2 md:gap-3 w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                          {msg.role === 'assistant' && (
                                            <Avatar className="w-6 h-6 md:w-8 md:h-8 border flex-shrink-0">
                                                <AvatarFallback className="bg-primary/10"><Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary" /></AvatarFallback>
                                            </Avatar>
                                          )}
                                          <div className="relative group max-w-[85%] sm:max-w-md md:max-w-lg">
                                              <div
                                                className={`rounded-2xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base shadow-md prose prose-sm dark:prose-invert prose-headings:font-semibold prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 ${msg.role === 'user'
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
                                                  className="absolute -bottom-2 -right-2 opacity-30 group-hover:opacity-100 hover:opacity-100 transition-opacity bg-background hover:bg-accent border shadow-sm h-6 w-6 md:h-8 md:w-8 p-0 z-10"
                                                  onClick={() => copyToClipboard(msg.content, idx)}
                                                  title="Copy response"
                                                >
                                                  {copiedMessageIndex === idx ? (
                                                    <Check className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                                                  ) : (
                                                    <Copy className="h-3 w-3 md:h-4 md:w-4" />
                                                  )}
                                                </Button>
                                              )}
                                          </div>
                                          {msg.role === 'user' && (
                                            <Avatar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                                                <AvatarFallback><User className="h-3 w-3 md:h-4 md:w-4"/></AvatarFallback>
                                            </Avatar>
                                          )}
                                        </motion.div>
                                        );
                                    })}
                                    {(loading || isAwaitingAi) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex justify-start items-center gap-2 md:gap-3"
                                        >
                                            <Avatar className="w-6 h-6 md:w-8 md:h-8 border flex-shrink-0">
                                                <AvatarFallback className="bg-primary/10">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                                                    </motion.div>
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="bg-card rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-md border">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.1, 1] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                    >
                                                        <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin text-primary" />
                                                    </motion.div>
                                                    <motion.span
                                                        key={thinkingText}
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -5 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-xs md:text-sm font-medium"
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
                                    
                                    {/* Suggestions shown after latest AI reply */}
                                    {suggestions.length > 0 && !loading && (
                                        <div className="flex flex-col gap-2 mt-4 md:mt-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Menu className="h-4 w-4" />
                                                <span className="text-sm font-medium">Related</span>
                                            </div>
                                            {suggestions.map((s, i) => (
                                                <div key={i} className="flex items-center justify-between w-full border-b border-border/50 pb-2">
                                                    <Button
                                                        className="w-full text-wrap flex bg-transparent hover:text-primary hover:bg-transparent text-left justify-start rounded text-xs md:text-sm py-2 md:py-3 px-2 h-auto"
                                                        variant="ghost"
                                                        onClick={() => handleSuggestionClick(s)}
                                                    >
                                                        {s}
                                                    </Button>
                                                    <PlusIcon className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 ml-2" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <div ref={chatEndRef} />
                                       </div>
                                    </div>
                                    
                                    {/* Fixed Input Form at Bottom */}
                                    <div className="flex-shrink-0 border-t pt-3 md:pt-4 mt-3 md:mt-4">
                                        <form
                                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                            className="flex gap-2 w-full p-2 rounded-[35px] shadow-lg border bg-background"
                                        >
                                            <input
                                                ref={chatInputRef}
                                                id="chat-input-field"
                                                className="flex-1 bg-transparent border-none rounded-lg px-3 py-2 text-sm md:text-base text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-0 disabled:opacity-70"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="Ask about your syllabus..."
                                                disabled={loading || messages.length === 0}
                                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                                            />
                                            <Button 
                                                id="chat-submit-button" 
                                                type="submit" 
                                                size="icon" 
                                                disabled={loading || !input.trim()}
                                                className="rounded-xl w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
                                            >
                                                <Send className="h-4 w-4 md:h-5 md:w-5" />
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
