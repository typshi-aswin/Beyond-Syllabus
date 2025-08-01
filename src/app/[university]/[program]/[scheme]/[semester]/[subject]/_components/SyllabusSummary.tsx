// frontend/src/components/common/SyllabusSummary.tsx
"use client"; // Make sure this directive is present

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, BookText } from 'lucide-react';
import { summarizeSyllabus } from '@/ai/flows/summarize-syllabus'; // Ensure correct import


interface SyllabusSummaryProps {
    fullSyllabus: string;
}

export function SyllabusSummary({ fullSyllabus }: SyllabusSummaryProps) {
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSummarize = async () => {
        if (!fullSyllabus.trim()) {
            setSummary('No syllabus content available to summarize.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const result = await summarizeSyllabus({ syllabusText: fullSyllabus });
            setSummary(result.summary);
        } catch (e: any) {
            console.error("Error summarizing syllabus:", e);
            setError('Failed to generate summary.');
            setSummary(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 bg-card p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold">Syllabus Summary</h3>

            {!summary && !loading && !error && (
                 <Button onClick={handleSummarize} disabled={loading} className="w-full flex items-center">
                     <BookText className="mr-2 h-4 w-4" /> Generate Summary
                 </Button>
            )}

            {loading && (
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating summary...</span>
                </div>
            )}

            {error && (
                <p className="text-destructive">{error}</p>
            )}

            {summary && <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>}

        </div>
    );
}
