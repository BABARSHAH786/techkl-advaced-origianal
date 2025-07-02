"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from "lucide-react"
import { useBlogData, type BlogPost } from "@/hooks/use-blog-data"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { getPostById, loading } = useBlogData()
  const [post, setPost] = useState<BlogPost | null>(null)

  const postId = Number.parseInt(params.id as string)

  useEffect(() => {
    if (!loading && postId) {
      const foundPost = getPostById(postId)
      if (foundPost && foundPost.published) {
        setPost(foundPost)

        // Add JSON-LD schema for the specific blog post
        const script = document.createElement("script")
        script.type = "application/ld+json"
        script.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: foundPost.title,
          description: foundPost.excerpt,
          author: {
            "@type": "Person",
            name: foundPost.author,
          },
          datePublished: foundPost.date,
          publisher: {
            "@type": "Organization",
            name: "TechKL",
          },
          url: `https://techkl.de/blog/${foundPost.id}`,
        })
        document.head.appendChild(script)

        return () => {
          if (document.head.contains(script)) {
            document.head.removeChild(script)
          }
        }
      } else {
        // Post not found or not published
        router.push("/blog")
      }
    }
  }, [postId, getPostById, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <BookOpen className="h-8 w-8 animate-pulse mx-auto mb-4 text-blue-600" />
            <p className="text-lg text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/blog">
              <Button
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            {post.image && (
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            <CardContent className="p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-gray-200">
                <div className="flex items-center space-x-6 text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>

                <Button onClick={handleShare} variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
              <p className="text-blue-100 mb-6">Explore more articles and stay updated with the latest in technology</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/blog">
                  <Button
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    More Articles
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="text-white border-white/50 hover:bg-white/10 backdrop-blur-sm bg-transparent"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
