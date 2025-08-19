import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, CheckCircle, Settings, BarChart3 } from "lucide-react"

export default function DataQualityPage() {
  const qualityMetrics = [
    {
      name: "数据完整性",
      score: 92,
      status: "excellent",
      trend: "+2.3%",
      issues: 12,
    },
    {
      name: "数据准确性",
      score: 88,
      status: "good",
      trend: "+1.8%",
      issues: 8,
    },
    {
      name: "数据一致性",
      score: 85,
      status: "good",
      trend: "-0.5%",
      issues: 15,
    },
    {
      name: "数据时效性",
      score: 78,
      status: "warning",
      trend: "-2.1%",
      issues: 23,
    },
  ]

  const dataIssues = [
    {
      id: 1,
      type: "缺失值",
      table: "用户信息表",
      field: "手机号码",
      severity: "high",
      count: 156,
      status: "处理中",
    },
    {
      id: 2,
      type: "格式错误",
      table: "订单表",
      field: "订单日期",
      severity: "medium",
      count: 89,
      status: "待处理",
    },
    {
      id: 3,
      type: "重复数据",
      table: "客户表",
      field: "客户ID",
      severity: "high",
      count: 45,
      status: "已修复",
    },
    {
      id: 4,
      type: "异常值",
      table: "销售表",
      field: "销售金额",
      severity: "low",
      count: 23,
      status: "待处理",
    },
  ]

  const cleaningRules = [
    {
      id: 1,
      name: "手机号格式验证",
      description: "验证手机号码格式是否正确",
      status: "active",
      appliedCount: 1234,
    },
    {
      id: 2,
      name: "邮箱格式检查",
      description: "检查邮箱地址格式有效性",
      status: "active",
      appliedCount: 856,
    },
    {
      id: 3,
      name: "重复数据清理",
      description: "自动识别和清理重复记录",
      status: "draft",
      appliedCount: 0,
    },
    {
      id: 4,
      name: "异常值检测",
      description: "基于统计方法检测数据异常值",
      status: "active",
      appliedCount: 567,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">数据质量管理</h1>
            <p className="text-muted-foreground">数据质量监控、异常检测和清洗规则管理</p>
          </div>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            质量配置
          </Button>
        </div>

        {/* 质量概览 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {qualityMetrics.map((metric) => (
            <Card key={metric.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                {metric.status === "excellent" && <CheckCircle className="h-4 w-4 text-green-600" />}
                {metric.status === "good" && <Shield className="h-4 w-4 text-blue-600" />}
                {metric.status === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.score}%</div>
                <div className="flex items-center justify-between mt-2">
                  <Progress value={metric.score} className="flex-1 mr-2" />
                  <span className={`text-xs ${metric.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {metric.trend}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{metric.issues} 个问题待处理</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="issues" className="space-y-6">
          <TabsList>
            <TabsTrigger value="issues">质量问题</TabsTrigger>
            <TabsTrigger value="rules">清洗规则</TabsTrigger>
            <TabsTrigger value="reports">质量报告</TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>数据质量问题</CardTitle>
                <CardDescription>当前检测到的数据质量问题列表</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataIssues.map((issue) => (
                    <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            issue.severity === "high"
                              ? "bg-red-500"
                              : issue.severity === "medium"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{issue.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {issue.table} - {issue.field}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{issue.count} 条记录</div>
                          <Badge
                            variant={
                              issue.status === "已修复"
                                ? "default"
                                : issue.status === "处理中"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {issue.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          处理
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">数据清洗规则</h3>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                新建规则
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {cleaningRules.map((rule) => (
                <Card key={rule.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{rule.name}</CardTitle>
                      <Badge variant={rule.status === "active" ? "default" : "outline"}>
                        {rule.status === "active" ? "启用" : "草稿"}
                      </Badge>
                    </div>
                    <CardDescription>{rule.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">应用次数: {rule.appliedCount}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          编辑
                        </Button>
                        <Button size="sm" variant="outline">
                          {rule.status === "active" ? "禁用" : "启用"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>质量趋势分析</CardTitle>
                  <CardDescription>过去30天的数据质量变化趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>质量趋势图表</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>问题分布统计</CardTitle>
                  <CardDescription>按问题类型统计的分布情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">缺失值</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20" />
                        <span className="text-sm text-muted-foreground">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">格式错误</span>
                      <div className="flex items-center gap-2">
                        <Progress value={30} className="w-20" />
                        <span className="text-sm text-muted-foreground">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">重复数据</span>
                      <div className="flex items-center gap-2">
                        <Progress value={15} className="w-20" />
                        <span className="text-sm text-muted-foreground">15%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">异常值</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-20" />
                        <span className="text-sm text-muted-foreground">10%</span>
                      </div>
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
