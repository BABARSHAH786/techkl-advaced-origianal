import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://techkl.de"),
  title: {
    default: "TechKL - Technology Knowledge & Learning",
    template: "%s | TechKL",
  },
  description: "Your premier destination for technology insights, learning resources, and industry news.",
  keywords: ["technology", "learning", "programming", "tutorials", "tech news"],
  authors: [{ name: "TechKL Team" }],
  creator: "TechKL",
  publisher: "TechKL",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://techkl.de" />
        <meta name="google-adsense-account" content="ca-pub-your-adsense-id" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
