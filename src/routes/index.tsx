import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Instagram,
  Linkedin,
  Mail,
  Smartphone,
  Sparkles,
  Palette,
  Video,
  Megaphone,
  Target,
  TrendingUp,
  Camera,
  Layers,
  Film,
  Star,
  Zap,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ani Creative Studio Agencia Creativa de Marketing" },
      {
        name: "description",
        content:
          "Gestión integral de redes sociales para pequeñas y medianas marcas. Estrategia, diseño, edición, publicación y análisis todo en una sola persona.",
      },
      { property: "og:title", content: "Ani Creative Studio Agencia Creativa de Marketing" },
      {
        property: "og:description",
        content: "Gestión integral de redes sociales para pequeñas y medianas marcas.",
      },
    ],
  }),
  component: LandingPage,
});

/* ---------------- Preloader ---------------- */
function Preloader() {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (n >= 100) {
      const t1 = setTimeout(() => setLeaving(true), 250);
      const t2 = setTimeout(() => setGone(true), 1100);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    const step = n < 70 ? 22 : n < 90 ? 45 : 70;
    const t = setTimeout(() => setN((v) => Math.min(100, v + Math.ceil(Math.random() * 7) + 1)), step);
    return () => clearTimeout(t);
  }, [n]);

  if (gone) return null;
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex items-end justify-between bg-ink px-6 pb-8 text-ink-foreground md:px-12 md:pb-12"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.9s cubic-bezier(0.7,0,0.2,1)",
      }}
    >
      <img src="/logo.png" alt="Ani Creative Studio" className="h-12 w-auto md:h-16 mb-2" />
      <span
        className="font-display tabular-nums text-white"
        style={{ fontSize: "clamp(4rem, 14vw, 12rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
      >
        {String(n).padStart(3, "0")}
        <span className="text-white/40">%</span>
      </span>
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  const links = [
    ["Inicio", "#home"],
    ["Sobre mí", "#porque"],
    ["Trabajos", "#trabajos"],
    /*  ["Testimonios", "#reviews"],*/
    ["Planes", "#planes"],
  ];
  const [open, setOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      ScrollTrigger.refresh();
      const st = ScrollTrigger.getAll().find((s) => s.trigger === target || s.vars.trigger === target);
      const top = st ? st.start : target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-[#3D0E20]/92 shadow-[0_8px_32px_rgba(61,14,32,0.35)] backdrop-blur-xl transition-all duration-500">
        <div className="flex items-center justify-between px-5 py-3 md:px-8 md:py-3.5">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group transition-transform duration-300 hover:scale-105"
          >
            <img src="/logo.png" alt="Ani Creative Studio" className="h-6 w-auto md:h-9" />
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map(([l, h], i) => (
              <a
                key={h}
                href={h}
                onClick={(e) => handleNavClick(e, h)}
                className="nav-link text-[13px] font-medium text-white/70 transition-colors hover:text-white"
                style={{
                  animation: `nav-link-in 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.07}s both`,
                }}
              >
                {l}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className="hidden rounded-full bg-magenta px-5 py-2 text-[13px] font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-xl md:inline-block"
            style={{ animation: "pulse-glow 3s ease-in-out infinite, nav-link-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both" }}
          >
            Contáctame
          </a>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className="h-[1.5px] w-5 rounded-full bg-white transition-all duration-300"
              style={{
                transform: open ? "translateY(3px) rotate(45deg)" : "translateY(0) rotate(0)",
              }}
            />
            <span
              className="h-[1.5px] w-5 rounded-full bg-white transition-all duration-300"
              style={{
                transform: open ? "translateY(-3px) rotate(-45deg)" : "translateY(0) rotate(0)",
                opacity: open ? 1 : 1,
              }}
            />
          </button>
        </div>

        {/* Mobile menu drop-down inside the pill */}
        <div
          className="overflow-hidden md:hidden"
          style={{
            maxHeight: open ? "400px" : "0px",
            opacity: open ? 1 : 0,
            transition: "max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease",
          }}
        >
          <div className="flex flex-col border-t border-white/10 px-6 pb-6 pt-2">
            {links.map(([l, h], i) => (
              <a
                key={h}
                href={h}
                onClick={(e) => handleNavClick(e, h)}
                className="border-b border-white/10 py-3 text-sm text-white/80 transition-all hover:pl-2 hover:text-white"
                style={{
                  animation: open ? `nav-link-in 0.4s ease ${i * 0.06}s both` : "none",
                }}
              >
                {l}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, "#contacto")}
              className="mt-5 inline-block rounded-full bg-magenta px-5 py-3 text-center text-sm font-medium text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              Quiero empezar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Reveal on scroll ---------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ---------------- Hero Carousel data ---------------- */
const heroProjects = [
  { title: "Save the Date Wedding Video", subtitle: "Cinematic Couple Session", id: "245861779", cat: "Video" },
  { title: "Fashion Editorial Photography", subtitle: "Full Body Looks", id: "245823383", cat: "Fotografía" },
  { title: "Behind the Scenes", subtitle: "Fashion Editorial en Locación", id: "245582333", cat: "Fotografía" },
  { title: "Fashion Video", subtitle: "Look de Noche en Interior", id: "242964371", cat: "Video" },
  { title: "Paco Yonque", subtitle: "Un viaje a través de su atmósfera", id: "232174275", cat: "Reels" },
  { title: "Arte con sabor a identidad", subtitle: "Contenido Audiovisual", id: "232092363", cat: "Video" },
];

/* ---------------- Hero Carousel ---------------- */
function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [idx, setIdx] = useState(0);
  const cardW = 380;
  const gap = 20;

  const scrollTo = useCallback(
    (i: number) => {
      if (!trackRef.current) return;
      const target = i * (cardW + gap);
      trackRef.current.scrollTo({ left: target, behavior: "smooth" });
      setIdx(i);
    },
    [],
  );

  const prev = () => scrollTo(Math.max(0, idx - 1));
  const next = () => scrollTo(Math.min(heroProjects.length - 1, idx + 1));

  return (
    <div className="mt-14 md:mt-20">
      {/* Header + arrows */}
      <div className="mx-auto flex max-w-[1400px] items-end justify-between px-6 md:px-10">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/50">Proyectos destacados</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-all hover:border-magenta hover:bg-magenta hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-all hover:border-magenta hover:bg-magenta hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="carousel-track mt-6 flex gap-5 overflow-x-auto px-6 pb-6 md:px-10"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {heroProjects.map((p, i) => (
          <a
            key={p.id}
            href={`https://www.behance.net/gallery/${p.id}/project`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-[85vw] shrink-0 flex-col overflow-hidden border border-foreground/10 bg-white transition-shadow hover:shadow-xl sm:w-[380px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <iframe
                src={`https://www.behance.net/embed/project/${p.id}?ilo0=1`}
                className="pointer-events-none h-full w-full overflow-hidden"
                style={{ overflow: "hidden" }}
                scrolling="no"
                allowFullScreen
                loading="lazy"
                frameBorder={0}
                allow="clipboard-write"
                referrerPolicy="strict-origin-when-cross-origin"
                title={p.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-foreground/10 p-4">
              <div>
                <div className="font-display text-sm font-medium">{p.title}</div>
                <div className="text-xs text-foreground/55">{p.subtitle}</div>
              </div>
              <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                {p.cat}
              </span>
            </div>
          </a>
        ))}
        <div className="w-4 shrink-0" />
      </div>

      {/* Progress dots */}
      <div className="mx-auto flex max-w-[1400px] gap-1.5 px-6 md:px-10">
        {heroProjects.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: idx === i ? "32px" : "8px",
              backgroundColor: idx === i ? "var(--magenta)" : "rgba(0,0,0,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const lines = ["Tu marca en redes,", "con estrategia", "real."];
  return (
    <>
      <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 pb-8 md:pt-24 md:pb-10">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0 bg-black">
          <img src="/portada.jpeg" alt="Ani Creative Studio Portada 1" className="carousel-img" />
          <img src="/portada2.png" alt="Ani Creative Studio Portada 2" className="carousel-img" />
          <img src="/portada3.png" alt="Ani Creative Studio Portada 3" className="carousel-img" />
          {/* Dark Overlays for text contrast */}
          <div className="absolute inset-0 bg-[#3D0E20]/35 mix-blend-multiply" />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(61, 14, 32, 0.15) 20%, rgba(61, 14, 32, 0.85) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 text-center md:px-10 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/95">

            <span className="hidden h-px w-8 bg-white/50 md:block mt-2" />
            <span className="text-white mt-2">Ani Creative Studio Agencia Creativa de Marketing</span>
            <span className="rounded-full mt-2 border border-[#F4B3BD]/40 bg-[#8B1743] px-3 py-0.5 text-[9px] font-extrabold tracking-widest text-[#F4B3BD] shadow-lg">
              BY ANA LUISA GONZÁLEZ HIDALGO
            </span>
            <span className="hidden h-px w-8 bg-white/50 md:block mt-2" />
          </div>

          <h1
            className="mt-4 font-display font-extrabold text-white md:mt-5"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.75rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textShadow: "0 4px 20px rgba(0,0,0,0.35)",
            }}
          >
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden py-0.5">
                <span
                  className="block"
                  style={{
                    animation: `slide-up-in 0.8s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.1}s both`,
                  }}
                >
                  {i === 1 ? (
                    <>
                      con <span className="text-[#F4B3BD]">estrategia</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-white/90 md:mt-5 md:text-sm" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}>
            Me encargo de campañas digitales, reels, diseño gráfico y gestión de RRSS
            para que tú te enfoques en tu negocio.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contacto"
              className="group animate-pulse-btn inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-xs font-bold text-[#8B1743] shadow-xl transition-all hover:-translate-y-0.5"
            >
              Quiero empezar
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#8B1743] transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#trabajos"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Ver proyectos
              <span>→</span>
            </a>
          </div>

          {/* Small services cards grid at the bottom of the hero (more compact) */}
          <div className="mt-10 grid w-full max-w-[900px] grid-cols-2 gap-3 sm:grid-cols-4 md:mt-12">
            {[
              [
                "Gestión de RRSS",
                "Calendario · publicación",
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
              ],
              [
                "Reels",
                "Producción · audiovisual",
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect width="15" height="14" x="1" y="5" rx="2" ry="2" /></svg>,
              ],
              [
                "Diseño Gráfico",
                "Identidad visual · piezas",
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
              ],
              [
                "Campañas",
                "Estrategia · reporting",
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
              ],
            ].map(([t, s, icon], i) => (
              <div
                key={t as string}
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 p-4 text-center shadow-md backdrop-blur-xl transition-all duration-400 hover:border-white/40 hover:bg-white/20 hover:-translate-y-0.5"
                style={{ animation: `auto-hover-card 8s infinite ${i * 2}s` }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8C9D0] text-[#6F123B] shadow-inner"
                  style={{ animation: `auto-hover-icon 8s infinite ${i * 2}s` }}
                >
                  {icon}
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-white tracking-wide">{t as string}</div>
                  <div className="mt-0.5 text-[10px] font-medium tracking-wide text-white/70">{s as string}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Behance project carousel */}
      < HeroCarousel />
    </>
  );
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const items = [
    { label: "Estrategia", color: "text-[#8B1743]", icon: <Target className="h-6 w-6 text-[#8B1743]" /> },
    { label: "Diseño", color: "text-[#D86B86]", icon: <Palette className="h-6 w-6 text-[#D86B86]" /> },
    { label: "Reels", color: "text-[#6F123B]", icon: <Video className="h-6 w-6 text-[#6F123B]" /> },
    { label: "Campañas", color: "text-[#B8325E]", icon: <Megaphone className="h-6 w-6 text-[#B8325E]" /> },
    { label: "Identidad", color: "text-[#9E2A54]", icon: <Sparkles className="h-6 w-6 text-[#9E2A54]" /> },
    { label: "Performance", color: "text-[#C44D72]", icon: <TrendingUp className="h-6 w-6 text-[#C44D72]" /> },
  ];
  const seq = [...items, ...items, ...items, ...items];
  return (
    <div className="border-y border-[#E8C9D0]/60 bg-[#FAF7F6] py-6 md:py-8">
      <div className="overflow-hidden">
        <div className="marquee-track flex items-center gap-12">
          {seq.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm border border-[#E8C9D0]/60">
                  {item.icon}
                </span>
                <span
                  className={`font-display font-extrabold ${item.color}`}
                  style={{ fontSize: "clamp(2rem,5.5vw,4.25rem)", letterSpacing: "-0.03em" }}
                >
                  {item.label}
                </span>
              </span>
              <span className="text-[#F4B3BD] text-xl">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Section header ---------------- */
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4 md:mb-16">
      <span className="font-display font-medium text-xl text-magenta md:text-2xl">{num}</span>
      <span className="text-xs uppercase tracking-[0.3em] text-foreground/60">{label}</span>
      <span className="ml-2 h-px flex-1 bg-foreground/15" />
    </div>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  const items = [
    {
      t: "Estrategia de contenido",
      d: "Investigación, calendario editorial, definición de pilares de comunicación y tono de voz alineados con los objetivos de tu marca.",
      bg: "bg-[#FDF0F3]",
      text: "text-[#3D0E20]",
      border: "border-[#E8C9D0]/50",
      icon: <Target strokeWidth={1.5} className="h-10 w-10 md:h-12 md:w-12" />,
      video: "/estrategia.mp4",
    },
    {
      t: "Producción creativa",
      d: "Grabación profesional, edición de Reels con color y subtítulos, diseño gráfico, carruseles, motion graphics y copywriting persuasivo.",
      bg: "bg-[#F4B3BD]",
      text: "text-[#3D0E20]",
      border: "border-[#D86B86]/40",
      icon: <Palette strokeWidth={1.5} className="h-10 w-10 md:h-12 md:w-12" />,
      video: "/produccion.mp4",
    },
    {
      t: "Gestión y optimización",
      d: "Programación, publicación, stories, reporte mensual de métricas y mejora continua basada en resultados reales.",
      bg: "bg-[#2D0A18]", // Deep burgundy
      text: "text-white",
      border: "border-white/10",
      icon: <Smartphone strokeWidth={1.5} className="h-10 w-10 md:h-12 md:w-12" />,
      video: "/reels.mp4",
    },
  ];

  return (
    <section className="py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel num="01" label="Servicios" />
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display font-medium max-w-3xl"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", letterSpacing: "-0.035em", lineHeight: 1 }}
            >
              Lo que hago: un servicio completo
              <br />
              <em className="not-italic font-medium text-foreground/60">sin intermediarios.</em>
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1400px] mx-auto px-6 md:px-10 md:mt-20">
        {items.map((it, i) => (
          <ServiceCard key={i} it={it} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ it, index }: { it: any; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 120}ms`,
      }}
    >
      <div
        className={`group relative flex min-h-[380px] md:min-h-[460px] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] border ${it.border} ${it.bg} p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:p-12`}
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            src={it.video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover mix-blend-overlay opacity-30 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-50"
          />
        </div>

        {/* Top part: Icon and Number */}
        <div className="relative z-10 flex items-start justify-between">
          <div className={`rounded-2xl bg-white/30 p-4 backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${it.text}`}>
            {it.icon}
          </div>
          <span className={`font-display font-medium text-2xl opacity-40 ${it.text}`}>
            0{index + 1}
          </span>
        </div>

        {/* Bottom part: Title and description */}
        <div className="relative z-10 mt-auto">
          <h3
            className={`font-display font-medium leading-tight ${it.text} transition-transform duration-500 group-hover:-translate-y-1`}
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {it.t}
          </h3>
          <p className={`mt-6 text-sm leading-relaxed md:text-base ${it.text} opacity-80 transition-all duration-500 group-hover:opacity-100`}>
            {it.d}
          </p>

          {/* Subtle animated underline */}
          <div className="mt-8 h-px w-0 bg-current opacity-30 transition-all duration-700 ease-out group-hover:w-full" />
        </div>

        {/* Ambient glass reflection */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/20 via-transparent to-black/5 mix-blend-overlay opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </div>
  );
}

/* ---------------- Why me ---------------- */
/* ---------------- Sobre mí / Por qué yo ---------------- */
function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const sections = gsap.utils.toArray(".about-panel");

        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 0.1,
            end: () => "+=" + (scrollWrapperRef.current?.offsetWidth || 0),
          },
        });

        // Background color animation
        gsap.to(containerRef.current, {
          backgroundColor: "#1A0510",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        // Parallax photo
        gsap.to(".about-photo", {
          scale: 1.15,
          xPercent: 5,
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="porque" className="bg-[#2D0A18] text-white relative min-h-screen flex flex-col justify-center py-16 lg:py-0 overflow-x-clip lg:overflow-hidden">
      {/* Decorative lines & elements */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-10 left-10 font-display text-[15vw] leading-none text-white/5 font-bold tracking-tighter whitespace-nowrap">
          SOBRE MÍ
        </div>
      </div>

      <div className="relative lg:absolute lg:top-20 lg:left-0 z-20 px-6 md:px-10 mb-8 lg:mb-0 pt-4 lg:pt-0">
        <div className="flex items-baseline gap-4">
          <span className="font-display font-medium text-xl text-[#F4B3BD] md:text-2xl">02</span>
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">Sobre mí</span>
          <span className="ml-2 h-px w-32 bg-white/15" />
        </div>
      </div>

      <div ref={scrollWrapperRef} className="flex flex-col lg:flex-row w-full lg:w-[400vw] h-auto lg:h-[100vh] items-center relative z-10 gap-16 lg:gap-0 pt-4 lg:pt-20 pb-12 lg:pb-0">

        {/* Panel 1: Hero Intro & Photo */}
        <div className="about-panel w-full lg:w-[100vw] h-auto lg:h-full flex flex-col lg:flex-row items-center px-6 md:px-20 gap-10">
          <div className="flex-1 space-y-6 max-w-2xl relative z-10 lg:pl-10">
            <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-7xl leading-[0.95] tracking-tight text-white">
              Valor real, <br />
              <em className="text-[#F4B3BD] not-italic font-semibold">no solo</em> <br />
              contenido.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-md leading-relaxed">
              Soy Ana González. Construyo comunicación auténtica y alineada con los objetivos de tu marca.
            </p>
          </div>
          <div className="w-full shrink-0 h-[360px] sm:h-[460px] lg:h-[75vh] max-w-lg lg:max-w-none relative mx-auto my-6 lg:my-0 lg:flex-1">
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[80%] bg-[#F4B3BD]/20 rounded-full blur-[70px]" />
            </div>
            {/* Collage - Photo 1 (Main) */}
            <img src="/ana1.png" alt="Ana 1" className="about-photo absolute top-0 left-0 w-[55%] h-[60%] object-cover rounded-[1.8rem] sm:rounded-[2rem] shadow-2xl z-20 border border-white/10" />
            {/* Collage - Photo 2 */}
            <img src="/ana2.png" alt="Ana 2" className="about-photo absolute bottom-0 right-[2%] w-[48%] h-[55%] object-cover rounded-[1.8rem] sm:rounded-[2rem] shadow-2xl z-30 border border-white/10" />
            {/* Collage - Photo 3 */}
            {/* Collage - Photo 4 */}
          </div>
        </div>

        {/* Panel 2: Experiencia */}
        <div className="about-panel w-full lg:w-[100vw] h-auto lg:h-full flex flex-col justify-center px-6 md:px-20 lg:px-32 relative py-4 lg:py-0">
          <div className="max-w-4xl relative z-10">
            <div className="text-[10vw] font-display font-bold leading-none text-white/5 absolute -top-16 -left-10 select-none pointer-events-none hidden lg:block">
              EXPERIENCIA
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-6xl text-[#F4B3BD] font-semibold mb-6 lg:mb-8 relative z-10">
              5+ Años de trayectoria
            </h3>
            <p className="text-base sm:text-xl md:text-3xl text-white/90 leading-relaxed relative z-10 max-w-3xl">
              Especializada en sectores <strong className="text-[#FF8EAA]">beauty, moda, gastronomía e inmobiliario</strong>.
              No soy una agencia tradicional; me integro como parte de tu equipo para lograr resultados reales.
            </p>
            <div className="mt-8 lg:mt-12 flex gap-8 sm:gap-12 border-t border-white/20 pt-8 relative z-10">
              <div>
                <div className="text-3xl sm:text-5xl font-display text-white font-bold">6+</div>
                <div className="text-xs md:text-sm text-white/60 uppercase tracking-widest mt-2">Marcas gestionadas</div>
              </div>
              <div>
                <div className="text-3xl sm:text-5xl font-display text-white font-bold">360°</div>
                <div className="text-xs md:text-sm text-white/60 uppercase tracking-widest mt-2">Servicio Integral</div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3: Formación & L'Oreal */}
        <div className="about-panel w-full lg:w-[100vw] h-auto lg:h-full flex flex-col justify-center px-6 md:px-20 lg:px-32 py-4 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl md:text-6xl mb-6 text-white">Formación <br /><span className="text-[#FF8EAA] font-semibold">Especializada</span></h3>
              <ul className="space-y-4 md:space-y-6 text-base md:text-2xl text-white/80">
                <li className="flex items-start gap-4">
                  <span className="w-2.5 h-2.5 mt-2.5 rounded-full bg-[#F4B3BD] shrink-0" />
                  <span>Marketing Digital, Analytics y UX.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2.5 h-2.5 mt-2.5 rounded-full bg-[#F4B3BD] shrink-0" />
                  <span>Dirección Creativa y Storytelling Visual.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2.5 h-2.5 mt-2.5 rounded-full bg-[#F4B3BD] shrink-0" />
                  <span>Bachiller en Comunicaciones Audiovisuales.</span>
                </li>
              </ul>
            </div>
            <div className="relative group overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white/20 shadow-2xl min-h-[300px] sm:min-h-[380px] md:min-h-[440px] flex flex-col justify-end">
              <img src="/loreal.jpg" alt="L'Oreal" className="absolute inset-0 w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700 z-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10"></div>
              <div className="relative z-20 p-6 md:p-12">
                <span className="inline-block px-3 py-1 mb-3 rounded-full bg-white/25 backdrop-blur-md text-xs font-semibold text-white uppercase tracking-widest">
                  Reconocimiento
                </span>
                <h4 className="text-2xl md:text-5xl font-display font-semibold leading-tight text-white">
                  Finalista Nacional
                  <span className="block text-[#FF8EAA] font-bold mt-1 text-xl md:text-4xl">L'Oréal Brandstorm 2026</span>
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 4: Filosofía */}
        <div className="about-panel w-full lg:w-[100vw] h-auto lg:h-full flex flex-col justify-center px-6 md:px-20 lg:px-32 text-center items-center py-4 lg:py-0">
          <div className="max-w-4xl relative">
            <span className="absolute -top-12 -left-4 lg:-top-20 lg:-left-10 text-[4rem] lg:text-[8rem] text-[#F4B3BD]/30 font-serif leading-none">"</span>
            <h2 className="font-display text-xl sm:text-3xl md:text-6xl leading-relaxed sm:leading-tight mb-6 lg:mb-10 text-white relative z-10">
              Desarrollado por <em className="text-[#F4B3BD] not-italic font-semibold">una sola persona</em>: estrategia, diseño, edición y publicación <em className="text-[#FF8EAA] not-italic font-semibold">sin intermediarios</em>.
            </h2>
            <span className="absolute -bottom-8 -right-4 lg:-right-10 text-[4rem] lg:text-[8rem] text-[#F4B3BD]/30 font-serif leading-none rotate-180">"</span>
          </div>
        </div>

      </div>
    </section>
  );
}


/* ---------------- Onboarding ---------------- */
function Onboarding() {
  const steps = [
    {
      t: "Descubrimiento",
      w: "Paso 1",
      d: "Reunión de descubrimiento: objetivos, público y propuesta de valor.",
    },
    {
      t: "Auditoría & Análisis",
      w: "Paso 2",
      d: "Auditoría de redes sociales y análisis básico de la competencia.",
    },
    {
      t: "Estilo & Comunicación",
      w: "Paso 3",
      d: "Definición del estilo visual y línea de comunicación de la marca.",
    },
    {
      t: "Plan de contenido",
      w: "Paso 4",
      d: "Planificación del contenido del primer mes, flujo de trabajo y calendario de producción.",
    },
  ];

  const styles = [
    {
      bg: "bg-gradient-to-br from-[#2D0A18] to-[#6F123B]",
      text: "text-white",
      sub: "text-white/70",
      num: "text-white/10",
      border: "border-[#8B1743]/50",
      rot: "md:-rotate-2",
    },
    {
      bg: "bg-gradient-to-br from-[#8B1743] to-[#C93B69]",
      text: "text-white",
      sub: "text-white/85",
      num: "text-white/20",
      border: "border-[#D86B86]/40",
      rot: "md:rotate-2",
    },
    {
      bg: "bg-gradient-to-br from-[#D86B86] to-[#F4B3BD]",
      text: "text-[#3D0E20]",
      sub: "text-[#3D0E20]/80",
      num: "text-[#3D0E20]/15",
      border: "border-white/40",
      rot: "md:-rotate-1",
    },
    {
      bg: "bg-gradient-to-br from-[#FDF0F3] to-[#FFFFFF]",
      text: "text-[#6F123B]",
      sub: "text-[#6F123B]/70",
      num: "text-[#6F123B]/10",
      border: "border-white shadow-xl",
      rot: "md:rotate-3",
    },
  ];

  return (
    <section className="overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel num="03" label="Onboarding" />
        <Reveal>
          <h2
            className="max-w-4xl font-display font-medium"
            style={{ fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: "-0.035em", lineHeight: 1 }}
          >
            Onboarding{" "}
            <em className="not-italic font-medium text-magenta">Estratégico.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-foreground/65 md:text-lg">
            El Onboarding Estratégico permite construir una estrategia personalizada antes de iniciar la producción de contenido. Este proceso asegura que todo el material tenga coherencia con los objetivos de la marca.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-magenta/30 bg-magenta/10 px-6 py-3">
            <span className="font-display text-2xl font-bold text-magenta md:text-3xl" style={{ letterSpacing: "-0.03em" }}>S/ 300–350</span>
            <span className="text-sm text-foreground/70">pago único</span>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-24 lg:gap-5">
          {steps.map((s, i) => {
            const st = styles[i];
            return (
              <Reveal key={i} delay={i * 100}>
                <div
                  className={`group relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-[2rem] border ${st.border} ${st.bg} p-8 shadow-lg transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03] hover:shadow-2xl ${st.rot} hover:rotate-0`}
                >
                  {/* Binder holes styling element to look like a notebook page */}
                  <div className="absolute left-6 top-6 flex flex-col gap-3 opacity-30 mix-blend-multiply">
                    <div className="h-3 w-3 rounded-full bg-current shadow-inner" />
                    <div className="h-3 w-3 rounded-full bg-current shadow-inner" />
                  </div>

                  <div className="relative z-10 mt-6">
                    <span
                      className={`inline-block rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${st.bg} ${st.text} border ${st.border} shadow-sm mix-blend-luminosity`}
                    >
                      {s.w}
                    </span>
                    <h3 className={`mt-8 font-display text-2xl font-extrabold leading-tight tracking-tight ${st.text}`}>
                      {s.t}
                    </h3>
                    <p className={`mt-4 text-sm leading-relaxed ${st.sub}`}>{s.d}</p>
                  </div>

                  {/* Big background number */}
                  <div
                    className={`absolute -bottom-6 -right-2 font-display text-[9rem] font-black leading-none ${st.num} transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2`}
                  >
                    {i + 1}
                  </div>

                  {/* Subtle glass reflection overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Portfolio ---------------- */
const projects = [
  ["Save the Date Wedding Video", "Cinematic Couple Session", "245861779"],
  ["Fashion Editorial Photography", "Full Body Looks", "245823383"],
  ["Behind the Scenes", "Fashion Editorial en Locación", "245582333"],
  ["Fashion Video", "Look de Noche en Interior", "242964371"],
  ["Fashion Video", "Look de Verano en Locación", "242394175"],
  ["Retrato Editorial", "Detalles y Accesorios", "242393831"],
  ["Paco Yonque", "Un viaje a través de su atmósfera", "232174275"],
  ["Atmospheric Video", "Preparación en Cocina Paco Yonque", "245823969"],
  ["Arte con sabor a identidad", "Contenido Audiovisual", "232092363"],
  ["El horno de Paco", "Contenido Audiovisual", "232086303"],
  ["Cusco en cada detalle", "Travel & Culture", "232173625"],
  ["Activación Estruendomudo", "Edición de video", "232172095"],
  ["Sytyk", "Prototipo App + Web", "161085283"],
  ["Portafolio 2024", "Ana González", "177552055"],
  ["La Brisa También Tiene Colores", "Cortometraje", "161091699"],
  ["Beso de Tres", "Video Musical", "161094325"],
  ["Voz Humana", "Cortometraje", "161092109"],
] as const;

function ProjectCard({
  title,
  subtitle,
  id,
  span = "",
}: {
  title: string;
  subtitle: string;
  id: string;
  span?: string;
}) {
  return (
    <Reveal className={`group relative overflow-hidden rounded-3xl border border-foreground/10 bg-white ${span}`}>
      <a
        href={`https://www.behance.net/gallery/${id}/project`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full"
      >
        <div className="relative overflow-hidden">
          <div
            className="transition-transform duration-[800ms] ease-out group-hover:scale-105"
            style={{ aspectRatio: "404/316" }}
          >
            <iframe
              src={`https://www.behance.net/embed/project/${id}?ilo0=1`}
              className="pointer-events-none h-full w-full overflow-hidden"
              style={{ overflow: "hidden" }}
              scrolling="no"
              allowFullScreen
              loading="lazy"
              frameBorder={0}
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              title={title}
            />
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 border-t border-foreground/10 p-5">
          <div>
            <div className="font-display text-sm font-medium leading-tight group-hover:text-magenta transition-colors">{title}</div>
            <div className="mt-1 text-xs text-foreground/55">{subtitle}</div>
          </div>
          <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-magenta transition-transform group-hover:scale-150" />
        </div>
      </a>
    </Reveal>
  );
}

function Portfolio() {
  // Bento spans (12-col grid on desktop)
  const spans = [
    "md:col-span-7", "md:col-span-5",
    "md:col-span-4", "md:col-span-4", "md:col-span-4",
    "md:col-span-6", "md:col-span-6",
    "md:col-span-5", "md:col-span-7",
    "md:col-span-4", "md:col-span-4", "md:col-span-4",
    "md:col-span-6", "md:col-span-6",
    "md:col-span-4", "md:col-span-4", "md:col-span-4",
  ];
  return (
    <section id="trabajos" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel num="04" label="Trabajos" />
        <Reveal>
          <h2
            className="font-display font-medium"
            style={{ fontSize: "clamp(2rem,5.5vw,4.5rem)", letterSpacing: "-0.035em", lineHeight: 1 }}
          >
            Reels, identidad e{" "}
            <em className="not-italic font-medium text-foreground/55">
              historias de marca
            </em>
            .
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {projects.map(([t, s, id], i) => (
            <ProjectCard key={id} title={t} subtitle={s} id={id} span={spans[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */
const reviewsData = [
  {
    q: "Buscábamos a alguien que entendiera el lenguaje inmobiliario y lo tradujera a digital. Ana lo logró. Las campañas que gestionó superaron nuestras expectativas de CPL.",
    a: "Equipo Comercial",
    b: "Century 21 Principal",
    logo: "/century21.png",
    avatar: "https://ui-avatars.com/api/?name=EC&background=D86B86&color=fff",
  },
  {
    q: "Ana entiende el mundo del retail y la moda. Nos ayudó a posicionar Ibyza con una identidad visual muy propia que ahora nuestros seguidores reconocen al instante.",
    a: "Fundadora",
    b: "Ibyza Shop",
    logo: "/ibyza.png",
    avatar: "https://ui-avatars.com/api/?name=FU&background=2D0A18&color=fff",
  },
  {
    q: "Lo que más valoro es que entiende la estética de la marca desde el primer momento. No hay que explicar mucho; capta el espíritu de Isidra y lo traduce en contenido que enamora.",
    a: "Sofía R.",
    b: "Isidra Concept Store",
    logo: "/isidra.png",
    avatar: "https://ui-avatars.com/api/?name=SR&background=D86B86&color=fff",
  },
  {
    q: "Ana transformó completamente nuestra presencia en Instagram. Antes publicábamos sin estrategia. Ahora tenemos una grilla coherente y las ventas en tienda aumentaron notablemente.",
    a: "Valeria M.",
    b: "Menesses Calzado",
    logo: "/menesses.png",
    avatar: "https://ui-avatars.com/api/?name=VM&background=2D0A18&color=fff",
  },
  {
    q: "Trabajar con Ana fue una de las mejores decisiones del año. Sus reels generaron el triple de engagement que cualquier publicación anterior. Visión audiovisual impecable.",
    a: "Chef Rafael P.",
    b: "Restaurante Paco Yonque",
    logo: "/pacoyonque.png",
    avatar: "https://ui-avatars.com/api/?name=CR&background=D86B86&color=fff",
  },
];

function Reviews() {
  const [current, setCurrent] = useState(0);
  const r = reviewsData[current];

  const next = () => setCurrent((c) => (c + 1) % reviewsData.length);
  const prev = () => setCurrent((c) => (c - 1 + reviewsData.length) % reviewsData.length);

  return (
    <section id="reviews" className="bg-ink py-24 text-ink-foreground md:py-36 relative overflow-hidden">
      {/* Animated Background Bubbles - Increased opacity and visibility */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#FF8EAA] to-magenta opacity-50 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-40 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-white to-[#D86B86] opacity-30 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Left Column */}
          <div className="md:col-span-5 flex flex-col items-start justify-center py-4">
            <div className="mb-8 flex items-baseline gap-4 w-full max-w-[300px]">
              <span className="font-display font-medium text-xl text-white md:text-2xl">05</span>
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Testimonios</span>
              <span className="ml-2 h-px flex-1 bg-white/15" />
            </div>
            <Reveal>
              <h2
                className="font-display font-medium leading-[1.15]"
                style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", letterSpacing: "-0.03em" }}
              >
                Lo que dicen las marcas con las que{" "}
                <em className="not-italic text-[#FF8EAA] whitespace-nowrap">trabajo.</em>
              </h2>
            </Reveal>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 flex flex-col justify-between md:pl-10">
            <div key={current} className="animate-in fade-in slide-in-from-right-8 duration-700 min-h-[260px] md:min-h-[220px]">
              <p className="font-display font-medium text-2xl md:text-[2rem] leading-snug text-white/90">
                “{r.q}”
              </p>

              <div className="mt-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={r.avatar} alt={r.a} className="h-14 w-14 rounded-full object-cover border border-white/20" />
                  <div>
                    <h4 className="font-display font-medium text-lg text-white">{r.a}</h4>
                    <p className="text-sm text-white/50">{r.b}</p>
                  </div>
                </div>
                <img src={r.logo} alt={r.b} className="h-8 md:h-12 w-auto max-w-[120px] object-contain" />
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-16 flex flex-col-reverse md:flex-row items-center justify-between border-t border-white/10 pt-8 gap-6">
              {/* Dots */}
              <div className="flex gap-2 w-full md:w-auto justify-center md:justify-start">
                {reviewsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-magenta" : "w-4 bg-white/20 hover:bg-white/40"
                      }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3 w-full md:w-auto justify-center md:justify-end">
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white hover:text-ink"
                >
                  <ArrowLeft strokeWidth={1.5} className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:bg-white hover:text-ink"
                >
                  <ArrowRight strokeWidth={1.5} className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
function Pricing() {
  const plans = [
    {
      tag: "Plan Esencial",
      sub: "Ideal para emprendimientos y marcas personales que necesitan empezar a verse profesionales.",
      price: "S/ 650",
      reg: "Precio regular: S/ 850",
      bullets: [
        "Reunión de planificación mensual",
        "Calendario de contenido",
        "1 sesión de grabación al mes (2 horas)",
        "Grabación con cámara profesional",
        "4 Reels con edición profesional",
        "8 piezas gráficas (carruseles o posts)",
        "Redacción de todos los copies",
        "Programación y publicación",
        "2–3 stories por semana",
      ],
      highlight: false,
    },
    {
      tag: "Plan Crecimiento",
      sub: "Ideal para marcas que buscan mantener una presencia constante y profesional en redes sociales.",
      price: "S/ 900",
      reg: "Precio regular: S/ 1,050",
      bullets: [
        "Investigación mensual y calendario editorial",
        "2 sesiones de grabación al mes (hasta 4 h)",
        "12 diseños, carruseles y portadas de reels",
        "8 Reels con edición profesional y color",
        "Motion Graphics sencillos y subtítulos",
        "Copies persuasivos, CTA y SEO para IG",
        "Programación, publicación y reporte mensual",
        "20 stories mensuales",
      ],
      highlight: true,
    },
    {
      tag: "Plan Marca",
      sub: "Servicio casi boutique para posicionarte como referente de alto valor.",
      price: "S/ 1,450",
      reg: "Precio regular: S/ 1,700",
      bullets: [
        "Estrategia mensual y revisión de métricas",
        "Hasta 3 sesiones de grabación mensuales",
        "Producción completa y dirección de arte",
        "12 Reels con edición cinematográfica y color",
        "16 piezas gráficas y carruseles premium",
        "Diseño de motion graphics y subtítulos",
        "Copywriting estratégico y storytelling",
        "Reporte detallado y reunión mensual",
        "Stories casi diarias",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="planes" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel num="05" label="Planes" />
        <Reveal>
          <h2
            className="font-display font-medium"
            style={{ fontSize: "clamp(2rem,5.5vw,4.5rem)", letterSpacing: "-0.035em", lineHeight: 1 }}
          >
            Planes pensados para{" "}
            <em className="not-italic font-medium text-magenta">tu etapa.</em>
          </h2>
          <p className="mt-6 max-w-2xl text-sm text-foreground/65">
            Precios de lanzamiento. Antes de iniciar cualquier plan se realiza un Onboarding Estratégico (pago único S/ 300–350).
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal
              key={p.tag}
              delay={i * 80}
              className={`relative flex flex-col rounded-3xl border bg-white p-8 md:p-10 ${p.highlight ? "border-magenta" : "border-foreground/15"
                }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-8 rounded-full bg-magenta px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-magenta-foreground">
                  Recomendado
                </span>
              )}
              <div className="font-display text-lg font-medium">{p.tag}</div>
              <p className="mt-2 text-sm text-foreground/60">{p.sub}</p>

              <div className="mt-8 flex items-baseline gap-2">
                <span
                  className="font-display font-medium"
                  style={{ fontSize: "clamp(2.5rem,4vw,3.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {p.price}
                </span>
                <span className="text-sm text-foreground/55">/ 1er mes</span>
              </div>
              <div className="mt-1 text-xs text-foreground/45">{p.reg}</div>

              <ul className="mt-8 flex-1 space-y-3 border-t border-foreground/15 pt-6 text-sm">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      className={`mt-2 inline-block h-1 w-1 rounded-full ${p.highlight ? "bg-magenta" : "bg-foreground/40"
                        }`}
                    />
                    <span className="text-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/51994404466?text=Hola,%20me%20interesa%20el%20${encodeURIComponent(p.tag)}`}
                target="_blank"
                rel="noreferrer"
                className={`mt-10 inline-flex items-center justify-between rounded-full px-5 py-3 text-sm transition ${p.highlight
                  ? "bg-magenta text-magenta-foreground hover:scale-[1.02]"
                  : "border border-foreground/20 text-foreground hover:border-magenta hover:text-magenta"
                  }`}
              >
                Elegir plan
                <span>→</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <div className="mb-10 flex items-center gap-4">
            <h3 className="font-display text-xl font-medium text-magenta md:text-2xl">Extras</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-foreground/55">Add-ons</span>
            <span className="h-px flex-1 bg-foreground/15" />
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              ["Reel adicional", "S/ 150", "Incluye grabación, edición profesional, subtítulos y copy."],
              ["Pack de 5 stories", "S/ 60", "Diseño, edición y copy."],
              ["Grabación adicional", "S/ 400", "Con equipo profesional de grabación."],
              ["Cobertura de eventos", "Desde S/ 600", "Creación de contenido durante eventos."],
              ["Sesión de fotografía", "Desde S/ 350", "Ideal para e-commerce, gastronomía, moda y belleza."],
              ["Gestión de Meta Ads", "Desde S/ 400", "Administración y optimización mensual."],
              ["Entrega prioritaria (24 h)", "+30 %", "Recargo del 30 % sobre el servicio."],
            ].map(([t, p, d], i) => {
              const styles = [
                {
                  bg: "bg-gradient-to-br from-[#2D0A18] to-[#6F123B]",
                  text: "text-white",
                  sub: "text-white/70",
                  num: "text-white/10",
                  border: "border-[#8B1743]/50",
                  rot: "md:-rotate-2",
                },
                {
                  bg: "bg-gradient-to-br from-[#8B1743] to-[#C93B69]",
                  text: "text-white",
                  sub: "text-white/85",
                  num: "text-white/20",
                  border: "border-[#D86B86]/40",
                  rot: "md:rotate-2",
                },
                {
                  bg: "bg-gradient-to-br from-[#D86B86] to-[#F4B3BD]",
                  text: "text-[#3D0E20]",
                  sub: "text-[#3D0E20]/80",
                  num: "text-[#3D0E20]/15",
                  border: "border-white/40",
                  rot: "md:-rotate-1",
                },
                {
                  bg: "bg-gradient-to-br from-[#FDF0F3] to-[#FFFFFF]",
                  text: "text-[#6F123B]",
                  sub: "text-[#6F123B]/70",
                  num: "text-[#6F123B]/10",
                  border: "border-white shadow-xl",
                  rot: "md:rotate-3",
                },
              ];
              const st = styles[i % styles.length];
              return (
                <div
                  key={t}
                  className={`group relative flex min-h-[340px] w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-col justify-between overflow-hidden rounded-[2rem] border ${st.border} ${st.bg} p-8 shadow-lg transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-[1.03] hover:shadow-2xl hover:rotate-0`}
                >
                  {/* Binder holes styling element */}
                  <div className="absolute left-6 top-6 flex flex-col gap-3 opacity-30 mix-blend-multiply">
                    <div className="h-3 w-3 rounded-full bg-current shadow-inner" />
                    <div className="h-3 w-3 rounded-full bg-current shadow-inner" />
                  </div>

                  <div className="relative z-10 mt-6">
                    <h3 className={`font-display text-2xl font-extrabold leading-tight tracking-tight ${st.text}`}>
                      {t}
                    </h3>
                    <a
                      href={`https://wa.me/51994404466?text=Hola,%20me%20interesa%20cotizar%20el%20add-on:%20${encodeURIComponent(t)}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-3 font-serif italic text-lg inline-block transition-transform hover:translate-x-1 ${st.text}`}
                    >
                      {p} <span className="text-sm">→</span>
                    </a>
                    <p className={`mt-6 text-sm leading-relaxed ${st.sub}`}>{d}</p>
                  </div>

                  {/* Big background plus sign */}
                  <div
                    className={`absolute -bottom-8 -right-4 font-display text-[10rem] font-black leading-none ${st.num} transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2`}
                  >
                    +
                  </div>

                  {/* Subtle glass reflection overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nombre = fd.get("nombre");
    const apellido = fd.get("apellido");
    const celular = fd.get("celular");
    const correo = fd.get("correo");

    const text = `Hola Ana, me interesa contactarte.%0A%0A*Nombre:* ${nombre} ${apellido}%0A*Celular:* ${celular}${correo ? `%0A*Correo:* ${correo}` : ""
      }`;
    window.open(`https://wa.me/51994404466?text=${text}`, "_blank");
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-ink py-28 text-ink-foreground md:py-44">
      {/* Animated Gradient Background - Encendidas y en movimiento */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#FF8EAA] to-magenta opacity-60 blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[20%] -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-white to-[#D86B86] opacity-40 blur-[120px] animate-pulse" style={{ animationDuration: '9s' }} />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-display font-medium text-xl text-white md:text-2xl">06</span>
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">Contacto</span>
          <span className="ml-2 h-px flex-1 bg-white/15" />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <h2
                className="font-display font-medium"
                style={{ fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                Empecemos a construir
                <br />
                <em className="not-italic font-medium text-[#FF8EAA]">tu marca</em> juntos.
              </h2>
              <p className="mt-8 text-white/70 max-w-md text-lg">
                Los cupos de trabajo son limitados. Llena el formulario y coordinamos tu reunión de brief
                gratuita de 30 minutos.
              </p>
            </Reveal>

            <Reveal className="mt-12" delay={150}>
              <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  ["01", "Envía tus datos", "text-[#8B1743]"],
                  ["02", "Reunión de brief", "text-[#6F123B]"],
                  ["03", "Propuesta personalizada", "text-[#B8325E]"],
                  ["04", "Inicio del proyecto", "text-[#9E2A54]"],
                ].map(([n, t, textColor], i) => {
                  const isActive = activeStep === i;
                  return (
                    <li
                      key={n}
                      className={`group rounded-2xl border border-white/60 bg-white p-6 shadow-lg transition-all duration-700 ease-out ${isActive
                        ? "scale-[1.05] -translate-y-2 shadow-[0_15px_40px_rgba(255,142,170,0.3)] opacity-100"
                        : "opacity-50 scale-100 translate-y-0 hover:opacity-80"
                        }`}
                    >
                      <div className={`font-display font-bold transition-colors duration-700 ${isActive ? textColor : "text-black/30"}`}>{n}</div>
                      <div className={`mt-2 font-display text-base font-bold transition-colors duration-700 ${isActive ? textColor : "text-black/60"}`}>{t}</div>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-[2rem] border border-white/15 bg-white/5 p-8 backdrop-blur-xl md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 relative z-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className="text-sm font-medium text-white/80">Nombre</label>
                  <input required type="text" name="nombre" id="nombre" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-white/30 outline-none transition focus:border-[#FF8EAA] focus:bg-white/10" placeholder="Tu nombre" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="apellido" className="text-sm font-medium text-white/80">Apellido</label>
                  <input required type="text" name="apellido" id="apellido" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-white/30 outline-none transition focus:border-[#FF8EAA] focus:bg-white/10" placeholder="Tu apellido" />
                </div>
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <label htmlFor="celular" className="text-sm font-medium text-white/80">Celular</label>
                <input required type="tel" name="celular" id="celular" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-white/30 outline-none transition focus:border-[#FF8EAA] focus:bg-white/10" placeholder="+51 999 999 999" />
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <label htmlFor="correo" className="text-sm font-medium text-white/80">Correo (Opcional)</label>
                <input type="email" name="correo" id="correo" className="rounded-xl border border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder-white/30 outline-none transition focus:border-[#FF8EAA] focus:bg-white/10" placeholder="hola@tumarca.com" />
              </div>

              <button type="submit" className="mt-6 relative z-10 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 font-bold text-ink shadow-[0_8px_30px_rgba(37,211,102,0.3)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#20bd5a] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)]">
                Enviar a WhatsApp
                <Smartphone className="h-5 w-5" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-[#3D0E20] py-16 text-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/logo.png"
              alt="Ani Creative Studio"
              className="h-24 w-auto md:h-32"
            />
            <p className="mt-4 max-w-sm text-center text-sm text-white/60 md:text-left">
              <span className="font-semibold text-white">Agencia Creativa de Marketing</span>{" "}
              <span className="mt-1 inline-block rounded-full bg-[#F4B3BD] px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#6F123B] shadow-sm">
                BY ANA LUISA GONZÁLEZ HIDALGO
              </span>
              <br />
              <br />
              Comunicación coherente, estética y alineada a los objetivos de tu marca.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:justify-end">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <h4 className="font-display text-xs font-medium uppercase tracking-widest text-[#F4B3BD]">
                Redes
              </h4>
              <a
                href="https://www.instagram.com/annacore__/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Instagram size={18} />
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@lamanz.anita"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                TikTok
              </a>
              <a
                href="https://www.behance.net/anagonzlez8/projects"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" />
                  <path d="M9 8h4.5a2.5 2.5 0 0 1 0 5H9Zm0 5h5.5a3 3 0 0 1 0 6H9Z" />
                </svg>
                Behance
              </a>
              <a
                href="https://www.linkedin.com/in/anagonzalezhi/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
            </div>

            <div className="flex flex-col items-center gap-4 md:items-start">
              <h4 className="font-display text-xs font-medium uppercase tracking-widest text-[#F4B3BD]">
                Contacto
              </h4>
              <a
                href="mailto:anagonzalezhi21@gmail.com"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Mail size={18} />
                anagonzalezhi21@gmail.com
              </a>
              <a
                href="https://wa.me/51994404466"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Smartphone size={18} />
                +51 994 404 466
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-xs text-white/40 md:flex-row">
          <span>&copy; {new Date().getFullYear()} Ani Creative Studio. Todos los derechos reservados.</span>
          <span className="flex items-center gap-2 text-white/60">
            Web Design by JatzLab AI
            <img src="/jatzlab.png" alt="JatzLab AI" className="h-10 w-auto" />
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Image Band ---------------- */
function ImageBand() {
  const items = [
    { label: "Marca Beauty", color: "text-[#8B1743]", bg: "bg-[#F5E6EB]", icon: <Sparkles className="h-5 w-5 text-[#8B1743]" /> },
    { label: "Sesión Moda", color: "text-[#6F123B]", bg: "bg-[#FCE8EC]", icon: <Camera className="h-5 w-5 text-[#6F123B]" /> },
    { label: "Restaurante", color: "text-[#B8325E]", bg: "bg-[#FDF0F3]", icon: <Star className="h-5 w-5 text-[#B8325E]" /> },
    { label: "Inmobiliaria", color: "text-[#8B1743]", bg: "bg-[#F5E6EB]", icon: <Layers className="h-5 w-5 text-[#8B1743]" /> },
    { label: "Editorial", color: "text-[#D86B86]", bg: "bg-[#FCE8EC]", icon: <Film className="h-5 w-5 text-[#D86B86]" /> },
    { label: "Producto", color: "text-[#9E2A54]", bg: "bg-[#FDF0F3]", icon: <Zap className="h-5 w-5 text-[#9E2A54]" /> },
  ];
  const seq = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[#E8C9D0]/50 bg-[#FAF7F6] py-5">
      <div className="overflow-hidden">
        <div className="marquee-track flex items-center gap-6">
          {seq.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-full border border-[#E8C9D0] ${item.bg} px-6 py-3 shadow-sm transition-all duration-300 hover:scale-105 shrink-0`}
            >
              {item.icon}
              <span className={`font-display text-base font-bold tracking-tight ${item.color}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */
function LandingPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Preloader />
      <Nav />
      <main className="overflow-x-hidden">
        <Hero />
        <div className="mt-14 md:mt-20">
          <Marquee />
        </div>
        <Services />
        <AboutMe />
        <Onboarding />
        <ImageBand />
        <Portfolio />

        <Pricing />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
