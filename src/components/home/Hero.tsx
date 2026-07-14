import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/MkButton";
import { Container, Eyebrow } from "@/components/layout/Container";
import { StatusDot, SystemNode, TerminalBox, TechCard } from "@/components/system/primitives";
import { useLocale, pathFor } from "@/lib/locale";
import { getDict } from "@/content/i18n";
import { useScramble } from "@/lib/motion/useScramble";
import { useTypewriter } from "@/lib/motion/useTypewriter";

export function Hero() {
  const locale = useLocale();
  const dict = getDict(locale);
  const h = dict.hero;

  const eyebrow = useTypewriter(h.eyebrow, { speed: 22, delay: 200 });
  const headA = useScramble(h.headingA, { duration: 700, delay: 350 });
  const headB = useScramble(h.headingB, { duration: 800, delay: 950 });

  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 lg:pt-44">
      {/* background grid */}
      <div className="pointer-events-none absolute inset-0 mk-grid-lines opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-brand/[0.08] via-transparent to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-40 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand/[0.06] blur-[120px]" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Left: copy */}
          <div className="flex flex-col justify-center">
            <div className="flex min-h-[1.6em] items-center gap-3">
              <StatusDot color="cyan" />
              <Eyebrow>
                {eyebrow.text}
                {!eyebrow.done ? (
                  <span
                    aria-hidden
                    className="ml-1 inline-block h-[0.9em] w-[0.55ch] translate-y-[0.08em] bg-cyan align-middle"
                    style={{ animation: "mk-blink 0.6s steps(1) infinite" }}
                  />
                ) : null}
              </Eyebrow>
            </div>

            <h1
              className="mt-6 font-display font-semibold leading-[1.02] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.5rem, 5.4vw, 5rem)" }}
            >
              <span className="block">{headA}</span>
              <span className="relative inline-block text-ink">
                <span className="relative z-10 bg-gradient-to-r from-cyan via-brand-2 to-brand bg-clip-text text-transparent">
                  {headB}
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-cyan/80 to-transparent"
                  style={{ animation: "mk-fade-up 1.1s ease-out 1.6s both" }}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2"
            >
              {h.paragraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link to={pathFor(locale, "contact")}>
                <Button variant="primary" size="lg">
                  {h.primaryCta}
                </Button>
              </Link>
              <Link to={pathFor(locale, "capabilities")}>
                <Button variant="secondary" size="lg">
                  {h.secondaryCta}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] tracking-[0.22em] text-ink-3"
            >
              <span>{h.techLabel}</span>
              <span className="text-line-2">/</span>
              <span>{h.micro}</span>
            </motion.div>
          </div>

          {/* Right: system visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <SystemVisualization dict={dict} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function SystemVisualization({ dict }: { dict: ReturnType<typeof getDict> }) {
  const h = dict.hero;
  const boot = useTypewriter("> mk.sys init --region=py --status=online", {
    speed: 16,
    delay: 900,
  });
  return (
    <div className="relative rounded-lg border border-line bg-surface/40 p-5 backdrop-blur-md">
      {/* corner ticks */}
      <Corner className="left-0 top-0" />
      <Corner className="right-0 top-0 rotate-90" />
      <Corner className="left-0 bottom-0 -rotate-90" />
      <Corner className="right-0 bottom-0 rotate-180" />

      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-ink-3">
        <div className="flex items-center gap-2">
          <StatusDot color="cyan" />
          <span className="text-ink">{h.systemStatus}</span>
        </div>
        <span>MK.SYS / 01</span>
      </div>

      <div className="mt-3 min-h-[1.4em] font-mono text-[10.5px] tracking-[0.06em] text-cyan/80">
        {boot.text}
        {!boot.done ? (
          <span
            aria-hidden
            className="ml-0.5 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.08em] bg-cyan align-middle"
            style={{ animation: "mk-blink 0.55s steps(1) infinite" }}
          />
        ) : null}
      </div>

      {/* Node topology */}
      <div className="relative mt-5 flex items-center justify-between px-2">
        <SystemNode code="BR" label="ORIGIN" accent="br" size="sm" />
        <div className="relative flex-1 mx-2">
          <svg viewBox="0 0 240 60" className="w-full" aria-hidden>
            <defs>
              <linearGradient id="hero-line" x1="0" x2="240">
                <stop offset="0%" stopColor="#009C3B" />
                <stop offset="30%" stopColor="#1677FF" />
                <stop offset="70%" stopColor="#69D5FF" />
                <stop offset="100%" stopColor="#D52B1E" />
              </linearGradient>
            </defs>
            <path
              d="M0 30 Q60 5 120 30 T240 30"
              fill="none"
              stroke="url(#hero-line)"
              strokeWidth="1.2"
            />
            <path
              d="M0 30 Q60 5 120 30 T240 30"
              fill="none"
              stroke="#69D5FF"
              strokeWidth="1"
              strokeDasharray="3 8"
              style={{ animation: "mk-dash 4s linear infinite" }}
            />
            <circle r="3" fill="#69D5FF">
              <animateMotion
                dur="3.6s"
                repeatCount="indefinite"
                path="M0 30 Q60 5 120 30 T240 30"
              />
            </circle>
          </svg>
          <div className="absolute inset-x-0 top-full mt-1 text-center font-mono text-[9px] tracking-[0.24em] text-ink-3">
            DEPLOY ROUTE
          </div>
        </div>
        <SystemNode code="PY" label="PROD" accent="py" size="sm" />
      </div>

      {/* Module grid */}
      <div className="mt-10 grid grid-cols-3 gap-2">
        <TechCard label="ENV" value="PRODUCTION" />
        <TechCard label="REGION" value="ENCARNACION-PY" />
        <TechCard label="ARCH" value="CUSTOM" />
      </div>

      {/* Console */}
      <TerminalBox
        className="mt-3"
        prompt={h.consolePrompt}
        steps={h.consoleSteps as unknown as string[]}
      />

      <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-ink-3">
        <span>INFRASTRUCTURE / STABLE</span>
        <span className="flex items-center gap-1.5">
          <StatusDot color="green" />
          READY
        </span>
      </div>
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-3 w-3 border-l border-t border-cyan/60 ${className}`}
      style={{ margin: "-1px" }}
    />
  );
}
