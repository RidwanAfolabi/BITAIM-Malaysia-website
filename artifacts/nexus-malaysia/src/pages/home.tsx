import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroVisual from "../assets/hero-visual.png";
import {
  Cpu,
  Bitcoin,
  Users,
  MapPin,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Settings,
  CheckCircle,
  Loader2,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Focus Areas", href: "#focus" },
  { label: "Initiatives", href: "#initiatives" },
  { label: "Team", href: "#team" },
  { label: "Apply", href: "#apply" },
  { label: "Contact Us", href: "#contact" },
];

function smoothScrollTo(href: string, onDone?: () => void) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 64;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
  onDone?.();
}

type Theme = "cyber" | "mono" | "fusion";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("cyber");
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Form State
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    role: "",
    interest: "",
    reason: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  const handleFormReset = () => {
    setFormState("idle");
    setFormData({
      name: "",
      email: "",
      org: "",
      role: "",
      interest: "",
      reason: ""
    });
  };

  const themeClasses = {
    cyber: {
      bg: "bg-[#0B0F19]",
      text: "text-white",
      primary: "text-orange-500",
      primaryBg: "bg-orange-500",
      primaryBorder: "border-orange-500",
      secondary: "text-cyan-400",
      secondaryBg: "bg-cyan-400",
      cardBg: "bg-white/[0.03]",
      cardBorder: "border-white/10",
      inputRing: "focus:ring-orange-500",
      cardGlow: "shadow-[0_0_15px_rgba(249,115,22,0.15)]",
    },
    mono: {
      bg: "bg-[#000000]",
      text: "text-white",
      primary: "text-zinc-100",
      primaryBg: "bg-zinc-100",
      primaryBorder: "border-zinc-100",
      secondary: "text-zinc-400",
      secondaryBg: "bg-zinc-400",
      cardBg: "bg-zinc-900/50",
      cardBorder: "border-zinc-700",
      inputRing: "focus:ring-zinc-400",
      cardGlow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]", // subtle deep blue
    },
    fusion: {
      bg: "bg-[#111827]",
      text: "text-white",
      primary: "text-[#D4AF37]",
      primaryBg: "bg-[#D4AF37]",
      primaryBorder: "border-[#D4AF37]",
      secondary: "text-blue-300",
      secondaryBg: "bg-blue-300",
      cardBg: "bg-white/[0.02]",
      cardBorder: "border-white/5",
      inputRing: "focus:ring-[#D4AF37]",
      cardGlow: "shadow-[0_0_15px_rgba(212,175,55,0.15)]",
    }
  };

  const currentTheme = themeClasses[theme];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const focusCards = [
    {
      title: "AI & Blockchain Convergence",
      subtitle: "Exploring the Intersection",
      desc: "We investigate and advocate for the powerful crossover of decentralized technology and AI — focusing on seamless global payments, autonomous robotic solutions, and deep on-chain analytics.",
      icon: Cpu,
      accent: theme === "cyber" ? "text-cyan-400" : currentTheme.secondary,
      border: `hover:${currentTheme.cardBorder}`,
      glow: `group-hover:bg-white/5`
    },
    {
      title: "Technical Education",
      subtitle: "SenangBit AI Learning Series",
      desc: "We design and deploy practical, actionable AI training frameworks and digital business masterclasses to upskill our members and communities.",
      icon: Bitcoin,
      accent: theme === "cyber" ? "text-orange-500" : currentTheme.primary,
      border: `hover:${currentTheme.cardBorder}`,
      glow: `group-hover:bg-white/5`
    },
    {
      title: "Co-operative & Community",
      subtitle: "Ecosystem Building",
      desc: "Through structured discourses, national colloquiums, and networking sessions, we are establishing a resilient, tech-driven co-operative framework in Malaysia.",
      icon: Users,
      accent: "text-white",
      border: `hover:${currentTheme.cardBorder}`,
      glow: `group-hover:bg-white/5`
    },
    {
      title: "Regional Advocacy",
      subtitle: "Grassroots Engagement",
      desc: "We drive localized Bitcoin advocacy and social-networking meetups across Malaysia's leading tech-oriented innovation hubs.",
      icon: MapPin,
      accent: theme === "cyber" ? "text-orange-400" : currentTheme.primary,
      border: `hover:${currentTheme.cardBorder}`,
      glow: `group-hover:bg-white/5`
    }
  ];

  const capabilities = [
    {
      label: "Network",
      desc: "Build a sovereign, peer-to-peer financial network accessible to every Malaysian.",
      metrics: ["200+ Members", "12 Cities"]
    },
    {
      label: "Barrier",
      desc: "Break down educational and access barriers to Bitcoin and AI adoption.",
      metrics: ["8 Programs", "3 Institutions"]
    },
    {
      label: "Nodes",
      desc: "Establish knowledge nodes across universities, accelerators, and co-working hubs.",
      metrics: ["MRANTI", "UNIKOP", "TM One"]
    },
    {
      label: "Impact",
      desc: "Drive measurable policy change and grassroots digital literacy.",
      metrics: ["2 Policy Papers", "1 Colloquium"]
    }
  ];

  const team = [
    { name: "Luqman Hakim", title: "Founder & President" },
    { name: "Nazrin Shah", title: "Deputy President" },
    { name: "Amirul Hadi", title: "Secretary General" },
    { name: "Zulaikha Rahim", title: "Treasurer" },
    { name: "Dr. Hafiz Zainudin", title: "Research Lead" },
    { name: "Farah Nabilah", title: "Programs Director" }
  ];

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500 font-sans selection:bg-white/20`} data-testid="page-root">
      
      {/* Settings Cog */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <AnimatePresence>
            {settingsOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className={`absolute bottom-14 right-0 p-3 rounded-xl border ${currentTheme.cardBorder} ${currentTheme.bg} shadow-2xl backdrop-blur-xl w-48`}
                data-testid="theme-panel"
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-3 text-white/50">Theme</p>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "cyber", name: "Cyber Minimal" },
                    { id: "mono", name: "Quantum Mono" },
                    { id: "fusion", name: "Fusion Slate" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as Theme)}
                      className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${theme === t.id ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                      data-testid={`theme-swatch-${t.id}`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`p-3 rounded-full bg-white/10 border ${currentTheme.cardBorder} backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:rotate-90`}
            data-testid="button-theme-cog"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 1. Sticky Navbar */}
      <header className={`sticky top-0 z-40 w-full border-b ${currentTheme.cardBorder} ${currentTheme.bg}/80 backdrop-blur-md`}>
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5" data-testid="nav-logo">
            <div className={`w-8 h-8 ${theme === 'mono' ? 'bg-zinc-800' : 'bg-orange-500'} rounded-sm flex items-center justify-center flex-shrink-0`}>
              <span className="font-extrabold text-white tracking-tighter text-sm">N</span>
            </div>
            <span className="font-bold tracking-tight text-base">NEXUS MALAYSIA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); smoothScrollTo(item.href); }}
                className="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                data-testid={`link-${item.href.slice(1)}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button
              variant="outline"
              onClick={() => smoothScrollTo("#contact")}
              className={`border-white/10 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all text-white bg-transparent`}
              data-testid="button-nav-cta"
            >
              Connect With Us
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            data-testid="button-mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              data-testid="mobile-menu-backdrop"
            />
            <motion.div
              className={`fixed top-0 right-0 z-50 h-full w-72 ${currentTheme.bg} border-l ${currentTheme.cardBorder} flex flex-col md:hidden`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              data-testid="mobile-menu-drawer"
            >
              <div className={`flex items-center justify-between px-6 h-16 border-b ${currentTheme.cardBorder}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 ${theme === 'mono' ? 'bg-zinc-800' : 'bg-orange-500'} rounded-sm flex items-center justify-center flex-shrink-0`}>
                    <span className="font-extrabold text-white text-xs">N</span>
                  </div>
                  <span className="font-bold tracking-tight text-sm">NEXUS MALAYSIA</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => setMobileOpen(false)}
                  data-testid="button-mobile-close"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex flex-col px-4 pt-6 gap-1 flex-1">
                {NAV_LINKS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); smoothScrollTo(item.href, () => setMobileOpen(false)); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium cursor-pointer"
                    data-testid={`mobile-link-${item.href.slice(1)}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <span className={`w-1 h-1 rounded-full ${currentTheme.primaryBg}`} />
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className={`px-6 pb-8 pt-4 border-t ${currentTheme.cardBorder}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    className={`w-full ${currentTheme.primaryBg} ${theme === 'mono' ? 'text-black' : 'text-white'} hover:opacity-90 font-semibold`}
                    onClick={() => {
                      setMobileOpen(false);
                      smoothScrollTo("#contact");
                    }}
                    data-testid="button-mobile-cta"
                  >
                    Connect With Us
                  </Button>
                  <p className="text-xs text-center text-white/25 mt-3">nexusmalaysia.com</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* 2. Hero Section */}
        <section className={`relative pt-24 pb-20 md:pt-44 md:pb-36 overflow-hidden border-b ${currentTheme.cardBorder}`}>
          {theme === 'cyber' && (
            <>
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[140px] -z-10 pointer-events-none" />
            </>
          )}
          {theme === 'fusion' && (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
          )}

          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                className="lg:col-span-7 flex flex-col gap-7"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn}>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold bg-white/5 border ${currentTheme.cardBorder} rounded-full text-white/60 uppercase tracking-widest`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.primaryBg} animate-pulse`} />
                    Registered Nonprofit · Malaysia
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeIn}
                  className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
                  data-testid="hero-heading"
                >
                  Bridging{" "}
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'cyber' ? 'from-orange-500 to-orange-400' : theme === 'fusion' ? 'from-[#D4AF37] to-amber-200' : 'from-zinc-100 to-zinc-400'}`}>
                    Bitcoin
                  </span>{" "}
                  Intelligence
                  <br className="hidden md:block" />
                  &amp;{" "}
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'cyber' ? 'from-cyan-400 to-blue-400' : theme === 'fusion' ? 'from-blue-300 to-indigo-300' : 'from-zinc-400 to-zinc-600'}`}>
                    AI
                  </span>{" "}
                  Futures.
                </motion.h1>

                <motion.p
                  variants={fadeIn}
                  className="text-xl md:text-2xl text-white/70 font-medium leading-snug max-w-xl"
                  data-testid="hero-subheadline"
                >
                  An open confluence of{" "}
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'cyber' ? 'from-cyan-400 to-blue-400' : theme === 'fusion' ? 'from-blue-300 to-indigo-300' : 'from-zinc-300 to-zinc-500'}`}>
                    Bitcoin &amp; AI
                  </span>{" "}
                  users, educators, and industry leaders in Malaysia.
                </motion.p>

                <motion.p
                  variants={fadeIn}
                  className="text-base text-white/50 max-w-lg leading-relaxed"
                  data-testid="hero-description"
                >
                  We bridge the gap between emerging technology, academic research, and grassroots digital literacy to build a future-proof ecosystem.
                </motion.p>

                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button
                    size="lg"
                    onClick={() => smoothScrollTo("#focus")}
                    className={`${currentTheme.primaryBg} hover:opacity-90 ${theme === 'mono' ? 'text-black' : 'text-white'} font-semibold h-12 px-8`}
                    data-testid="button-hero-primary"
                  >
                    Explore Initiatives
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => smoothScrollTo("#apply")}
                    className={`border-white/15 hover:bg-white/5 hover:border-white/30 h-12 px-8 font-semibold text-white bg-transparent`}
                    data-testid="button-hero-secondary"
                  >
                    Apply for Membership
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="lg:col-span-5 hidden lg:block"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/8 z-20 pointer-events-none" />
                  <img
                    src={heroVisual}
                    alt="Bitcoin and AI convergence visualization"
                    className="w-full h-full object-cover"
                    data-testid="hero-image"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. About / Mission */}
        <section id="about" className={`border-b ${currentTheme.cardBorder} bg-white/[0.015]`}>
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.p variants={fadeIn} className={`text-xs font-bold uppercase tracking-widest ${currentTheme.primary} mb-6`}>
                Our Mission · Building Digital Literacy from the Ground Up
              </motion.p>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-snug" data-testid="about-heading">
                Intelligence Meets{" "}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'cyber' ? 'from-orange-500 via-orange-400 to-cyan-400' : theme === 'fusion' ? 'from-[#D4AF37] to-blue-300' : 'from-zinc-100 to-zinc-500'}`}>
                  Decentralisation.
                </span>
              </motion.h2>
              <motion.p variants={fadeIn} className="text-base md:text-lg text-white/60 leading-relaxed mb-10" data-testid="about-description">
                Officially registered as{" "}
                <span className="text-white/90 italic">Pertubuhan Literasi Bitcoin Malaysia</span>,{" "}
                Nexus Malaysia serves as a unified ecosystem bringing together industry professionals, academia, and everyday users. We are dedicated to dispelling misconceptions surrounding decentralized assets and artificial intelligence, transforming them into clear, accessible pathways for national economic growth and technical education.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-xs font-semibold text-white/60 uppercase tracking-widest"
                data-testid="credibility-banner"
              >
                {[
                  { dot: theme === 'cyber' ? "bg-orange-500" : currentTheme.primaryBg, label: "Registered Nonprofit" },
                  { dot: theme === 'cyber' ? "bg-cyan-400" : currentTheme.secondaryBg, label: "Academic Partnerships" },
                  { dot: "bg-white/40", label: "Industry Representation" },
                  { dot: theme === 'cyber' ? "bg-orange-400/60" : currentTheme.primaryBg, label: "Community-Driven" }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeIn} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4. Core Focus Grid */}
        <section id="focus" className="py-24 md:py-36">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-16 max-w-xl"
            >
              <p className={`text-xs font-bold uppercase tracking-widest ${currentTheme.primary} mb-4`}>What We Do</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">Core Focus Areas</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                We operate at the convergence of decentralized finance and artificial intelligence, building robust infrastructure for Malaysia's digital future.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              data-testid="focus-grid"
            >
              {focusCards.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={`group relative p-8 rounded-2xl border ${currentTheme.cardBg} ${currentTheme.cardBorder} ${item.border} ${item.glow} hover:scale-[1.02] hover:${currentTheme.cardGlow} transition-all duration-300 backdrop-blur-md`}
                  data-testid={`card-focus-${i}`}
                >
                  <div className={`mb-5 inline-flex p-3 rounded-xl bg-white/5 border ${currentTheme.cardBorder} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-5 h-5 ${item.accent}`} />
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${item.accent} opacity-70`}>
                    {item.subtitle}
                  </p>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. Strategic Capabilities Matrix (NEW) */}
        <section id="capabilities" className={`py-24 border-t ${currentTheme.cardBorder} bg-white/[0.01]`}>
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="mb-16"
            >
              <p className={`text-xs font-bold uppercase tracking-widest ${currentTheme.primary} mb-4`}>What We Enable</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Strategic Capabilities</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
              data-testid="capabilities-matrix"
            >
              {capabilities.map((cap, i) => (
                <motion.div key={i} variants={fadeIn} className="flex flex-col">
                  <div className={`w-full h-0.5 ${currentTheme.primaryBg} mb-6 opacity-80`} />
                  <h3 className={`text-2xl font-bold ${currentTheme.primary} mb-4 tracking-tight`}>{cap.label}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">{cap.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cap.metrics.map(metric => (
                      <span key={metric} className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md bg-white/5 border ${currentTheme.cardBorder} text-white/70`}>
                        {metric}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. Direct CTA Banner (NEW) */}
        <section className="relative py-24 overflow-hidden">
          <div className={`absolute inset-0 ${currentTheme.bg} z-0`} />
          <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${theme === 'cyber' ? 'orange-500' : theme === 'mono' ? 'zinc-300' : '[#D4AF37]'} to-transparent z-10 opacity-50`} />
          <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${theme === 'cyber' ? 'orange-500' : theme === 'mono' ? 'zinc-300' : '[#D4AF37]'} to-transparent z-10 opacity-50`} />
          {theme === 'cyber' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[200px] bg-orange-500/10 blur-[100px] z-0" />
          )}

          <div className="container mx-auto px-4 md:px-8 relative z-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Ready to Shape Malaysia's Digital Future?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70 mb-10 max-w-2xl mx-auto"
            >
              Join a community of Bitcoin practitioners, AI researchers, and digital advocates.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4"
            >
              <Button
                size="lg"
                onClick={() => smoothScrollTo("#apply")}
                className={`${currentTheme.primaryBg} hover:opacity-90 ${theme === 'mono' ? 'text-black' : 'text-white'} font-semibold h-14 px-10 text-lg`}
              >
                Apply for Membership
              </Button>
              <a href="mailto:social@nbaum.org" className={`text-sm text-white/50 hover:${currentTheme.primary} transition-colors`}>
                Or contact us at social@nbaum.org
              </a>
            </motion.div>
          </div>
        </section>

        {/* 7. Initiatives Highlight (Moved) */}
        <section id="initiatives" className={`py-24 md:py-36 ${currentTheme.cardBg} border-y ${currentTheme.cardBorder} relative overflow-hidden`}>
          {theme === 'cyber' && (
            <>
              <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none" />
              <div className="absolute left-0 bottom-0 w-1/3 h-full bg-gradient-to-r from-cyan-400/5 to-transparent pointer-events-none" />
            </>
          )}

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mb-12 max-w-xl"
            >
              <p className={`text-xs font-bold uppercase tracking-widest ${currentTheme.primary} mb-4`}>Current Operations</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Upcoming Initiatives</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`max-w-4xl border ${theme === 'cyber' ? 'border-orange-500/25' : currentTheme.cardBorder} rounded-3xl p-8 md:p-12 bg-black/60 backdrop-blur-md relative overflow-hidden`}
              data-testid="initiatives-highlight"
            >
              <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${theme === 'cyber' ? 'orange-500' : theme === 'mono' ? 'zinc-300' : '[#D4AF37]'} to-transparent`} />
              <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${theme === 'cyber' ? 'cyan-400/40' : theme === 'mono' ? 'zinc-700' : 'blue-300/40'} to-transparent`} />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                <div className="flex-1">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border ${currentTheme.cardBorder} ${currentTheme.primary} text-xs font-bold uppercase tracking-widest mb-8`}>
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentTheme.primaryBg} opacity-75`} />
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${currentTheme.primaryBg}`} />
                    </span>
                    Flagship Event
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight" data-testid="event-title">
                    The BITAI Colloquium
                  </h3>
                  <p className="text-lg text-white/60 mb-6 leading-relaxed max-w-lg">
                    An upcoming premium event bringing together over 200 tech leaders, innovators, and policymakers to chart the future of Bitcoin and AI in the region.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {["MRANTI", "UNIKOP"].map((partner) => (
                      <span
                        key={partner}
                        className={`px-3 py-1 rounded-full border ${currentTheme.cardBorder} bg-white/5 text-xs font-semibold text-white/60 uppercase tracking-wider`}
                        data-testid={`partner-${partner.toLowerCase()}`}
                      >
                        {partner}
                      </span>
                    ))}
                    <span className={`px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-xs text-white/30 italic`}>
                      + Strategic Partners
                    </span>
                  </div>

                  <p className="text-xs text-white/30 font-mono italic" data-testid="event-status">
                    Logistics and framework currently in development.
                  </p>
                </div>

                <div className="flex-shrink-0 flex flex-col gap-4 md:pt-12">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 font-bold w-full md:w-auto"
                    data-testid="button-event-register"
                  >
                    Register Interest
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-center text-white/30">No commitment required</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 8. Executive Team (NEW) */}
        <section id="team" className="py-24 md:py-36">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="mb-16 text-center max-w-2xl mx-auto"
            >
              <p className={`text-xs font-bold uppercase tracking-widest ${currentTheme.primary} mb-4`}>Leadership</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The People Behind Nexus</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto"
              data-testid="team-grid"
            >
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className={`p-6 md:p-8 rounded-2xl border ${currentTheme.cardBorder} ${currentTheme.cardBg} backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300 text-center flex flex-col items-center justify-center`}
                >
                  <h3 className="font-bold text-lg text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-white/50">{member.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 9. Application Form (NEW) */}
        <section id="apply" className={`py-24 md:py-36 bg-black/40 border-t ${currentTheme.cardBorder}`}>
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-center mb-12"
              >
                <p className={`text-xs font-bold uppercase tracking-widest ${currentTheme.primary} mb-4`}>Join The Network</p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">Apply for Membership</h2>
                <p className="text-white/60 text-lg">
                  We welcome Bitcoin advocates, AI practitioners, researchers, and digital economy enthusiasts.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`p-8 md:p-10 rounded-3xl border ${currentTheme.cardBorder} ${currentTheme.cardBg} backdrop-blur-xl relative`}
              >
                {formState === 'success' ? (
                  <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500" data-testid="form-success">
                    <div className={`w-16 h-16 rounded-full ${currentTheme.primaryBg}/20 flex items-center justify-center mb-6`}>
                      <CheckCircle className={`w-8 h-8 ${currentTheme.primary}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Application Received!</h3>
                    <p className="text-white/60 mb-8 max-w-md">
                      We'll be in touch at <span className="text-white font-medium">{formData.email}</span> within 3–5 business days.
                    </p>
                    <Button onClick={handleFormReset} variant="outline" className={`border-white/10 hover:bg-white/5 text-white bg-transparent`}>
                      Return to Site
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-6" data-testid="application-form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white/80">Full Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className={`w-full bg-black/50 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-shadow ${currentTheme.inputRing}`}
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white/80">Email Address</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className={`w-full bg-black/50 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-shadow ${currentTheme.inputRing}`}
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white/80">Organisation / University</label>
                        <input
                          required
                          type="text"
                          value={formData.org}
                          onChange={(e) => setFormData({...formData, org: e.target.value})}
                          className={`w-full bg-black/50 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-shadow ${currentTheme.inputRing}`}
                          placeholder="e.g. UNIKOP"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-white/80">Role / Profession</label>
                        <input
                          required
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className={`w-full bg-black/50 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-shadow ${currentTheme.inputRing}`}
                          placeholder="e.g. Researcher"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/80">Areas of Interest</label>
                      <div className="relative">
                        <select
                          required
                          value={formData.interest}
                          onChange={(e) => setFormData({...formData, interest: e.target.value})}
                          className={`w-full bg-black/50 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white appearance-none focus:outline-none transition-shadow ${currentTheme.inputRing}`}
                        >
                          <option value="" disabled className="text-white/30">Select an area...</option>
                          <option value="Bitcoin Literacy">Bitcoin Literacy</option>
                          <option value="AI Research">AI Research</option>
                          <option value="Policy Advocacy">Policy Advocacy</option>
                          <option value="Community Building">Community Building</option>
                          <option value="All of the Above">All of the Above</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/80">Why do you want to join?</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.reason}
                        onChange={(e) => setFormData({...formData, reason: e.target.value})}
                        className={`w-full bg-black/50 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-shadow resize-none ${currentTheme.inputRing}`}
                        placeholder="Tell us about your background and what you hope to achieve..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className={`w-full mt-4 h-14 text-lg font-bold ${currentTheme.primaryBg} ${theme === 'mono' ? 'text-black' : 'text-white'} hover:opacity-90 transition-opacity`}
                      data-testid="button-submit-application"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <footer id="contact" className={`border-t ${currentTheme.cardBorder} bg-[#050505]`}>
        <div className="container mx-auto px-4 md:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12" data-testid="footer">
            {/* Left */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-7 h-7 ${theme === 'mono' ? 'bg-zinc-800' : 'bg-orange-500'} rounded-sm flex items-center justify-center flex-shrink-0`}>
                  <span className="font-extrabold text-white text-xs">N</span>
                </div>
                <span className="font-bold tracking-tight text-white/90">Nexus Malaysia</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                Bridging Bitcoin intelligence and AI futures for a resilient digital economy in Malaysia.
              </p>
            </div>

            {/* Middle */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-white tracking-wide uppercase mb-1">Contact</h4>
              <a href="mailto:social@nbaum.org" className={`text-sm text-white/50 hover:${currentTheme.primary} transition-colors`}>
                social@nbaum.org
              </a>
              <a href="https://nexusmalaysia.com" target="_blank" rel="noreferrer" className={`text-sm text-white/50 hover:${currentTheme.primary} transition-colors`}>
                nexusmalaysia.com
              </a>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold text-white tracking-wide uppercase mb-1">Registry</h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Registered under the Registry of Societies (ROS) Malaysia as Pertubuhan Literasi Bitcoin Malaysia.
              </p>
            </div>
          </div>

          <div className={`pt-8 border-t ${currentTheme.cardBorder} flex flex-col md:flex-row items-center justify-between gap-4`}>
            <p className="text-xs text-white/40">
              &copy; 2026 Pertubuhan Literasi Bitcoin Malaysia (Nexus Malaysia). All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
