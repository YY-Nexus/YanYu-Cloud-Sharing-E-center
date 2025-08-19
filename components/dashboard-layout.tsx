"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Gauge,
  Users,
  Target,
  Zap,
  Award,
  Theater,
  Clock,
  Factory,
  BookOpen,
  Flame,
  Shield,
  ChevronDown,
  Menu,
  Brain,
  Settings,
  Globe,
  Rocket,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeProvider } from "@/components/theme-provider"
import { Logo } from "@/components/logo"

interface ModuleConfig {
  title: string
  icon: React.ReactNode
  description: string
  href: string
  colorScheme: {
    primary: string
    gradient: string
    border: string
    hover: string
    shadow: string
    textColor: string
  }
  subItems?: Array<{
    title: string
    href: string
    description?: string
    icon?: React.ReactNode
  }>
}

interface NavItemProps {
  module: ModuleConfig
  isActive?: boolean
  isOpen?: boolean
  onToggle?: () => void
  children?: React.ReactNode
  isCollapsed?: boolean
}

function NavItem({ module, isActive, isOpen, onToggle, children, isCollapsed }: NavItemProps) {
  return (
    <div className="relative group">
      <div
        className={cn(
          "sidebar-nav-item flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 cursor-pointer relative",
          "hover:shadow-sm hover:scale-[1.01] transform-gpu",
          isActive
            ? `bg-blue-50 text-slate-700 shadow-sm border-l-4 border-blue-500`
            : "hover:bg-slate-50 text-slate-600 hover:text-slate-700 border-l-4 border-transparent",
          isCollapsed ? "justify-center px-2" : "",
        )}
        onClick={onToggle}
        style={{
          borderLeftColor: isActive ? module.colorScheme.primary : "transparent",
        }}
      >
        <div
          className={cn(
            "icon-basic flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
            isActive
              ? "bg-blue-100 text-blue-600 shadow-sm"
              : `${module.colorScheme.textColor} group-hover:bg-slate-100`,
          )}
        >
          {module.icon}
        </div>
        {!isCollapsed && (
          <>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-medium text-sm truncate">{module.title}</span>
              {module.description && (
                <span className="text-xs text-slate-500 truncate transition-colors">{module.description}</span>
              )}
            </div>
            {module.subItems && module.subItems.length > 0 && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-all duration-300 shrink-0",
                  isOpen ? "transform rotate-180" : "",
                  "text-slate-400 group-hover:text-slate-600",
                )}
              />
            )}
          </>
        )}

        {/* 主页徽章 */}
        {isActive && !isCollapsed && (
          <div className="nav-badge absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium text-white bg-blue-500 shadow-sm animate-pulse">
            主页
          </div>
        )}
      </div>

      {/* 悬浮子菜单（收缩状态） */}
      {isCollapsed && module.subItems && module.subItems.length > 0 && (
        <div className="absolute left-full top-0 ml-3 bg-white border border-slate-200 shadow-lg rounded-xl p-3 w-56 hidden group-hover:block z-50">
          <div className="text-sm font-semibold mb-3 text-slate-700 border-b border-slate-100 pb-2">{module.title}</div>
          <div className="space-y-1">
            {module.subItems.map((subItem) => (
              <Link
                key={subItem.title}
                href={subItem.href}
                className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 展开子菜单 */}
      {!isCollapsed && isOpen && children && <div className="ml-10 mt-2 mb-2 space-y-1">{children}</div>}
    </div>
  )
}

function SubNavItem({
  title,
  href,
  isActive,
  colorScheme,
  icon,
}: {
  title: string
  href: string
  isActive?: boolean
  colorScheme: ModuleConfig["colorScheme"]
  icon?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "sidebar-nav-sub flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-300 hover:scale-[1.01] transform-gpu",
        isActive
          ? "bg-blue-50 text-blue-700 font-medium shadow-sm border-l-2 border-blue-400"
          : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
      )}
    >
      {icon && <div className="w-4 h-4 mr-2 shrink-0 text-slate-400">{icon}</div>}
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 shrink-0",
          isActive ? "bg-blue-500" : "bg-slate-300",
        )}
      />
      <span className="truncate">{title}</span>
    </Link>
  )
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeModule, setActiveModule] = useState("数据中心")
  const [activeSubModule, setActiveSubModule] = useState<string | null>("数据采集整合")
  const [openModules, setOpenModules] = useState<string[]>(["数据中心"])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleModule = (title: string) => {
    if (isCollapsed) return
    setOpenModules((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const modules: ModuleConfig[] = [
    {
      title: "数据中心",
      icon: <BarChart3 className="h-4 w-4" />,
      description: "数据分析决策",
      href: "/data-center",
      colorScheme: {
        primary: "#10B981",
        gradient: "linear-gradient(135deg, #10B981, #34D399)",
        border: "#10B981",
        hover: "rgba(16, 185, 129, 0.1)",
        shadow: "rgba(16, 185, 129, 0.25)",
        textColor: "text-emerald-500",
      },
      subItems: [
        {
          title: "数据采集整合",
          href: "/data-center/collection",
          description: "多源数据接入、清洗规范、ETL流程管理",
          icon: <Settings className="h-3 w-3" />,
        },
        {
          title: "可视化分析",
          href: "/data-center/visualization",
          description: "图表看板动态生成、多维钻取、实时监控",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "决策模型应用",
          href: "/data-center/decision-model",
          description: "智能算法支撑、场景化决策、预测分析",
          icon: <Brain className="h-3 w-3" />,
        },
        {
          title: "数据安全审计",
          href: "/data-center/security-audit",
          description: "权限管控、日志追溯、合规检查",
          icon: <Shield className="h-3 w-3" />,
        },
        {
          title: "数据质量管理",
          href: "/data-center/quality",
          description: "数据质量评估、异常检测、清洗规则",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "数据资产目录",
          href: "/data-center/catalog",
          description: "元数据管理、血缘关系、资产盘点",
          icon: <BookOpen className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "组织管理",
      icon: <Gauge className="h-4 w-4" />,
      description: "人力资源体系",
      href: "/organization",
      colorScheme: {
        primary: "#F59E0B",
        gradient: "radial-gradient(circle, #FBBF24, #F59E0B)",
        border: "#F59E0B",
        hover: "rgba(245, 158, 11, 0.1)",
        shadow: "rgba(245, 158, 11, 0.25)",
        textColor: "text-amber-500",
      },
      subItems: [
        {
          title: "组织架构设计",
          href: "/organization/structure",
          description: "层级梳理、岗位配置、职责划分",
          icon: <Users className="h-3 w-3" />,
        },
        {
          title: "人才招聘体系",
          href: "/organization/recruitment",
          description: "渠道管理、简历智能筛选、面试流程",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "员工培训发展",
          href: "/organization/training",
          description: "课程体系、成长路径追踪、技能评估",
          icon: <BookOpen className="h-3 w-3" />,
        },
        {
          title: "人力成本核算",
          href: "/organization/cost",
          description: "薪资社保、预算管控、成本分析",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "员工关系管理",
          href: "/organization/relations",
          description: "员工满意度、离职分析、团队建设",
          icon: <Users className="h-3 w-3" />,
        },
        {
          title: "考勤管理",
          href: "/organization/attendance",
          description: "打卡统计、请假审批、排班管理",
          icon: <Clock className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "绩效激励",
      icon: <Target className="h-4 w-4" />,
      description: "目标考核体系",
      href: "/performance",
      colorScheme: {
        primary: "#F59E0B",
        gradient: "radial-gradient(circle, #FBBF24, #F59E0B)",
        border: "#F59E0B",
        hover: "rgba(245, 158, 11, 0.1)",
        shadow: "rgba(245, 158, 11, 0.25)",
        textColor: "text-amber-500",
      },
      subItems: [
        {
          title: "目标拆解与对齐",
          href: "/performance/goal-alignment",
          description: "战略分解、部门个人指标、OKR管理",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "考核流程管理",
          href: "/performance/evaluation",
          description: "周期设置、评分规则、进度跟踪",
          icon: <Settings className="h-3 w-3" />,
        },
        {
          title: "激励策略配置",
          href: "/performance/incentive",
          description: "奖金晋升、荣誉方案、积分体系",
          icon: <Award className="h-3 w-3" />,
        },
        {
          title: "绩效数据分析",
          href: "/performance/analysis",
          description: "结果复盘、改进建议、趋势预测",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "360度评估",
          href: "/performance/360-review",
          description: "多维度评价、同事互评、上下级评估",
          icon: <Users className="h-3 w-3" />,
        },
        {
          title: "绩效改进计划",
          href: "/performance/improvement",
          description: "个人发展计划、技能提升、导师制",
          icon: <Zap className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "客户服务",
      icon: <Theater className="h-4 w-4" />,
      description: "客户关系管理",
      href: "/customer-service",
      colorScheme: {
        primary: "#3B82F6",
        gradient: "linear-gradient(45deg, #2563EB, #3B82F6)",
        border: "#3B82F6",
        hover: "rgba(59, 130, 246, 0.1)",
        shadow: "rgba(59, 130, 246, 0.25)",
        textColor: "text-blue-500",
      },
      subItems: [
        {
          title: "客户信息管理",
          href: "/customer-service/info",
          description: "档案建立、标签体系、画像生成、联系记录",
          icon: <Users className="h-3 w-3" />,
        },
        {
          title: "服务流程设计",
          href: "/customer-service/process",
          description: "售前咨询、售后响应、投诉处理、工单管理",
          icon: <Settings className="h-3 w-3" />,
        },
        {
          title: "满意度调研分析",
          href: "/customer-service/satisfaction",
          description: "问卷配置、结果统计、改进举措、NPS分析",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "客户分层运营",
          href: "/customer-service/segmentation",
          description: "VIP服务、沉睡客户唤醒、生命周期管理",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "智能客服",
          href: "/customer-service/ai-service",
          description: "机器人客服、知识库、智能路由",
          icon: <Brain className="h-3 w-3" />,
        },
        {
          title: "服务质量监控",
          href: "/customer-service/quality",
          description: "通话录音、服务评分、质检报告",
          icon: <Shield className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "流程管控",
      icon: <Clock className="h-4 w-4" />,
      description: "业务流程优化",
      href: "/process-control",
      colorScheme: {
        primary: "#3B82F6",
        gradient: "linear-gradient(45deg, #2563EB, #3B82F6)",
        border: "#3B82F6",
        hover: "rgba(59, 130, 246, 0.1)",
        shadow: "rgba(59, 130, 246, 0.25)",
        textColor: "text-blue-500",
      },
      subItems: [
        {
          title: "流程建模与设计",
          href: "/process-control/modeling",
          description: "可视化搭建、节点配置、流程图绘制",
          icon: <Settings className="h-3 w-3" />,
        },
        {
          title: "流程自动化运行",
          href: "/process-control/automation",
          description: "任务触发、流转监控、自动审批",
          icon: <Zap className="h-3 w-3" />,
        },
        {
          title: "流程效率分析",
          href: "/process-control/efficiency",
          description: "耗时统计、瓶颈识别、优化建议",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "流程版本迭代",
          href: "/process-control/iteration",
          description: "优化方案、历史回溯、A/B测试",
          icon: <Clock className="h-3 w-3" />,
        },
        {
          title: "审批管理",
          href: "/process-control/approval",
          description: "多级审批、条件路由、电子签章",
          icon: <Shield className="h-3 w-3" />,
        },
        {
          title: "表单设计器",
          href: "/process-control/forms",
          description: "拖拽式表单、字段验证、数据收集",
          icon: <Factory className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "创新管理",
      icon: <Factory className="h-4 w-4" />,
      description: "创新驱动发展",
      href: "/innovation",
      colorScheme: {
        primary: "#8B5CF6",
        gradient: "radial-gradient(circle, #A855F7, #8B5CF6)",
        border: "#8B5CF6",
        hover: "rgba(139, 92, 246, 0.1)",
        shadow: "rgba(139, 92, 246, 0.25)",
        textColor: "text-purple-500",
      },
      subItems: [
        {
          title: "创新提案征集",
          href: "/innovation/proposal",
          description: "渠道搭建、创意筛选、评审流程",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "项目孵化支持",
          href: "/innovation/incubation",
          description: "资源匹配、进度管控、里程碑管理",
          icon: <Rocket className="h-3 w-3" />,
        },
        {
          title: "创新成果评估",
          href: "/innovation/evaluation",
          description: "价值测算、推广路径、ROI分析",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "创新文化建设",
          href: "/innovation/culture",
          description: "案例分享、激励活动、创新氛围",
          icon: <Users className="h-3 w-3" />,
        },
        {
          title: "知识产权管理",
          href: "/innovation/ip",
          description: "专利申请、商标注册、版权保护",
          icon: <Shield className="h-3 w-3" />,
        },
        {
          title: "外部合作",
          href: "/innovation/partnership",
          description: "产学研合作、技术引进、联合创新",
          icon: <Globe className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "效率优化",
      icon: <Zap className="h-4 w-4" />,
      description: "运营效率提升",
      href: "/efficiency",
      colorScheme: {
        primary: "#10B981",
        gradient: "linear-gradient(135deg, #10B981, #34D399)",
        border: "#10B981",
        hover: "rgba(16, 185, 129, 0.1)",
        shadow: "rgba(16, 185, 129, 0.25)",
        textColor: "text-emerald-500",
      },
      subItems: [
        {
          title: "效率诊断工具",
          href: "/efficiency/diagnosis",
          description: "流程耗时、资源占用分析、瓶颈识别",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "自动化方案落地",
          href: "/efficiency/automation",
          description: "重复性工作替代、工具集成、RPA部署",
          icon: <Settings className="h-3 w-3" />,
        },
        {
          title: "跨部门协同优化",
          href: "/efficiency/collaboration",
          description: "沟通机制、协作流程、信息共享",
          icon: <Users className="h-3 w-3" />,
        },
        {
          title: "效率指标监控",
          href: "/efficiency/monitoring",
          description: "实时看板、预警设置、KPI追踪",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "工作负载均衡",
          href: "/efficiency/workload",
          description: "任务分配、资源调度、能力匹配",
          icon: <Gauge className="h-3 w-3" />,
        },
        {
          title: "时间管理",
          href: "/efficiency/time",
          description: "时间追踪、效率分析、工作计划",
          icon: <Clock className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "多元服务",
      icon: <Users className="h-4 w-4" />,
      description: "多维度服务体系",
      href: "/multi-service",
      colorScheme: {
        primary: "#EC4899",
        gradient: "linear-gradient(135deg, #F43F5E, #EC4899)",
        border: "#EC4899",
        hover: "rgba(236, 72, 153, 0.1)",
        shadow: "rgba(236, 72, 153, 0.25)",
        textColor: "text-pink-500",
      },
      subItems: [
        {
          title: "专属服务定制",
          href: "/multi-service/customization",
          description: "按需配置、个性化方案、定制开发",
          icon: <Settings className="h-3 w-3" />,
        },
        {
          title: "服务渠道管理",
          href: "/multi-service/channels",
          description: "线上线下、触点优化、全渠道整合",
          icon: <Globe className="h-3 w-3" />,
        },
        {
          title: "服务质量监督",
          href: "/multi-service/quality",
          description: "质检标准、问题闭环、持续改进",
          icon: <Shield className="h-3 w-3" />,
        },
        {
          title: "跨领域服务拓展",
          href: "/multi-service/expansion",
          description: "新场景挖掘、合作对接、生态建设",
          icon: <Rocket className="h-3 w-3" />,
        },
        {
          title: "服务标准化",
          href: "/multi-service/standardization",
          description: "SOP制定、培训体系、认证管理",
          icon: <BookOpen className="h-3 w-3" />,
        },
        {
          title: "服务创新",
          href: "/multi-service/innovation",
          description: "新服务开发、用户体验优化、技术应用",
          icon: <Factory className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "知识管理",
      icon: <BookOpen className="h-4 w-4" />,
      description: "企业知识体系",
      href: "/knowledge",
      colorScheme: {
        primary: "#8B5CF6",
        gradient: "radial-gradient(circle, #A855F7, #8B5CF6)",
        border: "#8B5CF6",
        hover: "rgba(139, 92, 246, 0.1)",
        shadow: "rgba(139, 92, 246, 0.25)",
        textColor: "text-purple-500",
      },
      subItems: [
        {
          title: "知识仓库搭建",
          href: "/knowledge/repository",
          description: "文档分类、权限分级、版本控制",
          icon: <BookOpen className="h-3 w-3" />,
        },
        {
          title: "知识共创平台",
          href: "/knowledge/collaboration",
          description: "员工贡献、审核机制、协作编辑",
          icon: <Users className="h-3 w-3" />,
        },
        {
          title: "知识检索应用",
          href: "/knowledge/search",
          description: "智能搜索、关联推荐、语义理解",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "知识更新迭代",
          href: "/knowledge/update",
          description: "过时内容清理、动态补充、质量评估",
          icon: <Clock className="h-3 w-3" />,
        },
        {
          title: "专家网络",
          href: "/knowledge/experts",
          description: "专家识别、知识地图、经验传承",
          icon: <Award className="h-3 w-3" />,
        },
        {
          title: "学习路径",
          href: "/knowledge/learning",
          description: "个性化推荐、学习计划、进度跟踪",
          icon: <Zap className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "营销推广",
      icon: <Flame className="h-4 w-4" />,
      description: "市场营销体系",
      href: "/marketing",
      colorScheme: {
        primary: "#F59E0B",
        gradient: "radial-gradient(circle, #FBBF24, #F59E0B)",
        border: "#F59E0B",
        hover: "rgba(245, 158, 11, 0.1)",
        shadow: "rgba(245, 158, 11, 0.25)",
        textColor: "text-amber-500",
      },
      subItems: [
        {
          title: "营销方案策划",
          href: "/marketing/planning",
          description: "目标人群、渠道组合、创意设计、预算规划",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "推广活动执行",
          href: "/marketing/execution",
          description: "进度跟踪、资源投放监控、效果实时反馈",
          icon: <Zap className="h-3 w-3" />,
        },
        {
          title: "营销效果分析",
          href: "/marketing/analysis",
          description: "数据统计、ROI测算、转化漏斗分析",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "营销素材管理",
          href: "/marketing/materials",
          description: "海报文案、视频库、品牌资产管理",
          icon: <Factory className="h-3 w-3" />,
        },
        {
          title: "客户获取",
          href: "/marketing/acquisition",
          description: "线索管理、转化跟踪、渠道优化",
          icon: <Users className="h-3 w-3" />,
        },
        {
          title: "品牌管理",
          href: "/marketing/brand",
          description: "品牌形象、口碑监测、危机公关",
          icon: <Shield className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "风险管控",
      icon: <Shield className="h-4 w-4" />,
      description: "风险防控体系",
      href: "/risk-control",
      colorScheme: {
        primary: "#3B82F6",
        gradient: "linear-gradient(45deg, #2563EB, #3B82F6)",
        border: "#3B82F6",
        hover: "rgba(59, 130, 246, 0.1)",
        shadow: "rgba(59, 130, 246, 0.25)",
        textColor: "text-blue-500",
      },
      subItems: [
        {
          title: "风险识别模型",
          href: "/risk-control/identification",
          description: "行业业务风险库、智能预警、风险扫描",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "风险评估流程",
          href: "/risk-control/assessment",
          description: "等级划分、影响测算、概率分析",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "应对策略配置",
          href: "/risk-control/strategy",
          description: "规避缓解、转移方案、应急预案",
          icon: <Settings className="h-3 w-3" />,
        },
        {
          title: "风险处置跟踪",
          href: "/risk-control/tracking",
          description: "措施执行、效果复盘、持续监控",
          icon: <Clock className="h-3 w-3" />,
        },
        {
          title: "合规管理",
          href: "/risk-control/compliance",
          description: "法规遵循、内控制度、审计配合",
          icon: <BookOpen className="h-3 w-3" />,
        },
        {
          title: "危机管理",
          href: "/risk-control/crisis",
          description: "应急响应、危机沟通、恢复计划",
          icon: <Zap className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "战略决策",
      icon: <Award className="h-4 w-4" />,
      description: "战略规划体系",
      href: "/strategy",
      colorScheme: {
        primary: "#8B5CF6",
        gradient: "radial-gradient(circle, #A855F7, #8B5CF6)",
        border: "#8B5CF6",
        hover: "rgba(139, 92, 246, 0.1)",
        shadow: "rgba(139, 92, 246, 0.25)",
        textColor: "text-purple-500",
      },
      subItems: [
        {
          title: "战略环境分析",
          href: "/strategy/environment",
          description: "行业趋势、竞争格局洞察、SWOT分析",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "战略目标拆解",
          href: "/strategy/goals",
          description: "长期短期、部门承接、指标体系",
          icon: <Target className="h-3 w-3" />,
        },
        {
          title: "战略执行监控",
          href: "/strategy/execution",
          description: "关键指标、进度预警、里程碑管理",
          icon: <Gauge className="h-3 w-3" />,
        },
        {
          title: "战略复盘迭代",
          href: "/strategy/review",
          description: "结果评估、优化调整、经验总结",
          icon: <Clock className="h-3 w-3" />,
        },
        {
          title: "投资决策",
          href: "/strategy/investment",
          description: "项目评估、资源配置、投资组合",
          icon: <Factory className="h-3 w-3" />,
        },
        {
          title: "战略沟通",
          href: "/strategy/communication",
          description: "愿景传达、共识建立、文化塑造",
          icon: <Users className="h-3 w-3" />,
        },
      ],
    },
    {
      title: "智能引擎",
      icon: <Brain className="h-4 w-4" />,
      description: "AI智能赋能体系",
      href: "/ai-engine",
      colorScheme: {
        primary: "#8B5CF6",
        gradient: "radial-gradient(circle, #A855F7, #8B5CF6)",
        border: "#8B5CF6",
        hover: "rgba(139, 92, 246, 0.1)",
        shadow: "rgba(139, 92, 246, 0.25)",
        textColor: "text-purple-500",
      },
      subItems: [
        {
          title: "智能运维",
          href: "/ai-engine/operations",
          description: "数字化管理、流程自动化诊断、智能监控",
          icon: <Settings className="h-3 w-3" />,
        },
        {
          title: "平台对接",
          href: "/ai-engine/integration",
          description: "多平台对接、API链路配置、数据同步",
          icon: <Globe className="h-3 w-3" />,
        },
        {
          title: "智能创作",
          href: "/ai-engine/creation",
          description: "AI内容生成、全平台打通、创意辅助",
          icon: <Factory className="h-3 w-3" />,
        },
        {
          title: "智能营销",
          href: "/ai-engine/marketing",
          description: "节日营销库、推广执行、精准投放",
          icon: <Rocket className="h-3 w-3" />,
        },
        {
          title: "应用总览",
          href: "/ai-engine/overview",
          description: "智能模块数据看板、使用权限配置",
          icon: <BarChart3 className="h-3 w-3" />,
        },
        {
          title: "智能决策",
          href: "/ai-engine/decision",
          description: "预测分析、决策支持、风险评估",
          icon: <Brain className="h-3 w-3" />,
        },
        {
          title: "自然语言处理",
          href: "/ai-engine/nlp",
          description: "文本分析、语义理解、智能问答",
          icon: <BookOpen className="h-3 w-3" />,
        },
        {
          title: "机器学习平台",
          href: "/ai-engine/ml",
          description: "模型训练、算法优化、自动化部署",
          icon: <Zap className="h-3 w-3" />,
        },
      ],
    },
  ]

  const currentModule = modules.find((m) => m.title === activeModule)

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-slate-50">
        {/* 移动端遮罩 */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* 侧边栏 */}
        <aside
          className={cn(
            "sidebar-nav h-screen flex-col fixed inset-y-0 bg-white border-r border-slate-200 shadow-sm z-50 transition-all duration-300",
            isCollapsed ? "w-16" : "w-64",
            isMobileMenuOpen ? "flex" : "hidden lg:flex",
          )}
        >
          {/* Logo区域 */}
          <div
            className={cn(
              "flex h-16 items-center border-b border-slate-200 transition-all duration-300 bg-slate-50/50",
              isCollapsed ? "px-2 justify-center" : "px-4",
            )}
          >
            <Logo showText={!isCollapsed} size={isCollapsed ? "sm" : "md"} />
          </div>

          {/* 收缩按钮 */}
          <div className="hidden lg:flex justify-end p-3 border-b border-slate-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="icon-basic text-slate-500 hover:text-slate-700 hover:bg-slate-100 h-8 w-8 p-0 rounded-lg"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* 移动端关闭按钮 */}
          <div className="lg:hidden flex justify-end p-3 border-b border-slate-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
              className="icon-basic text-slate-500 hover:text-slate-700 hover:bg-slate-100 h-8 w-8 p-0 rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* 导航区域 */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-2">
              {modules.map((module) => (
                <NavItem
                  key={module.title}
                  module={module}
                  isActive={activeModule === module.title}
                  isOpen={openModules.includes(module.title)}
                  onToggle={() => toggleModule(module.title)}
                  isCollapsed={isCollapsed}
                >
                  {module.subItems &&
                    module.subItems.map((subItem) => (
                      <SubNavItem
                        key={subItem.title}
                        title={subItem.title}
                        href={subItem.href}
                        isActive={activeSubModule === subItem.title}
                        colorScheme={module.colorScheme}
                        icon={subItem.icon}
                      />
                    ))}
                </NavItem>
              ))}
            </div>
          </ScrollArea>

          {/* 底部品牌信息 */}
          {!isCollapsed && (
            <div className="p-4 border-t border-slate-200 bg-slate-50/30">
              <div className="text-center">
                <div className="text-xs text-slate-400 mb-1">Powered by</div>
                <div className="text-sm font-medium text-slate-600">YanYu Cloud Sharing</div>
                <div className="text-xs text-slate-400">E-center v2.0</div>
              </div>
            </div>
          )}
        </aside>

        {/* 主内容区域 */}
        <div className={cn("flex flex-col flex-1 transition-all duration-300", isCollapsed ? "lg:pl-16" : "lg:pl-64")}>
          {/* 顶部导航栏 */}
          <header className="nav-header sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200 bg-gray-800 px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-gray-200 hover:text-white hover:bg-gray-700"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">切换导航菜单</span>
            </Button>
            <div className="flex items-center gap-3">
              <div
                className="w-1 h-6 rounded-full"
                style={{ backgroundColor: currentModule?.colorScheme.primary || "#64748b" }}
              />
              <h1 className="text-xl font-semibold text-gray-200">{activeModule}</h1>
              {currentModule && (
                <span className="text-sm text-gray-400 hidden md:block">{currentModule.description}</span>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="text-xs text-gray-400 hidden sm:block">YanYu Cloud Sharing E-center</div>
            </div>
          </header>

          {/* 主要内容 */}
          <main className="content-fade-in flex-1 p-6 bg-slate-50">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
