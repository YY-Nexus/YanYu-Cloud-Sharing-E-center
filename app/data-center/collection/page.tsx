import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Search,
  Filter,
  RefreshCw,
  Settings,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  BarChart3,
  TrendingUp,
  Clock,
  Server,
} from "lucide-react"

export default function DataCollectionPage() {
  const dataSources = [
    {
      id: 1,
      name: "客户关系管理系统",
      type: "CRM",
      status: "healthy",
      health: 98,
      throughput: "2.3K/h",
      lastSync: "2分钟前",
      records: "1.2M",
    },
    {
      id: 2,
      name: "电商交易平台",
      type: "E-commerce",
      status: "healthy",
      health: 95,
      throughput: "5.1K/h",
      lastSync: "1分钟前",
      records: "3.8M",
    },
    {
      id: 3,
      name: "用户行为分析",
      type: "Analytics",
      status: "warning",
      health: 78,
      throughput: "1.8K/h",
      lastSync: "15分钟前",
      records: "890K",
    },
    {
      id: 4,
      name: "财务管理系统",
      type: "Finance",
      status: "healthy",
      health: 92,
      throughput: "450/h",
      lastSync: "5分钟前",
      records: "156K",
    },
    {
      id: 5,
      name: "供应链管理",
      type: "SCM",
      status: "error",
      health: 45,
      throughput: "0/h",
      lastSync: "2小时前",
      records: "234K",
    },
    {
      id: 6,
      name: "人力资源系统",
      type: "HR",
      status: "healthy",
      health: 88,
      throughput: "120/h",
      lastSync: "10分钟前",
      records: "45K",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">正常</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">警告</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">异常</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">数据采集整合</h1>
            <p className="text-muted-foreground">多源数据接入、实时同步和质量监控管理</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button size="sm">
              <Settings className="h-4 w-4 mr-2" />
              配置
            </Button>
          </div>
        </div>

        {/* 概览指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">数据源总数</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">20个</span> 正常运行
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">实时吞吐量</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9.8K</div>
              <p className="text-xs text-muted-foreground">
                条/小时 <span className="text-green-600">+15%</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">数据质量</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.8%</div>
              <p className="text-xs text-muted-foreground">
                准确率 <span className="text-green-600">+2.1%</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">同步延迟</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2s</div>
              <p className="text-xs text-muted-foreground">
                平均延迟 <span className="text-green-600">-0.3s</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sources" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sources">数据源管理</TabsTrigger>
            <TabsTrigger value="pipeline">数据管道</TabsTrigger>
            <TabsTrigger value="quality">质量监控</TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            {/* 搜索和筛选 */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索数据源..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
            </div>

            {/* 数据源列表 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dataSources.map((source) => (
                <Card key={source.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-base">{source.name}</CardTitle>
                      </div>
                      {getStatusIcon(source.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{source.type}</Badge>
                      {getStatusBadge(source.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>健康度</span>
                        <span className="font-medium">{source.health}%</span>
                      </div>
                      <Progress value={source.health} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">吞吐量</p>
                        <p className="font-medium">{source.throughput}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">记录数</p>
                        <p className="font-medium">{source.records}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">最后同步: {source.lastSync}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        配置
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        监控
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>数据管道监控</CardTitle>
                <CardDescription>实时数据流转和处理状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 管道流程图 */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <Database className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium">数据摄取</p>
                      <p className="text-xs text-muted-foreground">9.8K/h</p>
                    </div>
                    <div className="flex-1 h-px bg-border mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <RefreshCw className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-sm font-medium">数据清洗</p>
                      <p className="text-xs text-muted-foreground">9.6K/h</p>
                    </div>
                    <div className="flex-1 h-px bg-border mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                        <Settings className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium">数据转换</p>
                      <p className="text-xs text-muted-foreground">9.5K/h</p>
                    </div>
                    <div className="flex-1 h-px bg-border mx-4"></div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                        <Server className="h-6 w-6 text-orange-600" />
                      </div>
                      <p className="text-sm font-medium">数据加载</p>
                      <p className="text-xs text-muted-foreground">9.4K/h</p>
                    </div>
                  </div>

                  {/* 处理统计 */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">成功处理</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">98.7%</div>
                        <p className="text-xs text-muted-foreground">今日处理成功率</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium">处理延迟</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-600">1.2s</div>
                        <p className="text-xs text-muted-foreground">平均处理延迟</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium">错误数量</span>
                        </div>
                        <div className="text-2xl font-bold text-red-600">23</div>
                        <p className="text-xs text-muted-foreground">今日错误记录</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>数据质量评估</CardTitle>
                  <CardDescription>多维度数据质量监控指标</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">完整性</span>
                      <span className="text-sm font-medium">98.5%</span>
                    </div>
                    <Progress value={98.5} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">准确性</span>
                      <span className="text-sm font-medium">96.8%</span>
                    </div>
                    <Progress value={96.8} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">一致性</span>
                      <span className="text-sm font-medium">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">时效性</span>
                      <span className="text-sm font-medium">99.1%</span>
                    </div>
                    <Progress value={99.1} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>质量趋势</CardTitle>
                  <CardDescription>过去7天的数据质量变化</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm">质量提升</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">+2.3%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">规则通过</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">156/162</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">待处理异常</span>
                      </div>
                      <span className="text-sm font-medium text-yellow-600">6个</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
