import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  BookOpenCheck,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/common/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    WikiSyllabus
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explore your university subjects, syllabus, and study
                    resources in a click.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="group">
                    <Link href="/select">
                      Get Started{" "}
                      <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/studying.jpg"
                  width="600"
                  height="400"
                  alt="Students studying"
                  data-ai-hint="students studying"
                  className="mx-auto aspect-video overflow-hidden rounded-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 bg-card border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Learn Smarter, Not Harder
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to streamline your learning process,
                  from understanding complex topics to finding the best study
                  materials.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="border-0 shadow-none">
                <CardHeader className="items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <BookOpenCheck className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Structured Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Access your complete university syllabus, broken down by
                    program, semester, and subject.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none">
                <CardHeader className="items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Topic-wise Clarity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Get concise summaries of your syllabus modules to grasp key
                    concepts quickly.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none">
                <CardHeader className="items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Semester Progress Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Track your learning progress through each module and
                    semester with ease.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 WikiSyllabus. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
