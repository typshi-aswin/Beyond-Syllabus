'use client';

import { useState } from 'react';
import type { Module } from '@/types';
import type { SuggestResourcesOutput } from '@/ai/flows/suggest-resources';
import { suggestResources } from '@/ai/flows/suggest-resources';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Link as LinkIcon, Youtube, Newspaper } from 'lucide-react';

interface CourseModulesProps {
  modules: Module[];
}

export function CourseModules({ modules }: CourseModulesProps) {
  const [suggestedResources, setSuggestedResources] = useState<Record<string, SuggestResourcesOutput['resources']>>({});
  const [loadingModule, setLoadingModule] = useState<string | null>(null);
  const [errorModule, setErrorModule] = useState<string | null>(null);

  const handleSuggestResources = async (module: Module) => {
    setLoadingModule(module.title);
    setErrorModule(null);
    try {
      const result = await suggestResources({ syllabusSection: `${module.title}: ${module.content}` });
      setSuggestedResources(prev => ({ ...prev, [module.title]: result.resources }));
    } catch (e) {
      setErrorModule(module.title);
      console.error(e);
    } finally {
      setLoadingModule(null);
    }
  };

  const getIconForUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return <Youtube className="h-4 w-4 text-destructive" />;
    }
    if (url.includes('wikipedia.org') || url.includes('.edu')) {
        return <Newspaper className="h-4 w-4 text-primary" />;
    }
    return <LinkIcon className="h-4 w-4 text-muted-foreground" />;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {modules.map(module => (
        <AccordionItem key={module.title} value={module.title}>
          <AccordionTrigger className="text-lg font-medium">{module.title}</AccordionTrigger>
          <AccordionContent className="pt-2">
            <p className="text-muted-foreground mb-6">{module.content}</p>

            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-base">AI Suggested Resources</CardTitle>
                    <CardDescription className="text-xs">Find extra materials to help you study this module.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loadingModule === module.title && (
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            <span>Finding resources...</span>
                        </div>
                    )}
                    {errorModule === module.title && (
                        <p className="text-sm text-destructive text-center p-4">Could not fetch resources. Please try again.</p>
                    )}
                    {suggestedResources[module.title] && (
                        <div className="space-y-4">
                            {suggestedResources[module.title].map(resource => (
                                <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-md border bg-background hover:border-primary transition-all">
                                    <div className="flex items-start gap-4">
                                        <div>{getIconForUrl(resource.url)}</div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-primary">{resource.title}</p>
                                            <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button 
                        onClick={() => handleSuggestResources(module)} 
                        disabled={loadingModule === module.title}
                        variant="ghost"
                        className="w-full"
                    >
                        {loadingModule === module.title ? 'Loading...' : 'Find Resources'}
                    </Button>
                </CardFooter>
            </Card>

          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
