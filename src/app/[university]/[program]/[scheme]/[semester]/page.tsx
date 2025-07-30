
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { universities } from '@/lib/data';
import { Header } from '@/components/common/Header';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface SubjectsPageProps {
  params: {
    university: string;
    program: string;
    scheme: string;
    semester: string;
  };
}

export default async function SubjectsPage({ params }: SubjectsPageProps) {
  const { university: universityId, program: programId, scheme: schemeId, semester: semesterId } = params;

  const university = universities.find(u => u.id === universityId);
  const program = university?.programs.find(p => p.id === programId);
  const scheme = program?.schemes.find(s => s.id === schemeId);
  const semester = scheme?.semesters.find(s => s.id === semesterId);

  if (!university || !program || !scheme || !semester) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: university.name, href: '/select' },
    { label: program.name },
    { label: scheme.name },
    { label: semester.name },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-6 mb-10">
            <h1 className="text-3xl font-bold font-headline md:text-4xl">{semester.name} Subjects</h1>
            <p className="text-muted-foreground mt-2">
              {program.name} ({scheme.name}), {university.name}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {semester.subjects.map(subject => (
              <Link key={subject.id} href={`/${university.id}/${program.id}/${scheme.id}/${semester.id}/${subject.id}`}>
                <Card className="h-full flex flex-col justify-between hover:border-primary hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>{subject.code}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex items-center text-sm font-medium text-primary">
                      View Syllabus <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
