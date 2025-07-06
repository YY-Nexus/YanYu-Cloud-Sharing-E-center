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
  Star,
  Settings,
  Plus,
  Edit,
  Eye,
  Send,
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Target,
  Award,
  Download,
  Upload,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function SatisfactionPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreateSurveyOpen, setIsCreateSurveyOpen] = useState(false)

  // 满意度统计数据
  const satisfactionStats = [
    {
      title: "总体满意度",
      value: "4.6",
      unit: "/5.0",
      change: "+0.3",
      changeType: "increase",
      icon: <Star className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "客户整体满意度评分",
    },
    {
      title: "参与调研人数",
      value: "8,234",
      unit: "人",
      change: "+12%",
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "本月参与调研客户数",
    },
    {
      title: "调研完成率",
      value: "87%",
      unit: "",
      change: "+5%",
      changeType: "increase",
      icon: <Target className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "调研问卷完成比例",
    },
    {
      title: "改进措施数",
      value: "23",
      unit: "项",
      change: "+8",
      changeType: "increase",
      icon: <Award className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "基于反馈的改进措施",
    },
  ]

  // 调研问卷数据
  const surveys = [
    {
      id: 1,
      title: "产品使用体验调研",
      description: "了解客户对产品功能和使用体验的满意度",
      status: "active",
      type: "产品体验",
      responses: 1247,
      avgScore: 4.3,
      completionRate: 89,
      createdDate: "2024-01-15",
      endDate: "2024-02-15",
      questions: 12,
      targetAudience: "全体客户",
      priority: "high",
      creator: "产品团队",
    },
    {
      id: 2,
      title: "客服服务质量评价",
      description: "评估客服团队的服务态度和专业水平",
      status: "active",
      type: "服务质量",
      responses: 892,
      avgScore: 4.7,
      completionRate: 92,
      createdDate: "2024-01-10",
      endDate: "2024-02-10",
      questions: 8,
      targetAudience: "服务客户",
      priority: "high",
      creator: "客服团队",
    },
    {
      id: 3,
      title: "售后支持满意度",
      description: "收集客户对售后服务和技术支持的反馈",
      status: "completed",
      type: "售后服务",
      responses: 567,
      avgScore: 4.1,
      completionRate: 85,
      createdDate: "2023-12-01",
      endDate: "2023-12-31",
      questions: 10,
      targetAudience: "售后客户",
      priority: "medium",
      creator: "售后团队",
    },
    {
      id: 4,
      title: "整体服务体验调研",
      description: "全面评估客户对公司服务的整体满意度",
      status: "draft",
      type: "综合评价",
      responses: 0,
      avgScore: 0,
      completionRate: 0,
      createdDate: "2024-01-20",
      endDate: "2024-03-20",
      questions: 15,
      targetAudience: "VIP客户",
      priority: "high",
      creator: "管理团队",
    },
    {
      id: 5,
      title: "移动端使用体验",
      description: "专门针对移动端应用使用体验的调研",
      status: "active",
      type: "产品体验",
      responses: 334,
      avgScore: 4.0,
      completionRate: 78,
      createdDate: "2024-01-18",
      endDate: "2024-02-18",
      questions: 9,
      targetAudience: "移动用户",
      priority: "medium",
      creator: "技术团队",
    },
  ]

  // 满意度分布数据
  const satisfactionDistribution = [
    { score: "5分 (非常满意)", count: 3456, percentage: 42, color: "bg-green-500" },
    { score: "4分 (满意)", count: 2890, percentage: 35, color: "bg-blue-500" },
    { score: "3分 (一般)", count: 1234, percentage: 15, color: "bg-yellow-500" },
    { score: "2分 (不满意)", count: 456, percentage: 6, color: "bg-orange-500" },
    { score: "1分 (非常不满意)", count: 198, percentage: 2, color: "bg-red-500" },
  ]

  // 改进措施数据
  const improvements = [
    {
      id: 1,
      title: "优化客服响应时间",
      description: "将平均响应时间从5分钟缩短至2分钟",
      status: "completed",
      priority: "high",
      impact: "响应时间缩短60%",
      implementDate: "2024-01-10",
      category: "服务效率",
      responsible: "客服团队",
      budget: 50000,
      roi: 3.2,
    },
    {
      id: 2,
      title: "完善产品使用指南",
      description: "制作详细的产品使用视频教程和FAQ",
      status: "in-progress",
      priority: "medium",
      impact: "预计减少30%的咨询量",
      implementDate: "2024-01-25",
      category: "用户体验",
      responsible: "产品团队",
      budget: 30000,
      roi: 2.8,
    },
    {
      id: 3,
      title: "增加退换货便利性",
      description: "简化退换货流程，支持在线申请",
      status: "planned",
      priority: "high",
      impact: "预计提升满意度0.5分",
      implementDate: "2024-02-01",
      category: "服务流程",
      responsible: "售后团队",
      budget: 80000,
      roi: 4.1,
    },
    {
      id: 4,
      title: "移动端体验优化",
      description: "优化移动端界面和交互体验",
      status: "in-progress",
      priority: "medium",
      impact: "预计提升移动端满意度0.4分",
      implementDate: "2024-01-30",
      category: "产品优化",
      responsible: "技术团队",
      budget: 120000,
      roi: 2.5,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">进行中</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">已完成</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">草稿</Badge>
      case "paused":
        return <Badge className="bg-amber-100 text-amber-800">已暂停</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getImprovementStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">已完成</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">进行中</Badge>
      case "planned":
        return <Badge className="bg-amber-100 text-amber-800">计划中</Badge>
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              满意度调研分析
            </h1>
            <p className="text-gray-600 mt-1">问卷配置、结果统计、改进举措跟踪</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              导入调研
            </Button>
            <Button variant="outline" size="sm" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              导出报告
            </Button>
            <Button variant="outline" size="sm" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              调研设置
            </Button>
            <Dialog open={isCreateSurveyOpen} onOpenChange={setIsCreateSurveyOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-amber-600 to-orange-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  创建调研
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>创建满意度调研</DialogTitle>
                  <DialogDescription>设计新的客户满意度调研问卷</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="surveyTitle">调研标题</Label>
                      <Input id="surveyTitle" placeholder="输入调研标题" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surveyType">调研类型</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择调研类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">产品体验</SelectItem>
                          <SelectItem value="service">服务质量</SelectItem>
                          <SelectItem value="support">售后服务</SelectItem>
                          <SelectItem value="overall">综合评价</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetAudience">目标受众</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择目标受众" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全体客户</SelectItem>
                          <SelectItem value="vip">VIP客户</SelectItem>
                          <SelectItem value="active">活跃客户</SelectItem>
                          <SelectItem value="service">服务客户</SelectItem>
                          <SelectItem value="mobile">移动用户</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">优先级</Label>
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surveyDesc">调研描述</Label>
                    <Textarea id="surveyDesc" placeholder="描述调研的目的和内容" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">开始日期</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">结束日期</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="anonymous" />
                      <Label htmlFor="anonymous">匿名调研</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="reminder" />
                      <Label htmlFor="reminder">自动提醒</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="incentive" />
                      <Label htmlFor="incentive">参与激励</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateSurveyOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setIsCreateSurveyOpen(false)}>创建调研</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 统计指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {satisfactionStats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 border-l-amber-500"
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
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                    <span className="text-sm text-gray-500 font-normal">{stat.unit}</span>
                  </h3>
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
            <TabsTrigger value="overview">满意度概览</TabsTrigger>
            <TabsTrigger value="surveys">调研管理</TabsTrigger>
            <TabsTrigger value="analysis">数据分析</TabsTrigger>
            <TabsTrigger value="improvements">改进措施</TabsTrigger>
          </TabsList>

          {/* 满意度概览 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-amber-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <Star className="h-5 w-5" />
                    满意度分布
                  </CardTitle>
                  <CardDescription>客户满意度评分的分布情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {satisfactionDistribution.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.score}</span>
                          <span className="font-medium">
                            {item.count}人 ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${item.color} transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-l-amber-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-900">总体评价</span>
                    </div>
                    <div className="text-sm text-amber-700">77%的客户给出4分以上评价，整体满意度表现良好</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    满意度趋势
                  </CardTitle>
                  <CardDescription>近期满意度变化趋势分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                      <div>
                        <div className="font-medium text-green-900">本月平均分</div>
                        <div className="text-sm text-green-700">当前月份满意度</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-900">4.6</div>
                        <div className="text-xs text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +0.3 较上月
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                      <div>
                        <div className="font-medium text-blue-900">上月平均分</div>
                        <div className="text-sm text-blue-700">上个月满意度</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-900">4.3</div>
                        <div className="text-xs text-blue-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +0.1 较前月
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                      <div>
                        <div className="font-medium text-purple-900">季度平均分</div>
                        <div className="text-sm text-purple-700">本季度满意度</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-900">4.4</div>
                        <div className="text-xs text-purple-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +0.2 较上季
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 调研管理 */}
          <TabsContent value="surveys" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {surveys.map((survey) => (
                <Card
                  key={survey.id}
                  className="transition-all duration-300 hover:shadow-xl border-l-4 border-l-blue-500"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{survey.title}</h3>
                        <p className="text-sm text-gray-600">{survey.type}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(survey.status)}
                        {getPriorityBadge(survey.priority)}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{survey.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">参与人数</div>
                        <div className="font-semibold">{survey.responses.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">平均评分</div>
                        <div className="font-semibold flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          {survey.avgScore || "待评分"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">完成率</div>
                        <div className="font-semibold">{survey.completionRate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">问题数</div>
                        <div className="font-semibold">{survey.questions}题</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>完成进度</span>
                        <span className="font-medium">{survey.completionRate}%</span>
                      </div>
                      <Progress value={survey.completionRate} className="h-2" />
                    </div>

                    <div className="text-xs text-gray-500 mb-4 space-y-1">
                      <div>
                        目标受众：{survey.targetAudience} | 创建者：{survey.creator}
                      </div>
                      <div>
                        创建时间：{survey.createdDate} | 截止时间：{survey.endDate}
                      </div>
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
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 数据分析 */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <BarChart3 className="h-5 w-5" />
                    各维度满意度
                  </CardTitle>
                  <CardDescription>不同服务维度的满意度对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { dimension: "产品质量", score: 4.6, progress: 92, color: "bg-green-500" },
                      { dimension: "服务态度", score: 4.4, progress: 88, color: "bg-blue-500" },
                      { dimension: "响应速度", score: 4.2, progress: 84, color: "bg-purple-500" },
                      { dimension: "问题解决", score: 4.5, progress: 90, color: "bg-amber-500" },
                      { dimension: "整体体验", score: 4.3, progress: 86, color: "bg-pink-500" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.dimension}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24">
                            <Progress value={item.progress} className="h-2" />
                          </div>
                          <span className="text-sm font-medium w-8">{item.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <MessageSquare className="h-5 w-5" />
                    客户反馈摘要
                  </CardTitle>
                  <CardDescription>客户意见和建议的关键词分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-green-900">正面反馈</div>
                        <div className="text-sm text-green-700">服务专业、响应及时、解决问题高效</div>
                        <div className="text-xs text-green-600 mt-1">占比 78% | 关键词：专业、及时、高效</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border-l-4 border-l-amber-500">
                      <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-amber-900">改进建议</div>
                        <div className="text-sm text-amber-700">希望增加自助服务选项、优化移动端体验</div>
                        <div className="text-xs text-amber-600 mt-1">占比 15% | 关键词：自助、移动端、便利</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-l-red-500">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-red-900">负面反馈</div>
                        <div className="text-sm text-red-700">等待时间较长、部分问题未能一次性解决</div>
                        <div className="text-xs text-red-600 mt-1">占比 7% | 关键词：等待、重复、复杂</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 满意度趋势图表区域 */}
            <Card className="border-l-4 border-l-purple-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <TrendingUp className="h-5 w-5" />
                  满意度趋势分析
                </CardTitle>
                <CardDescription>各类型调研的满意度变化趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { type: "产品体验", current: 4.3, previous: 4.1, trend: "up" },
                    { type: "服务质量", current: 4.7, previous: 4.5, trend: "up" },
                    { type: "售后服务", current: 4.1, previous: 4.2, trend: "down" },
                    { type: "综合评价", current: 4.6, previous: 4.4, trend: "up" },
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{item.type}</div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{item.current}</div>
                      <div
                        className={`text-xs flex items-center justify-center gap-1 ${
                          item.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <TrendingUp className={`h-3 w-3 ${item.trend === "down" ? "rotate-180" : ""}`} />
                        {item.trend === "up" ? "+" : ""}
                        {(item.current - item.previous).toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 改进措施 */}
          <TabsContent value="improvements" className="space-y-6">
            <Card className="border-l-4 border-l-purple-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Award className="h-5 w-5" />
                  改进措施跟踪
                </CardTitle>
                <CardDescription>基于客户反馈制定的改进措施和执行进度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvements.map((improvement) => (
                    <div
                      key={improvement.id}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {improvement.id}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{improvement.title}</h4>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(improvement.priority)}
                            {getImprovementStatusBadge(improvement.status)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{improvement.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <div className="text-xs text-gray-500">预期影响</div>
                            <div className="text-sm font-medium text-green-600">{improvement.impact}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">负责团队</div>
                            <div className="text-sm font-medium">{improvement.responsible}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">投入预算</div>
                            <div className="text-sm font-medium">{formatCurrency(improvement.budget)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">预期ROI</div>
                            <div className="text-sm font-medium text-blue-600">{improvement.roi}x</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            分类：{improvement.category} | 实施日期：{improvement.implementDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="hover:shadow-md transition-all duration-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="hover:shadow-md transition-all duration-300">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button className="hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    添加改进措施
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 改进效果统计 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600">已完成措施</div>
                  <div className="text-xs text-green-600 mt-1">平均ROI: 3.2x</div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">进行中措施</div>
                  <div className="text-xs text-blue-600 mt-1">预计完成: 2个月</div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <div className="text-sm text-gray-600">计划中措施</div>
                  <div className="text-xs text-amber-600 mt-1">预计投入: ¥230K</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
