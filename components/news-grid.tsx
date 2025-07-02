"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock, TrendingUp } from "lucide-react"

interface NewsArticle {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
  author?: string
}

interface NewsGridProps {
  articles: NewsArticle[]
  showAll?: boolean
  className?: string
}

export default function NewsGrid({ articles, showAll = false, className = "" }: NewsGridProps) {
  const displayArticles = showAll ? articles : articles.slice(0, 6)

  return (
    <div className={`grid gap-6 sm:gap-8 ${className}`}>
      {displayArticles.map((article, index) => (
        <Card
          key={index}
          className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl overflow-hidden"
          style={{
            animationDelay: `${index * 100}ms`,
            animation: "fadeInUp 0.6s ease-out forwards",
          }}
        >
          {article.urlToImage && (
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden relative group">
              <img
                src={article.urlToImage || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              </div>
            </div>
          )}

          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-purple-100 transition-colors duration-300"
              >
                {article.source.name}
              </Badge>
              <div className="flex items-center space-x-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                <Clock className="h-3 w-3" />
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-lg leading-tight">
              {article.title}
            </CardTitle>

            {article.description && (
              <CardDescription className="line-clamp-3 text-gray-600 leading-relaxed">
                {article.description}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="pt-0">
            {article.author && (
              <p className="text-sm text-gray-500 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                By {article.author}
              </p>
            )}

            <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                variant="default"
              >
                <span className="mr-2">Read Full Article</span>
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
