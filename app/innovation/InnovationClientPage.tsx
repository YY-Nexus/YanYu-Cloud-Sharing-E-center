"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Rocket, TrendingUp, Users, Award, Clock, Target, Zap } from "lucide-react"

export default function InnovationClientPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const innovationMetrics = [
    { title: "创新项目总数", value: "156", change: "+12%", icon: Lightbulb, color: "text-yellow-600" },
    { title: "孵化成功率", value: "68%", change: "+5%", icon: Rocket, color: "text-blue-600" },
    { title: "创新收益", value: "¥2.8M", change: "+18%", icon: TrendingUp, color: "text-green-600" },
    { title: "参与人员", value: "89", change: "+7%", icon: Users, color: "text-purple-600" },
  ]

  const activeProjects = [
    {
      id: 1,
      name: "AI智能客服系统",
      status: "开发中",
      progress: 75,
      team: "技术团队A",
      priority: "高",
      deadline: "2024-03-15",
    },
    {
      id: 2,
      name: "区块链供应链管理",
      status: "测试中",
      progress: 90,
      team: "技术团队B",
      priority: "中",
      deadline: "2024-02-28",
    },
    {
      id: 3,
      name: "物联网监控平台",
      status: "设计中",
      progress: 45,
      team: "产品团队",
      priority: "高",
      deadline: "2024-04-10",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "开发中":
        return "bg-blue-100 text-blue-800"
      case "测试中":
        return "bg-yellow-100 text-yellow-800"
      case "设计中":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
            <h1 className="text-3xl font-bold text-gray-900">创新管理</h1>
            <p className="text-gray-600 mt-2">推动企业创新发展，孵化前沿技术项目</p>
          </div>
          <Button className="btn-primary">
            <Lightbulb className="w-4 h-4 mr-2" />
            新建创新项目
          </Button>
        </div>

        {/* 关键指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {innovationMetrics.map((metric, index) => (
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

        {/* 主要内容区域 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">项目概览</TabsTrigger>
            <TabsTrigger value="proposal">创新提案</TabsTrigger>
            <TabsTrigger value="incubation">孵化管理</TabsTrigger>
            <TabsTrigger value="evaluation">效果评估</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 活跃项目列表 */}
              <Card className="card-gradient-amber">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Rocket className="w-5 h-5 mr-2 text-amber-600" />
                    活跃创新项目
                  </CardTitle>
                  <CardDescription>当前正在进行的创新项目状态</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="p-4 bg-white rounded-lg border border-amber-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <div className="flex space-x-2">
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                          <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>进度</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="progress-amber" />
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {project.team}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {project.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 创新成果展示 */}
              <Card className="card-gradient-emerald">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-emerald-600" />
                    创新成果
                  </CardTitle>
                  <CardDescription>近期创新项目成果展示</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">智能数据分析平台</h4>
                      <Badge className="bg-green-100 text-green-800">已上线</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">基于机器学习的数据分析平台，提升数据处理效率300%</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-medium">收益: ¥850K</span>
                      <span className="text-gray-500">2024-01-15 上线</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">自动化运维系统</h4>
                      <Badge className="bg-green-100 text-green-800">已上线</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">全自动化运维监控系统，减少人工干预80%</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-medium">收益: ¥620K</span>
                      <span className="text-gray-500">2023-12-20 上线</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">移动办公应用</h4>
                      <Badge className="bg-green-100 text-green-800">已上线</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">企业级移动办公解决方案，提升远程协作效率</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-medium">收益: ¥1.2M</span>
                      <span className="text-gray-500">2023-11-10 上线</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 创新趋势分析 */}
            <Card className="card-gradient-purple">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  创新趋势分析
                </CardTitle>
                <CardDescription>创新项目发展趋势和关键指标</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">项目成功率</h4>
                    <p className="text-2xl font-bold text-purple-600 mt-1">68%</p>
                    <p className="text-sm text-gray-600">较上季度提升5%</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                    <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">平均周期</h4>
                    <p className="text-2xl font-bold text-purple-600 mt-1">4.2月</p>
                    <p className="text-sm text-gray-600">较上季度缩短0.8月</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                    <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900">投资回报率</h4>
                    <p className="text-2xl font-bold text-purple-600 mt-1">285%</p>
                    <p className="text-sm text-gray-600">较上季度提升18%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposal">
            <Card className="card-gradient-blue">
              <CardHeader>
                <CardTitle>创新提案管理</CardTitle>
                <CardDescription>管理和评估创新提案</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">创新提案功能正在开发中...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incubation">
            <Card className="card-gradient-emerald">
              <CardHeader>
                <CardTitle>孵化管理</CardTitle>
                <CardDescription>项目孵化过程管理</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">孵化管理功能正在开发中...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluation">
            <Card className="card-gradient-purple">
              <CardHeader>
                <CardTitle>效果评估</CardTitle>
                <CardDescription>创新项目效果评估和分析</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">效果评估功能正在开发中...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
