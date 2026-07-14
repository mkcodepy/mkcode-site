import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container, Eyebrow } from "@/components/layout/Container";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function Method() {
  const dict = getDict(useLocale());
  const m = dict.method;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const width = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section className="relative py-28 md:py-36" ref={ref} id="method">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2
            className="mt-4 font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.85rem, 3.4vw, 3rem)" }}
          >
            {m.heading}
          </h2>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block">
            <motion.div className="h-full bg-gradient-to-r from-brand via-cyan to-brand" style={{ width }} />
          </div>

          <ol className="grid gap-8 lg:grid-cols-5">
            {m.stages.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-6 lg:pl-0"
              >
                <div className="hidden items-center gap-3 lg:flex">
                  <span className="grid h-3 w-3 place-items-center rounded-full border border-cyan bg-bg">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.22em] text-ink-3">
                    {s.n}
                  </span>
                </div>
                <span className="absolute left-0 top-1 lg:hidden font-mono text-[10.5px] tracking-[0.22em] text-cyan">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.01em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{s.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
