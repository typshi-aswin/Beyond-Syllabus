// frontend/src/app/select/page.tsx
import { Header } from '@/components/common/Header';
import { SelectionForm } from './_components/SelectionForm';
import { Loader2 } from 'lucide-react';
import ErrorDisplay from '@/components/common/ErrorDisplay'; // Import the new component


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

export default async function SelectPage() {
  let directoryStructure: DirectoryStructure | null = null;
  let error: string | null = null;

  try {
    directoryStructure = await getDirectoryStructure();
  } catch (e: any) {
    error = e.message || 'An unexpected error occurred while fetching data.';
  }

  if (error) {
    return <ErrorDisplay errorMessage={error} />; // Use the new component
  }

  if (!directoryStructure || Object.keys(directoryStructure).length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12 md:py-20 flex justify-center items-center h-screen">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">No Syllabus Data Found</h1>
            <p className="text-muted-foreground">Please ensure your 'universities' folder and its subdirectories contain valid syllabus data.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <SelectionForm directoryStructure={directoryStructure} />
        </div>
      </main>
    </>
  );
}
