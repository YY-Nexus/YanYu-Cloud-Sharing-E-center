"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Layers, Network, Settings, Users, BarChart3, Shield, Zap } from "lucide-react"

export default function MultiServicePageClient() {
  const serviceMetrics = [
    { title: "活跃服务", value: "24", change: "+3", icon: Layers, color: "text-blue-600" },
    { title: "服务可用性", value: "99.9%", change: "+0.1%", icon: Shield, color: "text-green-600" },
    { title: "平均响应时间", value: "120ms", change: "-15ms", icon: Zap, color: "text-purple-600" },
    { title: "用户满意度", value: "4.8/5", change: "+0.2", icon: Users, color: "text-amber-600" },
  ]

  const services = [
    {
      id: 1,
      name: "用户认证服务",
      description: "统一用户认证和授权管理",
      status: "运行中",
      health: 98,
      version: "v2.1.0",
      instances: 3,
      requests: "1.2M/day",
      category: "核心服务",
    },
    {
      id: 2,
      name: "数据分析服务",
      description: "实时数据处理和分析",
      status: "运行中",
      health: 95,
      version: "v1.8.2",
      instances: 5,
      requests: "800K/day",
      category: "数据服务",
    },
    {
      id: 3,
      name: "通知推送服务",
      description: "多渠道消息推送服务",
      status: "维护中",
      health: 85,
      version: "v1.5.1",
      instances: 2,
      requests: "500K/day",
      category: "通信服务",
    },
    {
      id: 4,
      name: "文件存储服务",
      description: "分布式文件存储和管理",
      status: "运行中",
      health: 99,
      version: "v3.0.0",
      instances: 4,
      requests: "2.1M/day",
      category: "存储服务",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "运行中":
        return "bg-green-100 text-green-800"
      case "维护中":
        return "bg-yellow-100 text-yellow-800"
      case "故障":
        return "bg-red-100 text-red-800"
      case "停用":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 95) return "progress-emerald"
    if (health >= 85) return "progress-amber"
    return "progress-pink"
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "核心服务":
        return "bg-blue-100 text-blue-800"
      case "数据服务":
        return "bg-purple-100 text-purple-800"
      case "通信服务":
        return "bg-green-100 text-green-800"
      case "存储服务":
        return "bg-orange-100 text-orange-800"
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
            <h1 className="text-3xl font-bold text-gray-900">多服务管理</h1>
            <p className="text-gray-600 mt-2">统一管理和监控微服务架构</p>
          </div>
          <Button className="btn-primary">
            <Globe className="w-4 h-4 mr-2" />
            部署新服务
          </Button>
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceMetrics.map((metric, index) => (
            <Card key={index} className="card-gradient-blue hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                    <p className="text-sm text-green-600 mt-1">{metric.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-blue-100 ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容 */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">服务列表</TabsTrigger>
            <TabsTrigger value="monitoring">监控面板</TabsTrigger>
            <TabsTrigger value="deployment">部署管理</TabsTrigger>
            <TabsTrigger value="configuration">配置中心</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="card-gradient-emerald hover-lift">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900">{service.name}</CardTitle>
                        <CardDescription className="mt-2">{service.description}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                        <Badge className={getCategoryColor(service.category)}>{service.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">服务健康度</span>
                        <span className="font-medium">{service.health}%</span>
                      </div>
                      <Progress value={service.health} className={getHealthColor(service.health)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">版本:</span>
                        <span className="font-medium text-gray-900 ml-2">{service.version}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">实例数:</span>
                        <span className="font-medium text-gray-900 ml-2">{service.instances}</span>
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="text-gray-500">日请求量:</span>
                      <span className="font-medium text-blue-600 ml-2">{service.requests}</span>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                        <Settings className="w-4 h-4 mr-1" />
                        配置
                      </Button>
                      <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        监控
                      </Button>
                      <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                        <Network className="w-4 h-4 mr-1" />
                        日志
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient-purple">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                    系统性能监控
                  </CardTitle>
                  <CardDescription>实时系统性能指标</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { metric: "CPU使用率", value: 45, unit: "%", status: "normal" },
                    { metric: "内存使用率", value: 68, unit: "%", status: "normal" },
                    { metric: "磁盘使用率", value: 32, unit: "%", status: "normal" },
                    { metric: "网络吞吐量", value: 85, unit: "Mbps", status: "high" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                        <span className="text-sm text-gray-600">
                          {item.value}
                          {item.unit}
                        </span>
                      </div>
                      <Progress
                        value={item.value}
                        className={item.status === "high" ? "progress-amber" : "progress-purple"}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-gradient-amber">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Network className="w-5 h-5 mr-2 text-amber-600" />
                    服务依赖关系
                  </CardTitle>
                  <CardDescription>服务间调用关系图</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { from: "用户认证服务", to: "数据分析服务", calls: "1.2K/min" },
                      { from: "数据分析服务", to: "文件存储服务", calls: "800/min" },
                      { from: "通知推送服务", to: "用户认证服务", calls: "500/min" },
                      { from: "文件存储服务", to: "通知推送服务", calls: "300/min" },
                    ].map((relation, index) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-amber-200">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">{relation.from}</span>
                            <span className="text-gray-500 mx-2">→</span>
                            <span className="font-medium text-gray-900">{relation.to}</span>
                          </div>
                          <Badge variant="outline" className="text-amber-700">
                            {relation.calls}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-6">
            <Card className="card-gradient-blue">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  部署管理
                </CardTitle>
                <CardDescription>管理服务部署和版本控制</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">部署管理功能</h3>
                  <p className="text-gray-600 mb-4">统一管理服务部署、版本控制和回滚操作</p>
                  <Button className="btn-primary">开始部署</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card className="card-gradient-emerald">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-emerald-600" />
                  配置中心
                </CardTitle>
                <CardDescription>集中管理服务配置和环境变量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">配置中心</h3>
                  <p className="text-gray-600 mb-4">统一管理所有服务的配置文件和环境变量</p>
                  <Button className="btn-primary">管理配置</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
