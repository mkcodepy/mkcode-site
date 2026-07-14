import type { PropsWithChildren } from "react";

export function Container({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`mk-container ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`mk-eyebrow ${className}`}>{children}</div>;
}

export function TechLabel({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`mk-label ${className}`}>{children}</div>;
}

export function SectionSeparator() {
  return (
    <div className="mk-container">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />
    </div>
  );
}
