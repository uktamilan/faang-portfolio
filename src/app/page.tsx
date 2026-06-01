"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import ResumeSection from "@/components/ResumeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen text-slate-100 selection:bg-violet-500/30 selection:text-white">
          {/* Custom Particles Canvas */}
          <ParticleBackground />

          {/* Premium Custom Mouse Follower */}
          <CustomCursor />

          {/* Fixed Grid Pattern Mesh background */}
          <div className="grid-mesh" />

          {/* Floating glassmorphic Navigation Header */}
          <Navbar />

          {/* Page Sections */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Hero />
            <About />
            <TechStack />
            <Experience />
            <Projects />
            <Achievements />
            <ResumeSection />
            <Contact />
          </main>

          {/* Footer block */}
          <Footer />
        </div>
      )}
    </>
  );
}
