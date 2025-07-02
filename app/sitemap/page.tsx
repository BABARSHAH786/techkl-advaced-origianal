import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SitemapPage() {
  const sitePages = [
    { title: "Home", url: "/", description: "Welcome to TechKL - Technology Knowledge & Learning" },
    { title: "Blog", url: "/blog", description: "Latest articles, tutorials, and tech insights" },
    { title: "News", url: "/news", description: "Latest technology news and updates" },
    { title: "About", url: "/about", description: "Learn more about TechKL and our mission" },
    { title: "Contact", url: "/contact", description: "Get in touch with our team" },
    { title: "Privacy Policy", url: "/privacy", description: "Our privacy policy and data handling practices" },
    { title: "Terms & Conditions", url: "/terms", description: "Terms of service and usage guidelines" },
    { title: "Admin", url: "/admin", description: "Content management system (protected)" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
          <p className="text-xl text-gray-600">Navigate through all pages and sections of TechKL</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sitePages.map((page, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <Link
                    href={page.url}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {page.title}
                  </Link>
                  <p className="text-gray-600 mt-1">{page.description}</p>
                  <p className="text-sm text-gray-400 mt-1">https://techkl.de{page.url}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            For XML sitemap, visit:{" "}
            <a href="/sitemap.xml" className="text-blue-600 hover:underline">
              /sitemap.xml
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
