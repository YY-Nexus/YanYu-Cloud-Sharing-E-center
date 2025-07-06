"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calculator,
  PieChart,
  BarChart3,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
  Plus,
} from "lucide-react"

export default function CostPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("current")

  // 成本统计数据
  const costStats = [
    {
      title: "总人力成本",
      value: "¥2.4M",
      change: "+8.5%",
      changeType: "increase",
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "平均薪资",
      value: "¥12.8K",
      change: "+3.2%",
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "社保公积金",
      value: "¥456K",
      change: "+2.1%",
      changeType: "increase",
      icon: <Calculator className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "预算执行率",
      value: "78.5%",
      change: "-2.3%",
      changeType: "decrease",
      icon: <PieChart className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  // 部门成本数据
  const departmentCosts = [
    {
      name: "技术部",
      employees: 156,
      totalCost: 890000,
      avgSalary: 18500,
      budget: 950000,
      utilization: 93.7,
      trend: "up",
    },
    {
      name: "销售部",
      employees: 134,
      totalCost: 720000,
      avgSalary: 15200,
      budget: 800000,
      utilization: 90.0,
      trend: "up",
    },
    {
      name: "市场部",
      employees: 89,
      totalCost: 456000,
      avgSalary: 12800,
      budget: 500000,
      utilization: 91.2,
      trend: "stable",
    },
    {
      name: "人事部",
      employees: 45,
      totalCost: 234000,
      avgSalary: 11200,
      budget: 280000,
      utilization: 83.6,
      trend: "down",
    },
    {
      name: "财务部",
      employees: 32,
      totalCost: 198000,
      avgSalary: 13500,
      budget: 220000,
      utilization: 90.0,
      trend: "stable",
    },
  ]

  // 薪资结构数据
  const salaryStructure = [
    { level: "高级管理", count: 12, avgSalary: 35000, totalCost: 420000, percentage: 17.5 },
    { level: "中级管理", count: 45, avgSalary: 22000, totalCost: 990000, percentage: 41.3 },
    { level: "高级专员", count: 234, avgSalary: 16000, totalCost: 3744000, percentage: 156.0 },
    { level: "中级专员", count: 456, avgSalary: 12000, totalCost: 5472000, percentage: 228.0 },
    { level: "初级专员", count: 289, avgSalary: 8500, totalCost: 2456500, percentage: 102.4 },
  ]

  // 成本预警数据
  const costAlerts = [
    {
      type: "预算超支",
      department: "技术部",
      message: "本月成本已超出预算5.2%",
      severity: "high",
      amount: "¥49,400",
    },
    {
      type: "薪资异常",
      department: "销售部",
      message: "加班费用较上月增长15%",
      severity: "medium",
      amount: "¥12,800",
    },
    {
      type: "社保缴费",
      department: "全公司",
      message: "下月社保基数调整提醒",
      severity: "low",
      amount: "¥23,600",
    },
  ]

  // 成本趋势数据
  const costTrends = [
    { month: "1月", salary: 1800000, benefits: 360000, bonus: 240000 },
    { month: "2月", salary: 1850000, benefits: 370000, bonus: 185000 },
    { month: "3月", salary: 1920000, benefits: 384000, bonus: 288000 },
    { month: "4月", salary: 1980000, benefits: 396000, bonus: 198000 },
    { month: "5月", salary: 2040000, benefits: 408000, bonus: 306000 },
    { month: "6月", salary: 2100000, benefits: 420000, bonus: 210000 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">人力成本核算</h1>
            <p className="text-gray-600 mt-1">薪资社保、预算管控和成本分析</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">本月</SelectItem>
                <SelectItem value="quarter">本季度</SelectItem>
                <SelectItem value="year">本年度</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出报告
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              预算规划
            </Button>
          </div>
        </div>

        {/* 统计指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {costStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                  <Badge variant={stat.changeType === "increase" ? "default" : "destructive"} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">成本概览</TabsTrigger>
            <TabsTrigger value="departments">部门成本</TabsTrigger>
            <TabsTrigger value="structure">薪资结构</TabsTrigger>
            <TabsTrigger value="budget">预算管理</TabsTrigger>
          </TabsList>

          {/* 成本概览 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 成本构成 */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-600" />
                    成本构成分析
                  </CardTitle>
                  <CardDescription>各项人力成本占比和变化趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">基本薪资</h4>
                        <p className="text-sm text-gray-600">员工基础工资总额</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">¥1.68M</div>
                        <div className="text-sm text-gray-600">70%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">绩效奖����</h4>
                        <p className="text-sm text-gray-600">绩效考核奖励</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">¥360K</div>
                        <div className="text-sm text-gray-600">15%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">社保公积金</h4>
                        <p className="text-sm text-gray-600">社会保险和住房公积金</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">¥288K</div>
                        <div className="text-sm text-gray-600">12%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">其他福利</h4>
                        <p className="text-sm text-gray-600">培训、体检、团建等</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">¥72K</div>
                        <div className="text-sm text-gray-600">3%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 成本预警 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    成本预警
                  </CardTitle>
                  <CardDescription>需要关注的成本异常情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costAlerts.map((alert, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>{alert.type}</Badge>
                          <span className="text-sm font-medium text-gray-900">{alert.amount}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm">{alert.department}</h4>
                        <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 部门成本 */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>部门成本分析</CardTitle>
                    <CardDescription>各部门人力成本详情和预算执行情况</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    筛选部门
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentCosts.map((dept, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                              <p className="text-sm text-gray-600">{dept.employees} 名员工</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTrendIcon(dept.trend)}
                            <Badge variant="outline" className="text-xs">
                              {dept.utilization}% 执行率
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-600">总成本</div>
                            <div className="font-semibold text-gray-900">{formatCurrency(dept.totalCost)}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">平均薪资</div>
                            <div className="font-semibold text-gray-900">{formatCurrency(dept.avgSalary)}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">预算</div>
                            <div className="font-semibold text-gray-900">{formatCurrency(dept.budget)}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">剩余预算</div>
                            <div className="font-semibold text-gray-900">
                              {formatCurrency(dept.budget - dept.totalCost)}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">预算执行进度</span>
                            <span className="font-medium">{dept.utilization}%</span>
                          </div>
                          <Progress value={dept.utilization} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 薪资结构 */}
          <TabsContent value="structure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  薪资结构分析
                </CardTitle>
                <CardDescription>不同级别员工的薪资分布和成本占比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salaryStructure.map((level, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{level.level}</h3>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-gray-600">
                          <div>
                            <span className="text-gray-500">人数：</span>
                            <span className="font-medium">{level.count}人</span>
                          </div>
                          <div>
                            <span className="text-gray-500">平均薪资：</span>
                            <span className="font-medium">{formatCurrency(level.avgSalary)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">总成本：</span>
                            <span className="font-medium">{formatCurrency(level.totalCost)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-32">
                        <div className="flex justify-between text-sm mb-1">
                          <span>占比</span>
                          <span>{level.percentage}%</span>
                        </div>
                        <Progress value={level.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 预算管理 */}
          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    预算执行情况
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">年度预算</span>
                      <span className="font-semibold">¥28.8M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">已使用</span>
                      <span className="font-semibold">¥14.4M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">剩余预算</span>
                      <span className="font-semibold">¥14.4M</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">执行进度</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <Progress value={50} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    预算控制状态
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">正常部门</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        18个
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">预警部门</span>
                      <Badge variant="default" className="bg-yellow-100 text-yellow-800">
                        3个
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">超支部门</span>
                      <Badge variant="default" className="bg-red-100 text-red-800">
                        1个
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">控制率</span>
                      <span className="font-semibold">95.5%</span>
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
