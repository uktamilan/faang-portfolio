"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, Server, Database, Cloud, Cpu, GitMerge, FileCode, CheckCircle2 
} from "lucide-react";

interface Skill {
  name: string;
  level: number; // Percentage
  category: "frontend" | "backend" | "database" | "cloud" | "core";
}

const skillsData: Skill[] = [
  // Frontend
  { name: "React", level: 85, category: "frontend" },
  { name: "HTML", level: 95, category: "frontend" },
  { name: "CSS", level: 90, category: "frontend" },

  // Backend
  { name: "Java", level: 90, category: "backend" },
  { name: "Spring Boot", level: 85, category: "backend" },
  { name: "REST APIs", level: 90, category: "backend" },
  { name: "Hibernate", level: 80, category: "backend" },
  { name: "Microservices", level: 80, category: "backend" },

  // Database
  { name: "PostgreSQL", level: 85, category: "database" },
  { name: "MySQL", level: 90, category: "database" },

  // Cloud & DevOps
  { name: "Docker", level: 80, category: "cloud" },
  { name: "AWS", level: 75, category: "cloud" },
  { name: "GitHub", level: 90, category: "cloud" },

  // Core CS
  { name: "Data Structures", level: 85, category: "core" },
  { name: "OOPS", level: 90, category: "core" },
];

const categories = [
  { id: "all", label: "All Skills", icon: Code2 },
  { id: "backend", label: "Backend", icon: Server },
  { id: "frontend", label: "Frontend", icon: FileCode },
  { id: "database", label: "Databases", icon: Database },
  { id: "cloud", label: "Cloud & DevOps", icon: Cloud },
  { id: "core", label: "Core CS", icon: Cpu },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredSkills = skillsData.filter(
    (skill) => activeTab === "all" || skill.category === activeTab
  );

  // Spotlight mouse track
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="tech" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-950/40">
      {/* Glow Backing */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-violet-400" />
            <span className="text-xs font-mono tracking-widest uppercase text-violet-400">02. Tech Stack</span>
            <span className="h-[1px] w-8 bg-violet-400" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Comprehensive Skills Toolkit
          </h3>
          <p className="text-zinc-400 max-w-xl text-xs sm:text-sm">
            Hover over cards to see dynamic glows. Switch tabs to explore technologies categorised across the full-stack landscape.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border cursor-none ${
                  isSelected
                    ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white border-transparent shadow-lg shadow-violet-900/20"
                    : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skill Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredSkills.map((skill, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.02 }}
              onMouseMove={handleMouseMove}
              key={skill.name}
              className="glow-card relative p-5 group flex flex-col justify-between h-36 border border-zinc-800/80 hover:border-zinc-700/60 rounded-xl bg-zinc-950/40"
            >
              <div className="flex items-start justify-between z-10">
                <div className="space-y-1">
                  <h4 className="text-base font-semibold text-white tracking-wide">{skill.name}</h4>
                  <span className="inline-block text-[9px] font-mono uppercase text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-1.5 py-0.5 rounded">
                    {skill.category}
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-violet-400 opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Progress Slider bar */}
              <div className="w-full space-y-1.5 z-10">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>Proficiency</span>
                  <span className="text-zinc-300 group-hover:text-cyan-400 transition-colors">{skill.level}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-900/60 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.03, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
