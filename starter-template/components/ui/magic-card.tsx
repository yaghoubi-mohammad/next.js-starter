"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useCallback, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col justify-center items-center w-full h-full overflow-hidden rounded-3xl border border-octa-dark-100 text-black dark:text-white",
        className
      )}
      style={{ position: "relative" }} // اطمینان از موقعیت نسبی
    >
      {/* محتوای درون کارت */}
      <div className="relative z-20 w-full h-full">{children}</div>

      <div
        className="absolute top-0 left-0 w-full h-full content-[''] z-10 pointer-events-none bg-[url('https://s3.octavia.ir/octavia-tech/noise.gif')]"
        style={{ opacity: 0.05 }}
      ></div>

      <section className="font-semibold bg-gradient-to-t dark:to-gray-800 dark:from-gray-950 to-[#dadada] from-[#ebebeb] flex flex-col items-center justify-center dark:text-white text-black">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </section>

      {/* افکت گرادیان در پس‌زمینه */}
      <motion.div
        className="pointer-events-none absolute inset-0 w-full h-full rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
              radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
            `,
          opacity: gradientOpacity,
        }}
      />
    </div>
  );
}
