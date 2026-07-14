import { useEffect, useState } from "react";

/** Live UTC-3 (Encarnación) clock. Renders empty during SSR then hydrates. */
export function LiveClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const t = d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/Asuncion",
      });
      return t;
    };
    setNow(fmt());
    const id = window.setInterval(() => setNow(fmt()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className={className}>
      {now || "--:--:--"}
      <span
        className="ml-1 inline-block h-2 w-2 translate-y-[-1px] bg-br-green align-middle"
        style={{ animation: "mk-blink 1s steps(1) infinite" }}
      />
    </span>
  );
}
