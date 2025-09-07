import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P } from "next/font/google"
import { Space_Grotesk, Inter, Orbitron } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "../globals.css"
import { NotificationProvider } from "@/components/nebulux/notification-context"
import { NotificationContainer } from "@/components/nebulux/notification"

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})
const jersey15 = Orbitron({
  subsets: ["latin"],
  variable: "--font-jersey",
  display: "swap",
})
// Retro pixelated arcade-style font
const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nebulux — Stay Tuned",
  description: "Something new is almost here.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Nebulux — Stay Tuned",
    description: "Something new is almost here.",
    url: "https://example.com",
    siteName: "Nebulux",
    images: ["/opengraph-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nebulux — Stay Tuned",
    description: "Something new is almost here.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${display.variable} ${GeistMono.variable} ${jersey15.variable} ${pressStart2P.variable} antialiased`}
    >
      <body className="font-sans min-h-dvh bg-gradient-to-b from-black to-white dark:bg-gradient-to-b dark:from-black dark:to-background text-white dark:text-foreground">
        <NotificationProvider>
          <a
            href="#hero"
            className="sr-only focus:not-sr-only fixed left-3 top-3 z-[1000] rounded-md bg-black/80 px-3 py-2 text-sm text-white outline-none ring-2 ring-white backdrop-blur-md"
          >
            Skip to content
          </a>
          <Suspense fallback={null}>{children}</Suspense>
          <NotificationContainer />
          <Analytics />
        </NotificationProvider>
      </body>
    </html>
  )
}
