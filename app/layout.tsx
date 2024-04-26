import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { IBM_Plex_Mono as FontMono } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-[#011627] text-white font-sans antialiased
          ${fontSans.variable} ${fontMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("/"),
  title: "The Editor",
  description: "A Minimal editor",
  appleWebApp: {
    title: "The Editor",
    capable: true,
    statusBarStyle: "black-translucent",
  },
};
