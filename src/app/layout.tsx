import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { HeaderNavigation } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solex - Solana Explorer",
  description: "Explore Solana blockchain with a clear and user-friendly interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen h-screen flex flex-col items-center gap-8 p-4">
            <div className="flex gap-3">
              <HeaderNavigation />
              <ModeToggle />
            </div>

            <div className="grow h-full w-full max-w-4xl">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
