import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

// A staggered in-view reveal. Under reduced motion it renders plain, instantly.
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: ease.outExpo, delay }}
    >
      {children}
    </MotionTag>
  );
}
