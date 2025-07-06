import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  Cpu,
  MemoryStick,
  HardDrive,
  Zap,
  CheckCircle,
  AlertTriangle,
  Play,
  Settings,
  BarChart3,
  Target,
  Clock,
  Activity,
} from "lucide-react"

export default function DecisionModelPage() {
  const models = [
    {
      id: 1,
      name: "销售预测模型",
      type: "预测分析",
      status: "running",
      accuracy: 96.8,
      version: "v2.1",
      lastTrained: "2天前",
      predictions: "5.2K/天",
      confidence: 94.5,
    },
    {
      id: 2,
      name: "客户流失预警",
      type: "分类模型",
      status: "running",
      accuracy: 89.3,
      version: "v1.8",
      lastTrained: "1周前",
      predictions: "1.8K/天",
      confidence: 87.2,
    },
    {
      id: 3,
      name: "库存优化模型",
      type: "优化算法",
      status: "training",
      accuracy: 92.1,
      version: "v3.0",
      lastTrained: "进行中",
      predictions: "3.1K/天",
      confidence: 91.8,
    },
    {
      id: 4,
      name: "价格推荐引擎",
      type: "推荐系统",
      status: "running",
      accuracy: 94.7,
      version: "v2.3",
      lastTrained: "3天前",
      predictions: "8.9K/天",
      confidence: 93.2,
    },
    {
      id: 5,
      name: "风险评估模型",
      type: "风险分析",
      status: "paused",
      accuracy: 88.9,
      version: "v1.5",
      lastTrained: "1个月前",
      predictions: "0/天",
      confidence: 85.6,
    },
    {
      id: 6,
      name: "需求预测模型",
      type: "时间序列",
      status: "running",
      accuracy: 91.4,
      version: "v2.0",
      lastTrained: "5天前",
      predictions: "2.7K/天",
      confidence: 89.8,
    },
  ]

  const predictions = [
    {
      id: 1,
      model: "销售预测模型",
      prediction: "下月销售额预计增长15%",
      confidence: 94.5,
      impact: "high",
      recommendation: "增加库存备货，准备促销活动",
    },
    {
      id: 2,
      model: "客户流失预警",
      prediction: "156个客户存在流失风险",
      confidence: 87.2,
      impact: "medium",
      recommendation: "启动客户挽留计划，提供个性化优惠",
    },
    {
      id: 3,
      model: "价格推荐引擎",
      prediction: "产品A建议降价8%以提升销量",
      confidence: 93.2,
      impact: "high",
      recommendation: "调整定价策略，监控竞品价格",
    },
    {
      id: 4,
      model: "需求预测模型",
      prediction: "春季产品需求将上升25%",
      confidence: 89.8,
      impact: "medium",
      recommendation: "提前安排生产计划，优化供应链",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">运行中</Badge>
      case "training":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">训练中</Badge>
      case "paused":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">已暂停</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">决策模型应用</h1>
            <p className="text-muted-foreground">AI驱动的预测分析和智能决策支持系统</p>
          </div>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            创建模型
          </Button>
        </div>

        {/* 概览指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">运行模型</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">4个</span> 高精度模型
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">日预测量</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21.7K</div>
              <p className="text-xs text-muted-foreground">
                次预测 <span className="text-green-600">+12%</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均准确率</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.1%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3.2%</span> 较上月
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">响应时间</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.8s</div>
              <p className="text-xs text-muted-foreground">
                平均响应 <span className="text-green-600">-0.2s</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="models" className="space-y-6">
          <TabsList>
            <TabsTrigger value="models">模型管理</TabsTrigger>
            <TabsTrigger value="predictions">预测结果</TabsTrigger>
            <TabsTrigger value="performance">性能监控</TabsTrigger>
            <TabsTrigger value="training">训练历史</TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {models.map((model) => (
                <Card key={model.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-base">{model.name}</CardTitle>
                      </div>
                      {getStatusBadge(model.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{model.type}</Badge>
                      <Badge variant="outline">v{model.version}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>准确率</span>
                        <span className="font-medium">{model.accuracy}%</span>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">日预测量</p>
                        <p className="font-medium">{model.predictions}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">置信度</p>
                        <p className="font-medium">{model.confidence}%</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">最后训练: {model.lastTrained}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Play className="h-4 w-4 mr-1" />
                        运行
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Settings className="h-4 w-4 mr-1" />
                        配置
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <Card key={prediction.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{prediction.model}</Badge>
                          <Badge className={`${getImpactColor(prediction.impact)} bg-transparent border-current`}>
                            {prediction.impact === "high"
                              ? "高影响"
                              : prediction.impact === "medium"
                                ? "中影响"
                                : "低影响"}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{prediction.prediction}</h3>
                        <p className="text-muted-foreground">{prediction.recommendation}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-2xl font-bold text-green-600">{prediction.confidence}%</div>
                        <div className="text-sm text-muted-foreground">置信度</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>资源使用情况</CardTitle>
                  <CardDescription>实时系统资源监控</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">CPU使用率</span>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MemoryStick className="h-4 w-4 text-green-600" />
                        <span className="text-sm">内存使用率</span>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">GPU使用率</span>
                      </div>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">存储使用率</span>
                      </div>
                      <span className="text-sm font-medium">34%</span>
                    </div>
                    <Progress value={34} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>性能指标</CardTitle>
                  <CardDescription>模型运行性能统计</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">成功预测</span>
                      </div>
                      <span className="text-sm font-medium text-green-600">98.7%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">平均响应时间</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">0.8s</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">吞吐量</span>
                      </div>
                      <span className="text-sm font-medium text-purple-600">21.7K/天</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">错误率</span>
                      </div>
                      <span className="text-sm font-medium text-yellow-600">1.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>训练历史记录</CardTitle>
                <CardDescription>模型训练和版本迭代历史</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">销售预测模型 v2.1</p>
                        <p className="text-sm text-muted-foreground">训练完成 - 准确率提升至96.8%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">2天前</p>
                      <p className="text-xs text-muted-foreground">训练时长: 4.2小时</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">库存优化模型 v3.0</p>
                        <p className="text-sm text-muted-foreground">训练进行中 - 当前进度65%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">进行中</p>
                      <p className="text-xs text-muted-foreground">预计剩余: 2.1小时</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">价格推荐引擎 v2.3</p>
                        <p className="text-sm text-muted-foreground">训练完成 - 新增多维度特征</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">3天前</p>
                      <p className="text-xs text-muted-foreground">训练时长: 6.8小时</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <div>
                        <p className="font-medium">客户流失预警 v1.8</p>
                        <p className="text-sm text-muted-foreground">训练完成 - 优化算法参数</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">1周前</p>
                      <p className="text-xs text-muted-foreground">训练时长: 3.5小时</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
