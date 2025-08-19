"use client"

import type React from "react"

import { useState } from "react"
import {
  Activity,
  Calendar,
  Clock,
  Download,
  FileText,
  Filter,
  Heart,
  Lock,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  Users,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function StarLinkEngine() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">星链引擎</h2>
          <p className="text-blue-300">组织赋能体系 - 构建"人才卫星-部门空间站-集团星系"的协同网络</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px] bg-blue-900/50 text-blue-100 border-blue-700">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本周数据</SelectItem>
              <SelectItem value="month">本月数据</SelectItem>
              <SelectItem value="quarter">本季度数据</SelectItem>
              <SelectItem value="year">本年度数据</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-800">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      </div>

      <Tabs defaultValue="gravity-matrix" className="space-y-4">
        <TabsList className="bg-blue-900/50 text-blue-300">
          <TabsTrigger
            value="gravity-matrix"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.pushState({}, "", "/organization/gravity-matrix")
              }
            }}
          >
            引力矩阵
          </TabsTrigger>
          <TabsTrigger
            value="orbit-calibrator"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.pushState({}, "", "/organization/orbit-calibrator")
              }
            }}
          >
            轨道校准仪
          </TabsTrigger>
          <TabsTrigger
            value="talent-archive"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.pushState({}, "", "/organization/talent-archive")
              }
            }}
          >
            星际档案馆
          </TabsTrigger>
          <TabsTrigger
            value="energy-station"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.pushState({}, "", "/organization/energy-station")
              }
            }}
          >
            能量补给站
          </TabsTrigger>
        </TabsList>

        {/* 引力矩阵（智能排班）*/}
        <TabsContent value="gravity-matrix" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Card className="bg-blue-900/40 border-blue-800 text-white w-full md:w-2/3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-400" />
                  智能排班系统
                </CardTitle>
                <CardDescription className="text-blue-300">
                  基于客流量预测的AI排班系统，自动平衡各区域服务力场
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
                      <Input
                        type="search"
                        placeholder="搜索员工..."
                        className="pl-8 bg-blue-950/60 border-blue-700 text-blue-100 placeholder:text-blue-400"
                      />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-blue-900/50 text-blue-100 border-blue-700">
                      <SelectValue placeholder="选择部门" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有部门</SelectItem>
                      <SelectItem value="front-desk">前台接待</SelectItem>
                      <SelectItem value="housekeeping">客房服务</SelectItem>
                      <SelectItem value="restaurant">餐饮服务</SelectItem>
                      <SelectItem value="security">安保部门</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-800">
                    <Filter className="mr-2 h-4 w-4" />
                    筛选
                  </Button>
                </div>

                <div className="rounded-md border border-blue-800 overflow-hidden">
                  <div className="grid grid-cols-8 bg-blue-950/80 text-xs font-medium text-blue-300 border-b border-blue-800">
                    <div className="px-4 py-3 col-span-2">员工</div>
                    <div className="px-4 py-3">周一</div>
                    <div className="px-4 py-3">周二</div>
                    <div className="px-4 py-3">周三</div>
                    <div className="px-4 py-3">周四</div>
                    <div className="px-4 py-3">周五</div>
                    <div className="px-4 py-3">周末</div>
                  </div>

                  <div className="divide-y divide-blue-800 bg-blue-900/20">
                    {[
                      {
                        name: "张明",
                        avatar: "ZM",
                        department: "前台接待",
                        schedule: ["早班", "早班", "休息", "晚班", "晚班", "休息"],
                      },
                      {
                        name: "李华",
                        avatar: "LH",
                        department: "客房服务",
                        schedule: ["休息", "早班", "早班", "早班", "休息", "晚班"],
                      },
                      {
                        name: "王芳",
                        avatar: "WF",
                        department: "餐饮服务",
                        schedule: ["晚班", "晚班", "休息", "早班", "早班", "休息"],
                      },
                      {
                        name: "赵强",
                        avatar: "ZQ",
                        department: "安保部门",
                        schedule: ["夜班", "夜班", "休息", "休息", "夜班", "夜班"],
                      },
                      {
                        name: "刘婷",
                        avatar: "LT",
                        department: "前台接待",
                        schedule: ["休息", "晚班", "晚班", "休息", "早班", "早班"],
                      },
                    ].map((employee, index) => (
                      <div key={index} className="grid grid-cols-8 text-sm">
                        <div className="px-4 py-3 col-span-2 flex items-center gap-3">
                          <Avatar className="h-8 w-8 bg-blue-800">
                            <AvatarFallback className="bg-blue-700 text-blue-100">{employee.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-blue-100">{employee.name}</div>
                            <div className="text-xs text-blue-400">{employee.department}</div>
                          </div>
                        </div>
                        {employee.schedule.map((shift, idx) => (
                          <div key={idx} className="px-4 py-3 flex items-center">
                            <Badge
                              className={
                                shift === "早班"
                                  ? "bg-cyan-600"
                                  : shift === "晚班"
                                    ? "bg-purple-600"
                                    : shift === "夜班"
                                      ? "bg-indigo-700"
                                      : "bg-gray-600"
                              }
                            >
                              {shift}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-blue-800 pt-4">
                <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-800">
                  <Plus className="mr-2 h-4 w-4" />
                  添加员工
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Settings className="mr-2 h-4 w-4" />
                  调整排班
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-blue-900/40 border-blue-800 text-white w-full md:w-1/3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-blue-400" />
                  客流预测
                </CardTitle>
                <CardDescription className="text-blue-300">未来7天客流量预测与人力需求分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-300">周一</span>
                    <span className="text-blue-100">预计 320 人次</span>
                  </div>
                  <Progress value={64} className="h-2 bg-blue-950 [&>div]:bg-cyan-500" />
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-400">建议人力: 18人</span>
                    <span className="text-green-400">已排班: 18人</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-300">周二</span>
                    <span className="text-blue-100">预计 280 人次</span>
                  </div>
                  <Progress value={56} className="h-2 bg-blue-950 [&>div]:bg-cyan-500" />
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-400">建议人力: 16人</span>
                    <span className="text-green-400">已排班: 16人</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-300">周三</span>
                    <span className="text-blue-100">预计 310 人次</span>
                  </div>
                  <Progress value={62} className="h-2 bg-blue-950 [&>div]:bg-cyan-500" />
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-400">建议人力: 17人</span>
                    <span className="text-yellow-400">已排班: 15人</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-300">周四</span>
                    <span className="text-blue-100">预计 350 人次</span>
                  </div>
                  <Progress value={70} className="h-2 bg-blue-950 [&>div]:bg-cyan-500" />
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-400">建议人力: 20人</span>
                    <span className="text-green-400">已排班: 20人</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-300">周五</span>
                    <span className="text-blue-100">预计 420 人次</span>
                  </div>
                  <Progress value={84} className="h-2 bg-blue-950 [&>div]:bg-cyan-500" />
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-400">建议人力: 24人</span>
                    <span className="text-yellow-400">已排班: 22人</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-300">周末</span>
                    <span className="text-blue-100">预计 580 人次</span>
                  </div>
                  <Progress value={96} className="h-2 bg-blue-950 [&>div]:bg-cyan-500" />
                  <div className="flex justify-between text-xs">
                    <span className="text-blue-400">建议人力: 32人</span>
                    <span className="text-red-400">已排班: 26人</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-950/60 rounded-md border border-blue-800 mt-4">
                  <h3 className="font-medium mb-2 text-sm">AI排班建议</h3>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <div className="h-4 w-4 rounded-full bg-yellow-600 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-[10px]">!</span>
                      </div>
                      <span>周三人力不足，建议从周二调配2名员工</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-4 w-4 rounded-full bg-yellow-600 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-[10px]">!</span>
                      </div>
                      <span>周五晚高峰人力不足，建议增加2名兼职员工</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-4 w-4 rounded-full bg-red-600 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-[10px]">!</span>
                      </div>
                      <span>周末人力严重不足，建议增加6名临时工</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-900/40 border-blue-800 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-400" />
                服务力场分布
              </CardTitle>
              <CardDescription className="text-blue-300">各区域人力分布与服务压力可视化</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-blue-950/80 flex items-center justify-center border border-blue-800">
                <div className="text-center p-6">
                  <Activity className="h-16 w-16 mx-auto text-blue-500 opacity-50" />
                  <p className="mt-4 text-blue-300">服务力场分布热力图</p>
                  <p className="text-xs text-blue-400 mt-2">显示各区域人力密度与客流压力对比</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 轨道校准仪（权限管理）*/}
        <TabsContent value="orbit-calibrator" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Card className="bg-blue-900/40 border-blue-800 text-white w-full md:w-2/3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-blue-400" />
                  权限管理系统
                </CardTitle>
                <CardDescription className="text-blue-300">
                  动态权限分配体系，支持跨部门协作时的临时权限授信
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
                      <Input
                        type="search"
                        placeholder="搜索角色或权限..."
                        className="pl-8 bg-blue-950/60 border-blue-700 text-blue-100 placeholder:text-blue-400"
                      />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-blue-900/50 text-blue-100 border-blue-700">
                      <SelectValue placeholder="选择角色类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有角色</SelectItem>
                      <SelectItem value="system">系统角色</SelectItem>
                      <SelectItem value="department">部门角色</SelectItem>
                      <SelectItem value="project">项目角色</SelectItem>
                      <SelectItem value="temporary">临时角色</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-800">
                    <Filter className="mr-2 h-4 w-4" />
                    筛选
                  </Button>
                </div>

                <div className="rounded-md border border-blue-800 overflow-hidden">
                  <div className="grid grid-cols-12 bg-blue-950/80 text-xs font-medium text-blue-300 border-b border-blue-800">
                    <div className="px-4 py-3 col-span-3">角色名称</div>
                    <div className="px-4 py-3 col-span-2">类型</div>
                    <div className="px-4 py-3 col-span-2">成员数</div>
                    <div className="px-4 py-3 col-span-3">权限范围</div>
                    <div className="px-4 py-3 col-span-2">操作</div>
                  </div>

                  <div className="divide-y divide-blue-800 bg-blue-900/20">
                    {[
                      { name: "系统管理员", type: "系统角色", members: 3, scope: "全部权限", badge: "bg-red-600" },
                      {
                        name: "部门经理",
                        type: "部门角色",
                        members: 8,
                        scope: "部门内全部权限",
                        badge: "bg-orange-600",
                      },
                      { name: "前台主管", type: "部门角色", members: 2, scope: "前台相关权限", badge: "bg-yellow-600" },
                      { name: "客房主管", type: "部门角色", members: 2, scope: "客房相关权限", badge: "bg-yellow-600" },
                      { name: "餐饮主管", type: "部门角色", members: 2, scope: "餐饮相关权限", badge: "bg-yellow-600" },
                      { name: "普通员工", type: "系统角色", members: 42, scope: "基础操作权限", badge: "bg-green-600" },
                      {
                        name: "年终盘点项目组",
                        type: "项目角色",
                        members: 6,
                        scope: "财务查看权限",
                        badge: "bg-blue-600",
                      },
                      {
                        name: "临时客房支援",
                        type: "临时角色",
                        members: 4,
                        scope: "客房有限权限",
                        badge: "bg-purple-600",
                      },
                    ].map((role, index) => (
                      <div key={index} className="grid grid-cols-12 text-sm">
                        <div className="px-4 py-3 col-span-3 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-400" />
                          <span className="font-medium text-blue-100">{role.name}</span>
                        </div>
                        <div className="px-4 py-3 col-span-2">
                          <Badge className={role.badge}>{role.type}</Badge>
                        </div>
                        <div className="px-4 py-3 col-span-2 text-blue-100">{role.members} 人</div>
                        <div className="px-4 py-3 col-span-3 text-blue-300">{role.scope}</div>
                        <div className="px-4 py-3 col-span-2 flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-400 hover:text-blue-100 hover:bg-blue-800"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-400 hover:text-blue-100 hover:bg-blue-800"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-blue-800 pt-4">
                <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-800">
                  <Plus className="mr-2 h-4 w-4" />
                  创建角色
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Settings className="mr-2 h-4 w-4" />
                  权限审计
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-blue-900/40 border-blue-800 text-white w-full md:w-1/3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-blue-400" />
                  临时权限申请
                </CardTitle>
                <CardDescription className="text-blue-300">跨部门协作的临时权限授信系统</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-950/60 rounded-md border border-blue-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">紧急客房支援</h3>
                    <Badge className="bg-yellow-600">待审批</Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-300">申请人:</span>
                      <span className="text-blue-100">李华 (餐饮部)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">申请权限:</span>
                      <span className="text-blue-100">客房管理 (查看/编辑)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">有效期:</span>
                      <span className="text-blue-100">2023-06-15 至 2023-06-17</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">申请原因:</span>
                      <span className="text-blue-100">周末客房部人手不足</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs border-blue-700 text-blue-100 hover:bg-blue-800"
                    >
                      拒绝
                    </Button>
                    <Button size="sm" className="flex-1 h-7 text-xs bg-blue-600 hover:bg-blue-700">
                      批准
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-blue-950/60 rounded-md border border-blue-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">财务数据查询</h3>
                    <Badge className="bg-yellow-600">待审批</Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-300">申请人:</span>
                      <span className="text-blue-100">王芳 (前台部)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">申请权限:</span>
                      <span className="text-blue-100">财务报表 (仅查看)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">有效期:</span>
                      <span className="text-blue-100">2023-06-20 至 2023-06-20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">申请原因:</span>
                      <span className="text-blue-100">月度部门绩效分析</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs border-blue-700 text-blue-100 hover:bg-blue-800"
                    >
                      拒绝
                    </Button>
                    <Button size="sm" className="flex-1 h-7 text-xs bg-blue-600 hover:bg-blue-700">
                      批准
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-blue-950/60 rounded-md border border-blue-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">设备维护权限</h3>
                    <Badge className="bg-green-600">已批准</Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-300">申请人:</span>
                      <span className="text-blue-100">赵强 (安保部)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">申请权限:</span>
                      <span className="text-blue-100">设备管理 (查看/维护)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">有效期:</span>
                      <span className="text-blue-100">2023-06-10 至 2023-06-30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">申请原因:</span>
                      <span className="text-blue-100">安防设备季度检修</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-blue-700 text-blue-100 hover:bg-blue-800">
                  <Plus className="mr-2 h-4 w-4" />
                  申请临时权限
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-900/40 border-blue-800 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-400" />
                权限流转图谱
              </CardTitle>
              <CardDescription className="text-blue-300">可视化展示组织权限结构与临时授权流转</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-blue-950/80 flex items-center justify-center border border-blue-800">
                <div className="text-center p-6">
                  <Activity className="h-16 w-16 mx-auto text-blue-500 opacity-50" />
                  <p className="mt-4 text-blue-300">权限流转图谱加载中...</p>
                  <p className="text-xs text-blue-400 mt-2">展示组织权限结构与临时授权流转路径</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 星际档案馆（人才数据库）*/}
        <TabsContent value="talent-archive" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Card className="bg-blue-900/40 border-blue-800 text-white w-full md:w-2/3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-400" />
                  人才数据库
                </CardTitle>
                <CardDescription className="text-blue-300">
                  员工技能标签库、服务案例库、突发事件处理经验库
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
                      <Input
                        type="search"
                        placeholder="搜索员工或技能..."
                        className="pl-8 bg-blue-950/60 border-blue-700 text-blue-100 placeholder:text-blue-400"
                      />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-blue-900/50 text-blue-100 border-blue-700">
                      <SelectValue placeholder="选择技能类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有技能</SelectItem>
                      <SelectItem value="service">服务技能</SelectItem>
                      <SelectItem value="management">管理技能</SelectItem>
                      <SelectItem value="technical">技术技能</SelectItem>
                      <SelectItem value="language">语言技能</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-800">
                    <Filter className="mr-2 h-4 w-4" />
                    筛选
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "张明",
                      avatar: "ZM",
                      position: "前台经理",
                      skills: ["客户服务", "冲突处理", "英语精通", "日语入门"],
                      experience: "8年",
                      rating: 4.8,
                      cases: 12,
                    },
                    {
                      name: "李华",
                      avatar: "LH",
                      position: "客房主管",
                      skills: ["房务管理", "团队领导", "培训指导", "德语入门"],
                      experience: "6年",
                      rating: 4.7,
                      cases: 8,
                    },
                    {
                      name: "王芳",
                      avatar: "WF",
                      position: "餐饮主管",
                      skills: ["餐饮管理", "酒水知识", "法语入门", "客户关系"],
                      experience: "5年",
                      rating: 4.6,
                      cases: 6,
                    },
                    {
                      name: "赵强",
                      avatar: "ZQ",
                      position: "安保主管",
                      skills: ["安全管理", "应急处理", "冲突调解", "设备维护"],
                      experience: "7年",
                      rating: 4.9,
                      cases: 15,
                    },
                  ].map((employee, index) => (
                    <div key={index} className="bg-blue-950/60 p-4 rounded-lg border border-blue-800">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-700 text-blue-100">{employee.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-blue-100">{employee.name}</div>
                          <div className="text-xs text-blue-400">
                            {employee.position} · {employee.experience}
                          </div>
                        </div>
                        <div className="ml-auto flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm ml-1">{employee.rating}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-xs text-blue-300 mb-1">核心技能</div>
                        <div className="flex flex-wrap gap-1">
                          {employee.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-900/50 text-blue-100 border-blue-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-blue-300">
                        <span>优秀案例: {employee.cases}个</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs text-blue-400 hover:text-blue-100 hover:bg-blue-800"
                        >
                          查看详情
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-blue-800 pt-4">
                <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-800">
                  <Plus className="mr-2 h-4 w-4" />
                  添加员工
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Settings className="mr-2 h-4 w-4" />
                  技能管理
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-blue-900/40 border-blue-800 text-white w-full md:w-1/3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-400" />
                  服务案例库
                </CardTitle>
                <CardDescription className="text-blue-300">优秀服务案例与突发事件处理经验</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-950/60 rounded-md border border-blue-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">VIP客户投诉完美解决</h3>
                    <Badge className="bg-green-600">优秀案例</Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-300">处理人:</span>
                      <span className="text-blue-100">张明 (前台经理)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">事件类型:</span>
                      <span className="text-blue-100">客户投诉</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">解决方案:</span>
                      <span className="text-blue-100">升级房型+餐饮抵用券</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">客户满意度:</span>
                      <span className="text-green-400">非常满意</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 h-7 text-xs text-blue-400 hover:text-blue-100 hover:bg-blue-800"
                  >
                    查看详情
                  </Button>
                </div>

                <div className="p-3 bg-blue-950/60 rounded-md border border-blue-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">突发停电应急处理</h3>
                    <Badge className="bg-purple-600">应急案例</Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-300">处理人:</span>
                      <span className="text-blue-100">赵强 (安保主管)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">事件类型:</span>
                      <span className="text-blue-100">设施故障</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">解决方案:</span>
                      <span className="text-blue-100">启动备用电源+客户安抚</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">处理时间:</span>
                      <span className="text-green-400">10分钟内</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 h-7 text-xs text-blue-400 hover:text-blue-100 hover:bg-blue-800"
                  >
                    查看详情
                  </Button>
                </div>

                <div className="p-3 bg-blue-950/60 rounded-md border border-blue-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">客户特殊需求完美满足</h3>
                    <Badge className="bg-green-600">优秀案例</Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-300">处理人:</span>
                      <span className="text-blue-100">王芳 (餐饮主管)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">事件类型:</span>
                      <span className="text-blue-100">特殊需求</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">解决方案:</span>
                      <span className="text-blue-100">定制餐单+特殊布置</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">客户反馈:</span>
                      <span className="text-green-400">超出预期</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 h-7 text-xs text-blue-400 hover:text-blue-100 hover:bg-blue-800"
                  >
                    查看详情
                  </Button>
                </div>

                <Button variant="outline" className="w-full border-blue-700 text-blue-100 hover:bg-blue-800">
                  <Plus className="mr-2 h-4 w-4" />
                  添加案例
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-900/40 border-blue-800 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-400" />
                技能图谱分析
              </CardTitle>
              <CardDescription className="text-blue-300">组织技能分布与人才发展方向分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-blue-950/80 flex items-center justify-center border border-blue-800">
                <div className="text-center p-6">
                  <Activity className="h-16 w-16 mx-auto text-blue-500 opacity-50" />
                  <p className="mt-4 text-blue-300">技能图谱分析加载中...</p>
                  <p className="text-xs text-blue-400 mt-2">展示组织技能分布与人才发展方向</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 能量补给站（员工关怀）*/}
        <TabsContent value="energy-station" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Card className="bg-blue-900/40 border-blue-800 text-white w-full md:w-2/3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-blue-400" />
                  员工关怀系统
                </CardTitle>
                <CardDescription className="text-blue-300">
                  结合工时数据的健康预警、心理状态监测、紧急医疗通道
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
                      <Input
                        type="search"
                        placeholder="搜索员工..."
                        className="pl-8 bg-blue-950/60 border-blue-700 text-blue-100 placeholder:text-blue-400"
                      />
                    </div>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-blue-900/50 text-blue-100 border-blue-700">
                      <SelectValue placeholder="健康状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="normal">正常</SelectItem>
                      <SelectItem value="warning">需注意</SelectItem>
                      <SelectItem value="alert">需干预</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-800">
                    <Filter className="mr-2 h-4 w-4" />
                    筛选
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "张明",
                      avatar: "ZM",
                      position: "前台经理",
                      workHours: 42,
                      status: "normal",
                      statusText: "正常",
                      energy: 85,
                      restDays: 2,
                      lastRest: "3天前",
                    },
                    {
                      name: "李华",
                      avatar: "LH",
                      position: "客房主管",
                      workHours: 48,
                      status: "warning",
                      statusText: "需注意",
                      energy: 65,
                      restDays: 1,
                      lastRest: "8天前",
                    },
                    {
                      name: "王芳",
                      avatar: "WF",
                      position: "餐饮主管",
                      workHours: 45,
                      status: "normal",
                      statusText: "正常",
                      energy: 78,
                      restDays: 2,
                      lastRest: "4天前",
                    },
                    {
                      name: "赵强",
                      avatar: "ZQ",
                      position: "安保主管",
                      workHours: 52,
                      status: "alert",
                      statusText: "需干预",
                      energy: 45,
                      restDays: 0,
                      lastRest: "12天前",
                    },
                  ].map((employee, index) => (
                    <div key={index} className="bg-blue-950/60 p-4 rounded-lg border border-blue-800">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-700 text-blue-100">{employee.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-blue-100">{employee.name}</div>
                          <div className="text-xs text-blue-400">{employee.position}</div>
                        </div>
                        <Badge
                          className={
                            employee.status === "normal"
                              ? "bg-green-600 ml-auto"
                              : employee.status === "warning"
                                ? "bg-yellow-600 ml-auto"
                                : "bg-red-600 ml-auto"
                          }
                        >
                          {employee.statusText}
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-blue-300">本周工时</span>
                            <span
                              className={
                                employee.workHours <= 40
                                  ? "text-green-400"
                                  : employee.workHours <= 48
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }
                            >
                              {employee.workHours}小时
                            </span>
                          </div>
                          <Progress
                            value={(employee.workHours / 60) * 100}
                            className="h-1 bg-blue-950"
                            style={
                              {
                                "--progress-background":
                                  employee.workHours <= 40
                                    ? "var(--emerald-500)"
                                    : employee.workHours <= 48
                                      ? "var(--amber-500)"
                                      : "var(--rose-500)",
                              } as React.CSSProperties
                            }
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-blue-300">能量值</span>
                            <span
                              className={
                                employee.energy >= 80
                                  ? "text-green-400"
                                  : employee.energy >= 60
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }
                            >
                              {employee.energy}%
                            </span>
                          </div>
                          <Progress
                            value={employee.energy}
                            className="h-1 bg-blue-950"
                            style={
                              {
                                "--progress-background":
                                  employee.energy >= 80
                                    ? "var(--emerald-500)"
                                    : employee.energy >= 60
                                      ? "var(--amber-500)"
                                      : "var(--rose-500)",
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-blue-300">
                        <span>剩余休假: {employee.restDays}天</span>
                        <span>上次休假: {employee.lastRest}</span>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 h-7 text-xs border-blue-700 text-blue-100 hover:bg-blue-800"
                        >
                          查看详情
                        </Button>
                        <Button size="sm" className="flex-1 h-7 text-xs bg-blue-600 hover:bg-blue-700">
                          安排休息
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-blue-800 pt-4">
                <Button variant="outline" className="border-blue-700 text-blue-100 hover:bg-blue-800">
                  <Plus className="mr-2 h-4 w-4" />
                  添加关怀计划
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Heart className="mr-2 h-4 w-4" />
                  团队健康报告
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-blue-900/40 border-blue-800 text-white w-full md:w-1/3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-blue-400" />
                  健康预警
                </CardTitle>
                <CardDescription className="text-blue-300">员工健康状态监测与干预建议</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-950/60 rounded-md border border-red-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1 text-red-400" />
                      <span>高风险预警</span>
                    </h3>
                    <Badge className="bg-red-600">紧急</Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-300">员工:</span>
                      <span className="text-blue-100">赵强 (安保主管)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">连续工作:</span>
                      <span className="text-red-400">12天无休息</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">本周工时:</span>
                      <span className="text-red-400">52小时 (超标)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">能量值:</span>
                      <span className="text-red-400">45% (危险)</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-red-300">
                    <p>建议：立即安排48小时休息，并进行健康评估</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs border-red-700 text-blue-100 hover:bg-red-900/50"
                    >
                      稍后处理
                    </Button>
                    <Button size="sm" className="flex-1 h-7 text-xs bg-red-600 hover:bg-red-700">
                      立即干预
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-blue-950/60 rounded-md border border-yellow-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1 text-yellow-400" />
                      <span>中度风险预警</span>
                    </h3>
                    <Badge className="bg-yellow-600">注意</Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-blue-300">员工:</span>
                      <span className="text-blue-100">李华 (客房主管)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">连续工作:</span>
                      <span className="text-yellow-400">8天无休息</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">本周工时:</span>
                      <span className="text-yellow-400">48小时 (临界)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">能量值:</span>
                      <span className="text-yellow-400">65% (偏低)</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-yellow-300">
                    <p>建议：本周内安排1天休息，减少加班</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs border-yellow-700 text-blue-100 hover:bg-yellow-900/50"
                    >
                      稍后处理
                    </Button>
                    <Button size="sm" className="flex-1 h-7 text-xs bg-yellow-600 hover:bg-yellow-700">
                      安排休息
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-blue-950/60 rounded-md border border-blue-800">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-sm">团队健康状况</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-300">平均工时</span>
                        <span className="text-yellow-400">46.8小时/周</span>
                      </div>
                      <Progress value={(46.8 / 60) * 100} className="h-1 bg-blue-950 [&>div]:bg-yellow-500" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-300">平均能量值</span>
                        <span className="text-yellow-400">68.3%</span>
                      </div>
                      <Progress value={68.3} className="h-1 bg-blue-950 [&>div]:bg-yellow-500" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-300">休假使用率</span>
                        <span className="text-red-400">42.5%</span>
                      </div>
                      <Progress value={42.5} className="h-1 bg-blue-950 [&>div]:bg-red-500" />
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-blue-700 text-blue-100 hover:bg-blue-800">
                  <Plus className="mr-2 h-4 w-4" />
                  查看完整报告
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-900/40 border-blue-800 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-400" />
                团队能量趋势
              </CardTitle>
              <CardDescription className="text-blue-300">团队整体健康状态与能量趋势分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-blue-950/80 flex items-center justify-center border border-blue-800">
                <div className="text-center p-6">
                  <Activity className="h-16 w-16 mx-auto text-blue-500 opacity-50" />
                  <p className="mt-4 text-blue-300">团队能量趋势分析加载中...</p>
                  <p className="text-xs text-blue-400 mt-2">展示团队整体健康状态与能量变化趋势</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
