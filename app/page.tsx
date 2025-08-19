"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/logo"
import {
  BarChart3,
  Users,
  Target,
  Zap,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
  Brain,
} from "lucide-react"

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* 欢迎区域 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] opacity-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <Logo size="lg" className="text-white [&_span]:text-white [&_span:last-child]:text-blue-100" />
              <div className="h-12 w-px bg-white/20" />
              <div>
                <h1 className="text-3xl font-bold mb-2">欢迎使用 YanYu Cloud Sharing E-center</h1>
                <p className="text-blue-100 text-lg">专业的企业智能管理平台，为您提供全方位的数字化管理解决方案</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">数据驱动决策</span>
                </div>
                <p className="text-sm text-blue-100">实时数据分析，智能决策支持，让每个决策都有数据支撑</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">组织协同管理</span>
                </div>
                <p className="text-sm text-blue-100">完整的人力资源管理体系，提升组织效率和员工满意度</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Brain className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">AI智能赋能</span>
                </div>
                <p className="text-sm text-blue-100">人工智能技术深度集成，自动化流程，智能化运营</p>
              </div>
            </div>
          </div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700">数据处理量</CardTitle>
              <BarChart3 className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-800">2.4M</div>
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                较上月增长 12.5%
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">活跃用户</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">1,247</div>
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <Activity className="h-3 w-3" />
                在线率 89.2%
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">任务完成率</CardTitle>
              <Target className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-800">94.7%</div>
              <p className="text-xs text-amber-600 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                本周目标达成
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">系统效率</CardTitle>
              <Zap className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">98.5%</div>
              <p className="text-xs text-purple-600 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                运行稳定
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 主要功能模块 */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">系统概览</TabsTrigger>
            <TabsTrigger value="modules">功能模块</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
            <TabsTrigger value="status">运行状态</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    平台概况
                  </CardTitle>
                  <CardDescription>YanYu Cloud Sharing E-center 核心功能模块</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-800">13</div>
                      <div className="text-sm text-slate-600">核心模块</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-800">52</div>
                      <div className="text-sm text-slate-600">子功能</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>数据中心模块</span>
                      <span className="text-emerald-600">运行正常</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>组织管理模块</span>
                      <span className="text-emerald-600">运行正常</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>智能引擎模块</span>
                      <span className="text-amber-600">优化中</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-600" />
                    实时活动
                  </CardTitle>
                  <CardDescription>最近的系统活动和操作记录</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">数据同步完成</div>
                        <div className="text-xs text-slate-500">2分钟前</div>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        成功
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">新用户注册</div>
                        <div className="text-xs text-slate-500">5分钟前</div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        用户
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">系统维护提醒</div>
                        <div className="text-xs text-slate-500">10分钟前</div>
                      </div>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                        维护
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "数据中心",
                  description: "数据分析决策",
                  icon: <BarChart3 className="h-6 w-6" />,
                  color: "emerald",
                  status: "运行中",
                  progress: 95,
                },
                {
                  title: "组织管理",
                  description: "人力资源体系",
                  icon: <Users className="h-6 w-6" />,
                  color: "blue",
                  status: "运行中",
                  progress: 92,
                },
                {
                  title: "绩效激励",
                  description: "目标考核体系",
                  icon: <Target className="h-6 w-6" />,
                  color: "amber",
                  status: "运行中",
                  progress: 88,
                },
                {
                  title: "智能引擎",
                  description: "AI智能赋能",
                  icon: <Brain className="h-6 w-6" />,
                  color: "purple",
                  status: "优化中",
                  progress: 87,
                },
                {
                  title: "风险管控",
                  description: "风险防控体系",
                  icon: <Shield className="h-6 w-6" />,
                  color: "red",
                  status: "运行中",
                  progress: 94,
                },
                {
                  title: "效率优化",
                  description: "运营效率提升",
                  icon: <Zap className="h-6 w-6" />,
                  color: "green",
                  status: "运行中",
                  progress: 91,
                },
              ].map((module, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg bg-${module.color}-100`}>
                        <div className={`text-${module.color}-600`}>{module.icon}</div>
                      </div>
                      <Badge
                        variant={module.status === "运行中" ? "default" : "secondary"}
                        className={
                          module.status === "运行中" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }
                      >
                        {module.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>运行效率</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                      查看详情
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>使用趋势分析</CardTitle>
                  <CardDescription>过去30天的平台使用情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="text-center text-slate-500">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>数据图表展示区域</p>
                      <p className="text-sm">实时数据分析图表</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>性能监控</CardTitle>
                  <CardDescription>系统性能实时监控数据</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU使用率</span>
                        <span>23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>内存使用率</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>网络带宽</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>存储空间</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    系统状态
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">数据库</span>
                      <Badge className="bg-emerald-100 text-emerald-700">正常</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API服务</span>
                      <Badge className="bg-emerald-100 text-emerald-700">正常</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">缓存系统</span>
                      <Badge className="bg-emerald-100 text-emerald-700">正常</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">消息队列</span>
                      <Badge className="bg-amber-100 text-amber-700">维护中</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    运行时间
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 mb-2">99.9%</div>
                    <div className="text-sm text-slate-600 mb-4">系统可用性</div>
                    <div className="text-lg font-semibold text-blue-600">连续运行 247 天</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    告警信息
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <div className="text-sm font-medium text-amber-800">存储空间预警</div>
                      <div className="text-xs text-amber-600">剩余空间不足20%</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-800">定期维护提醒</div>
                      <div className="text-xs text-blue-600">下次维护时间：本周日凌晨2点</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 底部品牌信息 */}
        <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-0">
          <CardContent className="p-8">
            <div className="text-center">
              <Logo size="lg" className="justify-center mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">YanYu Cloud Sharing E-center</h3>
              <p className="text-slate-600 mb-4">专业的企业智能管理平台，为您的企业数字化转型提供全方位支持</p>
              <div className="flex justify-center gap-4 text-sm text-slate-500">
                <span>版本 v2.0</span>
                <span>•</span>
                <span>© 2024 YanYu Cloud</span>
                <span>•</span>
                <span>技术支持</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
