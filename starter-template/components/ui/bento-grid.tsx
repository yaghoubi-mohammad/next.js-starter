/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[14rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  index,
}: {
  name: string;
  className: string;
  background: React.ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "transform-gpu bg-octa-dark-300 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{
        type: "spring",
        delay: index * 0.2,
        stiffness: 100,
      }}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-24">
        <Icon className="size-12 origin-left transform-gpu text-neutral-800 group-hover:text-neutral-600 transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mt-2.5">
          {name}
        </h3>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-col items-start bg-octa-dark-200/70 backdrop-blur-md gap-3 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <p className="max-w-lg text-neutral-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {description}
        </p>
        <Link
          href={href}
          className="pointer-events-auto flex rtl:flex-row-reverse items-center gap-2 px-3 py-1 rounded-full bg-octa-light-300 bg-opacity-30 hover:bg-opacity-70 transition-all"
        >
          {cta}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </motion.div>
  );
};

export { BentoCard, BentoGrid };
