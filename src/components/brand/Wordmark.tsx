import { Monogram } from "./Monogram";
import { GlitchWord } from "@/components/fx/GlitchWord";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={"inline-flex items-center gap-2 sm:gap-2.5 " + (className ?? "")}>
      <Monogram size={24} className="sm:hidden" />
      <Monogram size={26} className="hidden sm:block" />
      <span className="whitespace-nowrap font-display text-[13.5px] font-semibold tracking-[0.16em] text-ink sm:text-[15px] sm:tracking-[0.18em]">
        <GlitchWord>MK CODE</GlitchWord>
      </span>
    </span>
  );
}
