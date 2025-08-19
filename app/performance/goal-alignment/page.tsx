import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Target,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Building2,
  BarChart3,
} from "lucide-react"

export default function GoalAlignmentPage() {
  const strategicGoals = [
    {
      id: 1,
      title: "年度营收增长30%",
      category: "财务目标",
      owner: "CEO",
      progress: 78,
      status: "on-track",
      deadline: "2024-12-31",
      subGoals: 12,
    },
    {
      id: 2,
      title: "客户满意度提升至95%",
      category: "客户目标",
      owner: "客服总监",
      progress: 85,
      status: "ahead",
      deadline: "2024-12-31",
      subGoals: 8,
    },
    {
      id: 3,
      title: "产品创新项目完成5个",
      category: "创新目标",
      owner: "技术总监",
      progress: 60,
      status: "at-risk",
      deadline: "2024-12-31",
      subGoals: 15,
    },
    {
      id: 4,
      title: "员工培训覆盖率100%",
      category: "人才目标",
      owner: "HR总监",
      progress: 92,
      status: "on-track",
      deadline: "2024-12-31",
      subGoals: 6,
    },
  ]

  const departmentGoals = [
    {
      department: "销售部",
      manager: "张经理",
      totalGoals: 24,
      completedGoals: 18,
      progress: 89,
      status: "excellent",
      keyGoals: ["月度销售额增长25%", "新客户开发50个", "客户续约率90%"],
    },
    {
      department: "技术部",
      manager: "李经理",
      totalGoals: 18,
      completedGoals: 14,
      progress: 82,
      status: "good",
      keyGoals: ["产品功能迭代12次", "系统稳定性99.9%", "代码质量提升20%"],
    },
    {
      department: "市场部",
      manager: "王经理",
      totalGoals: 15,
      completedGoals: 11,
      progress: 76,
      status: "good",
      keyGoals: ["品牌曝光量增长40%", "营销ROI提升15%", "活动执行12场"],
    },
    {
      department: "客服部",
      manager: "陈经理",
      totalGoals: 12,
      completedGoals: 8,
      progress: 68,
      status: "needs-improvement",
      keyGoals: ["响应时间<30秒", "满意度>95%", "投诉处理率100%"],
    },
  ]

  const individualGoals = [
    {
      id: 1,
      employee: "张三",
      department: "销售部",
      position: "销售经理",
      goals: 8,
      completed: 6,
      progress: 85,
      rating: 4.2,
      status: "on-track",
    },
    {
      id: 2,
      employee: "李四",
      department: "技术部",
      position: "高级工程师",
      goals: 6,
      completed: 5,
      progress: 90,
      rating: 4.5,
      status: "ahead",
    },
    {
      id: 3,
      employee: "王五",
      department: "市场部",
      position: "市场专员",
      goals: 7,
      completed: 4,
      progress: 65,
      rating: 3.8,
      status: "at-risk",
    },
    {
      id: 4,
      employee: "赵六",
      department: "客服部",
      position: "客服主管",
      goals: 5,
      completed: 4,
      progress: 88,
      rating: 4.1,
      status: "on-track",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ahead":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">超前</Badge>
      case "on-track":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">正常</Badge>
      case "at-risk":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">风险</Badge>
      case "behind":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">滞后</Badge>
      case "excellent":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">优秀</Badge>
      case "good":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">良好</Badge>
      case "needs-improvement":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">待改进</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">目标拆解与对齐</h1>
            <p className="text-muted-foreground">战略目标分解和部门个人指标对齐管理</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新建目标
          </Button>
        </div>

        {/* 概览指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">战略目标</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                个目标 <span className="text-green-600">9个</span> 正常进行
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">部门目标</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">69</div>
              <p className="text-xs text-muted-foreground">
                个目标 <span className="text-blue-600">51个</span> 已完成
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">个人目标</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">
                个目标 <span className="text-purple-600">187个</span> 进行中
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">对齐度</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">
                目标对齐 <span className="text-green-600">+5%</span> 较上月
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="strategic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="strategic">战略目标</TabsTrigger>
            <TabsTrigger value="department">部门目标</TabsTrigger>
            <TabsTrigger value="individual">个人目标</TabsTrigger>
            <TabsTrigger value="alignment">对齐分析</TabsTrigger>
          </TabsList>

          <TabsContent value="strategic" className="space-y-6">
            {/* 搜索和筛选 */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索战略目标..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
            </div>

            {/* 战略目标列表 */}
            <div className="grid gap-4 md:grid-cols-2">
              {strategicGoals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      {getStatusBadge(goal.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{goal.category}</Badge>
                      <span className="text-sm text-muted-foreground">负责人: {goal.owner}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>完成进度</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">子目标</p>
                        <p className="font-medium">{goal.subGoals}个</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">截止日期</p>
                        <p className="font-medium">{goal.deadline}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="department" className="space-y-6">
            <div className="space-y-4">
              {departmentGoals.map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-blue-600" />
                          {dept.department}
                        </CardTitle>
                        <CardDescription>负责人：{dept.manager}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(dept.status)}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">目标完成情况</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>完成进度</span>
                            <span className="font-medium">{dept.progress}%</span>
                          </div>
                          <Progress value={dept.progress} className="h-2" />
                          <div className="text-sm text-muted-foreground">
                            {dept.completedGoals}/{dept.totalGoals} 个目标已完成
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-gray-900 mb-3">关键目标</h4>
                        <div className="space-y-2">
                          {dept.keyGoals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              <span className="text-sm">{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="individual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>个人目标管理</CardTitle>
                <CardDescription>员工个人目标设定和完成情况</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>员工</TableHead>
                      <TableHead>部门</TableHead>
                      <TableHead>职位</TableHead>
                      <TableHead>目标数量</TableHead>
                      <TableHead>完成进度</TableHead>
                      <TableHead>评分</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {individualGoals.map((goal) => (
                      <TableRow key={goal.id}>
                        <TableCell className="font-medium">{goal.employee}</TableCell>
                        <TableCell>{goal.department}</TableCell>
                        <TableCell>{goal.position}</TableCell>
                        <TableCell>
                          {goal.completed}/{goal.goals}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={goal.progress} className="w-16 h-2" />
                            <span className="text-sm">{goal.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{goal.rating}</span>
                            <span className="text-sm text-muted-foreground">/5.0</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(goal.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alignment" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>目标对齐度分析</CardTitle>
                  <CardDescription>各层级目标对齐情况统计</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">战略-部门对齐</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">部门-个人对齐</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">跨部门协同</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">整体对齐度</span>
                      <span className="text-sm font-medium">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>对齐问题识别</CardTitle>
                  <CardDescription>需要关注的对齐问题和建议</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900">跨部门协同不足</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          销售部和技术部的目标缺乏有效协同，建议增加联合目标
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">个人目标细化</h4>
                        <p className="text-sm text-blue-700 mt-1">部分员工的个人目标过于宽泛，建议进一步细化和量化</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">对齐度提升</h4>
                        <p className="text-sm text-green-700 mt-1">本月目标对齐度较上月提升5%，整体趋势良好</p>
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
