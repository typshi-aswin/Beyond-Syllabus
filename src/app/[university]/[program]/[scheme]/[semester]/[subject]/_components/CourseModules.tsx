"use client";

import { useRouter } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sparkles, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

interface Module {
    title: string;
    content: string;
}

interface CourseModulesProps {
    subjectId: string;
    modules: Module[];
}

export function CourseModules({ modules }: CourseModulesProps) {
    const router = useRouter();

    const handleChatRedirect = (module: Module) => {
        if (!module.content.trim()) {
            // Consider using a toast notification for a better UX
            alert('No content available for this module.');
            return;
        }
        const title = module.title || "Selected Module";
        const content = module.content;
        router.push(`/chat?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`);
    };

    return (
        <div className="space-y-4">
            {modules.length === 0 ? (
                <div className="text-center py-10 px-6 bg-muted rounded-2xl">
                    <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">No modules found for this syllabus.</p>
                    <p className="text-sm text-muted-foreground/80">The content might be under preparation.</p>
                </div>
            ) : (
                <Accordion type="single" collapsible className="w-full space-y-3">
                    {modules.map((module, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <AccordionItem value={`item-${index}`} className="border-b-0 rounded-2xl bg-card/80 backdrop-blur-sm shadow-md overflow-hidden">
                                <AccordionTrigger className="flex justify-between items-center w-full text-left p-6 font-semibold text-lg hover:no-underline">
                                    <span className="flex-1 mr-4">{module.title}</span>
                                </AccordionTrigger>
                                <AccordionContent className="pt-0 pb-6 px-6">
                                    <div className="mb-6 border-l-2 border-primary pl-4">
                                        <h4 className="text-lg font-semibold mb-2">Module Content</h4>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{module.content.trim() || 'No detailed content available.'}</p>
                                    </div>
                                    <Button
                                        onClick={() => handleChatRedirect(module)}
                                        className="flex items-center gap-2 group"
                                    >
                                        <Sparkles className="h-4 w-4 text-amber-300 transition-transform group-hover:scale-125" /> 
                                        Chat with AI about this Module
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            )}
        </div>
    );
}
