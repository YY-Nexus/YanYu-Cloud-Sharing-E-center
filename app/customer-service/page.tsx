"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Settings,
  BarChart3,
  Target,
  Brain,
  HeadphonesIcon,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  Activity,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function CustomerServicePage() {
  const serviceMetrics = [
    {
      title: "客户总数",
      value: "8,547",
      change: "+234",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "满意度评分",
      value: "4.6/5",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "amber",
    },
    {
      title: "响应时间",
      value: "2.3分钟",
      change: "-0.5分钟",
      trend: "up",
      icon: Clock,
      color: "emerald",
    },
    {
      title: "解决率",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      icon: CheckCircle,
      color: "purple",
    },
  ]

  const serviceModules = [
    {
      title: "客户信息管理",
      description: "档案建立、标签体系、画像生成、联系记录",
      icon: Users,
      href: "/customer-service/info",
      color: "blue",
      status: "运行中",
      progress: 92,
      features: ["客户档案", "标签管理", "画像分析", "联系记录"],
    },
    {
      title: "服务流程设计",
      description: "售前咨询、售后响应、投诉处理、工单管理",
      icon: Settings,
      href: "/customer-service/process",
      color: "emerald",
      status: "运行中",
      progress: 88,
      features: ["流程设计", "工单管理", "投诉处理", "服务标准"],
    },
    {
      title: "满意度调研分析",
      description: "问卷配置、结果统计、改进举措、NPS分析",
      icon: BarChart3,
      href: "/customer-service/satisfaction",
      color: "amber",
      status: "运行中",
      progress: 85,
      features: ["问卷调研", "数据分析", "NPS评分", "改进建议"],
    },
    {
      title: "客户分层运营",
      description: "VIP服务、沉睡客户唤醒、生命周期管理",
      icon: Target,
      href: "/customer-service/segmentation",
      color: "purple",
      status: "运行中",
      progress: 90,
      features: ["客户分层", "VIP服务", "生命周期", "精准营销"],
    },
  ]

  const serviceChannels = [
    { name: "在线客服", count: 1247, satisfaction: 4.7, icon: MessageSquare },
    { name: "电话客服", count: 856, satisfaction: 4.5, icon: Phone },
    { name: "邮件支持", count: 423, satisfaction: 4.3, icon: Mail },
    { name: "智能客服", count: 2134, satisfaction: 4.2, icon: Brain },
  ]

  const recentTickets = [
    {
      id: "CS-2024-001",
      title: "产品功能咨询",
      customer: "张先生",
      status: "已解决",
      priority: "中",
      time: "2小时前",
      type: "success",
    },
    {
      id: "CS-2024-002",
      title: "账户登录问题",
      customer: "李女士",
      status: "处理中",
      priority: "高",
      time: "4小时前",
      type: "warning",
    },
    {
      id: "CS-2024-003",
      title: "退款申请",
      customer: "王先生",
      status: "已解决",
      priority: "高",
      time: "1天前",
      type: "success",
    },
    {
      id: "CS-2024-004",
      title: "服务投诉",
      customer: "赵女士",
      status: "跟进中",
      priority: "紧急",
      time: "2天前",
      type: "error",
    },
  ]

  const customerInsights = [
    {
      title: "新客户增长",
      description: "本月新增客户234人，同比增长15%",
      time: "1小时前",
      type: "success",
    },
    {
      title: "满意度提升",
      description: "客户满意度较上月提升0.2分",
      time: "3小时前",
      type: "success",
    },
    {
      title: "响应时间优化",
      description: "平均响应时间缩短至2.3分钟",
      time: "6小时前",
      type: "info",
    },
    {
      title: "投诉率下降",
      description: "客户投诉率较上月下降12%",
      time: "1天前",
      type: "success",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">客户服务</h1>
              <p className="text-slate-600 mt-2">全渠道客户关系管理平台</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                <Activity className="w-3 h-3 mr-1" />
                服务系统正常
              </Badge>
            </div>
          </div>
        </div>

        {/* 服务指标概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <Card key={index} variant={metric.color as any} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">{metric.value}</p>
                      <p
                        className={`text-sm mt-1 ${
                          metric.trend === "up"
                            ? "text-emerald-600"
                            : metric.trend === "down"
                              ? "text-red-600"
                              : "text-slate-500"
                        }`}
                      >
                        {metric.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
                      <IconComponent className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 客户服务模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {serviceModules.map((module, index) => {
            const IconComponent = module.icon
            return (
              <Card key={index} variant={module.color as any} className="hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${module.color}-100`}>
                        <IconComponent className={`w-5 h-5 text-${module.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription className="text-sm">{module.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-emerald-600">
                      {module.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">完成度</span>
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} variant={module.color as any} />
                    <div className="grid grid-cols-2 gap-2">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                          <div className={`w-1 h-1 rounded-full bg-${module.color}-500`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link href={module.href}>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        进入模块
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 服务渠道和工单管理 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 服务渠道统计 */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeadphonesIcon className="w-5 h-5" />
                服务渠道统计
              </CardTitle>
              <CardDescription>各渠道服务量和满意度统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceChannels.map((channel, index) => {
                  const IconComponent = channel.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800">{channel.name}</h4>
                          <p className="text-sm text-slate-600">{channel.count}次服务</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                          <span className="font-medium text-slate-800">{channel.satisfaction}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 最近工单 */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                最近工单
              </CardTitle>
              <CardDescription>最新的客户服务工单处理情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTickets.map((ticket, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="mt-1">
                      {ticket.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      {ticket.type === "warning" && <Clock className="w-4 h-4 text-amber-500" />}
                      {ticket.type === "error" && <AlertCircle className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-800">{ticket.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {ticket.id}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">客户: {ticket.customer}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className={
                            ticket.status === "已解决"
                              ? "text-emerald-600 border-emerald-200"
                              : ticket.status === "处理中"
                                ? "text-blue-600 border-blue-200"
                                : "text-amber-600 border-amber-200"
                          }
                        >
                          {ticket.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            ticket.priority === "紧急"
                              ? "text-red-600 border-red-200"
                              : ticket.priority === "高"
                                ? "text-amber-600 border-amber-200"
                                : "text-slate-600 border-slate-200"
                          }
                        >
                          {ticket.priority}
                        </Badge>
                        <span className="text-xs text-slate-400">{ticket.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 客户洞察 */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              客户洞察
            </CardTitle>
            <CardDescription>客户服务数据分析和业务洞察</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customerInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="mt-1">
                    {insight.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                    {insight.type === "info" && <Activity className="w-4 h-4 text-blue-500" />}
                    {insight.type === "warning" && <AlertCircle className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">{insight.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{insight.description}</p>
                    <p className="text-xs text-slate-400 mt-2">{insight.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
