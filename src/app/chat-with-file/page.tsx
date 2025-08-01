"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { generateModuleTasks, GenerateModuleTasksOutput } from "@/ai/flows/generate-module-tasks";
import { Header } from "@/components/common/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function ChatWithFilePage() {
    const [markdown, setMarkdown] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
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
                    content: `You are an expert assistant for the provided syllabus content.`
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
        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setLoading(true);
        setError(null);
        setInput("");
        setIsAwaitingAi(true);

        // Placeholder for chat logic
        setTimeout(() => {
            setMessages(msgs => [
                ...msgs,
                {
                    role: "assistant",
                    content: `AI: (This is a placeholder. Integrate with your chat API to answer: "${input}")`
                }
            ]);
            setLoading(false);
            setIsAwaitingAi(false);
        }, 1200);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold">Chat with Your Syllabus</h1>
                    <p className="text-muted-foreground mt-2">
                        Paste your syllabus content in markdown format below to get started.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Syllabus Content</h2>
                        <Textarea
                            placeholder="Paste your syllabus markdown here..."
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            rows={20}
                            className="w-full text-sm"
                            disabled={isAwaitingAi}
                        />
                        <Button onClick={handleGenerateTasks} disabled={loading || !markdown.trim()}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            Generate Tasks & Insights
                        </Button>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
                        <Card className="flex-1 flex flex-col">
                            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.length === 0 && !loading && (
                                     <Alert>
                                         <Sparkles className="h-4 w-4" />
                                         <AlertTitle>Ready to Assist!</AlertTitle>
                                         <AlertDescription>
                                             Your AI-powered study assistant will appear here once you generate tasks or start chatting.
                                         </AlertDescription>
                                     </Alert>
                                )}
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`max-w-[90%] rounded-xl px-4 py-2 text-base whitespace-pre-wrap ${msg.role === 'user'
                                                ? 'self-end bg-primary text-primary-foreground'
                                                : msg.role === 'assistant'
                                                    ? 'self-start bg-muted text-foreground'
                                                    : 'self-center text-xs text-muted-foreground'
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
                                {error && <div className="self-center text-destructive">{error}</div>}
                                <div ref={chatEndRef} />
                            </CardContent>
                            <div className="p-4 border-t">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                    }}
                                    className="flex gap-2"
                                >
                                    <input
                                        className="flex-1 border border-input rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about your syllabus..."
                                        disabled={loading || messages.length === 0}
                                    />
                                    <Button type="submit" disabled={loading || !input.trim()}>
                                        Send
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
