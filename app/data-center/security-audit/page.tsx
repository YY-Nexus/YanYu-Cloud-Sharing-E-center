import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Users, AlertTriangle, CheckCircle, Eye, Settings, Clock, MapPin, User } from "lucide-react"

export default function SecurityAuditPage() {
  const auditLogs = [
    {
      id: 1,
      user: "张经理",
      action: "查看销售报表",
      resource: "销售数据",
      timestamp: "2024-01-05 14:30:25",
      status: "success",
      ip: "192.168.1.100",
      riskLevel: "low",
    },
    {
      id: 2,
      user: "李分析师",
      action: "导出客户数据",
      resource: "客户信息",
      timestamp: "2024-01-05 14:15:12",
      status: "success",
      ip: "192.168.1.105",
      riskLevel: "medium",
    },
    {
      id: 3,
      user: "王工程师",
      action: "修改系统配置",
      resource: "系统设置",
      timestamp: "2024-01-05 13:45:33",
      status: "success",
      ip: "192.168.1.110",
      riskLevel: "high",
    },
    {
      id: 4,
      user: "未知用户",
      action: "尝试访问财务数据",
      resource: "财务报表",
      timestamp: "2024-01-05 13:20:45",
      status: "failed",
      ip: "203.0.113.15",
      riskLevel: "high",
    },
    {
      id: 5,
      user: "陈会计",
      action: "生成财务报告",
      resource: "财务数据",
      timestamp: "2024-01-05 12:30:18",
      status: "success",
      ip: "192.168.1.120",
      riskLevel: "low",
    },
  ]

  const permissions = [
    {
      id: 1,
      user: "张经理",
      role: "销售经理",
      permissions: ["查看销售数据", "导出报表", "管理团队"],
      lastLogin: "2小时前",
      riskScore: 15,
    },
    {
      id: 2,
      user: "李分析师",
      role: "数据分析师",
      permissions: ["查看所有数据", "创建报表", "数据建模"],
      lastLogin: "30分钟前",
      riskScore: 25,
    },
    {
      id: 3,
      user: "王工程师",
      role: "系统管理员",
      permissions: ["系统配置", "用户管理", "数据备份"],
      lastLogin: "1小时前",
      riskScore: 45,
    },
    {
      id: 4,
      user: "陈会计",
      role: "财务专员",
      permissions: ["查看财务数据", "生成财务报告"],
      lastLogin: "3小时前",
      riskScore: 10,
    },
    {
      id: 5,
      user: "赵市场",
      role: "市场专员",
      permissions: ["查看营销数据", "客户分析"],
      lastLogin: "1天前",
      riskScore: 20,
    },
  ]

  const securityAlerts = [
    {
      id: 1,
      type: "异常登录",
      description: "检测到来自异常IP的登录尝试",
      severity: "high",
      timestamp: "5分钟前",
      status: "active",
    },
    {
      id: 2,
      type: "权限异常",
      description: "用户尝试访问超出权限范围的数据",
      severity: "medium",
      timestamp: "15分钟前",
      status: "investigating",
    },
    {
      id: 3,
      type: "数据异常",
      description: "检测到大量数据导出操作",
      severity: "medium",
      timestamp: "1小时前",
      status: "resolved",
    },
    {
      id: 4,
      type: "系统异常",
      description: "系统配置被非授权修改",
      severity: "high",
      timestamp: "2小时前",
      status: "resolved",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">成功</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">失败</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">低风险</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">中风险</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">高风险</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">低</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">中</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">高</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getAlertStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">活跃</Badge>
      case "investigating":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">调查中</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已解决</Badge>
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
            <h1 className="text-3xl font-bold tracking-tight">数据安全审计</h1>
            <p className="text-muted-foreground">权限管理、合规检查和安全监控中心</p>
          </div>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            安全配置
          </Button>
        </div>

        {/* 安全概览 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">安全评分</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92</div>
              <p className="text-xs text-muted-foreground">
                分 <span className="text-green-600">+5</span> 较上月
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                个用户 <span className="text-blue-600">12个</span> 在线
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">安全事件</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                今日事件 <span className="text-red-600">2个</span> 待处理
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">合规率</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">
                合规通过 <span className="text-green-600">+2%</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="audit" className="space-y-6">
          <TabsList>
            <TabsTrigger value="audit">审计日志</TabsTrigger>
            <TabsTrigger value="permissions">权限管理</TabsTrigger>
            <TabsTrigger value="compliance">合规检查</TabsTrigger>
            <TabsTrigger value="alerts">安全告警</TabsTrigger>
          </TabsList>

          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>操作审计日志</CardTitle>
                <CardDescription>用户操作和系统访问记录</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>用户</TableHead>
                      <TableHead>操作</TableHead>
                      <TableHead>资源</TableHead>
                      <TableHead>时间</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>IP地址</TableHead>
                      <TableHead>风险等级</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {log.user}
                          </div>
                        </TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.resource}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {log.timestamp}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {log.ip}
                          </div>
                        </TableCell>
                        <TableCell>{getRiskBadge(log.riskLevel)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>用户权限概览</CardTitle>
                <CardDescription>用户角色和权限分配管理</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{permission.user}</h3>
                          <p className="text-sm text-muted-foreground">{permission.role}</p>
                          <div className="flex gap-1 mt-1">
                            {permission.permissions.slice(0, 2).map((perm, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {perm}
                              </Badge>
                            ))}
                            {permission.permissions.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{permission.permissions.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">风险评分:</span>
                          <Badge
                            className={
                              permission.riskScore > 30
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : permission.riskScore > 20
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {permission.riskScore}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">最后登录: {permission.lastLogin}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>合规检查项目</CardTitle>
                  <CardDescription>数据安全合规性评估</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">数据加密</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">通过</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">访问控制</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">通过</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">审计日志</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">通过</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">数据备份</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">警告</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">漏洞管理</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">通过</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>合规统计</CardTitle>
                  <CardDescription>合规性指标和趋势</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>总体合规率</span>
                      <span className="font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">18</div>
                      <div className="text-sm text-muted-foreground">通过项目</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">2</div>
                      <div className="text-sm text-muted-foreground">待改进</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">最近检查</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>• 数据加密策略更新 - 2天前</p>
                      <p>• 访问权限审核 - 1周前</p>
                      <p>• 备份策略检查 - 2周前</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>安全告警</CardTitle>
                <CardDescription>实时安全威胁和异常行为告警</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            alert.severity === "high"
                              ? "bg-red-500"
                              : alert.severity === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{alert.type}</h3>
                            {getSeverityBadge(alert.severity)}
                            {getAlertStatusBadge(alert.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          处理
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
