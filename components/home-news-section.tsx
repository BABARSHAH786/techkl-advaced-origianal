"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Newspaper, TrendingUp } from "lucide-react"
import { useCachedNews } from "@/hooks/use-cached-news"
import NewsGrid from "@/components/news-grid"
import NewsSkeleton from "@/components/news-skeleton"

export default function HomeNewsSection() {
  const { articles, loading, error } = useCachedNews(6) // Limit to 6 articles for home page

  if (error) {
    return null // Don't show error on home page, just skip the section
  }

  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mb-4 shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Latest Tech News</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Stay informed with the most recent technology developments and industry insights
          </p>
          <Link href="/news">
            <Button
              variant="outline"
              className="bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white/80 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              View All News
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>

        {/* News Content */}
        {loading ? (
          <NewsSkeleton count={6} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
        ) : articles.length > 0 ? (
          <>
            <NewsGrid articles={articles} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />

            {/* View More Button */}
            <div className="text-center mt-12">
              <Link href="/news">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Newspaper className="mr-2 h-5 w-5" />
                  Explore More News
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
