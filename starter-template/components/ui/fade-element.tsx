"use client";

import React, { useState, useEffect, useMemo, ReactNode } from "react";
import { motion, Variants, useInView } from "framer-motion";

type FadeElementProps = {
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  framerProps?: Variants;
  children: ReactNode;
  delay?: number; // تأخیر به میلی‌ثانیه
  fullWith?: boolean;
};

export function FadeElement({
  direction = "up",
  className,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { type: "spring" } },
  },
  children,
  delay = 0,
  fullWith = false,
}: FadeElementProps) {
  const ref = React.useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1, // المنت 10% قابل مشاهده باشد
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  const directionOffset = useMemo(() => {
    const map = { up: 10, down: -10, left: -10, right: 10 };
    return map[direction];
  }, [direction]);

  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const FADE_ANIMATION_VARIANTS = useMemo(() => {
    const { hidden, show, ...rest } = framerProps as {
      [name: string]: { [name: string]: number; opacity: number };
    };

    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: hidden?.[axis] ?? directionOffset,
      },
      show: {
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        [axis]: show?.[axis] ?? 0,
      },
    };
  }, [directionOffset, axis, framerProps]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "show" : "hidden"}
      variants={FADE_ANIMATION_VARIANTS}
      className={fullWith ? "w-full" : ""}
    >
      <motion.div className={className}>{children}</motion.div>
    </motion.div>
  );
}
