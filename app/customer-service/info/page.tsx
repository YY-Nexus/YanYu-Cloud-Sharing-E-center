import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Tag,
  TrendingUp,
  ShoppingCart,
  Download,
  Upload,
  MoreHorizontal,
} from "lucide-react"

export default function CustomerInfoPage() {
  const customers = [
    {
      id: 1,
      name: "张三",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "zhangsan@example.com",
      phone: "138****1234",
      location: "北京市朝阳区",
      level: "VIP",
      registrationDate: "2023-01-15",
      lastActivity: "2024-11-20",
      totalOrders: 45,
      totalSpent: 125600,
      satisfaction: 4.8,
      tags: ["高价值客户", "忠实用户", "推荐达人"],
      status: "active",
      company: "北京科技有限公司",
      industry: "科技",
      source: "官网注册",
    },
    {
      id: 2,
      name: "李四",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "lisi@example.com",
      phone: "139****5678",
      location: "上海市浦东新区",
      level: "金牌",
      registrationDate: "2023-03-22",
      lastActivity: "2024-11-18",
      totalOrders: 28,
      totalSpent: 78900,
      satisfaction: 4.5,
      tags: ["活跃用户", "品质追求"],
      status: "active",
      company: "上海贸易公司",
      industry: "贸易",
      source: "推荐注册",
    },
    {
      id: 3,
      name: "王五",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "wangwu@example.com",
      phone: "137****9012",
      location: "广州市天河区",
      level: "银牌",
      registrationDate: "2023-06-10",
      lastActivity: "2024-11-15",
      totalOrders: 15,
      totalSpent: 34500,
      satisfaction: 4.2,
      tags: ["新兴客户", "潜力用户"],
      status: "active",
      company: "广州制造企业",
      industry: "制造",
      source: "广告投放",
    },
    {
      id: 4,
      name: "赵六",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "zhaoliu@example.com",
      phone: "136****3456",
      location: "深圳市南山区",
      level: "普通",
      registrationDate: "2024-02-28",
      lastActivity: "2024-10-20",
      totalOrders: 8,
      totalSpent: 12300,
      satisfaction: 3.9,
      tags: ["沉睡客户", "待激活"],
      status: "inactive",
      company: "深圳创新公司",
      industry: "互联网",
      source: "社交媒体",
    },
  ]

  const customerSegments = [
    {
      name: "VIP客户",
      count: 1245,
      percentage: 10,
      avgSpent: 98500,
      characteristics: ["消费金额高", "忠诚度高", "推荐意愿强"],
      color: "bg-purple-100 text-purple-800 border-l-4 border-purple-500",
      growth: "+15%",
    },
    {
      name: "金牌客户",
      count: 2890,
      percentage: 23,
      avgSpent: 45600,
      characteristics: ["购买频次高", "品质要求高", "价格敏感度低"],
      color: "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500",
      growth: "+12%",
    },
    {
      name: "银牌客户",
      count: 4567,
      percentage: 37,
      avgSpent: 23400,
      characteristics: ["消费稳定", "对促销敏感", "有成长潜力"],
      color: "bg-gray-100 text-gray-800 border-l-4 border-gray-500",
      growth: "+8%",
    },
    {
      name: "普通客户",
      count: 3754,
      percentage: 30,
      avgSpent: 8900,
      characteristics: ["新注册用户", "消费频次低", "需要培育"],
      color: "bg-blue-100 text-blue-800 border-l-4 border-blue-500",
      growth: "+5%",
    },
  ]

  const customerTags = [
    { name: "高价值客户", count: 1245, color: "bg-red-100 text-red-800", usage: 85 },
    { name: "忠实用户", count: 2890, color: "bg-green-100 text-green-800", usage: 92 },
    { name: "活跃用户", count: 3456, color: "bg-blue-100 text-blue-800", usage: 78 },
    { name: "潜力用户", count: 1789, color: "bg-purple-100 text-purple-800", usage: 65 },
    { name: "沉睡客户", count: 2277, color: "bg-gray-100 text-gray-800", usage: 45 },
    { name: "推荐达人", count: 567, color: "bg-orange-100 text-orange-800", usage: 88 },
    { name: "品质追求", count: 1234, color: "bg-pink-100 text-pink-800", usage: 72 },
    { name: "价格敏感", count: 2345, color: "bg-yellow-100 text-yellow-800", usage: 56 },
  ]

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "VIP":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">VIP</Badge>
      case "金牌":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">金牌</Badge>
      case "银牌":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">银牌</Badge>
      case "普通":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">普通</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">活跃</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">沉睡</Badge>
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
      <div className="space-y-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              客户信息管理
            </h1>
            <p className="text-muted-foreground mt-2">客户档案建立、标签体系和画像生成</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              导入客户
            </Button>
            <Button variant="outline" className="hover:shadow-xl transition-all duration-300 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              导出数据
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  新增客户
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>新增客户信息</DialogTitle>
                  <DialogDescription>填写客户的基本信息和联系方式</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">客户姓名</Label>
                      <Input id="name" placeholder="请输入客户姓名" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">公司名称</Label>
                      <Input id="company" placeholder="请输入公司名称" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">邮箱地址</Label>
                      <Input id="email" type="email" placeholder="请输入邮箱地址" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">联系电话</Label>
                      <Input id="phone" placeholder="请输入联系电话" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">所属行业</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择行业" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">科技</SelectItem>
                          <SelectItem value="finance">金融</SelectItem>
                          <SelectItem value="manufacturing">制造</SelectItem>
                          <SelectItem value="retail">零售</SelectItem>
                          <SelectItem value="education">教育</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="source">客户来源</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择来源" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">官网注册</SelectItem>
                          <SelectItem value="referral">推荐注册</SelectItem>
                          <SelectItem value="ads">广告投放</SelectItem>
                          <SelectItem value="social">社交媒体</SelectItem>
                          <SelectItem value="event">活动推广</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">详细地址</Label>
                    <Input id="address" placeholder="请输入详细地址" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">备注信息</Label>
                    <Textarea id="notes" placeholder="请输入备注信息" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">取消</Button>
                  <Button>保存客户</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 概览指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">客户总数</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12,456</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.5%</span> 较上月
              </p>
              <Progress value={85} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card className="border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃客户</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">8,934</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">72%</span> 活跃率
              </p>
              <Progress value={72} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card className="border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均消费</CardTitle>
              <ShoppingCart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">¥4.2K</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-purple-600">+12%</span> 较上月
              </p>
              <Progress value={65} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card className="border-l-4 border-amber-500 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">客户满意度</CardTitle>
              <Star className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">4.6</div>
              <p className="text-xs text-muted-foreground">
                /5.0 <span className="text-green-600">+0.3</span>
              </p>
              <Progress value={92} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="customers">客户列表</TabsTrigger>
            <TabsTrigger value="segments">客户分层</TabsTrigger>
            <TabsTrigger value="tags">标签管理</TabsTrigger>
            <TabsTrigger value="profiles">客户画像</TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="space-y-6">
            {/* 搜索和筛选 */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="搜索客户姓名、邮箱或手机号..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="客户等级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部等级</SelectItem>
                  <SelectItem value="vip">VIP客户</SelectItem>
                  <SelectItem value="gold">金牌客户</SelectItem>
                  <SelectItem value="silver">银牌客户</SelectItem>
                  <SelectItem value="normal">普通客户</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="客户状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">沉睡</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="hover:shadow-xl transition-all duration-300 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                高级筛选
              </Button>
            </div>

            {/* 客户列表 */}
            <Card className="border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-blue-600">客户信息列表</CardTitle>
                <CardDescription>客户基本信息和消费行为数据</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>客户信息</TableHead>
                      <TableHead>联系方式</TableHead>
                      <TableHead>客户等级</TableHead>
                      <TableHead>消费数据</TableHead>
                      <TableHead>满意度</TableHead>
                      <TableHead>最后活跃</TableHead>
                      <TableHead>客户标签</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                              <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">{customer.company}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {customer.location}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {getLevelBadge(customer.level)}
                            {getStatusBadge(customer.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">订单: {customer.totalOrders}笔</div>
                            <div className="text-sm font-medium">{formatCurrency(customer.totalSpent)}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{customer.satisfaction}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {customer.lastActivity}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {customer.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {customer.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{customer.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:shadow-md transition-all duration-300 bg-transparent"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:shadow-md transition-all duration-300 bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:shadow-md transition-all duration-300 bg-transparent"
                            >
                              <MoreHorizontal className="h-4 w-4" />
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

          <TabsContent value="segments" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {customerSegments.map((segment, index) => (
                <Card key={index} className={`${segment.color} hover:shadow-xl transition-all duration-300`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        {segment.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{segment.percentage}%</Badge>
                        <Badge className="bg-green-100 text-green-800">{segment.growth}</Badge>
                      </div>
                    </div>
                    <CardDescription>客户数量: {segment.count.toLocaleString()}人</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">平均消费金额</div>
                      <div className="text-2xl font-bold">{formatCurrency(segment.avgSpent)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">客户特征</div>
                      <div className="space-y-1">
                        {segment.characteristics.map((char, charIndex) => (
                          <div key={charIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                            {char}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Progress value={segment.percentage * 2.5} className="h-2" />
                    <Button
                      variant="outline"
                      className="w-full bg-transparent hover:shadow-md transition-all duration-300"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      查看详细分析
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tags" className="space-y-6">
            <Card className="border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-green-600">客户标签管理</CardTitle>
                <CardDescription>管理客户标签体系，支持自动标签和手动标签</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {customerTags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{tag.name}</div>
                          <div className="text-sm text-muted-foreground">{tag.count}个客户</div>
                          <div className="text-xs text-muted-foreground">使用率: {tag.usage}%</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={tag.color}>{tag.count}</Badge>
                        <Progress value={tag.usage} className="w-16 h-1 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="hover:shadow-xl transition-all duration-300">
                        <Plus className="h-4 w-4 mr-2" />
                        新建标签
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>新建客户标签</DialogTitle>
                        <DialogDescription>创建新的客户分类标签</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="tagName">标签名称</Label>
                          <Input id="tagName" placeholder="请输入标签名称" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tagColor">标签颜色</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="选择标签颜色" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="red">红色</SelectItem>
                              <SelectItem value="blue">蓝色</SelectItem>
                              <SelectItem value="green">绿色</SelectItem>
                              <SelectItem value="purple">紫色</SelectItem>
                              <SelectItem value="yellow">黄色</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tagDesc">标签描述</Label>
                          <Textarea id="tagDesc" placeholder="请输入标签描述" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">取消</Button>
                        <Button>创建标签</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profiles" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Users className="h-5 w-5" />
                    年龄分布
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { range: "18-25岁", percentage: 15, color: "bg-blue-500" },
                      { range: "26-35岁", percentage: 35, color: "bg-green-500" },
                      { range: "36-45岁", percentage: 30, color: "bg-purple-500" },
                      { range: "46岁以上", percentage: 20, color: "bg-amber-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{item.range}</span>
                          <span className="font-medium">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <MapPin className="h-5 w-5" />
                    地域分布
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { city: "北京", percentage: 25, color: "bg-red-500" },
                      { city: "上海", percentage: 22, color: "bg-blue-500" },
                      { city: "广州", percentage: 18, color: "bg-green-500" },
                      { city: "其他城市", percentage: 35, color: "bg-gray-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{item.city}</span>
                          <span className="font-medium">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <ShoppingCart className="h-5 w-5" />
                    消费偏好
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { preference: "品质优先", percentage: 40, color: "bg-purple-500" },
                      { preference: "价格敏感", percentage: 30, color: "bg-amber-500" },
                      { preference: "便利优先", percentage: 20, color: "bg-blue-500" },
                      { preference: "服务优先", percentage: 10, color: "bg-green-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{item.preference}</span>
                          <span className="font-medium">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
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
