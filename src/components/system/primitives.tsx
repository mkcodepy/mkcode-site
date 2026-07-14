/**
 * Reusable BR → PY system primitives. All SVG based, no WebGL.
 */
import type { PropsWithChildren } from "react";

export function StatusDot({
  color = "cyan",
  className = "",
}: {
  color?: "cyan" | "green" | "yellow" | "red";
  className?: string;
}) {
  const map = {
    cyan: "bg-cyan shadow-[0_0_12px_rgba(105,213,255,0.9)]",
    green: "bg-br-green shadow-[0_0_10px_rgba(0,156,59,0.7)]",
    yellow: "bg-br-yellow shadow-[0_0_10px_rgba(255,223,0,0.6)]",
    red: "bg-py-red shadow-[0_0_10px_rgba(213,43,30,0.7)]",
  } as const;
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${map[color]} ${className}`}
      style={{ animation: "mk-pulse-dot 2.4s ease-in-out infinite" }}
    />
  );
}

export function SystemNode({
  code,
  label,
  accent = "brand",
  size = "md",
}: {
  code: string;
  label: string;
  accent?: "brand" | "br" | "py";
  size?: "sm" | "md" | "lg";
}) {
  const dim = { sm: "h-16 w-16 text-lg", md: "h-24 w-24 text-2xl", lg: "h-32 w-32 text-3xl" }[size];
  const ring =
    accent === "br"
      ? "before:bg-[conic-gradient(from_0deg,#009C3B,#FFDF00,#009C3B)]"
      : accent === "py"
        ? "before:bg-[conic-gradient(from_0deg,#D52B1E,#FFFFFF,#0038A8,#D52B1E)]"
        : "before:bg-[conic-gradient(from_0deg,#1677FF,#69D5FF,#1677FF)]";
  return (
    <div className="relative inline-flex flex-col items-center gap-2">
      <div
        className={`relative grid ${dim} place-items-center rounded-full bg-surface font-mono font-semibold text-ink before:absolute before:inset-[-2px] before:-z-10 before:rounded-full before:opacity-70 before:blur-[6px] ${ring} border border-line-2`}
      >
        <span>{code}</span>
      </div>
      <span className="font-mono text-[10px] tracking-[0.22em] text-ink-3">{label}</span>
    </div>
  );
}

/**
 * Animated horizontal route between two points, with data packets travelling along.
 */
export function RouteLine({
  className = "",
  height = 80,
  segments = 3,
}: {
  className?: string;
  height?: number;
  segments?: number;
}) {
  return (
    <svg
      viewBox={`0 0 400 ${height}`}
      preserveAspectRatio="none"
      className={`w-full ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rl" x1="0" x2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1677FF" stopOpacity="0" />
          <stop offset="20%" stopColor="#1677FF" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#69D5FF" stopOpacity="1" />
          <stop offset="80%" stopColor="#1677FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1677FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        x1="0"
        y1={height / 2}
        x2="400"
        y2={height / 2}
        stroke="url(#rl)"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1={height / 2}
        x2="400"
        y2={height / 2}
        stroke="#69D5FF"
        strokeWidth="1.2"
        strokeDasharray="4 12"
        style={{ animation: "mk-dash 3s linear infinite" }}
      />
      {Array.from({ length: segments }).map((_, i) => (
        <circle
          key={i}
          r="2"
          fill="#69D5FF"
          cx={0}
          cy={height / 2}
          style={{
            animation: `mk-packet 4s linear ${i * 1.3}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes mk-packet {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(400px); opacity: 0; }
        }
      `}</style>
    </svg>
  );
}

export function TerminalBox({
  prompt,
  steps,
  className = "",
}: {
  prompt: string;
  steps: string[];
  className?: string;
}) {
  return (
    <div
      className={`rounded-md border border-line bg-bg-2/80 p-4 font-mono text-[12px] leading-6 text-ink-2 backdrop-blur-sm ${className}`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-py-red/70" />
        <span className="inline-block h-2 w-2 rounded-full bg-br-yellow/70" />
        <span className="inline-block h-2 w-2 rounded-full bg-br-green/70" />
        <span className="ml-auto text-[10px] tracking-[0.22em] text-ink-3">PRODUCTION</span>
      </div>
      <div className="text-ink">
        {prompt}
        <span
          className="ml-1 inline-block h-3 w-2 -translate-y-[1px] bg-cyan align-middle"
          style={{ animation: "mk-blink 1s steps(1) infinite" }}
        />
      </div>
      <ul className="mt-2 space-y-0.5">
        {steps.map((s) => (
          <li key={s} className="flex gap-2">
            <span className="text-br-green">✓</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechCard({
  label,
  value,
  className = "",
  children,
}: PropsWithChildren<{ label: string; value?: string; className?: string }>) {
  return (
    <div
      className={`rounded-md border border-line bg-surface/60 p-3 backdrop-blur-sm ${className}`}
    >
      <div className="mk-label text-ink-3">{label}</div>
      {value ? <div className="mt-1 font-mono text-[13px] text-ink">{value}</div> : null}
      {children}
    </div>
  );
}
