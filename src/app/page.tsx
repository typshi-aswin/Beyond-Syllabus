import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpenCheck, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-card sticky top-0 z-10 border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-headline">WikiSyllabus</span>
          </Link>
          <Button asChild>
            <Link href="/select">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Your AI-Powered Syllabus Companion
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Navigate your academic journey with ease. WikiSyllabus provides AI-driven summaries and curated resources for your university subjects.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/select">Choose Your Course</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="education study"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                priority
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-card border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Learn Smarter, Not Harder</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  WikiSyllabus is designed to streamline your learning process, from understanding complex topics to finding the best study materials.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card>
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Structured Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Access your complete university syllabus, broken down by program, semester, and subject.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>AI-Powered Summaries</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Get concise summaries of your syllabus modules to grasp key concepts quickly.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BookOpenCheck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Curated Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Discover relevant online articles, videos, and tutorials suggested by AI for each topic.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 WikiSyllabus. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
