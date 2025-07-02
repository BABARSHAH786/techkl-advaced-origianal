// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Calendar, User, ArrowRight, BookOpen, Search, Filter } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { useBlogData } from "@/hooks/use-blog-data"

// export default function BlogPage() {
//   const { posts, loading, getPublishedPosts } = useBlogData()
//   const [selectedTag, setSelectedTag] = useState<string | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")

//   const publishedPosts = getPublishedPosts()

//   // Get all unique tags from published posts
//   const allTags = Array.from(new Set(publishedPosts.flatMap((post) => post.tags)))

//   // Filter posts by selected tag and search query
//   const filteredPosts = publishedPosts.filter((post) => {
//     const matchesTag = selectedTag === null || post.tags.includes(selectedTag)
//     const matchesSearch =
//       searchQuery === "" ||
//       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

//     return matchesTag && matchesSearch
//   })

//   useEffect(() => {
//     // Add JSON-LD schema for blog
//     const script = document.createElement("script")
//     script.type = "application/ld+json"
//     script.textContent = JSON.stringify({
//       "@context": "https://schema.org",
//       "@type": "Blog",
//       name: "TechKL Blog",
//       description: "Technology insights, tutorials, and learning resources",
//       url: "https://techkl.de/blog",
//       publisher: {
//         "@type": "Organization",
//         name: "TechKL",
//       },
//     })
//     document.head.appendChild(script)

//     return () => {
//       if (document.head.contains(script)) {
//         document.head.removeChild(script)
//       }
//     }
//   }, [])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center">
//             <BookOpen className="h-8 w-8 animate-pulse mx-auto mb-4 text-blue-600" />
//             <p className="text-lg text-gray-600">Loading blog posts...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "2s" }}
//         />
//       </div>

//       <div className="relative z-10 py-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
//               <BookOpen className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
//               TechKL Blog
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Discover the latest insights, tutorials, and best practices in technology and software development
//             </p>
//           </div>

//           {/* Search and Filter */}
//           <div className="mb-8 space-y-4">
//             {/* Search Bar */}
//             <div className="max-w-md mx-auto relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 type="text"
//                 placeholder="Search articles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg"
//               />
//             </div>

//             {/* Tag Filter */}
//             <div className="flex flex-wrap gap-2 justify-center">
//               <Button
//                 variant={selectedTag === null ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setSelectedTag(null)}
//                 className={
//                   selectedTag === null
//                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                     : "bg-white/80 backdrop-blur-sm"
//                 }
//               >
//                 <Filter className="w-3 h-3 mr-1" />
//                 All Posts ({publishedPosts.length})
//               </Button>
//               {allTags.map((tag) => (
//                 <Button
//                   key={tag}
//                   variant={selectedTag === tag ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedTag(tag)}
//                   className={
//                     selectedTag === tag
//                       ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//                       : "bg-white/80 backdrop-blur-sm"
//                   }
//                 >
//                   {tag} ({publishedPosts.filter((post) => post.tags.includes(tag)).length})
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Blog Posts Grid */}
//           {filteredPosts.length > 0 ? (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredPosts.map((post, index) => (
//                 <Card
//                   key={post.id}
//                   className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg group"
//                   style={{
//                     animationDelay: `${index * 100}ms`,
//                     animation: "fadeInUp 0.6s ease-out forwards",
//                   }}
//                 >
//                   <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden">
//                     <img
//                       src={post.image || "/placeholder.svg?height=300&width=600"}
//                       alt={post.title}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                       loading="lazy"
//                     />
//                   </div>

//                   <CardHeader>
//                     <div className="flex flex-wrap gap-1 mb-2">
//                       {post.tags.map((tag) => (
//                         <Badge
//                           key={tag}
//                           variant="secondary"
//                           className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 cursor-pointer transition-colors duration-300"
//                           onClick={() => setSelectedTag(tag)}
//                         >
//                           {tag}
//                         </Badge>
//                       ))}
//                     </div>

//                     <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
//                       <Link href={`/blog/${post.id}`}>{post.title}</Link>
//                     </CardTitle>

//                     <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
//                   </CardHeader>

//                   <CardContent>
//                     <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                       <div className="flex items-center space-x-4">
//                         <div className="flex items-center space-x-1">
//                           <User className="h-4 w-4" />
//                           <span>{post.author}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                           <Calendar className="h-4 w-4" />
//                           <span>{new Date(post.date).toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                       {post.readTime && <span>{post.readTime}</span>}
//                     </div>

//                     <Link href={`/blog/${post.id}`}>
//                       <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
//                         Read More
//                         <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//                       </Button>
//                     </Link>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
//               <p className="text-gray-600 mb-4">
//                 {searchQuery || selectedTag
//                   ? "Try adjusting your search or filter criteria."
//                   : "No blog posts have been published yet."}
//               </p>
//               {(searchQuery || selectedTag) && (
//                 <Button
//                   onClick={() => {
//                     setSearchQuery("")
//                     setSelectedTag(null)
//                   }}
//                   variant="outline"
//                   className="bg-white/80 backdrop-blur-sm"
//                 >
//                   Clear Filters
//                 </Button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   )
// }




// new remove dynamic routes
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  Search,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBlogData } from "@/hooks/use-blog-data";

export default function BlogPage() {
  const { posts, loading, getPublishedPosts } = useBlogData();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const publishedPosts = getPublishedPosts();

  const allTags = Array.from(
    new Set(publishedPosts.flatMap((post) => post.tags))
  );

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTag && matchesSearch;
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "TechKL Blog",
      description: "Technology insights, tutorials, and learning resources",
      url: "https://techkl.de/blog",
      publisher: {
        "@type": "Organization",
        name: "TechKL",
      },
    });
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <BookOpen className="h-8 w-8 animate-pulse mx-auto mb-4 text-blue-600" />
            <p className="text-lg text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              TechKL Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest insights, tutorials, and best practices in technology and software development
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className={
                  selectedTag === null
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/80 backdrop-blur-sm"
                }
              >
                <Filter className="w-3 h-3 mr-1" />
                All Posts ({publishedPosts.length})
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className={
                    selectedTag === tag
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white/80 backdrop-blur-sm"
                  }
                >
                  {tag} ({publishedPosts.filter((post) => post.tags.includes(tag)).length})
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg group"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg?height=300&width=600"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <CardHeader>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 hover:from-blue-100 hover:to-purple-100 cursor-pointer transition-colors duration-300"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </CardTitle>

                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {post.readTime && <span>{post.readTime}</span>}
                    </div>
                    {/* Removed dynamic blog link */}
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg cursor-default">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || selectedTag
                  ? "Try adjusting your search or filter criteria."
                  : "No blog posts have been published yet."}
              </p>
              {(searchQuery || selectedTag) && (
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
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
    </div>
  );
}
