
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
    scheme: string;
    semester: string;
    subject: string;
  };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { university: universityId, program: programId, scheme: schemeId, semester: semesterId, subject: subjectId } = params;
  
  const university = universities.find(u => u.id === universityId);
  const program = university?.programs.find(p => p.id === programId);
  const scheme = program?.schemes.find(s => s.id === schemeId);
  const semester = scheme?.semesters.find(s => s.id === semesterId);
  const subject = semester?.subjects.find(sub => sub.id === subjectId);

  if (!university || !program || !scheme || !semester || !subject) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: university.name, href: '/select' },
    { label: program.name, href: `/${university.id}/${program.id}/${scheme.id}/${semester.id}` },
    { label: `${semester.name} (${scheme.name})`, href: `/${university.id}/${program.id}/${scheme.id}/${semester.id}` },
    { label: subject.name },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-6 mb-10">
            <h1 className="text-3xl font-bold font-headline md:text-4xl">{subject.name}</h1>
            <p className="text-muted-foreground mt-2 text-lg">{subject.code}</p>
          </div>

          <div className="grid gap-16 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold font-headline">Course Modules</h2>
              <CourseModules modules={subject.modules} />
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold font-headline">AI-Powered Tools</h2>
              <SyllabusSummary fullSyllabus={subject.fullSyllabus} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
