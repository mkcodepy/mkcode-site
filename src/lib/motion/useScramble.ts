import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./prefs";

const GLYPHS = "アカサタナハマヤラワイキシチニヒミリヰウクスツヌフムユルエケセテネヘメレヱオコソトノホモヨロヲ0123456789<>/\\|{}[]=+*_";

function randomGlyph() {
  return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
}

/**
 * Progressively "decrypts" a target string, resolving characters left→right
 * while others show random glyphs. Spaces are never scrambled.
 */
export function useScramble(
  target: string,
  {
    duration = 700,
    trigger = true,
    delay = 0,
  }: { duration?: number; trigger?: boolean; delay?: number } = {},
) {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(reduced ? target : target.replace(/\S/g, "·"));
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    if (reduced) {
      setText(target);
      return;
    }

    const len = target.length;
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t + delay;
      const elapsed = Math.max(0, t - startRef.current);
      const p = Math.min(1, elapsed / duration);
      const resolveUpTo = Math.floor(p * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = target[i];
        if (ch === " " || ch === "\n") {
          out += ch;
        } else if (i < resolveUpTo) {
          out += ch;
        } else {
          out += randomGlyph();
        }
      }
      setText(out);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setText(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [target, duration, trigger, delay, reduced]);

  return text;
}
