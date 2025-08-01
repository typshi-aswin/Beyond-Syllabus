"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Wand2, Send, Bot, User } from "lucide-react";
import { generateModuleTasks, GenerateModuleTasksOutput } from "@/ai/flows/generate-module-tasks";
import { chatWithSyllabus } from "@/ai/flows/chat-with-syllabus";
import { Header } from "@/components/common/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define message type
interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export default function ChatWithFilePage() {
    const [markdown, setMarkdown] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAwaitingAi, setIsAwaitingAi] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleGenerateTasks = async () => {
        if (!markdown.trim()) {
            setError("Please paste your syllabus content first.");
            return;
        }
        setLoading(true);
        setError(null);
        setIsAwaitingAi(true);

        try {
            const result: GenerateModuleTasksOutput = await generateModuleTasks({ moduleContent: markdown });
            setMessages([
                {
                    role: "system",
                    content: `You are an expert assistant for the provided syllabus content.\n\n${markdown}`
                },
                {
                    role: "assistant",
                    content: `📝 **Learning Tasks:**\n${result.tasks.map((t, i) => `${i + 1}. ${t}`).join("\n")}`
                },
                {
                    role: "assistant",
                    content: `🌍 **Real-world Applications:**\n${result.realWorldApplications}`
                }
            ]);
        } catch (e) {
            setError("Failed to generate tasks and applications from the provided content.");
        } finally {
            setLoading(false);
            setIsAwaitingAi(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage: Message = { role: 'user', content: input };
        const currentMessages = [...messages, userMessage];
        setMessages(currentMessages);
        setInput("");
        setLoading(true);
        setIsAwaitingAi(true);
        setError(null);

        try {
            const chatHistory = messages.filter(m => m.role !== 'system');
            const result = await chatWithSyllabus({ history: chatHistory, message: input });
            const assistantMessage: Message = { role: 'assistant', content: result.response };
            setMessages(msgs => [...msgs, assistantMessage]);
        } catch (e) {
            console.error("Error getting AI response:", e);
            setError("Sorry, something went wrong. Please try again.");
        } finally {
            setLoading(false);
            setIsAwaitingAi(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Chat with Your Syllabus</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Paste any syllabus or educational content in markdown format below. Our AI will help you understand it, generate learning tasks, and answer your questions.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <Card className="shadow-lg rounded-2xl">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Syllabus Content</h2>
                            <Textarea
                                placeholder="Paste your syllabus markdown here..."
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                rows={20}
                                className="w-full text-sm rounded-xl focus-visible:ring-primary"
                                disabled={isAwaitingAi}
                            />
                            <Button onClick={handleGenerateTasks} disabled={loading || !markdown.trim()} className="w-full">
                                {loading && !isAwaitingAi ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                Generate Insights
                            </Button>
                        </CardContent>
                    </Card>
                    <div className="flex flex-col h-full">
                        <Card className="flex-1 flex flex-col shadow-lg rounded-2xl h-[600px]">
                            <CardContent className="flex-1 flex flex-col overflow-hidden p-4">
                               <h2 className="text-xl font-semibold mb-4 text-center">AI Assistant</h2>
                                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                {messages.filter(m => m.role !== 'system').length === 0 && !loading && (
                                     <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-500/30">
                                         <Sparkles className="h-4 w-4 text-blue-500" />
                                         <AlertTitle>Ready to Assist!</AlertTitle>
                                         <AlertDescription>
                                             Your AI study assistant will appear here once you generate tasks or start chatting.
                                         </AlertDescription>
                                     </Alert>
                                )}
                                {messages.filter(m => m.role !== 'system').map((msg, idx) => (
                                    <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                      {msg.role === 'assistant' && <Avatar className="w-8 h-8"><AvatarFallback>AI</AvatarFallback></Avatar>}
                                      <div
                                        className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 text-base whitespace-pre-wrap shadow-sm ${msg.role === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                                : 'bg-white dark:bg-gray-800 text-foreground rounded-bl-none border border-gray-200 dark:border-gray-700'
                                            }`}
                                      >
                                        {msg.content}
                                      </div>
                                      {msg.role === 'user' && <Avatar className="w-8 h-8"><AvatarFallback>You</AvatarFallback></Avatar>}
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start items-center gap-3">
                                        <div className="w-8 h-8"/>
                                        <div className="flex items-center gap-2 text-muted-foreground bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-700">
                                            <Loader2 className="h-5 w-5 animate-spin" /> AI is thinking...
                                        </div>
                                    </div>
                                )}
                                {error && <div className="text-center text-destructive py-4">{error}</div>}
                                <div ref={chatEndRef} />
                               </div>
                            </CardContent>
                            <div className="p-4 border-t dark:border-gray-700">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="flex gap-2"
                                >
                                    <input
                                        className="flex-1 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about your syllabus..."
                                        disabled={loading || messages.length === 0}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                                    />
                                    <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
