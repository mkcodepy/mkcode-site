import { useTypewriter } from "@/lib/motion/useTypewriter";

export function Typewriter({
  children,
  speed = 28,
  delay = 0,
  cursor = true,
  className,
}: {
  children: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  className?: string;
}) {
  const { text, done } = useTypewriter(children, { speed, delay });
  return (
    <span className={className}>
      {text}
      {cursor ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[0.9em] w-[0.55ch] translate-y-[0.08em] bg-cyan align-middle"
          style={{
            animation: done ? "mk-blink 1s steps(1) infinite" : "none",
            opacity: done ? undefined : 1,
          }}
        />
      ) : null}
    </span>
  );
}
