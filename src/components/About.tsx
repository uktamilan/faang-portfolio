"use client";

import { motion } from "framer-motion";
import { Server, Database, GitBranch, Cpu, Code2, Network } from "lucide-react";

const pillars = [
  {
    icon: Server,
    title: "Backend Scalability",
    desc: "Structuring thread-safe, high-concurrency microservices in Java with Spring Boot.",
    glow: "rgba(139, 92, 246, 0.15)"
  },
  {
    icon: Database,
    title: "Database Performance",
    desc: "Optimizing relational models, indexing, and complex queries in PostgreSQL & MySQL.",
    glow: "rgba(6, 182, 212, 0.15)"
  },
  {
    icon: Network,
    title: "System Architecture",
    desc: "Integrating distributed components, messaging queues, and cloud deployments.",
    glow: "rgba(236, 72, 153, 0.15)"
  },
  {
    icon: Cpu,
    title: "Data Structures & DSA",
    desc: "Strong algorithmic foundations, solving complex computational puzzles efficiently.",
    glow: "rgba(245, 158, 11, 0.15)"
  }
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-950/20">
      {/* Light glow overlay */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Text Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-8 bg-cyan-400" />
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">01. About Me</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Engineering solutions that scale, one microservice at a time.
            </h3>

            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                I am a passionate **Java Full Stack Developer** focused on building scalable, reliable, and impactful software solutions. I enjoy solving real-world problems using modern backend engineering, frontend technologies, APIs, databases, cloud infrastructure, and system design principles.
              </p>
              <p>
                My approach is driven by curiosity and standard coding practices. I thrive in collaborative environments where performance optimization, clean architectures, and automated testing are core priorities.
              </p>
              <p className="text-cyan-300/90 font-mono text-xs sm:text-sm">
                // Actively preparing for top product companies and FAANG-level opportunities.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {["Java", "Spring Boot", "Microservices", "React", "PostgreSQL", "Docker", "AWS", "System Design"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-md text-xs font-mono border border-zinc-800 bg-zinc-900/50 text-zinc-300"
                >
                  #{skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Core Engineering Pillars Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-panel p-6 rounded-xl text-left border border-zinc-800/80 hover:border-zinc-700/60 transition-all duration-300"
                  style={{
                    boxShadow: `0 10px 30px -10px ${pillar.glow}`
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-900 border border-zinc-800 mb-4">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h4 className="text-sm font-mono tracking-wide font-bold text-white mb-2">{pillar.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
