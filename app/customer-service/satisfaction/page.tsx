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
    },
    {
      id: 2,
      title: "完善产品使用指南",
      description: "制作详细的产品使用视频教程和FAQ",
      status: "in-progress",
      priority: "medium",
      impact: "预计减少30%的咨询量",
      implementDate: "2024-01-25",
    },
    {
      id: 3,
      title: "增加退换货便利性",
      description: "简化退换货流程，支持在线申请",
      status: "planned",
      priority: "high",
      impact: "预计提升满意度0.5分",
      implementDate: "2024-02-01",
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">满意度调研分析</h1>
            <p className="text-gray-600 mt-1">问卷配置、结果统计、改进举措跟踪</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              调研设置
            </Button>
            <Dialog open={isCreateSurveyOpen} onOpenChange={setIsCreateSurveyOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  创建调研
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>创建满意度调研</DialogTitle>
                  <DialogDescription>设计新的客户满意度调研问卷</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">调研标题</label>
                    <Input placeholder="输入调研标题" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">调研类型</label>
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium">调研描述</label>
                    <Textarea placeholder="描述调研的目的和内容" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">开始日期</label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">结束日期</label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="anonymous" />
                    <label htmlFor="anonymous" className="text-sm font-medium">
                      匿名调研
                    </label>
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
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-600" />
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
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
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
                    满意度趋势
                  </CardTitle>
                  <CardDescription>近期满意度变化趋势分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
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
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
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
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
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
                <Card key={survey.id} className="transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{survey.title}</h3>
                        <p className="text-sm text-gray-600">{survey.type}</p>
                      </div>
                      {getStatusBadge(survey.status)}
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

                    <div className="text-xs text-gray-500 mb-4">
                      创建时间：{survey.createdDate} | 截止时间：{survey.endDate}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        查看
                      </Button>
                      <Button size="sm" variant="outline">
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    各维度满意度
                  </CardTitle>
                  <CardDescription>不同服务维度的满意度对比</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">产品质量</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="text-sm font-medium">4.6</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">服务态度</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20 h-2" />
                        <span className="text-sm font-medium">4.4</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">响应速度</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm font-medium">4.2</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">问题解决</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="w-20 h-2" />
                        <span className="text-sm font-medium">4.5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">整体体验</span>
                      <div className="flex items-center gap-2">
                        <Progress value={87} className="w-20 h-2" />
                        <span className="text-sm font-medium">4.3</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    客户反馈摘要
                  </CardTitle>
                  <CardDescription>客户意见和建议的关键词分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-green-900">正面反馈</div>
                        <div className="text-sm text-green-700">服务专业、响应及时、解决问题高效</div>
                        <div className="text-xs text-green-600 mt-1">占比 78%</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-amber-900">改进建议</div>
                        <div className="text-sm text-amber-700">希望增加自助服务选项、优化移动端体验</div>
                        <div className="text-xs text-amber-600 mt-1">占比 15%</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-red-900">负面反馈</div>
                        <div className="text-sm text-red-700">等待时间较长、部分问题未能一次性解决</div>
                        <div className="text-xs text-red-600 mt-1">占比 7%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 改进措施 */}
          <TabsContent value="improvements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  改进措施跟踪
                </CardTitle>
                <CardDescription>基于客户反馈制定的改进措施和执行进度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvements.map((improvement) => (
                    <div key={improvement.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
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
                        <p className="text-sm text-gray-600 mb-2">{improvement.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-green-600 font-medium">{improvement.impact}</div>
                          <div className="text-xs text-gray-500">实施日期：{improvement.implementDate}</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    添加改进措施
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
