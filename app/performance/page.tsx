"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  TrendingUp,
  Award,
  BarChart3,
  Eye,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Activity,
  AlertCircle,
  Clock,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function PerformancePage() {
  const performanceMetrics = [
    {
      title: "目标完成率",
      value: "87.5%",
      change: "+5.2%",
      trend: "up",
      icon: Target,
      color: "emerald",
    },
    {
      title: "平均绩效分",
      value: "4.2/5",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "amber",
    },
    {
      title: "参与评估人数",
      value: "1,156",
      change: "+89",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "激励发放率",
      value: "92.8%",
      change: "+2.1%",
      trend: "up",
      icon: Award,
      color: "purple",
    },
  ]

  const performanceModules = [
    {
      title: "目标拆解与对齐",
      description: "战略分解、部门个人指标、OKR管理",
      icon: Target,
      href: "/performance/goal-alignment",
      color: "emerald",
      status: "运行中",
      progress: 92,
      features: ["目标设定", "指标分解", "OKR管理", "进度跟踪"],
    },
    {
      title: "考核流程管理",
      description: "周期设置、评分规则、进度跟踪",
      icon: Calendar,
      href: "/performance/evaluation",
      color: "blue",
      status: "运行中",
      progress: 88,
      features: ["考核周期", "评分标准", "流程管理", "结果统计"],
    },
    {
      title: "激励策略配置",
      description: "奖金晋升、荣誉方案、积分体系",
      icon: Award,
      href: "/performance/incentive",
      color: "amber",
      status: "运行中",
      progress: 85,
      features: ["奖金方案", "晋升通道", "荣誉体系", "积分管理"],
    },
    {
      title: "绩效数据分析",
      description: "结果复盘、改进建议、趋势预测",
      icon: BarChart3,
      href: "/performance/analysis",
      color: "purple",
      status: "运行中",
      progress: 90,
      features: ["数据分析", "趋势预测", "改进建议", "报表生成"],
    },
    {
      title: "360度评估",
      description: "多维度评价、同事互评、上下级评估",
      icon: Eye,
      href: "/performance/360-review",
      color: "blue",
      status: "运行中",
      progress: 87,
      features: ["多维评价", "同事互评", "上级评估", "自我评价"],
    },
  ]

  const evaluationTasks = [
    {
      title: "Q4季度评估",
      description: "第四季度绩效评估进行中",
      deadline: "2024-01-15",
      progress: 75,
      status: "running",
      participants: 245,
    },
    {
      title: "年度目标设定",
      description: "2024年度目标制定",
      deadline: "2024-01-31",
      progress: 45,
      status: "planning",
      participants: 189,
    },
    {
      title: "中层管理评估",
      description: "中层管理人员专项评估",
      deadline: "2024-01-20",
      progress: 90,
      status: "running",
      participants: 56,
    },
  ]

  const topPerformers = [
    { name: "张三", department: "技术部", score: 4.8, rank: 1 },
    { name: "李四", department: "销售部", score: 4.7, rank: 2 },
    { name: "王五", department: "市场部", score: 4.6, rank: 3 },
    { name: "赵六", department: "运营部", score: 4.5, rank: 4 },
    { name: "钱七", department: "财务部", score: 4.4, rank: 5 },
  ]

  const recentActivities = [
    {
      title: "绩效评估启动",
      description: "Q4绩效评估周期正式开始",
      time: "2小时前",
      type: "info",
    },
    {
      title: "目标达成提醒",
      description: "技术部月度目标提前完成",
      time: "4小时前",
      type: "success",
    },
    {
      title: "激励发放",
      description: "11月份绩效奖金已发放",
      time: "1天前",
      type: "success",
    },
    {
      title: "评估逾期提醒",
      description: "部分员工评估表尚未提交",
      time: "2天前",
      type: "warning",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">绩效激励</h1>
              <p className="text-slate-600 mt-2">科学的目标考核与激励机制</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                <Activity className="w-3 h-3 mr-1" />
                评估系统正常
              </Badge>
            </div>
          </div>
        </div>

        {/* 绩效指标概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => {
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

        {/* 绩效管理模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {performanceModules.map((module, index) => {
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

        {/* 评估任务和绩效排行 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 评估任务 */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                评估任务
              </CardTitle>
              <CardDescription>当前进行中的绩效评估任务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluationTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-800">{task.title}</h4>
                      <Badge
                        variant="outline"
                        className={
                          task.status === "running"
                            ? "text-blue-600 border-blue-200"
                            : task.status === "planning"
                              ? "text-amber-600 border-amber-200"
                              : "text-emerald-600 border-emerald-200"
                        }
                      >
                        {task.status === "running" ? "进行中" : task.status === "planning" ? "计划中" : "已完成"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{task.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-500">进度</span>
                      <span className="text-sm font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="mb-3" />
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>参与人数: {task.participants}</span>
                      <span>截止: {task.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 绩效排行 */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                绩效排行榜
              </CardTitle>
              <CardDescription>本月绩效表现优秀员工</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        performer.rank === 1
                          ? "bg-yellow-500"
                          : performer.rank === 2
                            ? "bg-gray-400"
                            : performer.rank === 3
                              ? "bg-amber-600"
                              : "bg-slate-400"
                      }`}
                    >
                      {performer.rank}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{performer.name}</h4>
                      <p className="text-sm text-slate-600">{performer.department}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="font-medium text-slate-800">{performer.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 最近活动 */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              最近活动
            </CardTitle>
            <CardDescription>绩效管理相关的最新动态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
