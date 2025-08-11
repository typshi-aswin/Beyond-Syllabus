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
import Link from "next/link";
import { Github } from "lucide-react";
import { Header } from "@/components/common/Header";

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
    <div className="flex flex-col min-h-screen bg-[#030013]">
      <Header />

      {mounted && (
        <section
          className={`w-full h-screen flex justify-center mt-[1vh]  md:mt-[15vh]  ${
            resolvedTheme === "dark"
              ? "w-full h-full md:bg-[url('/hero-img.png')] bg-[url('/hero-mob.png')] bg-no-repeat bg-contain bg-bottom "
              : "bg-white"
          }`}
        >
          <div className="flex justify-center md:h-[50vh] h-[80vh] items-center flex-col  ">
            <div className="">
              <h1 className="md:text-[83px] text-[44px] flex flex-col justify-center item-center font-bold  bg-clip-text text-transparent bg-gradient-to-t from-[#8529ff] via-white to-[#ffffff] text-center tracking-tighter">
                <span className="text-white md:text-[50px] text-[30px] h-[40px] text-center font-light">
                  {" "}
                  Welcome to
                </span>
                Beyond Syllabus
              </h1>
              <p className=" text-muted-foreground md:w-[610px] w-[335px] text-center md:text-[20px] md:text-white ">
                Your modern, AI-powered guide to the university curriculum.
                Explore subjects, understand modules, and unlock your potential.
              </p>
            </div>
            <div className="flex md:flex-row gap-4 flex-col justify-center mt-[2vh] items-center">
              <Button
                size="lg"
                variant="outline"
                className="group shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 w-[266px] md:w-[153px] h-[38px] bg-transparent rounded-[4px] border-white hover:bg-black/20 hover:text-white"
                onClick={handleChatClick}
                disabled={isNavigatingToChat}
              >
                {isNavigatingToChat ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin text-amber-400" />
                    Loading AI Chat...
                  </>
                ) : (
                  <div className=" flex bg">
                    <Sparkles className="h-5  w-5 mr-2 text-amber-400" />
                    AI Chat
                  </div>
                )}
                <div
                  className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-300 ${
                    isNavigatingToChat
                      ? "opacity-100 animate-pulse"
                      : "opacity-0"
                  }`}
                />
              </Button>
              <Button
                size="lg"
                className="group shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 md:w-[203px] w-[266px] h-[38px] rounded-[4px] bg-[#8800ff]"
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
                    <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 hover:bg-[#54019c]" />
                  </>
                )}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/10 via-white/20 to-primary/10 transition-opacity duration-300 ${
                    isNavigating ? "opacity-100 animate-pulse" : "opacity-0"
                  }`}
                />
              </Button>
            </div>
          </div>
        </section>
      )}
      <section className="w-full  py-20 md:py-28 lg:py-32 bg-[#030013]">
        <div className="container h-[130vh] px-4 md:px-6 mx-auto">
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

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative w-full shrink-0 mt-[55vh]  md:mt-16 bg-transparent">
      {/* Rotated Background Layer */}
      <div className="absolute md:bottom-5 bottom-[60vh]  w-full h-[100vh] overflow-hidden ">
        <div className="w-full h-full bg-[url('/hero-img.png')] bg-no-repeat bg-contain rotate-180"></div>
      </div>

      {/* Footer Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-8">
        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col gap-2 mb-5">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="font-semibold">Beyond Syllabus</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your AI-powered guide to the university curriculum.
          </p>
          <a
            href="https://github.com/The-Purple-Movement/WikiSyllabus"
            target="_blank"
            className="w-[100px] rounded-[10px] flex p-3 bg-black/20 hover:shadow-lg"
          >
            <Github />
          </a>
        </div>

        {/* Desktop Layout */}
        <div className="flex">
          <div className="md:flex md:visible hidden flex-col gap-2 mb-5">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <span className="font-semibold">BeyondSyllabus</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI-powered guide to the university curriculum.
            </p>
            <a
              href="https://github.com/The-Purple-Movement/WikiSyllabus"
              target="_blank"
              className="w-[100px] rounded-[10px] flex p-3 bg-black/20 hover:shadow-lg"
            >
              <Github />
            </a>
          </div>

          <div className="flex gap-5 flex-row w-full md:justify-evenly">
            <div>
              <h3 className="text-sm font-semibold mb-3">Navigation</h3>
              <nav className="flex flex-col gap-2">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/select">Select Course</FooterLink>
                <FooterLink href="/chat-with-file">AI Chat</FooterLink>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Resources</h3>
              <nav className="flex flex-col gap-2">
                <FooterLink href="#">Contribution Guide</FooterLink>
                <FooterLink href="#">Code of Conduct</FooterLink>
                <FooterLink href="#">License</FooterLink>
              </nav>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Legal</h3>
              <nav className="flex flex-col gap-2">
                <FooterLink href="#">Terms of Service</FooterLink>
                <FooterLink href="#">Privacy Policy</FooterLink>
              </nav>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>
            {new Date().getFullYear()} BeyondSyllabus. All rights reserved. An
            open-source project.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
      prefetch={false}
    >
      {children}
    </Link>
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
    <div>
      <div className="bg-[#D9D9D9]/10  p-4 rounded-t-full transition-transform duration-300  flex justify-center w-[70px] mx-auto relative  h-[50px] items-center">
        {icon}
      </div>
      <Card className="border-transparent shadow-none text-center bg-[#D9D9D9]/10 transition-all duration-300  rounded-2xl h-[200px]">
        <CardHeader className="items-center gap-6 pb-4">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
