"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpenCheck,
  BarChart3,
  ChevronRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FooterDark } from "@/components/common/footerDark";

// Full-screen loader during asset preload
function FullScreenLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#030013] z-[9999]">
      <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
      <p className="mt-4 text-white text-lg">Loading...</p>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [loadingRoute, setLoadingRoute] = useState<string | null>(null);
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Preload image assets
  const preloadImages = (urls: string[]) => {
    return Promise.all(
      urls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      )
    );
  };

  useEffect(() => {
    setMounted(true);
    const images = ["/hero-img.webp", "/img-mob.svg", "/white-bg.png"];

    preloadImages(images).then(() => {
      setTimeout(() => setIsLoadingAssets(false), 800);
    });
  }, []);

  const navigateWithDelay = async (path: string, delay: number) => {
    setLoadingRoute(path);
    await new Promise((res) => setTimeout(res, delay));
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030013]">
      <Header />

      {/* Fullscreen loader */}
      <AnimatePresence>
        {isLoadingAssets && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FullScreenLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <section
          className={`w-full pt-16 pb-20 flex justify-center items-center h-screen ${
            mounted && resolvedTheme === "dark"
              ? "md:bg-[url('/hero-img.webp')] bg-[url('/img-mob.svg')] bg-no-repeat md:bg-cover bg-contain bg-bottom"
              : "bg-[url('/white-bg.png')]"
          }`}
        >
          <div className="text-center space-y-6 px-4">
            <h1
              className={`text-4xl md:text-6xl font-bold tracking-tight ${
                mounted && resolvedTheme === "dark"
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-[#8529ff] via-white to-[#ffffff]"
                  : "text-black"
              }`}
            >
              <span
                className={`block text-[24px] font-light ${
                  mounted && resolvedTheme === "dark"
                    ? "text-white"
                    : "text-black"
                }`}
              >
                Welcome to
              </span>
              Beyond Syllabus
            </h1>
            <p
              className={`max-w-2xl mx-auto text-lg md:text-xl ${
                mounted && resolvedTheme === "dark"
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Your modern, AI-powered guide to the university curriculum.
              Explore subjects, understand modules, and unlock your potential.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              <Button
                size="lg"
                variant="outline"
                className="group shadow-lg w-full md:w-auto h-[44px] border-white hover:bg-black/20 hover:text-white"
                onClick={() => navigateWithDelay("/chat-with-file", 600)}
                disabled={loadingRoute === "/chat-with-file"}
              >
                {loadingRoute === "/chat-with-file" ? (
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
              </Button>

              <Button
                size="lg"
                className="group shadow-lg w-full md:w-auto h-[44px] bg-[#8800ff]"
                onClick={() => navigateWithDelay("/select", 800)}
                disabled={loadingRoute === "/select"}
              >
                {loadingRoute === "/select" ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Loading Syllabus...
                  </>
                ) : (
                  <>
                    Explore Your Syllabus
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className={`w-full py-20 md:py-28 lg:py-32 ${
            mounted && resolvedTheme === "dark" ? "bg-[#030013]" : "bg-white"
          }`}
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-slate-950/20 px-4 py-2 text-sm font-medium">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Learn Smarter, Not Harder
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl leading-relaxed">
                  Our platform is designed to streamline your learning process,
                  from understanding complex topics to finding the best study
                  materials.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                description="Generate learning tasks and discover real-world applications for each module."
              />
            </div>
          </div>
        </section>
      </main>
      <div className="some-wrapper-class">
        {mounted && resolvedTheme === "dark" ? <FooterDark /> : <Footer />}
      </div>
    </div>
  );
}

// Feature Card Component
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
      <div className="bg-[#D9D9D9]/10 p-4 rounded-t-full flex justify-center w-[70px] mx-auto h-[50px] items-center">
        {icon}
      </div>
      <Card className="border-transparent shadow-none text-center bg-[#D9D9D9]/10 rounded-2xl h-[200px]">
        <CardHeader className="items-center pb-4">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
