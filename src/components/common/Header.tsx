import { GraduationCap, MessageSquareCode } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="bg-card sticky top-0 z-50 border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-semibold">WikiSyllabus</span>
            </Link>
            <div className="flex items-center gap-2">
                 <Button asChild variant="ghost">
                    <Link href="/select">Select Course</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/chat-with-file">
                        <MessageSquareCode className="mr-2 h-4 w-4" />
                        Chat with Syllabus
                    </Link>
                </Button>
            </div>
        </div>
    </header>
  );
}
