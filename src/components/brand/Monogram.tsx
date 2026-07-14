import type { SVGProps } from "react";

export function Monogram({
  size = 28,
  className,
  ...rest
}: { size?: number; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <linearGradient id="mkg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#69D5FF" />
          <stop offset="100%" stopColor="#1677FF" />
        </linearGradient>
      </defs>
      {/* frame */}
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="url(#mkg)" strokeWidth="1.4" />
      {/* M */}
      <path
        d="M8 29 V13 L14 22 L20 13 V29"
        stroke="url(#mkg)"
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* K */}
      <path
        d="M25 13 V29 M25 21 L32 13 M25 21 L32 29"
        stroke="url(#mkg)"
        strokeWidth="2.2"
        strokeLinecap="square"
        fill="none"
      />
      {/* signal dot */}
      <circle cx="34" cy="6" r="1.6" fill="#69D5FF" />
    </svg>
  );
}
