"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  Target,
  Star,
  ArrowRight,
  Database,
  UserCheck,
  TrendingUp,
  Cloud,
  Play,
  BookOpen,
  Activity,
  Settings,
  Shield,
  Zap,
} from "lucide-react"

export default function DataCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 欢迎区域 */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white p-8 mb-8 rounded-lg mx-6 mt-6 overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">欢迎使用 YanYu Cloud Sharing E-center</h1>
          <p className="text-xl mb-8 text-blue-100">
            智能管理系统，为您的企业提供全方位的数据分析、组织管理、绩效激励等解决方案
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg shadow-lg hover-lift"
            >
              <Play className="w-5 h-5 mr-2" />
              开始探索
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover-lift bg-transparent"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              查看文档
            </Button>
          </div>
        </div>

        {/* 装饰性云朵图标 */}
        <div className="absolute top-8 right-8 opacity-20">
          <Cloud className="w-32 h-32" />
        </div>
        <div className="absolute bottom-4 right-24 opacity-10">
          <Cloud className="w-20 h-20" />
        </div>
      </div>

      {/* 数据指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-8">
        <Card className="card-gradient-blue hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">数据处理量</p>
                  <p className="text-2xl font-bold text-gray-900">2.4TB</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={75} className="flex-1 h-2" />
              <Badge variant="secondary" className="text-green-600 bg-green-100">
                +12%
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-2">较上月增长</p>
          </CardContent>
        </Card>

        <Card className="card-gradient-blue hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">活跃用户</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={68} className="flex-1 h-2" />
              <Badge variant="secondary" className="text-green-600 bg-green-100">
                +8%
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-2">本月新增</p>
          </CardContent>
        </Card>

        <Card className="card-gradient-blue hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">任务完成率</p>
                  <p className="text-2xl font-bold text-gray-900">94.2%</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={94} className="flex-1 h-2" />
              <Badge variant="secondary" className="text-green-600 bg-green-100">
                +5%
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-2">效率提升</p>
          </CardContent>
        </Card>

        <Card className="card-gradient-blue hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">客户满意度</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={96} className="flex-1 h-2" />
              <Badge variant="secondary" className="text-green-600 bg-green-100">
                +0.3
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-2">五星评价</p>
          </CardContent>
        </Card>
      </div>

      {/* 核心功能模块 */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">核心功能模块</h2>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            查看全部
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-gradient-emerald hover-lift cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">数据中心</CardTitle>
                  <p className="text-sm text-gray-600">数据分析决策</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                提供全面的数据收集、处理、分析和可视化功能，支持智能决策制定。
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  6个子模块
                </Badge>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient-amber hover-lift cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <UserCheck className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">组织管理</CardTitle>
                  <p className="text-sm text-gray-600">人力资源体系</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">完整的人力资源管理解决方案，涵盖招聘、培训、考勤等各个环节。</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  8个子模块
                </Badge>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient-purple hover-lift cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-900">绩效激励</CardTitle>
                  <p className="text-sm text-gray-600">目标考核体系</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">科学的绩效评估和激励机制，促进员工发展和组织目标达成。</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  5个子模块
                </Badge>
                <ArrowRight className="w-4 h-4 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 快速操作区域 */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">快速操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col gap-2 hover-lift bg-transparent">
            <Database className="w-6 h-6 text-blue-600" />
            <span className="text-sm">数据导入</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover-lift bg-transparent">
            <Activity className="w-6 h-6 text-green-600" />
            <span className="text-sm">实时监控</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover-lift bg-transparent">
            <Settings className="w-6 h-6 text-purple-600" />
            <span className="text-sm">系统设置</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover-lift bg-transparent">
            <Shield className="w-6 h-6 text-red-600" />
            <span className="text-sm">安全审计</span>
          </Button>
        </div>
      </div>

      {/* 系统状态 */}
      <div className="px-6">
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Zap className="w-5 h-5 text-yellow-500" />
              系统状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">数据服务</p>
                <p className="text-xs text-gray-500">正常运行</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">API接口</p>
                <p className="text-xs text-gray-500">响应正常</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">存储空间</p>
                <p className="text-xs text-gray-500">使用率78%</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">网络连接</p>
                <p className="text-xs text-gray-500">连接稳定</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
