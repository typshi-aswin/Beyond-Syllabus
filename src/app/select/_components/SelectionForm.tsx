'use client';

import { useState, useEffect } from 'react';
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

  const [selectedUniversityId, setSelectedUniversityId] = useState<string>('ktu');
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(null);

  const [programs, setPrograms] = useState<Program[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    const university = universities.find(u => u.id === selectedUniversityId);
    setPrograms(university?.programs || []);
    setSelectedProgramId(null);
    setSelectedSchemeId(null);
    setSelectedSemesterId(null);
    setSchemes([]);
    setSemesters([]);
  }, [selectedUniversityId, universities]);

  useEffect(() => {
    const program = programs.find(p => p.id === selectedProgramId);
    setSchemes(program?.schemes || []);
    setSelectedSchemeId(null);
    setSelectedSemesterId(null);
    setSemesters([]);
  }, [selectedProgramId, programs]);

  useEffect(() => {
    const scheme = schemes.find(s => s.id === selectedSchemeId);
    setSemesters(scheme?.semesters || []);
    setSelectedSemesterId(null);
  }, [selectedSchemeId, schemes]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUniversityId && selectedProgramId && selectedSchemeId && selectedSemesterId) {
      router.push(`/${selectedUniversityId}/${selectedProgramId}/${selectedSchemeId}/${selectedSemesterId}`);
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
            <Select onValueChange={setSelectedUniversityId} defaultValue="ktu">
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
            <Select onValueChange={setSelectedProgramId} disabled={!selectedUniversityId} value={selectedProgramId || ''}>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map(prog => (
                  <SelectItem key={prog.id} value={prog.id}>{prog.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheme">Scheme</Label>
            <Select onValueChange={setSelectedSchemeId} disabled={!selectedProgramId} value={selectedSchemeId || ''}>
              <SelectTrigger id="scheme">
                <SelectValue placeholder="Select Scheme" />
              </SelectTrigger>
              <SelectContent>
                {schemes.map(sch => (
                  <SelectItem key={sch.id} value={sch.id}>{sch.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select onValueChange={setSelectedSemesterId} disabled={!selectedSchemeId} value={selectedSemesterId || ''}>
              <SelectTrigger id="semester">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map(sem => (
                  <SelectItem key={sem.id} value={sem.id}>{sem.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!selectedSemesterId}>
            View Subjects
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
