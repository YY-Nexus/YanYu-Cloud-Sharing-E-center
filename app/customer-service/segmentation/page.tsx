"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  TrendingUp,
  Users,
  Crown,
  Star,
  Award,
  Settings,
  Plus,
  Edit,
  Eye,
  Send,
  DollarSign,
  MessageSquare,
  Mail,
  Phone,
  Zap,
} from "lucide-react"

export default function CustomerSegmentationPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreateSegmentOpen, setIsCreateSegmentOpen] = useState(false)

  // 客户分层统计数据
  const segmentationStats = [
    {
      title: "客户分层数",
      value: "8",
      unit: "层",
      change: "+2",
      changeType: "increase",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "VIP客户占比",
      value: "12%",
      unit: "",
      change: "+3%",
      changeType: "increase",
      icon: <Crown className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "活跃客户率",
      value: "78%",
      unit: "",
      change: "+5%",
      changeType: "increase",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "唤醒成功率",
      value: "34%",
      unit: "",
      change: "+8%",
      changeType: "increase",
      icon: <Zap className="h-5 w-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  // 客户分层数据
  const customerSegments = [
    {
      id: 1,
      name: "钻石VIP",
      description: "年消费超过10万的顶级客户",
      count: 156,
      percentage: 1.2,
      avgSpending: 156000,
      satisfaction: 4.9,
      retention: 98,
      growth: "+15%",
      color: "bg-purple-100 border-purple-300",
      textColor: "text-purple-800",
      icon: <Crown className="h-5 w-5 text-purple-600" />,
      services: ["专属客服", "优先处理", "定制服务", "生日礼品"],
      campaigns: 3,
      lastContact: "2024-01-20",
    },
    {
      id: 2,
      name: "黄金VIP",
      description: "年消费5-10万的高价值客户",
      count: 892,
      percentage: 7.2,
      avgSpending: 78000,
      satisfaction: 4.7,
      retention: 94,
      growth: "+12%",
      color: "bg-yellow-100 border-yellow-300",
      textColor: "text-yellow-800",
      icon: <Award className="h-5 w-5 text-yellow-600" />,
      services: ["专属客服", "优先处理", "会员折扣"],
      campaigns: 5,
      lastContact: "2024-01-18",
    },
    {
      id: 3,
      name: "白银VIP",
      description: "年消费2-5万的重要客户",
      count: 2156,
      percentage: 17.3,
      avgSpending: 32000,
      satisfaction: 4.5,
      retention: 89,
      growth: "+8%",
      color: "bg-gray-100 border-gray-300",
      textColor: "text-gray-800",
      icon: <Star className="h-5 w-5 text-gray-600" />,
      services: ["会员折扣", "生日祝福", "新品推荐"],
      campaigns: 4,
      lastContact: "2024-01-15",
    },
    {
      id: 4,
      name: "活跃客户",
      description: "近3个月有购买行为的客户",
      count: 4567,
      percentage: 36.7,
      avgSpending: 12000,
      satisfaction: 4.3,
      retention: 82,
      growth: "+5%",
      color: "bg-green-100 border-green-300",
      textColor: "text-green-800",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      services: ["定期回访", "促销通知", "使用指导"],
      campaigns: 6,
      lastContact: "2024-01-12",
    },
    {
      id: 5,
      name: "普通客户",
      description: "偶尔购买的一般客户",
      count: 3234,
      percentage: 26.0,
      avgSpending: 5600,
      satisfaction: 4.1,
      retention: 75,
      growth: "+2%",
      color: "bg-blue-100 border-blue-300",
      textColor: "text-blue-800",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      services: ["节日问候", "产品推荐"],
      campaigns: 3,
      lastContact: "2024-01-08",
    },
    {
      id: 6,
      name: "新注册客户",
      description: "近期注册但未购买的客户",
      count: 1456,
      percentage: 11.7,
      avgSpending: 0,
      satisfaction: 3.8,
      retention: 45,
      growth: "+25%",
      color: "bg-indigo-100 border-indigo-300",
      textColor: "text-indigo-800",
      icon: <Plus className="h-5 w-5 text-indigo-600" />,
      services: ["欢迎引导", "首购优惠", "产品介绍"],
      campaigns: 2,
      lastContact: "2024-01-22",
    },
  ]

  // 运营活动数据
  const campaigns = [
    {
      id: 1,
      name: "VIP专享生日礼",
      target: "钻石VIP + 黄金VIP",
      type: "个性化服务",
      status: "active",
      participants: 1048,
      conversion: 89,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      budget: 50000,
      roi: 3.2,
    },
    {
      id: 2,
      name: "沉睡客户唤醒计划",
      target: "6个月未购买客户",
      type: "唤醒营销",
      status: "active",
      participants: 2567,
      conversion: 34,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      budget: 25000,
      roi: 2.1,
    },
    {
      id: 3,
      name: "新客户引导计划",
      target: "新注册客户",
      type: "转化营销",
      status: "completed",
      participants: 1456,
      conversion: 67,
      startDate: "2023-12-01",
      endDate: "2024-01-31",
      budget: 15000,
      roi: 4.5,
    },
  ]

  // 客户样本数据
  const sampleCustomers = [
    {
      id: 1,
      name: "张总",
      avatar: "/placeholder.svg?height=40&width=40",
      segment: "钻石VIP",
      spending: 180000,
      orders: 45,
      lastOrder: "2024-01-20",
      satisfaction: 4.9,
      tags: ["高价值", "忠诚客户", "推荐达人"],
    },
    {
      id: 2,
      name: "李经理",
      avatar: "/placeholder.svg?height=40&width=40",
      segment: "黄金VIP",
      spending: 85000,
      orders: 28,
      lastOrder: "2024-01-18",
      satisfaction: 4.7,
      tags: ["稳定客户", "品质追求"],
    },
    {
      id: 3,
      name: "王女士",
      avatar: "/placeholder.svg?height=40&width=40",
      segment: "沉睡客户",
      spending: 15000,
      orders: 8,
      lastOrder: "2023-07-15",
      satisfaction: 4.2,
      tags: ["待唤醒", "潜在价值"],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">进行中</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">已完成</Badge>
      case "planned":
        return <Badge className="bg-amber-100 text-amber-800">计划中</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">客户分层运营</h1>
            <p className="text-gray-600 mt-1">VIP服务管理、沉睡客户唤醒、精准营销策略</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              分层设置
            </Button>
            <Dialog open={isCreateSegmentOpen} onOpenChange={setIsCreateSegmentOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  新建分层
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>创建客户分层</DialogTitle>
                  <DialogDescription>定义新的客户分层规则和服务策略</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">分层名称</label>
                    <Input placeholder="输入分层名称" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">分层条件</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择分层条件" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spending">消费金额</SelectItem>
                        <SelectItem value="frequency">购买频次</SelectItem>
                        <SelectItem value="recency">最近购买</SelectItem>
                        <SelectItem value="loyalty">忠诚度</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">最小值</label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">最大值</label>
                      <Input type="number" placeholder="无限制" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateSegmentOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setIsCreateSegmentOpen(false)}>创建分层</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 统计指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segmentationStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                  <Badge variant={stat.changeType === "increase" ? "default" : "secondary"} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                    <span className="text-sm text-gray-500 font-normal">{stat.unit}</span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主要内容区域 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">分层概览</TabsTrigger>
            <TabsTrigger value="segments">分层管理</TabsTrigger>
            <TabsTrigger value="campaigns">运营活动</TabsTrigger>
            <TabsTrigger value="customers">客户样本</TabsTrigger>
          </TabsList>

          {/* 分层概览 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    客户分层分布
                  </CardTitle>
                  <CardDescription>各客户层级的数量和占比分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerSegments.slice(0, 4).map((segment) => (
                      <div key={segment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {segment.icon}
                          <div>
                            <div className="font-medium text-gray-900">{segment.name}</div>
                            <div className="text-sm text-gray-600">{segment.count.toLocaleString()}人</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{segment.percentage}%</div>
                          <div className="text-xs text-green-600">{segment.growth}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    价值贡献分析
                  </CardTitle>
                  <CardDescription>各客户层级的收入贡献和价值分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Crown className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium text-purple-900">VIP客户</div>
                          <div className="text-sm text-purple-700">钻石+黄金+白银</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-purple-900">68%</div>
                        <div className="text-xs text-purple-600">收入贡献</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium text-green-900">活跃客户</div>
                          <div className="text-sm text-green-700">稳定购买群体</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-900">25%</div>
                        <div className="text-xs text-green-600">收入贡献</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-blue-900">其他客户</div>
                          <div className="text-sm text-blue-700">普通+新客户</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-900">7%</div>
                        <div className="text-xs text-blue-600">收入贡献</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 分层管理 */}
          <TabsContent value="segments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customerSegments.map((segment) => (
                <Card key={segment.id} className={`${segment.color} transition-all duration-300 hover:shadow-lg`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {segment.icon}
                        <div>
                          <h3 className="font-semibold text-gray-900">{segment.name}</h3>
                          <p className="text-sm text-gray-600">
                            {segment.count.toLocaleString()}人 ({segment.percentage}%)
                          </p>
                        </div>
                      </div>
                      <Badge className={segment.textColor} variant="secondary">
                        {segment.growth}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{segment.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">平均消费</div>
                        <div className="font-semibold">{formatCurrency(segment.avgSpending)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">满意度</div>
                        <div className="font-semibold flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-400 fill-current" />
                          {segment.satisfaction}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">留存率</div>
                        <div className="font-semibold">{segment.retention}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">活动数</div>
                        <div className="font-semibold">{segment.campaigns}个</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-500">专属服务</div>
                      <div className="flex flex-wrap gap-1">
                        {segment.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">最近联系：{segment.lastContact}</div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 运营活动 */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="space-y-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">目标客户：{campaign.target}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{campaign.type}</Badge>
                        {getStatusBadge(campaign.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-900">{campaign.participants.toLocaleString()}</div>
                        <div className="text-xs text-blue-600">参与人数</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-900">{campaign.conversion}%</div>
                        <div className="text-xs text-green-600">转化率</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-900">{formatCurrency(campaign.budget)}</div>
                        <div className="text-xs text-purple-600">预算</div>
                      </div>
                      <div className="text-center p-3 bg-amber-50 rounded-lg">
                        <div className="text-2xl font-bold text-amber-900">{campaign.roi}x</div>
                        <div className="text-xs text-amber-600">ROI</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>
                        活动周期：{campaign.startDate} 至 {campaign.endDate}
                      </span>
                      <div className="flex gap-4">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          编辑
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          详情
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                创建新活动
              </Button>
            </div>
          </TabsContent>

          {/* 客户样本 */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  典型客户样本
                </CardTitle>
                <CardDescription>各分层的代表性客户案例分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleCustomers.map((customer) => (
                    <div key={customer.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{customer.name}</h4>
                          <Badge variant="outline">{customer.segment}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">累计消费：</span>
                            <span className="font-medium">{formatCurrency(customer.spending)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">订单数：</span>
                            <span className="font-medium">{customer.orders}笔</span>
                          </div>
                          <div>
                            <span className="text-gray-500">最近下单：</span>
                            <span className="font-medium">{customer.lastOrder}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">满意度：</span>
                            <span className="font-medium flex items-center gap-1">
                              <Star className="h-3 w-3 text-amber-400 fill-current" />
                              {customer.satisfaction}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {customer.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
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
    </DashboardLayout>
  )
}
