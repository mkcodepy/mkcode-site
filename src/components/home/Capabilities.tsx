import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/layout/Container";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function Capabilities() {
  const dict = getDict(useLocale());
  const c = dict.capabilities;
  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-36" id="capabilities">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-10">
          <div>
            <Eyebrow>CAPABILITIES</Eyebrow>
            <h2
              className="mt-4 max-w-3xl font-display font-semibold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 3rem)" }}
            >
              {c.heading}
            </h2>
          </div>
          <p className="max-w-md self-end text-[15px] leading-relaxed text-ink-2 md:text-base">{c.supporting}</p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-2">
          {c.items.map((item, i) => (
            <motion.article
              key={item.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-lg border border-line bg-surface/40 p-6 transition-colors hover:border-line-2 md:p-8"
            >
              {/* accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] tracking-[0.24em] text-ink-3">
                  / {item.n}
                </span>
                <VisualBadge index={i} />
              </div>

              <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.01em] text-ink md:mt-8 md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-2 md:text-[15px]">
                {item.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-1.5 md:mt-8">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-sm border border-line px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-ink-3"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function VisualBadge({ index }: { index: number }) {
  // Four distinct micro-visualizations per capability
  const commonProps = {
    width: 64,
    height: 40,
    viewBox: "0 0 64 40",
    className: "opacity-70",
  } as const;
  if (index === 0)
    return (
      <svg {...commonProps} aria-hidden>
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={2 + c * 15}
              y={2 + r * 12}
              width={12}
              height={9}
              rx={1.5}
              fill="none"
              stroke="#69D5FF"
              strokeOpacity={r === 1 && c === 1 ? 1 : 0.35}
            />
          )),
        )}
      </svg>
    );
  if (index === 1)
    return (
      <svg {...commonProps} aria-hidden>
        <path d="M2 30 L20 30 L26 12 L44 12 L50 28 L62 28" stroke="#69D5FF" fill="none" strokeWidth="1" />
        <circle cx="20" cy="30" r="2.5" fill="#69D5FF" />
        <circle cx="44" cy="12" r="2.5" fill="#69D5FF" />
        <circle cx="62" cy="28" r="2.5" fill="#1677FF" />
      </svg>
    );
  if (index === 2)
    return (
      <svg {...commonProps} aria-hidden>
        <rect x="2" y="8" width="28" height="10" fill="none" stroke="#69D5FF" strokeOpacity="0.5" />
        <rect x="2" y="22" width="60" height="10" fill="none" stroke="#69D5FF" />
        <rect x="34" y="8" width="28" height="10" fill="none" stroke="#69D5FF" strokeOpacity="0.5" />
        <circle cx="8" cy="27" r="1.5" fill="#69D5FF" />
        <circle cx="14" cy="27" r="1.5" fill="#69D5FF" opacity="0.5" />
      </svg>
    );
  return (
    <svg {...commonProps} aria-hidden>
      <rect x="4" y="6" width="24" height="30" rx="2" fill="none" stroke="#69D5FF" strokeOpacity="0.7" />
      <rect x="34" y="14" width="26" height="18" rx="2" fill="none" stroke="#69D5FF" />
      <line x1="28" y1="20" x2="34" y2="20" stroke="#69D5FF" strokeDasharray="2 2" />
    </svg>
  );
}
