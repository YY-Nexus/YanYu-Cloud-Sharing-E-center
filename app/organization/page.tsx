"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Building2,
  UserCheck,
  Zap,
  DollarSign,
  Clock,
  Target,
  ArrowRight,
  Activity,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function OrganizationPage() {
  const orgMetrics = [
    {
      title: "员工总数",
      value: "1,247",
      change: "+23",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "部门数量",
      value: "18",
      change: "+2",
      trend: "up",
      icon: Building2,
      color: "amber",
    },
    {
      title: "入职率",
      value: "95.2%",
      change: "+2.1%",
      trend: "up",
      icon: UserCheck,
      color: "emerald",
    },
    {
      title: "员工满意度",
      value: "4.6/5",
      change: "+0.2",
      trend: "up",
      icon: Target,
      color: "purple",
    },
  ]

  const orgModules = [
    {
      title: "组织架构设计",
      description: "层级梳理、岗位配置、职责划分",
      icon: Building2,
      href: "/organization/structure",
      color: "blue",
      status: "正常运行",
      progress: 92,
      features: ["组织图谱", "岗位管理", "职责分工", "汇报关系"],
    },
    {
      title: "人才招聘体系",
      description: "渠道管理、简历智能筛选、面试流程",
      icon: UserCheck,
      href: "/organization/recruitment",
      color: "emerald",
      status: "正常运行",
      progress: 88,
      features: ["招聘渠道", "简历筛选", "面试安排", "入职流程"],
    },
    {
      title: "员工培训发展",
      description: "课程体系、成长路径追踪、技能评估",
      icon: Zap,
      href: "/organization/training",
      color: "amber",
      status: "正常运行",
      progress: 85,
      features: ["培训课程", "技能评估", "成长路径", "证书管理"],
    },
    {
      title: "人力成本核算",
      description: "薪资社保、预算管控、成本分析",
      icon: DollarSign,
      href: "/organization/cost",
      color: "purple",
      status: "正常运行",
      progress: 95,
      features: ["薪资管理", "社保公积金", "成本分析", "预算控制"],
    },
    {
      title: "员工关系管理",
      description: "员工满意度、离职分析、团队建设",
      icon: Users,
      href: "/organization/relations",
      color: "blue",
      status: "正常运行",
      progress: 90,
      features: ["满意度调研", "离职分析", "团队建设", "员工关怀"],
    },
    {
      title: "考勤管理",
      description: "打卡统计、请假审批、排班管理",
      icon: Clock,
      href: "/organization/attendance",
      color: "emerald",
      status: "正常运行",
      progress: 87,
      features: ["考勤打卡", "请假管理", "排班调度", "加班统计"],
    },
  ]

  const hrActivities = [
    {
      title: "新员工入职",
      description: "5名新员工完成入职手续",
      time: "2小时前",
      status: "completed",
      type: "success",
    },
    {
      title: "培训计划启动",
      description: "Q4技能提升培训计划正式启动",
      time: "4小时前",
      status: "running",
      type: "info",
    },
    {
      title: "薪资发放",
      description: "11月份薪资已完成发放",
      time: "1天前",
      status: "completed",
      type: "success",
    },
    {
      title: "绩效评估",
      description: "部门绩效评估进行中",
      time: "2天前",
      status: "running",
      type: "warning",
    },
  ]

  const departmentStats = [
    { name: "技术部", count: 245, growth: "+12" },
    { name: "销售部", count: 189, growth: "+8" },
    { name: "市场部", count: 156, growth: "+5" },
    { name: "运营部", count: 134, growth: "+3" },
    { name: "财务部", count: 89, growth: "+2" },
    { name: "人事部", count: 67, growth: "+1" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">组织管理</h1>
              <p className="text-slate-600 mt-2">全方位人力资源管理体系</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                <Activity className="w-3 h-3 mr-1" />
                人事系统正常
              </Badge>
            </div>
          </div>
        </div>

        {/* 组织指标概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orgMetrics.map((metric, index) => {
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

        {/* 组织管理模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {orgModules.map((module, index) => {
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

        {/* 人事活动和部门统计 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 人事活动 */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                人事活动
              </CardTitle>
              <CardDescription>最新人事动态和重要事件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hrActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="mt-1">
                      {activity.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      {activity.type === "info" && <Activity className="w-4 h-4 text-blue-500" />}
                      {activity.type === "warning" && <AlertCircle className="w-4 h-4 text-amber-500" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{activity.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-slate-400 mt-2">{activity.time}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        activity.status === "completed"
                          ? "text-emerald-600 border-emerald-200"
                          : activity.status === "running"
                            ? "text-blue-600 border-blue-200"
                            : "text-amber-600 border-amber-200"
                      }
                    >
                      {activity.status === "completed" ? "已完成" : activity.status === "running" ? "进行中" : "待处理"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 部门统计 */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                部门人员统计
              </CardTitle>
              <CardDescription>各部门人员分布和增长情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">{dept.name}</h4>
                        <p className="text-sm text-slate-600">{dept.count}人</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                        {dept.growth}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
