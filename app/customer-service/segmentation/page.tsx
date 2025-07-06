"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
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
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Target,
  BarChart3,
  Calendar,
  MapPin,
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
      description: "当前活跃的客户分层",
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
      description: "高价值客户比例",
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
      description: "近30天活跃客户比例",
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
      description: "沉睡客户唤醒成功率",
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
      color: "bg-purple-100 border-purple-300 border-l-4 border-l-purple-500",
      textColor: "text-purple-800",
      icon: <Crown className="h-5 w-5 text-purple-600" />,
      services: ["专属客服", "优先处理", "定制服务", "生日礼品"],
      campaigns: 3,
      lastContact: "2024-01-20",
      criteria: "年消费≥100,000元",
      benefits: ["1对1专属服务", "VIP专线", "定制化解决方案"],
      automationLevel: 85,
      conversionRate: 92,
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
      color: "bg-yellow-100 border-yellow-300 border-l-4 border-l-yellow-500",
      textColor: "text-yellow-800",
      icon: <Award className="h-5 w-5 text-yellow-600" />,
      services: ["专属客服", "优先处理", "会员折扣"],
      campaigns: 5,
      lastContact: "2024-01-18",
      criteria: "年消费50,000-99,999元",
      benefits: ["优先客服", "会员折扣", "生日特权"],
      automationLevel: 78,
      conversionRate: 88,
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
      color: "bg-gray-100 border-gray-300 border-l-4 border-l-gray-500",
      textColor: "text-gray-800",
      icon: <Star className="h-5 w-5 text-gray-600" />,
      services: ["会员折扣", "生日祝福", "新品推荐"],
      campaigns: 4,
      lastContact: "2024-01-15",
      criteria: "年消费20,000-49,999元",
      benefits: ["会员服务", "促销通知", "积分加倍"],
      automationLevel: 65,
      conversionRate: 82,
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
      color: "bg-green-100 border-green-300 border-l-4 border-l-green-500",
      textColor: "text-green-800",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      services: ["定期回访", "促销通知", "使用指导"],
      campaigns: 6,
      lastContact: "2024-01-12",
      criteria: "近3个月有购买",
      benefits: ["标准服务", "促销优先", "积分奖励"],
      automationLevel: 55,
      conversionRate: 75,
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
      color: "bg-blue-100 border-blue-300 border-l-4 border-l-blue-500",
      textColor: "text-blue-800",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      services: ["节日问候", "产品推荐"],
      campaigns: 3,
      lastContact: "2024-01-08",
      criteria: "年消费<20,000元",
      benefits: ["基础服务", "节日活动"],
      automationLevel: 45,
      conversionRate: 68,
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
      color: "bg-indigo-100 border-indigo-300 border-l-4 border-l-indigo-500",
      textColor: "text-indigo-800",
      icon: <Plus className="h-5 w-5 text-indigo-600" />,
      services: ["欢迎引导", "首购优惠", "产品介绍"],
      campaigns: 2,
      lastContact: "2024-01-22",
      criteria: "注册未购买",
      benefits: ["新手指导", "首购优惠", "专属客服"],
      automationLevel: 70,
      conversionRate: 35,
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
      description: "为VIP客户提供生日专属礼品和服务",
      channels: ["邮件", "短信", "专属客服"],
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
      description: "通过特别优惠和个性化内容唤醒沉睡客户",
      channels: ["邮件", "推送", "电话"],
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
      description: "帮助新客户了解产品并完成首次购买",
      channels: ["应用内引导", "邮件", "客服"],
    },
    {
      id: 4,
      name: "会员升级激励",
      target: "普通客户 + 活跃客户",
      type: "升级营销",
      status: "planned",
      participants: 0,
      conversion: 0,
      startDate: "2024-02-01",
      endDate: "2024-04-30",
      budget: 80000,
      roi: 0,
      description: "激励普通客户升级为VIP会员",
      channels: ["邮件", "短信", "应用推送"],
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
      company: "科技创新公司",
      industry: "科技",
      location: "北京",
      joinDate: "2022-03-15",
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
      company: "贸易发展公司",
      industry: "贸易",
      location: "上海",
      joinDate: "2022-08-20",
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
      company: "制造企业",
      industry: "制造",
      location: "广州",
      joinDate: "2023-01-10",
    },
    {
      id: 4,
      name: "赵先生",
      avatar: "/placeholder.svg?height=40&width=40",
      segment: "新注册客户",
      spending: 0,
      orders: 0,
      lastOrder: "无",
      satisfaction: 0,
      tags: ["新用户", "待转化"],
      company: "咨询服务公司",
      industry: "服务",
      location: "深圳",
      joinDate: "2024-01-25",
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
            <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              客户分层运营
            </h1>
            <p className="text-gray-600 mt-1">VIP服务管理、沉睡客户唤醒、精准营销策略</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              导入数据
            </Button>
            <Button variant="outline" size="sm" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              导出报告
            </Button>
            <Button variant="outline" size="sm" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              分层设置
            </Button>
            <Dialog open={isCreateSegmentOpen} onOpenChange={setIsCreateSegmentOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  新建分层
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>创建客户分层</DialogTitle>
                  <DialogDescription>定义新的客户分层规则和服务策略</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="segmentName">分层名称</Label>
                      <Input id="segmentName" placeholder="输入分层名称" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="segmentType">分层类型</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择分层类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vip">VIP客户</SelectItem>
                          <SelectItem value="active">活跃客户</SelectItem>
                          <SelectItem value="potential">潜在客户</SelectItem>
                          <SelectItem value="dormant">沉睡客户</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segmentDesc">分层描述</Label>
                    <Textarea id="segmentDesc" placeholder="描述分层的特征和定位" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segmentCriteria">分层条件</Label>
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
                      <Label htmlFor="minValue">最小值</Label>
                      <Input id="minValue" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxValue">最大值</Label>
                      <Input id="maxValue" type="number" placeholder="无限制" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="services">提供服务</Label>
                    <Textarea id="services" placeholder="描述该分层客户享受的专属服务" />
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
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500"
            >
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
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
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
              <Card className="border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Users className="h-5 w-5" />
                    客户分层分布
                  </CardTitle>
                  <CardDescription>各客户层级的数量和占比分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerSegments.slice(0, 4).map((segment) => (
                      <div
                        key={segment.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300"
                      >
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
                          <Progress value={segment.percentage * 2} className="w-16 h-1 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <DollarSign className="h-5 w-5" />
                    价值贡献分析
                  </CardTitle>
                  <CardDescription>各客户层级的收入贡献和价值分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
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
                        <Progress value={68} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
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
                        <Progress value={25} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
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
                        <Progress value={7} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 分层效果分析 */}
            <Card className="border-l-4 border-l-amber-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <BarChart3 className="h-5 w-5" />
                  分层效果分析
                </CardTitle>
                <CardDescription>各分层的运营效果和转化表现</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                    <div className="text-2xl font-bold text-blue-900">85%</div>
                    <div className="text-sm text-blue-700">平均自动化率</div>
                    <div className="text-xs text-blue-600 mt-1">运营效率提升</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                    <div className="text-2xl font-bold text-green-900">78%</div>
                    <div className="text-sm text-green-700">平均转化率</div>
                    <div className="text-xs text-green-600 mt-1">营销效果良好</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                    <div className="text-2xl font-bold text-purple-900">4.5</div>
                    <div className="text-sm text-purple-700">平均满意度</div>
                    <div className="text-xs text-purple-600 mt-1">客户体验优秀</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 分层管理 */}
          <TabsContent value="segments" className="space-y-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索客户分层..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="分层类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分层</SelectItem>
                  <SelectItem value="vip">VIP分层</SelectItem>
                  <SelectItem value="active">活跃分层</SelectItem>
                  <SelectItem value="dormant">沉睡分层</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="hover:shadow-xl transition-all duration-300 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                高级筛选
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customerSegments.map((segment) => (
                <Card key={segment.id} className={`${segment.color} transition-all duration-300 hover:shadow-xl`}>
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
                        <div className="text-xs text-gray-500">转化率</div>
                        <div className="font-semibold">{segment.conversionRate}%</div>
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

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>自动化程度</span>
                        <span className="font-medium">{segment.automationLevel}%</span>
                      </div>
                      <Progress value={segment.automationLevel} className="h-2" />
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      分层标准：{segment.criteria} | 最近联系：{segment.lastContact}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent hover:shadow-md transition-all duration-300"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent hover:shadow-md transition-all duration-300"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:shadow-md transition-all duration-300 bg-transparent"
                      >
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
                <Card
                  key={campaign.id}
                  className="transition-all duration-300 hover:shadow-xl border-l-4 border-l-indigo-500"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">目标客户：{campaign.target}</p>
                        <p className="text-sm text-gray-500 mt-1">{campaign.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{campaign.type}</Badge>
                        {getStatusBadge(campaign.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                        <div className="text-2xl font-bold text-blue-900">{campaign.participants.toLocaleString()}</div>
                        <div className="text-xs text-blue-600">参与人数</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                        <div className="text-2xl font-bold text-green-900">{campaign.conversion}%</div>
                        <div className="text-xs text-green-600">转化率</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                        <div className="text-2xl font-bold text-purple-900">{formatCurrency(campaign.budget)}</div>
                        <div className="text-xs text-purple-600">预算</div>
                      </div>
                      <div className="text-center p-3 bg-amber-50 rounded-lg border-l-4 border-l-amber-500">
                        <div className="text-2xl font-bold text-amber-900">{campaign.roi}x</div>
                        <div className="text-xs text-amber-600">ROI</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-4">
                        <span>
                          <Calendar className="h-4 w-4 inline mr-1" />
                          活动周期：{campaign.startDate} 至 {campaign.endDate}
                        </span>
                        <span>渠道：{campaign.channels.join("、")}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:shadow-md transition-all duration-300 bg-transparent"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          编辑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:shadow-md transition-all duration-300 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          详情
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:shadow-md transition-all duration-300 bg-transparent"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button className="hover:shadow-xl transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" />
                创建新活动
              </Button>
            </div>
          </TabsContent>

          {/* 客户样本 */}
          <TabsContent value="customers" className="space-y-6">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Users className="h-5 w-5" />
                  典型客户样本
                </CardTitle>
                <CardDescription>各分层的代表性客户案例分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900">{customer.name}</h4>
                          <Badge variant="outline">{customer.segment}</Badge>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3" />
                            {customer.location}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">公司：</span>
                            <span className="font-medium">{customer.company}</span>
                          </div>
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
                              {customer.satisfaction > 0 && <Star className="h-3 w-3 text-amber-400 fill-current" />}
                              {customer.satisfaction || "待评价"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex flex-wrap gap-1">
                            {customer.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">
                            加入时间：{customer.joinDate} | 行业：{customer.industry}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:shadow-md transition-all duration-300 bg-transparent"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:shadow-md transition-all duration-300 bg-transparent"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:shadow-md transition-all duration-300 bg-transparent"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 分层转化漏斗 */}
            <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Target className="h-5 w-5" />
                  客户分层转化漏斗
                </CardTitle>
                <CardDescription>客户在不同分层间的流转和转化情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { from: "新注册客户", to: "普通客户", rate: 68, count: 989 },
                    { from: "普通客户", to: "活跃客户", rate: 45, count: 1455 },
                    { from: "活跃客户", to: "白银VIP", rate: 32, count: 1462 },
                    { from: "白银VIP", to: "黄金VIP", rate: 28, count: 604 },
                    { from: "黄金VIP", to: "钻石VIP", rate: 15, count: 134 },
                  ].map((conversion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">{conversion.from}</div>
                        <div className="text-gray-400">→</div>
                        <div className="text-sm font-medium">{conversion.to}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm text-gray-600">{conversion.count}人转化</div>
                        <div className="flex items-center gap-2">
                          <Progress value={conversion.rate} className="w-20 h-2" />
                          <span className="text-sm font-medium">{conversion.rate}%</span>
                        </div>
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
