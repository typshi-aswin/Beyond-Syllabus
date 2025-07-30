
import { notFound } from 'next/navigation';
import { universities } from '@/lib/data';
import { Header } from '@/components/common/Header';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SyllabusSummary } from './_components/SyllabusSummary';
import { CourseModules } from './_components/CourseModules';

interface SubjectPageProps {
  params: {
    university: string;
    program: string;
    semester: string;
    subject: string;
  };
}

export default async function SubjectPage({ params: { university: universityId, program: programId, semester: semesterId, subject: subjectId } }: SubjectPageProps) {
  const university = universities.find(u => u.id === universityId);
  const program = university?.programs.find(p => p.id === programId);
  const semester = program?.semesters.find(s => s.id === semesterId);
  const subject = semester?.subjects.find(sub => sub.id === subjectId);

  if (!university || !program || !semester || !subject) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: university.name, href: '/select' },
    { label: program.name, href: `/${university.id}/${program.id}/${semester.id}` },
    { label: semester.name, href: `/${university.id}/${program.id}/${semester.id}` },
    { label: subject.name },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold font-headline">{subject.name}</h1>
          <p className="text-muted-foreground mt-1 text-lg">{subject.code}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold font-headline">Course Modules</h2>
            <CourseModules modules={subject.modules} />
          </div>
          <div className="space-y-8">
             <h2 className="text-2xl font-bold font-headline">AI-Powered Tools</h2>
             <SyllabusSummary fullSyllabus={subject.fullSyllabus} />
          </div>
        </div>
      </main>
    </>
  );
}
