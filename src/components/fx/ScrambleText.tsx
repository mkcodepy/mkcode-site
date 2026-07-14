import type { ElementType } from "react";
import { useScramble } from "@/lib/motion/useScramble";
import { useInViewOnce } from "@/lib/motion/useInViewOnce";

export function ScrambleText({
  children,
  duration = 700,
  delay = 0,
  as: Tag = "span",
  className,
  onView = false,
}: {
  children: string;
  duration?: number;
  delay?: number;
  as?: ElementType;
  className?: string;
  onView?: boolean;
}) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const trigger = onView ? inView : true;
  const text = useScramble(children, { duration, delay, trigger });
  const Component = Tag as ElementType;
  return (
    <Component ref={ref as never} className={className}>
      {text}
    </Component>
  );
}
