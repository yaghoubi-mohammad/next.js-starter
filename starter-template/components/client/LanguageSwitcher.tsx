// components/LanguageSwitcher.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CountryFlag from "react-country-flag";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserLocale, setUserLocale } from "@/configs/locale";
import { Locale } from "@/configs/i18n";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [language, setLanguage] = useState<string | null>(null);

  const updateBodyClass = (locale: string) => {
    const body = document.body;
    body.classList.remove("font-persian", "font-english");
    if (locale === "fa") {
      body.classList.add("font-persian");
    } else {
      body.classList.add("font-english");
    }
  };

  useEffect(() => {
    async function fetchLocale() {
      const userLocale = await getUserLocale();
      setLanguage(userLocale);
      updateBodyClass(userLocale);
    }
    fetchLocale();
  }, []);

  const handleLanguageChange = async (newLanguage: Locale) => {
    setLanguage(newLanguage);
    await setUserLocale(newLanguage);
    updateBodyClass(newLanguage);
    router.refresh();
  };

  if (!language) return null;

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[130px] bg-background">
        <SelectValue>
          <div className="flex items-center gap-2">
            <CountryFlag
              countryCode={language === "fa" ? "IR" : "US"}
              svg
              style={{ width: "20px", height: "20px" }}
            />
            <span>{language === "fa" ? "فارسی" : "English"}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <CountryFlag
              countryCode="US"
              svg
              style={{ width: "20px", height: "20px" }}
            />
            <span>English</span>
          </div>
        </SelectItem>
        <SelectItem value="fa">
          <div className="flex items-center gap-2">
            <CountryFlag
              countryCode="IR"
              svg
              style={{ width: "20px", height: "20px" }}
            />
            <span>فارسی</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
