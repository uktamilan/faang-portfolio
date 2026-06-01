"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  "uday-shell --version 2026.06.01",
  "Initializing Java Virtual Machine (JVM)... SUCCESS",
  "Starting Spring Boot Application [v3.2.5]...",
  "Loading ApplicationContext & Hibernate Entities...",
  "Connecting to PostgreSQL database: jdbc:postgresql://localhost:5432/portfolio... CONNECTED",
  "Resolving AWS Credentials & Docker container instances... ONLINE",
  "Compiling React micro-frontend bundle using Next.js Compiler... DONE",
  "Optimizing ATS keywords & recruiter analytics dashboard... READY",
  "Boot sequence completed. Running UdayakumarSApp.main()..."
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    
    // Type out terminal lines
    const lineTimer = setInterval(() => {
      if (lineIdx < terminalLines.length) {
        setLines((prev) => [...prev, terminalLines[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(lineTimer);
      }
    }, 180);

    // Progress bar speed
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 500); // Allow fadeout animation
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 bg-[#030014] z-50 flex flex-col justify-between p-6 sm:p-12 md:p-16 font-mono text-xs md:text-sm text-cyan-400 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-zinc-500 text-xs">UDAYAKUMAR_S_OS_V2.6</div>
          </div>

          {/* Terminal Console Output */}
          <div className="flex-1 my-8 overflow-y-auto flex flex-col justify-end gap-1.5 scrollbar-thin">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={idx === lines.length - 1 ? "text-white font-bold" : "text-zinc-400"}
              >
                <span className="text-cyan-500 mr-2">&gt;</span>
                {line}
              </motion.div>
            ))}
            <div className="text-cyan-400 animate-pulse mt-1">_</div>
          </div>

          {/* Progress Bar Footer */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between text-zinc-500 text-xs">
              <span>SYSTEM BOOTING</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
