"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  BookOpenCheck,
  BarChart3,
  ChevronRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isNavigatingToChat, setIsNavigatingToChat] = useState(false);

  const handleExploreClick = async () => {
    setIsNavigating(true);

    // Add aesthetic delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 800));

    router.push("/select");
  };

  const handleChatClick = async () => {
    setIsNavigatingToChat(true);

    // Add aesthetic delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 600));

    router.push("/chat-with-file");
  };
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        {mounted && (
          <section
            className={`w-full pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 ${
              resolvedTheme === "dark" ? "bg-[#0C131B]" : "bg-white"
            }`}
          >
            <div className="container px-4 md:px-6 mx-auto">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                <div className="flex flex-col justify-center space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent md:text-left text-center">
                      Welcome to BeyondSyllabus
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-left text-center md:text-xl lg:text-lg xl:text-xl leading-relaxed mx-auto md:mx-0">
                      Your modern, AI-powered guide to the university
                      curriculum. Explore subjects, understand modules, and
                      unlock your potential.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center md:justify-start">
                    <Button
                      size="lg"
                      className="group shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 w-full min-[400px]:w-auto px-8"
                      onClick={handleExploreClick}
                      disabled={isNavigating}
                    >
                      {isNavigating ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Loading Syllabus...
                        </>
                      ) : (
                        <>
                          Explore Your Syllabus{" "}
                          <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 via-white/20 to-primary/10 transition-opacity duration-300 ${isNavigating ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="group shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 w-full min-[400px]:w-auto px-6"
                      onClick={handleChatClick}
                      disabled={isNavigatingToChat}
                    >
                      {isNavigatingToChat ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin text-amber-400" />
                          Loading AI Chat...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-2 text-amber-400" />
                          AI Chat
                        </>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-r from-amber-400/10 via-white/20 to-amber-400/10 transition-opacity duration-300 ${isNavigatingToChat ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:justify-end mt-8 lg:mt-0 lg:-mr-8 xl:-mr-6">
                  {mounted && (
                    <Image
                      src={
                        resolvedTheme === "dark" ? "/dark.png" : "/light.png"
                      }
                      width={600}
                      height={400}
                      alt="Students studying in a modern library"
                      className="object-cover rounded-lg"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="w-full py-20 md:py-28 lg:py-32 bg-card/90 border-y">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-slate-950/20 px-4 py-2 text-sm font-medium">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Learn Smarter, Not Harder
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed leading-relaxed">
                  Our platform is designed to streamline your learning process,
                  from understanding complex topics to finding the best study
                  materials.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12">
              <FeatureCard
                icon={<BookOpenCheck className="h-8 w-8 text-primary" />}
                title="Structured Syllabus"
                description="Access your complete university syllabus, broken down by program, semester, and subject."
              />
              <FeatureCard
                icon={<GraduationCap className="h-8 w-8 text-primary" />}
                title="AI-Powered Insights"
                description="Get concise summaries of your syllabus modules and chat with an AI to grasp key concepts quickly."
              />
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8 text-primary" />}
                title="Learning Tools"
                description="Generate learning tasks and discover real-world applications for each module to deepen your understanding."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-transparent shadow-none text-center bg-slate-950/10 hover:bg-slate-950/20 hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-2xl py-6 h-full">
      <CardHeader className="items-center gap-6 pb-4">
        <div className="bg-primary/10 p-4 rounded-full transition-transform duration-300 hover:scale-110">{icon}</div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
