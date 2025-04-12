/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider } from "@/hooks/useTheme";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const messages = (await import(`@/i18n/${locale}.json`)).default;

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className="bg-octa-dark-300 font-display text-octa-base-100">
        <NextTopLoader color="#fff" shadow="0" height={2} />

        <NextIntlClientProvider>
          <ThemeProvider>
            {children}
            <Toaster position="bottom-left" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
