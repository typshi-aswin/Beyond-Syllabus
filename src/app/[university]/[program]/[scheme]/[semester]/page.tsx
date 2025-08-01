
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookText, Code, FlaskConical, Sigma } from 'lucide-react';
import ErrorDisplay from '@/components/common/ErrorDisplay'; 

interface SubjectsPageProps {
  params: {
    university: string;
    program: string;
    scheme: string;
    semester: string;
  };
}

interface DirectoryStructure {
  [key: string]: any;
}

async function getDirectoryStructure(): Promise<DirectoryStructure> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/universities`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error('Failed to fetch universities data');
  }

  return res.json();
}

function findSemesterData(directoryStructure: DirectoryStructure, params: SubjectsPageProps['params']): { university: any, program: any, scheme: any, semester: any } | null {
    const { university: universityId, program: programId, scheme: schemeId, semester: semesterId } = params;

    const university = { id: universityId, name: capitalizeWords(universityId) };
    const universityData = directoryStructure[universityId];
    if (!universityData) return null;

    const program = { id: programId, name: capitalizeWords(programId) };
    const programData = universityData[programId];
    if (!programData) return null;


    const scheme = { id: schemeId, name: capitalizeWords(schemeId) };
     const schemeData = programData[schemeId];
    if (!schemeData) return null;


    const semester = { id: semesterId, name: formatSemesterName(semesterId), subjects: Array.isArray(schemeData[semesterId]?.subjects) ? schemeData[semesterId].subjects : [] };
    if (!schemeData[semesterId]) return null;

    return { university, program, scheme, semester };
}

function capitalizeWords(str: string | undefined): string {
    if (!str) return '';
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatSemesterName(semesterId: string): string {
    if (!semesterId) return '';
    return `Semester ${semesterId.replace('s', '').replace(/^0+/, '')}`;
}

const getSubjectCategory = (subjectCode: string) => {
    if (subjectCode.startsWith('CS') || subjectCode.startsWith('IT')) return { name: 'Code', icon: <Code className="h-4 w-4" /> };
    if (subjectCode.startsWith('MA')) return { name: 'Math', icon: <Sigma className="h-4 w-4" /> };
    if (subjectCode.startsWith('PH')) return { name: 'Physics', icon: <FlaskConical className="h-4 w-4" /> };
    return { name: 'Core', icon: <BookText className="h-4 w-4" />};
};


export default async function SubjectsPage({ params }: SubjectsPageProps) {
    let directoryStructure: DirectoryStructure | null = null;
    let error: string | null = null;

    try {
      directoryStructure = await getDirectoryStructure();
    } catch (e: any) {
      console.error('Error fetching directory structure:', e);
       error = 'Failed to load syllabus data.';
    }

    if (error || !directoryStructure) {
        return <ErrorDisplay errorMessage={error || 'Could not fetch directory structure.'} />; // Use the new component
    }


    const dataPath = findSemesterData(directoryStructure, params);

    if (!dataPath) {
      notFound();
    }

    const { university, program, scheme, semester } = dataPath;


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
              {semester.subjects.map((subject: any) => {
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
