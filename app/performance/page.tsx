"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  TrendingUp,
  Award,
  Users,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Plus,
  Edit,
  Eye,
  ArrowRight,
  BarChart3,
  DollarSign,
  Star,
} from "lucide-react"

export default function PerformancePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // 核心指标数据
  const coreMetrics = [
    {
      title: "目标完成率",
      value: "87.5%",
      change: "+5.2%",
      changeType: "increase",
      icon: <Target className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "员工参与度",
      value: "92.3%",
      change: "+3.1%",
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "激励发放",
      value: "¥2.4M",
      change: "+15%",
      changeType: "increase",
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "绩效评级",
      value: "4.2/5",
      change: "+0.3",
      changeType: "increase",
      icon: <Star className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  // 模块导航数据
  const moduleCards = [
    {
      title: "目标拆解与对齐",
      description: "战略分解、部门/个人指标",
      href: "/performance/goal-alignment",
      icon: <Target className="h-6 w-6" />,
      status: "运行中",
      progress: 89,
      stats: "156个目标",
      color: "border-blue-200 hover:border-blue-300",
      bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      title: "考核流程管理",
      description: "周期设置、评分规则、进度跟踪",
      href: "/performance/evaluation",
      icon: <Calendar className="h-6 w-6" />,
      status: "活跃",
      progress: 76,
      stats: "4个考核周期",
      color: "border-green-200 hover:border-green-300",
      bgGradient: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      title: "激励策略配置",
      description: "奖金、晋升、荣誉等方案",
      href: "/performance/incentive",
      icon: <Award className="h-6 w-6" />,
      status: "进行中",
      progress: 82,
      stats: "12种激励方案",
      color: "border-purple-200 hover:border-purple-300",
      bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
    {
      title: "绩效数据分析",
      description: "结果复盘、改进建议",
      href: "/performance/analysis",
      icon: <BarChart3 className="h-6 w-6" />,
      status: "正常",
      progress: 94,
      stats: "24份分析报告",
      color: "border-amber-200 hover:border-amber-300",
      bgGradient: "bg-gradient-to-br from-amber-50 to-amber-100",
    },
  ]

  // 部门绩效概览
  const departmentPerformance = [
    {
      name: "销售部",
      manager: "张经理",
      employees: 45,
      targetCompletion: 95,
      avgRating: 4.3,
      status: "优秀",
      trend: "up",
    },
    {
      name: "技术部",
      manager: "李经理",
      employees: 38,
      targetCompletion: 88,
      avgRating: 4.1,
      status: "良好",
      trend: "up",
    },
    {
      name: "市场部",
      manager: "王经理",
      employees: 32,
      targetCompletion: 82,
      avgRating: 3.9,
      status: "良好",
      trend: "stable",
    },
    {
      name: "客服部",
      manager: "陈经理",
      employees: 28,
      targetCompletion: 78,
      avgRating: 3.7,
      status: "待改进",
      trend: "down",
    },
  ]

  // 最近绩效活动
  const recentActivities = [
    {
      type: "目标设定",
      description: "Q4季度目标已完成设定和分解",
      time: "2小时前",
      status: "success",
    },
    {
      type: "考核完成",
      description: "销售部月度考核已完成评分",
      time: "4小时前",
      status: "success",
    },
    {
      type: "激励发放",
      description: "优秀员工奖金已发放到账",
      time: "6小时前",
      status: "info",
    },
    {
      type: "绩效面谈",
      description: "技术部绩效面谈会议已安排",
      time: "1天前",
      status: "warning",
    },
    {
      type: "数据分析",
      description: "月度绩效分析报告已生成",
      time: "2天前",
      status: "info",
    },
  ]

  // 绩效趋势数据
  const performanceTrends = [
    { month: "1月", completion: 78, satisfaction: 82 },
    { month: "2月", completion: 82, satisfaction: 85 },
    { month: "3月", completion: 85, satisfaction: 87 },
    { month: "4月", completion: 88, satisfaction: 89 },
    { month: "5月", completion: 87, satisfaction: 91 },
    { month: "6月", completion: 90, satisfaction: 92 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">绩效激励</h1>
            <p className="text-gray-600 mt-1">目标考核体系与激励机制管理</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              系统设置
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              新建考核
            </Button>
          </div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreMetrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                    <div className={metric.color}>{metric.icon}</div>
                  </div>
                  <Badge variant={metric.changeType === "increase" ? "default" : "secondary"} className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                  <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容区域 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="modules">功能模块</TabsTrigger>
            <TabsTrigger value="departments">部门绩效</TabsTrigger>
            <TabsTrigger value="activities">活动日志</TabsTrigger>
          </TabsList>

          {/* 总览标签页 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 绩效趋势图 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    绩效趋势分析
                  </CardTitle>
                  <CardDescription>目标完成率和员工满意度变化趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceTrends.slice(-3).map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{trend.month}</div>
                          <div className="text-sm text-gray-600">目标完成率 {trend.completion}%</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">满意度 {trend.satisfaction}%</div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-xs text-green-600">持续上升</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        查看详细趋势
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 激励统计 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    激励发放统计
                  </CardTitle>
                  <CardDescription>本月激励措施执行情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium text-purple-900">绩效奖金</div>
                          <div className="text-sm text-purple-700">156人获得</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-purple-900">¥1.2M</div>
                        <div className="text-xs text-purple-600">+18%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-blue-900">荣誉表彰</div>
                          <div className="text-sm text-blue-700">28人获得</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-900">优秀员工</div>
                        <div className="text-xs text-blue-600">月度评选</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium text-green-900">晋升机会</div>
                          <div className="text-sm text-green-700">12人晋升</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-900">职业发展</div>
                        <div className="text-xs text-green-600">内部提升</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 功能模块标签页 */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {moduleCards.map((module, index) => (
                <Card key={index} className={`${module.color} transition-all duration-300 hover:shadow-lg`}>
                  <CardContent className="p-6">
                    <div className={`${module.bgGradient} rounded-xl p-4 mb-4`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-gray-700">{module.icon}</div>
                        <Badge variant="secondary" className="text-xs">
                          {module.status}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{module.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">完成度</span>
                          <span className="font-medium text-gray-900">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">{module.stats}</span>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        查看详情
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 部门绩效标签页 */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {departmentPerformance.map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-blue-600" />
                          {dept.name}
                        </CardTitle>
                        <CardDescription>
                          负责人：{dept.manager} · {dept.employees}名员工
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          设置目标
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">目标完成率</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={dept.targetCompletion} className="flex-1" />
                          <span className="text-sm font-medium">{dept.targetCompletion}%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">平均评分</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{dept.avgRating}</span>
                          <span className="text-sm text-gray-500">/5.0</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">绩效状态</h4>
                        <Badge
                          variant={
                            dept.status === "优秀" ? "default" : dept.status === "良好" ? "secondary" : "destructive"
                          }
                        >
                          {dept.status}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">趋势</h4>
                        <div className="flex items-center gap-1">
                          {dept.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                          {dept.trend === "down" && <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />}
                          {dept.trend === "stable" && <div className="h-4 w-4 bg-gray-400 rounded-full" />}
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 活动日志标签页 */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  最近活动
                </CardTitle>
                <CardDescription>绩效管理相关的最新操作和变更记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="mt-1">
                        {activity.status === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {activity.status === "info" && <AlertTriangle className="h-5 w-5 text-blue-600" />}
                        {activity.status === "warning" && <Clock className="h-5 w-5 text-amber-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{activity.type}</h4>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      </div>
                    </div>
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
