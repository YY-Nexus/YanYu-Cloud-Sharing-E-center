"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, Users, AlertTriangle, CheckCircle, XCircle, TrendingUp, FileText } from "lucide-react"

export default function AttendancePage() {
  const attendanceStats = [
    { name: "出勤率", value: "96.5%", trend: "up", color: "text-green-600" },
    { name: "迟到率", value: "2.1%", trend: "down", color: "text-red-600" },
    { name: "请假率", value: "1.8%", trend: "stable", color: "text-blue-600" },
    { name: "加班时长", value: "12.3h", trend: "down", color: "text-purple-600" },
  ]

  const leaveRequests = [
    { employee: "张三", type: "年假", days: 3, date: "2024-01-20~22", status: "已批准" },
    { employee: "李四", type: "病假", days: 1, date: "2024-01-18", status: "已批准" },
    { employee: "王五", type: "事假", days: 0.5, date: "2024-01-19", status: "待审批" },
    { employee: "赵六", type: "调休", days: 1, date: "2024-01-21", status: "已拒绝" },
  ]

  const scheduleData = [
    { shift: "早班", time: "08:00-16:00", employees: 25, coverage: "100%" },
    { shift: "中班", time: "16:00-24:00", employees: 18, coverage: "90%" },
    { shift: "夜班", time: "00:00-08:00", employees: 12, coverage: "80%" },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">考勤管理</h1>
          <p className="text-slate-600 mt-2">打卡统计、请假审批、排班管理</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            导出报表
          </Button>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            排班设置
          </Button>
        </div>
      </div>

      {/* 考勤统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                {stat.trend === "up" && <TrendingUp className="h-5 w-5 text-green-500" />}
                {stat.trend === "down" && <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />}
                {stat.trend === "stable" && <div className="w-5 h-5" />}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {stat.trend === "up" ? "较上月上升" : stat.trend === "down" ? "较上月下降" : "与上月持平"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 考勤管理详情 */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">考勤统计</TabsTrigger>
          <TabsTrigger value="leave">请假管理</TabsTrigger>
          <TabsTrigger value="schedule">排班管理</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                今日考勤概览
              </CardTitle>
              <CardDescription>实时考勤状态和异常情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">142</div>
                  <div className="text-sm text-slate-600">正常出勤</div>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">8</div>
                  <div className="text-sm text-slate-600">迟到早退</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-slate-600">缺勤异常</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                请假申请管理
              </CardTitle>
              <CardDescription>员工请假申请审批和统计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests.map((request, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{request.employee}</div>
                        <div className="text-sm text-slate-600">
                          {request.type} · {request.days} 天 · {request.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          request.status === "已批准"
                            ? "default"
                            : request.status === "待审批"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {request.status}
                      </Badge>
                      {request.status === "待审批" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            拒绝
                          </Button>
                          <Button size="sm">批准</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                班次安排
              </CardTitle>
              <CardDescription>员工排班和班次覆盖情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleData.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{schedule.shift}</div>
                        <div className="text-sm text-slate-600">{schedule.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{schedule.employees} 人</div>
                        <div className="text-sm text-slate-600">覆盖率 {schedule.coverage}</div>
                      </div>
                      <Button size="sm" variant="outline">
                        调整
                      </Button>
                    </div>
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
