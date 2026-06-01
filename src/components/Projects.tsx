"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, Cpu, Layers, Sparkles, CloudRain, Shield, Clock, QrCode, Printer 
} from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: number;
  title: string;
  category: "iot" | "ai" | "cloud" | "startup";
  isFeatured: boolean;
  desc: string;
  features: string[];
  stats: { label: string; value: string }[];
  tags: string[];
  github?: string;
  demo?: string;
  status: "live" | "sandbox" | "architecture" | "prototyping";
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Smart Queue Canteen Management System",
    category: "iot",
    isFeatured: true,
    desc: "Designed and developed a queue-based ordering system using ESP32, captive portal, and mobile app integration to manage canteen crowds efficiently. Enforces first-come-first-serve flows and digital payment validations.",
    features: [
      "Dynamic Queue Management algorithm",
      "Mobile payment portal simulation",
      "QR code order verification & thermal printing",
      "ESP32 local networking & Captive Portal",
      "Real-time customer slot limits (2 min max)"
    ],
    stats: [
      { label: "Wait Reduction", value: "85%" },
      { label: "Throughput", value: "120 order/h" },
      { label: "ESP32 Latency", value: "<150ms" }
    ],
    tags: ["Java", "Spring Boot", "ESP32 C++", "React", "MySQL", "WebSockets"],
    github: "https://github.com/uktamilan",
    demo: "#",
    status: "live"
  },
  {
    id: 2,
    title: "AI-Powered Code reviewer Sandbox",
    category: "ai",
    isFeatured: false,
    desc: "A generative LLM agent designed to read pull requests, analyze complexity anomalies in Java methods, and auto-recommend OOPS refactoring steps.",
    features: [
      "Abstract Syntax Tree parsing for Java",
      "Direct integration with OpenAI API",
      "Code quality grading metrics"
    ],
    stats: [
      { label: "Model", value: "GPT-4o" },
      { label: "Parsing Rate", value: "400 lines/s" }
    ],
    tags: ["Python", "FastAPI", "React", "LangChain", "VectorDB"],
    github: "https://github.com/uktamilan",
    status: "sandbox"
  },
  {
    id: 3,
    title: "Cloud-Native Logging Pipeline",
    category: "cloud",
    isFeatured: false,
    desc: "High-throughput log aggregator for Spring Boot microservices, deploying Docker Swarm nodes with Kafka brokers and OpenTelemetry endpoints.",
    features: [
      "Centralized logging node clustering",
      "Prometheus & Grafana visualization dashboards",
      "Auto-scaling triggers on high log load"
    ],
    stats: [
      { label: "Ingest Limit", value: "10k msg/s" },
      { label: "AWS Nodes", value: "4 EC2 Swarm" }
    ],
    tags: ["Docker", "AWS", "Kafka", "Grafana", "OpenTelemetry"],
    github: "https://github.com/uktamilan",
    status: "architecture"
  },
  {
    id: 4,
    title: "DistriPay: Decentralized Micropayments",
    category: "startup",
    isFeatured: false,
    desc: "A startup idea prototype creating instant, secure, off-chain API payment channels for server-to-server microservices billing.",
    features: [
      "Lightning Network transaction mockups",
      "Highly secure digital signatures",
      "API request gating and verification"
    ],
    stats: [
      { label: "Tx Settlement", value: "Instant" },
      { label: "Gas Cost", value: "$0.00" }
    ],
    tags: ["Next.js", "Java Cryptography", "Web3", "PostgreSQL"],
    github: "https://github.com/uktamilan",
    status: "prototyping"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects = projectsData.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-950/40">
      {/* Background radial glow */}
      <div className="absolute bottom-1/4 left-1/4 w-[380px] h-[380px] bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-cyan-400" />
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">04. Portfolio Projects</span>
            <span className="h-[1px] w-8 bg-cyan-400" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering Showcase
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
            Explore live production builds alongside concept architectures, sandbox implementations, and startup prototypes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: "all", label: "All Repositories" },
            { id: "iot", label: "IoT & Systems" },
            { id: "ai", label: "AI Sandbox" },
            { id: "cloud", label: "Cloud Arch" },
            { id: "startup", label: "Future Startups" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border cursor-none ${
                filter === cat.id
                  ? "bg-cyan-500 text-black border-transparent font-bold shadow-lg shadow-cyan-400/20"
                  : "bg-zinc-900/30 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => {
              if (p.isFeatured) {
                // FEATURED PROJECT: Take 12 columns (Full-width grid highlight)
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="lg:col-span-12 glow-card glass-panel p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-violet-500/20"
                  >
                    {/* Left: Info details */}
                    <div className="md:col-span-7 space-y-6 text-left">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-950/50 border border-violet-500/30 text-violet-400">
                          <Sparkles className="w-3 h-3" />
                          FEATURED PROJECT
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-semibold">
                          {p.status}
                        </span>
                      </div>

                      <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {p.title}
                      </h4>

                      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                        {p.desc}
                      </p>

                      {/* Featured Bullet checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-zinc-300">
                        {p.features.map((f, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-4 pt-2">
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors text-xs font-mono cursor-none"
                          >
                            <GithubIcon className="w-4 h-4" />
                            Repository
                          </a>
                        )}
                        {p.demo && (
                          <a
                            href={p.demo}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors text-xs font-mono cursor-none"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Interactive Live
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right: Technical Stats Block */}
                    <div className="md:col-span-5 flex flex-col justify-between h-full bg-zinc-950/60 border border-zinc-900 rounded-xl p-6 relative overflow-hidden">
                      {/* Grid design mesh overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                      <div className="space-y-4 z-10 text-left">
                        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                          // PROJECT METRICS & HARDWARE
                        </div>
                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" /> Ordering Enforcement
                            </span>
                            <span className="text-xs font-mono font-bold text-white">2 Min Slots</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                              <QrCode className="w-3.5 h-3.5" /> Order Validation
                            </span>
                            <span className="text-xs font-mono font-bold text-white">Encrypted QR</span>
                          </div>
                          <div className="flex justify-between items-center pb-2">
                            <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                              <Printer className="w-3.5 h-3.5" /> Printer Connectivity
                            </span>
                            <span className="text-xs font-mono font-bold text-white">Thermal RS232/WiFi</span>
                          </div>
                        </div>
                      </div>

                      {/* Stat Counters grid */}
                      <div className="grid grid-cols-3 gap-2 mt-8 pt-4 border-t border-zinc-900 z-10">
                        {p.stats.map((st) => (
                          <div key={st.label} className="text-center">
                            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{st.value}</div>
                            <div className="text-[9px] font-mono text-zinc-500 uppercase">{st.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              } else {
                // CONCEPT SANDBOX PROJECTS (Grid elements - 4 columns)
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="lg:col-span-4 glow-card glass-panel p-5 flex flex-col justify-between border border-zinc-800 text-left relative overflow-hidden"
                  >
                    {/* Schematic overlay */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-400/5 to-transparent pointer-events-none" />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-block text-[9px] font-mono uppercase bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                          {p.status}
                        </span>
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white transition-colors cursor-none"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white tracking-wide">{p.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">{p.desc}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-900 space-y-3">
                      <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                        {p.stats.map((st) => (
                          <div key={st.label}>
                            <span className="text-zinc-300 font-bold">{st.value}</span> {st.label}
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-900/40 rounded text-[9px] font-mono text-zinc-500"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              }
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
