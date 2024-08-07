import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { TelegramProvider } from "./telegram-provider";

const pretendard = localFont({
  src: "./font/PretendardVariable.woff2",
  display: "swap",
  style: "normal",
  weight: "100 1000",
});

export const metadata: Metadata = {
  title: "Telegram Mini App",
  description: "A simple telegram mini app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={cn(pretendard.className, "h-full", "overflow-hidden")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <TelegramProvider>{children}</TelegramProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
