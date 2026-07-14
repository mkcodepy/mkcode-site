import { Container } from "@/components/layout/Container";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function Selectivity() {
  const dict = getDict(useLocale());
  const s = dict.selectivity;
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <h2
              className="max-w-2xl font-display font-semibold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.85rem, 3.6vw, 3.2rem)" }}
            >
              {s.heading}
            </h2>
            <p
              className="mt-6 max-w-2xl font-display leading-[1.15] tracking-[-0.01em] text-ink-2"
              style={{ fontSize: "clamp(1.15rem, 1.7vw, 1.6rem)" }}
            >
              {s.follow}
            </p>
          </div>
          <ul className="grid content-center gap-1.5 self-center">
            {s.signals.map((sig, i) => (
              <li key={sig} className="flex items-center gap-4 border-b border-line py-3">
                <span className="font-mono text-[10.5px] tracking-[0.22em] text-ink-3">
                  0{i + 1}
                </span>
                <span className="text-ink">{sig}</span>
                <span className="ml-auto inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
