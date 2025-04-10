import { ThemeProvider } from "next-themes";
import "../../styles/globals.css";
import Navbar from "../../components/server/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="px-6 py-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
