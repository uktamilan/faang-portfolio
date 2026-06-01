"use client";

import { useState, useEffect } from "react";
import { Menu, X, Terminal, ArrowUpRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#tech" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check active section
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    const root = document.documentElement;
    if (nextTheme === "light") {
      root.style.setProperty("--background", "#f8fafc");
      root.style.setProperty("--foreground", "#0f172a");
      root.style.setProperty("--card-bg", "rgba(241, 245, 249, 0.8)");
      root.style.setProperty("--card-border", "rgba(15, 23, 42, 0.08)");
      root.style.setProperty("--accent-blue", "#0284c7");
      root.style.setProperty("--accent-purple", "#7c3aed");
    } else {
      root.style.setProperty("--background", "#030014");
      root.style.setProperty("--foreground", "#f8fafc");
      root.style.setProperty("--card-bg", "rgba(9, 6, 28, 0.45)");
      root.style.setProperty("--card-border", "rgba(255, 255, 255, 0.06)");
      root.style.setProperty("--accent-blue", "#00f0ff");
      root.style.setProperty("--accent-purple", "#bd00ff");
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: (element as HTMLElement).offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-zinc-900 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navbar Container */}
      <header className="fixed top-4 left-0 w-full px-4 sm:px-6 lg:px-8 z-40">
        <div className="max-w-7xl mx-auto">
          <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "#")}
              className="flex items-center gap-2 font-mono text-sm tracking-wider font-bold text-gradient-primary hover-trigger"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>UDAYAKUMAR.S()</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xs font-mono uppercase tracking-widest hover:text-white transition-colors py-1 relative ${
                    activeSection === item.href ? "text-cyan-400" : "text-zinc-400"
                  }`}
                >
                  {item.name}
                  {activeSection === item.href && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-cyan-400 to-violet-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTAs / Controls */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-400 hover:text-white transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex items-center gap-1 text-xs font-mono px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold transition-all duration-300 shadow-lg shadow-violet-900/20 hover:shadow-cyan-400/20 hover:scale-[1.02]"
              >
                Let's Talk
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full border border-zinc-800 bg-zinc-950/40 text-zinc-400"
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-full border border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:text-white"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 mx-2 p-5 glass-panel rounded-2xl flex flex-col gap-4 shadow-2xl"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-mono uppercase tracking-widest py-2 border-b border-zinc-900 ${
                    activeSection === item.href ? "text-cyan-400" : "text-zinc-400"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full flex items-center justify-center gap-2 text-sm font-mono py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold"
              >
                Let's Talk
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
