"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, Users, Target, TrendingUp, Clock, CheckCircle, AlertCircle, Zap } from "lucide-react"

export default function IncubationPageClient() {
  const [selectedStage, setSelectedStage] = useState("all")

  const incubationProjects = [
    {
      id: 1,
      name: "AI智能客服系统",
      stage: "开发阶段",
      progress: 75,
      startDate: "2024-01-01",
      expectedEnd: "2024-03-15",
      team: ["张三", "李四", "王五"],
      budget: "¥500K",
      spent: "¥375K",
      milestones: [
        { name: "需求分析", status: "completed", date: "2024-01-15" },
        { name: "原型设计", status: "completed", date: "2024-02-01" },
        { name: "核心开发", status: "in-progress", date: "2024-02-15" },
        { name: "测试验证", status: "pending", date: "2024-03-01" },
        { name: "部署上线", status: "pending", date: "2024-03-15" },
      ],
      risks: ["技术难度较高", "时间紧迫"],
      nextActions: ["完成核心算法开发", "准备测试环境"],
    },
    {
      id: 2,
      name: "区块链供应链管理",
      stage: "测试阶段",
      progress: 90,
      startDate: "2023-11-01",
      expectedEnd: "2024-02-28",
      team: ["赵六", "钱七", "孙八"],
      budget: "¥800K",
      spent: "¥720K",
      milestones: [
        { name: "架构设计", status: "completed", date: "2023-11-15" },
        { name: "智能合约开发", status: "completed", date: "2023-12-15" },
        { name: "前端界面", status: "completed", date: "2024-01-15" },
        { name: "集成测试", status: "in-progress", date: "2024-02-01" },
        { name: "生产部署", status: "pending", date: "2024-02-28" },
      ],
      risks: ["区块链性能优化"],
      nextActions: ["完成性能测试", "准备生产环境"],
    },
    {
      id: 3,
      name: "物联网监控平台",
      stage: "设计阶段",
      progress: 45,
      startDate: "2024-02-01",
      expectedEnd: "2024-04-10",
      team: ["周九", "吴十"],
      budget: "¥600K",
      spent: "¥270K",
      milestones: [
        { name: "需求调研", status: "completed", date: "2024-02-10" },
        { name: "系统设计", status: "in-progress", date: "2024-02-25" },
        { name: "原型开发", status: "pending", date: "2024-03-10" },
        { name: "功能测试", status: "pending", date: "2024-03-25" },
        { name: "正式发布", status: "pending", date: "2024-04-10" },
      ],
      risks: ["硬件兼容性", "数据安全"],
      nextActions: ["完成系统架构设计", "选择技术栈"],
    },
  ]

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "设计阶段":
        return "bg-purple-100 text-purple-800"
      case "开发阶段":
        return "bg-blue-100 text-blue-800"
      case "测试阶段":
        return "bg-yellow-100 text-yellow-800"
      case "部署阶段":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-gray-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const filteredProjects =
    selectedStage === "all"
      ? incubationProjects
      : incubationProjects.filter((project) => project.stage === selectedStage)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">孵化管理</h1>
            <p className="text-gray-600 mt-2">管理创新项目的孵化过程和进度</p>
          </div>
          <Button className="btn-primary">
            <Rocket className="w-4 h-4 mr-2" />
            新建孵化项目
          </Button>
        </div>

        {/* 概览统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">孵化项目</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">12</p>
                  <p className="text-sm text-green-600 mt-1">+2 本月</p>
                </div>
                <Rocket className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient-emerald">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">成功率</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">68%</p>
                  <p className="text-sm text-green-600 mt-1">+5% 提升</p>
                </div>
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient-amber">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">平均周期</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">4.2月</p>
                  <p className="text-sm text-green-600 mt-1">-0.8月 缩短</p>
                </div>
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-gradient-purple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">投资回报</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">285%</p>
                  <p className="text-sm text-green-600 mt-1">+18% 增长</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 筛选器 */}
        <Card className="card-gradient-blue">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">筛选阶段:</span>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部阶段</SelectItem>
                  <SelectItem value="设计阶段">设计阶段</SelectItem>
                  <SelectItem value="开发阶段">开发阶段</SelectItem>
                  <SelectItem value="测试阶段">测试阶段</SelectItem>
                  <SelectItem value="部署阶段">部署阶段</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 项目列表 */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="card-gradient-amber hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">{project.name}</CardTitle>
                    <CardDescription className="mt-2">
                      开始时间: {project.startDate} | 预计完成: {project.expectedEnd}
                    </CardDescription>
                  </div>
                  <Badge className={getStageColor(project.stage)}>{project.stage}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 进度概览 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">整体进度</span>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="progress-amber" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">预算使用</span>
                      <span className="text-sm text-gray-600">
                        {project.spent} / {project.budget}
                      </span>
                    </div>
                    <Progress
                      value={
                        (Number.parseInt(project.spent.replace("¥", "").replace("K", "")) /
                          Number.parseInt(project.budget.replace("¥", "").replace("K", ""))) *
                        100
                      }
                      className="progress-blue"
                    />
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">团队成员</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.team.map((member, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="milestones" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="milestones">里程碑</TabsTrigger>
                    <TabsTrigger value="risks">风险管理</TabsTrigger>
                    <TabsTrigger value="actions">下步行动</TabsTrigger>
                  </TabsList>

                  <TabsContent value="milestones" className="space-y-3">
                    {project.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200"
                      >
                        <div className="flex items-center space-x-3">
                          {getMilestoneIcon(milestone.status)}
                          <span className="font-medium text-gray-900">{milestone.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">{milestone.date}</div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="risks" className="space-y-3">
                    {project.risks.map((risk, index) => (
                      <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <AlertCircle className="w-4 h-4 text-red-600 mr-3" />
                        <span className="text-red-800">{risk}</span>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="actions" className="space-y-3">
                    {project.nextActions.map((action, index) => (
                      <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Zap className="w-4 h-4 text-blue-600 mr-3" />
                        <span className="text-blue-800">{action}</span>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
