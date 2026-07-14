import { Container } from "@/components/layout/Container";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function Selectivity() {
  const dict = getDict(useLocale());
  const s = dict.selectivity;
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32">
      <Container>
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <h2
              className="max-w-2xl font-display font-semibold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.75rem, 3.6vw, 3.2rem)" }}
            >
              {s.heading}
            </h2>
            <p
              className="mt-5 max-w-2xl font-display leading-[1.2] tracking-[-0.01em] text-ink-2 md:mt-6 md:leading-[1.15]"
              style={{ fontSize: "clamp(1.05rem, 1.7vw, 1.6rem)" }}
            >
              {s.follow}
            </p>
          </div>
          <ul className="grid content-center gap-1 self-center md:gap-1.5">
            {s.signals.map((sig, i) => (
              <li key={sig} className="flex items-center gap-3 border-b border-line py-3 md:gap-4">
                <span className="shrink-0 font-mono text-[10.5px] tracking-[0.22em] text-ink-3">
                  0{i + 1}
                </span>
                <span className="min-w-0 flex-1 text-[14.5px] text-ink md:text-base">{sig}</span>
                <span className="shrink-0 inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
