// neechay code coomment hai
// app/articles/page.jsx (or any file)

import ArticleGrid from "@/components/ArticlesGrid";

export default function ArticlesPage() {
  return (
    <main>
      <ArticleGrid />
    </main>
  );
}


// "use client"

// import { useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { RefreshCw, Newspaper, TrendingUp, Clock } from "lucide-react"
// import { useCachedNews } from "@/hooks/use-cached-news"
// import NewsGrid from "@/components/news-grid"
// import NewsSkeleton from "@/components/news-skeleton"

// export default function NewsPage() {
//   const { articles, loading, error, refreshNews } = useCachedNews()

//   useEffect(() => {
//     // Add JSON-LD schema for news
//     const script = document.createElement("script")
//     script.type = "application/ld+json"
//     script.textContent = JSON.stringify({
//       "@context": "https://schema.org",
//       "@type": "NewsMediaOrganization",
//       name: "TechKL News",
//       description: "Latest technology news and updates",
//       url: "https://techkl.de/news",
//     })
//     document.head.appendChild(script)

//     return () => {
//       if (document.head.contains(script)) {
//         document.head.removeChild(script)
//       }
//     }
//   }, [])

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-0">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Newspaper className="w-8 h-8 text-red-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
//             <p className="text-lg text-red-600 mb-6">{error}</p>
//             <Button
//               onClick={refreshNews}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <RefreshCw className="mr-2 h-4 w-4" />
//               Try Again
//             </Button>
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
//         <div
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-spin"
//           style={{ animationDuration: "20s" }}
//         />
//       </div>

//       <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
//               <Newspaper className="w-8 h-8 text-white" />
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
//               Latest Tech News
//             </h1>

//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
//               Stay updated with the latest technology news and developments from around the world
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Button
//                 onClick={refreshNews}
//                 disabled={loading}
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//               >
//                 <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
//                 {loading ? "Refreshing..." : "Refresh News"}
//               </Button>

//               <div className="flex items-center text-sm text-gray-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
//                 <Clock className="w-4 h-4 mr-2" />
//                 <span>Updated every hour</span>
//               </div>
//             </div>
//           </div>

//           {/* News Content */}
//           {loading ? (
//             <NewsSkeleton count={12} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" />
//           ) : (
//             <>
//               <NewsGrid
//                 articles={articles}
//                 showAll={true}
//                 className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//               />

//               {articles.length === 0 && (
//                 <div className="text-center py-16">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <TrendingUp className="w-8 h-8 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">No news available</h3>
//                   <p className="text-gray-600">Check back later for the latest updates.</p>
//                 </div>
//               )}
//             </>
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



