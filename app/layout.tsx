// app/layout.tsx
import { Analytics } from "@vercel/analytics/next"
import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "UrbanWatch - Civic Issue Reporting Dashboard",
  description: "Professional civic management tool for tracking and resolving urban issues",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  // Add any other props here
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} antialiased`}>
      <body className="font-sans">{children}</body>
      <Analytics />
    </html>
  )
}