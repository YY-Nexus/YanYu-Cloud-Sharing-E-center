"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MessageSquare,
  Settings,
  Plus,
  Edit,
  Eye,
  Play,
  RotateCcw,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  FileText,
  Activity,
  Target,
  Zap,
  Pause,
  Copy,
  Download,
  Upload,
} from "lucide-react"

export default function ServiceProcessPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // 服务流程数据
  const serviceProcesses = [
    {
      id: 1,
      name: "售前咨询流程",
      description: "客户咨询产品信息的标准化处理流程",
      status: "active",
      category: "售前服务",
      steps: 5,
      avgDuration: "15分钟",
      completionRate: 94,
      satisfaction: 4.7,
      monthlyVolume: 1250,
      lastUpdated: "2024-01-15",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-blue-50 border-blue-200 border-l-4 border-l-blue-500",
      statusColor: "bg-green-100 text-green-800",
      priority: "high",
      owner: "客服团队",
      automation: 65,
    },
    {
      id: 2,
      name: "订单处理流程",
      description: "从下单到发货的完整订单处理标准流程",
      status: "active",
      category: "订单管理",
      steps: 8,
      avgDuration: "2小时",
      completionRate: 98,
      satisfaction: 4.8,
      monthlyVolume: 890,
      lastUpdated: "2024-01-12",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-green-50 border-green-200 border-l-4 border-l-green-500",
      statusColor: "bg-green-100 text-green-800",
      priority: "high",
      owner: "订单团队",
      automation: 85,
    },
    {
      id: 3,
      name: "售后投诉处理",
      description: "客户投诉问题的快速响应和解决流程",
      status: "active",
      category: "售后服务",
      steps: 6,
      avgDuration: "45分钟",
      completionRate: 89,
      satisfaction: 4.3,
      monthlyVolume: 234,
      lastUpdated: "2024-01-10",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "bg-amber-50 border-amber-200 border-l-4 border-l-amber-500",
      statusColor: "bg-green-100 text-green-800",
      priority: "medium",
      owner: "售后团队",
      automation: 45,
    },
    {
      id: 4,
      name: "退换货流程",
      description: "产品退换货申请的审核和处理标准流程",
      status: "maintenance",
      category: "售后服务",
      steps: 7,
      avgDuration: "1.5小时",
      completionRate: 92,
      satisfaction: 4.1,
      monthlyVolume: 156,
      lastUpdated: "2024-01-08",
      icon: <RotateCcw className="h-5 w-5" />,
      color: "bg-purple-50 border-purple-200 border-l-4 border-l-purple-500",
      statusColor: "bg-amber-100 text-amber-800",
      priority: "medium",
      owner: "物流团队",
      automation: 70,
    },
    {
      id: 5,
      name: "VIP客户专属服务",
      description: "VIP客户的专属服务流程和特殊待遇标准",
      status: "draft",
      category: "VIP服务",
      steps: 4,
      avgDuration: "30分钟",
      completionRate: 96,
      satisfaction: 4.9,
      monthlyVolume: 67,
      lastUpdated: "2024-01-05",
      icon: <Users className="h-5 w-5" />,
      color: "bg-pink-50 border-pink-200 border-l-4 border-l-pink-500",
      statusColor: "bg-gray-100 text-gray-800",
      priority: "high",
      owner: "VIP团队",
      automation: 30,
    },
    {
      id: 6,
      name: "技术支持流程",
      description: "技术问题的分级处理和解决方案流程",
      status: "active",
      category: "技术支持",
      steps: 6,
      avgDuration: "1小时",
      completionRate: 91,
      satisfaction: 4.4,
      monthlyVolume: 445,
      lastUpdated: "2024-01-18",
      icon: <Settings className="h-5 w-5" />,
      color: "bg-indigo-50 border-indigo-200 border-l-4 border-l-indigo-500",
      statusColor: "bg-green-100 text-green-800",
      priority: "high",
      owner: "技术团队",
      automation: 55,
    },
  ]

  // 流程步骤模板
  const processSteps = [
    {
      id: 1,
      name: "客户咨询接收",
      description: "接收并记录客户咨询信息",
      duration: "2分钟",
      responsible: "客服专员",
      tools: ["CRM系统", "在线客服"],
      status: "completed",
      automation: true,
      sla: "1分钟内响应",
    },
    {
      id: 2,
      name: "需求分析评估",
      description: "分析客户需求并评估解决方案",
      duration: "5分钟",
      responsible: "客服专员",
      tools: ["产品知识库", "FAQ系统"],
      status: "completed",
      automation: false,
      sla: "5分钟内完成",
    },
    {
      id: 3,
      name: "方案推荐",
      description: "向客户推荐合适的产品或服务方案",
      duration: "8分钟",
      responsible: "客服专员",
      tools: ["产品目录", "价格系统"],
      status: "in-progress",
      automation: false,
      sla: "10分钟内完成",
    },
    {
      id: 4,
      name: "客户确认",
      description: "等待客户确认方案并收集反馈",
      duration: "等待中",
      responsible: "客户",
      tools: ["确认邮件", "电话回访"],
      status: "pending",
      automation: true,
      sla: "24小时内跟进",
    },
    {
      id: 5,
      name: "后续跟进",
      description: "跟进客户决策并提供进一步支持",
      duration: "待定",
      responsible: "客服专员",
      tools: ["跟进系统", "客户档案"],
      status: "pending",
      automation: false,
      sla: "48小时内完成",
    },
  ]

  // 流程统计数据
  const processStats = [
    {
      title: "活跃流程",
      value: "15",
      change: "+3",
      changeType: "increase",
      icon: <Activity className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "正在运行的流程数量",
    },
    {
      title: "平均完成率",
      value: "93.2%",
      change: "+2.1%",
      changeType: "increase",
      icon: <Target className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "流程执行成功率",
    },
    {
      title: "平均处理时长",
      value: "42分钟",
      change: "-8分钟",
      changeType: "decrease",
      icon: <Clock className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "流程平均执行时间",
    },
    {
      title: "流程优化率",
      value: "87%",
      change: "+5%",
      changeType: "increase",
      icon: <Zap className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "流程自动化程度",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">运行中</Badge>
      case "maintenance":
        return <Badge className="bg-amber-100 text-amber-800">维护中</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">草稿</Badge>
      case "paused":
        return <Badge className="bg-red-100 text-red-800">已暂停</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">高</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">中</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">低</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Play className="h-4 w-4 text-blue-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              服务流程设计
            </h1>
            <p className="text-gray-600 mt-1">售前咨询、售后响应、投诉处理流程管理</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              导入流程
            </Button>
            <Button variant="outline" size="sm" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              导出流程
            </Button>
            <Button variant="outline" size="sm" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              流程设置
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  新建流程
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>创建新流程</DialogTitle>
                  <DialogDescription>设计一个新的服务流程来优化客户体验</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="processName">流程名称</Label>
                      <Input id="processName" placeholder="输入流程名称" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="processCategory">流程分类</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择流程分类" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="presale">售前服务</SelectItem>
                          <SelectItem value="order">订单管理</SelectItem>
                          <SelectItem value="aftersale">售后服务</SelectItem>
                          <SelectItem value="vip">VIP服务</SelectItem>
                          <SelectItem value="technical">技术支持</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="processPriority">优先级</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择优先级" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">高</SelectItem>
                          <SelectItem value="medium">中</SelectItem>
                          <SelectItem value="low">低</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="processOwner">负责团队</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择负责团队" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="customer-service">客服团队</SelectItem>
                          <SelectItem value="order">订单团队</SelectItem>
                          <SelectItem value="aftersale">售后团队</SelectItem>
                          <SelectItem value="technical">技术团队</SelectItem>
                          <SelectItem value="vip">VIP团队</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processDesc">流程描述</Label>
                    <Textarea id="processDesc" placeholder="描述流程的目的和适用场景" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="autoStart" />
                    <Label htmlFor="autoStart">自动启动流程</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>创建流程</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 统计指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processStats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                  <Badge variant={stat.changeType === "increase" ? "default" : "secondary"} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容区域 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">流程总览</TabsTrigger>
            <TabsTrigger value="processes">流程管理</TabsTrigger>
            <TabsTrigger value="designer">流程设计器</TabsTrigger>
            <TabsTrigger value="analytics">效果分析</TabsTrigger>
          </TabsList>

          {/* 流程总览 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Activity className="h-5 w-5" />
                    流程执行概况
                  </CardTitle>
                  <CardDescription>当前活跃流程的执行状态和效率指标</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                      <div>
                        <div className="font-medium text-blue-900">今日处理量</div>
                        <div className="text-sm text-blue-700">已完成流程数量</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-900">1,247</div>
                        <div className="text-xs text-blue-600">+12% 较昨日</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                      <div>
                        <div className="font-medium text-green-900">平均效率</div>
                        <div className="text-sm text-green-700">流程完成速度</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-900">93%</div>
                        <div className="text-xs text-green-600">+5% 较上周</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                      <div>
                        <div className="font-medium text-purple-900">客户满意度</div>
                        <div className="text-sm text-purple-700">流程体验评分</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-900">4.6</div>
                        <div className="text-xs text-purple-600">+0.2 较上月</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Target className="h-5 w-5" />
                    流程分类统计
                  </CardTitle>
                  <CardDescription>不同类型服务流程的分布和使用情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-blue-900">售前服务</div>
                          <div className="text-sm text-blue-700">咨询、报价、演示</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-900">6个</div>
                        <div className="text-xs text-blue-600">40% 占比</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium text-green-900">订单管理</div>
                          <div className="text-sm text-green-700">下单、支付、发货</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-900">4个</div>
                        <div className="text-xs text-green-600">27% 占比</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border-l-4 border-l-amber-500">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <div>
                          <div className="font-medium text-amber-900">售后服务</div>
                          <div className="text-sm text-amber-700">投诉、退换、维修</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-amber-900">5个</div>
                        <div className="text-xs text-amber-600">33% 占比</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 流程管理 */}
          <TabsContent value="processes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceProcesses.map((process) => (
                <Card key={process.id} className={`${process.color} transition-all duration-300 hover:shadow-xl`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">{process.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{process.name}</h3>
                          <p className="text-sm text-gray-600">{process.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(process.status)}
                        {getPriorityBadge(process.priority)}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{process.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">步骤数量</div>
                        <div className="font-semibold">{process.steps}步</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">平均时长</div>
                        <div className="font-semibold">{process.avgDuration}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">完成率</div>
                        <div className="font-semibold">{process.completionRate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">满意度</div>
                        <div className="font-semibold">{process.satisfaction}/5</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>月处理量</span>
                        <span className="font-medium">{process.monthlyVolume}</span>
                      </div>
                      <Progress value={(process.monthlyVolume / 1500) * 100} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>自动化程度</span>
                        <span className="font-medium">{process.automation}%</span>
                      </div>
                      <Progress value={process.automation} className="h-2" />
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      负责团队：{process.owner} | 更新时间：{process.lastUpdated}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent hover:shadow-md transition-all duration-300"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent hover:shadow-md transition-all duration-300"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        查看
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:shadow-md transition-all duration-300 bg-transparent"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:shadow-md transition-all duration-300 bg-transparent"
                      >
                        {process.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 流程设计器 */}
          <TabsContent value="designer" className="space-y-6">
            <Card className="border-l-4 border-l-purple-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Settings className="h-5 w-5" />
                  流程步骤设计
                </CardTitle>
                <CardDescription>设计和配置服务流程的详细步骤</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        {getStepStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{step.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {step.duration}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {step.responsible}
                            </Badge>
                            {step.automation && <Badge className="bg-green-100 text-green-800 text-xs">自动化</Badge>}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-wrap gap-1">
                            {step.tools.map((tool, toolIndex) => (
                              <Badge key={toolIndex} variant="outline" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-muted-foreground">SLA: {step.sla}</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="hover:shadow-md transition-all duration-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:shadow-md transition-all duration-300">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:shadow-md transition-all duration-300">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button className="hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    添加步骤
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 效果分析 */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-amber-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <Zap className="h-5 w-5" />
                    流程效率分析
                  </CardTitle>
                  <CardDescription>各流程的执行效率和优化建议</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceProcesses.slice(0, 4).map((process) => (
                      <div
                        key={process.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          {process.icon}
                          <div>
                            <div className="font-medium text-gray-900">{process.name}</div>
                            <div className="text-sm text-gray-600">完成率 {process.completionRate}%</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{process.avgDuration}</div>
                          <div className="text-xs text-gray-500">平均时长</div>
                          <Progress value={process.automation} className="w-16 h-1 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Target className="h-5 w-5" />
                    优化建议
                  </CardTitle>
                  <CardDescription>基于数据分析的流程优化建议</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-900">自动化机会</div>
                        <div className="text-sm text-blue-700">售前咨询流程中的信息收集步骤可以通过表单自动化</div>
                        <div className="text-xs text-blue-600 mt-1">预计提升效率 30%</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border-l-4 border-l-amber-500">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-amber-900">瓶颈识别</div>
                        <div className="text-sm text-amber-700">投诉处理流程在"方案制定"环节耗时较长，建议优化</div>
                        <div className="text-xs text-amber-600 mt-1">当前平均耗时 25分钟</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                      <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-green-900">效率提升</div>
                        <div className="text-sm text-green-700">通过模板化回复可将平均响应时间缩短30%</div>
                        <div className="text-xs text-green-600 mt-1">预计节省时间 8分钟/次</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                      <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-purple-900">质量改进</div>
                        <div className="text-sm text-purple-700">增加质量检查节点可提升客户满意度</div>
                        <div className="text-xs text-purple-600 mt-1">预计满意度提升 0.3分</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 流程性能趋势 */}
            <Card className="border-l-4 border-l-indigo-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-600">
                  <Activity className="h-5 w-5" />
                  流程性能趋势
                </CardTitle>
                <CardDescription>流程执行效率和质量的历史趋势分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                    <div className="text-2xl font-bold text-blue-900">↗ 15%</div>
                    <div className="text-sm text-blue-700">效率提升</div>
                    <div className="text-xs text-blue-600 mt-1">较上月</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                    <div className="text-2xl font-bold text-green-900">↗ 0.4</div>
                    <div className="text-sm text-green-700">满意度提升</div>
                    <div className="text-xs text-green-600 mt-1">较上月</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                    <div className="text-2xl font-bold text-purple-900">↘ 12%</div>
                    <div className="text-sm text-purple-700">处理时长缩短</div>
                    <div className="text-xs text-purple-600 mt-1">较上月</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
