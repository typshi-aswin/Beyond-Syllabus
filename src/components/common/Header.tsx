import { GraduationCap, MessageSquareCode } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="hidden sm:inline-block font-semibold">WikiSyllabus</span>
            </Link>
            <div className="flex items-center gap-2">
                 <Button asChild variant="ghost">
                    <Link href="/select">Select Course</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/chat-with-file">
                        <MessageSquareCode className="mr-0 sm:mr-2 h-4 w-4" />
                        <span className='hidden sm:inline-block'>Chat with Syllabus</span>
                    </Link>
                </Button>
            </div>
        </div>
    </header>
  );
}
