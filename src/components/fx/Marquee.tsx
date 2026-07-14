import type { ReactNode } from "react";

/**
 * CSS-only infinite marquee. Content is duplicated so the loop is seamless.
 * Slows to a halt when `prefers-reduced-motion` is set (via styles.css).
 */
export function Marquee({
  children,
  speed = 40,
  className = "",
}: {
  children: ReactNode;
  speed?: number; // seconds per full loop
  className?: string;
}) {
  return (
    <div
      className={`mk-marquee relative flex w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className="mk-marquee-track flex shrink-0 items-center gap-16 whitespace-nowrap pr-16"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        className="mk-marquee-track flex shrink-0 items-center gap-16 whitespace-nowrap pr-16"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
