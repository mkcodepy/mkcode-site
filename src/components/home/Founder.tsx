import { Container, Eyebrow } from "@/components/layout/Container";
import { Monogram } from "@/components/brand/Monogram";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function Founder() {
  const dict = getDict(useLocale());
  const f = dict.founder;
  return (
    <section className="relative py-14 sm:py-20 md:py-28 lg:py-36" id="mkcode">
      <Container>
        <div className="grid gap-8 md:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          {/* Portrait placeholder */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-gradient-to-br from-surface via-bg-2 to-bg">
            <div className="absolute inset-0 mk-grid-lines opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(105,213,255,0.18),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(22,119,255,0.25),transparent_60%)]" />
            <div className="absolute inset-4 flex flex-col justify-between sm:inset-5 md:inset-6">
              <div className="flex items-center justify-between font-mono text-[9.5px] tracking-[0.22em] text-ink-3 sm:text-[10px]">
                <span>MK · FOUNDER</span>
                <span>MK.001</span>
              </div>
              <Monogram size={72} className="opacity-90 sm:hidden" />
              <Monogram size={90} className="hidden opacity-90 sm:block md:hidden" />
              <Monogram size={110} className="hidden opacity-90 md:block" />
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-display text-[1.1rem] font-semibold text-ink sm:text-xl md:text-2xl">{f.name}</div>
                  <div className="font-mono text-[9.5px] tracking-[0.22em] text-ink-3 md:text-[10.5px]">
                    {f.role.toUpperCase()}
                  </div>
                </div>
                <div className="shrink-0 text-right font-mono text-[9px] tracking-[0.22em] text-ink-3 sm:text-[9.5px] md:text-[10px]">
                  ENCARNACION
                  <br />
                  PARAGUAY
                </div>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow>{f.eyebrow}</Eyebrow>
            <h2
              className="mt-3 font-display font-semibold leading-[1.05] tracking-[-0.02em] md:mt-4"
              style={{ fontSize: "clamp(1.75rem, 6.4vw, 3rem)" }}
            >
              {f.heading}
            </h2>
            <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.65] text-ink-2 md:mt-8 md:text-base">{f.bio}</p>
            <p className="mt-3 max-w-[58ch] text-[14.5px] leading-[1.65] text-ink-3 md:mt-4 md:text-base">{f.positioning}</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-10 md:gap-4">
              {f.principles.map((p) => (
                <li key={p.title} className="rounded-md border border-line bg-surface/40 p-4 md:p-5">
                  <div className="font-mono text-[10.5px] tracking-[0.22em] text-cyan">
                    {p.title}
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.6] text-ink-2">{p.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
