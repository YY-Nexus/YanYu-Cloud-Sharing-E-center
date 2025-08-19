"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  AlertTriangle,
  Clock,
  DollarSign,
  Activity,
  Zap,
  RefreshCw,
  Download,
  Eye,
  AlertCircle,
} from "lucide-react"

export function StrategicCommandCenter() {
  const kpiData = [
    {
      title: "营收完成率",
      value: "87.5%",
      target: "100%",
      progress: 87.5,
      trend: "+12.3%",
      status: "good",
      color: "#10B981",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200",
    },
    {
      title: "客户满意度",
      value: "94.2%",
      target: "95%",
      progress: 94.2,
      trend: "+2.1%",
      status: "excellent",
      color: "#3B82F6",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
    },
    {
      title: "员工效率",
      value: "78.9%",
      target: "85%",
      progress: 78.9,
      trend: "+5.7%",
      status: "warning",
      color: "#F59E0B",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
    },
    {
      title: "创新项目",
      value: "23个",
      target: "30个",
      progress: 76.7,
      trend: "+8个",
      status: "good",
      color: "#8B5CF6",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
    },
  ]

  const alertData = [
    {
      title: "系统性能预警",
      description: "服务器CPU使用率超过85%，建议优化资源配置",
      level: "high",
      time: "5分钟前",
      icon: <AlertCircle className="h-4 w-4" />,
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
    },
    {
      title: "客户投诉增加",
      description: "本周客户投诉量较上周增长15%，需关注服务质量",
      level: "medium",
      time: "1小时前",
      icon: <AlertTriangle className="h-4 w-4" />,
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
    },
    {
      title: "库存不足提醒",
      description: "3个产品库存低于安全线，建议及时补货",
      level: "low",
      time: "2小时前",
      icon: <AlertCircle className="h-4 w-4" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
    },
  ]

  const recentActivities = [
    {
      title: "数据分析报告已生成",
      description: "Q4季度业务分析报告已完成，可查看详细数据",
      time: "刚刚",
      icon: <BarChart3 className="h-4 w-4" />,
      status: "success",
    },
    {
      title: "新员工入职流程启动",
      description: "技术部门3名新员工入职流程已启动",
      time: "10分钟前",
      icon: <Users className="h-4 w-4" />,
      status: "progress",
    },
    {
      title: "营销活动效果评估",
      description: "双十一活动ROI分析完成，整体效果良好",
      time: "30分钟前",
      icon: <Target className="h-4 w-4" />,
      status: "success",
    },
    {
      title: "风险评估更新",
      description: "市场风险等级调整为中等，需持续关注",
      time: "1小时前",
      icon: <AlertTriangle className="h-4 w-4" />,
      status: "warning",
    },
  ]

  const systemStatus = [
    { name: "数据采集系统", status: "正常", uptime: "99.9%", color: "#10B981" },
    { name: "分析引擎", status: "正常", uptime: "99.7%", color: "#10B981" },
    { name: "API服务", status: "维护中", uptime: "98.5%", color: "#F59E0B" },
    { name: "存储系统", status: "正常", uptime: "99.8%", color: "#10B981" },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">数据中心</h1>
          <p className="text-slate-600 mt-1">实时监控企业运营核心指标，助力智能决策</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            实时刷新
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent"
          >
            <Eye className="h-4 w-4 mr-2" />
            全屏监控
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* KPI 指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card
            key={index}
            className={cn(
              "relative overflow-hidden border-l-4 hover:shadow-md transition-all duration-300 hover:scale-[1.02] transform-gpu",
              kpi.borderColor,
              kpi.bgColor,
            )}
            style={{ borderLeftColor: kpi.color }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">{kpi.title}</CardTitle>
                <Badge
                  variant={kpi.status === "excellent" ? "default" : kpi.status === "good" ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  {kpi.trend}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className={cn("text-2xl font-bold", kpi.textColor)}>{kpi.value}</span>
                  <span className="text-sm text-slate-500">/ {kpi.target}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>完成进度</span>
                    <span>{kpi.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${kpi.progress}%`,
                        backgroundColor: kpi.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 数据分析面板 */}
        <div className="lg:col-span-2">
          <Card className="h-full border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-200">
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                数据分析面板
              </CardTitle>
              <CardDescription className="text-slate-500">多维度业务数据可视化分析</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-700"
                  >
                    总览
                  </TabsTrigger>
                  <TabsTrigger
                    value="sales"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-700"
                  >
                    销售
                  </TabsTrigger>
                  <TabsTrigger
                    value="operations"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-700"
                  >
                    运营
                  </TabsTrigger>
                  <TabsTrigger
                    value="finance"
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-700"
                  >
                    财务
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="h-64 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 font-medium">数据图表区域</p>
                      <p className="text-sm text-slate-500 mt-1">实时业务数据可视化展示</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="sales" className="space-y-4">
                  <div className="h-64 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 font-medium">销售数据分析</p>
                      <p className="text-sm text-slate-500 mt-1">销售趋势与业绩分析</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="operations" className="space-y-4">
                  <div className="h-64 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 font-medium">运营效率分析</p>
                      <p className="text-sm text-slate-500 mt-1">运营指标与效率监控</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="finance" className="space-y-4">
                  <div className="h-64 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center">
                    <div className="text-center">
                      <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 font-medium">财务数据分析</p>
                      <p className="text-sm text-slate-500 mt-1">财务状况与成本分析</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 右侧信息面板 */}
        <div className="space-y-6">
          {/* 预警信息 */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-200">
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                预警信息
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {alertData.map((alert, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border transition-colors hover:shadow-sm",
                    alert.bgColor,
                    alert.borderColor,
                  )}
                >
                  <div className={cn("mt-0.5", alert.textColor)}>{alert.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium truncate", alert.textColor)}>{alert.title}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.description}</p>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 系统状态 */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-200">
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <Activity className="h-5 w-5 text-blue-600" />
                系统状态
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {systemStatus.map((system, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: system.color }} />
                    <div>
                      <div className="font-medium text-sm text-slate-700">{system.name}</div>
                      <div className="text-xs text-slate-500">{system.status}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-700">{system.uptime}</div>
                    <div className="text-xs text-slate-500">运行时间</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 最近活动 */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-200">
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <Clock className="h-5 w-5 text-blue-600" />
                最近活动
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white",
                      activity.status === "success"
                        ? "bg-emerald-500"
                        : activity.status === "warning"
                          ? "bg-amber-500"
                          : activity.status === "progress"
                            ? "bg-blue-500"
                            : "bg-slate-500",
                    )}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{activity.title}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{activity.description}</p>
                    <p className="text-xs text-slate-400 mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
