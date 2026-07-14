import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./prefs";

/**
 * Types `target` character by character. Returns the currently visible slice
 * plus a `done` flag.
 */
export function useTypewriter(
  target: string,
  {
    speed = 28,
    delay = 0,
    trigger = true,
  }: { speed?: number; delay?: number; trigger?: boolean } = {},
) {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(reduced ? target : "");
  const [done, setDone] = useState(reduced);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    if (reduced) {
      setText(target);
      setDone(true);
      return;
    }
    setText("");
    setDone(false);
    let i = 0;
    const start = window.setTimeout(function step() {
      i += 1;
      setText(target.slice(0, i));
      if (i >= target.length) {
        setDone(true);
        return;
      }
      timerRef.current = window.setTimeout(step, speed);
    }, delay);
    timerRef.current = start;
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [target, speed, delay, trigger, reduced]);

  return { text, done };
}
