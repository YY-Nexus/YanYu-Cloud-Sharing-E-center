import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SegmentationLoadingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题骨架 */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        {/* 统计指标骨架 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="loading-indicator border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 标签页骨架 */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-24 rounded-md" />
            ))}
          </div>

          {/* 客户分层卡片骨架 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="loading-indicator transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-5 w-5 rounded" />
                      <div className="space-y-1">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-12 rounded-full" />
                  </div>

                  <Skeleton className="h-4 w-full mb-4" />

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {Array.from({ length: 4 }).map((_, itemIndex) => (
                      <div key={itemIndex} className="space-y-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-3 w-16" />
                    <div className="flex flex-wrap gap-1">
                      {Array.from({ length: 3 }).map((_, tagIndex) => (
                        <Skeleton key={tagIndex} className="h-5 w-16 rounded-full" />
                      ))}
                    </div>
                  </div>

                  <Skeleton className="h-3 w-32 mb-4" />

                  <div className="flex gap-2">
                    <Skeleton className="h-8 flex-1 rounded-md" />
                    <Skeleton className="h-8 flex-1 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
