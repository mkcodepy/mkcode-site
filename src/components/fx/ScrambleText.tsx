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
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onView?: boolean;
}) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const trigger = onView ? inView : true;
  const text = useScramble(children, { duration, delay, trigger });
  // React JSX generic on Tag requires a cast for the ref/props union.
  const Component = Tag as unknown as React.ElementType;
  return (
    <Component ref={ref as never} className={className}>
      {text}
    </Component>
  );
}
