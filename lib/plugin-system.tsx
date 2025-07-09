"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Settings,
  Download,
  Trash2,
  Pause,
  RefreshCw,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Users,
  Activity,
  Search,
  Filter,
} from "lucide-react"

// 插件系统架构
export interface Plugin {
  id: string
  name: string
  version: string
  description: string
  author: string
  category: PluginCategory
  permissions: PluginPermission[]
  dependencies: string[]
  isEnabled: boolean
  config: Record<string, any>
  hooks: PluginHooks
  components?: PluginComponents
  api?: PluginAPI
  installed?: boolean
  size?: string
  rating?: number
  downloads?: number
  lastUpdated?: string
  status?: "active" | "inactive" | "error" | "updating"
  icon?: string
}

export type PluginCategory =
  | "ai-enhancement"
  | "data-processing"
  | "ui-extension"
  | "integration"
  | "analytics"
  | "security"

export type PluginPermission =
  | "read-user-data"
  | "write-user-data"
  | "access-ai-api"
  | "modify-ui"
  | "network-access"
  | "file-system"

export interface PluginHooks {
  onInstall?: () => Promise<void>
  onUninstall?: () => Promise<void>
  onEnable?: () => Promise<void>
  onDisable?: () => Promise<void>
  onUserLogin?: (user: any) => Promise<void>
  onSearchQuery?: (query: string) => Promise<string>
  onSearchResult?: (result: any) => Promise<any>
  beforeAIRequest?: (request: any) => Promise<any>
  afterAIResponse?: (response: any) => Promise<any>
}

export interface PluginComponents {
  sidebar?: React.ComponentType<any>
  toolbar?: React.ComponentType<any>
  modal?: React.ComponentType<any>
  widget?: React.ComponentType<any>
}

export interface PluginAPI {
  endpoints: Record<string, (req: any) => Promise<any>>
  middleware?: Array<(req: any, res: any, next: () => void) => void>
}

export interface PluginManifest {
  id: string
  name: string
  version: string
  description: string
  author: string
  homepage?: string
  repository?: string
  license: string
  category: PluginCategory
  permissions: PluginPermission[]
  dependencies: string[]
  minAppVersion: string
  maxAppVersion?: string
  entry: string
  config?: {
    schema: Record<string, any>
    defaults: Record<string, any>
  }
}

// 插件类别
export const PLUGIN_CATEGORIES = [
  { id: "ai-enhancement", name: "AI增强", icon: "🤖" },
  { id: "data-processing", name: "数据处理", icon: "📊" },
  { id: "ui-extension", name: "界面扩展", icon: "🎨" },
  { id: "integration", name: "集成工具", icon: "🔗" },
  { id: "analytics", name: "分析工具", icon: "📈" },
  { id: "security", name: "安全工具", icon: "🔒" },
]

// 模拟插件数据
const MOCK_PLUGINS: Plugin[] = [
  {
    id: "ai-chat-enhancer",
    name: "AI对话增强器",
    version: "2.1.0",
    description: "增强AI对话功能，支持上下文记忆、情感分析和个性化回复",
    author: "AI团队",
    category: "ai-enhancement",
    permissions: ["read-user-data", "access-ai-api"],
    dependencies: [],
    isEnabled: true,
    installed: true,
    size: "2.3MB",
    rating: 4.8,
    downloads: 15420,
    lastUpdated: "2024-01-15",
    status: "active",
    config: {
      maxContextLength: 4000,
      enableEmotionAnalysis: true,
      personalityMode: "friendly",
    },
    hooks: {},
  },
  {
    id: "smart-search",
    name: "智能搜索优化",
    version: "1.5.2",
    description: "优化搜索算法，提供更精准的搜索结果和智能推荐",
    author: "搜索团队",
    category: "data-processing",
    permissions: ["read-user-data"],
    dependencies: [],
    isEnabled: false,
    installed: true,
    size: "1.8MB",
    rating: 4.6,
    downloads: 8930,
    lastUpdated: "2024-01-10",
    status: "inactive",
    config: {},
    hooks: {},
  },
  {
    id: "theme-customizer",
    name: "主题定制器",
    version: "3.0.1",
    description: "提供丰富的主题定制选项，支持深色模式、颜色调整和布局优化",
    author: "UI团队",
    category: "ui-extension",
    permissions: ["modify-ui"],
    dependencies: [],
    isEnabled: true,
    installed: true,
    size: "950KB",
    rating: 4.9,
    downloads: 23150,
    lastUpdated: "2024-01-12",
    status: "active",
    config: {},
    hooks: {},
  },
  {
    id: "data-visualizer",
    name: "数据可视化工具",
    version: "2.3.4",
    description: "强大的数据可视化插件，支持多种图表类型和交互式展示",
    author: "数据团队",
    category: "analytics",
    permissions: ["read-user-data"],
    dependencies: [],
    isEnabled: false,
    installed: false,
    size: "3.2MB",
    rating: 4.7,
    downloads: 12680,
    lastUpdated: "2024-01-08",
    status: "inactive",
    config: {},
    hooks: {},
  },
]

export class PluginManager {
  private static plugins: Map<string, Plugin> = new Map()
  private static enabledPlugins: Set<string> = new Set()
  private static pluginConfigs: Map<string, Record<string, any>> = new Map()

  static {
    // 初始化插件数据
    MOCK_PLUGINS.forEach((plugin) => {
      this.plugins.set(plugin.id, plugin)
      if (plugin.isEnabled) {
        this.enabledPlugins.add(plugin.id)
      }
    })
  }

  // 注册插件
  static registerPlugin(plugin: Plugin): boolean {
    try {
      // 验证插件
      if (!this.validatePlugin(plugin)) {
        throw new Error(`插件验证失败: ${plugin.id}`)
      }

      // 检查依赖
      if (!this.checkDependencies(plugin)) {
        throw new Error(`插件依赖不满足: ${plugin.id}`)
      }

      // 注册插件
      this.plugins.set(plugin.id, plugin)

      // 执行安装钩子
      if (plugin.hooks.onInstall) {
        plugin.hooks.onInstall()
      }

      console.log(`插件已注册: ${plugin.name} v${plugin.version}`)
      return true
    } catch (error) {
      console.error("插件注册失败:", error)
      return false
    }
  }

  // 启用插件
  static async enablePlugin(pluginId: string): Promise<boolean> {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error(`插件不存在: ${pluginId}`)
      }

      // 检查权限
      if (!this.checkPermissions(plugin)) {
        throw new Error(`插件权限不足: ${pluginId}`)
      }

      // 启用插件
      plugin.isEnabled = true
      plugin.status = "active"
      this.enabledPlugins.add(pluginId)

      // 执行启用钩子
      if (plugin.hooks.onEnable) {
        await plugin.hooks.onEnable()
      }

      // 注册API端点
      if (plugin.api) {
        this.registerPluginAPI(plugin)
      }

      console.log(`插件已启用: ${plugin.name}`)
      return true
    } catch (error) {
      console.error("插件启用失败:", error)
      return false
    }
  }

  // 禁用插件
  static async disablePlugin(pluginId: string): Promise<boolean> {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error(`插件不存在: ${pluginId}`)
      }

      // 禁用插件
      plugin.isEnabled = false
      plugin.status = "inactive"
      this.enabledPlugins.delete(pluginId)

      // 执行禁用钩子
      if (plugin.hooks.onDisable) {
        await plugin.hooks.onDisable()
      }

      // 注销API端点
      if (plugin.api) {
        this.unregisterPluginAPI(plugin)
      }

      console.log(`插件已禁用: ${plugin.name}`)
      return true
    } catch (error) {
      console.error("插件禁用失败:", error)
      return false
    }
  }

  // 卸载插件
  static async uninstallPlugin(pluginId: string): Promise<boolean> {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error(`插件不存在: ${pluginId}`)
      }

      // 先禁用插件
      if (plugin.isEnabled) {
        await this.disablePlugin(pluginId)
      }

      // 执行卸载钩子
      if (plugin.hooks.onUninstall) {
        await plugin.hooks.onUninstall()
      }

      // 移除插件
      this.plugins.delete(pluginId)
      this.pluginConfigs.delete(pluginId)

      console.log(`插件已卸载: ${plugin.name}`)
      return true
    } catch (error) {
      console.error("插件卸载失败:", error)
      return false
    }
  }

  // 获取所有插件
  static getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
  }

  // 获取已启用的插件
  static getEnabledPlugins(): Plugin[] {
    return Array.from(this.plugins.values()).filter((p) => p.isEnabled)
  }

  // 按分类获取插件
  static getPluginsByCategory(category: PluginCategory): Plugin[] {
    return Array.from(this.plugins.values()).filter((p) => p.category === category)
  }

  // 执行插件钩子
  static async executeHook<T>(hookName: keyof PluginHooks, ...args: any[]): Promise<T[]> {
    const results: T[] = []

    for (const plugin of this.getEnabledPlugins()) {
      const hook = plugin.hooks[hookName]
      if (hook && typeof hook === "function") {
        try {
          const result = await hook(...args)
          if (result !== undefined) {
            results.push(result)
          }
        } catch (error) {
          console.error(`插件钩子执行失败 ${plugin.id}.${hookName}:`, error)
        }
      }
    }

    return results
  }

  // 获取插件组件
  static getPluginComponents(type: keyof PluginComponents): React.ComponentType<any>[] {
    const components: React.ComponentType<any>[] = []

    for (const plugin of this.getEnabledPlugins()) {
      const component = plugin.components?.[type]
      if (component) {
        components.push(component)
      }
    }

    return components
  }

  // 配置插件
  static configurePlugin(pluginId: string, config: Record<string, any>): boolean {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error(`插件不存在: ${pluginId}`)
      }

      // 验证配置
      if (!this.validateConfig(plugin, config)) {
        throw new Error(`配置验证失败: ${pluginId}`)
      }

      // 保存配置
      plugin.config = { ...plugin.config, ...config }
      this.pluginConfigs.set(pluginId, plugin.config)

      return true
    } catch (error) {
      console.error("插件配置失败:", error)
      return false
    }
  }

  // 获取插件配置
  static getPluginConfig(pluginId: string): Record<string, any> | null {
    return this.pluginConfigs.get(pluginId) || null
  }

  // 安装插件
  static async installPlugin(pluginId: string): Promise<boolean> {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) return false

      plugin.status = "updating"
      await new Promise((resolve) => setTimeout(resolve, 2000))

      plugin.installed = true
      plugin.status = "inactive"
      return true
    } catch (error) {
      const plugin = this.plugins.get(pluginId)
      if (plugin) plugin.status = "error"
      return false
    }
  }

  // 搜索插件
  static searchPlugins(query: string): Plugin[] {
    const lowercaseQuery = query.toLowerCase()
    return this.getAllPlugins().filter(
      (plugin) =>
        plugin.name.toLowerCase().includes(lowercaseQuery) ||
        plugin.description.toLowerCase().includes(lowercaseQuery) ||
        plugin.author.toLowerCase().includes(lowercaseQuery),
    )
  }

  // 私有方法
  private static validatePlugin(plugin: Plugin): boolean {
    // 基本字段验证
    if (!plugin.id || !plugin.name || !plugin.version) {
      return false
    }

    // ID格式验证
    if (!/^[a-z0-9-_]+$/.test(plugin.id)) {
      return false
    }

    // 版本格式验证
    if (!/^\d+\.\d+\.\d+$/.test(plugin.version)) {
      return false
    }

    return true
  }

  private static checkDependencies(plugin: Plugin): boolean {
    for (const dep of plugin.dependencies) {
      if (!this.plugins.has(dep)) {
        console.warn(`缺少依赖插件: ${dep}`)
        return false
      }
    }
    return true
  }

  private static checkPermissions(plugin: Plugin): boolean {
    // 这里应该根据用户角色检查权限
    // 简化实现，实际应该更严格
    return true
  }

  private static registerPluginAPI(plugin: Plugin): void {
    if (!plugin.api?.endpoints) return

    // 注册API端点到路由系统
    for (const [path, handler] of Object.entries(plugin.api.endpoints)) {
      console.log(`注册插件API: /api/plugins/${plugin.id}${path}`)
      // 实际实现中需要注册到Express或Next.js路由
    }
  }

  private static unregisterPluginAPI(plugin: Plugin): void {
    if (!plugin.api?.endpoints) return

    // 注销API端点
    for (const path of Object.keys(plugin.api.endpoints)) {
      console.log(`注销插件API: /api/plugins/${plugin.id}${path}`)
    }
  }

  private static validateConfig(plugin: Plugin, config: Record<string, any>): boolean {
    // 简化的配置验证
    // 实际应该使用JSON Schema或类似工具
    return true
  }
}

// 插件管理界面组件
export function PluginManagerUI() {
  const [plugins, setPlugins] = useState<Plugin[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    // 加载插件列表
    loadPlugins()
  }, [])

  const loadPlugins = () => {
    setLoading(true)
    try {
      const allPlugins = PluginManager.getAllPlugins()
      setPlugins(allPlugins)
    } catch (error) {
      console.error("加载插件失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnablePlugin = async (pluginId: string) => {
    try {
      const plugin = plugins.find((p) => p.id === pluginId)
      if (!plugin) return

      if (plugin.isEnabled) {
        await PluginManager.disablePlugin(pluginId)
      } else {
        await PluginManager.enablePlugin(pluginId)
      }
      loadPlugins()
    } catch (error) {
      console.error("切换插件状态失败:", error)
      alert("操作失败: " + (error instanceof Error ? error.message : String(error)))
    }
  }

  const handleInstallPlugin = async (pluginId: string) => {
    try {
      await PluginManager.installPlugin(pluginId)
      loadPlugins()
    } catch (error) {
      console.error("安装插件失败:", error)
      alert("安装失败: " + (error instanceof Error ? error.message : String(error)))
    }
  }

  const handleUninstallPlugin = async (pluginId: string) => {
    if (!confirm("确定要卸载此插件吗？此操作不可撤销。")) {
      return
    }

    try {
      await PluginManager.uninstallPlugin(pluginId)
      loadPlugins()
    } catch (error) {
      console.error("卸载插件失败:", error)
      alert("卸载失败: " + (error instanceof Error ? error.message : String(error)))
    }
  }

  const handleConfigurePlugin = (plugin: Plugin) => {
    setSelectedPlugin(plugin)
    setShowConfigModal(true)
  }

  const handleSaveConfig = (config: Record<string, any>) => {
    if (!selectedPlugin) return

    try {
      PluginManager.configurePlugin(selectedPlugin.id, config)
      setShowConfigModal(false)
      loadPlugins()
    } catch (error) {
      console.error("保存配置失败:", error)
      alert("保存配置失败: " + (error instanceof Error ? error.message : String(error)))
    }
  }

  // 过滤插件
  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch =
      searchQuery === "" ||
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || plugin.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 统计数据
  const stats = {
    total: plugins.length,
    installed: plugins.filter((p) => p.installed).length,
    enabled: plugins.filter((p) => p.isEnabled).length,
    updating: plugins.filter((p) => p.status === "updating").length,
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="plugin-manager p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">插件管理中心</h1>
        <p className="text-gray-600">管理和配置您的应用插件，扩展功能体验</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-gray-600">总插件数</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.installed}</p>
                <p className="text-sm text-gray-600">已安装</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.enabled}</p>
                <p className="text-sm text-gray-600">运行中</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.updating}</p>
                <p className="text-sm text-gray-600">更新中</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和过滤 */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索插件..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有分类</SelectItem>
              {PLUGIN_CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 插件列表 */}
      {filteredPlugins.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {searchQuery || selectedCategory !== "all" ? "未找到匹配的插件" : "暂无已安装的插件"}
          </p>
          <Button>浏览插件市场</Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlugins.map((plugin) => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
              onToggle={handleEnablePlugin}
              onInstall={handleInstallPlugin}
              onUninstall={handleUninstallPlugin}
              onConfigure={handleConfigurePlugin}
            />
          ))}
        </div>
      )}

      {/* 配置模态框 */}
      <PluginConfigDialog
        plugin={selectedPlugin}
        open={showConfigModal}
        onOpenChange={setShowConfigModal}
        onSave={handleSaveConfig}
      />
    </div>
  )
}

// 插件卡片组件
export function PluginCard({
  plugin,
  onToggle,
  onInstall,
  onUninstall,
  onConfigure,
}: {
  plugin: Plugin
  onToggle: (id: string) => void
  onInstall: (id: string) => void
  onUninstall: (id: string) => void
  onConfigure: (id: string) => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "updating":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "inactive":
        return <Pause className="w-4 h-4" />
      case "error":
        return <AlertCircle className="w-4 h-4" />
      case "updating":
        return <RefreshCw className="w-4 h-4 animate-spin" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const categoryInfo = PLUGIN_CATEGORIES.find((cat) => cat.id === plugin.category)

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              {plugin.icon || plugin.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg">{plugin.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  v{plugin.version}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(plugin.status || "inactive")}`}>
                  {getStatusIcon(plugin.status || "inactive")}
                  <span className="ml-1">
                    {plugin.status === "active"
                      ? "运行中"
                      : plugin.status === "inactive"
                        ? "已停止"
                        : plugin.status === "error"
                          ? "错误"
                          : "更新中"}
                  </span>
                </Badge>
              </div>
            </div>
          </div>
          {plugin.installed && (
            <Switch
              checked={plugin.isEnabled}
              onCheckedChange={() => onToggle(plugin.id)}
              disabled={plugin.status === "updating"}
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-sm line-clamp-2">{plugin.description}</CardDescription>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{plugin.rating || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>{(plugin.downloads || 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{plugin.author}</span>
            </div>
          </div>
          <span className="text-xs">{plugin.size || "未知"}</span>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {categoryInfo?.icon} {categoryInfo?.name}
          </Badge>
          <span className="text-xs text-gray-500">更新于 {plugin.lastUpdated}</span>
        </div>

        <div className="flex space-x-2 pt-2">
          {!plugin.installed ? (
            <Button size="sm" onClick={() => onInstall(plugin.id)} disabled={plugin.status === "updating"}>
              <Download className="w-4 h-4 mr-1" />
              安装
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUninstall(plugin.id)}
              disabled={plugin.status === "updating"}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              卸载
            </Button>
          )}

          {plugin.installed && (
            <Button size="sm" variant="outline" onClick={() => onConfigure(plugin.id)}>
              <Settings className="w-4 h-4 mr-1" />
              配置
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// 插件配置对话框
export function PluginConfigDialog({
  plugin,
  open,
  onOpenChange,
  onSave,
}: {
  plugin: Plugin | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (config: Record<string, any>) => void
}) {
  const [config, setConfig] = useState<Record<string, any>>({})

  useEffect(() => {
    if (plugin?.config) {
      setConfig(plugin.config)
    }
  }, [plugin])

  if (!plugin) return null

  const handleSave = () => {
    onSave(config)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>配置 {plugin.name}</DialogTitle>
          <DialogDescription>调整插件设置以满足您的需求</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">常规设置</TabsTrigger>
            <TabsTrigger value="permissions">权限管理</TabsTrigger>
            <TabsTrigger value="advanced">高级选项</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              {plugin.id === "ai-chat-enhancer" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="maxContextLength">最大上下文长度</Label>
                    <Input
                      id="maxContextLength"
                      type="number"
                      value={config.maxContextLength || 4000}
                      onChange={(e) => setConfig({ ...config, maxContextLength: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableEmotionAnalysis"
                      checked={config.enableEmotionAnalysis || false}
                      onCheckedChange={(checked) => setConfig({ ...config, enableEmotionAnalysis: checked })}
                    />
                    <Label htmlFor="enableEmotionAnalysis">启用情感分析</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="personalityMode">个性化模式</Label>
                    <Select
                      value={config.personalityMode || "friendly"}
                      onValueChange={(value) => setConfig({ ...config, personalityMode: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">友好</SelectItem>
                        <SelectItem value="professional">专业</SelectItem>
                        <SelectItem value="casual">随意</SelectItem>
                        <SelectItem value="formal">正式</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">此插件请求以下权限：</h4>
              {plugin.permissions.map((permission, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{permission}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>高级选项可能影响插件性能，请谨慎修改。</AlertDescription>
            </Alert>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="debugMode">调试模式</Label>
                <Switch
                  id="debugMode"
                  checked={config.debugMode || false}
                  onCheckedChange={(checked) => setConfig({ ...config, debugMode: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customConfig">自定义配置 (JSON)</Label>
                <Textarea
                  id="customConfig"
                  placeholder='{"key": "value"}'
                  value={config.customConfig || ""}
                  onChange={(e) => setConfig({ ...config, customConfig: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>保存配置</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
