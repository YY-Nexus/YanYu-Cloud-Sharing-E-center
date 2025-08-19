import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Search,
  Plus,
  Eye,
  Edit,
  Share,
  Copy,
  PieChart,
  LineChart,
  TrendingUp,
  Users,
  Star,
} from "lucide-react"
import Image from "next/image"

export default function DataVisualizationPage() {
  const dashboards = [
    {
      id: 1,
      name: "销售业绩看板",
      description: "实时销售数据和业绩分析",
      creator: "张经理",
      lastUpdated: "2小时前",
      views: 1234,
      charts: 8,
      status: "active",
      thumbnail: "/sales-dashboard.png",
    },
    {
      id: 2,
      name: "客户分析报告",
      description: "客户行为和满意度分析",
      creator: "李分析师",
      lastUpdated: "1天前",
      views: 856,
      charts: 6,
      status: "active",
      thumbnail: "/customer-analytics-dashboard.png",
    },
    {
      id: 3,
      name: "运营监控中心",
      description: "系统运营状态实时监控",
      creator: "王工程师",
      lastUpdated: "30分钟前",
      views: 2341,
      charts: 12,
      status: "active",
      thumbnail: "/operations-dashboard.png",
    },
    {
      id: 4,
      name: "财务报表汇总",
      description: "月度和季度财务数据分析",
      creator: "陈会计",
      lastUpdated: "3天前",
      views: 567,
      charts: 5,
      status: "draft",
      thumbnail: "/financial-reports.png",
    },
    {
      id: 5,
      name: "市场营销效果",
      description: "广告投放和转化率分析",
      creator: "赵市场",
      lastUpdated: "1小时前",
      views: 789,
      charts: 9,
      status: "active",
      thumbnail: "/marketing-analytics.png",
    },
    {
      id: 6,
      name: "产品使用统计",
      description: "用户行为和产品功能使用分析",
      creator: "孙产品",
      lastUpdated: "6小时前",
      views: 1123,
      charts: 7,
      status: "active",
      thumbnail: "/product-usage-illustration.png",
    },
  ]

  const chartTypes = [
    { name: "柱状图", count: 45, icon: BarChart3, color: "text-blue-600" },
    { name: "折线图", count: 38, icon: LineChart, color: "text-green-600" },
    { name: "饼图", count: 29, icon: PieChart, color: "text-purple-600" },
    { name: "趋势图", count: 34, icon: TrendingUp, color: "text-orange-600" },
  ]

  const templates = [
    {
      id: 1,
      name: "销售模板",
      description: "销售业绩和趋势分析模板",
      category: "销售",
      thumbnail: "/sales-template.png",
      usage: 156,
    },
    {
      id: 2,
      name: "客户模板",
      description: "客户分析和行为洞察模板",
      category: "客户",
      thumbnail: "/placeholder-27zt7.png",
      usage: 89,
    },
    {
      id: 3,
      name: "运营模板",
      description: "运营指标和效率分析模板",
      category: "运营",
      thumbnail: "/operations-template.png",
      usage: 234,
    },
    {
      id: 4,
      name: "电商模板",
      description: "电商数据和转化分析模板",
      category: "电商",
      thumbnail: "/ecommerce-template-showcase.png",
      usage: 178,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">可视化分析</h1>
            <p className="text-muted-foreground">智能图表生成和交互式数据探索平台</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            创建看板
          </Button>
        </div>

        {/* 概览指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃看板</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> 较上月
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">图表总数</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">12</span> 本周新增
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">日均访问</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3K</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+18%</span> 较上周
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">模板使用</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">657</div>
              <p className="text-xs text-muted-foreground">次模板应用</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboards" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboards">看板管理</TabsTrigger>
            <TabsTrigger value="charts">图表库</TabsTrigger>
            <TabsTrigger value="templates">模板中心</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboards" className="space-y-6">
            {/* 搜索和筛选 */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索看板..." className="pl-10" />
              </div>
              <Button variant="outline">筛选</Button>
            </div>

            {/* 看板列表 */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dashboards.map((dashboard) => (
                <Card key={dashboard.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={dashboard.thumbnail || "/placeholder.svg"}
                      alt={dashboard.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        className={
                          dashboard.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {dashboard.status === "active" ? "活跃" : "草稿"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                    <CardDescription>{dashboard.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>创建者: {dashboard.creator}</span>
                      <span>{dashboard.lastUpdated}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{dashboard.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4" />
                          <span>{dashboard.charts}个图表</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        查看
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>图表类型统计</CardTitle>
                  <CardDescription>按类型分类的图表使用情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chartTypes.map((type) => (
                      <div key={type.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <type.icon className={`h-5 w-5 ${type.color}`} />
                          <span className="font-medium">{type.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{type.count}个</span>
                          <Button size="sm" variant="outline">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>最近创建</CardTitle>
                  <CardDescription>最新创建的图表</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">月度销售对比</p>
                          <p className="text-sm text-muted-foreground">2小时前</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <LineChart className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">用户增长趋势</p>
                          <p className="text-sm text-muted-foreground">5小时前</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <PieChart className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">渠道分布分析</p>
                          <p className="text-sm text-muted-foreground">1天前</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={template.thumbnail || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>使用次数: {template.usage}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        使用模板
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
