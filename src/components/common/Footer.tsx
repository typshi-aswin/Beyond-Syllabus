"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ensure theme is available after hydration
  }, []);
  if (pathname === "/") {
    return (
      <footer className="relative w-full shrink-0 md:bg-transparent md:mt-0 mt-[80vh] ">
        {/* Background */}
        <div
          className={`absolute inset-x-0 bottom-0 w-full h-[20vh]  overflow-hidden z-0 ${
            mounted && resolvedTheme === "dark"
              ? "md:bg-[url('/hero-img.webp')] md:h-[80vh] h-[110vh] rotate-180 bg-[url('/img-mob.svg')] bg-no-repeat md:bg-cover bg-contain mt-[1vh] md:mt-[10vh] bg-bottom"
              : "bg-white bg-no-repeat bg-cover "
          }`}
        ></div>

        {/* Footer Content */}
        <div className="container relative z-10 mx-auto px-4 md:px-6 py-8">
          {/* Mobile Layout */}
          <div className="flex md:hidden flex-col gap-2 mb-5">
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
              className="w-fit rounded-full flex bg-black/20 hover:shadow-lg"
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
                className="w-fit rounded-full flex p-3 bg-black/20 hover:shadow-lg"
              >
                <Github />
              </a>
            </div>

            {/* Links */}
            <div className="flex gap-5 flex-row w-full md:justify-evenly">
              <FooterSection
                title="Navigation"
                links={[
                  { href: "/", label: "Home" },
                  { href: "/select", label: "Select Course" },
                  { href: "/chat-with-file", label: "AI Chat" },
                ]}
              />
              <FooterSection
                title="Resources"
                links={[
                  { href: "#", label: "Contribution Guide" },
                  { href: "#", label: "Code of Conduct" },
                  { href: "#", label: "License" },
                ]}
              />
              <FooterSection
                title="Legal"
                links={[
                  { href: "#", label: "Terms of Service" },
                  { href: "#", label: "Privacy Policy" },
                ]}
              />
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

  function FooterSection({
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
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <footer className="relative w-full shrink-0 bg-transparent">
      {/* Background */}
      <div
        className={`absolute inset-x-0 bottom-0 w-full h-[50vh] md:h-[70vh] overflow-hidden z-0 `}
      ></div>

      {/* Footer Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-8">
        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col gap-2 mb-5">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="font-semibold">BeyondSyllabus</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your AI-powered guide to the university curriculum.
          </p>
          <a
            href="https://github.com/The-Purple-Movement/WikiSyllabus"
            target="_blank"
            className="w-fit rounded-full flex bg-black/20 hover:shadow-lg"
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
              className="w-fit rounded-full flex p-3 bg-black/20 hover:shadow-lg"
            >
              <Github />
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-5 flex-row w-full md:justify-evenly">
            <FooterSection
              title="Navigation"
              links={[
                { href: "/", label: "Home" },
                { href: "/select", label: "Select Course" },
                { href: "/chat-with-file", label: "AI Chat" },
              ]}
            />
            <FooterSection
              title="Resources"
              links={[
                { href: "#", label: "Contribution Guide" },
                { href: "#", label: "Code of Conduct" },
                { href: "#", label: "License" },
              ]}
            />
            <FooterSection
              title="Legal"
              links={[
                { href: "#", label: "Terms of Service" },
                { href: "#", label: "Privacy Policy" },
              ]}
            />
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

function FooterSection({
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
          <FooterLink key={link.href} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </nav>
    </div>
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
