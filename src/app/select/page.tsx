import { Header } from '@/components/common/Header';
import { SelectionForm } from './_components/SelectionForm';
import { universities } from '@/lib/data';

export default function SelectPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <SelectionForm universities={universities} />
        </div>
      </main>
    </>
  );
}
