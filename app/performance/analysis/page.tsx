import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Download,
  Eye,
} from "lucide-react"

export default function AnalysisPage() {
  const performanceOverview = {
    totalEmployees: 1247,
    evaluatedEmployees: 1156,
    avgScore: 4.1,
    completionRate: 87.5,
    satisfactionRate: 89.2,
    improvementRate: 12.3,
  }

  const departmentComparison = [
    {
      department: "销售部",
      employees: 156,
      avgScore: 4.3,
      completionRate: 95,
      trend: "up",
      improvement: "+8%",
      ranking: 1,
    },
    {
      department: "技术部",
      employees: 134,
      avgScore: 4.2,
      completionRate: 92,
      trend: "up",
      improvement: "+5%",
      ranking: 2,
    },
    {
      department: "市场部",
      employees: 89,
      avgScore: 3.9,
      completionRate: 88,
      trend: "stable",
      improvement: "+2%",
      ranking: 3,
    },
    {
      department: "客服部",
      employees: 67,
      avgScore: 3.7,
      completionRate: 82,
      trend: "down",
      improvement: "-3%",
      ranking: 4,
    },
    {
      department: "人事部",
      employees: 45,
      avgScore: 4.0,
      completionRate: 90,
      trend: "up",
      improvement: "+6%",
      ranking: 5,
    },
  ]

  const performanceTrends = [
    { period: "Q1 2024", score: 3.8, completion: 82, satisfaction: 85 },
    { period: "Q2 2024", score: 3.9, completion: 85, satisfaction: 87 },
    { period: "Q3 2024", score: 4.0, completion: 87, satisfaction: 88 },
    { period: "Q4 2024", score: 4.1, completion: 88, satisfaction: 89 },
  ]

  const insights = [
    {
      type: "positive",
      title: "销售部绩效表现优异",
      description: "销售部连续3个季度保持最高绩效评分，团队协作和业绩达成均表现出色",
      impact: "高",
      recommendation: "将销售部的成功经验推广到其他部门",
    },
    {
      type: "warning",
      title: "客服部绩效有所下滑",
      description: "客服部本季度绩效评分较上季度下降0.2分，主要原因是客户满意度指标未达标",
      impact: "中",
      recommendation: "加强客服培训，优化服务流程，提升客户满意度",
    },
    {
      type: "opportunity",
      title: "跨部门协作有待加强",
      description: "数据显示跨部门协作项目的绩效评分普遍较低，影响整体效率",
      impact: "中",
      recommendation: "建立跨部门协作激励机制，设置联合KPI指标",
    },
    {
      type: "risk",
      title: "新员工绩效适应期较长",
      description: "新员工入职后6个月内绩效评分明显低于平均水平",
      impact: "中",
      recommendation: "完善新员工培训体系，建立导师制度",
    },
  ]

  const improvementActions = [
    {
      id: 1,
      title: "客服部服务质量提升计划",
      department: "客服部",
      status: "in-progress",
      priority: "high",
      startDate: "2024-11-01",
      endDate: "2024-12-31",
      progress: 65,
      owner: "陈经理",
      description: "通过培训和流程优化提升客服质量",
    },
    {
      id: 2,
      title: "跨部门协作机制建设",
      department: "全公司",
      status: "planning",
      priority: "medium",
      startDate: "2024-12-01",
      endDate: "2025-02-28",
      progress: 0,
      owner: "HR部门",
      description: "建立跨部门项目管理和激励机制",
    },
    {
      id: 3,
      title: "新员工导师制度实施",
      department: "人事部",
      status: "completed",
      priority: "medium",
      startDate: "2024-09-01",
      endDate: "2024-10-31",
      progress: 100,
      owner: "HR总监",
      description: "为新员工配备导师，加速适应过程",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "opportunity":
        return <Lightbulb className="h-5 w-5 text-blue-600" />
      case "risk":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已完成</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">进行中</Badge>
      case "planning":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">计划中</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">高</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">中</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">低</Badge>
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
            <h1 className="text-3xl font-bold tracking-tight">绩效数据分析</h1>
            <p className="text-muted-foreground">结果复盘、改进建议和数据洞察</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            导出分析报告
          </Button>
        </div>

        {/* 概览指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总员工数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceOverview.totalEmployees}</div>
              <p className="text-xs text-muted-foreground">已评估 {performanceOverview.evaluatedEmployees}人</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均评分</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceOverview.avgScore}</div>
              <p className="text-xs text-muted-foreground">/5.0 评分</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">完成率</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceOverview.completionRate}%</div>
              <p className="text-xs text-muted-foreground">目标达成</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">满意度</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceOverview.satisfactionRate}%</div>
              <p className="text-xs text-muted-foreground">员工满意</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">改进率</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceOverview.improvementRate}%</div>
              <p className="text-xs text-muted-foreground">较上期提升</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">评估率</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((performanceOverview.evaluatedEmployees / performanceOverview.totalEmployees) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">参与评估</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="comparison" className="space-y-6">
          <TabsList>
            <TabsTrigger value="comparison">部门对比</TabsTrigger>
            <TabsTrigger value="trends">趋势分析</TabsTrigger>
            <TabsTrigger value="insights">智能洞察</TabsTrigger>
            <TabsTrigger value="actions">改进行动</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>部门绩效对比</CardTitle>
                <CardDescription>各部门绩效表现和排名对比</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>排名</TableHead>
                      <TableHead>部门</TableHead>
                      <TableHead>员工数</TableHead>
                      <TableHead>平均评分</TableHead>
                      <TableHead>完成率</TableHead>
                      <TableHead>趋势</TableHead>
                      <TableHead>改进幅度</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentComparison.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell>
                          <Badge variant="outline">#{dept.ranking}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{dept.department}</TableCell>
                        <TableCell>{dept.employees}人</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{dept.avgScore}</span>
                            <span className="text-sm text-muted-foreground">/5.0</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={dept.completionRate} className="w-16 h-2" />
                            <span className="text-sm">{dept.completionRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(dept.trend)}
                            <span
                              className={`text-sm ${
                                dept.trend === "up"
                                  ? "text-green-600"
                                  : dept.trend === "down"
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {dept.trend === "up" ? "上升" : dept.trend === "down" ? "下降" : "稳定"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${
                              dept.improvement.startsWith("+") ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {dept.improvement}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    绩效趋势变化
                  </CardTitle>
                  <CardDescription>季度绩效指标变化趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceTrends.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{trend.period}</div>
                          <div className="text-sm text-gray-600">平均评分 {trend.score}/5.0</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">完成率 {trend.completion}%</div>
                          <div className="text-sm text-gray-600">满意度 {trend.satisfaction}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    关键指标趋势
                  </CardTitle>
                  <CardDescription>重要绩效指标的发展趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-900">整体绩效提升</span>
                      </div>
                      <div className="text-2xl font-bold text-green-900">+12.3%</div>
                      <p className="text-sm text-green-700">较去年同期显著提升</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-900">员工满意度</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">89.2%</div>
                      <p className="text-sm text-blue-700">连续4个季度保持增长</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-900">目标达成率</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-900">87.5%</div>
                      <p className="text-sm text-purple-700">超过年度目标85%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getInsightIcon(insight.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                          <Badge
                            className={
                              insight.impact === "高"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : insight.impact === "中"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {insight.impact}影响
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{insight.description}</p>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Lightbulb className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-900">改进建议</span>
                          </div>
                          <p className="text-sm text-blue-700">{insight.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>改进行动计划</CardTitle>
                <CardDescription>基于分析结果制定的改进措施和执行进度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvementActions.map((action) => (
                    <Card key={action.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{action.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                          </div>
                          <div className="flex gap-2">
                            {getStatusBadge(action.status)}
                            {getPriorityBadge(action.priority)}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">负责部门</p>
                            <p className="font-medium">{action.department}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">负责人</p>
                            <p className="font-medium">{action.owner}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">开始时间</p>
                            <p className="font-medium">{action.startDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">结束时间</p>
                            <p className="font-medium">{action.endDate}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>执行进度</span>
                            <span className="font-medium">{action.progress}%</span>
                          </div>
                          <Progress value={action.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
