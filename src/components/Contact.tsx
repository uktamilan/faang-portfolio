"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, Phone, Globe, Send, CheckCircle, RefreshCw 
} from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState("sending");

    // Simulate network delay
    setTimeout(() => {
      setFormState("sent");
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      // Reset state back to idle after a few seconds
      setTimeout(() => setFormState("idle"), 5000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "udhayakumars0101@gmail.com",
      href: "mailto:udhayakumars0101@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9710978280",
      href: "tel:+919710978280"
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "linkedin.com/in/udayakumar-s-80148b323/",
      href: "https://linkedin.com/in/udayakumar-s-80148b323/"
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "github.com/udhayakumars0101",
      href: "https://github.com/uktamilan"
    }
  ];

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-950/20">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[350px] bg-cyan-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-8 bg-violet-400" />
            <span className="text-xs font-mono tracking-widest uppercase text-violet-400">07. Contact Gateway</span>
            <span className="h-[1px] w-8 bg-violet-400" />
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Initiate Conversation
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Let's discuss internship opportunities, software scaling challenges, or tech architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4 text-left"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-5 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:border-zinc-800 transition-colors flex items-center gap-4 cursor-none group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-900 border border-zinc-800 text-cyan-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{info.label}</div>
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors break-all">
                      {info.value}
                    </div>
                  </div>
                </a>
              );
            })}
          </motion.div>

          {/* Right Side: Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-900 bg-zinc-950/40 text-left relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Jane Doe"
                    disabled={formState !== "idle"}
                    className="w-full bg-zinc-900/50 border border-zinc-850 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-white rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 cursor-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="jane@company.com"
                    disabled={formState !== "idle"}
                    className="w-full bg-zinc-900/50 border border-zinc-850 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-white rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 cursor-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="System design discussion"
                  disabled={formState !== "idle"}
                  className="w-full bg-zinc-900/50 border border-zinc-850 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-white rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 cursor-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Hi Uday, I came across your portfolio and..."
                  disabled={formState !== "idle"}
                  className="w-full bg-zinc-900/50 border border-zinc-850 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-white rounded-xl p-4 text-xs outline-none transition-all duration-300 resize-none cursor-none"
                />
              </div>

              {/* Submit / Action Button */}
              <button
                type="submit"
                disabled={formState !== "idle"}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold font-mono text-xs transition-all duration-300 hover:scale-[1.01] cursor-none ${
                  formState === "sent"
                    ? "bg-emerald-500 text-white"
                    : "bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white"
                }`}
              >
                {formState === "idle" && (
                  <>
                    <Send className="w-4 h-4" /> TRANSMIT DATA
                  </>
                )}
                {formState === "sending" && (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> ENCRYPTING & SENDING...
                  </>
                )}
                {formState === "sent" && (
                  <>
                    <CheckCircle className="w-4 h-4 animate-bounce" /> PACKET RECEIVED SUCCESSFULLY
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
