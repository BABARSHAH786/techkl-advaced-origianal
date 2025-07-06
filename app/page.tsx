import type { Metadata } from "next"
import ClientHomePage from "./ClientHomePage"
import NewsFetch from "@/components/newsFetch"

export const metadata: Metadata = {
  title: "TechKL - Technology Knowledge & Learning Platform",
  description:
    "Discover the latest in technology, expand your knowledge, and accelerate your learning journey with TechKL - your premier destination for tech insights and education.",
  keywords: "technology, learning, knowledge, tech news, programming, software development, tutorials",
  authors: [{ name: "TechKL Team" }],
  openGraph: {
    title: "TechKL - Technology Knowledge & Learning",
    description: "Your premier destination for tech insights and education",
    url: "https://techkl.de",
    siteName: "TechKL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechKL - Technology Knowledge & Learning",
    description: "Your premier destination for tech insights and education",
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
}

export default function HomePage() {
  return (
    <>
 
  <NewsFetch />
   <ClientHomePage />
  </>
  )
}
