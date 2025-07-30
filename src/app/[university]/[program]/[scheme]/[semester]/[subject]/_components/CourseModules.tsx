'use client';

import { useState, useEffect } from 'react';
import type { Module } from '@/types';
import type { SuggestResourcesOutput } from '@/ai/flows/suggest-resources';
import { suggestResources } from '@/ai/flows/suggest-resources';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Loader2, Link as LinkIcon, Youtube, Newspaper, Sparkles } from 'lucide-react';

interface CourseModulesProps {
  subjectId: string;
  modules: Module[];
}

export function CourseModules({ subjectId, modules }: CourseModulesProps) {
  const [progress, setProgress] = useState(0);
  const [checkedModules, setCheckedModules] = useState<Record<string, boolean>>({});
  const [suggestedResources, setSuggestedResources] = useState<Record<string, SuggestResourcesOutput['resources']>>({});
  const [loadingModule, setLoadingModule] = useState<string | null>(null);
  const [errorModule, setErrorModule] = useState<string | null>(null);

  useEffect(() => {
    const storedProgress = localStorage.getItem(`progress_${subjectId}`);
    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      setCheckedModules(parsedProgress);
    }
  }, [subjectId]);

  useEffect(() => {
    const totalModules = modules.length;
    const completedModules = Object.values(checkedModules).filter(Boolean).length;
    const newProgress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
    setProgress(newProgress);
    localStorage.setItem(`progress_${subjectId}`, JSON.stringify(checkedModules));
  }, [checkedModules, modules.length, subjectId]);

  const handleCheckboxChange = (moduleTitle: string, isChecked: boolean) => {
    setCheckedModules(prev => ({ ...prev, [moduleTitle]: isChecked }));
  };

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
      return <Youtube className="h-5 w-5 text-destructive" />;
    }
    if (url.includes('wikipedia.org') || url.match(/\.edu(\/|$)/)) {
        return <Newspaper className="h-5 w-5 text-blue-600" />;
    }
    return <LinkIcon className="h-5 w-5 text-muted-foreground" />;
  }

  return (
    <div>
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Semester Progress</p>
                <p className="text-sm font-bold text-primary">{Math.round(progress)}%</p>
            </div>
            <Progress value={progress} className="w-full h-2.5" />
        </div>

        <div className="border rounded-2xl">
            {modules.map((module, index) => (
            <Accordion key={module.title} type="single" collapsible className="w-full">
                <AccordionItem value={module.title} className={index === modules.length - 1 ? 'border-b-0' : ''}>
                    <div className="flex items-center gap-4 p-6">
                        <Checkbox
                            id={`module-${module.title}`}
                            checked={checkedModules[module.title] || false}
                            onCheckedChange={(checked) => handleCheckboxChange(module.title, !!checked)}
                            className="h-5 w-5 rounded-md"
                        />
                        <AccordionTrigger className="text-lg font-medium p-0 hover:no-underline flex-1">
                            <span>{module.title}</span>
                        </AccordionTrigger>
                    </div>
                    <AccordionContent className="px-6 pb-6">
                        <div className="prose prose-sm max-w-none text-muted-foreground mb-6 ml-10">
                            <p>{module.content}</p>
                        </div>

                        <Card className="bg-muted/30 ml-10 rounded-xl">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-base">AI-Suggested Resources</CardTitle>
                                </div>
                                <CardDescription className="text-sm">Extra materials to help you master this module.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loadingModule === module.title && (
                                    <div className="flex items-center justify-center p-4 text-muted-foreground">
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        <span>Finding resources...</span>
                                    </div>
                                )}
                                {errorModule === module.title && (
                                    <p className="text-sm text-destructive text-center p-4">Could not fetch resources. Please try again.</p>
                                )}
                                {suggestedResources[module.title] && suggestedResources[module.title].length > 0 && (
                                    <div className="space-y-3">
                                        {suggestedResources[module.title].map(resource => (
                                            <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg border bg-background hover:border-primary hover:bg-primary/5 transition-all">
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
                                {suggestedResources[module.title] && suggestedResources[module.title].length === 0 && !loadingModule && (
                                    <p className="text-sm text-muted-foreground text-center p-4">No resources found for this module.</p>
                                )}
                                {!suggestedResources[module.title] && !loadingModule && (
                                    <div className="text-center p-4">
                                        <Button 
                                            onClick={() => handleSuggestResources(module)} 
                                            disabled={loadingModule === module.title}
                                            variant="secondary"
                                            className="group"
                                        >
                                            Find Resources <Sparkles className="h-4 w-4 ml-2 transition-transform group-hover:scale-110" />
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            ))}
        </div>
    </div>
  );
}
