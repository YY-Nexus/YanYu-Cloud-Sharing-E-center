import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Database,
  BarChart3,
  Brain,
  Shield,
  Activity,
  Server,
  Cpu,
  HardDrive,
  Network,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function DataCenterPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">数据中心</h1>
          <p className="text-muted-foreground">统一的数据管理平台，从采集到决策的全链路数据服务</p>
        </div>

        {/* 核心指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">数据源接入</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> 较上月
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">实时处理量</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2M</div>
              <p className="text-xs text-muted-foreground">
                条/小时 <span className="text-green-600">+12%</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">决策模型</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                运行中 <span className="text-blue-600">96.8%</span> 准确率
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">数据质量</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.8%</div>
              <p className="text-xs text-muted-foreground">
                准确率 <span className="text-green-600">+2.1%</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 模块导航 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/data-center/collection">
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Database className="h-8 w-8 text-blue-600" />
                  <Badge variant="secondary">运行中</Badge>
                </div>
                <CardTitle className="text-lg">数据采集整合</CardTitle>
                <CardDescription>多源数据接入、清洗转换和质量监控</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>数据源健康度</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>24个数据源</span>
                    <span>实时同步</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/data-center/visualization">
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                  <Badge variant="secondary">活跃</Badge>
                </div>
                <CardTitle className="text-lg">可视化分析</CardTitle>
                <CardDescription>智能图表生成和交互式数据探索</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>活跃看板</span>
                    <span className="font-medium">15个</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>156个图表</span>
                    <span>日均访问 2.3K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/data-center/decision-model">
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Brain className="h-8 w-8 text-purple-600" />
                  <Badge variant="secondary">智能</Badge>
                </div>
                <CardTitle className="text-lg">决策模型应用</CardTitle>
                <CardDescription>AI驱动的预测分析和智能决策支持</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>模型准确率</span>
                    <span className="font-medium">96.8%</span>
                  </div>
                  <Progress value={97} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>8个模型运行</span>
                    <span>日预测 5.2K次</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/data-center/security-audit">
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Shield className="h-8 w-8 text-red-600" />
                  <Badge variant="secondary">安全</Badge>
                </div>
                <CardTitle className="text-lg">数据安全审计</CardTitle>
                <CardDescription>权限管理、合规检查和安全监控</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>安全评分</span>
                    <span className="font-medium">92分</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>156个用户</span>
                    <span>0个风险事件</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* 系统监控和活动日志 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* 系统监控 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                系统监控
              </CardTitle>
              <CardDescription>实时系统状态和性能指标</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">数据库集群</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">正常</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">计算引擎</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">运行中</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">存储系统</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">使用率高</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-green-600" />
                    <span className="text-sm">网络连接</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">稳定</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                查看详细监控
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* 活动日志 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                活动日志
              </CardTitle>
              <CardDescription>最近的系统操作和事件记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">数据采集任务完成</p>
                    <p className="text-xs text-muted-foreground">客户数据库同步完成，处理 12,456 条记录</p>
                    <p className="text-xs text-muted-foreground">2分钟前</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">新模型部署成功</p>
                    <p className="text-xs text-muted-foreground">销售预测模型 v2.1 已上线运行</p>
                    <p className="text-xs text-muted-foreground">15分钟前</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">存储空间告警</p>
                    <p className="text-xs text-muted-foreground">数据仓库使用率达到 85%，建议清理历史数据</p>
                    <p className="text-xs text-muted-foreground">1小时前</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">看板访问峰值</p>
                    <p className="text-xs text-muted-foreground">销售看板今日访问量突破 500 次</p>
                    <p className="text-xs text-muted-foreground">2小时前</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                查看完整日志
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
