"use client";

import { useState } from "react";
import { Button } from "../../../../../../../components/ui/button";
import { Loader2, BookText, Wand2 } from "lucide-react";
import { summarizeSyllabus } from "../../../../../../../ai/flows/summarize-syllabus";
import { motion, AnimatePresence } from "framer-motion";

interface SyllabusSummaryProps {
  fullSyllabus: string;
}

export function SyllabusSummary({ fullSyllabus }: SyllabusSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!fullSyllabus.trim()) {
      setSummary("No syllabus content available to summarize.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await summarizeSyllabus({ syllabusText: fullSyllabus });
      setSummary(result.summary);
    } catch (e: any) {
      console.error("Error summarizing syllabus:", e);
      setError("Failed to generate summary.");
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <BookText className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Syllabus Summary</h3>
      </div>

      <AnimatePresence mode="wait">
        {!summary && !loading && !error && (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              onClick={handleSummarize}
              disabled={loading}
              className="w-full py-6 text-base group"
            >
              <Wand2 className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />{" "}
              Generate AI Summary
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-2 text-muted-foreground py-4"
        >
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Generating summary...</span>
        </motion.div>
      )}

      {error && (
        <motion.p
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-destructive text-center py-4"
        >
          {error}
        </motion.p>
      )}

      {summary && (
        <motion.div
          key="summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {summary}
          </p>
          <Button
            onClick={() => setSummary(null)}
            variant="link"
            className="mt-4 p-0 h-auto"
          >
            Generate again
          </Button>
        </motion.div>
      )}
    </div>
  );
}
