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
  const role = useScramble(copy.role, { duration: 520, delay: 260 });
  const system = useTypewriter(copy.init, { speed: 12, delay: 100 });
  const reveal = (delay: number, distance = 10) => ({
    initial: reduced ? false : { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.42, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  });

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
        <section className="relative min-h-[560px] overflow-hidden px-[max(1.15rem,env(safe-area-inset-left))] pb-8 pt-[calc(5rem+env(safe-area-inset-top))] sm:min-h-[620px] sm:px-8 sm:pt-28 md:min-h-[540px] md:pb-9 md:pt-22 lg:min-h-[570px] lg:px-10 lg:pt-24 xl:min-h-[600px]">
          <div className="mx-auto grid h-full max-w-[1280px] items-center gap-0 md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] md:gap-2 min-[880px]:gap-7 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:gap-8 xl:gap-6">
            <div className="relative z-20 max-w-[620px] pt-3 sm:pt-8 md:pt-0 lg:pl-1 xl:pl-4">
              <motion.div
                {...reveal(0)}
                className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] text-ink-2 sm:text-[11px]"
              >
                <StatusDot color="cyan" />
                <span>{copy.system}</span>
              </motion.div>

              <motion.div {...reveal(0.06, 6)} className="mt-5 min-h-4 max-w-[21rem] overflow-hidden font-mono text-[9px] tracking-[0.04em] text-cyan/80 sm:text-[10px]">
                {system.text}
                {!system.done ? <span aria-hidden className="mk-terminal-cursor ml-1 inline-block h-[0.9em] w-[0.55ch] bg-cyan align-middle" /> : null}
              </motion.div>

              <motion.h1
                {...reveal(0.13, 14)}
                className="mt-5 font-display text-[clamp(3.25rem,16vw,6.7rem)] font-bold leading-[0.84] tracking-[-0.04em] text-ink sm:mt-7 md:text-[clamp(3.55rem,7vw,5.7rem)] lg:text-[clamp(4rem,6vw,5.75rem)]"
              >
                <GlitchWord>MK</GlitchWord>
                <span className="block text-cyan">CODE</span>
              </motion.h1>

              <motion.div {...reveal(0.2)} className="mt-5 max-w-[15.5rem] sm:mt-7 sm:max-w-xl md:max-w-[29rem]">
                <p className="min-h-5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan sm:text-[11px]">
                  {role}
                </p>
                <p className="mt-2 font-display text-[15px] font-medium leading-snug text-ink sm:text-xl">
                  {copy.disciplines}
                </p>
                <p className="mt-2 max-w-[16.5rem] text-[13px] leading-relaxed text-ink-2 sm:max-w-md sm:text-base">
                  {copy.statement}
                </p>
              </motion.div>

              <motion.div
                {...reveal(0.3, 8)}
                className="relative z-30 mt-5 flex max-w-[25rem] flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3 md:flex-col md:items-start min-[880px]:flex-row"
              >
                <HeroControl to={locale === "es" ? "/es/proyectos" : "/pt/projetos"} primary>
                  {copy.ctaProjects}
                </HeroControl>
                <HeroControl href="mailto:contacto@mkcode.com.py">{copy.ctaContact}</HeroControl>
              </motion.div>

              <motion.div {...reveal(0.38, 6)} className="relative z-30 mt-5 flex flex-col items-start gap-2 font-mono text-[9px] tracking-[0.16em] text-ink-2 sm:mt-6 sm:flex-row sm:items-center sm:gap-5 sm:text-[10px]">
                <span className="inline-flex items-center gap-2 text-ink"><StatusDot color="green" />{copy.online}</span>
                <span>{copy.location}</span>
              </motion.div>
            </div>

            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-28 z-10 md:relative md:inset-auto md:h-[clamp(400px,43vw,500px)] md:w-full lg:h-[clamp(440px,38vw,510px)]">
              <div className="mk-character-halo absolute bottom-8 right-[-13%] h-[67%] w-[84%] min-[390px]:right-[-8%] sm:right-[-5%] md:inset-x-[3%] md:bottom-6 md:h-[82%] md:w-[94%]" />
              <motion.div
                initial={reduced ? false : { opacity: 0, x: 22, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.68, delay: reduced ? 0 : 0.36, ease: [0.16, 1, 0.3, 1] }}
                style={{ x: characterX, y: characterY }}
                className="absolute bottom-[-56px] right-[-112px] h-[445px] w-[348px] min-[360px]:right-[-104px] min-[360px]:h-[470px] min-[360px]:w-[367px] min-[390px]:right-[-88px] min-[390px]:h-[486px] min-[390px]:w-[380px] sm:bottom-[-66px] sm:right-[-20px] sm:h-[620px] sm:w-[480px] md:inset-x-0 md:bottom-[-46px] md:right-auto md:mx-auto md:h-[calc(100%+82px)] md:w-full lg:bottom-[-50px] lg:h-[calc(100%+92px)]"
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
              <motion.div {...reveal(0.48, 0)} className="mk-interface-line mk-interface-line--live absolute bottom-[18%] right-0 w-[58%] md:bottom-[14%] md:left-[-18%] md:w-[88%]" />
              <div className="absolute bottom-[15%] right-3 z-20 font-mono text-[7px] tracking-[0.2em] text-cyan/70 min-[390px]:text-[8px] sm:right-10 md:bottom-[10%] md:right-0 md:text-[8px] lg:text-[9px]">
                {copy.interface}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 border-y border-line bg-bg/80 px-[max(1.15rem,env(safe-area-inset-left))] py-10 backdrop-blur-md sm:px-8 sm:py-16 lg:px-10" aria-labelledby="hub-links-title">
          <div className="mx-auto max-w-[1280px]">
            <SectionLabel id="hub-links-title" index="01">{copy.links}</SectionLabel>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {hubLinks.map((item, index) => <PrimaryLink key={item.id} item={item} index={index} locale={locale} unavailable={copy.unavailable} />)}
            </div>
          </div>
        </section>

        <section className="relative z-20 px-[max(1.15rem,env(safe-area-inset-left))] py-11 sm:px-8 sm:py-14 lg:px-10 lg:py-16" aria-labelledby="hub-tools-title">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <SectionLabel id="hub-tools-title" index="02">{copy.tools}</SectionLabel>
                <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-2 sm:text-sm">{copy.toolsNote}</p>
              </div>
              <span className="hidden font-mono text-[9px] tracking-[0.2em] text-ink-3 sm:block">{copy.signalArray}</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
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
                  className="mk-module group relative min-h-28 overflow-hidden border-y border-line bg-surface/35 px-3 py-4 hover:border-line-2 hover:bg-surface/70 sm:min-h-32 sm:px-5 sm:py-5 xl:border xl:bg-surface/45"
                  aria-label={`${tool.name} — ${copy.external}`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-bg-2 text-cyan transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:border-line-2">{toolIcons[tool.name] ?? <Terminal size={17} />}</span>
                  <span className="mt-4 block font-display text-sm font-semibold text-ink sm:text-base">{tool.name}</span>
                  <span className="mt-1 block font-mono text-[8px] tracking-[0.2em] text-ink-3 sm:text-[9px]">{tool.category}</span>
                  <ArrowUpRight className="absolute right-3 top-3 text-ink-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" size={14} />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative z-20 border-t border-line bg-bg-2/70 px-[max(1.15rem,env(safe-area-inset-left))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-9 sm:px-8 sm:pt-11 lg:px-10">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <SectionLabel index="03">{copy.socials}</SectionLabel>
                <div className="mt-4 grid gap-x-5 sm:grid-cols-2 lg:flex lg:flex-wrap">
                  {hubSocials.map((social) => social.href ? (
                    <a key={social.name} href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mk-endpoint inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-ink-2 transition-colors hover:text-cyan">
                      {social.name === "Instagram" ? <Instagram size={14} /> : <Mail size={14} />}
                      {social.name}
                      <ArrowUpRight size={11} className="text-ink-3" />
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
                <div className="mt-1 text-cyan/55">{copy.nodeState}</div>
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
      <div className="mx-auto grid h-16 max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-[max(1.15rem,env(safe-area-inset-left))] sm:px-8 lg:px-10">
        <Link to={locale === "es" ? "/es" : "/pt"} aria-label="MK CODE" className="flex min-h-11 w-fit min-w-0 items-center gap-2.5">
          <Monogram size={27} className="shrink-0" />
          <span className="truncate font-display text-[13px] font-semibold tracking-[0.16em] text-ink">MK CODE</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-ink-3 min-[410px]:flex"><Radio size={12} className="text-cyan" />ID NODE</div>
          <div className="flex rounded-md border border-line bg-surface/70 p-0.5 font-mono text-[10px] tracking-[0.14em]">
            <a href="/es" aria-current={locale === "es" ? "page" : undefined} className={`grid h-11 min-w-11 place-items-center rounded transition-colors hover:text-ink ${locale === "es" ? "bg-brand/20 text-ink shadow-[inset_0_-1px_0_var(--cyan)]" : "text-ink-3"}`}>ES</a>
            <a href="/pt" aria-current={locale === "pt" ? "page" : undefined} className={`grid h-11 min-w-11 place-items-center rounded transition-colors hover:text-ink ${locale === "pt" ? "bg-brand/20 text-ink shadow-[inset_0_-1px_0_var(--cyan)]" : "text-ink-3"}`}>PT</a>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroControl({ to, href, primary, children }: { to?: string; href?: string; primary?: boolean; children: ReactNode }) {
  const classes = `mk-ctrl mk-corner-markers group inline-flex min-h-11 items-center gap-2.5 rounded-md border bg-bg-2/90 px-4 font-mono text-[10px] tracking-[0.18em] transition-colors sm:text-[11px] ${
    primary
      ? "border-cyan/45 bg-cyan/10 text-ink hover:border-cyan hover:bg-cyan/15"
      : "border-line bg-surface/60 text-ink-2 hover:border-line-2 hover:text-ink"
  }`;
  const inner = (
    <>
      <span aria-hidden className={`mk-ctrl-signal h-1.5 w-1.5 rounded-full ${primary ? "bg-cyan" : "bg-ink-3"}`} />
      {children}
      <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  );
  if (to) {
    return (
      <motion.div whileTap={{ scale: 0.97 }}>
        <Link to={to} className={classes}>{inner}</Link>
      </motion.div>
    );
  }
  return <motion.a href={href} whileTap={{ scale: 0.97 }} className={classes}>{inner}</motion.a>;
}

function SectionLabel({ id, index, children }: { id?: string; index: string; children: ReactNode }) {
  return <h2 id={id} className="grid w-fit grid-cols-[auto_1.5rem_auto_auto] items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan"><span className="text-ink-3">{index}</span><span className="h-px bg-line-2" /><span>{children}</span><span aria-hidden className="h-1 w-1 rounded-full bg-cyan/70" /></h2>;
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
  const classes = "mk-link-module mk-module group relative grid min-h-[92px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-md border border-line bg-surface/65 p-4 hover:border-line-2 hover:bg-surface active:bg-surface-2 sm:min-h-[98px] sm:p-5 xl:min-h-[104px]";

  if (!href) {
    return <div className={`${classes} opacity-55`} aria-disabled="true" aria-label={`${item.title[locale]} — ${unavailable}`}>{content}<span className="absolute bottom-2 left-[4.25rem] font-mono text-[7px] tracking-[0.16em] text-ink-3 sm:left-[4.75rem]">{unavailable}</span></div>;
  }
  if (item.external) {
    return <motion.a href={href} whileTap={{ scale: 0.985 }} className={classes}>{content}</motion.a>;
  }
  return <motion.div whileTap={{ scale: 0.985 }}><Link to={href} className={classes}>{content}</Link></motion.div>;
}