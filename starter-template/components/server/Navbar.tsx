"use client";

import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("../client/ThemeToggle"), {
  ssr: false,
});

export default function Navbar() {
  return (
    <nav className="flex justify-end p-4">
      <ThemeToggle />
    </nav>
  );
}
