"use client";

import { motion } from "framer-motion";
import { Download, FileCheck, CheckCircle2, ChevronRight, BarChart2 } from "lucide-react";

export default function ResumeSection() {
  const atsMetrics = [
    { name: "Keyword Match (Full Stack Java)", score: 95 },
    { name: "Document Structure & Parseability", score: 100 },
    { name: "Quantifiable Impact Bullet Points", score: 90 },
    { name: "Contact & Portfolio Integrity", score: 100 }
  ];

  return (
    <section id="resume" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-950/40">
      {/* Background neon light */}
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-cyan-400" />
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">06. Resume Audit</span>
            <span className="h-[1px] w-8 bg-cyan-400" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Recruiter-Ready & ATS-Optimized
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
            My resume is audited and designed for automated resume parsers (ATS) and human recruiters alike.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: ATS Score Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-900 bg-zinc-950/40 space-y-6 text-left"
          >
            <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
              <h4 className="text-sm font-mono tracking-wider font-semibold text-zinc-300 uppercase flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" /> ATS Compatibility Score
              </h4>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                EXCELLENT
              </span>
            </div>

            {/* Circular Gauge Score */}
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                {/* SVG Radial Progress */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#18181b"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#atsGlow)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    whileInView={{ strokeDashoffset: 251.2 - (251.2 * 94) / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="atsGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00f0ff" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-mono font-extrabold text-white">94%</span>
                  <span className="text-[8px] font-mono text-zinc-500 tracking-wider">MATCH</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-cyan-400" /> Recruiter Verified
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Optimized with standard tags matching FAANG roles (Java, Spring Boot, Databases, System Design).
                </p>
              </div>
            </div>

            {/* Score Metrics Breakdown */}
            <div className="space-y-3.5 pt-2">
              {atsMetrics.map((met, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>{met.name}</span>
                    <span className="text-cyan-400">{met.score}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${met.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Miniature Visual Resume Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Visual mock resume card */}
            <div className="glass-panel p-6 rounded-3xl border border-zinc-900/60 text-left bg-zinc-950/40 relative overflow-hidden group hover:border-zinc-800 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/5 to-transparent pointer-events-none" />

              <div className="border-b border-zinc-900 pb-4 mb-4">
                <h4 className="text-xl font-bold text-white tracking-tight">UDAYAKUMAR S</h4>
                <p className="text-xs font-mono text-cyan-400">JAVA FULLSTACK DEVELOPER</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <h5 className="font-semibold text-zinc-300 uppercase tracking-widest text-[10px] font-mono mb-2 text-violet-400">
                    EXPERIENCE HIGHLIGHT
                  </h5>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="font-bold text-white">Java Full-Stack Developer Intern</div>
                      <div className="text-zinc-500 font-mono text-xs">Pantech eSolutions</div>
                    </div>
                    <span className="text-zinc-500 text-xs font-mono shrink-0">2025</span>
                  </div>
                  <p className="text-zinc-400 text-xs mt-1.5">
                    Developed full-stack features using Spring Boot, Hibernate, MySQL, and React. Optimized SQL queries to improve response speeds by 20%.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-zinc-300 uppercase tracking-widest text-[10px] font-mono mb-2 text-violet-400">
                    EDUCATION
                  </h5>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white">Bachelor of Technology</div>
                      <div className="text-zinc-500 font-mono text-xs">Sathyabama University</div>
                    </div>
                    <span className="text-zinc-500 text-xs font-mono shrink-0">2023 - 2027</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-zinc-300 uppercase tracking-widest text-[10px] font-mono mb-2 text-violet-400">
                    CERTIFICATIONS
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> NPTEL Java Programming
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> NPTEL Design Thinking
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct download action bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 glass-panel rounded-2xl border border-zinc-900">
              <div className="text-left">
                <div className="text-xs sm:text-sm font-semibold text-white">Download Document</div>
                <div className="text-[10px] font-mono text-zinc-500">Udayakumar_Resume.pdf (70 KB)</div>
              </div>
              <a
                href="/Udayakumar_Resume.pdf"
                download="Udayakumar_S_Resume.pdf"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs font-mono transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-violet-900/20 cursor-none"
              >
                <Download className="w-4 h-4" />
                GET PDF COPY
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
