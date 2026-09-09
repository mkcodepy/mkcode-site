import { useEffect, useRef } from "react";

/**
 * Ambient Matrix-style rain, tuned to MK CODE:
 *   - katakana + code glyphs
 *   - dim body glyphs in `--brand` blue, bright head in `--cyan`
 *   - low density, slow cadence — never dominates content
 *   - pauses when tab hidden or `prefers-reduced-motion: reduce`
 */
const GLYPHS =
  "アカサタナハマヤラワイキシチニヒミリヰウクスツヌフムユルエケセテネヘメレヱオコソトノホモヨロヲ01<>/{}[]$_=+*";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const constrained = connection?.saveData || connection?.effectiveType === "2g";

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let drops: { y: number; speed: number; len: number; brightIdx: number }[] = [];
    const fontSize = constrained ? 22 : window.innerWidth < 640 ? 19 : 15;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / fontSize);
      drops = Array.from({ length: cols }, () => ({
        y: Math.random() * -100,
        speed: 0.35 + Math.random() * 0.55,
        len: 8 + Math.floor(Math.random() * 18),
        brightIdx: 0,
      }));
    }

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = performance.now();
    let running = !document.hidden;

    function frame(now: number) {
      if (!ctx || !canvas) return;
      const dt = now - last;
      if (constrained && dt < 42) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;

      // fade previous frame — creates the trailing effect
      ctx.fillStyle = "rgba(5, 7, 11, 0.14)";
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      const stepScale = dt / 16; // normalize to 60fps
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const x = i * fontSize;
        // draw body glyphs
        for (let k = 0; k < d.len; k++) {
          const yy = d.y - k * fontSize;
          if (yy < -fontSize) continue;
          const alpha = Math.max(0, 0.55 - k * 0.05);
          if (k === 0) {
            ctx.fillStyle = `rgba(105, 213, 255, ${Math.min(1, 0.9)})`; // head cyan
          } else if (k === 1) {
            ctx.fillStyle = `rgba(180, 230, 255, 0.75)`;
          } else {
            ctx.fillStyle = `rgba(22, 119, 255, ${alpha * 0.6})`; // trailing brand
          }
          const ch = GLYPHS.charAt((d.brightIdx + k) % GLYPHS.length);
          ctx.fillText(ch, x, yy);
        }
        d.y += d.speed * fontSize * 0.18 * stepScale;
        d.brightIdx = (d.brightIdx + (Math.random() < 0.04 ? 1 : 0)) % GLYPHS.length;
        if (d.y - d.len * fontSize > window.innerHeight) {
          if (Math.random() < 0.02) {
            d.y = -Math.random() * 200;
            d.speed = 0.35 + Math.random() * 0.55;
            d.len = 8 + Math.floor(Math.random() * 18);
          }
        }
      }

      if (running) raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    const onVis = () => {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (raf) {
        cancelAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.18] mix-blend-screen"
    />
  );
}
