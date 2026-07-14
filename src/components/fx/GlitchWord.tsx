/**
 * Wraps text with a short RGB-split glitch triggered by an `data-glitch`
 * animation on mount. Keeps the layout stable — the glitch layers are absolute.
 */
export function GlitchWord({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`mk-glitch relative inline-block ${className}`} data-text={children}>
      <span className="relative z-10">{children}</span>
    </span>
  );
}
