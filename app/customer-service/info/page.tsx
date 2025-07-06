import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    },
  ]

  const customerSegments = [
    {
      name: "VIP客户",
      count: 1245,
      percentage: 10,
      avgSpent: 98500,
      characteristics: ["消费金额高", "忠诚度高", "推荐意愿强"],
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "金牌客户",
      count: 2890,
      percentage: 23,
      avgSpent: 45600,
      characteristics: ["购买频次高", "品质要求高", "价格敏感度低"],
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "银牌客户",
      count: 4567,
      percentage: 37,
      avgSpent: 23400,
      characteristics: ["消费稳定", "对促销敏感", "有成长潜力"],
      color: "bg-gray-100 text-gray-800",
    },
    {
      name: "普通客户",
      count: 3754,
      percentage: 30,
      avgSpent: 8900,
      characteristics: ["新注册用户", "消费频次低", "需要培育"],
      color: "bg-blue-100 text-blue-800",
    },
  ]

  const customerTags = [
    { name: "高价值客户", count: 1245, color: "bg-red-100 text-red-800" },
    { name: "忠实用户", count: 2890, color: "bg-green-100 text-green-800" },
    { name: "活跃用户", count: 3456, color: "bg-blue-100 text-blue-800" },
    { name: "潜力用户", count: 1789, color: "bg-purple-100 text-purple-800" },
    { name: "沉睡客户", count: 2277, color: "bg-gray-100 text-gray-800" },
    { name: "推荐达人", count: 567, color: "bg-orange-100 text-orange-800" },
    { name: "品质追求", count: 1234, color: "bg-pink-100 text-pink-800" },
    { name: "价格敏感", count: 2345, color: "bg-yellow-100 text-yellow-800" },
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
            <h1 className="text-3xl font-bold tracking-tight">客户信息管理</h1>
            <p className="text-muted-foreground">客户档案建立、标签体系和画像生成</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            新增客户
          </Button>
        </div>

        {/* 概览指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">客户总数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,456</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.5%</span> 较上月
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃客户</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,934</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">72%</span> 活跃率
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均消费</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥4.2K</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-purple-600">+12%</span> 较上月
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">客户满意度</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6</div>
              <p className="text-xs text-muted-foreground">
                /5.0 <span className="text-green-600">+0.3</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList>
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
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
            </div>

            {/* 客户列表 */}
            <Card>
              <CardHeader>
                <CardTitle>客户信息列表</CardTitle>
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
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                              <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{customer.name}</div>
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
                        <TableCell>{getLevelBadge(customer.level)}</TableCell>
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

          <TabsContent value="segments" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {customerSegments.map((segment, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        {segment.name}
                      </CardTitle>
                      <Badge className={segment.color}>{segment.percentage}%</Badge>
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
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {char}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      查看详细分析
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tags" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>客户标签管理</CardTitle>
                <CardDescription>管理客户标签体系，支持自动标签和手动标签</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {customerTags.map((tag, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{tag.name}</div>
                          <div className="text-sm text-muted-foreground">{tag.count}个客户</div>
                        </div>
                      </div>
                      <Badge className={tag.color}>{tag.count}</Badge>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    新建标签
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profiles" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    年龄分布
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">18-25岁</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">26-35岁</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">36-45岁</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">46岁以上</span>
                      <span className="font-medium">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    地域分布
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">北京</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">上海</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">广州</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">其他城市</span>
                      <span className="font-medium">35%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-purple-600" />
                    消费偏好
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">品质优先</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">价格敏感</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">便利优先</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">服务优先</span>
                      <span className="font-medium">10%</span>
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
