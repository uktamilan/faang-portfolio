"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Briefcase, Mail, Cpu, Terminal, ShieldAlert, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const rotatingRoles = [
  "Java Full Stack Developer",
  "Backend Systems Engineer",
  "Spring Boot & Microservices Specialist",
  "Cloud Application Architect",
  "Problem Solver (DSA & System Design)"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 3000);
    return () => clearInterval(roleTimer);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: (el as HTMLElement).offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/20 text-violet-400 text-xs font-mono tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            FAANG RECRUITMENT-READY PORTFOLIO
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-gradient-primary"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Udayakumar S</span>
          </motion.h1>

          {/* Typing/Rotating role */}
          <div className="h-8 sm:h-10 flex items-center">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg sm:text-xl font-mono text-cyan-400 font-medium"
            >
              &gt; {rotatingRoles[roleIndex]}
            </motion.p>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-semibold text-zinc-100 max-w-2xl leading-snug"
          >
            "Building Scalable Full-Stack Applications with Java & Modern Web Technologies"
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed"
          >
            Java Full Stack Developer passionate about scalable backend systems, modern frontend experiences, microservices, cloud technologies, and real-world product engineering.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="/Udayakumar_Resume.pdf"
              download="Udayakumar_S_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] shadow-lg shadow-white/5 cursor-none"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <button
              onClick={() => handleScrollTo("#projects")}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-950/40 text-zinc-300 font-semibold text-sm transition-all duration-300 hover:border-zinc-700 hover:text-white hover:scale-[1.02] cursor-none"
            >
              <Briefcase className="w-4 h-4" />
              View Projects
            </button>
            <button
              onClick={() => handleScrollTo("#contact")}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-violet-500/20 bg-violet-950/10 text-violet-400 font-semibold text-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-950/30 hover:scale-[1.02] cursor-none"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* Right Interactive Dashboard/Profile columns */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
          {/* Floating tech orbits */}
          <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center p-3 animate-bounce shadow-2xl backdrop-blur-md">
            <Cpu className="w-8 h-8 text-violet-400" />
          </div>

          <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center p-3 animate-pulse shadow-2xl backdrop-blur-md">
            <Terminal className="w-10 h-10 text-cyan-400" />
          </div>

          {/* Profile Photo Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-gradient group hover:border-cyan-400 transition-all duration-500 shadow-2xl shadow-violet-500/10 mb-8"
          >
            {/* Glowing Aura Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-transparent to-violet-500 opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-600 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />

            {/* Profile Image with professional cleanup styles */}
            <Image
              src="/profile.jpg"
              alt="Udayakumar S"
              fill
              className="object-cover object-top filter brightness-110 contrast-105 saturate-95 group-hover:scale-105 transition-transform duration-700 rounded-full"
              priority
              sizes="(max-w-768px) 100vw, 300px"
            />

            {/* Smart cropping shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
          </motion.div>

          {/* IDE Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full max-w-[420px] rounded-xl glass-panel text-left overflow-hidden shadow-2xl border border-zinc-800"
          >
            {/* Window bar */}
            <div className="bg-zinc-950/60 px-4 py-3 border-b border-zinc-900 flex justify-between items-center">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="text-[10px] font-mono text-zinc-500">QueueController.java</div>
              <div className="w-10" />
            </div>

            {/* Code */}
            <div className="p-5 font-mono text-[11px] leading-relaxed text-zinc-300 bg-zinc-950/40">
              <div className="text-zinc-500">@RestController</div>
              <div className="text-zinc-500">@RequestMapping("/api/v1/queue")</div>
              <div>
                <span className="text-violet-400">public class</span>{" "}
                <span className="text-cyan-400">QueueController</span> &#123;
              </div>
              <div className="pl-4">
                <span className="text-zinc-500">@Autowired</span>
                <div>
                  <span className="text-violet-400">private</span>{" "}
                  <span className="text-cyan-400">QueueService</span> service;
                </div>
              </div>
              <div className="pl-4 pt-2">
                <span className="text-zinc-500">@PostMapping("/order/add")</span>
                <div>
                  <span className="text-violet-400">public</span> ResponseEntity&lt;Order&gt;{" "}
                  <span className="text-yellow-400">enqueueOrder</span>(
                </div>
                <div className="pl-4">
                  <span className="text-zinc-500">@RequestBody</span> OrderRequest req) &#123;
                </div>
                <div className="pl-4 text-emerald-400">
                  <span className="text-violet-400">return</span> ResponseEntity.ok(
                </div>
                <div className="pl-8 text-emerald-400">service.processTicket(req)</div>
                <div className="pl-4">);</div>
                <div className="pl-4">&#125;</div>
              </div>
              <div>&#125;</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Down arrow link indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 text-zinc-500">
        <span className="text-[9px] font-mono tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-cyan-400" />
        </motion.div>
      </div>
    </section>
  );
}
