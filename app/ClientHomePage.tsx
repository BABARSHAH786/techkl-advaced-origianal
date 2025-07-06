"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Newspaper, Settings, Globe, Zap, ArrowRight, TrendingUp } from "lucide-react"
// import HomeNewsSection from "@/components/home-news-section"

export default function ClientHomePage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TechKL",
            description: "Technology Knowledge & Learning Platform",
            url: "https://techkl.de",
            publisher: {
              "@type": "Organization",
              name: "TechKL",
              url: "https://techkl.de",
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-bounce"
            style={{ animationDuration: "6s" }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-8 shadow-2xl animate-pulse">
              <span className="text-3xl font-bold text-white">TK</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Tech
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">KL</span>
            </h1>

            <div className="flex flex-wrap justify-center gap-2 mb-6 text-xl md:text-2xl text-gray-600">
              <span className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">Technology</span>
              <span className="text-gray-400">•</span>
              <span className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">Knowledge</span>
              <span className="text-gray-400">•</span>
              <span className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">Learning</span>
            </div>

            <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover the latest in technology, expand your knowledge, and accelerate your learning journey. Your
              premier destination for tech insights, tutorials, and industry news.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Newspaper className="mr-2 h-5 w-5" />
                Latest News
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Offer</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Globe,
                  title: "Latest Tech News",
                  description: "Stay updated with the latest technology news and trends from around the world",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  icon: BookOpen,
                  title: "Learning Resources",
                  description: "Comprehensive tutorials, guides, and educational content for all skill levels",
                  color: "from-green-500 to-green-600",
                },
                {
                  icon: Zap,
                  title: "Expert Insights",
                  description: "In-depth analysis and expert opinions on emerging technologies and trends",
                  color: "from-purple-500 to-purple-600",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg group"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animation: "fadeInUp 0.8s ease-out forwards",
                  }}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        {/* <HomeNewsSection /> */}

        {/* Main Navigation Cards */}
        {/* <section className="relative z-10 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore TechKL</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  href: "/blog",
                  icon: BookOpen,
                  title: "Blog",
                  description: "Read our latest articles, tutorials, and insights on technology and programming",
                  color: "from-blue-500 to-blue-600",
                  buttonText: "Read Articles",
                },
                {
                  href: "/news",
                  icon: Newspaper,
                  title: "News",
                  description: "Stay updated with the latest technology news and industry developments",
                  color: "from-green-500 to-green-600",
                  buttonText: "View News",
                },
                {
                  href: "/admin",
                  icon: Settings,
                  title: "Admin",
                  description: "Manage content, create new posts, and configure site settings",
                  color: "from-purple-500 to-purple-600",
                  buttonText: "Admin Panel",
                },
              ].map((item, index) => (
                <Link key={index} href={item.href}>
                  <Card className="hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
                    <CardHeader className="text-center">
                      <div
                        className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      >
                        <item.icon className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl mb-4">{item.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        {item.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white border-0 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
              <CardContent className="relative z-10 py-16 text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-80" />
                <h2 className="text-4xl font-bold mb-6">Ready to Expand Your Tech Knowledge?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of learners and stay ahead in the rapidly evolving world of technology
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/blog">
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      Start Learning
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-white border-white/50 hover:bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 bg-transparent"
                    >
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
