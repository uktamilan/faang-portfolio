"use client";

import { motion } from "framer-motion";
import { Download, CheckCircle2 } from "lucide-react";

export default function ResumeSection() {
  return (
    <section id="resume" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-950/40">
      {/* Background neon light */}
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-cyan-400" />
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">06. Credentials</span>
            <span className="h-[1px] w-8 bg-cyan-400" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional Credentials & Resume
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
            My resume details my hands-on software development internship, academic projects, and engineering certifications.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Visual Resume Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
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
                  <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
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
