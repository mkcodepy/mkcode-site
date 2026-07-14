import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "md" | "lg";
  asChild?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 font-mono text-[12px] tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2 rounded-[8px]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-ink border border-brand-2/60 hover:bg-brand-2 hover:shadow-[0_10px_40px_-10px_rgba(22,119,255,0.55)] active:translate-y-[1px]",
  secondary:
    "border border-line-2 text-ink hover:border-cyan hover:bg-cyan/5 backdrop-blur-sm",
  ghost: "text-ink-2 hover:text-ink",
};

const sizes = {
  md: "h-11 px-5",
  lg: "h-12 px-6",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", asChild, className = "", ...rest },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref as never}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    />
  );
});
