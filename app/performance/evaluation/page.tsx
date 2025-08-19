import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Search, Filter, Plus, Edit, Eye, CheckCircle, Clock, Users, FileText, Star } from "lucide-react"

export default function EvaluationPage() {
  const evaluationCycles = [
    {
      id: 1,
      name: "2024年Q4季度考核",
      type: "季度考核",
      status: "active",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      participants: 156,
      completed: 89,
      progress: 57,
    },
    {
      id: 2,
      name: "2024年度综合考核",
      type: "年度考核",
      status: "planning",
      startDate: "2024-12-01",
      endDate: "2025-01-31",
      participants: 234,
      completed: 0,
      progress: 0,
    },
    {
      id: 3,
      name: "新员工试用期考核",
      type: "试用期考核",
      status: "active",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      participants: 12,
      completed: 8,
      progress: 67,
    },
    {
      id: 4,
      name: "2024年Q3季度考核",
      type: "季度考核",
      status: "completed",
      startDate: "2024-07-01",
      endDate: "2024-09-30",
      participants: 145,
      completed: 145,
      progress: 100,
    },
  ]

  const evaluationRules = [
    {
      id: 1,
      name: "销售部考核规则",
      department: "销售部",
      criteria: ["销售业绩", "客户满意度", "团队协作", "学习成长"],
      weights: [40, 25, 20, 15],
      ratingScale: "5分制",
      status: "active",
    },
    {
      id: 2,
      name: "技术部考核规则",
      department: "技术部",
      criteria: ["技术能力", "项目交付", "代码质量", "创新贡献"],
      weights: [35, 30, 20, 15],
      ratingScale: "5分制",
      status: "active",
    },
    {
      id: 3,
      name: "管理层考核规则",
      department: "管理层",
      criteria: ["战略执行", "团队管理", "业务结果", "领导力"],
      weights: [30, 25, 25, 20],
      ratingScale: "5分制",
      status: "active",
    },
  ]

  const evaluationProgress = [
    {
      employee: "张三",
      department: "销售部",
      evaluator: "张经理",
      status: "completed",
      score: 4.2,
      submitDate: "2024-11-15",
      reviewDate: "2024-11-18",
    },
    {
      employee: "李四",
      department: "技术部",
      evaluator: "李经理",
      status: "in-review",
      score: null,
      submitDate: "2024-11-16",
      reviewDate: null,
    },
    {
      employee: "王五",
      department: "市场部",
      evaluator: "王经理",
      status: "pending",
      score: null,
      submitDate: null,
      reviewDate: null,
    },
    {
      employee: "赵六",
      department: "客服部",
      evaluator: "陈经理",
      status: "completed",
      score: 3.8,
      submitDate: "2024-11-14",
      reviewDate: "2024-11-17",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">进行中</Badge>
      case "planning":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">计划中</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">已完成</Badge>
      case "in-review":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">审核中</Badge>
      case "pending":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">待提交</Badge>
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
            <h1 className="text-3xl font-bold tracking-tight">考核流程管理</h1>
            <p className="text-muted-foreground">周期设置、评分规则和进度跟踪管理</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            创建考核
          </Button>
        </div>

        {/* 概览指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃考核</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                个考核周期 <span className="text-green-600">2个</span> 进行中
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">参与人数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">168</div>
              <p className="text-xs text-muted-foreground">
                名员工 <span className="text-blue-600">97名</span> 已完成
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">完成率</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58%</div>
              <p className="text-xs text-muted-foreground">
                整体完成 <span className="text-purple-600">+12%</span> 较上周
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均评分</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.1</div>
              <p className="text-xs text-muted-foreground">
                /5.0 <span className="text-green-600">+0.2</span> 较上期
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cycles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="cycles">考核周期</TabsTrigger>
            <TabsTrigger value="rules">评分规则</TabsTrigger>
            <TabsTrigger value="progress">进度跟踪</TabsTrigger>
            <TabsTrigger value="templates">考核模板</TabsTrigger>
          </TabsList>

          <TabsContent value="cycles" className="space-y-6">
            {/* 搜索和筛选 */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索考核周期..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
            </div>

            {/* 考核周期列表 */}
            <div className="grid gap-4 md:grid-cols-2">
              {evaluationCycles.map((cycle) => (
                <Card key={cycle.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{cycle.name}</CardTitle>
                      {getStatusBadge(cycle.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{cycle.type}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {cycle.startDate} 至 {cycle.endDate}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>完成进度</span>
                        <span className="font-medium">{cycle.progress}%</span>
                      </div>
                      <Progress value={cycle.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">参与人数</p>
                        <p className="font-medium">{cycle.participants}人</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">已完成</p>
                        <p className="font-medium">{cycle.completed}人</p>
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

          <TabsContent value="rules" className="space-y-6">
            <div className="space-y-4">
              {evaluationRules.map((rule) => (
                <Card key={rule.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          {rule.name}
                        </CardTitle>
                        <CardDescription>适用部门：{rule.department}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(rule.status)}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          编辑规则
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">考核维度</h4>
                        <div className="space-y-2">
                          {rule.criteria.map((criterion, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <span className="text-sm">{criterion}</span>
                              <Badge variant="outline">{rule.weights[index]}%</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">评分设置</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div>
                              <div className="font-medium text-blue-900">评分制度</div>
                              <div className="text-sm text-blue-700">{rule.ratingScale}</div>
                            </div>
                            <Star className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>• 5分：优秀 (90-100分)</p>
                            <p>• 4分：良好 (80-89分)</p>
                            <p>• 3分：合格 (70-79分)</p>
                            <p>• 2分：待改进 (60-69分)</p>
                            <p>• 1分：不合格 (60分以下)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>考核进度跟踪</CardTitle>
                <CardDescription>员工考核提交和审核状态</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>员工姓名</TableHead>
                      <TableHead>部门</TableHead>
                      <TableHead>考核人</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>评分</TableHead>
                      <TableHead>提交时间</TableHead>
                      <TableHead>审核时间</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evaluationProgress.map((progress, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{progress.employee}</TableCell>
                        <TableCell>{progress.department}</TableCell>
                        <TableCell>{progress.evaluator}</TableCell>
                        <TableCell>{getStatusBadge(progress.status)}</TableCell>
                        <TableCell>
                          {progress.score ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{progress.score}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {progress.submitDate ? (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{progress.submitDate}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {progress.reviewDate ? (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{progress.reviewDate}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
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

          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    通用员工考核模板
                  </CardTitle>
                  <CardDescription>适用于大部分岗位的标准考核模板</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>• 工作业绩 (40%)</p>
                    <p>• 工作态度 (25%)</p>
                    <p>• 团队协作 (20%)</p>
                    <p>• 学习成长 (15%)</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      使用模板
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    销售人员考核模板
                  </CardTitle>
                  <CardDescription>专门针对销售岗位的考核模板</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>• 销售业绩 (50%)</p>
                    <p>• 客户维护 (25%)</p>
                    <p>• 市场开拓 (15%)</p>
                    <p>• 团队协作 (10%)</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      使用模板
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    管理层考核模板
                  </CardTitle>
                  <CardDescription>适用于中高层管理人员的考核模板</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>• 战略执行 (35%)</p>
                    <p>• 团队管理 (30%)</p>
                    <p>• 业务结果 (25%)</p>
                    <p>• 领导力 (10%)</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      使用模板
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
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
