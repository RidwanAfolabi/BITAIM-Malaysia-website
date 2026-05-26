import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import heroVisual from "../assets/hero-visual.png";
import bitaimLogo from "../assets/bitaim-logo.png";
import {
  Cpu,
  Bitcoin,
  Users,
  MapPin,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Settings,
  CheckCircle,
  Loader2,
  ChevronDown,
  BookOpen,
  Building2,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Bidang Fokus", href: "#focus" },
  { label: "Inisiatif", href: "#initiatives" },
  { label: "Pasukan", href: "#team" },
  { label: "Daftar", href: "#apply" },
  { label: "Hubungi Kami", href: "#contact" },
];

const heroSlides = [
  {
    badge: "Pertubuhan Berdaftar · Malaysia",
    headline: ["Menghubungkan", "Bitcoin", "Intelligence", "& Masa Depan", "AI", "."],
    sub: "Satu ekosistem terbuka untuk pengguna Bitcoin & AI, pendidik, dan pemimpin industri di Malaysia.",
    desc: "Kami merapatkan jurang antara teknologi baru muncul, penyelidikan akademik, dan literasi digital akar umbi.",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&q=80&fit=crop",
    imgAlt: "Bitcoin dan AI visualisasi",
    isFirstBitcoin: true,
    isSecondAI: true,
  },
  {
    badge: "Pendidikan Teknologi · SenangBit",
    headline: ["Memupuk", "Literasi Digital", "untuk", "Malaysia", "Maju", "."],
    sub: "Program latihan AI praktikal dan masterclass perniagaan digital untuk semua peringkat.",
    desc: "Dari bengkel akar umbi hingga kolokium nasional — kami mendidik, kami memperkasa, kami memimpin.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80&fit=crop",
    imgAlt: "Pendidikan digital dan teknologi",
    isFirstBitcoin: false, // "Literasi Digital" in orange
    isSecondAI: false,     // "Malaysia" in cyan
  },
  {
    badge: "Ekosistem · Ko-operatif",
    headline: ["Membina", "Ekosistem", "Bitcoin", "yang", "Berdaulat", "."],
    sub: "Rangkaian rakan-ke-rakan yang berdaulat, boleh diakses oleh setiap rakyat Malaysia.",
    desc: "Ko-operatif berasaskan teknologi, advokasi dasar, dan rangkaian komuniti yang berkembang pesat.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&fit=crop",
    imgAlt: "Rangkaian blockchain global",
    isFirstBitcoin: false, // "Ekosistem" in cyan
    isSecondAI: false,     // "Bitcoin" in orange
  }
];

const testimonials = [
  {
    quote: "BIT-AIM telah membuka mata saya kepada potensi sebenar Bitcoin sebagai alat kebebasan kewangan. Program SenangBit mereka adalah transformatif.",
    name: "Ahmad Faizal",
    title: "Usahawan Teknologi, Kuala Lumpur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop&crop=face",
  },
  {
    quote: "Kolokium BITAI adalah platform terbaik untuk menyatukan pemikir Bitcoin dan AI di Malaysia. Saya kagum dengan kualiti wacana yang dihasilkan.",
    name: "Nurul Ain Zulkifli",
    title: "Penyelidik AI, Universiti Malaya",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b515?w=100&q=80&fit=crop&crop=face",
  },
  {
    quote: "Sebagai pengamal industri, saya melihat BIT-AIM sebagai jambatan penting antara teknologi masa hadapan dan masyarakat umum Malaysia.",
    name: "Dato' Rizal Mansor",
    title: "Pengurus Besar, Syarikat Fintech",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&fit=crop&crop=face",
  },
  {
    quote: "Melalui BIT-AIM, saya berjaya memahami bagaimana AI dan Bitcoin boleh mengubah cara perniagaan dijalankan di negara kita.",
    name: "Siti Hajar Mahmood",
    title: "Pemilik Perniagaan, Pulau Pinang",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80&fit=crop&crop=face",
  }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&q=70&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&q=70&fit=crop",
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&q=70&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&q=70&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&q=70&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&q=70&fit=crop"
];

const statsData = [
  { value: 200, suffix: "+", label: "Ahli Berdaftar" },
  { value: 12, suffix: "", label: "Bandar Merentasi Malaysia" },
  { value: 8, suffix: "+", label: "Program Dijalankan" },
  { value: 1, suffix: "", label: "Kolokium Nasional" }
];

const partners = [
  { name: "MRANTI", desc: "Malaysian Research Accelerator" },
  { name: "UNIKOP", desc: "Universiti Koperasi" },
  { name: "TM One", desc: "Telekom Malaysia" },
  { name: "ROS Malaysia", desc: "Registrar of Societies" },
  { name: "SenangBit", desc: "AI Learning Platform" },
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

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
}

const avatarGradients = [
  "from-orange-500 to-amber-400",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-indigo-500 to-blue-400"
];

function AnimatedCounter({ target, label, suffix }: { target: number, label: string, suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const interval = 16;
      const steps = duration / interval;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="text-4xl md:text-5xl font-black text-orange-500 tracking-tighter mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-white/60 uppercase tracking-widest font-semibold text-center">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("cyber");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [testimonialSlide, setTestimonialSlide] = useState(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    if (isHeroPaused) return;
    const t = setInterval(() => setHeroSlide(s => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [isHeroPaused]);

  useEffect(() => {
    const t = setInterval(() => setTestimonialSlide(s => (s + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

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
      cardGlow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
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

  const sectionReveal = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
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
      title: "AI & Gabungan Blockchain",
      subtitle: "Meneroka Persilangan",
      desc: "Kami menyiasat dan memperjuangkan persilangan teknologi terdesentralisasi dan AI — memfokuskan pada pembayaran global tanpa sempadan, penyelesaian robotik autonomi, dan analitik on-chain mendalam.",
      icon: Cpu,
      accent: theme === "cyber" ? "text-cyan-400" : currentTheme.secondary,
      border: `hover:${currentTheme.cardBorder}`,
      glow: `group-hover:bg-white/5`,
      tag: "DeFi + AI",
      bgImg: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&fit=crop"
    },
    {
      title: "Pendidikan Teknikal",
      subtitle: "Siri Pembelajaran AI SenangBit",
      desc: "Kami mereka dan melaksanakan rangka kerja latihan AI yang praktikal dan berimpak, serta masterclass perniagaan digital untuk meningkatkan kemahiran ahli dan komuniti kami.",
      icon: Bitcoin,
      accent: theme === "cyber" ? "text-orange-500" : currentTheme.primary,
      border: `hover:${currentTheme.cardBorder}`,
      glow: `group-hover:bg-white/5`,
      tag: "EdTech",
      bgImg: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80&fit=crop"
    },
    {
      title: "Ko-operatif & Komuniti",
      subtitle: "Pembinaan Ekosistem",
      desc: "Melalui wacana berstruktur, kolokium nasional, dan sesi rangkaian, kami sedang mewujudkan rangka kerja ko-operatif berasaskan teknologi yang kukuh di Malaysia.",
      icon: Users,
      accent: "text-white",
      border: `hover:${currentTheme.cardBorder}`,
      glow: `group-hover:bg-white/5`,
      tag: "Ko-operatif",
      bgImg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fit=crop"
    },
    {
      title: "Advokasi Serantau",
      subtitle: "Penglibatan Akar Umbi",
      desc: "Kami mendorong advokasi Bitcoin setempat dan pertemuan rangkaian sosial di seluruh hab inovasi berorientasikan teknologi terkemuka di Malaysia.",
      icon: MapPin,
      accent: theme === "cyber" ? "text-orange-400" : currentTheme.primary,
      border: `hover:${currentTheme.cardBorder}`,
      glow: `group-hover:bg-white/5`,
      tag: "Advokasi",
      bgImg: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80&fit=crop"
    }
  ];

  const capabilities = [
    {
      label: "Rangkaian",
      desc: "Membina rangkaian kewangan rakan-ke-rakan yang berdaulat dan boleh diakses oleh setiap rakyat Malaysia.",
      metrics: ["200+ Ahli", "12 Bandar"]
    },
    {
      label: "Halangan",
      desc: "Menghapuskan halangan pendidikan dan akses kepada penggunaan Bitcoin dan AI.",
      metrics: ["8 Program", "3 Institusi"]
    },
    {
      label: "Nod",
      desc: "Mewujudkan nod ilmu di seluruh universiti, pemecut, dan hab kerja bersama.",
      metrics: ["MRANTI", "UNIKOP", "TM One"]
    },
    {
      label: "Impak",
      desc: "Mendorong perubahan dasar yang terukur dan literasi digital akar umbi.",
      metrics: ["2 Kertas Dasar", "1 Kolokium"]
    }
  ];

  const team = [
    { name: "Luqman Hakim", title: "Pengasas & Presiden" },
    { name: "Nazrin Shah", title: "Timbalan Presiden" },
    { name: "Amirul Hadi", title: "Setiausaha Agung" },
    { name: "Zulaikha Rahim", title: "Bendahari" },
    { name: "Dr. Hafiz Zainudin", title: "Ketua Penyelidikan" },
    { name: "Farah Nabilah", title: "Pengarah Program" }
  ];

  const doubledGalleryImages = [...galleryImages, ...galleryImages];

  return (
    <div className={`min-h-[100dvh] ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500 font-sans selection:bg-white/20`} data-testid="page-root">
      
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
                <p className="text-xs font-bold uppercase tracking-wider mb-3 text-white/50">Tema</p>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "cyber", name: "Siber Minimal" },
                    { id: "mono", name: "Mono Kuantum" },
                    { id: "fusion", name: "Gabungan Slate" }
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
          <div className="flex items-center gap-3" data-testid="nav-logo">
            <img src={bitaimLogo} alt="BIT-AIM Logo" className="w-9 h-9 object-contain" />
            <span className="font-bold tracking-tight text-base">BIT-AIM</span>
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
              Hubungi Kami
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
                <div className="flex items-center gap-3">
                  <img src={bitaimLogo} alt="BIT-AIM Logo" className="w-8 h-8 object-contain" />
                  <span className="font-bold tracking-tight text-sm">BIT-AIM</span>
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
                    Hubungi Kami
                  </Button>
                  <p className="text-xs text-center text-white/25 mt-3">bitaim.my</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* 2. Hero Carousel Section */}
        <section 
          id="hero"
          className={`relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden border-b ${currentTheme.cardBorder} min-h-[90vh] flex flex-col justify-center`}
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
        >
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.15, 0.3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-[150px] -right-[150px] w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[100px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.1, 0.2] }}
              transition={{ repeat: Infinity, duration: 8, delay: 2, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-1/4 -right-[100px] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px]"
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.15, 0.2] }}
              transition={{ repeat: Infinity, duration: 10, delay: 1, ease: "easeInOut" }}
            />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={heroSlide}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="lg:col-span-7 flex flex-col gap-8 relative">
                  {/* Floating Badges */}
                  <motion.div
                    className="absolute -top-12 right-12 hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-md text-xs font-bold text-orange-400 uppercase tracking-widest"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    ₿ Piawaian Bitcoin
                  </motion.div>
                  <motion.div
                    className="absolute top-32 -left-8 hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-md text-xs font-bold text-cyan-300 uppercase tracking-widest"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 5, delay: 1, ease: "easeInOut" }}
                  >
                    Dikuasai AI
                  </motion.div>

                  <div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold bg-white/5 border ${currentTheme.cardBorder} rounded-full text-white/60 uppercase tracking-widest`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.primaryBg} animate-pulse`} />
                      {heroSlides[heroSlide].badge}
                    </span>
                  </div>

                  <div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
                      {heroSlides[heroSlide].headline.map((word, i) => {
                        let isOrange = false;
                        let isCyan = false;
                        
                        if (heroSlide === 0) {
                          if (word === "Bitcoin") isOrange = true;
                          if (word === "AI") isCyan = true;
                        } else if (heroSlide === 1) {
                          if (word === "Literasi Digital") isOrange = true;
                          if (word === "Malaysia") isCyan = true;
                        } else if (heroSlide === 2) {
                          if (word === "Bitcoin") isOrange = true;
                          if (word === "Ekosistem") isCyan = true;
                        }

                        if (isOrange) {
                          return (
                            <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400" style={{ textShadow: "0 0 40px rgba(249,115,22,0.4)" }}>
                              {word}{" "}
                            </span>
                          );
                        }
                        if (isCyan) {
                          return (
                            <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" style={{ textShadow: "0 0 40px rgba(34,211,238,0.4)" }}>
                              {word}{" "}
                            </span>
                          );
                        }
                        return <span key={i}>{word} </span>;
                      })}
                    </h1>
                    <div className="h-px w-24 bg-gradient-to-r from-orange-500 to-cyan-400 mt-8 opacity-70 animate-pulse" />
                  </div>

                  <p className="text-xl md:text-2xl text-white/70 font-medium leading-snug max-w-xl">
                    {heroSlides[heroSlide].sub}
                  </p>

                  <p className="text-base text-white/50 max-w-lg leading-relaxed">
                    {heroSlides[heroSlide].desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      size="lg"
                      onClick={() => smoothScrollTo("#focus")}
                      className={`${currentTheme.primaryBg} hover:opacity-90 ${theme === 'mono' ? 'text-black' : 'text-white'} font-semibold h-14 px-8 text-base`}
                    >
                      Jelajahi Inisiatif
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => smoothScrollTo("#apply")}
                      className={`border-white/15 hover:bg-white/5 hover:border-white/30 h-14 px-8 font-semibold text-white bg-transparent text-base`}
                    >
                      Mohon Keahlian
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5 hidden lg:block">
                  <div className="relative w-full aspect-square rounded-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
                    <img 
                      src={heroSlides[heroSlide].img} 
                      alt={heroSlides[heroSlide].imgAlt}
                      className="relative z-10 w-full h-full object-cover rounded-3xl opacity-90 shadow-2xl border border-white/10" 
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex items-center gap-4 mt-12 lg:mt-16">
              <Button variant="outline" size="icon" className="border-white/20 bg-white/5 text-white hover:bg-white/10" onClick={() => setHeroSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {heroSlides.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setHeroSlide(i)}
                    className={`h-2 rounded-full transition-all ${i === heroSlide ? 'w-8 bg-orange-500' : 'w-2 bg-white/20 hover:bg-white/40'}`} 
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" className="border-white/20 bg-white/5 text-white hover:bg-white/10" onClick={() => setHeroSlide((s) => (s + 1) % heroSlides.length)}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <motion.div
            key={heroSlide}
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="text-[10px] font-bold uppercase tracking-widest">Tatal</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </section>

        {/* Stats Counter Section */}
        <section id="stats" className="py-12 border-b border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
              {statsData.map((stat, i) => (
                <AnimatedCounter key={i} target={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. About Section */}
        <section id="about" className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionReveal}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-white/20" /> Misi Kami · Membina Literasi Digital dari Akar Umbi
                </h3>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
                  Di Sini Kecerdasan <span className={theme === 'fusion' ? 'text-[#D4AF37]' : 'text-orange-500'}>Bertemu Desentralisasi.</span>
                </h2>
                <div className="space-y-6 text-lg text-white/60 leading-relaxed font-medium">
                  <p>
                    Didaftarkan secara rasmi sebagai <em className="text-white/80">Pertubuhan Literasi Bitcoin & AI (Malaysia)</em>, BIT-AIM berfungsi sebagai ekosistem bersatu yang menghimpunkan profesional industri, ahli akademik, dan pengguna biasa.
                  </p>
                  <p>
                    Kami komited untuk menghapuskan salah faham tentang aset terdesentralisasi dan kecerdasan buatan, mengubahnya menjadi laluan yang jelas dan mudah diakses untuk pertumbuhan ekonomi negara dan pendidikan teknikal.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4">
                  {["Pertubuhan Berdaftar", "Perkongsian Akademik", "Wakil Industri", "Dipacu Komuniti"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${theme === 'cyber' ? 'text-cyan-400' : currentTheme.primary}`} />
                      <span className="text-sm font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className={`absolute -inset-4 ${currentTheme.cardBg} rounded-[2rem] transform rotate-3 scale-105 opacity-50 border ${currentTheme.cardBorder}`} />
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80&fit=crop" 
                  alt="BIT-AIM Community" 
                  className="relative z-10 w-full rounded-2xl shadow-xl border border-white/10"
                />
                <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. Focus Areas */}
        <section id="focus" className="py-24 md:py-32 relative bg-white/[0.02] border-y border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mb-16">
              <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-white/20" /> Apa Yang Kami Lakukan
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Bidang Fokus Utama
              </h2>
              <p className="text-lg text-white/60">
                Kami beroperasi di persimpangan kewangan terdesentralisasi dan kecerdasan buatan, membina infrastruktur kukuh untuk masa depan digital Malaysia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {focusCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`group relative overflow-hidden rounded-2xl border ${currentTheme.cardBorder} bg-black/40 p-8 md:p-10 transition-all duration-300 ${card.border} ${card.glow}`}
                >
                  <img src={card.bgImg} alt={card.title} className="absolute inset-0 w-full h-full object-cover opacity-[0.07] rounded-2xl pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${card.accent}`}>
                        <card.icon className="w-8 h-8" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border border-white/10 bg-white/5 text-white/70`}>
                        {card.tag}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold tracking-wider uppercase text-white/50 mb-2">
                      {card.subtitle}
                    </h4>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white/90 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed font-medium mt-auto">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Capabilities Matrix */}
        <section id="capabilities" className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-16">
              <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-white/20" /> Apa Yang Kami Perkasakan
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Keupayaan Strategik</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
              {capabilities.map((cap, i) => (
                <div key={i} className={`${currentTheme.bg} p-8 lg:p-10 flex flex-col hover:bg-white/[0.03] transition-colors`}>
                  <div className={`text-4xl font-black mb-6 ${currentTheme.primary} opacity-30`}>0{i+1}</div>
                  <h3 className="text-xl font-bold mb-4">{cap.label}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-8 flex-1">{cap.desc}</p>
                  <div className="space-y-2 mt-auto">
                    {cap.metrics.map((metric, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Strip */}
        <section className="py-12 overflow-hidden border-y border-white/5 bg-white/[0.01]">
          <motion.div
            className="flex gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            style={{ width: "200%" }}
          >
            {doubledGalleryImages.map((src, i) => (
              <img 
                key={i} 
                src={src} 
                alt="Gallery Event" 
                className="h-48 w-72 rounded-xl object-cover opacity-80 hover:opacity-100 transition-opacity flex-shrink-0 border border-white/10"
              />
            ))}
          </motion.div>
        </section>

        {/* 6. CTA Banner */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-cyan-500/10 pointer-events-none" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto">
              Bersedia Membentuk Masa Depan Digital Malaysia?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Sertai komuniti pengamal Bitcoin, penyelidik AI, dan peguam ekonomi digital.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                onClick={() => smoothScrollTo("#apply")}
                className={`${currentTheme.primaryBg} ${theme === 'mono' ? 'text-black' : 'text-white'} hover:opacity-90 font-bold h-14 px-10 text-lg shadow-xl`}
              >
                Mohon Keahlian
              </Button>
              <span className="text-sm text-white/40">
                Atau hubungi kami di <a href="mailto:social@nbaum.org" className="text-white hover:underline">social@nbaum.org</a>
              </span>
            </div>
          </div>
        </section>

        {/* Testimonials Slider */}
        <section id="testimonials" className="py-24 md:py-32 relative bg-white/[0.02] border-y border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-white/20" /> Suara Komuniti
                </h3>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  Apa Kata Mereka
                </h2>
              </div>
              <div className="hidden md:flex gap-3">
                <Button variant="outline" size="icon" className="border-white/10 bg-transparent text-white" onClick={() => setTestimonialSlide((s) => (s - 1 + testimonials.length) % testimonials.length)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-white/10 bg-transparent text-white" onClick={() => setTestimonialSlide((s) => (s + 1) % testimonials.length)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden">
              <motion.div 
                className="flex gap-6"
                initial={false}
                animate={{ x: `calc(-${testimonialSlide * 100}% - ${testimonialSlide * 24}px)` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className={`min-w-full md:min-w-[calc(50%-12px)] flex-shrink-0 p-8 rounded-2xl border ${currentTheme.cardBorder} bg-black/40 relative`}>
                    <Quote className="absolute top-8 right-8 w-16 h-16 text-white/[0.05] rotate-180" />
                    <p className="text-lg text-white/80 font-medium leading-relaxed mb-8 relative z-10">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                      <div>
                        <h4 className="font-bold text-white">{t.name}</h4>
                        <p className="text-sm text-white/50">{t.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. Initiatives Section */}
        <section id="initiatives" className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-16">
              <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-white/20" /> Operasi Semasa
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Inisiatif Akan Datang</h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionReveal}
              className={`rounded-3xl border ${currentTheme.cardBorder} bg-white/[0.02] overflow-hidden`}
            >
              <div className="h-64 md:h-96 w-full relative">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80&fit=crop" alt="BITAI Kolokium" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 md:left-10 z-10">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold ${currentTheme.primaryBg} text-white uppercase tracking-widest rounded-full mb-4`}>
                    Acara Utama
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black text-white">BITAI Kolokium</h3>
                </div>
              </div>

              <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-6">
                  <p className="text-xl text-white/70 font-medium leading-relaxed">
                    Sebuah kolokium nasional yang menyatukan pengamal Bitcoin, penyelidik AI, pembuat dasar, dan penggemar teknologi dalam satu platform wacana berkuasa tinggi.
                  </p>
                  
                  <div className="flex flex-col gap-2 p-6 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-bold uppercase text-white/40 tracking-wider">Status Semasa</span>
                    <span className="font-semibold text-white/90">Logistik dan rangka kerja sedang dalam pembangunan</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <span className="text-xs font-bold uppercase text-white/40 tracking-wider block mb-4">Rakan Kongsi:</span>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
                          <Building2 className="w-5 h-5 text-white/60" />
                        </div>
                        <span className="font-semibold text-white/80">MRANTI</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
                          <BookOpen className="w-5 h-5 text-white/60" />
                        </div>
                        <span className="font-semibold text-white/80">UNIKOP</span>
                      </div>
                    </div>
                  </div>

                  <Button className={`w-full ${currentTheme.primaryBg} hover:opacity-90 ${theme === 'mono' ? 'text-black' : 'text-white'} font-bold`}>
                    Daftar Minat
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 8. Team Section */}
        <section id="team" className="py-24 md:py-32 relative bg-white/[0.02] border-y border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-white/20" /> Kepimpinan <span className="w-8 h-px bg-white/20" />
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Orang-Orang Di Sebalik BIT-AIM</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full mb-6 relative border-2 ${currentTheme.cardBorder} p-1 overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center`}>
                      <span className="text-2xl md:text-3xl font-black text-white/90 shadow-sm">{getInitials(member.name)}</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">{member.name}</h4>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${theme === 'cyber' ? 'text-cyan-400' : currentTheme.primary}`}>{member.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Application Form */}
        <section id="apply" className="py-24 md:py-32 relative">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-white/20" /> Sertai Rangkaian <span className="w-8 h-px bg-white/20" />
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Mohon Keahlian</h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Kami mengalu-alukan penyokong Bitcoin, pengamal AI, penyelidik, dan peminat ekonomi digital.
              </p>
            </div>

            <div className={`rounded-3xl border ${currentTheme.cardBorder} bg-black/40 p-8 md:p-12 relative overflow-hidden`}>
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className={`w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6`}>
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Permohonan Diterima!</h3>
                    <p className="text-white/60 mb-8 max-w-md">
                      Kami akan menghubungi anda di <span className="text-white font-medium">{formData.email}</span> dalam masa 3–5 hari bekerja.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleFormReset}
                      className="border-white/20 text-white bg-transparent hover:bg-white/10"
                    >
                      Kembali ke Laman
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-white/80">Nama Penuh</label>
                        <input
                          required
                          type="text"
                          className={`w-full bg-white/5 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ${currentTheme.inputRing} transition-all`}
                          placeholder="cth. Ahmad Albab"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-white/80">Alamat E-mel</label>
                        <input
                          required
                          type="email"
                          className={`w-full bg-white/5 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ${currentTheme.inputRing} transition-all`}
                          placeholder="cth. ahmad@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-white/80">Organisasi / Universiti</label>
                        <input
                          required
                          type="text"
                          className={`w-full bg-white/5 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ${currentTheme.inputRing} transition-all`}
                          placeholder="Tempat anda berkhidmat/belajar"
                          value={formData.org}
                          onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-white/80">Jawatan / Profesion</label>
                        <input
                          required
                          type="text"
                          className={`w-full bg-white/5 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ${currentTheme.inputRing} transition-all`}
                          placeholder="cth. Penyelidik AI, Pelajar"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white/80">Bidang Minat</label>
                      <select
                        required
                        className={`w-full bg-[#1A1F2E] border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ${currentTheme.inputRing} transition-all appearance-none`}
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      >
                        <option value="" disabled>Pilih minat utama anda</option>
                        <option value="bitcoin">Literasi Bitcoin</option>
                        <option value="ai">Penyelidikan AI</option>
                        <option value="policy">Advokasi Dasar</option>
                        <option value="community">Pembinaan Komuniti</option>
                        <option value="all">Semua Perkara Di Atas</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white/80">Kenapa anda ingin menyertai?</label>
                      <textarea
                        required
                        rows={4}
                        className={`w-full bg-white/5 border ${currentTheme.cardBorder} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ${currentTheme.inputRing} transition-all resize-none`}
                        placeholder="Kongsi sedikit tentang matlamat anda..."
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={formState === "submitting"}
                      className={`w-full h-14 text-lg font-bold ${currentTheme.primaryBg} hover:opacity-90 ${theme === 'mono' ? 'text-black' : 'text-white'}`}
                    >
                      {formState === "submitting" ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Menghantar...
                        </>
                      ) : (
                        "Hantar Permohonan"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Partners Strip */}
        <section id="partners" className="py-16 border-t border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-8">Rakan Ekosistem</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {partners.map((p, i) => (
                <div key={i} className={`px-6 py-4 rounded-xl border ${currentTheme.cardBorder} bg-black/30 hover:bg-white/5 transition-all group cursor-default`}>
                  <div className="text-lg font-bold text-white/90 group-hover:text-white">{p.name}</div>
                  <div className="text-xs text-white/40">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="contact" className={`py-12 md:py-16 border-t ${currentTheme.cardBorder} bg-black relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <img src={bitaimLogo} alt="BIT-AIM Logo" className="w-10 h-10 object-contain grayscale opacity-80" />
                <span className="font-bold tracking-tight text-xl">BIT-AIM</span>
              </div>
              <p className="text-white/50 text-sm max-w-sm leading-relaxed">
                Menghubungkan Bitcoin & AI untuk Malaysia.<br />
                Membina ekosistem literasi digital, pendidikan teknikal, dan teknologi terdesentralisasi.
              </p>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Hubungi Kami</h4>
              <ul className="space-y-4">
                <li><a href="mailto:social@nbaum.org" className="text-white/50 hover:text-white transition-colors text-sm">social@nbaum.org</a></li>
                <li><a href="#" className="text-white/50 hover:text-white transition-colors text-sm">Kuala Lumpur, Malaysia</a></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Pendaftaran</h4>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 leading-relaxed">
                  Didaftarkan di bawah ROS Malaysia sebagai pertubuhan bukan untung.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © 2026 Pertubuhan Literasi Bitcoin & AI (Malaysia) (BIT-AIM). Hak cipta terpelihara.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-xs text-white/40 hover:text-white">Terma</a>
              <a href="#" className="text-xs text-white/40 hover:text-white">Privasi</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
