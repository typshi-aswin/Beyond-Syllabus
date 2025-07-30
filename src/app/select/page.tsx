import { Header } from '@/components/common/Header';
import { SelectionForm } from './_components/SelectionForm';
import { universities } from '@/lib/data';

export default function SelectPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline">Select Your Academic Path</h1>
            <p className="text-muted-foreground mt-2">
              Choose your university, program, and semester to view the syllabus.
            </p>
          </div>
          <SelectionForm universities={universities} />
        </div>
      </main>
    </>
  );
}
