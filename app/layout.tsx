import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono as FontMono, Inter as FontSans } from "next/font/google"

import "./globals.css"

import { cn } from "@/lib/utils"

import { Providers } from "./providers"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#011627" },
    { media: "(prefers-color-scheme: dark)", color: "#011627" },
  ],
}

export const metadata: Metadata = {
  title: "The Editor",
  description: "A Minimal editor",
  appleWebApp: {
    title: "The Editor",
    capable: true,
    statusBarStyle: "black-translucent",
  },
}
