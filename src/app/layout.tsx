import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { LayoutProvider } from "@/components/layout-provider";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const hkGroteskWide = localFont({
  src: [
    {
      path: "./fonts/HKGroteskWide-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/HKGroteskWide-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HKGroteskWide-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/HKGroteskWide-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/HKGroteskWide-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/HKGroteskWide-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/HKGroteskWide-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-hkgrotesk-wide",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${hkGroteskWide.variable} antialiased bg-black overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
