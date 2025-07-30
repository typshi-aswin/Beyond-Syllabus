'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { University, Program, Scheme, Semester } from '@/types';
import { Label } from '@/components/ui/label';

interface SelectionFormProps {
  universities: University[];
}

export function SelectionForm({ universities }: SelectionFormProps) {
  const router = useRouter();

  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(universities.find(u => u.id === 'ktu') || null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);

  const handleUniversityChange = (id: string) => {
    const university = universities.find(u => u.id === id) || null;
    setSelectedUniversity(university);
    setSelectedProgram(null);
    setSelectedScheme(null);
    setSelectedSemester(null);
  };

  const handleProgramChange = (id: string) => {
    const program = selectedUniversity?.programs.find(p => p.id === id) || null;
    setSelectedProgram(program);
    setSelectedScheme(null);
    setSelectedSemester(null);
  };
  
  const handleSchemeChange = (id: string) => {
    const scheme = selectedProgram?.schemes.find(s => s.id === id) || null;
    setSelectedScheme(scheme);
    setSelectedSemester(null);
  };

  const handleSemesterChange = (id: string) => {
    const semester = selectedScheme?.semesters.find(s => s.id === id) || null;
    setSelectedSemester(semester);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUniversity && selectedProgram && selectedScheme && selectedSemester) {
      router.push(`/${selectedUniversity.id}/${selectedProgram.id}/${selectedScheme.id}/${selectedSemester.id}`);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Academic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Select onValueChange={handleUniversityChange} defaultValue="ktu">
              <SelectTrigger id="university">
                <SelectValue placeholder="Select University" />
              </SelectTrigger>
              <SelectContent>
                {universities.map(uni => (
                  <SelectItem key={uni.id} value={uni.id}>{uni.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">Program (Branch)</Label>
            <Select onValueChange={handleProgramChange} disabled={!selectedUniversity} value={selectedProgram?.id || ''}>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                {selectedUniversity?.programs.map(prog => (
                  <SelectItem key={prog.id} value={prog.id}>{prog.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheme">Scheme</Label>
            <Select onValueChange={handleSchemeChange} disabled={!selectedProgram} value={selectedScheme?.id || ''}>
              <SelectTrigger id="scheme">
                <SelectValue placeholder="Select Scheme" />
              </SelectTrigger>
              <SelectContent>
                {selectedProgram?.schemes.map(sch => (
                  <SelectItem key={sch.id} value={sch.id}>{sch.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select onValueChange={handleSemesterChange} disabled={!selectedScheme} value={selectedSemester?.id || ''}>
              <SelectTrigger id="semester">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {selectedScheme?.semesters.map(sem => (
                  <SelectItem key={sem.id} value={sem.id}>{sem.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!selectedSemester}>
            View Subjects
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
