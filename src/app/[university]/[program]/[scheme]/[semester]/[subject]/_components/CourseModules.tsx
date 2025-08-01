// frontend/src/components/common/CourseModules.tsx
"use client";

import { useRouter } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

interface Module {
    title: string;
    content: string;
}

interface CourseModulesProps {
    subjectId: string; // Keep subjectId if needed, though not directly used here
    modules: Module[];
}

export function CourseModules({ modules }: CourseModulesProps) {
    const router = useRouter();

    const handleChatRedirect = (module: Module) => {
        if (!module.content.trim()) {
            alert('No content available for this module.');
            return;
        }
        // Pass module title and content as query params (encodeURIComponent for safety)
        router.push(`/chat?title=${encodeURIComponent(module.title)}&content=${encodeURIComponent(module.content)}`);
    };

    return (
        <div className="space-y-4">
            {modules.length === 0 ? (
                <p>No modules found for this syllabus.</p>
            ) : (
                <Accordion type="single" collapsible className="w-full">
                    {modules.map((module, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="flex justify-between items-center w-full text-left py-4 font-semibold">
                                <span className="flex-1 mr-2">{module.title}</span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-0 pb-4">
                                <div className="mb-4">
                                    <h4 className="text-lg font-semibold mb-2">Module Content</h4>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{module.content.trim() || 'No detailed content available.'}</p>
                                </div>
                                <Button
                                    onClick={() => handleChatRedirect(module)}
                                    className="mb-4 flex items-center"
                                >
                                    <Sparkles className="mr-2 h-4 w-4" /> Chat with AI about this Module
                                </Button>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    );
}
