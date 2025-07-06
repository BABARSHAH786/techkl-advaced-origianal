import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import MonetagAdLoader from "@/components/MonetagAdLoader"


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
    icon: "/favicon-kl.png",
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
        <MonetagAdLoader />
            {/* <script>(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('gizokraijaw.net',9532451,document.createElement('script'))</script> */}
            {/* <script>(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',9532253,document.createElement('script'))</script> */}
        {/* <script src="https://fpyf8.com/88/tag.min.js" data-zone="155769" async data-cfasync="false"></script> */}
      </head>
      {/* monetag script */}
      
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
