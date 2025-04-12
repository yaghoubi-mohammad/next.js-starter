// components/client/Logo.tsx

"use client";

import { useTheme } from "@/hooks/useTheme";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Logo() {
  const t = useTranslations("Footer");
  const { theme } = useTheme();

  return (
    <Image
      src={
        theme === "dark"
          ? "https://s3.octavia.ir/octavia-tech/logo-light.png"
          : "https://s3.octavia.ir/octavia-tech/logo-dark.png"
      }
      alt={t("logoAlt")}
      title={t("logoTitle")}
      width={170}
      height={20}
      className="object-contain"
    />
  );
}
