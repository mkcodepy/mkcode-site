import { Monogram } from "./Monogram";
import { GlitchWord } from "@/components/fx/GlitchWord";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-2.5 " + (className ?? "")}>
      <Monogram size={26} />
      <span className="font-display text-[15px] font-semibold tracking-[0.18em] text-ink">
        <GlitchWord>MK CODE</GlitchWord>
      </span>
    </span>
  );
}
