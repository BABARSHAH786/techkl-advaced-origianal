import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface NewsSkeletonProps {
  count?: number
  className?: string
}

export default function NewsSkeleton({ count = 6, className = "" }: NewsSkeletonProps) {
  return (
    <div className={`grid gap-6 sm:gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="overflow-hidden animate-pulse"
          style={{
            animationDelay: `${index * 100}ms`,
            animation: "fadeInUp 0.6s ease-out forwards",
          }}
        >
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg" />

          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-6 w-full bg-gray-200 rounded" />
              <div className="h-6 w-3/4 bg-gray-200 rounded" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-5/6 bg-gray-100 rounded" />
              <div className="h-4 w-2/3 bg-gray-100 rounded" />
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="h-4 w-32 bg-gray-100 rounded mb-4" />
            <div className="h-10 w-full bg-gray-200 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
