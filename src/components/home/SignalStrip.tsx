import { Container } from "@/components/layout/Container";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function SignalStrip() {
  const dict = getDict(useLocale());
  return (
    <section className="border-y border-line bg-bg-2/60 py-6">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {dict.signals.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.22em] text-ink-3">
                0{i + 1}
              </span>
              <span className="h-px flex-1 bg-line" />
              <span className="font-mono text-[10.5px] tracking-[0.2em] text-ink">{s}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
