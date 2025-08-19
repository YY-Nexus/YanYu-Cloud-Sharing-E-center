"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Building2,
  UserPlus,
  GraduationCap,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Plus,
  Edit,
  Eye,
  ArrowRight,
} from "lucide-react"

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // 核心指标数据
  const coreMetrics = [
    {
      title: "总员工数",
      value: "1,247",
      change: "+12",
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "部门数量",
      value: "28",
      change: "+2",
      changeType: "increase",
      icon: <Building2 className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "本月入职",
      value: "45",
      change: "+8",
      changeType: "increase",
      icon: <UserPlus className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "培训完成率",
      value: "87.5%",
      change: "+5.2%",
      changeType: "increase",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  // 模块导航数据
  const moduleCards = [
    {
      title: "组织架构设计",
      description: "层级梳理、岗位配置",
      href: "/organization/structure",
      icon: <Building2 className="h-6 w-6" />,
      status: "运行中",
      progress: 92,
      stats: "28个部门",
      color: "border-blue-200 hover:border-blue-300",
      bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      title: "人才招聘体系",
      description: "渠道管理、简历智能筛选",
      href: "/organization/recruitment",
      icon: <UserPlus className="h-6 w-6" />,
      status: "活跃",
      progress: 78,
      stats: "156个职位",
      color: "border-green-200 hover:border-green-300",
      bgGradient: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      title: "员工培训发展",
      description: "课程体系、成长路径追踪",
      href: "/organization/training",
      icon: <GraduationCap className="h-6 w-6" />,
      status: "进行中",
      progress: 65,
      stats: "89门课程",
      color: "border-purple-200 hover:border-purple-300",
      bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
    {
      title: "人力成本核算",
      description: "薪资社保、预算管控",
      href: "/organization/cost",
      icon: <DollarSign className="h-6 w-6" />,
      status: "正常",
      progress: 88,
      stats: "¥2.4M预算",
      color: "border-amber-200 hover:border-amber-300",
      bgGradient: "bg-gradient-to-br from-amber-50 to-amber-100",
    },
  ]

  // 部门概览数据
  const departmentOverview = [
    {
      name: "门店配送",
      employees: 342,
      subDepartments: ["营销部", "营运部", "管理部", "营业部"],
      manager: "张经理",
      status: "正常",
      efficiency: 94,
    },
    {
      name: "前厅整理",
      employees: 278,
      subDepartments: ["前台接待", "客户服务"],
      manager: "李经理",
      status: "正常",
      efficiency: 91,
    },
    {
      name: "资源配送",
      employees: 425,
      subDepartments: ["销售部", "客服部", "财务部"],
      manager: "王经理",
      status: "优秀",
      efficiency: 97,
    },
  ]

  // 最近活动数据
  const recentActivities = [
    {
      type: "新增部门",
      description: "创建了数字化转型部",
      time: "2小时前",
      status: "success",
    },
    {
      type: "人员调动",
      description: "张三从营销部调至销售部",
      time: "4小时前",
      status: "info",
    },
    {
      type: "培训完成",
      description: "新员工入职培训第三期结束",
      time: "6小时前",
      status: "success",
    },
    {
      type: "预算审批",
      description: "Q4人力成本预算已通过审批",
      time: "1天前",
      status: "warning",
    },
    {
      type: "招聘进展",
      description: "技术总监岗位收到15份简历",
      time: "2天前",
      status: "info",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">组织管理</h1>
            <p className="text-gray-600 mt-1">人力资源体系管理与优化</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              系统设置
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              新增部门
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
                  <Badge variant={metric.changeType === "increase" ? "default" : "secondary"} className="text-xs">
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
            <TabsTrigger value="departments">部门管理</TabsTrigger>
            <TabsTrigger value="activities">活动日志</TabsTrigger>
          </TabsList>

          {/* 总览标签页 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 组织架构概览 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    组织架构概览
                  </CardTitle>
                  <CardDescription>当前组织结构和层级关系</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                      <div className="font-semibold text-red-800">总部中心</div>
                      <div className="text-xs text-red-600 mt-1">配置合规</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {departmentOverview.map((dept, index) => (
                        <div key={index} className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="font-medium text-red-800 text-sm">{dept.name}</div>
                          <div className="text-xs text-red-600 mt-1">{dept.employees}人</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        查看完整架构图
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 人员统计 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    人员统计分析
                  </CardTitle>
                  <CardDescription>各部门人员分布和变化趋势</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentOverview.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{dept.name}</div>
                          <div className="text-sm text-gray-600">
                            {dept.manager} · {dept.subDepartments.length}个子部门
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{dept.employees}人</div>
                          <Badge variant={dept.status === "优秀" ? "default" : "secondary"} className="text-xs">
                            {dept.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
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

          {/* 部门管理标签页 */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {departmentOverview.map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-blue-600" />
                          {dept.name}
                        </CardTitle>
                        <CardDescription>
                          负责人：{dept.manager} · {dept.employees}名员工
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          编辑
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          查看
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">子部门</h4>
                        <div className="space-y-1">
                          {dept.subDepartments.map((subDept, subIndex) => (
                            <Badge key={subIndex} variant="secondary" className="mr-2 mb-1">
                              {subDept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">运营效率</h4>
                        <div className="flex items-center gap-2">
                          <Progress value={dept.efficiency} className="flex-1" />
                          <span className="text-sm font-medium">{dept.efficiency}%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">状态</h4>
                        <Badge variant={dept.status === "优秀" ? "default" : "secondary"}>{dept.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 活动日志标签页 */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  最近活动
                </CardTitle>
                <CardDescription>组织管理相关的最新操作和变更记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="mt-1">
                        {activity.status === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
                        {activity.status === "info" && <AlertCircle className="h-5 w-5 text-blue-600" />}
                        {activity.status === "warning" && <Clock className="h-5 w-5 text-amber-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{activity.type}</h4>
                          <span className="text-sm text-gray-500">{activity.time}</span>
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
