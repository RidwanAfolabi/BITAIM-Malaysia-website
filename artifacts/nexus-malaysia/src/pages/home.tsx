import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ChevronRight, 
  Cpu, 
  Bitcoin, 
  Library, 
  Landmark,
  ArrowRight,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Animation variants
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
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* 1. Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" data-testid="nav-logo">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="font-bold text-white tracking-tighter">N</span>
            </div>
            <span className="font-bold tracking-tight text-lg">NEXUS MALAYSIA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-about">About</a>
            <a href="#focus" className="text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-focus">Focus Areas</a>
            <a href="#initiatives" className="text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-initiatives">Initiatives</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-contact">Contact</a>
          </nav>

          <div className="hidden md:flex">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:text-primary transition-colors" data-testid="button-nav-cta">
              Join the Network
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-white/5">
          {/* Subtle background glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div 
                className="lg:col-span-7 flex flex-col gap-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn} className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-semibold bg-white/5 border border-white/10 rounded-full text-muted-foreground uppercase tracking-wider">
                    Institutional Grade
                  </span>
                </motion.div>
                
                <motion.h1 
                  variants={fadeIn}
                  className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
                  data-testid="hero-heading"
                >
                  Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Bitcoin</span> Intelligence <br className="hidden md:block"/>
                  & <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-400">AI</span> Futures.
                </motion.h1>
                
                <motion.p 
                  variants={fadeIn}
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed"
                  data-testid="hero-description"
                >
                  Pertubuhan Literasi Bitcoin Malaysia is a registered nonprofit advancing digital sovereignty and artificial intelligence. We shape policy, fund research, and educate the next generation of Malaysian innovators.
                </motion.p>
                
                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8" data-testid="button-hero-primary">
                    Explore Our Initiatives
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 h-12 px-8 font-semibold" data-testid="button-hero-secondary">
                    Learn About Us
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="lg:col-span-5 hidden lg:block"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Abstract Data Representation */}
                <div className="relative w-full aspect-square border border-white/5 rounded-2xl bg-black/40 overflow-hidden flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="grid grid-cols-4 gap-4 w-full h-full relative z-10 opacity-70">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-sm border border-white/10 ${i % 3 === 0 ? 'bg-primary/10' : i % 5 === 0 ? 'bg-secondary/10' : 'bg-white/5'}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Introduction Banner */}
        <section id="about" className="border-b border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4 md:px-8 py-8 md:py-10">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-16 text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center" data-testid="credibility-banner">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Registered Nonprofit</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Academic Partnerships</span>
              </div>
              <div className="hidden md:block w-px h-5 bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span>Community-Driven</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Core Focus Grid */}
        <section id="focus" className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-16 max-w-2xl"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Core Focus Areas</h2>
              <p className="text-muted-foreground text-lg">We operate at the convergence of decentralized finance and artificial intelligence, building robust infrastructure for Malaysia's future.</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              data-testid="focus-grid"
            >
              {[
                {
                  title: "Bitcoin Literacy",
                  desc: "Public education on Bitcoin for everyday Malaysians, demystifying financial sovereignty through workshops, translated resources, and community meetups.",
                  icon: Bitcoin,
                  color: "text-primary"
                },
                {
                  title: "AI Intelligence",
                  desc: "Research and practical AI application programs. We empower developers and institutions to harness open-source AI models securely.",
                  icon: Cpu,
                  color: "text-secondary"
                },
                {
                  title: "Academic Collaboration",
                  desc: "Partnerships with Malaysian universities and research bodies to publish peer-reviewed papers on the intersection of blockchain and machine learning.",
                  icon: Library,
                  color: "text-white"
                },
                {
                  title: "Policy Advocacy",
                  desc: "Engaging regulators and policymakers to craft informed, innovation-friendly digital frameworks that protect consumers while fostering growth.",
                  icon: Landmark,
                  color: "text-white/70"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeIn}
                  className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  data-testid={`card-focus-${i}`}
                >
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. Initiatives Highlight */}
        <section id="initiatives" className="py-24 md:py-32 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
          {/* Subtle noise/texture overlay would go here in a real build */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-4xl border border-primary/20 rounded-3xl p-8 md:p-12 bg-black/50 backdrop-blur-sm relative overflow-hidden"
              data-testid="initiatives-highlight"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Flagship Event
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Nexus Colloquium 2026</h2>
                  <p className="text-xl text-muted-foreground mb-4">A National Discourse on Bitcoin & AI</p>
                  <p className="text-sm text-white/50 flex items-center gap-2 font-mono">
                    <span>Oct 14-15, 2026</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>Kuala Lumpur</span>
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <Button size="lg" className="w-full md:w-auto bg-white text-black hover:bg-white/90 font-bold" data-testid="button-event-register">
                    Register Interest
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer id="contact" className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6" data-testid="footer">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="font-bold text-lg tracking-tight text-white/90">NEXUS MALAYSIA</span>
            <span className="text-sm text-muted-foreground">Registry: Pertubuhan Literasi Bitcoin Malaysia (ROB Registered)</span>
          </div>
          
          <div className="text-sm text-muted-foreground flex flex-col items-center md:items-end gap-2">
            <a href="mailto:info@nexusmalaysia.com" className="hover:text-primary transition-colors" data-testid="link-email">info@nexusmalaysia.com</a>
            <span>© 2026 Nexus Malaysia. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
