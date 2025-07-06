"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  UserPlus,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Calendar,
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  Star,
  MapPin,
  GraduationCap,
  Plus,
} from "lucide-react"

export default function RecruitmentPage() {
  const [activeTab, setActiveTab] = useState("positions")
  const [searchTerm, setSearchTerm] = useState("")

  // 招聘统计数据
  const recruitmentStats = [
    {
      title: "活跃职位",
      value: "156",
      change: "+12",
      icon: <Briefcase className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "待处理简历",
      value: "342",
      change: "+28",
      icon: <Users className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "本月入职",
      value: "45",
      change: "+8",
      icon: <UserPlus className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "面试安排",
      value: "89",
      change: "+15",
      icon: <Calendar className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  // 职位数据
  const positions = [
    {
      id: 1,
      title: "高级前端工程师",
      department: "技术部",
      location: "北京",
      salary: "15K-25K",
      experience: "3-5年",
      education: "本科",
      status: "招聘中",
      applicants: 45,
      posted: "2024-01-15",
      urgent: true,
    },
    {
      id: 2,
      title: "产品经理",
      department: "产品部",
      location: "上海",
      salary: "20K-35K",
      experience: "5-8年",
      education: "本科",
      status: "招聘中",
      applicants: 67,
      posted: "2024-01-12",
      urgent: false,
    },
    {
      id: 3,
      title: "市场营销专员",
      department: "营销部",
      location: "广州",
      salary: "8K-12K",
      experience: "1-3年",
      education: "大专",
      status: "暂停",
      applicants: 23,
      posted: "2024-01-10",
      urgent: false,
    },
    {
      id: 4,
      title: "数据分析师",
      department: "数据部",
      location: "深圳",
      salary: "12K-20K",
      experience: "2-4年",
      education: "本科",
      status: "招聘中",
      applicants: 34,
      posted: "2024-01-08",
      urgent: true,
    },
  ]

  // 候选人数据
  const candidates = [
    {
      id: 1,
      name: "张三",
      position: "高级前端工程师",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "5年",
      education: "本科",
      location: "北京",
      status: "待面试",
      score: 85,
      skills: ["React", "Vue", "TypeScript"],
      appliedDate: "2024-01-20",
    },
    {
      id: 2,
      name: "李四",
      position: "产品经理",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "7年",
      education: "硕士",
      location: "上海",
      status: "已面试",
      score: 92,
      skills: ["产品设计", "用户研究", "项目管理"],
      appliedDate: "2024-01-18",
    },
    {
      id: 3,
      name: "王五",
      position: "数据分析师",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "3年",
      education: "本科",
      location: "深圳",
      status: "初筛通过",
      score: 78,
      skills: ["Python", "SQL", "数据可视化"],
      appliedDate: "2024-01-16",
    },
    {
      id: 4,
      name: "赵六",
      position: "市场营销专员",
      avatar: "/placeholder.svg?height=40&width=40",
      experience: "2年",
      education: "大专",
      location: "广州",
      status: "已拒绝",
      score: 65,
      skills: ["市场推广", "活动策划", "社交媒体"],
      appliedDate: "2024-01-14",
    },
  ]

  // 招聘渠道数据
  const channels = [
    { name: "智联招聘", applications: 156, cost: 12000, conversion: 15.2 },
    { name: "前程无忧", applications: 134, cost: 10500, conversion: 18.7 },
    { name: "BOSS直聘", applications: 98, cost: 8000, conversion: 22.4 },
    { name: "拉勾网", applications: 76, cost: 6000, conversion: 19.8 },
    { name: "内推", applications: 45, cost: 2000, conversion: 35.6 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "招聘中":
        return "bg-green-100 text-green-800"
      case "暂停":
        return "bg-yellow-100 text-yellow-800"
      case "已关闭":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getCandidateStatusColor = (status: string) => {
    switch (status) {
      case "待面试":
        return "bg-blue-100 text-blue-800"
      case "已面试":
        return "bg-purple-100 text-purple-800"
      case "初筛通过":
        return "bg-green-100 text-green-800"
      case "已拒绝":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">人才招聘体系</h1>
            <p className="text-gray-600 mt-1">渠道管理、简历智能筛选和招聘流程优化</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出报告
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              发布职位
            </Button>
          </div>
        </div>

        {/* 统计指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recruitmentStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="positions">职位管理</TabsTrigger>
            <TabsTrigger value="candidates">候选人</TabsTrigger>
            <TabsTrigger value="channels">招聘渠道</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
          </TabsList>

          {/* 职位管理 */}
          <TabsContent value="positions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>职位列表</CardTitle>
                    <CardDescription>管理所有招聘职位和申请状态</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="搜索职位..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      筛选
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {positions.map((position) => (
                    <Card key={position.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{position.title}</h3>
                              {position.urgent && (
                                <Badge variant="destructive" className="text-xs">
                                  紧急
                                </Badge>
                              )}
                              <Badge className={`text-xs ${getStatusColor(position.status)}`}>{position.status}</Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {position.department}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {position.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <GraduationCap className="h-4 w-4" />
                                {position.education}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {position.experience}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900 mb-1">{position.salary}</div>
                            <div className="text-sm text-gray-600 mb-2">{position.applicants} 人申请</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                查看
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                沟通
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 候选人管理 */}
          <TabsContent value="candidates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>候选人列表</CardTitle>
                <CardDescription>管理所有候选人信息和面试进度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <Card key={candidate.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                              <p className="text-sm text-gray-600 mb-1">申请：{candidate.position}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{candidate.experience}经验</span>
                                <span>{candidate.education}</span>
                                <span>{candidate.location}</span>
                                <span>申请于 {candidate.appliedDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="font-semibold">{candidate.score}</span>
                              <Badge className={`text-xs ${getCandidateStatusColor(candidate.status)}`}>
                                {candidate.status}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {candidate.skills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                简历
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                面试
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 招聘渠道 */}
          <TabsContent value="channels" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>招聘渠道分析</CardTitle>
                <CardDescription>各渠道效果对比和成本分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channels.map((channel, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-gray-600">
                          <div>
                            <span className="text-gray-500">简历数：</span>
                            <span className="font-medium">{channel.applications}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">成本：</span>
                            <span className="font-medium">¥{channel.cost.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">转化率：</span>
                            <span className="font-medium">{channel.conversion}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-32">
                        <div className="flex justify-between text-sm mb-1">
                          <span>效果</span>
                          <span>{channel.conversion}%</span>
                        </div>
                        <Progress value={channel.conversion} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据分析 */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    招聘趋势
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">本月新增职位</span>
                      <span className="font-semibold">24个</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">平均招聘周期</span>
                      <span className="font-semibold">18天</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">面试通过率</span>
                      <span className="font-semibold">32%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">入职成功率</span>
                      <span className="font-semibold">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    部门需求
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">技术部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-20 h-2" />
                        <span className="font-semibold">45个</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">销售部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="w-20 h-2" />
                        <span className="font-semibold">32个</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">市场部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={40} className="w-20 h-2" />
                        <span className="font-semibold">18个</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">运营部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={30} className="w-20 h-2" />
                        <span className="font-semibold">12个</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
