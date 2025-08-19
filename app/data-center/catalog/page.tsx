import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Table, Search, Plus, Eye, Edit, Share, GitBranch, Tag, Calendar, User } from "lucide-react"

export default function DataCatalogPage() {
  const dataSets = [
    {
      id: 1,
      name: "用户行为数据集",
      description: "用户在平台上的行为轨迹和交互数据",
      owner: "数据团队",
      category: "用户数据",
      tables: 8,
      records: "2.3M",
      lastUpdated: "2小时前",
      quality: 92,
      tags: ["用户", "行为", "实时"],
    },
    {
      id: 2,
      name: "销售业绩数据",
      description: "销售团队的业绩数据和客户信息",
      owner: "销售部门",
      category: "业务数据",
      tables: 12,
      records: "856K",
      lastUpdated: "1天前",
      quality: 88,
      tags: ["销售", "业绩", "客户"],
    },
    {
      id: 3,
      name: "财务报表数据",
      description: "公司财务相关的收支和报表数据",
      owner: "财务部门",
      category: "财务数据",
      tables: 6,
      records: "234K",
      lastUpdated: "3天前",
      quality: 95,
      tags: ["财务", "报表", "月度"],
    },
    {
      id: 4,
      name: "产品使用统计",
      description: "产品功能使用情况和用户反馈数据",
      owner: "产品团队",
      category: "产品数据",
      tables: 10,
      records: "1.8M",
      lastUpdated: "6小时前",
      quality: 85,
      tags: ["产品", "使用", "反馈"],
    },
  ]

  const dataLineage = [
    {
      id: 1,
      source: "用户注册系统",
      target: "用户画像数据仓库",
      transformation: "数据清洗和标准化",
      frequency: "实时",
      status: "正常",
    },
    {
      id: 2,
      source: "订单管理系统",
      target: "销售分析数据集",
      transformation: "聚合和计算",
      frequency: "每小时",
      status: "正常",
    },
    {
      id: 3,
      source: "财务系统",
      target: "财务报表数据",
      transformation: "格式转换",
      frequency: "每日",
      status: "异常",
    },
  ]

  const metadataStats = [
    { name: "数据表", count: 156, icon: Table },
    { name: "数据集", count: 42, icon: Database },
    { name: "数据源", count: 18, icon: GitBranch },
    { name: "标签", count: 89, icon: Tag },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">数据资产目录</h1>
            <p className="text-muted-foreground">元数据管理、血缘关系追踪和数据资产盘点</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            注册数据集
          </Button>
        </div>

        {/* 统计概览 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metadataStats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
                <p className="text-xs text-muted-foreground">
                  较上月 <span className="text-green-600">+12%</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="catalog" className="space-y-6">
          <TabsList>
            <TabsTrigger value="catalog">数据目录</TabsTrigger>
            <TabsTrigger value="lineage">血缘关系</TabsTrigger>
            <TabsTrigger value="metadata">元数据</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            {/* 搜索和筛选 */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索数据集..." className="pl-10" />
              </div>
              <Button variant="outline">筛选</Button>
            </div>

            {/* 数据集列表 */}
            <div className="grid gap-6 md:grid-cols-2">
              {dataSets.map((dataset) => (
                <Card key={dataset.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{dataset.name}</CardTitle>
                      <Badge variant="outline">{dataset.category}</Badge>
                    </div>
                    <CardDescription>{dataset.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{dataset.owner}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{dataset.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Table className="h-4 w-4" />
                          <span>{dataset.tables} 表</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Database className="h-4 w-4" />
                          <span>{dataset.records} 记录</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">质量:</span>
                        <Badge variant={dataset.quality >= 90 ? "default" : "secondary"}>{dataset.quality}%</Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {dataset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lineage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>数据血缘关系</CardTitle>
                <CardDescription>数据流转和依赖关系追踪</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataLineage.map((lineage) => (
                    <div key={lineage.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <span className="font-medium">{lineage.source}</span>
                        </div>
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span className="font-medium">{lineage.target}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div>{lineage.transformation}</div>
                          <div className="text-muted-foreground">{lineage.frequency}</div>
                        </div>
                        <Badge variant={lineage.status === "正常" ? "default" : "destructive"}>{lineage.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metadata" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>元数据统计</CardTitle>
                  <CardDescription>数据资产的元数据概览</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">已注册数据源</span>
                      <span className="font-medium">18 个</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">活跃数据集</span>
                      <span className="font-medium">42 个</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">数据表总数</span>
                      <span className="font-medium">156 个</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">字段总数</span>
                      <span className="font-medium">2,341 个</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>标签管理</CardTitle>
                  <CardDescription>数据资产标签分类管理</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["用户", "销售", "财务", "产品", "行为", "实时", "批量", "敏感"].map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      添加标签
                    </Button>
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
