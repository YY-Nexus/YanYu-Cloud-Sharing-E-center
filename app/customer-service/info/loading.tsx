import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomerInfoLoadingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题骨架 */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>

        {/* 概览指标骨架 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="loading-indicator">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-3 w-16" />
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

          {/* 搜索和筛选骨架 */}
          <div className="flex gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-20" />
          </div>

          {/* 客户列表表格骨架 */}
          <Card className="loading-indicator">
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 表头骨架 */}
                <div className="grid grid-cols-8 gap-4 pb-2 border-b">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="h-4 w-16" />
                  ))}
                </div>

                {/* 表格行骨架 */}
                {Array.from({ length: 4 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-8 gap-4 py-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-5 w-12 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-3 w-20" />
                    <div className="flex flex-wrap gap-1">
                      <Skeleton className="h-4 w-12 rounded-full" />
                      <Skeleton className="h-4 w-8 rounded-full" />
                    </div>
                    <div className="flex gap-1">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
