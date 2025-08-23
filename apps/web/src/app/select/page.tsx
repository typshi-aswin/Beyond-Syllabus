import { Header } from "../../components/common/Header";
import { SelectionForm } from "./_components/SelectionForm";
import ErrorDisplay from "../../components/common/ErrorDisplay";
import { Footer } from "../../components/common/Footer";
import { motion } from "framer-motion";
import { AnimatedDiv } from "../../components/common/AnimatedDiv";

interface DirectoryStructure {
  [key: string]: any;
}

async function getDirectoryStructure(): Promise<DirectoryStructure> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/universities`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch universities data");
  }

  return res.json();
}

export default async function SelectPage() {
  let directoryStructure: DirectoryStructure | null = null;
  let error: string | null = null;

  try {
    directoryStructure = await getDirectoryStructure();
  } catch (e: any) {
    error = e.message || "An unexpected error occurred while fetching data.";
  }

  if (error) {
    return <ErrorDisplay errorMessage={error} />;
  }

  if (!directoryStructure || Object.keys(directoryStructure).length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12 md:py-20 flex justify-center items-center flex-1">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">No Syllabus Data Found</h1>
            <p className="text-muted-foreground">
              Please ensure your 'universities' folder and its subdirectories
              contain valid syllabus data.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <AnimatedDiv>
          <div className="max-w-3xl mx-auto">
            <SelectionForm directoryStructure={directoryStructure} />
          </div>
        </AnimatedDiv>
      </main>
      <Footer />
    </div>
  );
}
