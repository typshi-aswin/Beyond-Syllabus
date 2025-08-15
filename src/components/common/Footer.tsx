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
    setMounted(true);
  }, []);

  // Only show full footer on homepage
  const isHome = pathname === "/";

  return (
    <footer
      className={`relative w-full shrink-0 z-10 ${
        isHome ? "bg-transparent" : "bg-transparent"
      }`}
    >
      {/* Background gradients (visually stacked, not blocking layout) */}
      {isHome && (
        <div
          className={`absolute inset-0 z-0 pointer-events-none ${
            mounted && resolvedTheme === "dark"
              ? "bg-[url('/img-mob.svg')] md:bg-[url('/hero-img.webp')]  bg-no-repeat bg-cover opacity-60"
              : "bg-white"
          }`}
        />
      )}

      {/* FOOTER CONTENT */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo + Description */}
          <div className="flex flex-col gap-4 max-w-sm">
            <Link href="/" className="text-lg font-bold">
              BeyondSyllabus
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI-powered guide to the university curriculum.
            </p>
            <a
              href="https://github.com/The-Purple-Movement/WikiSyllabus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 w-fit bg-black/20 rounded-full hover:shadow"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          {/* Footer Sections */}
          <div className="grid grid-cols-3 gap-6 w-full md:w-2/3">
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

        {/* Bottom line */}
        <div className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} BeyondSyllabus. All rights
            reserved. Open-source project.
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
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
