"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Lightbulb, Plus, Search, Filter, Eye, Edit, Trash2, Star, Clock, User } from "lucide-react"

export default function ProposalPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isNewProposalOpen, setIsNewProposalOpen] = useState(false)

  const proposals = [
    {
      id: 1,
      title: "AI驱动的客户服务优化",
      description: "利用人工智能技术优化客户服务流程，提升客户满意度",
      author: "张三",
      department: "技术部",
      status: "待审核",
      priority: "高",
      submittedDate: "2024-01-15",
      category: "人工智能",
      estimatedCost: "¥500K",
      expectedROI: "200%",
    },
    {
      id: 2,
      title: "区块链供应链透明化",
      description: "基于区块链技术构建透明化供应链管理系统",
      author: "李四",
      department: "运营部",
      status: "审核中",
      priority: "中",
      submittedDate: "2024-01-12",
      category: "区块链",
      estimatedCost: "¥800K",
      expectedROI: "150%",
    },
    {
      id: 3,
      title: "物联网设备监控平台",
      description: "开发统一的物联网设备监控和管理平台",
      author: "王五",
      department: "产品部",
      status: "已批准",
      priority: "高",
      submittedDate: "2024-01-10",
      category: "物联网",
      estimatedCost: "¥600K",
      expectedROI: "180%",
    },
    {
      id: 4,
      title: "智能数据分析工具",
      description: "构建企业级智能数据分析和可视化工具",
      author: "赵六",
      department: "数据部",
      status: "已拒绝",
      priority: "低",
      submittedDate: "2024-01-08",
      category: "数据分析",
      estimatedCost: "¥300K",
      expectedROI: "120%",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "待审核":
        return "bg-yellow-100 text-yellow-800"
      case "审核中":
        return "bg-blue-100 text-blue-800"
      case "已批准":
        return "bg-green-100 text-green-800"
      case "已拒绝":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-red-100 text-red-800"
      case "中":
        return "bg-orange-100 text-orange-800"
      case "低":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || proposal.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">创新提案</h1>
            <p className="text-gray-600 mt-2">收集、评估和管理创新提案</p>
          </div>
          <Dialog open={isNewProposalOpen} onOpenChange={setIsNewProposalOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                新建提案
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建新的创新提案</DialogTitle>
                <DialogDescription>填写以下信息来提交您的创新提案</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">提案标题</label>
                  <Input placeholder="请输入提案标题" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">提案描述</label>
                  <Textarea placeholder="详细描述您的创新想法..." className="mt-1" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">分类</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">人工智能</SelectItem>
                        <SelectItem value="blockchain">区块链</SelectItem>
                        <SelectItem value="iot">物联网</SelectItem>
                        <SelectItem value="data">数据分析</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">优先级</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="选择优先级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">高</SelectItem>
                        <SelectItem value="medium">中</SelectItem>
                        <SelectItem value="low">低</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">预估成本</label>
                    <Input placeholder="¥0" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">预期ROI</label>
                    <Input placeholder="0%" className="mt-1" />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsNewProposalOpen(false)}>
                    取消
                  </Button>
                  <Button className="btn-primary" onClick={() => setIsNewProposalOpen(false)}>
                    提交提案
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 搜索和筛选 */}
        <Card className="card-gradient-blue">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索提案标题或描述..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="待审核">待审核</SelectItem>
                    <SelectItem value="审核中">审核中</SelectItem>
                    <SelectItem value="已批准">已批准</SelectItem>
                    <SelectItem value="已拒绝">已拒绝</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 提案列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProposals.map((proposal) => (
            <Card key={proposal.id} className="card-gradient-amber hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 mb-2">{proposal.title}</CardTitle>
                    <CardDescription className="text-gray-600">{proposal.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                    <Badge className={getPriorityColor(proposal.priority)}>{proposal.priority}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>
                      {proposal.author} · {proposal.department}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{proposal.submittedDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">预估成本:</span>
                    <span className="font-medium text-gray-900 ml-2">{proposal.estimatedCost}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">预期ROI:</span>
                    <span className="font-medium text-green-600 ml-2">{proposal.expectedROI}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                  <Badge variant="outline" className="text-amber-700 border-amber-300">
                    {proposal.category}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover-lift text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-gradient-emerald">
            <CardContent className="p-6 text-center">
              <Lightbulb className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">总提案数</h3>
              <p className="text-2xl font-bold text-emerald-600 mt-1">24</p>
            </CardContent>
          </Card>
          <Card className="card-gradient-blue">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">待审核</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">8</p>
            </CardContent>
          </Card>
          <Card className="card-gradient-purple">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">已批准</h3>
              <p className="text-2xl font-bold text-purple-600 mt-1">12</p>
            </CardContent>
          </Card>
          <Card className="card-gradient-pink">
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 text-pink-600 mx-auto mb-2 flex items-center justify-center">
                <span className="text-lg font-bold">%</span>
              </div>
              <h3 className="font-semibold text-gray-900">通过率</h3>
              <p className="text-2xl font-bold text-pink-600 mt-1">75%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
