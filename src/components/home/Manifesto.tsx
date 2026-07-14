import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container, Eyebrow } from "@/components/layout/Container";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function Manifesto() {
  const locale = useLocale();
  const dict = getDict(locale);
  const m = dict.manifesto;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, m.sequence.length]);

  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36" ref={ref}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow>{m.eyebrow}</Eyebrow>
            <h2
              className="mt-6 font-display font-semibold leading-[1.05] tracking-[-0.02em] text-ink"
              style={{ fontSize: "clamp(1.75rem, 3.6vw, 3.2rem)" }}
            >
              {m.heading}
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-2 md:mt-8 md:text-base">{m.p1}</p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-3 md:text-base">{m.p2}</p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-2 h-full w-px bg-line" />
            <ul className="space-y-4 md:space-y-6">
              {m.sequence.map((step, i) => (
                <motion.li
                  key={step.n}
                  className="relative flex items-center gap-4 md:gap-6"
                  initial={{ opacity: 0.6 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
                  transition={{ duration: 0.4 }}
                >
                  <StageDot index={i} progress={progress} />
                  <span className="font-mono text-[10.5px] tracking-[0.24em] text-ink-3 md:text-[11px] md:tracking-[0.28em]">
                    {step.n}
                  </span>
                  <span className="font-display text-xl font-medium tracking-[-0.01em] text-ink md:text-2xl">
                    {step.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StageDot({
  index,
  progress,
}: {
  index: number;
  progress: import("framer-motion").MotionValue<number>;
}) {
  const scale = useTransform(progress, (v) => (v > index ? 1.4 : 1));
  const opacity = useTransform(progress, (v) => (v > index ? 1 : 0.7));
  return (
    <motion.span
      className="relative z-10 grid h-8 w-8 place-items-center rounded-full border border-line bg-bg"
      style={{ opacity }}
    >
      <motion.span
        className="h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_14px_rgba(105,213,255,0.9)]"
        style={{ scale }}
      />
    </motion.span>
  );
}
