import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Boxes,
  Braces,
  CircuitBoard,
  Code2,
  Github,
  Instagram,
  Mail,
  MessageCircle,
  Radio,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import characterAsset from "@/assets/mk-code-character.webp.asset.json";
import { Monogram } from "@/components/brand/Monogram";
import { GlitchWord } from "@/components/fx/GlitchWord";
import { StatusDot } from "@/components/system/primitives";
import { hubCopy, hubLinks, hubSocials, hubTools, type HubLink } from "@/config/hub";
import { useLocale } from "@/lib/locale";
import { usePrefersReducedMotion } from "@/lib/motion/prefs";
import { useScramble } from "@/lib/motion/useScramble";
import { useTypewriter } from "@/lib/motion/useTypewriter";

const linkIcons: Record<HubLink["id"], ReactNode> = {
  projects: <Boxes size={19} />,
  github: <Github size={19} />,
  contact: <MessageCircle size={19} />,
  studio: <Code2 size={19} />,
};

const toolIcons: Record<string, ReactNode> = {
  Lovable: <Sparkles size={17} />,
  Claude: <Braces size={17} />,
  Krea: <CircuitBoard size={17} />,
  Emergent: <Wrench size={17} />,
};

export function IdentityHub() {
  const locale = useLocale();
  const copy = hubCopy[locale];
  const reduced = usePrefersReducedMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const characterX = useTransform(springX, [-0.5, 0.5], reduced ? [0, 0] : [-7, 7]);
  const characterY = useTransform(springY, [-0.5, 0.5], reduced ? [0, 0] : [-4, 4]);
  const role = useScramble(copy.role, { duration: 620, delay: 240 });
  const system = useTypewriter(copy.init, { speed: 16, delay: 350 });

  const trackPointer = (event: MouseEvent<HTMLDivElement>) => {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    pointerX.set(x - 0.5);
    pointerY.set(y - 0.5);
    fieldRef.current?.style.setProperty("--hub-x", `${x * 100}%`);
    fieldRef.current?.style.setProperty("--hub-y", `${y * 100}%`);
  };

  return (
    <div
      ref={fieldRef}
      onMouseMove={trackPointer}
      className="mk-hub-field relative min-h-dvh overflow-hidden bg-bg text-ink"
    >
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 mk-grid-lines opacity-60" />
      <div aria-hidden className="mk-hub-spotlight pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

      <HubTopbar locale={locale} />

      <main className="relative z-10">
        <section className="relative min-h-[560px] overflow-hidden px-[max(1.15rem,env(safe-area-inset-left))] pb-8 pt-[calc(5rem+env(safe-area-inset-top))] sm:min-h-[690px] sm:px-8 sm:pt-28 lg:min-h-[720px] lg:px-10 lg:pt-32">
          <div className="mx-auto grid h-full max-w-[1280px] lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1.1fr)] lg:items-center">
            <div className="relative z-20 max-w-[660px] pt-3 sm:pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] text-ink-2 sm:text-[11px]"
              >
                <StatusDot color="cyan" />
                <span>{copy.system}</span>
              </motion.div>

              <div className="mt-5 min-h-4 max-w-[21rem] overflow-hidden font-mono text-[9px] tracking-[0.04em] text-cyan/80 sm:text-[10px]">
                {system.text}
                {!system.done ? <span aria-hidden className="mk-terminal-cursor ml-1 inline-block h-[0.9em] w-[0.55ch] bg-cyan align-middle" /> : null}
              </div>

              <h1 className="mt-5 font-display text-[clamp(3.25rem,16vw,6.7rem)] font-bold leading-[0.84] tracking-[-0.04em] text-ink sm:mt-7 lg:text-[7.7rem]">
                <GlitchWord>MK</GlitchWord>
                <span className="block text-cyan">CODE</span>
              </h1>

              <div className="mt-5 max-w-[15.5rem] sm:mt-7 sm:max-w-xl">
                <p className="min-h-5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan sm:text-[11px]">
                  {role}
                </p>
                <p className="mt-2 font-display text-[15px] font-medium leading-snug text-ink sm:text-xl">
                  {copy.disciplines}
                </p>
                <p className="mt-2 max-w-[20rem] text-[13px] leading-relaxed text-ink-2 sm:max-w-md sm:text-base">
                  {copy.statement}
                </p>
              </div>

              <div className="mt-5 flex flex-col items-start gap-2 font-mono text-[9px] tracking-[0.16em] text-ink-2 sm:mt-7 sm:flex-row sm:items-center sm:gap-5 sm:text-[10px]">
                <span className="inline-flex items-center gap-2 text-ink"><StatusDot color="green" />{copy.online}</span>
                <span>{copy.location}</span>
              </div>
            </div>

            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-28 z-10 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[58%]">
              <div className="mk-character-halo absolute bottom-10 right-[-18%] h-[70%] w-[95%] sm:right-[-7%] lg:bottom-6 lg:right-[-2%] lg:h-[88%] lg:w-[90%]" />
              <motion.div
                initial={{ opacity: 0, x: 28, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{ x: characterX, y: characterY }}
                className="absolute bottom-[-62px] right-[-105px] h-[470px] w-[366px] min-[370px]:right-[-86px] min-[370px]:h-[500px] min-[370px]:w-[390px] sm:bottom-[-72px] sm:right-[-20px] sm:h-[650px] sm:w-[500px] lg:bottom-[-60px] lg:right-[1vw] lg:h-[780px] lg:w-[600px]"
              >
                <img
                  src={characterAsset.url}
                  width={768}
                  height={960}
                  alt=""
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-contain object-bottom"
                />
              </motion.div>
              <div className="mk-interface-line absolute bottom-[19%] right-0 w-[64%] lg:bottom-[24%]" />
              <div className="absolute bottom-[16%] right-4 z-20 font-mono text-[8px] tracking-[0.22em] text-cyan/70 sm:right-10 lg:bottom-[21%] lg:right-20 lg:text-[9px]">
                HUMAN / SYSTEM INTERFACE
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 border-y border-line bg-bg/80 px-[max(1.15rem,env(safe-area-inset-left))] py-10 backdrop-blur-md sm:px-8 sm:py-16 lg:px-10" aria-labelledby="hub-links-title">
          <div className="mx-auto max-w-[1280px]">
            <SectionLabel id="hub-links-title" index="01">{copy.links}</SectionLabel>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
              {hubLinks.map((item, index) => <PrimaryLink key={item.id} item={item} index={index} locale={locale} unavailable={copy.unavailable} />)}
            </div>
          </div>
        </section>

        <section className="relative z-20 px-[max(1.15rem,env(safe-area-inset-left))] py-12 sm:px-8 sm:py-16 lg:px-10" aria-labelledby="hub-tools-title">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <SectionLabel id="hub-tools-title" index="02">{copy.tools}</SectionLabel>
                <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-2 sm:text-sm">{copy.toolsNote}</p>
              </div>
              <span className="hidden font-mono text-[9px] tracking-[0.2em] text-ink-3 sm:block">SIGNAL ARRAY / 04</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
              {hubTools.map((tool, index) => (
                <motion.a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.42, delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative min-h-28 overflow-hidden rounded-md border border-line bg-surface/55 p-4 transition-colors hover:border-line-2 hover:bg-surface sm:min-h-32 sm:p-5"
                  aria-label={`${tool.name} — ${copy.external}`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-bg-2 text-cyan transition-transform group-hover:-translate-y-0.5">{toolIcons[tool.name] ?? <Terminal size={17} />}</span>
                  <span className="mt-4 block font-display text-sm font-semibold text-ink sm:text-base">{tool.name}</span>
                  <span className="mt-1 block font-mono text-[8px] tracking-[0.2em] text-ink-3 sm:text-[9px]">{tool.category}</span>
                  <ArrowUpRight className="absolute right-3 top-3 text-ink-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" size={14} />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative z-20 border-t border-line bg-bg-2/70 px-[max(1.15rem,env(safe-area-inset-left))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10 sm:px-8 sm:pt-12 lg:px-10">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <SectionLabel index="03">{copy.socials}</SectionLabel>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {hubSocials.map((social) => social.href ? (
                    <a key={social.name} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-ink-2 transition-colors hover:text-cyan">
                      {social.name === "Instagram" ? <Instagram size={14} /> : <Mail size={14} />}
                      {social.name}
                    </a>
                  ) : (
                    <span key={social.name} aria-disabled="true" className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-ink-3 opacity-55">
                      {social.name === "GitHub" ? <Github size={14} /> : <Radio size={14} />}
                      {social.name}
                      <span className="sr-only">— {copy.unavailable}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="font-mono text-[9px] leading-6 tracking-[0.16em] text-ink-3 sm:text-right">
                <div>© {new Date().getFullYear()} MK CODE</div>
                <div>{copy.footer}</div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function HubTopbar({ locale }: { locale: "es" | "pt" }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/70 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-[1360px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-[max(1.15rem,env(safe-area-inset-left))] sm:px-8 lg:px-10">
        <Link to={locale === "es" ? "/es" : "/pt"} aria-label="MK CODE" className="flex min-h-11 w-fit min-w-0 items-center gap-2.5">
          <Monogram size={27} className="shrink-0" />
          <span className="truncate font-display text-[13px] font-semibold tracking-[0.16em] text-ink">MK CODE</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-ink-3 min-[410px]:flex"><Radio size={12} className="text-cyan" />ID NODE</div>
          <div className="flex rounded-md border border-line bg-surface/70 p-0.5 font-mono text-[10px] tracking-[0.14em]">
            <a href="/es" className={`grid h-11 min-w-11 place-items-center rounded ${locale === "es" ? "bg-brand/20 text-ink" : "text-ink-3"}`}>ES</a>
            <a href="/pt" className={`grid h-11 min-w-11 place-items-center rounded ${locale === "pt" ? "bg-brand/20 text-ink" : "text-ink-3"}`}>PT</a>
          </div>
        </div>
      </div>
    </header>
  );
}

function SectionLabel({ id, index, children }: { id?: string; index: string; children: ReactNode }) {
  return <h2 id={id} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan"><span className="text-ink-3">{index}</span><span className="h-px w-6 bg-line-2" />{children}</h2>;
}

function PrimaryLink({ item, index, locale, unavailable }: { item: HubLink; index: number; locale: "es" | "pt"; unavailable: string }) {
  const href = item.href[locale];
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-bg-2 text-cyan transition-transform group-hover:-translate-y-0.5">{linkIcons[item.id]}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-[15px] font-semibold text-ink sm:text-base">{item.title[locale]}</span>
        <span className="mt-1 block truncate text-[11px] text-ink-2 sm:text-xs">{item.description[locale]}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end self-stretch justify-between">
        <span className="font-mono text-[8px] tracking-[0.18em] text-ink-3">0{index + 1}</span>
        <ArrowUpRight size={16} className="text-ink-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
      </span>
    </>
  );
  const classes = "mk-link-module group relative grid min-h-[82px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-md border border-line bg-surface/70 p-4 transition-colors hover:border-line-2 hover:bg-surface active:bg-surface-2";

  if (!href) {
    return <div className={`${classes} opacity-55`} aria-label={`${item.title[locale]} — ${unavailable}`}>{content}<span className="absolute bottom-1.5 left-[4.25rem] font-mono text-[7px] tracking-[0.16em] text-ink-3">{unavailable}</span></div>;
  }
  if (item.external) {
    return <motion.a href={href} whileTap={{ scale: 0.985 }} className={classes}>{content}</motion.a>;
  }
  return <motion.div whileTap={{ scale: 0.985 }}><Link to={href} className={classes}>{content}</Link></motion.div>;
}