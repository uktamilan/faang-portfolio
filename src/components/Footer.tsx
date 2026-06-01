"use client";

import { Terminal, ArrowUp, Mail } from "lucide-react";
import { motion } from "framer-motion";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-950/40 text-zinc-500 text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Signature */}
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>© {new Date().getFullYear()} Udayakumar S. Compiled with Next.js & Tailwind.</span>
        </div>

        {/* Center: Social Quicklinks */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/uktamilan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors cursor-none"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/udayakumar-s-80148b323/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors cursor-none"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:udhayakumars0101@gmail.com"
            className="hover:text-white transition-colors cursor-none"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right Side: Back to Top */}
        <button
          onClick={handleScrollTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-zinc-800 transition-all cursor-none"
          aria-label="Scroll to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
