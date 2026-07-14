import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/layout/Container";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function Bridge() {
  const dict = getDict(useLocale());
  const b = dict.bridge;

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 mk-grid-lines opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.07] blur-[140px]" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{b.eyebrow}</Eyebrow>
          <h2
            className="mt-4 font-display font-semibold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.75rem, 3.8vw, 3.4rem)" }}
          >
            {b.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-2 md:text-base">{b.p1}</p>
          <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-3 md:text-base">{b.p2}</p>
        </div>

        {/* Bridge visual */}
        <div className="relative mt-10 md:mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-lg border border-line bg-surface/30 p-5 backdrop-blur-sm sm:p-8 md:p-12"
          >
            <div className="grid items-center gap-10 md:grid-cols-[1fr_1.6fr_1fr]">
              <BridgeNode code="BR" label={b.leftNode.label} accent="br" />

              <div className="relative flex flex-col items-center">
                <svg viewBox="0 0 400 120" className="w-full" aria-hidden>
                  <defs>
                    <linearGradient id="bridge-line" x1="0" x2="400">
                      <stop offset="0%" stopColor="#009C3B" />
                      <stop offset="15%" stopColor="#FFDF00" />
                      <stop offset="50%" stopColor="#69D5FF" />
                      <stop offset="85%" stopColor="#0038A8" />
                      <stop offset="100%" stopColor="#D52B1E" />
                    </linearGradient>
                  </defs>
                  {/* three arcs */}
                  {[0, 1, 2].map((i) => (
                    <path
                      key={i}
                      d={`M0 ${60 + (i - 1) * 22} Q200 ${20 + (i - 1) * 22} 400 ${60 + (i - 1) * 22}`}
                      stroke="url(#bridge-line)"
                      strokeWidth={i === 1 ? 1.4 : 0.8}
                      strokeOpacity={i === 1 ? 1 : 0.4}
                      fill="none"
                      strokeDasharray={i === 1 ? "0" : "3 8"}
                      style={i !== 1 ? { animation: "mk-dash 5s linear infinite" } : {}}
                    />
                  ))}
                  {[0, 1, 2].map((i) => (
                    <circle key={i} r="3.5" fill="#69D5FF">
                      <animateMotion
                        dur={`${3.4 + i * 0.8}s`}
                        repeatCount="indefinite"
                        path="M0 60 Q200 20 400 60"
                        begin={`${i * 0.9}s`}
                      />
                    </circle>
                  ))}
                </svg>
                <div className="mt-4 rounded-md border border-line-2 bg-bg-2/80 px-4 py-2 font-mono text-[10.5px] tracking-[0.28em] text-ink">
                  MK CODE · {b.centerLabel}
                </div>
              </div>

              <BridgeNode code="PY" label={b.rightNode.label} accent="py" />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 font-mono text-[10px] tracking-[0.2em] text-ink-3 sm:grid-cols-3 sm:gap-4 sm:tracking-[0.22em] md:mt-10">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-br-green" />
                LATENCY / OPTIMAL
              </div>
              <div className="flex items-center gap-2 sm:justify-center">
                <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-cyan" />
                BRIDGE / ACTIVE
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-py-red" />
                ROUTE / SECURE
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function BridgeNode({
  code,
  label,
  accent,
}: {
  code: string;
  label: string;
  accent: "br" | "py";
}) {
  const stripes =
    accent === "br"
      ? (
          <>
            <span className="h-1 w-full bg-br-green" />
            <span className="h-1 w-full bg-br-yellow" />
          </>
        )
      : (
          <>
            <span className="h-1 w-full bg-py-red" />
            <span className="h-1 w-full bg-ink" />
            <span className="h-1 w-full bg-py-blue" />
          </>
        );
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative grid h-28 w-28 place-items-center rounded-full border border-line-2 bg-surface font-display text-3xl font-bold text-ink">
        {code}
        <span
          className="absolute inset-[-3px] rounded-full opacity-40 blur-md"
          style={{
            background:
              accent === "br"
                ? "conic-gradient(from 0deg, #009C3B, #FFDF00, #009C3B)"
                : "conic-gradient(from 0deg, #D52B1E, #FFFFFF, #0038A8, #D52B1E)",
            zIndex: -1,
          }}
        />
      </div>
      <div className="flex w-16 flex-col gap-1">{stripes}</div>
      <div className="font-mono text-[10.5px] tracking-[0.22em] text-ink-3">{label}</div>
    </div>
  );
}
