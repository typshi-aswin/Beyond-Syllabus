import { Github } from "lucide-react";
import Link from "next/link";

export function FooterDark() {
  return (
    <footer className="relative w-full shrink-0 mt-[5vh] md:mt-[-10vh] bg-transparent flex flex-col">
      <div className="absolute inset-x-0 md:bottom-0 bottom-[140px] w-full h-[100vh] overflow-hidden z-0">
        <div className="w-full absolute h-full md:bg-[url('/hero-img.webp')] bg-[url('/img-mob.svg')] bg-no-repeat bg-contain rotate-180"/>
      </div>
      <div className="flex flex-col z-10 w-full flex-grow">
        <div className="z-10 w-full md:flex md:items-end h-auto md:h-[100vh] mx-auto px-6 md:px-6 py-8">
          <div className="flex md:hidden flex-col items-start gap-3 mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <span className="font-semibold">BeyondSyllabus</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-[280px]">
              Your AI-powered guide to the university curriculum.
            </p>
            <a
              href="https://github.com/The-Purple-Movement/WikiSyllabus"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 p-3 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
          
         
          <div className="hidden md:flex flex-col gap-2 mb-5">
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
              rel="noopener noreferrer"
              className="w-[100px] rounded-[10px] flex p-3 bg-black/20 hover:shadow-lg"
            >
              <Github />
            </a>
          </div>
          
          
          <div className="grid grid-cols-3 gap-8 md:gap-12 w-full md:justify-evenly md:flex md:flex-row">
            <FooterLinksGroup
              title="Navigation"
              links={[
                { href: "/", label: "Home" },
                { href: "/select", label: "Select Course" },
                { href: "/chat", label: "AI Chat" },
              ]}
            />
            <FooterLinksGroup
              title="Resources"
              links={[
                { href: "#", label: "Contribution Guide" },
                { href: "#", label: "Code of Conduct" },
                { href: "#", label: "License" },
              ]}
            />
            <FooterLinksGroup
              title="Legal"
              links={[
                { href: "#", label: "Terms of Service" },
                { href: "#", label: "Privacy Policy" },
              ]}
            />
          </div>
        </div>
      </div>
      
     
      <div className="border-t border-border/40 w-full flex items-center justify-center py-6 text-center text-xs text-muted-foreground z-10">
        <p className="px-4">
          {new Date().getFullYear()} BeyondSyllabus. All rights reserved. An open-source project.
        </p>
      </div>
    </footer>
  );
}

function FooterLinksGroup({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col">
      <h3 className="text-sm font-semibold mb-4 text-foreground">{title}</h3>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            prefetch={false}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
