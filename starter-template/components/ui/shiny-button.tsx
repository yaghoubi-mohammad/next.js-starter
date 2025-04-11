"use client";

import React from "react";
import { motion, type AnimationProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const animationProps = {
  initial: { "--x": "100%", scale: 1 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.9 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

const ShinyButton = ({
  children,
  className,
  href,
  ...props
}: ShinyButtonProps) => {
  return (
    <Link href={href}>
      <motion.button
        {...animationProps}
        {...props}
        className={cn(
          "relative rounded-full px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/50%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/90%)]",
          className
        )}
      >
        <span
          className="relative block size-full text-sm tracking-wide dark:font-light text-[rgb(255,255,255)]"
          style={{
            maskImage:
              "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%));",
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)) content-box exclude, linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0));",
            maskComposite: "exclude",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/90%)_calc(var(--x)+90%),hsl(var(--primary)/50%)_calc(var(--x)+55%),hsl(var(--primary)/70%)_calc(var(--x)+100%))] p-px"
        ></span>
      </motion.button>
    </Link>
  );
};

export default ShinyButton;
