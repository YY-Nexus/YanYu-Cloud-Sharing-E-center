"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Users, Target, Star, BarChart3, ArrowRight, Cloud, TrendingUp, Activity } from "lucide-react"
import Link from "next/link"

export default function DataCenterPage() {
  const dataMetrics = [
    {
      title: "数据处理量",
      value: "2.4TB",
      change: "+12%",
      description: "较上月增长",
      icon: BarChart3,
      color: "blue",
    },
    {
      title: "活跃用户",
      value: "1,247",
      change: "+8%",
      description: "本月新增",
      icon: Users,
      color: "amber",
    },
    {
      title: "任务完成率",
      value: "94.2%",
      change: "+5%",
      description: "效率提升",
      icon: Target,
      color: "blue",
    },
    {
      title: "客户满意度",
      value: "4.8",
      change: "+0.3",
      description: "五星评价",
      icon: Star,
      color: "blue",
    },
  ]

  const coreModules = [
    {
      title: "数据中心",
      description: "数据分析决策",
      icon: BarChart3,
      href: "/data-center/collection",
      color: "emerald",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "组织管理",
      description: "人力资源体系",
      icon: Users,
      href: "/organization",
      color: "amber",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "绩效激励",
      description: "目标考核体系",
      icon: Target,
      href: "/performance",
      color: "amber",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 欢迎区域 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-8 text-white">
          <div className="relative z-10 flex items-center justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">欢迎使用 YanYu Cloud Sharing E-center</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                智能管理系统，为您的企业提供全方位的数据分析、组织管理、绩效激励等解决方案
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8">
                  开始探索
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-8 bg-transparent"
                >
                  查看文档
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <Cloud className="w-32 h-32 text-blue-300 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-30" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
        </div>

        {/* 数据指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <Card key={index} className="hover-lift border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <Badge variant="secondary" className="text-emerald-600">
                      {metric.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{metric.title}</p>
                    <p className="text-3xl font-bold text-slate-800 mb-1">{metric.value}</p>
                    <p className="text-sm text-slate-500">{metric.description}</p>
                  </div>
                  <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: "75%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 核心功能模块 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">核心功能模块</h2>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              查看全部
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreModules.map((module, index) => {
              const IconComponent = module.icon
              return (
                <Link key={index} href={module.href}>
                  <Card className="hover-lift border-l-4 border-l-blue-500 cursor-pointer transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${module.bgColor}`}>
                          <IconComponent className={`w-8 h-8 ${module.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-1">{module.title}</h3>
                          <p className="text-sm text-slate-600">{module.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-emerald-600 font-medium">运行中</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* 快速操作区域 */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              快速操作
            </CardTitle>
            <CardDescription>常用功能快速入口，提升工作效率</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/data-center/collection">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 bg-transparent">
                  <Database className="w-5 h-5" />
                  <span className="text-sm">数据采集</span>
                </Button>
              </Link>
              <Link href="/data-center/visualization">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 bg-transparent">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm">数据可视化</span>
                </Button>
              </Link>
              <Link href="/data-center/security-audit">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 bg-transparent">
                  <Activity className="w-5 h-5" />
                  <span className="text-sm">安全审计</span>
                </Button>
              </Link>
              <Link href="/data-center/quality">
                <Button variant="outline" className="w-full h-16 flex-col gap-2 bg-transparent">
                  <Target className="w-5 h-5" />
                  <span className="text-sm">质量管理</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
