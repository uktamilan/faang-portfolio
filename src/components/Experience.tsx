"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Flame, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface TimelineItem {
  id: number;
  type: "work" | "education" | "future";
  role: string;
  organization: string;
  period: string;
  details: string[];
  icon: React.ComponentType<any>;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: "work",
    role: "Java Full-Stack Developer Intern",
    organization: "Pantech eSolutions",
    period: "Jun 2025 – Jul 2025",
    icon: Briefcase,
    details: [
      "Developed and maintained full-stack web applications using Java, Spring Boot, Hibernate, HTML, CSS, JavaScript, and MySQL.",
      "Designed RESTful APIs and integrated frontend with backend for seamless data flow.",
      "Implemented user authentication, role-based access control, and responsive UI components.",
      "Collaborated in an Agile environment, participating in code reviews and sprint planning.",
      "Optimized SQL database queries and improved application performance response times by 20%."
    ]
  },
  {
    id: 2,
    type: "education",
    role: "Bachelor of Technology",
    organization: "Sathyabama University",
    period: "Aug 2023 – Aug 2027",
    icon: GraduationCap,
    details: [
      "Studying core computer science: Data Structures & Algorithms, Database Management Systems, OOPS, and Operating Systems.",
      "Developing technical and problem-solving skills through academic and project work.",
      "Secured Top 12 position in DecodeX 2026, showcasing problem-solving and coding abilities."
    ]
  },
  {
    id: 3,
    type: "future",
    role: "FAANG & Product Engineer Candidate",
    organization: "Scale & Reliability Readiness",
    period: "Active Preparation",
    icon: Flame,
    details: [
      "Deepening expertise in Distributed Systems, System Design (HLD/LLD), microservice patterns, and cloud containerization.",
      "Solving complex algorithmic challenges on LeetCode/Hackerrank with focus on time/space complexity optimizations.",
      "Actively searching for impactful roles at product companies and FAANG-level engineering teams."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-950/20">
      {/* Light glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-cyan-400" />
            <span className="text-xs font-mono tracking-widest uppercase text-cyan-400">03. Career Timeline</span>
            <span className="h-[1px] w-8 bg-cyan-400" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional Journey
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Bridging academic excellence, hands-on internship experience, and rigorous engineering prep.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative border-l border-zinc-800 ml-4 md:ml-32 pl-8 md:pl-12 space-y-12">
          {timelineData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Period on Left for wide screens */}
                <div className="hidden md:block absolute -left-[180px] top-1.5 w-[140px] text-right font-mono text-xs text-zinc-500">
                  {item.period}
                </div>

                {/* Timeline Icon Node */}
                <div className="absolute -left-[53px] md:-left-[69px] top-1 w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-cyan-400 shadow-xl group-hover:border-cyan-400">
                  <IconComponent className="w-5 h-5" />
                  {/* Glowing Node Pulse */}
                  <span className="absolute inset-0 rounded-full bg-cyan-400/10 animate-ping pointer-events-none" />
                </div>

                {/* Content Card */}
                <div className="glass-panel p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 relative hover:border-zinc-800 transition-colors">
                  <div className="md:hidden font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-1.5">
                    {item.period}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-white leading-snug">{item.role}</h4>
                      <p className="text-sm font-mono text-zinc-400">{item.organization}</p>
                    </div>
                    {item.type === "work" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
                        Internship
                      </span>
                    )}
                    {item.type === "future" && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-violet-950/40 border border-violet-500/20 text-violet-400 animate-pulse">
                        Scale Ready
                      </span>
                    )}
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 text-left text-zinc-400 text-xs sm:text-sm">
                    {item.details.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400/80 mt-0.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
