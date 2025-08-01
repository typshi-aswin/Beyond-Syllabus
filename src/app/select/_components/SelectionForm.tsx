// frontend/src/app/select/_components/SelectionForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Computer, Cog, HardHat, CircuitBoard, Bolt, Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SyllabusDataStructure {
  [key: string]: any;
}

interface SelectionFormProps {
  directoryStructure: SyllabusDataStructure;
}

const programIcons: { [key: string]: React.ElementType } = {
  cse: Computer,
  me: Cog,
  ce: HardHat,
  ece: CircuitBoard,
  eee: Bolt,
};

function capitalizeWords(str: string | undefined): string {
  if (!str) return '';
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatSemesterName(semesterId: string): string {
    if (!semesterId) return '';
    return `Semester ${semesterId.replace('s', '').replace(/^0+/, '')}`;
}

export function SelectionForm({ directoryStructure }: SelectionFormProps) {
  const router = useRouter();

  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(null);


  const handleUniversitySelect = (universityId: string) => {
    setSelectedUniversityId(universityId);
    setSelectedProgramId(null);
    setSelectedSchemeId(null);
    setSelectedSemesterId(null);
  };

  const handleProgramSelect = (programId: string) => {
    setSelectedProgramId(programId);
    setSelectedSchemeId(null);
    setSelectedSemesterId(null);
  };

  const handleSchemeSelect = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setSelectedSemesterId(null);
  };

  const handleSemesterSelect = (semesterId: string) => {
    setSelectedSemesterId(semesterId);
  };

    const resetToLevel = (level: 'university' | 'program' | 'scheme' | 'semester' | 'start') => {
        if (level === 'start' || level === 'university') {
            setSelectedUniversityId(null);
            setSelectedProgramId(null);
            setSelectedSchemeId(null);
            setSelectedSemesterId(null);
        } else if (level === 'program') {
            setSelectedProgramId(null);
            setSelectedSchemeId(null);
            setSelectedSemesterId(null);
        } else if (level === 'scheme') {
            setSelectedSchemeId(null);
            setSelectedSemesterId(null);
        } else if (level === 'semester') {
            setSelectedSemesterId(null);
        }
    };


  const selectedUniversityData = selectedUniversityId ? directoryStructure[selectedUniversityId] : null;
  const selectedProgramData = selectedUniversityData && selectedProgramId ? selectedUniversityData[selectedProgramId] : null;
  const selectedSchemeData = selectedProgramData && selectedSchemeId ? selectedProgramData[selectedSchemeId] : null;
  const selectedSemesterData = selectedSchemeData && selectedSchemeId ? selectedSchemeData[selectedSchemeId] : null;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUniversityId && selectedProgramId && selectedSchemeId && selectedSemesterId) {
         router.push(`/${selectedUniversityId}/${selectedProgramId}/${selectedSchemeId}/${selectedSemesterId}`);
    }
  };

  const renderStep = () => {
    if (!selectedUniversityId) {
        const universityIds = Object.keys(directoryStructure);
        return (
            <div className="space-y-4">
                <Label className="text-base font-medium">Select your University</Label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {universityIds.map(universityId => (
                        <Card
                            key={universityId}
                            className="cursor-pointer hover:border-primary transition-all p-6 text-center"
                            onClick={() => handleUniversitySelect(universityId)}
                        >
                            <p className="font-semibold text-lg capitalize">{universityId.replace(/-/g, ' ')}</p>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const universityData: SyllabusDataStructure = selectedUniversityData;
    const programIds = Object.keys(universityData);


    if (!selectedProgramId && selectedUniversityData) {
        return (
            <div className="space-y-4">
                <Label className="text-base font-medium">Choose your branch ({capitalizeWords(selectedUniversityId)})</Label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {programIds.map(programId => {
                         const Icon = programIcons[programId.replace(/-/g, '')] || Computer;
                        return (
                            <Card
                                key={programId}
                                className="cursor-pointer hover:border-primary transition-all text-center p-6"
                                onClick={() => handleProgramSelect(programId)}
                            >
                                <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
                                <p className="font-semibold capitalize">{programId.replace(/-/g, ' ')}</p>
                            </Card>
                        );
                    })}
                </div>
            </div>
        );
    }

    const programData: SyllabusDataStructure = selectedProgramData;
    const schemeIds = Object.keys(programData);


    if (!selectedSchemeId && selectedProgramData) {
         return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Label htmlFor="scheme" className="text-base font-medium">Select Your Scheme ({capitalizeWords(selectedProgramId)})</Label>
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
                <Select onValueChange={handleSchemeSelect} value={selectedSchemeId} name="scheme">
                  <SelectTrigger id="scheme" className="py-6 text-base">
                    <SelectValue placeholder="Select Scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {schemeIds.map(schemeId => (
                      <SelectItem key={schemeId} value={schemeId} className="capitalize">{schemeId.replace(/-/g, ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
          );
    }

    const schemeData: SyllabusDataStructure = selectedSchemeData;
    const semesterIds = Object.keys(schemeData);


    if (!selectedSemesterId && selectedSchemeData) {
        return (
            <div className="space-y-4">
                <Label className="text-base font-medium">Current Semester ({capitalizeWords(selectedSchemeId)})</Label>
                <RadioGroup onValueChange={handleSemesterSelect} value={selectedSemesterId} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {semesterIds.map((semesterId) => (
                        <Label
                            key={semesterId}
                            htmlFor={semesterId}
                            className={cn(
                                "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer hover:border-primary transition-all",
                                selectedSemesterId === semesterId && "border-primary"
                            )}
                        >
                            <RadioGroupItem value={semesterId} id={semesterId} className="sr-only" />
                             <p className="font-semibold">{formatSemesterName(semesterId)}</p>
                        </Label>
                    ))}
                </RadioGroup>
            </div>
        );
    }

    return (
         <div className="space-y-4">
            <h2 className="text-xl font-bold">Your Selection:</h2>
            <p><span className="font-semibold">University:</span> {capitalizeWords(selectedUniversityId)}</p>
            <p><span className="font-semibold">Program:</span> {capitalizeWords(selectedProgramId)}</p>
            <p><span className="font-semibold">Scheme:</span> {capitalizeWords(selectedSchemeId)}</p>
            <p><span className="font-semibold">Semester:</span> {selectedSemesterId ? formatSemesterName(selectedSemesterId) : ''}</p>
         </div>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl rounded-2xl">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Select Your Academic Details</CardTitle>
          <CardDescription>Your selections will tailor your syllabus view.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <div>
              {selectedSemesterId && (
                <Button variant="ghost" type="button" onClick={() => resetToLevel('semester')}>Back to Semester</Button>
              )}
               {!selectedSemesterId && selectedSchemeId && (
                <Button variant="ghost" type="button" onClick={() => resetToLevel('scheme')}>Back to Scheme</Button>
              )}
               {!selectedSchemeId && selectedProgramId && (
                <Button variant="ghost" type="button" onClick={() => resetToLevel('program')}>Back to Program</Button>
              )}
              {!selectedProgramId && selectedUniversityId && (
                 <Button variant="ghost" type="button" onClick={() => resetToLevel('university')}>Back to University</Button>
              )}
            </div>
          <Button
            type="submit"
            className="group bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!selectedUniversityId || !selectedProgramId || !selectedSchemeId || !selectedSemesterId}
          >
            Continue <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
