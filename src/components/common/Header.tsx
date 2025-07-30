import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="font-headline">WikiSyllabus</span>
        </Link>
      </div>
    </header>
  );
}
