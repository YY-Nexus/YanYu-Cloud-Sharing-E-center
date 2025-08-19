"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Users,
  Plus,
  Edit,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Eye,
  Move,
  Copy,
  MoreHorizontal,
} from "lucide-react"

export default function OrganizationStructurePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // 组织架构数据
  const organizationData = {
    name: "总部中心",
    level: 0,
    manager: "CEO",
    employees: 1247,
    description: "公司最高管理层，负责战略决策和整体运营",
    children: [
      {
        name: "门店配送",
        level: 1,
        manager: "张经理",
        employees: 342,
        description: "负责门店运营和配送管理",
        children: [
          {
            name: "营销部",
            level: 2,
            manager: "李主管",
            employees: 85,
            description: "市场营销和品牌推广",
            positions: ["营销经理", "市场专员", "品牌策划", "活动执行"],
          },
          {
            name: "营运部",
            level: 2,
            manager: "王主管",
            employees: 92,
            description: "日常运营和流程管理",
            positions: ["运营经理", "运营专员", "流程优化师", "数据分析师"],
          },
          {
            name: "管理部",
            level: 2,
            manager: "赵主管",
            employees: 78,
            description: "行政管理和人事支持",
            positions: ["行政经理", "人事专员", "办公室主任", "后勤管理"],
          },
          {
            name: "营业部",
            level: 2,
            manager: "刘主管",
            employees: 87,
            description: "销售业务和客户服务",
            positions: ["销售经理", "销售代表", "客户经理", "业务助理"],
          },
        ],
      },
      {
        name: "前厅整理",
        level: 1,
        manager: "李经理",
        employees: 278,
        description: "前台服务和客户接待",
        children: [
          {
            name: "前台接待",
            level: 2,
            manager: "陈主管",
            employees: 145,
            description: "客户接待和咨询服务",
            positions: ["接待经理", "前台专员", "咨询顾问", "服务助理"],
          },
          {
            name: "客户服务",
            level: 2,
            manager: "周主管",
            employees: 133,
            description: "客户关系维护和售后服务",
            positions: ["客服经理", "客服专员", "投诉处理", "满意度调研"],
          },
        ],
      },
      {
        name: "资源配送",
        level: 1,
        manager: "王经理",
        employees: 425,
        description: "资源调配和物流配送",
        children: [
          {
            name: "销售部",
            level: 2,
            manager: "孙主管",
            employees: 156,
            description: "销售业务拓展和管理",
            positions: ["销售总监", "区域经理", "销售代表", "商务专员"],
          },
          {
            name: "客服部",
            level: 2,
            manager: "吴主管",
            employees: 134,
            description: "客户服务和技术支持",
            positions: ["客服总监", "技术支持", "在线客服", "电话客服"],
          },
          {
            name: "财务部",
            level: 2,
            manager: "郑主管",
            employees: 89,
            description: "财务管理和成本控制",
            positions: ["财务经理", "会计师", "出纳员", "审计专员"],
          },
          {
            name: "制作部",
            level: 2,
            manager: "何主管",
            employees: 46,
            description: "产品制作和质量控制",
            positions: ["制作经理", "技术工程师", "质检员", "生产助理"],
          },
        ],
      },
    ],
  }

  // 递归渲染组织架构
  const renderOrgNode = (node: any, index = 0) => {
    const isSelected = selectedDepartment === node.name
    const levelColors = [
      "border-red-200 bg-red-50",
      "border-blue-200 bg-blue-50",
      "border-green-200 bg-green-50",
      "border-purple-200 bg-purple-50",
    ]

    return (
      <div key={node.name} className="space-y-4">
        <Card
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            isSelected ? "ring-2 ring-blue-500" : ""
          } ${levelColors[node.level] || "border-gray-200 bg-gray-50"}`}
          onClick={() => setSelectedDepartment(isSelected ? null : node.name)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  <Building2 className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{node.name}</h3>
                  <p className="text-sm text-gray-600">
                    {node.manager} · {node.employees}人
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  L{node.level + 1}
                </Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {isSelected && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">{node.description}</p>
                {node.positions && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">岗位设置</h4>
                    <div className="flex flex-wrap gap-1">
                      {node.positions.map((position: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {position}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    编辑
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    人员
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    添加子部门
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {node.children && node.children.length > 0 && (
          <div className="ml-8 space-y-4 border-l-2 border-gray-200 pl-6">
            {node.children.map((child: any, childIndex: number) => renderOrgNode(child, childIndex))}
          </div>
        )}
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题和操作 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">组织架构设计</h1>
            <p className="text-gray-600 mt-1">层级梳理、岗位配置和架构优化</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出架构图
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              导入数据
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  新增部门
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>新增部门</DialogTitle>
                  <DialogDescription>创建新的组织部门，设置基本信息和岗位配置</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dept-name" className="text-right">
                      部门名称
                    </Label>
                    <Input id="dept-name" placeholder="请输入部门名称" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parent-dept" className="text-right">
                      上级部门
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="选择上级部门" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="headquarters">总部中心</SelectItem>
                        <SelectItem value="store">门店配送</SelectItem>
                        <SelectItem value="front">前厅整理</SelectItem>
                        <SelectItem value="resource">资源配送</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manager" className="text-right">
                      负责人
                    </Label>
                    <Input id="manager" placeholder="请输入负责人姓名" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      部门描述
                    </Label>
                    <Textarea id="description" placeholder="请输入部门职责描述" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>确认创建</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜索部门或岗位..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                视图设置
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 组织架构图 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 架构树 */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  组织架构图
                </CardTitle>
                <CardDescription>点击部门查看详细信息和进行编辑操作</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">{renderOrgNode(organizationData)}</div>
              </CardContent>
            </Card>
          </div>

          {/* 侧边栏信息 */}
          <div className="space-y-6">
            {/* 统计信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">架构统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">总部门数</span>
                  <span className="font-semibold">28个</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">管理层级</span>
                  <span className="font-semibold">4层</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">总员工数</span>
                  <span className="font-semibold">1,247人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">平均跨度</span>
                  <span className="font-semibold">3.2个</span>
                </div>
              </CardContent>
            </Card>

            {/* 快速操作 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  批量添加部门
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Move className="h-4 w-4 mr-2" />
                  调整部门层级
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  复制架构模板
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  预览架构图
                </Button>
              </CardContent>
            </Card>

            {/* 最近修改 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">最近修改</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">新增数字化转型部</div>
                  <div className="text-gray-500">2小时前</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">调整营销部层级</div>
                  <div className="text-gray-500">4小时前</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">更新财务部职责</div>
                  <div className="text-gray-500">1天前</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
