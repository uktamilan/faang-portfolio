"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Phone, Send, CheckCircle, RefreshCw, MapPin, AlertCircle 
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

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  submit?: string;
}

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);

  // Check for existing submit cooldown on mount
  useEffect(() => {
    const lastSubmit = localStorage.getItem("contact_submit_time");
    if (lastSubmit) {
      const timeDiff = Date.now() - parseInt(lastSubmit, 10);
      if (timeDiff < 60000) {
        const remaining = Math.ceil((60000 - timeDiff) / 1000);
        setCooldownRemaining(remaining);
      }
    }
  }, []);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const timer = setTimeout(() => {
      setCooldownRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldownRemaining]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation (Optional but validated if entered)
    if (formData.phone.trim()) {
      const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number (7-20 digits).";
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent submissions during cooldown
    if (cooldownRemaining > 0) {
      setErrors((prev) => ({
        ...prev,
        submit: `Please wait ${cooldownRemaining} seconds before sending another message.`
      }));
      return;
    }

    if (!validateForm()) return;

    setFormState("sending");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormState("sent");
        
        // Save submission time to enforce cooldown
        localStorage.setItem("contact_submit_time", Date.now().toString());
        setCooldownRemaining(60);

        // Open WhatsApp automatically in a new tab
        const whatsappNumber = "919710978280"; // Udayakumar's real phone digits without plus/spaces
        const whatsappText = `Hello Udayakumar,\n\nA visitor contacted you through your portfolio.\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nPhone: ${formData.phone || "N/A"}\nSubject: ${formData.subject}\nMessage: ${formData.message}\n\nThank you.`;
        
        const encodedText = encodeURIComponent(whatsappText);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank", "noopener,noreferrer");

      } else {
        setFormState("idle");
        setErrors({ submit: result.error || "An error occurred while sending the message." });
      }
    } catch (err: any) {
      setFormState("idle");
      setErrors({ submit: "Network error. Please try again later." });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: ""
    });
    setErrors({});
    setFormState("idle");
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
      value: "github.com/uktamilan",
      href: "https://github.com/uktamilan"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai, Tamil Nadu, India",
      href: "https://maps.google.com/?q=Chennai,+Tamil+Nadu,+India"
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
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl">
            Let's discuss professional opportunities, software development projects, or system architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-5 space-y-4 text-left">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4, scale: 1.01 }}
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
                </motion.a>
              );
            })}
          </div>

          {/* Right Side: Message Form or Success Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {formState === "sent" ? (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-900 bg-zinc-950/40 text-center flex flex-col items-center justify-center space-y-6 min-h-[450px]"
                >
                  {/* Glowing success checkmark */}
                  <motion.div 
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: [1, 1.15, 1], rotate: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-20 h-20 rounded-full flex items-center justify-center bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 relative"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-emerald-500/10"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <CheckCircle className="w-10 h-10 text-emerald-400 relative z-10 animate-bounce" />
                  </motion.div>

                  <div className="space-y-3 max-w-md">
                    <h4 className="text-2xl font-bold text-white tracking-tight">
                      Message Transmitted!
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      Thank you! Your message has been sent successfully. I will get back to you as soon as possible.
                    </p>
                    <p className="text-cyan-400/90 text-[10px] font-mono mt-2">
                      // Opening WhatsApp chat to parallel backup your message...
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetForm}
                    className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 font-mono text-xs font-bold transition-all duration-300 cursor-none"
                  >
                    SEND ANOTHER MESSAGE
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-900 bg-zinc-950/40 text-left relative overflow-hidden"
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Error Alerts */}
                    {errors.submit && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>{errors.submit}</div>
                      </div>
                    )}

                    {/* Name & Email Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex justify-between">
                          <span>Full Name *</span>
                          {errors.name && <span className="text-red-400 font-sans tracking-normal capitalize">{errors.name}</span>}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Udayakumar"
                          disabled={formState !== "idle"}
                          className={`w-full bg-zinc-900/50 border focus:ring-1 text-white rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 cursor-none ${
                            errors.name 
                              ? "border-red-500/40 focus:border-red-400 focus:ring-red-400/20" 
                              : "border-zinc-850 focus:border-cyan-400 focus:ring-cyan-400/20"
                          }`}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex justify-between">
                          <span>Email Address *</span>
                          {errors.email && <span className="text-red-400 font-sans tracking-normal capitalize">{errors.email}</span>}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="udhay@company.com"
                          disabled={formState !== "idle"}
                          className={`w-full bg-zinc-900/50 border focus:ring-1 text-white rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 cursor-none ${
                            errors.email 
                              ? "border-red-500/40 focus:border-red-400 focus:ring-red-400/20" 
                              : "border-zinc-850 focus:border-cyan-400 focus:ring-cyan-400/20"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Company & Phone Fields (Optional) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Company Name (Optional)</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Pantech eSolutions"
                          disabled={formState !== "idle"}
                          className="w-full bg-zinc-900/50 border border-zinc-850 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-white rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 cursor-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex justify-between">
                          <span>Phone Number (Optional)</span>
                          {errors.phone && <span className="text-red-400 font-sans tracking-normal capitalize">{errors.phone}</span>}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 9710978280"
                          disabled={formState !== "idle"}
                          className={`w-full bg-zinc-900/50 border focus:ring-1 text-white rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 cursor-none ${
                            errors.phone 
                              ? "border-red-500/40 focus:border-red-400 focus:ring-red-400/20" 
                              : "border-zinc-850 focus:border-cyan-400 focus:ring-cyan-400/20"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex justify-between">
                        <span>Subject *</span>
                        {errors.subject && <span className="text-red-400 font-sans tracking-normal capitalize">{errors.subject}</span>}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="System design discussion"
                        disabled={formState !== "idle"}
                        className={`w-full bg-zinc-900/50 border focus:ring-1 text-white rounded-xl px-4 py-3 text-xs outline-none transition-all duration-300 cursor-none ${
                          errors.subject 
                            ? "border-red-500/40 focus:border-red-400 focus:ring-red-400/20" 
                            : "border-zinc-850 focus:border-cyan-400 focus:ring-cyan-400/20"
                        }`}
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex justify-between">
                        <span>Your Message *</span>
                        {errors.message && <span className="text-red-400 font-sans tracking-normal capitalize">{errors.message}</span>}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Hi Udayakumar, I came across your portfolio and would love to connect..."
                        disabled={formState !== "idle"}
                        className={`w-full bg-zinc-900/50 border focus:ring-1 text-white rounded-xl p-4 text-xs outline-none transition-all duration-300 resize-none cursor-none ${
                          errors.message 
                            ? "border-red-500/40 focus:border-red-400 focus:ring-red-400/20" 
                            : "border-zinc-850 focus:border-cyan-400 focus:ring-cyan-400/20"
                        }`}
                      />
                    </div>

                    {/* Submit / Action Button */}
                    <button
                      type="submit"
                      disabled={formState !== "idle" || cooldownRemaining > 0}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold font-mono text-xs transition-all duration-300 hover:scale-[1.01] cursor-none ${
                        cooldownRemaining > 0
                          ? "bg-zinc-900 border border-zinc-800 text-zinc-500"
                          : "bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white"
                      }`}
                    >
                      {formState === "idle" && cooldownRemaining === 0 && (
                        <>
                          <Send className="w-4 h-4" /> TRANSMIT DATA
                        </>
                      )}
                      {formState === "idle" && cooldownRemaining > 0 && (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-zinc-500" /> COOLDOWN: {cooldownRemaining}s
                        </>
                      )}
                      {formState === "sending" && (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> ENCRYPTING & TRANSMITTING...
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
