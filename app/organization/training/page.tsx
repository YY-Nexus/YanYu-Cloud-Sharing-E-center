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
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Play,
  CheckCircle,
  Target,
  BarChart3,
  Star,
  Download,
  Eye,
} from "lucide-react"

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchTerm, setSearchTerm] = useState("")

  // 培训统计数据
  const trainingStats = [
    {
      title: "课程总数",
      value: "89",
      change: "+6",
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "学习人数",
      value: "1,247",
      change: "+45",
      icon: <Users className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "完成率",
      value: "87.5%",
      change: "+5.2%",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "培训时长",
      value: "2,456",
      change: "+156",
      icon: <Clock className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  // 课程数据
  const courses = [
    {
      id: 1,
      title: "新员工入职培训",
      category: "入职培训",
      instructor: "HR部门",
      duration: "8小时",
      students: 156,
      rating: 4.8,
      status: "进行中",
      progress: 75,
      description: "帮助新员工快速了解公司文化、制度和工作流程",
      startDate: "2024-01-15",
    },
    {
      id: 2,
      title: "项目管理实战",
      category: "管理技能",
      instructor: "张经理",
      duration: "16小时",
      students: 89,
      rating: 4.9,
      status: "已完成",
      progress: 100,
      description: "提升项目管理能力，掌握敏捷开发方法论",
      startDate: "2024-01-10",
    },
    {
      id: 3,
      title: "数据分析基础",
      category: "技术技能",
      instructor: "李专家",
      duration: "12小时",
      students: 67,
      rating: 4.7,
      status: "即将开始",
      progress: 0,
      description: "学习数据分析基础知识和常用工具使用",
      startDate: "2024-02-01",
    },
    {
      id: 4,
      title: "销售技巧提升",
      category: "业务技能",
      instructor: "王总监",
      duration: "6小时",
      students: 134,
      rating: 4.6,
      status: "进行中",
      progress: 45,
      description: "提升销售沟通技巧和客户关系管理能力",
      startDate: "2024-01-20",
    },
  ]

  // 学员数据
  const students = [
    {
      id: 1,
      name: "张三",
      department: "技术部",
      avatar: "/placeholder.svg?height=40&width=40",
      coursesCompleted: 12,
      totalHours: 96,
      currentCourse: "项目管理实战",
      progress: 85,
      level: "高级",
    },
    {
      id: 2,
      name: "李四",
      department: "销售部",
      avatar: "/placeholder.svg?height=40&width=40",
      coursesCompleted: 8,
      totalHours: 64,
      currentCourse: "销售技巧提升",
      progress: 60,
      level: "中级",
    },
    {
      id: 3,
      name: "王五",
      department: "市场部",
      avatar: "/placeholder.svg?height=40&width=40",
      coursesCompleted: 15,
      totalHours: 120,
      currentCourse: "数据分析基础",
      progress: 30,
      level: "专家",
    },
    {
      id: 4,
      name: "赵六",
      department: "人事部",
      avatar: "/placeholder.svg?height=40&width=40",
      coursesCompleted: 6,
      totalHours: 48,
      currentCourse: "新员工入职培训",
      progress: 100,
      level: "初级",
    },
  ]

  // 学习路径数据
  const learningPaths = [
    {
      id: 1,
      title: "技术专家成长路径",
      description: "从初级开发者到技术专家的完整学习路径",
      courses: 8,
      duration: "6个月",
      students: 45,
      level: "中高级",
      progress: 65,
    },
    {
      id: 2,
      title: "管理者培养计划",
      description: "培养具备领导力和管理能力的优秀管理者",
      courses: 6,
      duration: "4个月",
      students: 23,
      level: "高级",
      progress: 40,
    },
    {
      id: 3,
      title: "销售精英训练营",
      description: "打造高绩效销售团队的专业培训计划",
      courses: 5,
      duration: "3个月",
      students: 67,
      level: "中级",
      progress: 80,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "进行中":
        return "bg-blue-100 text-blue-800"
      case "已完成":
        return "bg-green-100 text-green-800"
      case "即将开始":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "专家":
        return "bg-purple-100 text-purple-800"
      case "高级":
        return "bg-blue-100 text-blue-800"
      case "中级":
        return "bg-green-100 text-green-800"
      case "初级":
        return "bg-gray-100 text-gray-800"
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
            <h1 className="text-2xl font-bold text-gray-900">员工培训发展</h1>
            <p className="text-gray-600 mt-1">课程体系、成长路径追踪和培训效果分析</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              培训报告
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              新增课程
            </Button>
          </div>
        </div>

        {/* 统计指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainingStats.map((stat, index) => (
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
            <TabsTrigger value="courses">课程管理</TabsTrigger>
            <TabsTrigger value="students">学员管理</TabsTrigger>
            <TabsTrigger value="paths">学习路径</TabsTrigger>
            <TabsTrigger value="analytics">培训分析</TabsTrigger>
          </TabsList>

          {/* 课程管理 */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>课程列表</CardTitle>
                    <CardDescription>管理所有培训课程和学习内容</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="搜索课程..."
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                            <Badge variant="outline" className="text-xs mb-2">
                              {course.category}
                            </Badge>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(course.status)}`}>{course.status}</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            {course.instructor}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.students} 学员
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {course.rating}
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">完成进度</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-1" />
                            查看
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Play className="h-4 w-4 mr-1" />
                            开始学习
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 学员管理 */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>学员列表</CardTitle>
                <CardDescription>管理学员学习进度和培训记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <Card key={student.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-900">{student.name}</h3>
                              <p className="text-sm text-gray-600 mb-1">{student.department}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>已完成 {student.coursesCompleted} 门课程</span>
                                <span>学习 {student.totalHours} 小时</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`text-xs mb-2 ${getLevelColor(student.level)}`}>{student.level}</Badge>
                            <div className="text-sm text-gray-600 mb-2">当前课程：{student.currentCourse}</div>
                            <div className="flex items-center gap-2">
                              <Progress value={student.progress} className="w-20 h-2" />
                              <span className="text-sm font-medium">{student.progress}%</span>
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

          {/* 学习路径 */}
          <TabsContent value="paths" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>学习路径</CardTitle>
                <CardDescription>系统化的职业发展和技能提升路径</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {learningPaths.map((path) => (
                    <Card key={path.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{path.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {path.level}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {path.courses} 门课程
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {path.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {path.students} 学员
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {path.progress}% 完成
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">整体进度</span>
                            <span className="font-medium">{path.progress}%</span>
                          </div>
                          <Progress value={path.progress} className="h-2" />
                        </div>

                        <Button variant="outline" className="w-full bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          查看详情
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 培训分析 */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    培训效果分析
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">平均完成率</span>
                      <span className="font-semibold">87.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">平均满意度</span>
                      <span className="font-semibold">4.7/5.0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">知识掌握度</span>
                      <span className="font-semibold">82.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">技能提升度</span>
                      <span className="font-semibold">78.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    部门参与度
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">技术部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="font-semibold">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">销售部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="font-semibold">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">市场部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="w-20 h-2" />
                        <span className="font-semibold">78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">人事部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-20 h-2" />
                        <span className="font-semibold">95%</span>
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
