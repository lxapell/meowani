import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono, Montserrat, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/shadcn/utils";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MeowAni - Free Anime Streaming",
    template: "%s | MeowAni",
  },
  description:
    "Watch anime online for free with no ads. Stream your favorite anime series in HD quality.",
  authors: [{ name: "Yohan" }],
  openGraph: {
    type: "website",
    siteName: "MeowAni - Free anime online",
    title: "MeowAni - Free Anime Streaming",
    description: "Watch anime online for free with no ads.",
    images: ["/assets/logo/logo-large.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeowAni - Free Anime Streaming",
    site: "MeowAni",
    description: "Watch anime online for free with no ads.",
    images: ["/assets/logo/logo-large.png"],
  },
  applicationName: "MeowAni",
  appleWebApp: {
    capable: true,
    title: "MeowAni",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#8bdfea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        montserrat.variable,
        sora.variable,
        "dark",
      )}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          {children}
          {/*<BackNavigationFix />*/}
        </TooltipProvider>
        <Analytics />
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-LNNQQ01K4K" />
    </html>
  );
}
