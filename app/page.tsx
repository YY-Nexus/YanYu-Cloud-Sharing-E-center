"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Database,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  Target,
  ArrowRight,
  Activity,
  Globe,
  Gauge,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const quickStats = [
    {
      title: "数据处理量",
      value: "2.4TB",
      change: "+12%",
      trend: "up",
      icon: Database,
      color: "emerald",
    },
    {
      title: "活跃用户",
      value: "1,247",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "系统性能",
      value: "98.5%",
      change: "+2%",
      trend: "up",
      icon: Gauge,
      color: "amber",
    },
    {
      title: "安全评分",
      value: "A+",
      change: "稳定",
      trend: "stable",
      icon: Shield,
      color: "purple",
    },
  ]

  const moduleCards = [
    {
      title: "数据中心",
      description: "智能数据分析与决策支持",
      icon: BarChart3,
      href: "/data-center/collection",
      color: "emerald",
      features: ["数据采集", "可视化分析", "决策模型", "安全审计"],
      progress: 85,
    },
    {
      title: "组织管理",
      description: "全方位人力资源管理体系",
      icon: Users,
      href: "/organization/structure",
      color: "amber",
      features: ["组织架构", "人才招聘", "培训发展", "成本控制"],
      progress: 78,
    },
    {
      title: "绩效激励",
      description: "科学的目标考核与激励机制",
      icon: Target,
      href: "/performance/goal-alignment",
      color: "amber",
      features: ["目标对齐", "绩效评估", "激励策略", "数据分析"],
      progress: 92,
    },
    {
      title: "客户服务",
      description: "全渠道客户关系管理平台",
      icon: Users,
      href: "/customer-service/info",
      color: "blue",
      features: ["客户信息", "服务流程", "满意度调研", "智能客服"],
      progress: 88,
    },
  ]

  const recentActivities = [
    {
      title: "数据质量检查完成",
      description: "本月数据质量评分提升至98.2%",
      time: "2小时前",
      type: "success",
    },
    {
      title: "新员工入职流程",
      description: "5名新员工完成入职培训",
      time: "4小时前",
      type: "info",
    },
    {
      title: "绩效评估周期开始",
      description: "Q4绩效评估已启动，请及时完成",
      time: "1天前",
      type: "warning",
    },
    {
      title: "客户满意度调研",
      description: "本月客户满意度达到96.5%",
      time: "2天前",
      type: "success",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 欢迎区域 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">欢迎回到 YanYu Cloud</h1>
              <p className="text-slate-600 mt-2">智能管理中心 - 让数据驱动决策，让管理更高效</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                <Activity className="w-3 h-3 mr-1" />
                系统运行正常
              </Badge>
            </div>
          </div>
        </div>

        {/* 快速统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} variant={stat.color as any} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                      <p
                        className={`text-sm mt-1 ${
                          stat.trend === "up"
                            ? "text-emerald-600"
                            : stat.trend === "down"
                              ? "text-red-600"
                              : "text-slate-500"
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 主要功能模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {moduleCards.map((module, index) => {
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
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{module.progress}%</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={module.progress} variant={module.color as any} />
                    <div className="grid grid-cols-2 gap-2">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${module.color}-500`} />
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

        {/* 最近活动和系统状态 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 最近活动 */}
          <div className="lg:col-span-2">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  最近活动
                </CardTitle>
                <CardDescription>系统最新动态和重要事件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === "success"
                            ? "bg-emerald-500"
                            : activity.type === "warning"
                              ? "bg-amber-500"
                              : activity.type === "error"
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800">{activity.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-slate-400 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 系统状态 */}
          <div>
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  系统状态
                </CardTitle>
                <CardDescription>实时监控系统运行状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU使用率</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} variant="emerald" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>内存使用率</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} variant="blue" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>存储使用率</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} variant="amber" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>网络负载</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} variant="purple" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 快速操作 */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              快速操作
            </CardTitle>
            <CardDescription>常用功能快速入口</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/data-center/collection">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                  <Database className="w-6 h-6" />
                  数据采集
                </Button>
              </Link>
              <Link href="/organization/recruitment">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                  <Users className="w-6 h-6" />
                  人员招聘
                </Button>
              </Link>
              <Link href="/performance/evaluation">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                  <TrendingUp className="w-6 h-6" />
                  绩效评估
                </Button>
              </Link>
              <Link href="/customer-service/satisfaction">
                <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent">
                  <Globe className="w-6 h-6" />
                  客户调研
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
