'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { University, Program, Scheme, Semester } from '@/types';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Computer, Cog, HardHat, CircuitBoard, Bolt, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectionFormProps {
  universities: University[];
}

const programIcons: { [key: string]: React.ElementType } = {
  cse: Computer,
  me: Cog,
  ce: HardHat,
  ece: CircuitBoard,
  eee: Bolt,
};

export function SelectionForm({ universities }: SelectionFormProps) {
  const router = useRouter();

  const [selectedUniversity] = useState<University>(universities[0]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);

  const handleProgramSelect = (programId: string) => {
    const program = selectedUniversity.programs.find(p => p.id === programId);
    setSelectedProgram(program || null);
    setSelectedScheme(null);
    setSelectedSemester(null);
  };

  const handleSchemeSelect = (schemeId: string) => {
    const scheme = selectedProgram?.schemes.find(s => s.id === schemeId);
    setSelectedScheme(scheme || null);
    setSelectedSemester(null);
  };

  const handleSemesterSelect = (semesterId: string) => {
    const semester = selectedScheme?.semesters.find(s => s.id === semesterId);
    setSelectedSemester(semester || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUniversity && selectedProgram && selectedScheme && selectedSemester) {
      router.push(`/${selectedUniversity.id}/${selectedProgram.id}/${selectedScheme.id}/${selectedSemester.id}`);
    }
  };

  const renderStep = () => {
    if (!selectedProgram) {
      return (
        <div className="space-y-4">
          <Label className="text-base font-medium">Choose your branch</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedUniversity.programs.map(prog => {
              const Icon = programIcons[prog.id] || Computer;
              return (
                <Card
                  key={prog.id}
                  className="cursor-pointer hover:border-primary transition-all text-center p-6"
                  onClick={() => handleProgramSelect(prog.id)}
                >
                  <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
                  <p className="font-semibold">{prog.name}</p>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }

    if (!selectedScheme) {
      return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Label htmlFor="scheme" className="text-base font-medium">Select Your Scheme</Label>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Your syllabus depends on the academic scheme you follow.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Select onValueChange={handleSchemeSelect} name="scheme">
              <SelectTrigger id="scheme" className="py-6 text-base">
                <SelectValue placeholder="Select Scheme" />
              </SelectTrigger>
              <SelectContent>
                {selectedProgram.schemes.map(sch => (
                  <SelectItem key={sch.id} value={sch.id}>{sch.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
      );
    }

    if (!selectedSemester) {
        return (
            <div className="space-y-4">
                <Label className="text-base font-medium">Current Semester</Label>
                <RadioGroup onValueChange={handleSemesterSelect} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {selectedScheme.semesters.map((sem) => (
                        <Label
                            key={sem.id}
                            htmlFor={sem.id}
                            className={cn(
                                "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer hover:border-primary transition-all",
                                selectedSemester?.id === sem.id && "border-primary"
                            )}
                        >
                            <RadioGroupItem value={sem.id} id={sem.id} className="sr-only" />
                            <p className="font-semibold">{sem.name}</p>
                        </Label>
                    ))}
                </RadioGroup>
            </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl rounded-2xl">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Select Your University & Academic Details</CardTitle>
          <CardDescription>Your selections will tailor your syllabus view.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Select defaultValue={selectedUniversity.id} disabled>
                    <SelectTrigger id="university" className="py-6 text-base bg-muted/50">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={selectedUniversity.id}>{selectedUniversity.name}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <div>
              {selectedProgram && (
                <Button variant="ghost" onClick={() => { setSelectedProgram(null); setSelectedScheme(null); setSelectedSemester(null); }}>Back</Button>
              )}
            </div>
          <Button type="submit" className="group bg-blue-600 hover:bg-blue-700 text-white" disabled={!selectedSemester}>
            Continue <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
