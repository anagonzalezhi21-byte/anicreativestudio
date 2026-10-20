import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import {
  Instagram,
  Linkedin,
  Mail,
  Smartphone,
  ArrowUpRight,
  Target,
  Palette,
  Video,
  Megaphone,
  Sparkles,
  TrendingUp,
  CircleCheck,
  ArrowLeft,
  ArrowRight,
  Plus,
  Check,
  Sparkle,
  Gem,
  CalendarDays,
  LayoutGrid,
  ChartLine,
  Layers,
  Camera,
  Clock,
  FlaskConical,
  Rocket,
  Clapperboard,
  Scissors,
  type LucideIcon,
} from "lucide-react";

const SEO_TITLE = "Anna González · Estudio Creativo de Marketing y Redes en Lima";
const SEO_DESCRIPTION =
  "Estudio Creativo: gestión de redes sociales, producción de reels, diseño y pauta en Meta y Google Ads para marcas de moda y belleza.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESCRIPTION },
      {
        property: "og:title",
        content: "Anna González · Contenido que vende, estética que se recuerda",
      },
      {
        property: "og:description",
        content:
          "Estrategia, producción audiovisual y gestión de redes sociales para marcas que quieren crecer en digital.",
      },
    ],
  }),
  component: LandingPage,
});

/* ---------------- Preloader (Agile & Lundani Styled) ---------------- */
function Preloader({ onReady }: { onReady?: () => void }) {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (n >= 100) {
      const t1 = setTimeout(() => {
        setLeaving(true);
        if (onReady) onReady();
      }, 450);
      const t2 = setTimeout(() => setGone(true), 1300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    // Conteo pausado (~1.6s) para que la animación se aprecie
    const t = setTimeout(() => {
      setN((v) => Math.min(100, v + Math.ceil(Math.random() * 4) + 1));
    }, 45);
    return () => clearTimeout(t);
  }, [n, onReady]);

  if (gone) return null;
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#F8F7F4] p-6 text-[#171715] md:p-12 transition-transform duration-[850ms] ease-[cubic-bezier(0.7,0,0.2,1)]"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="flex items-center justify-between border-b border-[#D8D4CC] pb-4">
        <span className="font-display text-xl tracking-tight text-[#171715]">ANNA GONZÁLEZ</span>
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#77746E]">
          Cargando
        </span>
      </div>

      <div className="flex items-end justify-between">
        <span className="font-display text-xl md:text-2xl tracking-tight text-[#171715]/40 uppercase">
          Studio
        </span>
        <div
          className="flex items-baseline font-display tabular-nums text-[#171715]"
          style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)", lineHeight: 0.9 }}
        >
          <span>{String(n).padStart(3, "0")}</span>
          <span className="text-[#171715]/40 text-[0.4em] ml-1">%</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Navigation ---------------- */
function Nav() {
  const links = [
    ["Inicio", "#home"],
    ["Servicios", "#servicios"],
    ["Trabajos", "#trabajos"],
    ["Sobre mí", "#porque"],
    ["Proceso", "#onboarding"],
    ["Planes", "#planes"],
    ["Contacto", "#contacto"],
  ];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /* La barra es transparente: si debajo hay una sección oscura, el texto pasa a blanco */
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const y = 36;
      const under = Array.from(document.querySelectorAll<HTMLElement>("main > *")).find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });
      setOnDark(!!under?.hasAttribute("data-nav-dark"));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const ink = onDark ? "text-white" : "text-[#171715]";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - margin;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-500 ${
        scrolled ? "py-3.5" : "py-5"
      } ${
        onDark
          ? "border-b border-white/10 bg-[#0E0E0D]/60"
          : scrolled
            ? "border-b border-[#171715]/10 bg-[#F8F7F4]/60"
            : "border-b border-transparent bg-[#F8F7F4]/30"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-3 transition-opacity hover:opacity-75"
        >
          <span
            className={`font-display text-xl tracking-tight transition-colors duration-500 md:text-2xl ${ink}`}
          >
            ANNA GONZÁLEZ
          </span>
        </a>

        {/* Desktop Links (Lundani Style: uppercase minimal clean) */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`link-u text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-500 ${
                onDark ? "text-white/80 hover:text-white" : "text-[#171715]/80 hover:text-[#171715]"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className={`btn py-2 px-5 text-xs uppercase tracking-wider transition-colors duration-500 ${
              onDark
                ? "border border-white bg-white text-[#171715] hover:bg-[#F6E7EA]"
                : "btn-solid"
            }`}
          >
            <span>Contáctame</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 transition-colors duration-500 lg:hidden ${
            open ? "text-[#171715]" : ink
          }`}
        >
          <span
            className="h-[1.5px] w-6 bg-current transition-transform duration-300"
            style={{
              transform: open ? "translateY(4.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="h-[1.5px] w-6 bg-current transition-transform duration-300"
            style={{
              transform: open ? "translateY(-4.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`overflow-hidden border-b border-[#D8D4CC] bg-[#F8F7F4] transition-all duration-300 lg:hidden ${
          open ? "max-h-[460px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 space-y-4">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="text-sm font-medium uppercase tracking-widest text-[#171715] py-2 border-b border-[#D8D4CC]/40"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className="btn btn-solid justify-center mt-2 text-xs uppercase tracking-wider"
          >
            <span>Iniciar Proyecto</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Reveal on Scroll Helper ---------------- */
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
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
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ---------------- Títulos tipo portada editorial ----------------
   Una línea pequeña en mayúsculas (antetítulo) y una sola palabra protagonista. */
function CoverTitle({
  kicker,
  word,
  end = ".",
  size = "lg",
  as: Tag = "h2",
  dark = false,
}: {
  kicker: React.ReactNode;
  word: string;
  end?: string;
  size?: "lg" | "md" | "sm";
  as?: "h2" | "h3";
  /* Sobre fondo negro */
  dark?: boolean;
}) {
  return (
    <Tag className={`ink-title ${dark ? "text-white" : "text-[#171715]"}`}>
      <span
        className={`block font-display leading-tight ${dark ? "text-white/50" : "text-[#77746E]"} ${
          size === "lg" ? "cover-kicker-lg" : size === "md" ? "cover-kicker-md" : "cover-kicker-sm"
        }`}
      >
        {kicker}
      </span>
      <span
        className={`mt-1 block font-display ${
          size === "lg" ? "cover-lg" : size === "md" ? "cover-md" : "cover-sm"
        }`}
      >
        {word}
        <span className={dark ? "text-[#C25A72]" : "text-[#6E1E2D]"}>{end}</span>
      </span>
    </Tag>
  );
}

/* ---------------- Section Heading (mismo formato en toda la web) ---------------- */
function SectionHeading({
  kicker,
  word,
  end,
  aside,
  middle,
  dark = false,
}: {
  kicker: React.ReactNode;
  word: string;
  end?: string;
  dark?: boolean;
  aside?: React.ReactNode;
  /* Contenido entre el título y el texto lateral (p. ej. un carrusel) */
  middle?: React.ReactNode;
}) {
  return (
    <div data-reveal className="mb-6 flex items-end justify-between gap-6 md:mb-8">
      <div className="shrink-0">
        <CoverTitle kicker={kicker} word={word} end={end} dark={dark} />
      </div>
      {middle}
      {aside}
    </div>
  );
}

/* ---------------- Hero Section (Reference Layout: Minimalist + Moving Behance Rectangles) ---------------- */
const heroBehanceReel = [
  { title: "Save the Date", id: "245861779" },
  { title: "Fashion Editorial", id: "245823383" },
  { title: "Behind the Scenes", id: "245582333" },
  { title: "Look de Noche", id: "242964371" },
  { title: "Paco Yonque", id: "232174275" },
  { title: "Arte con Identidad", id: "232092363" },
  { title: "Retrato Editorial", id: "242393831" },
  { title: "Look de Verano", id: "242394175" },
  { title: "Cusco en Cada Detalle", id: "232173625" },
];

function Hero() {
  const reelLoop = [...heroBehanceReel, ...heroBehanceReel];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#F8F7F4] pt-28 pb-6 md:min-h-screen md:pt-36 md:pb-14"
    >
      {/* Minimalist, airy typography block (top-left, plenty of negative space) */}
      <div data-hero-content className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="max-w-lg">
          <span data-hero-fade className="eyebrow block text-[#77746E]">
            Estudio creativo · Lima, Perú
          </span>

          <h1 className="mt-3 font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#171715] leading-[0.92]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-hero-line className="block">
                Anna González
              </span>
            </span>
            <span className="sr-only"> Agencia creativa de marketing y redes sociales en Lima</span>
          </h1>

          <p
            data-hero-fade
            className="mt-5 max-w-sm text-sm md:text-base text-[#77746E] font-light leading-relaxed"
          >
            Estrategia, contenido audiovisual y redes sociales para marcas que quieren verse bien{" "}
            <span className="font-display text-[1.15em] text-[#6E1E2D]">y vender más.</span>
          </p>

          <div data-hero-fade className="mt-7 flex items-center gap-6">
            <a
              href="#planes"
              className="link-u text-xs font-medium uppercase tracking-[0.18em] text-[#171715]"
            >
              <span>Ver planes</span>
              <span>→</span>
            </a>
            <a
              href="#trabajos"
              className="link-u text-xs uppercase tracking-[0.18em] text-[#77746E] hover:text-[#171715]"
            >
              <span>Proyectos</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Moving horizontal strip of forced-rectangle Behance projects overlapping the vertical portrait */}
      <div
        data-hero-reel
        className="relative z-10 mt-10 mb-2 flex min-h-[300px] w-full flex-1 overflow-hidden md:mt-20 md:mb-4 md:min-h-0 md:flex-none"
      >
        {/* En celular la tira crece hasta llenar el alto libre de la pantalla (sin hueco blanco) */}
        <div data-hero-reel-wrap className="flex md:block">
          <div className="hero-reel-track flex items-stretch gap-3 px-2 md:items-center md:gap-5">
            {reelLoop.map((p, idx) => (
              <a
                key={`${p.id}-${idx}`}
                href={`https://www.behance.net/gallery/${p.id}/project`}
                target="_blank"
                rel="noopener noreferrer"
                title={p.title}
                className="reel-card group relative block w-[68vw] sm:w-[300px] md:w-[340px] md:aspect-[16/10] shrink-0 overflow-hidden bg-[#EFEEE9] shadow-sm transition-transform duration-500 hover:scale-[1.02]"
              >
                {/* Cropped Behance iframe forced into a clean 16:10 horizontal rectangle */}
                <iframe
                  src={`https://www.behance.net/embed/project/${p.id}?ilo0=1`}
                  className="pointer-events-none absolute -top-[6%] left-0 h-[142%] w-full scale-[1.04] overflow-hidden border-0"
                  scrolling="no"
                  allowFullScreen
                  loading="lazy"
                  frameBorder={0}
                  title={`${p.title}, Behance`}
                />
                <div className="pointer-events-none absolute inset-0 border border-[#171715]/10 transition-colors duration-300 group-hover:border-[#171715] group-hover:bg-[#171715]/10" />
                <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-[#171715]/90 px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#F8F7F4] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span>{p.title}</span>
                  <ArrowUpRight size={11} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
/* ---------------- Sistema de cards (diseño de la sección Servicios) ----------------
   Todas las cards de la web: esquinas muy redondeadas, fondo degradado en uno de
   3 tonos de la paleta (vino, negro, rosado), etiqueta pequeña arriba, título serif
   y acción al final. */
type Tone = "wine" | "ink" | "blush" | "light" | "noir";

const TONES: Record<
  Tone,
  {
    bg: string;
    text: string;
    sub: string;
    tag: string;
    line: string;
    inner: string;
    accent: string;
    btn: string;
  }
> = {
  wine: {
    bg: "bg-gradient-to-br from-[#8A2A40] via-[#6B1D2F] to-[#3A0F1A]",
    text: "text-white",
    sub: "text-white/75",
    tag: "text-white/60",
    line: "border-white/15",
    inner: "bg-white/10",
    accent: "text-[#F3C9D3]",
    btn: "bg-white text-[#171715] hover:bg-[#F6E7EA]",
  },
  ink: {
    bg: "bg-gradient-to-br from-[#2A2A2A] via-[#171715] to-[#000000]",
    text: "text-white",
    sub: "text-white/75",
    tag: "text-white/60",
    line: "border-white/15",
    inner: "bg-white/10",
    accent: "text-[#E7B9C4]",
    btn: "bg-white text-[#171715] hover:bg-[#F6E7EA]",
  },
  blush: {
    bg: "bg-gradient-to-br from-[#F6E7EA] via-[#EBCDD4] to-[#D9A8B3]",
    text: "text-[#171715]",
    sub: "text-[#171715]/70",
    tag: "text-[#6B1D2F]",
    line: "border-[#171715]/15",
    inner: "bg-white/50",
    accent: "text-[#6B1D2F]",
    btn: "bg-[#171715] text-white hover:bg-[#6B1D2F]",
  },
  /* Degradado negro → vino */
  noir: {
    bg: "bg-gradient-to-br from-[#171715] via-[#2A1A1F] to-[#6B1D2F]",
    text: "text-white",
    sub: "text-white/70",
    tag: "text-white/55",
    line: "border-white/15",
    inner: "bg-white/10",
    accent: "text-[#E7B9C4]",
    btn: "bg-white text-[#171715] hover:bg-[#F6E7EA]",
  },
  light: {
    bg: "bg-white border border-[#171715]",
    text: "text-[#171715]",
    sub: "text-[#171715]/70",
    tag: "text-[#77746E]",
    line: "border-[#171715]/15",
    inner: "bg-[#EFEEE9]",
    accent: "text-[#171715]",
    btn: "bg-[#171715] text-white hover:bg-[#6B1D2F]",
  },
};

/* Orden en que se alternan los tonos dentro de una fila de cards */
const TONE_CYCLE: Tone[] = ["wine", "ink", "blush"];
const toneAt = (i: number, offset = 0) => TONE_CYCLE[(i + offset) % TONE_CYCLE.length];

function Card({
  tone,
  className = "",
  children,
}: {
  tone: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const t = TONES[tone];
  return (
    <div data-reveal className={`rounded-[2rem] p-8 md:p-9 ${t.bg} ${t.text} ${className}`}>
      {children}
    </div>
  );
}

/* Etiqueta pequeña en mayúsculas (como el "01" de Servicios) */
function CardTag({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`text-xs uppercase tracking-[0.2em] ${TONES[tone].tag}`}>{children}</span>
  );
}

/* Acción de texto al pie de la card (como "Cotizar →") */
function CardLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] underline-offset-4 hover:underline"
    >
      {children}
    </a>
  );
}

/* Botón principal tipo píldora dentro de una card */
function CardButton({
  tone,
  href,
  children,
  external = false,
}: {
  tone: Tone;
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex w-full items-center justify-between rounded-full px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] ${TONES[tone].btn}`}
    >
      {children}
    </a>
  );
}

/* Elemento de acordeón con el diseño de las cards: cabecera clicable (etiqueta,
   título, extras y botón +) y panel que se despliega con una transición de altura.
   Al pasar el cursor la card se eleva y un halo sigue al puntero. */
function AccordionItem({
  id,
  tone,
  tag,
  title,
  icon: Icon,
  badge,
  glow = false,
  curtain = false,
  dimmed = false,
  open,
  onToggle,
  children,
}: {
  id: string;
  tone: Tone;
  tag: React.ReactNode;
  title: React.ReactNode;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  /* Borde con iluminación en movimiento (plan recomendado) */
  glow?: boolean;
  /* Despliegue tipo cortina/folleto: desaceleración más larga y contenido que cae */
  curtain?: boolean;
  /* Atenuar (cuando otra card del grupo está abierta) */
  dimmed?: boolean;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const t = TONES[tone];
  const panelId = `acc-panel-${id}`;
  const btnId = `acc-btn-${id}`;
  const onLight = tone === "blush" || tone === "light";
  const ease = curtain
    ? "duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
    : "duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";
  const hoverFill = onLight
    ? "group-hover:border-[#171715] group-hover:bg-[#171715] group-hover:text-white"
    : "group-hover:border-white group-hover:bg-white group-hover:text-[#171715]";

  const trackPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div data-reveal className={open ? "h-full" : "self-start"}>
      <div
        onMouseMove={trackPointer}
        className={`plan-lift h-full rounded-[2rem] ${glow ? "glow-border" : ""} ${
          open ? "is-open" : ""
        } ${dimmed ? "is-dimmed" : ""}`}
      >
        <div
          className={`spotlight relative h-full overflow-hidden ${
            glow ? "rounded-[calc(2rem-2px)]" : "rounded-[2rem]"
          } ${onLight ? "spot-dark" : "spot-light"} ${t.bg} ${t.text}`}
        >
          <h4>
            <button
              id={btnId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={onToggle}
              className="group flex w-full items-center justify-between gap-6 px-7 py-6 text-left md:px-9 md:py-7"
            >
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-3">
                  <CardTag tone={tone}>{tag}</CardTag>
                  {badge}
                </span>
                <span className="mt-3 flex items-center gap-3 font-display text-3xl leading-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 md:text-4xl">
                  {Icon && (
                    <span
                      aria-hidden
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[20deg] ${
                        onLight ? "border-[#171715]/20" : "border-white/25"
                      } ${t.accent}`}
                    >
                      <Icon size={18} strokeWidth={1.25} />
                    </span>
                  )}
                  <span>{title}</span>
                </span>
              </span>
              <span
                aria-hidden
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all ${ease} ${
                  curtain && open
                    ? "border-[#171715] bg-[#171715] text-white"
                    : onLight
                      ? "border-[#171715]/30"
                      : "border-white/30"
                } ${hoverFill} ${open ? "rotate-45" : ""}`}
              >
                <Plus size={20} strokeWidth={1.5} />
              </span>
            </button>
          </h4>
          <div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            className={`grid transition-[grid-template-rows] ${ease} ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div
                data-open={open}
                className={`acc-body ${curtain ? "curtain" : ""} mx-7 border-t pb-8 pt-6 md:mx-9 ${t.line} transition-opacity duration-500 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const waLink = (msg: string) => `https://wa.me/51994404466?text=${encodeURIComponent(msg)}`;

/* Card de la sección de Servicios (pregunta + servicio + cotizar) */
function ServiceCard({
  it,
  n,
}: {
  it: { q: string; t: string; d: string; tone: Tone; href: string };
  n: number;
}) {
  return (
    <Card
      tone={it.tone}
      className="flex h-full min-h-[230px] flex-col justify-between border border-white/10 p-6! md:p-7!"
    >
      <div>
        <CardTag tone={it.tone}>0{n}</CardTag>
        <h3 className="mt-3 font-display text-2xl leading-tight md:text-[1.75rem]">{it.q}</h3>
      </div>
      <div className="mt-6">
        <p className="font-medium">{it.t}</p>
        <p className={`mt-2 text-sm leading-relaxed ${TONES[it.tone].sub}`}>{it.d}</p>
        <div className="mt-5">
          <CardLink href={it.href}>Cotizar →</CardLink>
        </div>
      </div>
    </Card>
  );
}

function Services() {
  const items: { q: string; t: string; d: string; tone: Tone; href: string }[] = [
    {
      q: "¿No sabes qué publicar en redes?",
      t: "Estrategia de contenido",
      d: "Investigación, calendario editorial, pilares de comunicación y dirección creativa alineada con los objetivos de tu marca.",
      tone: "noir",
      href: "#onboarding",
    },
    {
      q: "¿Tu contenido no se ve profesional?",
      t: "Producción creativa",
      d: "Grabación profesional, dirección creativa, edición de Reels, diseño gráfico, motion graphics y copywriting.",
      tone: "noir",
      href: "#planes-creacion",
    },
    {
      q: "¿Publicas sin constancia ni resultados?",
      t: "Gestión y optimización",
      d: "Programación, publicación, stories, análisis de métricas y optimización continua basada en resultados.",
      tone: "noir",
      href: "#planes-gestion",
    },
  ];

  /* Carrusel infinito: se duplican las cards para que el loop funcione aunque
     se vean 3 a la vez en escritorio */
  const slides = [...items, ...items];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap() % items.length);
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, items.length]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const arrowBtn =
    "flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-[#171715]";

  return (
    <section
      id="servicios"
      data-nav-dark
      className="flex items-center bg-[#0E0E0D] py-12 md:py-10 lg:min-h-[calc(100svh-72px)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <SectionHeading
          kicker="¿Reconoces tu marca en estas"
          word="Situaciones"
          end="?"
          dark
          aside={
            <p className="hidden max-w-xs shrink-0 text-base leading-relaxed text-white/60 md:block">
              Diseñamos, producimos y gestionamos tu contenido para que destaque, conecte y
              convierta.
            </p>
          }
        />

        {/* Escritorio: cards fijas */}
        <div className="hidden grid-cols-3 gap-5 lg:grid">
          {items.map((it, i) => (
            <ServiceCard key={it.t} it={it} n={i + 1} />
          ))}
        </div>

        {/* Móvil y tablet: carrusel con flechas */}
        <div className="lg:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-5 flex touch-pan-y">
              {slides.map((it, i) => (
                <div
                  key={`${it.t}-${i}`}
                  className="min-w-0 shrink-0 grow-0 basis-[88%] pl-5 sm:basis-1/2"
                >
                  <ServiceCard it={it} n={(i % items.length) + 1} />
                </div>
              ))}
            </div>
          </div>

          {/* Controles: posición actual + flechas */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {items.map((it, i) => (
                <span
                  key={it.t}
                  className={`h-[2px] rounded-full transition-all duration-500 ${
                    i === current ? "w-10 bg-[#C25A72]" : "w-5 bg-white/20"
                  }`}
                />
              ))}
              <span className="ml-2 text-xs tracking-[0.2em] text-white/50">
                0{current + 1} / 0{items.length}
              </span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={prev} aria-label="Card anterior" className={arrowBtn}>
                <ArrowLeft size={18} strokeWidth={1.5} />
              </button>
              <button type="button" onClick={next} aria-label="Card siguiente" className={arrowBtn}>
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-sm text-white/50">
          Especialistas en {["Moda", "Beauty", "Editorial", "Producto"].join(" · ")}
        </p>
      </div>
    </section>
  );
}

/* ---------------- Sobre mí ----------------
   Pantalla completa: foto a la izquierda (sin bordes redondeados) y, a la derecha,
   paneles de texto. En escritorio la sección queda fija y, con el scroll, el texto se
   desplaza horizontalmente: filosofía → experiencia → KPIs (un panel por paso, con
   snapping). En móvil todo se apila. */
function AboutMe() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [panel, setPanel] = useState(0);
  const panels = 3;

  useEffect(() => {
    const track = trackRef.current;
    const row = rowRef.current;
    if (!track || !row) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!mq.matches) {
        row.style.transform = "";
        setPanel(0);
        return;
      }
      const r = track.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 0;
      row.style.transform = `translate3d(${-p * (panels - 1) * 100}%, 0, 0)`;
      setPanel(Math.round(p * (panels - 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const label = "text-[10px] uppercase tracking-[0.25em] text-[#77746E]";

  return (
    <section id="porque" className="bg-white text-[#171715] lg:scroll-mt-0">
      <div ref={trackRef} className="relative lg:h-[300vh]">
        {/* Puntos de snapping: uno por panel (el primero lo da el inicio de la sección) */}
        {Array.from({ length: panels - 1 }, (_, i) => (
          <span
            key={i}
            aria-hidden
            data-snap
            className="pointer-events-none absolute left-0 hidden h-px w-px lg:block"
            style={{ top: `${(i + 1) * 100}vh` }}
          />
        ))}

        <div className="lg:sticky lg:top-0 lg:grid lg:h-screen lg:grid-cols-12 lg:overflow-hidden">
          {/* Foto */}
          <div className="flex items-center justify-center px-6 pt-24 md:px-12 lg:col-span-5 lg:h-full lg:px-12 lg:pb-12 lg:pt-28">
            <div className="aspect-[856/1280] w-full max-w-sm overflow-hidden lg:h-full lg:w-auto lg:max-w-none">
              <img
                src="/about_me.jpeg"
                alt="Ana González, directora creativa"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="relative flex flex-col px-6 py-14 md:px-12 lg:col-span-7 lg:h-full lg:px-12 lg:pb-12 lg:pt-28 xl:pr-24">
            <span className={label}>Sobre mí</span>

            <div className="mt-8 lg:flex-1 lg:overflow-hidden">
              <div
                ref={rowRef}
                className="flex flex-col gap-16 will-change-transform lg:h-full lg:flex-row lg:gap-0"
              >
                {/* 1. Filosofía */}
                <article className="lg:flex lg:h-full lg:w-full lg:shrink-0 lg:flex-col lg:justify-start lg:pr-10">
                  <p className="cover-md font-display text-[#6E1E2D]">
                    “Para vender, primero
                    <br />
                    hay que conectar.”
                  </p>
                  <p className="mt-8 max-w-xl text-base leading-relaxed text-[#171715]/70">
                    No se trata solo de crear contenido bonito, sino de comunicar con intención y
                    tener una estrategia detrás de cada publicación. Mi enfoque es crear contenido
                    que conecte con tu audiencia, transmita la esencia de tu marca y te ayude a
                    alcanzar resultados reales y medibles. Porque una buena estética atrae, pero una
                    buena estrategia hace la diferencia.
                  </p>
                  <a
                    href="#contacto"
                    className="group mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#171715] px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-white transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:bg-[#6E1E2D]"
                  >
                    Conversemos
                    <span
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </a>
                </article>

                {/* 2. Experiencia */}
                <article className="lg:flex lg:h-full lg:w-full lg:shrink-0 lg:flex-col lg:justify-start lg:pr-10">
                  <h3 className="cover-md font-display">Hola, soy Ana</h3>
                  <p className="mt-3 font-display text-2xl leading-tight text-[#6E1E2D] md:text-3xl">
                    Freelancer, Content Manager y Directora Creativa
                  </p>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-[#171715]/70">
                    Trabajo con marcas de{" "}
                    <strong className="font-semibold text-[#171715]">moda y belleza</strong> que
                    quieren dejar de publicar por publicar. Mi trabajo no empieza grabando un reel:
                    empieza entendiendo tu negocio.
                  </p>
                  <span className={`${label} mt-10 block`}>Formación especializada</span>
                  <ul className="mt-3 max-w-xl">
                    {[
                      "Marketing Digital, Analytics y UX.",
                      "Dirección Creativa y Storytelling Visual.",
                      "Bachiller en Comunicaciones Audiovisuales.",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 border-b border-[#171715]/10 py-3 text-[15px] text-[#171715]/80"
                      >
                        <Sparkle
                          size={14}
                          strokeWidth={1.75}
                          className="mt-1 shrink-0 text-[#6E1E2D]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                {/* 3. KPIs */}
                <article className="lg:flex lg:h-full lg:w-full lg:shrink-0 lg:flex-col lg:justify-start lg:pr-10">
                  <span className={label}>En números</span>
                  <div className="mt-6 max-w-xl">
                    {[
                      ["6+", "Años de trayectoria"],
                      ["10+", "Marcas gestionadas"],
                      ["360°", "Servicio integral"],
                    ].map(([n, l]) => (
                      <div
                        key={l}
                        className="flex items-baseline justify-between gap-6 border-b border-[#171715]/10 py-5"
                      >
                        <span className="font-display text-6xl leading-none xl:text-7xl">{n}</span>
                        <span className="text-right text-xs uppercase tracking-[0.2em] text-[#77746E]">
                          {l}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>

            {/* Progreso (escritorio) */}
            <div className="mt-8 hidden items-center justify-between lg:flex">
              <div className="flex items-center gap-3">
                {Array.from({ length: panels }, (_, i) => (
                  <span
                    key={i}
                    className={`h-[2px] rounded-full transition-all duration-500 ${
                      i === panel ? "w-10 bg-[#6E1E2D]" : "w-5 bg-[#171715]/15"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs tracking-[0.2em] text-[#77746E]">
                  0{panel + 1} / 0{panels}
                </span>
              </div>
              <span
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#77746E] transition-opacity duration-500"
                style={{ opacity: panel < panels - 1 ? 1 : 0 }}
              >
                Sigue bajando <span className="scroll-hint inline-block">↓</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Onboarding (Before Pricing) ---------------- */
function Onboarding() {
  const steps = [
    {
      w: "Paso 1",
      t: "Descubrimiento",
      d: "Reunión para conocer la marca, objetivos, público y necesidades específicas.",
    },
    {
      w: "Paso 2",
      t: "Auditoría y análisis",
      d: "Revisión de redes sociales, contenido actual y referentes/competencia.",
    },
    {
      w: "Paso 3",
      t: "Estilo y comunicación",
      d: "Definición de dirección visual, tono y líneas de comunicación.",
    },
    {
      w: "Paso 4",
      t: "Plan de contenido",
      d: "Planificación del primer mes, pilares de contenido y calendario.",
    },
  ];

  /* Timeline con scroll.
     Escritorio: la sección queda fija mientras se hace scroll; la línea horizontal se
     llena y cada etapa se enciende en orden.
     Móvil: línea vertical que se llena al ir bajando. */
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    if (!track || !line) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      let p: number;
      let last = -1;
      if (mq.matches) {
        const r = track.getBoundingClientRect();
        const span = r.height - window.innerHeight;
        p = span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 1;
        steps.forEach((_, i) => {
          if (p >= i / steps.length + 0.02) last = i;
        });
      } else {
        const r = line.getBoundingClientRect();
        const mid = window.innerHeight * 0.6;
        p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
        line.querySelectorAll<HTMLElement>("[data-step]").forEach((row, i) => {
          if (row.getBoundingClientRect().top + 24 < mid) last = i;
        });
      }
      line.style.setProperty("--progress", String(p));
      setReached(last);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  return (
    <section id="onboarding" data-nav-dark className="bg-[#0E0E0D] text-white">
      <div ref={trackRef} className="relative lg:h-[220vh]">
        <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pb-8 lg:pt-24">
          {/* Título con la intro y el beneficio al costado (una sola fila) */}
          <SectionHeading
            kicker="Onboarding"
            word="Estratégico"
            dark
            aside={
              <div className="hidden max-w-xl shrink lg:block">
                <p className="text-sm leading-relaxed text-white/60">
                  El Onboarding Estratégico permite construir una estrategia personalizada antes de
                  iniciar la producción de contenido. Este proceso asegura que todo el material
                  tenga coherencia con los objetivos de la marca.
                </p>
                <div className="mt-4 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-white/10 bg-gradient-to-r from-[#171715] via-[#2A1A1F] to-[#6B1D2F] px-5 py-2.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E7B9C4]">
                    Beneficio especial
                  </span>
                  <span className="text-xs text-white/80">
                    Sin costo adicional al contratar un plan mensual de 3 meses.
                  </span>
                </div>
              </div>
            }
          />

          {/* Móvil y tablet: intro y beneficio debajo del título */}
          <div className="mb-10 lg:hidden">
            <p className="max-w-2xl text-base leading-relaxed text-white/60">
              El Onboarding Estratégico permite construir una estrategia personalizada antes de
              iniciar la producción de contenido. Este proceso asegura que todo el material tenga
              coherencia con los objetivos de la marca.
            </p>
            <Card tone="noir" className="mt-6 border border-white/10 p-6!">
              <CardTag tone="noir">Beneficio especial</CardTag>
              <p className={`mt-2 text-sm leading-relaxed ${TONES.noir.sub}`}>
                Sin costo adicional al contratar un plan mensual de 3 meses.
              </p>
            </Card>
          </div>

          {/* Timeline: vertical en móvil, horizontal en escritorio */}
          <div ref={lineRef} className="timeline relative">
            <div
              aria-hidden
              className="absolute bottom-0 left-4 top-0 w-px bg-white/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-4 lg:h-px lg:w-auto"
            >
              <div className="timeline-fill absolute inset-0 bg-gradient-to-b from-[#C25A72] to-[#6B1D2F] lg:bg-gradient-to-r" />
            </div>

            <ol className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
              {steps.map((s, i) => {
                const on = i <= reached;
                return (
                  <li
                    key={s.w}
                    data-step
                    className={`timeline-row relative pl-12 lg:pl-0 lg:pt-12 ${on ? "is-on" : ""}`}
                  >
                    {/* Punto sobre la línea */}
                    <span
                      aria-hidden
                      className={`absolute left-4 top-6 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border text-[10px] tabular-nums transition-all duration-700 lg:left-0 lg:top-0 lg:translate-x-0 ${
                        on
                          ? "border-[#C25A72] bg-[#6B1D2F] text-white shadow-[0_0_0_6px_rgba(194,90,114,0.15)]"
                          : "border-white/20 bg-[#0E0E0D] text-white/40"
                      }`}
                    >
                      0{i + 1}
                    </span>

                    <div className="timeline-card">
                      <div
                        className={`flex h-full flex-col rounded-[2rem] border p-6 transition-colors duration-700 lg:min-h-[210px] ${
                          on
                            ? "border-white/15 bg-gradient-to-br from-[#171715] via-[#2A1A1F] to-[#6B1D2F]"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                          0{i + 1} · {s.w}
                        </span>
                        <h3 className="mt-3 font-display text-2xl leading-tight xl:text-3xl">
                          {s.t}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/65">{s.d}</p>
                        <p className="mt-auto pt-5 text-[10px] uppercase tracking-[0.2em] text-[#E7B9C4]/70">
                          Fase metodológica
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Portfolio / Panel editorial de proyectos ---------------- */
const projects = [
  // Moda / sesiones con modelos (protagonistas del panel)
  { t: "Fashion Editorial", k: "Moda · Color · Actitud", id: "245823383" },
  { t: "Look de Noche", k: "Noche · Elegancia · Movimiento", id: "242964371" },
  { t: "Behind the Scenes", k: "Proceso · Locación · Equipo", id: "245582333" },
  { t: "Retrato Editorial", k: "Detalle · Joyería · Mirada", id: "242393831" },
  { t: "Look de Verano", k: "Verano · Luz · Libertad", id: "242394175" },
  // Save the Date
  { t: "Save the Date", k: "Amor · Cine · Promesa", id: "245861779" },
  // Gastronomía
  { t: "Paco Yonque", k: "Atmósfera · Sabor · Memoria", id: "232174275" },
  { t: "En la Cocina", k: "Fuego · Oficio · Ritual", id: "245823969" },
  { t: "El Horno de Paco", k: "Tradición · Calor · Origen", id: "232086303" },
];

/* Mosaico superior (moda): 4 columnas x 2 filas en escritorio */
const tileSpans = [
  "col-span-2 row-span-2", // Fashion Editorial (destacado)
  "row-span-2", // Look de Noche
  "", // Behind the Scenes
  "", // Retrato Editorial
];

/* Texto que aparece letra por letra al pasar el cursor */
function Lettering({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  let n = 0;
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {[...word].map((ch, c) => (
            <span
              key={c}
              className="letter"
              style={{ "--d": `${delay + n++ * 22}ms` } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
          {" "}
        </span>
      ))}
    </span>
  );
}

/* Un proyecto del panel: portada + texto con lettering en hover */
function ProjectTile({
  p,
  index,
  className = "",
}: {
  p: (typeof projects)[number];
  index: number;
  className?: string;
}) {
  return (
    <a
      href={`https://www.behance.net/gallery/${p.id}/project`}
      target="_blank"
      rel="noopener noreferrer"
      className={`tile group relative block overflow-hidden bg-[#171715] ${className}`}
    >
      {/* Embed recortado para mostrar solo la portada, cubriendo el tile */}
      <iframe
        src={`https://www.behance.net/embed/project/${p.id}?ilo0=1`}
        className="tile-media pointer-events-none absolute border-0"
        scrolling="no"
        loading="lazy"
        frameBorder={0}
        title={p.t}
      />

      <div className="tile-veil pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171715]/85 via-[#171715]/25 to-transparent" />

      <span className="pointer-events-none absolute left-4 top-4 text-[10px] tracking-[0.2em] text-white/80 md:left-5 md:top-5">
        <Lettering text={String(index + 1).padStart(2, "0")} />
      </span>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
        <Lettering
          text={p.k}
          className="block text-[10px] uppercase tracking-[0.2em] text-white/75"
        />
        <Lettering
          text={p.t}
          delay={180}
          className="mt-2 block font-display text-xl leading-tight text-white md:text-3xl"
        />
      </div>
    </a>
  );
}

function Portfolio() {
  /* Moda en mosaico; Look de Verano + Save the Date y gastronomía en filas con la
     proporción de la portada de Behance (404/316) para que se vean completas */
  const mosaic = projects.slice(0, 4);
  const featured = projects.slice(4, 6);
  const food = projects.slice(6);

  return (
    <section id="trabajos" className="bg-[#F8F7F4] py-12 md:py-16">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <SectionHeading
          kicker="Proyectos con"
          word="Historia"
          aside={
            <a
              href="https://www.behance.net/anagonzlez8/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="link-u hidden shrink-0 text-xs uppercase tracking-[0.18em] text-[#171715] sm:inline-flex"
            >
              Ver todo en Behance ↗
            </a>
          }
        />

        <div className="grid grid-cols-2 auto-rows-[120px] gap-2 sm:auto-rows-[150px] md:grid-cols-4 md:gap-3 lg:auto-rows-[180px]">
          {mosaic.map((p, i) => (
            <ProjectTile key={p.id} p={p} index={i} className={tileSpans[i]} />
          ))}
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:mt-3 md:gap-3">
          {featured.map((p, i) => (
            <ProjectTile key={p.id} p={p} index={i + 4} className="aspect-[404/316]" />
          ))}
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 md:mt-3 md:gap-3">
          {food.map((p, i) => (
            <ProjectTile key={p.id} p={p} index={i + 6} className="aspect-[404/316]" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing Section (All monetary prices completely removed) ---------------- */
/* ---------------- Collage editorial (Planes de Gestión) ----------------
   Fotos dispersas tipo maquetación de revista con paralaje sutil: cada pieza se
   mueve a distinta velocidad con el scroll y el cursor (rango aprox. -10px a 15px). */
const collagePieces: {
  src: string;
  alt: string;
  depth: number;
  className: string;
}[] = [
  {
    src: "/planes2/gc1.jpeg",
    alt: "",
    depth: 15,
    className: "left-0 top-0 w-[30%] h-[88%]",
  },
  {
    src: "/planes2/gc2.jpeg",
    alt: "",
    depth: -10,
    className: "left-[32%] top-[16%] w-[15%] h-[84%]",
  },
  {
    src: "/planes2/gc3.jpeg",
    alt: "",
    depth: 8,
    className: "left-[49%] top-0 w-[19%] h-[72%]",
  },
  {
    src: "/planes2/gc4.jpeg",
    alt: "",
    depth: -6,
    className: "left-[70%] top-[22%] w-[16%] h-[78%]",
  },
  {
    src: "/planes2/gc5.jpeg",
    alt: "",
    depth: 12,
    className: "right-0 top-[4%] w-[12%] h-[58%]",
  },
];

function EditorialCollage({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
    let mx = 0;
    let my = 0;
    let raf = 0;

    const render = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      /* -1 (entrando por abajo) → 1 (saliendo por arriba) */
      const p = Math.max(
        -1,
        Math.min(1, (window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight),
      );
      items.forEach((el) => {
        const d = Number(el.dataset.depth);
        el.style.transform = `translate3d(${mx * d * 0.6}px, ${p * d + my * d * 0.6}px, 0)`;
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      schedule();
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={`relative h-[210px] ${className}`}>
      <div data-reveal className="absolute inset-0">
        {collagePieces.map((pc) => (
          <figure
            key={pc.src}
            data-depth={pc.depth}
            className={`collage-piece absolute overflow-hidden rounded-[0.35rem] shadow-[0_18px_40px_-24px_rgba(23,23,21,0.45)] ${pc.className}`}
          >
            <img src={pc.src} alt={pc.alt} loading="lazy" className="h-full w-full object-cover" />
          </figure>
        ))}
      </div>
    </div>
  );
}

/* Subtítulo de cada grupo de planes (fuera de Pricing para que no se vuelva a montar en cada render) */
function GroupHeader({
  id,
  n,
  kicker,
  word,
  chip,
  desc,
}: {
  id?: string;
  n: string;
  kicker: string;
  word: string;
  chip?: string;
  desc: string;
}) {
  return (
    <div
      data-reveal
      id={id}
      className={`mb-6 flex scroll-mt-28 flex-wrap items-end justify-between gap-x-10 gap-y-3 md:mb-8 ${
        n === "1" ? "mt-0" : "mt-12 md:mt-16"
      }`}
    >
      <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
        <CoverTitle
          as="h3"
          size="md"
          kicker={
            <>
              <span className="mr-2 text-[#6E1E2D]">0{n}</span>
              {kicker}
            </>
          }
          word={word}
        />
        {chip && (
          <span className="mb-2 rounded-full bg-[#171715] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
            {chip}
          </span>
        )}
      </div>
      <p className="max-w-md pb-1 text-sm leading-relaxed text-[#77746E]">{desc}</p>
    </div>
  );
}

/* ---------------- Servicios complementarios en un solo bloque ----------------
   Barra lateral con los módulos y, a la derecha, todo el módulo activo de un vistazo:
   planes en formas abstractas (degradado negro → vino) con su descripción, más una
   imagen vertical estrecha. */
type HubItem = {
  label: string;
  sub?: string;
  highlight?: boolean;
  text?: string;
  msg: string;
};

type HubModule = {
  id: string;
  n: string;
  kicker: string;
  word: string;
  chip?: string;
  desc: string;
  side: string;
  icon: LucideIcon;
  image: string;
  items: HubItem[];
  /* Contenido adicional de la card (cuando el módulo tiene un solo plan) */
  extra?: React.ReactNode;
  /* Contenido propio que reemplaza la lista de planes (p. ej. el deslizador de videos) */
  body?: React.ReactNode;
};

/* Card del plan: solo borde marcado, sin fondo (sobre el degradado negro → vino) */
const planCard = (highlight?: boolean) =>
  `plan-card flex flex-col rounded-2xl border p-5 transition-colors duration-500 md:p-6 ${
    highlight ? "border-[#E7B9C4]" : "border-white/35 hover:border-white"
  }`;

function PlanTitle({ it, big = false }: { it: HubItem; big?: boolean }) {
  return (
    <div>
      <p
        key={it.label}
        className={`hub-swap font-display leading-tight text-white ${
          big ? "text-4xl xl:text-5xl" : "text-2xl"
        }`}
      >
        {it.label}
      </p>
      {it.sub && (
        <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/50">
          {it.sub}
        </span>
      )}
    </div>
  );
}

const CotizarLink = ({ msg }: { msg: string }) => (
  <a
    href={waLink(msg)}
    target="_blank"
    rel="noreferrer"
    className="group mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#E7B9C4]"
  >
    Cotizar
    <span
      aria-hidden
      className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1"
    >
      →
    </span>
  </a>
);

/* Edición: una sola card y un deslizador. Al moverlo cambia la cantidad de
   videos, la descripción y el mensaje para cotizar. */
function VideoSlider({ packages }: { packages: { qty: number; desc: string }[] }) {
  const [idx, setIdx] = useState(0);
  const pkg = packages[idx];
  const pct = (idx / (packages.length - 1)) * 100;

  return (
    <div className={`${planCard()} mx-auto w-full max-w-xl items-center text-center`}>
      <PlanTitle
        it={{
          label: `${pkg.qty} videos`,
          msg: `Hola, me interesa cotizar un paquete de ${pkg.qty} videos`,
        }}
        big
      />
      <p
        key={pkg.qty}
        className="hub-swap mt-6 min-h-[2.5rem] max-w-sm text-sm leading-relaxed text-white/65"
      >
        {pkg.desc}
      </p>

      <div className="mt-6 w-full max-w-md">
        <input
          type="range"
          min={0}
          max={packages.length - 1}
          step={1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          aria-label="Cantidad de videos"
          aria-valuetext={`${pkg.qty} videos`}
          className="video-range w-full"
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
        />
        <div className="mt-3 flex justify-between">
          {packages.map((p, i) => (
            <button
              key={p.qty}
              type="button"
              onClick={() => setIdx(i)}
              className={`w-8 text-xs tabular-nums transition-colors ${
                i === idx ? "font-medium text-[#E7B9C4]" : "text-white/45 hover:text-white"
              }`}
            >
              {p.qty}
            </button>
          ))}
        </div>
      </div>

      <CotizarLink msg={`Hola, me interesa cotizar un paquete de ${pkg.qty} videos`} />
    </div>
  );
}

function ServicesHub({ id, modules }: { id?: string; modules: HubModule[] }) {
  const [active, setActive] = useState(0);
  const mod = modules[active];
  const select = (i: number) => setActive(i);
  const cols =
    mod.items.length >= 5
      ? "sm:grid-cols-3 lg:grid-cols-5"
      : mod.items.length === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <div
      id={id}
      data-reveal
      data-snap
      className="paper mt-12 scroll-mt-24 rounded-[2.5rem] p-4 md:mt-16 md:p-5 lg:h-[calc(100svh-7rem)] lg:min-h-[600px]"
    >
      <div className="grid grid-cols-1 gap-4 lg:h-full lg:grid-cols-12">
        {/* Barra lateral */}
        <nav
          aria-label="Servicios complementarios"
          className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 lg:col-span-3 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {modules.map((m, i) => {
            const on = i === active;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={on}
                onClick={() => select(i)}
                className={`group flex min-w-[220px] items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] lg:min-w-0 ${
                  on
                    ? "border-[#171715] bg-[#171715] text-white shadow-[0_18px_40px_-24px_rgba(23,23,21,0.6)]"
                    : "border-[#171715]/10 bg-white text-[#171715] hover:border-[#171715]/40"
                }`}
              >
                <span
                  aria-hidden
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                    on ? "border-white/25" : "border-[#171715]/15"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.4} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[10px] uppercase tracking-[0.2em] ${
                      on ? "text-white/55" : "text-[#77746E]"
                    }`}
                  >
                    Servicio {m.n}
                  </span>
                  <span className="block font-display text-xl leading-tight">
                    {m.kicker} {m.word}
                  </span>
                  <span className={`block text-xs ${on ? "text-white/60" : "text-[#77746E]"}`}>
                    {m.side}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  size={16}
                  strokeWidth={1.5}
                  className={`shrink-0 transition-transform duration-500 ${
                    on
                      ? "translate-x-0.5"
                      : "opacity-40 group-hover:translate-x-0.5 group-hover:opacity-100"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Módulo activo: todo consolidado en una sola tarjeta */}
        <div
          key={mod.id}
          className="hub-swap hub-dark flex gap-5 overflow-hidden rounded-[2rem] border border-[#171715] bg-gradient-to-br from-[#0E0E0D] via-[#2A1A1F] to-[#6B1D2F] p-6 text-white md:p-7 lg:col-span-9 lg:min-h-0"
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
              <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
                <CoverTitle
                  as="h3"
                  size="sm"
                  kicker={
                    <>
                      <span className="mr-2 text-[#C25A72]">{m2(mod.n)}</span>
                      {mod.kicker}
                    </>
                  }
                  word={mod.word}
                  dark
                />
                {mod.chip && (
                  <span className="mb-2 rounded-full border border-white/25 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                    {mod.chip}
                  </span>
                )}
              </div>
              <p className="max-w-sm pb-1 text-sm leading-relaxed text-white/55">{mod.desc}</p>
            </div>

            <div className="mt-5 flex min-h-0 flex-1 items-center border-t border-white/10 pt-5">
              {mod.body ? (
                mod.body
              ) : mod.extra ? (
                /* Un solo plan: una card con el nombre a la izquierda y el detalle al costado */
                <div className={`${planCard(mod.items[0].highlight)} w-full gap-4`}>
                  <PlanTitle it={mod.items[0]} />
                  <div className="min-w-0 border-t border-white/15 pt-4">
                    {mod.extra}
                    <CotizarLink msg={mod.items[0].msg} />
                  </div>
                </div>
              ) : (
                /* Varios planes: cards con borde, descripción y cotizar */
                <div className={`grid w-full grid-cols-1 gap-4 ${cols}`}>
                  {mod.items.map((it) => (
                    <div key={it.label} className={planCard(it.highlight)}>
                      <PlanTitle it={it} />
                      {it.text && (
                        <p className="mt-4 flex-1 text-xs leading-relaxed text-white/65 xl:text-[13px]">
                          {it.text}
                        </p>
                      )}
                      <div className="mt-4 border-t border-white/15 pt-1">
                        <CotizarLink msg={it.msg} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Imagen vertical estrecha */}
          <div className="relative hidden w-24 shrink-0 overflow-hidden rounded-[1.5rem] bg-[#171715] md:block xl:w-28">
            {modules.map((m, i) => (
              <img
                key={m.id}
                src={m.image}
                alt=""
                aria-hidden
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* "3" → "03" */
const m2 = (n: string) => n.padStart(2, "0");

function Pricing() {
  const creationPlans: {
    tag: string;
    sub: string;
    bullets: string[];
    contentCount: string;
    distributions: string[];
    note: string;
    highlight: boolean;
    tone: Tone;
    icon: LucideIcon;
  }[] = [
    {
      tag: "Esencial",
      icon: Sparkle,
      sub: "Para marcas que necesitan contenido constante sin contratar una gestión completa.",
      bullets: [
        "Reunión mensual de planificación",
        "1 sesión de grabación de hasta 3 a 4 horas",
        "Grabación con equipo profesional",
        "Copywriting",
        "Subtítulos",
        "Edición",
        "1 ronda de cambios",
        "Entrega de archivos finales",
        "Sugerencia de días y horarios óptimos para publicar",
      ],
      contentCount: "8 contenidos",
      distributions: ["4 Reels + 4 piezas gráficas", "6 Reels + 2 piezas gráficas", "8 Reels"],
      note: "No incluye publicación ni stories.",
      highlight: false,
      tone: "light",
    },
    {
      tag: "Crecimiento",
      icon: TrendingUp,
      sub: "Para marcas que quieren una producción más constante y estratégica.",
      bullets: [
        "Reunión de planificación de grabación mensual",
        "Investigación de tendencias y referencias",
        "1 sesión de grabación de hasta 5 horas",
        "Dirección creativa",
        "Grabación con equipo profesional",
        "Copywriting estratégico + CTA",
        "Edición de color",
        "Subtítulos",
        "Motion graphics simples",
        "1 ronda de cambios",
        "Sugerencia de días y horarios óptimos para publicar",
      ],
      contentCount: "12 contenidos",
      distributions: [
        "6 Reels + 6 piezas gráficas",
        "8 Reels + 4 piezas gráficas",
        "10 Reels + 2 piezas gráficas",
      ],
      note: "No incluye publicación ni stories.",
      highlight: true,
      tone: "wine",
    },
    {
      tag: "Marca",
      icon: Gem,
      sub: "Para marcas que necesitan una producción visual más completa.",
      bullets: [
        "Reunión de planificación de grabación mensual",
        "Investigación de tendencias y referencias",
        "2 sesiones de grabación de hasta 4 horas",
        "Dirección creativa y de arte",
        "Grabación con equipo profesional",
        "Estrategia y conceptualización de campañas",
        "Copywriting + storytelling",
        "Edición avanzada + color",
        "Subtítulos",
        "Motion graphics",
        "1 ronda de cambios",
        "Sugerencia de días y horarios óptimos para publicar",
      ],
      contentCount: "14 contenidos",
      distributions: [
        "8 Reels + 6 piezas gráficas",
        "10 Reels + 4 piezas gráficas",
        "12 Reels + 2 piezas gráficas",
      ],
      note: "No incluye publicación ni stories.",
      highlight: false,
      tone: "light",
    },
  ];

  const gestionLevels = [
    {
      name: "Básica",
      icon: CalendarDays,
      items: ["Programación", "Publicación", "8 stories mensuales", "Calendario de publicación"],
    },
    {
      name: "Completa",
      icon: LayoutGrid,
      items: [
        "Programación",
        "Publicación",
        "16 stories mensuales",
        "Calendario de publicación",
        "Reporte mensual",
      ],
    },
    {
      name: "Estratégica",
      icon: ChartLine,
      items: [
        "Todo lo anterior",
        "Análisis de métricas",
        "Reunión mensual de resultados",
        "Recomendaciones de contenido",
      ],
    },
  ];

  const extras = [
    {
      t: "Pack 5 stories",
      icon: Layers,
      d: "Algunos en bloques de 3: portada, contenido principal, cierre + CTA.",
    },
    {
      t: "Cobertura de eventos",
      icon: Camera,
      d: "Cobertura audiovisual en locación con registro para redes. El cliente cubre movilidad.",
    },
    {
      t: "Entrega prioritaria 24h",
      icon: Clock,
      d: "Recibe tu contenido editado y listo para publicar en 24 horas tras la sesión.",
    },
  ];

  const adTiers = [
    {
      name: "Prueba inicial",
      icon: FlaskConical,
      scope: "Meta Ads · Google Ads",
      desc: "Monitoreo semanal, optimización continua y reporte mensual de resultados para marcas que inician en pauta.",
    },
    {
      name: "Recomendada",
      icon: Target,
      scope: "Meta Ads · Google Ads",
      desc: "Estrategia de conversión, pruebas de creativos y optimización de CPL orientada a ventas o leads calificados.",
    },
    {
      name: "Crecimiento",
      icon: Rocket,
      scope: "Meta Ads · Google Ads",
      desc: "Gestión avanzada de presupuestos de escalamiento con reporting analítico continuo y afinamiento de audiencias.",
    },
  ];

  const creatorDeliverables = [
    "Desarrollo de 10 ideas y guiones",
    "Edición profesional de 10 videos",
    "1 reunión breve de planificación mensual",
    "Subtítulos",
    "1 jornada de grabación de hasta 4 horas",
    "Música/sonidos y recursos de edición",
    "Grabación con equipo profesional",
    "Entrega optimizada: TikTok, Reels, Shorts",
    "Dirección durante la grabación",
    "1 ronda de cambios por video",
  ];

  const videoPackages = [
    { qty: 4, desc: "Ideal para campañas específicas o lanzamientos" },
    { qty: 6, desc: "Flujo constante para un mes de presencia activa" },
    { qty: 8, desc: "Cobertura semanal con 2 publicaciones audiovisuales" },
    { qty: 10, desc: "Volumen ideal para marcas con presencia diaria" },
    { qty: 12, desc: "Edición integral intensiva con alta frecuencia" },
  ];

  /* Gestión: las cards empiezan cerradas; cada una se abre/cierra por separado */
  const [gestionOpen, setGestionOpen] = useState<string[]>([]);

  const keyOf = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const cta = (tone: Tone, msg: string, i = 0) => (
    <div className="cta-wrap mt-8 sm:max-w-xs" style={{ "--i": i } as React.CSSProperties}>
      <CardButton tone={tone} href={waLink(msg)} external>
        <span>Cotizar</span>
        <span
          aria-hidden
          className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1.5"
        >
          →
        </span>
      </CardButton>
    </div>
  );

  const bulletList = (tone: Tone, items: string[], Mark: LucideIcon = Check, cols = false) => (
    <ul
      className={`grid grid-cols-1 gap-x-8 gap-y-2 text-sm ${cols ? "sm:grid-cols-2 lg:grid-cols-1" : ""} ${TONES[tone].sub}`}
    >
      {items.map((b, i) => (
        <li
          key={b}
          className="flex items-start gap-2.5"
          style={{ "--i": i } as React.CSSProperties}
        >
          <Mark size={14} strokeWidth={1.75} className={`mt-1 shrink-0 ${TONES[tone].accent}`} />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );

  const hubModules: HubModule[] = [
    {
      id: "extras",
      n: "3",
      kicker: "Servicios",
      word: "Extra",
      desc: "Módulos complementarios para necesidades específicas, activaciones y coberturas puntuales.",
      side: "Coberturas puntuales",
      icon: Layers,
      image: "/sec2/1.jpeg",
      items: extras.map((x) => ({
        label: x.t,
        text: x.d,
        msg: `Hola, me interesa cotizar: ${x.t}`,
      })),
    },
    {
      id: "pauta",
      n: "4",
      kicker: "Gestión de",
      word: "Pauta",
      chip: "Meta Ads · Google Ads",
      desc: "El fee de gestión es independiente del presupuesto de pauta, que se paga directamente a la plataforma (Meta o Google).",
      side: "Meta Ads · Google Ads",
      icon: Target,
      image: "/sec2/2.jpeg",
      items: adTiers.map((x) => ({
        label: x.name,
        highlight: x.name === "Recomendada",
        text: x.desc,
        msg: `Hola, me interesa gestión de pauta: ${x.name}`,
      })),
    },
    {
      id: "creadoras",
      n: "5",
      kicker: "Contenido mensual para",
      word: "Creadoras",
      chip: "Nuevo",
      desc: "Conceptualizamos, guionizamos, grabamos y editamos. Pensado para influencers y creadoras de contenido.",
      side: "10 videos por mes",
      icon: Clapperboard,
      image: "/sec2/3.jpeg",
      items: [
        {
          label: "Plan Creadoras",
          sub: "10 videos / mes",
          msg: "Hola, me interesa el plan para creadoras",
        },
      ],
      extra: (
        <>
          <CardTag tone="noir">Entregables incluidos</CardTag>
          <div className="mt-3 text-xs md:[&>ul]:grid-cols-2 xl:[&>ul]:grid-cols-3 [&>ul]:gap-y-1.5">
            {bulletList("noir", creatorDeliverables, Check)}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/50">
            <strong className="font-medium text-white">No incluye:</strong> Publicación y community
            management. La gestión de contenido se cotiza aparte.
          </p>
        </>
      ),
    },
    {
      id: "edicion",
      n: "6",
      kicker: "Videos",
      word: "Edición",
      desc: "Edito tus contenidos ya grabados y los convierto en resultados profesionales.",
      side: "Videos ya grabados",
      icon: Scissors,
      image: "/sec2/4.jpeg",
      items: [],
      body: <VideoSlider packages={videoPackages} />,
    },
  ];

  return (
    <section id="planes" className="pb-12 md:pb-16">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* 1. Creación de contenido: los tres planes en una sola pantalla */}
        <div className="flex flex-col justify-center py-8 lg:min-h-[calc(100svh-72px)] lg:py-6">
          <div className="paper rounded-[2.5rem] px-6 py-8 md:px-10 md:py-7">
            <GroupHeader
              id="planes-creacion"
              n="1"
              kicker="Planes de"
              word="Creación"
              desc="Este es el servicio principal. Aquí se piensa, produce y edita el contenido de tu marca."
            />

            <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
              {creationPlans.map((p, idx) => {
                const hl = p.highlight;
                const tone: Tone = hl ? "noir" : "light";
                const t = TONES[tone];
                const Icon = p.icon;
                const card = (
                  <article
                    className={`flex h-full flex-col p-6 xl:p-7 ${
                      hl
                        ? "rounded-[calc(2rem-2px)] bg-gradient-to-br from-[#171715] via-[#2A1A1F] to-[#6B1D2F] text-white"
                        : "rounded-[2rem] border border-[#171715]/15 bg-white text-[#171715] transition-colors duration-500 hover:border-[#171715]/50"
                    }`}
                  >
                    {/* Encabezado */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] uppercase tracking-[0.25em] ${t.tag}`}>
                        0{idx + 1} · {p.contentCount}
                      </span>
                      {hl && (
                        <span className="rounded-full border border-white/30 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white">
                          Recomendado
                        </span>
                      )}
                    </div>
                    <h4 className="mt-4 flex items-center gap-3 font-display text-4xl leading-none xl:text-[2.75rem]">
                      <Icon size={22} strokeWidth={1.25} className={t.accent} />
                      {p.tag}
                    </h4>
                    <p className={`mt-3 text-[13px] leading-relaxed ${t.sub}`}>{p.sub}</p>

                    {/* Opciones a elegir */}
                    <div className={`mt-5 border-t pt-4 ${t.line}`}>
                      <span className={`text-[10px] uppercase tracking-[0.2em] ${t.tag}`}>
                        Opciones a elegir
                      </span>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {p.distributions.map((d) => (
                          <span
                            key={d}
                            className={`rounded-full border px-2.5 py-1 text-[11px] ${
                              hl
                                ? "border-white/25 text-white/85"
                                : "border-[#171715]/15 text-[#171715]/80"
                            }`}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Incluye */}
                    <div className={`mt-5 border-t pt-4 ${t.line}`}>
                      <span className={`text-[10px] uppercase tracking-[0.2em] ${t.tag}`}>
                        Incluye en producción
                      </span>
                      <ul
                        className={`mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[12px] leading-snug ${t.sub}`}
                      >
                        {p.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-1.5">
                            <Check
                              size={12}
                              strokeWidth={2}
                              className={`mt-[3px] shrink-0 ${t.accent}`}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className={`mt-4 text-[11px] ${t.tag}`}>{p.note}</p>

                    <div className="mt-auto pt-5">
                      <CardButton
                        tone={tone}
                        href={waLink(`Hola, me interesa el plan ${p.tag}`)}
                        external
                      >
                        <span>Cotizar</span>
                        <span
                          aria-hidden
                          className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1.5"
                        >
                          →
                        </span>
                      </CardButton>
                    </div>
                  </article>
                );
                return (
                  <div key={p.tag} data-reveal className="h-full">
                    {hl ? <div className="glow-border h-full">{card}</div> : card}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Gestión de contenido: título + tira de collage arriba, cards en fila debajo
            (compacto para que todo quepa en una pantalla) */}
        <div
          id="planes-gestion"
          data-snap
          className="paper mt-12 scroll-mt-24 rounded-[2.5rem] px-6 py-8 md:mt-16 md:px-10 md:py-9"
        >
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5 [&>div]:mb-0! [&>div]:mt-0!">
              <GroupHeader
                n="2"
                kicker="Planes de"
                word="Gestión"
                chip="Add-on complementario"
                desc="Servicio complementario. Se puede añadir a cualquiera de los planes de creación para gestionar la publicación diaria y optimización."
              />
            </div>

            <EditorialCollage className="hidden lg:col-span-7 lg:block" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {gestionLevels.map((g, i) => {
              const tone: Tone = "light";
              const key = `gestion-${keyOf(g.name)}`;
              const open = gestionOpen.includes(key);
              return (
                <AccordionItem
                  key={g.name}
                  id={key}
                  tone={tone}
                  tag={`Nivel 0${i + 1}`}
                  title={g.name}
                  icon={g.icon}
                  curtain
                  open={open}
                  onToggle={() =>
                    setGestionOpen((cur) => (open ? cur.filter((k) => k !== key) : [...cur, key]))
                  }
                >
                  {bulletList(tone, g.items, Sparkle)}
                  {cta(tone, `Hola, me interesa la gestión ${g.name}`, g.items.length)}
                </AccordionItem>
              );
            })}
          </div>
        </div>

        {/* 3 a 6: servicios complementarios consolidados en un solo bloque */}
        <ServicesHub id="planes-servicios" modules={hubModules} />
      </div>
    </section>
  );
}

/* ---------------- Contacto: sobrio, fondo negro, solo un comentario ---------------- */
function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mensaje = String(new FormData(e.currentTarget).get("mensaje") ?? "").trim();
    if (!mensaje) return;
    window.open(waLink(`Hola Ana, ${mensaje}`), "_blank");
  };

  return (
    <section
      id="contacto"
      data-nav-dark
      className="flex items-center bg-[#0E0E0D] py-16 text-white lg:min-h-[calc(100svh-72px)] lg:py-12"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 [&>div]:mb-0!">
            <SectionHeading kicker="Hagamos crecer" word="Tu marca" dark />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
              Cuéntame en qué te puedo ayudar y te respondo por WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7">
            <label
              htmlFor="mensaje"
              className="block text-[10px] uppercase tracking-[0.25em] text-white/45"
            >
              Tu mensaje
            </label>
            <textarea
              required
              id="mensaje"
              name="mensaje"
              rows={4}
              placeholder="Escribe aquí tu comentario…"
              className="mt-4 w-full resize-none border-0 border-b border-white/20 bg-transparent pb-4 font-display text-2xl leading-snug text-white outline-none transition-colors placeholder:text-white/25 focus:border-white md:text-3xl"
            />
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="group inline-flex items-center gap-4 rounded-full bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-[#171715] transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:bg-[#F6E7EA]"
              >
                Enviar
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1.5"
                >
                  →
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer (Lundani Inspired) ---------------- */
function Footer() {
  return (
    <footer className="border-t border-[#D8D4CC] bg-[#EFEEE9] text-[#171715] py-12 md:py-16">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D8D4CC]">
          <div className="lg:col-span-6">
            <span className="font-display text-2xl md:text-3xl tracking-tight text-[#171715] block mb-4">
              ANNA GONZÁLEZ
            </span>
            <p className="mt-4 text-sm text-[#77746E] max-w-md leading-relaxed">
              Comunicadora Audiovisual, Content Manager y Freelance creativa, especialista en marcas
              de belleza y moda.
            </p>
          </div>

          <div className="lg:col-span-3">
            <span className="eyebrow text-[#77746E] block mb-4">Redes Sociales</span>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/annacore__/"
                  target="_blank"
                  rel="noreferrer"
                  className="link-u text-[#171715] hover:text-[#77746E]"
                >
                  <Instagram size={15} /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@lamanz.anita"
                  target="_blank"
                  rel="noreferrer"
                  className="link-u text-[#171715] hover:text-[#77746E]"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/anagonzlez8/projects"
                  target="_blank"
                  rel="noreferrer"
                  className="link-u text-[#171715] hover:text-[#77746E]"
                >
                  Behance
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/anagonzalezhi/"
                  target="_blank"
                  rel="noreferrer"
                  className="link-u text-[#171715] hover:text-[#77746E]"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <span className="eyebrow text-[#77746E] block mb-4">Contacto Directo</span>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:anagonzalezhi21@gmail.com"
                  className="link-u text-[#171715] hover:text-[#77746E]"
                >
                  <Mail size={15} /> anagonzalezhi21@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/51994404466"
                  target="_blank"
                  rel="noreferrer"
                  className="link-u text-[#171715] hover:text-[#77746E]"
                >
                  <Smartphone size={15} /> +51 994 404 466
                </a>
              </li>
              <li className="pt-2 text-xs text-[#77746E]">Lima, Perú · Atención global</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77746E]">
          <span>
            &copy; {new Date().getFullYear()} Anna González. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-2">
            <span>Web Design by JatzLab AI</span>
            <img src="/jatzlab.png" alt="JatzLab AI" className="h-6 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Main Landing Page ---------------- */
function LandingPage() {
  const [isReady, setIsReady] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [revealOn, setRevealOn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  /* Aparición suave de títulos y cards al entrar en pantalla */
  useEffect(() => {
    const root = rootRef.current;
    if (!isReady || !root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    const observeAll = () =>
      root.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    observeAll();
    /* Nodos que React monta después (p. ej. al re-renderizar) también se observan */
    const mo = new MutationObserver(observeAll);
    mo.observe(root, { childList: true, subtree: true });
    setRevealOn(true);
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [isReady]);

  useEffect(() => {
    if (!isReady || !rootRef.current || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Hero entrance (minimalist text + moving Behance rectangle strip)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-hero-line]", { yPercent: 108 }, { yPercent: 0, duration: 0.9 })
        .fromTo(
          "[data-hero-fade]",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 },
          "-=0.55",
        )
        .fromTo(
          "[data-hero-reel]",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          "-=0.5",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div ref={rootRef} className={`${isReady ? "is-ready" : ""} ${revealOn ? "reveal-on" : ""} `}>
      <Preloader onReady={() => setIsReady(true)} />
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Services />
        <Portfolio />
        <AboutMe />
        <Onboarding />
        <Pricing />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
