/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const transition = {
  type: "spring",
  duration: 0.5, // سرعت انیمیشن
};

export default function MediaModal({ items }: any) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const openModal = (i: number, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setIndex(i);
    setIsOpen(true);
  };

  return (
    <div className="relative h-full">
      <MotionConfig transition={transition}>
        <motion.div className="grid lg:grid-cols-3 max-md:grid-cols-1 grid-cols-2 w-full gap-4 py-10">
          {items.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              onClick={(event) => openModal(i, event)}
              className="w-full flex relative cursor-pointer flex-col overflow-hidden border border-octa-dark-50 bg-octa-dark-200 hover:bg-octa-dark-100 transition-all"
              style={{ borderRadius: "12px" }}
            >
              {item.imgSrc && (
                <motion.div
                  layoutId={`dialog-img-${item.id}`}
                  className="w-full"
                >
                  <Image
                    src={item.imgSrc}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="grayscale hover:grayscale-0 transition-all duration-400 cursor-pointer object-contain w-full h-auto"
                  />
                </motion.div>
              )}

              {item.videoSrc && (
                <motion.div
                  layoutId={`dialog-video-${item.id}`}
                  className="w-full"
                >
                  <video
                    src={item.videoSrc}
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 cursor-pointer"
                    muted
                    loop
                    autoPlay
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence initial={false} mode="sync">
          {isOpen && (
            <>
              <motion.div
                key={`backdrop-${items[index].id}`}
                className="fixed inset-0 h-full w-full bg-black/25 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                key="dialog"
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{
                  scale: 0.5, // اندازه اولیه بسیار کوچک
                  opacity: 0,
                  x: clickPosition.x - window.innerWidth / 2,
                  y: clickPosition.y - window.innerHeight / 2,
                  transformOrigin: `${clickPosition.x}px ${clickPosition.y}px`,
                }}
                animate={{
                  scale: 1, // بزرگ شدن به اندازه اصلی
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transformOrigin: "center center",
                }}
                exit={{ scale: 0.5, opacity: 0 }} // اندازه خروجی کوچک‌تر
                transition={transition} // تنظیم خاصیت انیمیشن
              >
                <motion.div
                  className="pointer-events-auto relative flex flex-col overflow-hidden border border-octa-dark-50 bg-octa-dark-200 hover:bg-octa-dark-100 transition-all w-auto h-auto"
                  layoutId={`dialog-${items[index].id}`}
                  style={{ borderRadius: "24px" }}
                >
                  {items[index]?.imgSrc && (
                    <motion.div
                      layoutId={`dialog-img-${items[index].id}`}
                      className="w-full"
                    >
                      <Image
                        src={items[index].imgSrc}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="rounded-3xl transition-all duration-400 cursor-pointer w-full h-auto object-contain"
                      />
                    </motion.div>
                  )}

                  {items[index]?.videoSrc && (
                    <motion.div
                      layoutId={`dialog-video-${items[index].id}`}
                      className="w-full h-auto"
                    >
                      <video
                        src={items[index].videoSrc}
                        className="h-full w-full object-cover rounded-sm"
                        muted
                        loop
                        autoPlay
                        controls
                      />
                    </motion.div>
                  )}

                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-6 top-6 p-2 bg-octa-dark-100 rounded-full hover:bg-octa-dark-50 transition-all"
                    aria-label="Close dialog"
                  >
                    <XIcon size={24} />
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
