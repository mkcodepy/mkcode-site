import { Marquee } from "@/components/fx/Marquee";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";

export function SignalStrip() {
  const dict = getDict(useLocale());
  const items = dict.signals;
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-2/60 py-3.5 sm:py-5">
      <div className="mk-container flex items-center gap-3 sm:gap-4">
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-cyan sm:gap-2 sm:text-[10.5px] sm:tracking-[0.22em]">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-br-green shadow-[0_0_10px_rgba(0,156,59,0.9)]"
            style={{ animation: "mk-blink 1.4s steps(1) infinite" }}
          />
          LIVE
        </span>
        <span className="h-4 w-px shrink-0 bg-line" />
        <div className="relative flex-1 overflow-hidden">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-bg-2 to-transparent sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg-2 to-transparent sm:w-16" />
          <Marquee speed={38}>
            {items.map((s, i) => (
              <span key={s} className="flex items-center gap-2 sm:gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-3 sm:text-[10.5px] sm:tracking-[0.22em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-block h-1 w-6 bg-line sm:w-8" />
                <span className="font-mono text-[10.5px] tracking-[0.2em] text-ink sm:text-[11px] sm:tracking-[0.22em]">
                  {s}
                </span>
                <span className="text-line-2 px-1.5 sm:px-2">·</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
