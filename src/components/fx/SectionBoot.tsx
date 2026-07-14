import type { ReactNode } from "react";
import { useTypewriter } from "@/lib/motion/useTypewriter";
import { useInViewOnce } from "@/lib/motion/useInViewOnce";

/**
 * Renders a short mono "boot" line above section content that types itself in
 * when the section enters the viewport. Purely decorative.
 */
export function SectionBoot({
  name,
  children,
  className = "",
}: {
  name: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const label = `> boot section:${name.toLowerCase()} · ok`;
  const { text, done } = useTypewriter(label, { speed: 22, trigger: inView });
  return (
    <div ref={ref} className={className}>
      <div
        className="mk-container mb-4 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-cyan/70"
        aria-hidden
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(105,213,255,0.9)]" />
        <span className="min-h-[1em]">
          {text}
          {!done ? (
            <span
              className="ml-0.5 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.08em] bg-cyan align-middle"
              style={{ animation: "mk-blink 0.6s steps(1) infinite" }}
            />
          ) : null}
        </span>
      </div>
      {children}
    </div>
  );
}
