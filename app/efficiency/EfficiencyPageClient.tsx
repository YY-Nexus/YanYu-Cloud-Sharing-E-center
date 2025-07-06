"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, TrendingUp, Clock, Target, BarChart3, CheckCircle, AlertTriangle } from "lucide-react"

export default function EfficiencyPageClient() {
  const efficiencyMetrics = [
    { title: "整体效率提升", value: "23%", change: "+5%", icon: TrendingUp, color: "text-green-600" },
    { title: "流程优化项目", value: "18", change: "+3", icon: Zap, color: "text-blue-600" },
    { title: "平均处理时间", value: "2.4h", change: "-0.6h", icon: Clock, color: "text-purple-600" },
    { title: "目标达成率", value: "89%", change: "+7%", icon: Target, color: "text-amber-600" },
  ]

  const optimizationProjects = [
    {
      id: 1,
      name: "自动化报告生成",
      description: "将手动报告生成流程自动化，减少人工操作",
      status: "进行中",
      progress: 75,
      impact: "高",
      timeReduction: "80%",
      department: "财务部",
      startDate: "2024-01-15",
    },
    {
      id: 2,
      name: "客户服务流程优化",
      description: "优化客户服务响应流程，提升客户满意度",
      status: "已完成",
      progress: 100,
      impact: "中",
      timeReduction: "45%",
      department: "客服部",
      startDate: "2023-12-01",
    },
    {
      id: 3,
      name: "库存管理系统升级",
      description: "升级库存管理系统，实现智能补货",
      status: "计划中",
      progress: 25,
      impact: "高",
      timeReduction: "60%",
      department: "运营部",
      startDate: "2024-02-01",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已完成":
        return "bg-green-100 text-green-800"
      case "进行中":
        return "bg-blue-100 text-blue-800"
      case "计划中":
        return "bg-yellow-100 text-yellow-800"
      case "暂停":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "高":
        return "bg-red-100 text-red-800"
      case "中":
        return "bg-orange-100 text-orange-800"
      case "低":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">效率提升</h1>
            <p className="text-gray-600 mt-2">监控和优化业务流程效率</p>
          </div>
          <Button className="btn-primary">
            <Zap className="w-4 h-4 mr-2" />
            新建优化项目
          </Button>
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {efficiencyMetrics.map((metric, index) => (
            <Card key={index} className="card-gradient-blue hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                    <p className="text-sm text-green-600 mt-1">{metric.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-blue-100 ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容 */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">优化项目</TabsTrigger>
            <TabsTrigger value="analytics">效率分析</TabsTrigger>
            <TabsTrigger value="recommendations">改进建议</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {optimizationProjects.map((project) => (
                <Card key={project.id} className="card-gradient-emerald hover-lift">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900">{project.name}</CardTitle>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        <Badge className={getImpactColor(project.impact)}>影响: {project.impact}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">项目进度</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="progress-emerald" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">时间节省:</span>
                        <span className="font-medium text-green-600 ml-2">{project.timeReduction}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">负责部门:</span>
                        <span className="font-medium text-gray-900 ml-2">{project.department}</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="text-gray-500">开始时间:</span>
                      <span className="font-medium text-gray-900 ml-2">{project.startDate}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient-purple">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                    部门效率对比
                  </CardTitle>
                  <CardDescription>各部门效率提升情况</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { dept: "财务部", efficiency: 85, improvement: "+12%" },
                    { dept: "客服部", efficiency: 78, improvement: "+8%" },
                    { dept: "运营部", efficiency: 92, improvement: "+15%" },
                    { dept: "技术部", efficiency: 88, improvement: "+10%" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{item.dept}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{item.efficiency}%</span>
                          <span className="text-sm text-green-600">{item.improvement}</span>
                        </div>
                      </div>
                      <Progress value={item.efficiency} className="progress-purple" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-gradient-amber">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-amber-600" />
                    时间节省统计
                  </CardTitle>
                  <CardDescription>各流程时间节省情况</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { process: "报告生成", original: "4h", current: "0.8h", saved: "80%" },
                    { process: "客户响应", original: "2h", current: "1.1h", saved: "45%" },
                    { process: "库存盘点", original: "8h", current: "3.2h", saved: "60%" },
                    { process: "审批流程", original: "3h", current: "1.5h", saved: "50%" },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{item.process}</span>
                        <Badge className="bg-green-100 text-green-800">节省 {item.saved}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.original} → {item.current}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card className="card-gradient-blue">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                    优化建议
                  </CardTitle>
                  <CardDescription>基于数据分析的流程优化建议</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "自动化数据录入",
                      description: "建议在订单处理流程中引入自动化数据录入，预计可节省60%的时间",
                      priority: "高",
                      impact: "高",
                      effort: "中",
                    },
                    {
                      title: "优化审批流程",
                      description: "简化多层审批流程，建立智能审批规则，提升决策效率",
                      priority: "中",
                      impact: "中",
                      effort: "低",
                    },
                    {
                      title: "集成第三方工具",
                      description: "集成更多第三方工具，减少系统间的手动数据传输",
                      priority: "中",
                      impact: "高",
                      effort: "高",
                    },
                  ].map((recommendation, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-blue-200">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{recommendation.title}</h4>
                        <div className="flex space-x-2">
                          <Badge
                            className={
                              recommendation.priority === "高"
                                ? "bg-red-100 text-red-800"
                                : recommendation.priority === "中"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            优先级: {recommendation.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{recommendation.description}</p>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-gray-500">
                          影响: <span className="font-medium">{recommendation.impact}</span>
                        </span>
                        <span className="text-gray-500">
                          工作量: <span className="font-medium">{recommendation.effort}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-gradient-pink">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-pink-600" />
                    注意事项
                  </CardTitle>
                  <CardDescription>实施优化时需要注意的关键点</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "确保员工培训到位，避免因系统变更导致的效率下降",
                    "建立完善的备份和回滚机制，确保业务连续性",
                    "定期评估优化效果，及时调整优化策略",
                    "关注员工反馈，确保优化措施的实用性和可操作性",
                  ].map((note, index) => (
                    <div key={index} className="flex items-start p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <AlertTriangle className="w-4 h-4 text-pink-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-pink-800 text-sm">{note}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
