'use client';

import { useState } from 'react';
import { summarizeSyllabus } from '@/ai/flows/summarize-syllabus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, BrainCircuit } from 'lucide-react';

interface SyllabusSummaryProps {
    fullSyllabus: string;
}

export function SyllabusSummary({ fullSyllabus }: SyllabusSummaryProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await summarizeSyllabus({ syllabusText: fullSyllabus });
      setSummary(result.summary);
    } catch (e) {
      setError('Failed to generate summary. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <CardTitle>Syllabus Summary</CardTitle>
        </div>
        <CardDescription>Get a quick overview of the key learning objectives.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Syllabus content will be used from the database."
          value={fullSyllabus}
          readOnly
          rows={8}
          className="bg-muted/50"
        />
        {summary && (
          <div className="p-4 bg-muted rounded-md border">
            <p className="text-sm">{summary}</p>
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSummarize} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Summary'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
