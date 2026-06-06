import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "JSON Formatter - Best Online JSON Viewer, Beautifier & Repair Tool",
    template: "%s | JSONlix"
  },
  description: "Free online JSON formatter, viewer, and validator. Best tool to beautify, minify, repair, and navigate complex JSON data locally with 100% privacy and high performance.",
  keywords: [
    "json formatter", "online json formatter", "json beautifier", "json viewer online", 
    "json validator", "json lint", "minify json", "json repair tool", "offline json formatter",
    "private json viewer", "json tree view", "large json viewer", "json formatter online free",
    "beautify json online", "validate json schema"
  ],
  authors: [{ name: "JSONlix" }],
  creator: "JSONlix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jsonlix.com",
    title: "JSON Formatter - Online JSON Viewer, Beautifier & Repair Tool",
    description: "Format, validate, and explore JSON files locally. High-performance online JSON beautifier and viewer with 100% privacy.",
    siteName: "JSONlix",
    images: [
      {
        url: "/dark.png",
        width: 1200,
        height: 630,
        alt: "JSONlix - The Best Online JSON Formatter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter - Online JSON Viewer, Beautifier & Repair Tool",
    description: "Format, validate, and explore JSON files locally. High-performance online JSON beautifier and viewer with 100% privacy.",
    images: ["/dark.png"],
    creator: "@jsonlix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon_io/favicon-32x32.png",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
  verification: {
    google: "AZXnJCXpWyzf2eCzf-L3iBa7QSQnR1cOpdI9Wos6UpU",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VPYL6YC2VB" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VPYL6YC2VB');
          `}
        </Script>
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster position="top-right" richColors />
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
