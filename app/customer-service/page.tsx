"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Theater,
  Users,
  MessageSquare,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  Plus,
  Edit,
  Eye,
  ArrowRight,
  Phone,
  Mail,
  HeadphonesIcon,
} from "lucide-react"

export default function CustomerServicePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // 核心指标数据
  const coreMetrics = [
    {
      title: "客户总数",
      value: "12,456",
      change: "+8.5%",
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "满意度评分",
      value: "4.6/5",
      change: "+0.3",
      changeType: "increase",
      icon: <Star className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "响应时间",
      value: "2.3分钟",
      change: "-0.8分钟",
      changeType: "decrease",
      icon: <Clock className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "解决率",
      value: "94.2%",
      change: "+2.1%",
      changeType: "increase",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  // 模块导航数据
  const moduleCards = [
    {
      title: "客户信息管理",
      description: "档案建立、标签体系、画像生成",
      href: "/customer-service/info",
      icon: <Users className="h-6 w-6" />,
      status: "运行中",
      progress: 92,
      stats: "12,456个客户",
      color: "border-blue-200 hover:border-blue-300",
      bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      title: "服务流程设计",
      description: "售前咨询、售后响应、投诉处理",
      href: "/customer-service/process",
      icon: <MessageSquare className="h-6 w-6" />,
      status: "活跃",
      progress: 88,
      stats: "15个服务流程",
      color: "border-green-200 hover:border-green-300",
      bgGradient: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      title: "满意度调研分析",
      description: "问卷配置、结果统计、改进举措",
      href: "/customer-service/satisfaction",
      icon: <Star className="h-6 w-6" />,
      status: "进行中",
      progress: 76,
      stats: "4.6分平均满意度",
      color: "border-purple-200 hover:border-purple-300",
      bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
    {
      title: "客户分层运营",
      description: "VIP服务、沉睡客户唤醒",
      href: "/customer-service/segmentation",
      icon: <TrendingUp className="h-6 w-6" />,
      status: "正常",
      progress: 85,
      stats: "8个客户分层",
      color: "border-amber-200 hover:border-amber-300",
      bgGradient: "bg-gradient-to-br from-amber-50 to-amber-100",
    },
  ]

  // 服务渠道数据
  const serviceChannels = [
    {
      name: "在线客服",
      type: "即时通讯",
      dailyVolume: 1250,
      avgResponseTime: "1.2分钟",
      satisfactionRate: 96,
      status: "excellent",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "电话客服",
      type: "语音服务",
      dailyVolume: 890,
      avgResponseTime: "15秒",
      satisfactionRate: 92,
      status: "good",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      name: "邮件支持",
      type: "邮件服务",
      dailyVolume: 456,
      avgResponseTime: "2.5小时",
      satisfactionRate: 89,
      status: "good",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      name: "工单系统",
      type: "技术支持",
      dailyVolume: 234,
      avgResponseTime: "4.2小时",
      satisfactionRate: 94,
      status: "excellent",
      icon: <HeadphonesIcon className="h-5 w-5" />,
    },
  ]

  // 最近服务活动
  const recentActivities = [
    {
      type: "客户反馈",
      description: "收到VIP客户关于产品功能的改进建议",
      time: "10分钟前",
      status: "info",
      priority: "high",
    },
    {
      type: "投诉处理",
      description: "成功解决客户关于订单延迟的投诉",
      time: "30分钟前",
      status: "success",
      priority: "medium",
    },
    {
      type: "满意度调研",
      description: "本月客户满意度调研已完成，整体评分4.6",
      time: "2小时前",
      status: "success",
      priority: "low",
    },
    {
      type: "系统升级",
      description: "客服系统升级完成，响应速度提升20%",
      time: "4小时前",
      status: "info",
      priority: "medium",
    },
    {
      type: "培训完成",
      description: "客服团队服务技能培训圆满结束",
      time: "1天前",
      status: "success",
      priority: "low",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">客户服务</h1>
            <p className="text-gray-600 mt-1">客户关系管理与服务体系优化</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              服务设置
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              新建工单
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
                  <Badge
                    variant={
                      metric.changeType === "increase" ||
                      (metric.changeType === "decrease" && metric.title === "响应时间")
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs"
                  >
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
            <TabsTrigger value="channels">服务渠道</TabsTrigger>
            <TabsTrigger value="activities">服务动态</TabsTrigger>
          </TabsList>

          {/* 总览标签页 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 服务质量概览 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-600" />
                    服务质量概览
                  </CardTitle>
                  <CardDescription>客户服务关键指标和质量评估</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-green-900">客户满意度</div>
                        <div className="text-sm text-green-700">本月平均评分</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-900">4.6</div>
                        <div className="text-xs text-green-600">+0.3 较上月</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium text-blue-900">问题解决率</div>
                        <div className="text-sm text-blue-700">一次性解决比例</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-900">94.2%</div>
                        <div className="text-xs text-blue-600">+2.1% 较上月</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium text-purple-900">平均响应时间</div>
                        <div className="text-sm text-purple-700">客户等待时长</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-900">2.3分钟</div>
                        <div className="text-xs text-purple-600">-0.8分钟 较上月</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 客户分布统计 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    客户分布统计
                  </CardTitle>
                  <CardDescription>客户类型和活跃度分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-amber-600" />
                        <div>
                          <div className="font-medium text-amber-900">VIP客户</div>
                          <div className="text-sm text-amber-700">高价值客户群体</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-amber-900">1,245</div>
                        <div className="text-xs text-amber-600">10% 占比</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium text-green-900">活跃客户</div>
                          <div className="text-sm text-green-700">近30天有交互</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-900">8,934</div>
                        <div className="text-xs text-green-600">72% 占比</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">沉睡客户</div>
                          <div className="text-sm text-gray-700">超过90天无交互</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">2,277</div>
                        <div className="text-xs text-gray-600">18% 占比</div>
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

          {/* 服务渠道标签页 */}
          <TabsContent value="channels" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceChannels.map((channel, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {channel.icon}
                          {channel.name}
                        </CardTitle>
                        <CardDescription>{channel.type}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          channel.status === "excellent"
                            ? "default"
                            : channel.status === "good"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          channel.status === "excellent"
                            ? "bg-green-100 text-green-800"
                            : channel.status === "good"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                        }
                      >
                        {channel.status === "excellent" ? "优秀" : channel.status === "good" ? "良好" : "待改进"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">日均处理量</div>
                        <div className="text-lg font-semibold">{channel.dailyVolume.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">平均响应时间</div>
                        <div className="text-lg font-semibold">{channel.avgResponseTime}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>满意度</span>
                        <span className="font-medium">{channel.satisfactionRate}%</span>
                      </div>
                      <Progress value={channel.satisfactionRate} className="h-2" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        配置
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 服务动态标签页 */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Theater className="h-5 w-5 text-blue-600" />
                  最近服务动态
                </CardTitle>
                <CardDescription>客户服务相关的最新活动和事件记录</CardDescription>
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
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={
                                activity.priority === "high"
                                  ? "border-red-200 text-red-700"
                                  : activity.priority === "medium"
                                    ? "border-yellow-200 text-yellow-700"
                                    : "border-green-200 text-green-700"
                              }
                            >
                              {activity.priority === "high" ? "高" : activity.priority === "medium" ? "中" : "低"}
                            </Badge>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                          </div>
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
