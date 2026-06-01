"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, FileText, Award, Briefcase, Medal, ArrowUpRight } from "lucide-react";

interface Achievement {
  id: number;
  value: number;
  suffix: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const achievementsData: Achievement[] = [
  {
    id: 1,
    value: 12,
    suffix: "th",
    title: "DecodeX Hackathon Rank",
    description: "Secured Top 12 out of hundreds of engineering teams in DecodeX 2026.",
    icon: Trophy,
    color: "from-amber-400 to-orange-500"
  },
  {
    id: 2,
    value: 2,
    suffix: "",
    title: "Conference Research Papers",
    description: "Presented research papers in two prestigious academic conferences.",
    icon: FileText,
    color: "from-cyan-400 to-blue-500"
  },
  {
    id: 3,
    value: 3,
    suffix: "",
    title: "NPTEL Certifications",
    description: "Earned certifications in Java Programming, Design Thinking, and IoT Fundamentals.",
    icon: Award,
    color: "from-violet-400 to-purple-600"
  },
  {
    id: 4,
    value: 1,
    suffix: "",
    title: "Enterprise Internship",
    description: "Built microservices and resolved API performance issues at Pantech eSolutions.",
    icon: Briefcase,
    color: "from-emerald-400 to-teal-500"
  }
];

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1.5; // seconds
    const stepTime = Math.max(Math.floor((duration * 1000) / end), 30);

    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
      {count}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-950/20">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/3 w-[320px] h-[320px] bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-violet-400" />
            <span className="text-xs font-mono tracking-widest uppercase text-violet-400">05. Key Achievements</span>
            <span className="h-[1px] w-8 bg-violet-400" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Milestones & Recognition
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Demonstrated engineering excellence through hackathons, certifications, and academic research.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievementsData.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-zinc-900/60 text-left hover:border-zinc-850 transition-colors flex flex-col justify-between h-64 hover-trigger group"
              >
                {/* Icon Circle */}
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr ${ach.color} p-2.5 text-zinc-950 shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Medal className="w-4 h-4 text-zinc-700 group-hover:text-cyan-400 transition-colors" />
                </div>

                {/* Numbers */}
                <div className="my-4">
                  <CountUpNumber value={ach.value} suffix={ach.suffix} />
                </div>

                {/* Text details */}
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
