import { Container, Eyebrow } from "@/components/layout/Container";
import { Monogram } from "@/components/brand/Monogram";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function Founder() {
  const dict = getDict(useLocale());
  const f = dict.founder;
  return (
    <section className="relative py-28 md:py-36" id="mkcode">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          {/* Portrait placeholder */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-gradient-to-br from-surface via-bg-2 to-bg">
            <div className="absolute inset-0 mk-grid-lines opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(105,213,255,0.18),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(22,119,255,0.25),transparent_60%)]" />
            <div className="absolute inset-6 flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-ink-3">
                <span>PORTRAIT / PLACEHOLDER</span>
                <span>MK.001</span>
              </div>
              <Monogram size={110} className="opacity-90" />
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-2xl font-semibold text-ink">{f.name}</div>
                  <div className="font-mono text-[10.5px] tracking-[0.22em] text-ink-3">
                    {f.role.toUpperCase()}
                  </div>
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] text-ink-3 text-right">
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
              className="mt-4 font-display font-semibold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.85rem, 3.4vw, 3rem)" }}
            >
              {f.heading}
            </h2>
            <p className="mt-8 text-ink-2">{f.bio}</p>
            <p className="mt-4 text-ink-3">{f.positioning}</p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {f.principles.map((p) => (
                <li key={p.title} className="rounded-md border border-line bg-surface/40 p-5">
                  <div className="font-mono text-[10.5px] tracking-[0.22em] text-cyan">
                    {p.title}
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{p.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
