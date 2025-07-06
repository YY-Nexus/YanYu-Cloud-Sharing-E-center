import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Award,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Gift,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Calendar,
  BarChart3,
} from "lucide-react"

export default function IncentivePage() {
  const incentiveSchemes = [
    {
      id: 1,
      name: "销售业绩奖励",
      type: "现金奖励",
      category: "业绩激励",
      status: "active",
      budget: 500000,
      used: 320000,
      participants: 45,
      conditions: "月度销售额超过目标20%",
      amount: "基本工资的10-30%",
    },
    {
      id: 2,
      name: "优秀员工表彰",
      type: "荣誉奖励",
      category: "表彰激励",
      status: "active",
      budget: 50000,
      used: 28000,
      participants: 28,
      conditions: "季度绩效评分4.5分以上",
      amount: "荣誉证书+奖金5000元",
    },
    {
      id: 3,
      name: "技术创新奖",
      type: "项目奖励",
      category: "创新激励",
      status: "active",
      budget: 200000,
      used: 85000,
      participants: 12,
      conditions: "技术创新项目获得认可",
      amount: "项目奖金5000-20000元",
    },
    {
      id: 4,
      name: "团队协作奖",
      type: "团队奖励",
      category: "协作激励",
      status: "planning",
      budget: 100000,
      used: 0,
      participants: 0,
      conditions: "跨部门协作项目优秀",
      amount: "团队奖金平均分配",
    },
  ]

  const incentiveRecords = [
    {
      id: 1,
      employee: "张三",
      department: "销售部",
      scheme: "销售业绩奖励",
      type: "现金奖励",
      amount: 8000,
      status: "已发放",
      date: "2024-11-15",
      reason: "Q3销售额超目标35%",
    },
    {
      id: 2,
      employee: "李四",
      department: "技术部",
      scheme: "技术创新奖",
      type: "项目奖励",
      amount: 15000,
      status: "已发放",
      date: "2024-11-10",
      reason: "AI算法优化项目",
    },
    {
      id: 3,
      employee: "王五",
      department: "市场部",
      scheme: "优秀员工表彰",
      type: "荣誉奖励",
      amount: 5000,
      status: "待发放",
      date: "2024-11-20",
      reason: "月度绩效评分4.8",
    },
    {
      id: 4,
      employee: "赵六",
      department: "客服部",
      scheme: "客户满意度奖",
      type: "服务奖励",
      amount: 3000,
      status: "审核中",
      date: "2024-11-18",
      reason: "客户满意度98%",
    },
  ]

  const incentiveAnalytics = [
    {
      type: "现金奖励",
      count: 156,
      totalAmount: 1240000,
      avgAmount: 7949,
      satisfaction: 92,
      retention: 95,
    },
    {
      type: "荣誉奖励",
      count: 89,
      totalAmount: 445000,
      avgAmount: 5000,
      satisfaction: 88,
      retention: 91,
    },
    {
      type: "晋升机会",
      count: 23,
      totalAmount: 0,
      avgAmount: 0,
      satisfaction: 96,
      retention: 98,
    },
    {
      type: "福利奖励",
      count: 67,
      totalAmount: 234000,
      avgAmount: 3493,
      satisfaction: 85,
      retention: 89,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">活跃</Badge>
      case "planning":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">计划中</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">暂停</Badge>
      case "已发放":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已发放</Badge>
      case "待发放":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">待发放</Badge>
      case "审核中":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">审核中</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">激励策略配置</h1>
            <p className="text-muted-foreground">奖金、晋升、荣誉等多元化激励方案管理</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新建激励方案
          </Button>
        </div>

        {/* 概览指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">激励方案</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                个方案 <span className="text-green-600">8个</span> 活跃
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">激励发放</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥1.9M</div>
              <p className="text-xs text-muted-foreground">
                本年度 <span className="text-blue-600">+15%</span> 较去年
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">受益员工</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">335</div>
              <p className="text-xs text-muted-foreground">
                人次 <span className="text-purple-600">覆盖率</span> 89%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">满意度</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.3</div>
              <p className="text-xs text-muted-foreground">
                /5.0 <span className="text-green-600">+0.4</span> 较上期
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schemes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="schemes">激励方案</TabsTrigger>
            <TabsTrigger value="records">发放记录</TabsTrigger>
            <TabsTrigger value="analytics">效果分析</TabsTrigger>
            <TabsTrigger value="budget">预算管理</TabsTrigger>
          </TabsList>

          <TabsContent value="schemes" className="space-y-6">
            {/* 搜索和筛选 */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索激励方案..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
            </div>

            {/* 激励方案列表 */}
            <div className="grid gap-4 md:grid-cols-2">
              {incentiveSchemes.map((scheme) => (
                <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{scheme.name}</CardTitle>
                      {getStatusBadge(scheme.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{scheme.type}</Badge>
                      <Badge variant="outline">{scheme.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>预算使用</span>
                        <span className="font-medium">
                          {formatCurrency(scheme.used)} / {formatCurrency(scheme.budget)}
                        </span>
                      </div>
                      <Progress value={(scheme.used / scheme.budget) * 100} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">参与人数</p>
                        <p className="font-medium">{scheme.participants}人</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">激励金额</p>
                        <p className="font-medium">{scheme.amount}</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">激励条件</p>
                      <p className="text-gray-700">{scheme.conditions}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>激励发放记录</CardTitle>
                <CardDescription>员工激励发放历史和状态跟踪</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>员工姓名</TableHead>
                      <TableHead>部门</TableHead>
                      <TableHead>激励方案</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>发放日期</TableHead>
                      <TableHead>激励原因</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incentiveRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.employee}</TableCell>
                        <TableCell>{record.department}</TableCell>
                        <TableCell>{record.scheme}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.type}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(record.amount)}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{record.date}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{record.reason}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    激励效果分析
                  </CardTitle>
                  <CardDescription>不同激励类型的效果对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incentiveAnalytics.map((analytics, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{analytics.type}</h4>
                          <Badge variant="outline">{analytics.count}人次</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">总金额</p>
                            <p className="font-medium">{formatCurrency(analytics.totalAmount)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">平均金额</p>
                            <p className="font-medium">{formatCurrency(analytics.avgAmount)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">满意度</p>
                            <p className="font-medium">{analytics.satisfaction}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">留存率</p>
                            <p className="font-medium">{analytics.retention}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    激励趋势
                  </CardTitle>
                  <CardDescription>激励发放趋势和ROI分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-900">激励ROI</span>
                      </div>
                      <div className="text-2xl font-bold text-green-900">3.2:1</div>
                      <p className="text-sm text-green-700">每投入1元激励产生3.2元价值</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">员工留存</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">94%</div>
                      <p className="text-sm text-blue-700">获得激励员工的留存率</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-900">绩效提升</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-900">+18%</div>
                      <p className="text-sm text-purple-700">激励后平均绩效提升</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    预算概览
                  </CardTitle>
                  <CardDescription>年度激励预算分配和使用情况</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">年度预算</span>
                      <span className="font-medium">¥3,000,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">已使用</span>
                      <span className="font-medium">¥1,920,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">剩余预算</span>
                      <span className="font-medium">¥1,080,000</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>使用进度</span>
                        <span>64%</span>
                      </div>
                      <Progress value={64} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-purple-600" />
                    预算分配
                  </CardTitle>
                  <CardDescription>各类激励预算分配比例</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">现金奖励</span>
                        <span className="font-medium">60% (¥1.8M)</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">项目奖励</span>
                        <span className="font-medium">25% (¥750K)</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">荣誉奖励</span>
                        <span className="font-medium">10% (¥300K)</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">福利奖励</span>
                        <span className="font-medium">5% (¥150K)</span>
                      </div>
                      <Progress value={5} className="h-2" />
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
