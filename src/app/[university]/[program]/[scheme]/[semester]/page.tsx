
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { universities } from '@/lib/data';
import { Header } from '@/components/common/Header';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookText, Code, FlaskConical, Sigma } from 'lucide-react';

interface SubjectsPageProps {
  params: {
    university: string;
    program: string;
    scheme: string;
    semester: string;
  };
}

const getSubjectCategory = (subjectCode: string) => {
    if (subjectCode.startsWith('CS') || subjectCode.startsWith('IT')) return { name: 'Code', icon: <Code className="h-4 w-4" /> };
    if (subjectCode.startsWith('MA')) return { name: 'Math', icon: <Sigma className="h-4 w-4" /> };
    if (subjectCode.startsWith('PH')) return { name: 'Physics', icon: <FlaskConical className="h-4 w-4" /> };
    return { name: 'Core', icon: <BookText className="h-4 w-4" />};
};


export default async function SubjectsPage({ params: { university: universityId, program: programId, scheme: schemeId, semester: semesterId } }: SubjectsPageProps) {
  const university = universities.find(u => u.id === universityId);
  const program = university?.programs.find(p => p.id === programId);
  const scheme = program?.schemes.find(s => s.id === schemeId);
  const semester = scheme?.semesters.find(s => s.id === semesterId);

  if (!university || !program || !scheme || !semester) {
    notFound();
  }

  const breadcrumbItems = [
    { label: university.name, href: '/select' },
    { label: program.name, href: '/select' },
    { label: scheme.name, href: '/select' },
    { label: semester.name },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-8 mb-12">
            <h1 className="text-3xl font-bold md:text-4xl">{semester.name} Subjects</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {program.name} ({scheme.name}), {university.name}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {semester.subjects.map(subject => {
              const category = getSubjectCategory(subject.code);
              return (
                <Link key={subject.id} href={`/${university.id}/${program.id}/${scheme.id}/${semester.id}/${subject.id}`}>
                    <Card className="h-full flex flex-col justify-between rounded-2xl hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-xl pr-4">{subject.name}</CardTitle>
                            <Badge variant="outline" className="flex items-center gap-1.5 whitespace-nowrap">
                                {category.icon}
                                {category.name}
                            </Badge>
                        </div>
                        <CardDescription>{subject.code}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <div className="flex items-center text-sm font-medium text-primary">
                        View Syllabus <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                    </CardFooter>
                    </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </>
  );
}
