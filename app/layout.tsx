import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { cn } from "@/lib/utils";
import Providers from "./providers/providers";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

const pretendard = localFont({
  src: "./font/PretendardVariable.woff2",
  display: "swap",
  style: "normal",
  weight: "100 1000",
});

export const metadata: Metadata = {
  title: "Babydog Web App",
  description: "Babydog To The Moon",
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
          <Providers>
            <Suspense>{children}</Suspense>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
