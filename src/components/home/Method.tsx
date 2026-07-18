import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/layout/Container";
import { SectionBoot } from "@/components/fx/SectionBoot";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function Method() {
  const dict = getDict(useLocale());
  const m = dict.method;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const width = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);
  // Which line is currently the "cursor"
  const activeIndex = useTransform(scrollYProgress, [0.15, 0.85], [0, m.stages.length]);

  return (
    <section className="relative py-14 sm:py-20 md:py-28 lg:py-36" ref={ref} id="method">
      <SectionBoot name="method">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>{m.eyebrow}</Eyebrow>
            <h2
              className="mt-3 font-display font-semibold leading-[1.05] tracking-[-0.02em] md:mt-4"
              style={{ fontSize: "clamp(1.75rem, 6.4vw, 3rem)" }}
            >
              <ScrambleText onView duration={550}>
                {m.heading}
              </ScrambleText>
            </h2>
          </div>


          {/* Terminal panel */}
          <div className="mt-10 rounded-lg border border-line bg-bg-2/70 p-4 backdrop-blur-md sm:p-5 md:mt-12 md:p-7 mk-scanlines">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-ink-3">
              <span className="inline-block h-2 w-2 rounded-full bg-py-red/70" />
              <span className="inline-block h-2 w-2 rounded-full bg-br-yellow/70" />
              <span className="inline-block h-2 w-2 rounded-full bg-br-green/70" />
              <span className="ml-3 truncate">mkcode@py:~/method</span>
              <span className="ml-auto hidden shrink-0 sm:inline">PIPELINE / 05 STAGES</span>
            </div>

            <ol className="space-y-2.5 font-mono text-[12.5px] leading-6 sm:text-[13px]">
              {m.stages.map((s, i) => (
                <MethodLine key={s.n} index={i} n={s.n} title={s.title} description={s.description} activeIndex={activeIndex} />
              ))}
            </ol>

            {/* progress bar */}
            <div className="mt-6 h-px w-full overflow-hidden bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-brand via-cyan to-brand"
                style={{ width }}
              />
            </div>
          </div>
        </Container>
      </SectionBoot>
    </section>
  );
}

function MethodLine({
  index,
  n,
  title,
  description,
  activeIndex,
}: {
  index: number;
  n: string;
  title: string;
  description: string;
  activeIndex: import("framer-motion").MotionValue<number>;
}) {
  const [statusColor, setStatusColor] = useState("var(--ink-3)");
  const [statusText, setStatusText] = useState("pending");
  useMotionValueEvent(activeIndex, "change", (v) => {
    if (v > index + 1) {
      setStatusColor("var(--br-green)");
      setStatusText("ready");
    } else if (v > index) {
      setStatusColor("var(--cyan)");
      setStatusText("…run");
    } else {
      setStatusColor("var(--ink-3)");
      setStatusText("pending");
    }
  });
  const rowOpacity = useTransform(activeIndex, (v) =>
    v > index ? 1 : 0.55,
  );

  return (
    <motion.li
      style={{ opacity: rowOpacity }}
      className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-3 md:gap-x-6"
    >
      <span className="font-mono text-cyan/80 select-none">$</span>
      <span className="flex min-w-0 items-baseline gap-2 md:gap-3">
        <span className="hidden text-ink-3 sm:inline">./{n}_stage</span>
        <span className="shrink-0 font-mono text-[11px] text-ink-3 sm:hidden">{n}</span>
        <span className="truncate font-display text-[14.5px] font-semibold tracking-[-0.01em] text-ink sm:text-[15px]">
          {title}
        </span>
        <span className="hidden text-[13px] font-normal text-ink-2 md:inline">
          — {description}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase sm:gap-2 sm:text-[11px] sm:tracking-[0.18em]">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full transition-colors"
          style={{ backgroundColor: statusColor }}
        />
        <span className="transition-colors" style={{ color: statusColor }}>{statusText}</span>
      </span>
    </motion.li>
  );
}
