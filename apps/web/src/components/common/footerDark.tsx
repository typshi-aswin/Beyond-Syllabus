import { Github } from "lucide-react";
import Link from "next/link";

export function FooterDark() {
  return (
    <footer className="relative w-full shrink-0 mt-[5vh] md:mt-[-10vh] bg-transparent flex flex-col">
      {/* Rotated Background */}
      <div className="absolute inset-x-0 md:bottom-0 bottom-[140px] w-full h-[100vh] overflow-hidden z-0">
        <div className="w-full absolute h-full md:bg-[url('/hero-img.webp')] bg-[url('/img-mob.svg')] bg-no-repeat bg-contain rotate-180"></div>
      </div>

      {/* Footer Content */}
      <div className="flex flex-col z-10 w-full flex-grow">
        <div className="z-10 w-full md:flex md:items-end h-[390px] md:h-[100vh] mx-auto px-4 md:px-6 py-8">
          {/* Mobile */}
          <div className="flex md:hidden flex-col gap-2 mb-5 py-10">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg"
            >
              <span className="font-semibold">Beyond Syllabus</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI-powered guide to the university curriculum.
            </p>
            <a
              href="https://github.com/The-Purple-Movement/WikiSyllabus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit p-4 rounded-full"
            >
              <Github />
            </a>
          </div>

          {/* Desktop */}
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

          <div className="flex gap-5 flex-row w-full md:justify-evenly">
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

      {/* Footer Bottom */}
      <div className="border-t w-full  flex items-center justify-center py-6 text-center text-xs text-muted-foreground z-10">
        <p>
          {new Date().getFullYear()} BeyondSyllabus. All rights reserved. An
          open-source project.
        </p>
      </div>
    </footer>
  );
}

// Footer Links
function FooterLinksGroup({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
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
