"use client"

import { useState, useEffect, useCallback } from "react"

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

interface CachedNews {
  articles: NewsArticle[]
  timestamp: number
}

const CACHE_KEY = "techkl_news_cache"
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export function useCachedNews(limit?: number) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isCacheValid = useCallback((timestamp: number): boolean => {
    return Date.now() - timestamp < CACHE_DURATION
  }, [])

  const getCachedNews = useCallback((): CachedNews | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const parsedCache: CachedNews = JSON.parse(cached)
      return isCacheValid(parsedCache.timestamp) ? parsedCache : null
    } catch {
      return null
    }
  }, [isCacheValid])

  const setCachedNews = useCallback((articles: NewsArticle[]): void => {
    try {
      const cacheData: CachedNews = {
        articles,
        timestamp: Date.now(),
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.warn("Failed to cache news:", error)
    }
  }, [])

  const fetchNews = useCallback(
    async (forceRefresh = false) => {
      setLoading(true)
      setError(null)

      // Check cache first unless force refresh
      if (!forceRefresh) {
        const cachedNews = getCachedNews()
        if (cachedNews) {
          const articlesToShow = limit ? cachedNews.articles.slice(0, limit) : cachedNews.articles
          setArticles(articlesToShow)
          setLoading(false)
          return
        }
      }

      try {
        const url = "https://newsapi.org/v2/top-headlines?language=en&apiKey=44e5349306f74434a432c61af2315dd3"
        const response = await fetch(url)
        const data = await response.json()

        if (!response.ok || data.status !== "ok") {
          throw new Error(data.message ?? "News API error")
        }

        const fetchedArticles = data.articles || []

        // Cache the full response
        setCachedNews(fetchedArticles)

        // Set articles based on limit
        const articlesToShow = limit ? fetchedArticles.slice(0, limit) : fetchedArticles
        setArticles(articlesToShow)
      } catch (err: any) {
        console.error("News fetch error:", err)
        setError(err.message ?? "Failed to load news. Please try again later.")
      } finally {
        setLoading(false)
      }
    },
    [getCachedNews, setCachedNews, limit],
  )

  const refreshNews = useCallback(() => {
    // Clear cache and force refresh
    localStorage.removeItem(CACHE_KEY)
    fetchNews(true)
  }, [fetchNews])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return {
    articles,
    loading,
    error,
    refreshNews,
    fetchNews,
  }
}
