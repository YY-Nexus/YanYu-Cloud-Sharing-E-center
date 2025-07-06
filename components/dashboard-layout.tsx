"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  Target,
  Zap,
  Award,
  Clock,
  BookOpen,
  Shield,
  Brain,
  Settings,
  Rocket,
  X,
  ChevronRight,
  Menu,
  HeadphonesIcon,
  GitBranch,
  Lightbulb,
  Grid3X3,
  Badge,
  DollarSign,
  Crosshair,
  Gift,
  TrendingUp,
  Star,
  Info,
  Workflow,
  ThumbsUp,
  UserCheck,
  Beaker,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeProvider } from "@/components/theme-provider"
import { Logo } from "@/components/logo"

const modules = [
  {
    id: "data-center",
    name: "数据中心",
    icon: BarChart3,
    color: "blue",
    description: "数据分析决策",
    subModules: [
      { id: "collection", name: "数据采集整合", icon: Settings, path: "/data-center/collection" },
      { id: "visualization", name: "可视化分析", icon: BarChart3, path: "/data-center/visualization" },
      { id: "decision-model", name: "决策模型应用", icon: Brain, path: "/data-center/decision-model" },
      { id: "security-audit", name: "数据安全审计", icon: Shield, path: "/data-center/security-audit" },
      { id: "quality", name: "数据质量管理", icon: Award, path: "/data-center/quality" },
      { id: "catalog", name: "数据资产目录", icon: BookOpen, path: "/data-center/catalog" },
    ],
  },
  {
    id: "organization",
    name: "组织管理",
    icon: Users,
    color: "emerald",
    description: "人力资源体系",
    subModules: [
      { id: "structure", name: "组织架构设计", icon: GitBranch, path: "/organization/structure" },
      { id: "recruitment", name: "人才招聘体系", icon: Users, path: "/organization/recruitment" },
      { id: "training", name: "员工培训发展", icon: BookOpen, path: "/organization/training" },
      { id: "cost", name: "人力成本核算", icon: DollarSign, path: "/organization/cost" },
      { id: "relations", name: "员工关系管理", icon: Users, path: "/organization/relations" },
      { id: "attendance", name: "考勤管理系统", icon: Clock, path: "/organization/attendance" },
    ],
  },
  {
    id: "performance",
    name: "绩效激励",
    icon: Target,
    color: "amber",
    description: "目标考核体系",
    subModules: [
      { id: "goal-alignment", name: "目标拆解对齐", icon: Crosshair, path: "/performance/goal-alignment" },
      { id: "evaluation", name: "考核流程管理", icon: Award, path: "/performance/evaluation" },
      { id: "incentive", name: "激励策略配置", icon: Gift, path: "/performance/incentive" },
      { id: "analysis", name: "绩效数据分析", icon: TrendingUp, path: "/performance/analysis" },
      { id: "360-review", name: "三六零度评估", icon: Star, path: "/performance/360-review" },
    ],
  },
  {
    id: "customer-service",
    name: "客户服务",
    icon: HeadphonesIcon,
    color: "purple",
    description: "客户关系管理",
    subModules: [
      { id: "info", name: "客户信息管理", icon: Info, path: "/customer-service/info" },
      { id: "process", name: "服务流程设计", icon: Workflow, path: "/customer-service/process" },
      { id: "satisfaction", name: "满意度调研分析", icon: ThumbsUp, path: "/customer-service/satisfaction" },
      { id: "segmentation", name: "客户分层运营", icon: UserCheck, path: "/customer-service/segmentation" },
    ],
  },
  {
    id: "innovation",
    name: "创新管理",
    icon: Lightbulb,
    color: "pink",
    description: "创新驱动发展",
    subModules: [
      { id: "proposal", name: "创新提案管理", icon: Rocket, path: "/innovation/proposal" },
      { id: "incubation", name: "项目孵化跟踪", icon: Beaker, path: "/innovation/incubation" },
    ],
  },
  {
    id: "efficiency",
    name: "效率优化",
    icon: Zap,
    color: "orange",
    description: "运营效率提升",
    subModules: [],
  },
  {
    id: "multi-service",
    name: "多元服务",
    icon: Grid3X3,
    color: "teal",
    description: "多维度服务体系",
    subModules: [],
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedModules, setExpandedModules] = useState<string[]>(["data-center"])
  const pathname = usePathname()

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const isModuleActive = (module: any) => {
    if (pathname === "/" && module.id === "data-center") return true
    return pathname.startsWith(`/${module.id}`)
  }

  const isSubModuleActive = (subModule: any) => {
    return pathname === subModule.path
  }

  const getActiveModule = () => {
    if (pathname === "/") return modules[0]
    return modules.find((module) => pathname.startsWith(`/${module.id}`)) || modules[0]
  }

  const activeModule = getActiveModule()

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* 侧边栏 */}
        <aside
          className={cn(
            "sidebar-nav h-screen flex-col fixed inset-y-0 bg-white border-r border-gray-200 shadow-sm z-50 transition-all duration-300",
            sidebarOpen ? "w-80" : "w-16",
          )}
        >
          {/* Logo区域 */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Logo className="h-8 w-8 flex-shrink-0" />
              {sidebarOpen && (
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-gray-900">YanYu丨☁️³Mgmt</h1>
                  <p className="text-sm text-gray-500">企业智能管理平台</p>
                </div>
              )}
            </div>
          </div>

          {/* 导航菜单 */}
          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              {modules.map((module) => {
                const isActive = isModuleActive(module)
                const isExpanded = expandedModules.includes(module.id)
                const hasSubModules = module.subModules.length > 0

                return (
                  <div key={module.id} className="space-y-1">
                    {/* 主模块 */}
                    <div className="relative">
                      <Link
                        href={hasSubModules ? "#" : `/${module.id}`}
                        onClick={(e) => {
                          if (hasSubModules) {
                            e.preventDefault()
                            toggleModule(module.id)
                          }
                        }}
                        className={cn(
                          "sidebar-nav-item flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 group relative",
                          isActive
                            ? `sidebar-nav-item active bg-${module.color}-50 text-${module.color}-700 border-l-4 border-${module.color}-500 shadow-sm`
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        )}
                      >
                        <module.icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0 transition-colors duration-300",
                            isActive ? `text-${module.color}-600` : "text-gray-400 group-hover:text-gray-600",
                          )}
                        />
                        {sidebarOpen && (
                          <>
                            <div className="flex-1">
                              <div className="font-medium">{module.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{module.description}</div>
                            </div>
                            {hasSubModules && (
                              <div className="flex-shrink-0">
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </Link>
                    </div>

                    {/* 子模块 */}
                    {hasSubModules && isExpanded && sidebarOpen && (
                      <div className="ml-6 space-y-1 border-l-2 border-gray-100 pl-4">
                        {module.subModules.map((subModule) => {
                          const isSubActive = isSubModuleActive(subModule)
                          return (
                            <Link
                              key={subModule.id}
                              href={subModule.path}
                              className={cn(
                                "sidebar-nav-sub flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-300 group",
                                isSubActive
                                  ? `sidebar-nav-sub active bg-${module.color}-50 text-${module.color}-700 font-medium border-l-2 border-${module.color}-400 shadow-sm`
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              )}
                            >
                              <subModule.icon
                                className={cn(
                                  "h-4 w-4 flex-shrink-0 transition-colors duration-300",
                                  isSubActive ? `text-${module.color}-600` : "text-gray-400 group-hover:text-gray-600",
                                )}
                              />
                              <span>{subModule.name}</span>
                              {isSubActive && (
                                <Badge variant="secondary" className="ml-auto text-xs">
                                  当前
                                </Badge>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </ScrollArea>

          {/* 底部控制 */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full justify-center"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </aside>

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 顶部导航栏 */}
          <header
            className={cn(
              "nav-header border-b border-gray-200 px-6 py-4",
              `bg-gradient-to-r from-${activeModule.color}-600 to-${activeModule.color}-700`,
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <activeModule.icon className="h-6 w-6 text-white" />
                <div>
                  <h1 className={cn("text-xl font-bold text-white", `text-gradient-${activeModule.color}`)}>
                    {activeModule.name}
                  </h1>
                  <p className="text-sm text-white/80">{activeModule.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {activeModule.subModules.length} 个功能模块
                </Badge>
              </div>
            </div>
          </header>

          {/* 页面内容 */}
          <main className="flex-1 overflow-auto">
            <div className="content-fade-in p-6">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
