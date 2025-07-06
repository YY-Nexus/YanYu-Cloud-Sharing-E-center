"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, TrendingUp, Users, MessageSquare, AlertTriangle, Award, Calendar, BarChart3 } from "lucide-react"

export default function EmployeeRelationsPage() {
  const satisfactionData = [
    { department: "技术部", score: 4.2, trend: "up", employees: 45 },
    { department: "销售部", score: 3.8, trend: "down", employees: 32 },
    { department: "市场部", score: 4.0, trend: "up", employees: 28 },
    { department: "人事部", score: 4.5, trend: "stable", employees: 15 },
  ]

  const turnoverAnalysis = [
    { month: "2024-01", voluntary: 3, involuntary: 1, total: 4 },
    { month: "2024-02", voluntary: 2, involuntary: 0, total: 2 },
    { month: "2024-03", voluntary: 5, involuntary: 2, total: 7 },
  ]

  const teamActivities = [
    { name: "团队建设活动", date: "2024-01-20", participants: 85, status: "已完成" },
    { name: "员工生日会", date: "2024-01-25", participants: 25, status: "进行中" },
    { name: "部门聚餐", date: "2024-02-01", participants: 40, status: "计划中" },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">员工关系管理</h1>
          <p className="text-slate-600 mt-2">员工满意度、离职分析、团队建设</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <MessageSquare className="h-4 w-4" />
            满意度调研
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            安排活动
          </Button>
        </div>
      </div>

      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">整体满意度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">4.1</span>
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-xs text-slate-600 mt-1">较上月提升 0.2</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">月离职率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">2.3%</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-xs text-slate-600 mt-1">低于行业平均</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">团建参与率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">78%</span>
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-xs text-slate-600 mt-1">较上月提升 5%</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">员工建议</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">12</span>
              <MessageSquare className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-xs text-slate-600 mt-1">待处理建议</p>
          </CardContent>
        </Card>
      </div>

      {/* 详细分析 */}
      <Tabs defaultValue="satisfaction" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="satisfaction">满意度分析</TabsTrigger>
          <TabsTrigger value="turnover">离职分析</TabsTrigger>
          <TabsTrigger value="activities">团队建设</TabsTrigger>
        </TabsList>

        <TabsContent value="satisfaction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                部门满意度分析
              </CardTitle>
              <CardDescription>各部门员工满意度评分和趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {satisfactionData.map((dept, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{dept.department}</span>
                        <Badge variant="outline">{dept.employees} 人</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{dept.score}</span>
                        {dept.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {dept.trend === "down" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                    </div>
                    <Progress value={dept.score * 20} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="turnover" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                离职趋势分析
              </CardTitle>
              <CardDescription>员工离职原因分析和趋势预测</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {turnoverAnalysis.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{item.month}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-slate-600">主动离职: {item.voluntary}</span>
                        <span className="text-slate-600">被动离职: {item.involuntary}</span>
                      </div>
                    </div>
                    <Badge variant={item.total <= 2 ? "default" : item.total <= 5 ? "secondary" : "destructive"}>
                      总计 {item.total} 人
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                团队建设活动
              </CardTitle>
              <CardDescription>团队活动安排和参与情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{activity.name}</div>
                        <div className="text-sm text-slate-600">
                          {activity.date} · {activity.participants} 人参与
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        activity.status === "已完成"
                          ? "default"
                          : activity.status === "进行中"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
