import { motion } from "framer-motion";
import {
  ChevronRight,
  Cpu,
  Bitcoin,
  Users,
  MapPin,
  ArrowRight,
  Menu,
  Mail,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
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
      accent: "text-secondary",
      border: "hover:border-secondary/30",
      glow: "group-hover:bg-secondary/5"
    },
    {
      title: "Technical Education",
      subtitle: "SenangBit AI Learning Series",
      desc: "We design and deploy practical, actionable AI training frameworks and digital business masterclasses to upskill our members and communities.",
      icon: Bitcoin,
      accent: "text-primary",
      border: "hover:border-primary/30",
      glow: "group-hover:bg-primary/5"
    },
    {
      title: "Co-operative & Community",
      subtitle: "Ecosystem Building",
      desc: "Through structured discourses, national colloquiums, and networking sessions, we are establishing a resilient, tech-driven co-operative framework in Malaysia.",
      icon: Users,
      accent: "text-white",
      border: "hover:border-white/20",
      glow: "group-hover:bg-white/[0.03]"
    },
    {
      title: "Regional Advocacy",
      subtitle: "Grassroots Engagement",
      desc: "We drive localized Bitcoin advocacy and social-networking meetups across Malaysia's leading tech-oriented innovation hubs.",
      icon: MapPin,
      accent: "text-primary/80",
      border: "hover:border-primary/20",
      glow: "group-hover:bg-primary/[0.03]"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">

      {/* 1. Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5" data-testid="nav-logo">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="font-extrabold text-white tracking-tighter text-sm">N</span>
            </div>
            <span className="font-bold tracking-tight text-base">NEXUS MALAYSIA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { label: "About Us", href: "#about" },
              { label: "Focus Areas", href: "#focus" },
              { label: "Initiatives", href: "#initiatives" },
              { label: "Contact Us", href: "#contact" }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                data-testid={`link-${item.href.slice(1)}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button
              variant="outline"
              className="border-white/10 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
              data-testid="button-nav-cta"
            >
              Connect With Us
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-44 md:pb-36 overflow-hidden border-b border-white/5">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[140px] -z-10 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[140px] -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                className="lg:col-span-7 flex flex-col gap-7"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn}>
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold bg-white/5 border border-white/10 rounded-full text-muted-foreground uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Registered Nonprofit · Malaysia
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeIn}
                  className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
                  data-testid="hero-heading"
                >
                  Intelligence Meets{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                    Decentralisation.
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeIn}
                  className="text-xl md:text-2xl text-white/70 font-medium leading-snug max-w-xl"
                  data-testid="hero-subheadline"
                >
                  An open confluence of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-400">
                    Bitcoin &amp; AI
                  </span>{" "}
                  users, educators, and industry leaders in Malaysia.
                </motion.p>

                <motion.p
                  variants={fadeIn}
                  className="text-base text-muted-foreground max-w-lg leading-relaxed"
                  data-testid="hero-description"
                >
                  We bridge the gap between emerging technology, academic research, and grassroots digital literacy to build a future-proof ecosystem.
                </motion.p>

                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8"
                    data-testid="button-hero-primary"
                  >
                    Explore Initiatives
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/15 hover:bg-white/5 hover:border-white/30 h-12 px-8 font-semibold"
                    data-testid="button-hero-secondary"
                  >
                    Partner With Us
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="lg:col-span-5 hidden lg:block"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <div className="relative w-full aspect-square border border-white/5 rounded-2xl bg-black/40 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:22px_22px]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                  <div className="grid grid-cols-4 gap-3 w-4/5 h-4/5 relative z-10">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`rounded-md border ${
                          i % 5 === 0
                            ? "border-primary/30 bg-primary/10"
                            : i % 7 === 0
                            ? "border-secondary/30 bg-secondary/10"
                            : "border-white/8 bg-white/[0.03]"
                        }`}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 3 + (i % 3),
                          repeat: Infinity,
                          delay: i * 0.15
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. About / Introduction Banner */}
        <section id="about" className="border-b border-white/5 bg-white/[0.015]">
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.p variants={fadeIn} className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                Our Mission
              </motion.p>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-snug" data-testid="about-heading">
                Building Digital Literacy from the Ground Up
              </motion.h2>
              <motion.p variants={fadeIn} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10" data-testid="about-description">
                Officially registered as{" "}
                <span className="text-white/80 italic">Pertubuhan Literasi Bitcoin Malaysia</span>,{" "}
                Nexus Malaysia serves as a unified ecosystem bringing together industry professionals, academia, and everyday users. We are dedicated to dispelling misconceptions surrounding decentralized assets and artificial intelligence, transforming them into clear, accessible pathways for national economic growth and technical education.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-xs font-semibold text-muted-foreground uppercase tracking-widest"
                data-testid="credibility-banner"
              >
                {[
                  { dot: "bg-primary", label: "Registered Nonprofit" },
                  { dot: "bg-secondary", label: "Academic Partnerships" },
                  { dot: "bg-white/40", label: "Industry Representation" },
                  { dot: "bg-primary/60", label: "Community-Driven" }
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
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">What We Do</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">Core Focus Areas</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
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
                  className={`group relative p-8 rounded-2xl border border-white/8 bg-white/[0.02] ${item.border} ${item.glow} transition-all duration-300`}
                  data-testid={`card-focus-${i}`}
                >
                  <div className="mb-5 inline-flex p-3 rounded-xl bg-white/5 border border-white/8 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className={`w-5 h-5 ${item.accent}`} />
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${item.accent} opacity-70`}>
                    {item.subtitle}
                  </p>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. Initiatives Highlight */}
        <section id="initiatives" className="py-24 md:py-36 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-1/3 h-full bg-gradient-to-r from-secondary/5 to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mb-12 max-w-xl"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Current Operations</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Upcoming Initiatives</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-4xl border border-primary/25 rounded-3xl p-8 md:p-12 bg-black/60 backdrop-blur-sm relative overflow-hidden"
              data-testid="initiatives-highlight"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    Flagship Event
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight" data-testid="event-title">
                    The BITAI Colloquium
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-lg">
                    An upcoming premium event bringing together over 200 tech leaders, innovators, and policymakers to chart the future of Bitcoin and AI in the region.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {["MRANTI", "UNIKOP"].map((partner) => (
                      <span
                        key={partner}
                        className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/60 uppercase tracking-wider"
                        data-testid={`partner-${partner.toLowerCase()}`}
                      >
                        {partner}
                      </span>
                    ))}
                    <span className="px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-xs text-white/30 italic">
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
      </main>

      {/* 6. Footer */}
      <footer id="contact" className="border-t border-white/8 bg-black/80">
        <div className="container mx-auto px-4 md:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12" data-testid="footer">
            {/* Left */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="font-extrabold text-white text-xs">N</span>
                </div>
                <span className="font-bold tracking-tight text-white/90">Nexus Malaysia</span>
              </div>
              <p className="text-xs text-white/40 italic">Pertubuhan Literasi Bitcoin Malaysia</p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Advancing digital literacy, industry representation, and institutional collaboration.
              </p>
            </div>

            {/* Middle */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">Contact</p>
              <a
                href="mailto:social@nbaum.org"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                social@nbaum.org
              </a>
              <a
                href="https://nexusmalaysia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-website"
              >
                <Globe className="w-4 h-4 flex-shrink-0" />
                nexusmalaysia.com
              </a>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">Registry</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Registered under the Registry of Societies (ROS) Malaysia.
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-white/25 text-center md:text-left">
              © 2026 Pertubuhan Literasi Bitcoin Malaysia (Nexus Malaysia). All rights reserved.
            </p>
            <p className="text-xs text-white/20">nexusmalaysia.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
