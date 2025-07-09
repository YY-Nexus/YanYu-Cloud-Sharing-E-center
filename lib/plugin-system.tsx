'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, Settings, Play, Pause, Square, RefreshCw, AlertTriangle, CheckCircle, XCircle, Code, Zap, Shield, Globe, Users, Star, Heart, Eye, MessageSquare, Share2, Filter, Search, Plus, Trash2, Edit, Upload, DownloadIcon } from 'lucide-react'

// 插件接口定义
export interface Plugin {
  id: string
  name: string
  version: string
  description: string
  author: string
  category: 'ai' | 'productivity' | 'utility' | 'integration' | 'entertainment'
  status: 'active' | 'inactive' | 'error' | 'updating'
  enabled: boolean
  installed: boolean
  size: string
  rating: number
  downloads: number
  lastUpdated: string
  permissions: string[]
  dependencies: string[]
  icon: string
  screenshots: string[]
  changelog: string[]
  config?: Record<string, any>
  api?: {
    endpoints: string[]
    methods: string[]
  }
}

// 插件商店接口
export interface PluginStore {
  featured: Plugin[]
  popular: Plugin[]
  recent: Plugin[]
  categories: Record<string, Plugin[]>
}

// 插件执行上下文
export interface PluginContext {
  user: {
    id: string
    name: string
    permissions: string[]
  }
  app: {
    version: string
    theme: string
    language: string
  }
  api: {
    search: (query: string) => Promise<any>
    generate: (prompt: string) => Promise<any>
    storage: {
      get: (key: string) => Promise<any>
      set: (key: string, value: any) => Promise<void>
      delete: (key: string) => Promise<void>
    }
  }
}

// 模拟插件数据
const mockPlugins: Plugin[] = [
  {
    id: 'ai-translator',
    name: 'AI智能翻译',
    version: '2.1.0',
    description: '支持100+语言的实时翻译插件，集成多个翻译引擎，提供高质量翻译服务',
    author: 'YanYu团队',
    category: 'ai',
    status: 'active',
    enabled: true,
    installed: true,
    size: '2.3MB',
    rating: 4.8,
    downloads: 15420,
    lastUpdated: '2024-01-10',
    permissions: ['网络访问', '剪贴板读写', '语言检测'],
    dependencies: ['@ai-sdk/openai', 'react'],
    icon: '🌐',
    screenshots: ['/placeholder.svg?height=200&width=300&text=翻译界面'],
    changelog: [
      'v2.1.0: 新增语音翻译功能',
      'v2.0.5: 修复批量翻译bug',
      'v2.0.0: 重构翻译引擎'
    ],
    config: {
      defaultLanguage: 'zh-CN',
      autoDetect: true,
      showConfidence: true
    }
  },
  {
    id: 'code-formatter',
    name: '代码格式化工具',
    version: '1.5.2',
    description: '支持多种编程语言的代码格式化和美化工具，提升代码可读性',
    author: '开发者社区',
    category: 'productivity',
    status: 'active',
    enabled: true,
    installed: true,
    size: '1.8MB',
    rating: 4.6,
    downloads: 8930,
    lastUpdated: '2024-01-08',
    permissions: ['文件读写', '代码解析'],
    dependencies: ['prettier', 'eslint'],
    icon: '💻',
    screenshots: ['/placeholder.svg?height=200&width=300&text=代码格式化'],
    changelog: [
      'v1.5.2: 支持TypeScript 5.0',
      'v1.5.0: 新增自定义规则',
      'v1.4.8: 性能优化'
    ]
  },
  {
    id: 'weather-widget',
    name: '天气小组件',
    version: '3.0.1',
    description: '实时天气信息显示，支持全球城市天气查询和预报',
    author: '天气开发者',
    category: 'utility',
    status: 'inactive',
    enabled: false,
    installed: true,
    size: '950KB',
    rating: 4.2,
    downloads: 12500,
    lastUpdated: '2024-01-05',
    permissions: ['位置访问', '网络请求'],
    dependencies: ['axios'],
    icon: '🌤️',
    screenshots: ['/placeholder.svg?height=200&width=300&text=天气界面'],
    changelog: [
      'v3.0.1: 修复定位问题',
      'v3.0.0: 全新UI设计',
      'v2.9.5: 新增空气质量'
    ]
  },
  {
    id: 'social-share',
    name: '社交分享助手',
    version: '1.2.3',
    description: '一键分享到各大社交平台，支持自定义分享内容和格式',
    author: '社交媒体团队',
    category: 'integration',
    status: 'error',
    enabled: false,
    installed: true,
    size: '1.2MB',
    rating: 3.9,
    downloads: 6780,
    lastUpdated: '2024-01-03',
    permissions: ['社交媒体访问', '图片处理'],
    dependencies: ['react-share'],
    icon: '📱',
    screenshots: ['/placeholder.svg?height=200&width=300&text=分享界面'],
    changelog: [
      'v1.2.3: 修复微博分享',
      'v1.2.0: 支持Instagram',
      'v1.1.8: 优化分享速度'
    ]
  },
  {
    id: 'music-player',
    name: '音乐播放器',
    version: '2.3.0',
    description: '轻量级音乐播放器，支持多种音频格式和在线音乐流媒体',
    author: '音乐爱好者',
    category: 'entertainment',
    status: 'updating',
    enabled: true,
    installed: true,
    size: '3.1MB',
    rating: 4.5,
    downloads: 9840,
    lastUpdated: '2024-01-12',
    permissions: ['音频播放', '文件访问', '网络流媒体'],
    dependencies: ['howler', 'react-audio-player'],
    icon: '🎵',
    screenshots: ['/placeholder.svg?height=200&width=300&text=音乐播放器'],
    changelog: [
      'v2.3.0: 新增歌词显示',
      'v2.2.5: 支持播放列表',
      'v2.2.0: 音质增强'
    ]
  }
]

// 插件商店数据
const mockPluginStore: PluginStore = {
  featured: mockPlugins.slice(0, 3),
  popular: mockPlugins.slice(1, 4),
  recent: mockPlugins.slice(2, 5),
  categories: {
    ai: mockPlugins.filter(p => p.category === 'ai'),
    productivity: mockPlugins.filter(p => p.category === 'productivity'),
    utility: mockPlugins.filter(p => p.category === 'utility'),
    integration: mockPlugins.filter(p => p.category === 'integration'),
    entertainment: mockPlugins.filter(p => p.category === 'entertainment')
  }
}

// 插件管理器类
export class PluginManager {
  private plugins: Map<string, Plugin> = new Map()
  private context: PluginContext
  private eventListeners: Map<string, Function[]> = new Map()

  constructor(context: PluginContext) {
    this.context = context
    this.loadInstalledPlugins()
  }

  // 加载已安装插件
  private async loadInstalledPlugins() {
    try {
      const installedPlugins = await this.context.api.storage.get('installed_plugins') || []
      installedPlugins.forEach((plugin: Plugin) => {
        this.plugins.set(plugin.id, plugin)
      })
    } catch (error) {
      console.error('加载插件失败:', error)
    }
  }

  // 安装插件
  async installPlugin(pluginId: string): Promise<boolean> {
    try {
      // 模拟插件安装过程
      const plugin = mockPlugins.find(p => p.id === pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      // 检查权限
      if (!this.checkPermissions(plugin.permissions)) {
        throw new Error('权限不足')
      }

      // 检查依赖
      if (!await this.checkDependencies(plugin.dependencies)) {
        throw new Error('依赖检查失败')
      }

      // 安装插件
      plugin.installed = true
      plugin.status = 'active'
      this.plugins.set(pluginId, plugin)

      // 保存到存储
      await this.savePlugins()

      // 触发事件
      this.emit('plugin:installed', plugin)

      return true
    } catch (error) {
      console.error('插件安装失败:', error)
      return false
    }
  }

  // 卸载插件
  async uninstallPlugin(pluginId: string): Promise<boolean> {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      // 停用插件
      await this.disablePlugin(pluginId)

      // 清理插件数据
      await this.context.api.storage.delete(`plugin_${pluginId}_data`)

      // 移除插件
      this.plugins.delete(pluginId)

      // 保存到存储
      await this.savePlugins()

      // 触发事件
      this.emit('plugin:uninstalled', plugin)

      return true
    } catch (error) {
      console.error('插件卸载失败:', error)
      return false
    }
  }

  // 启用插件
  async enablePlugin(pluginId: string): Promise<boolean> {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      plugin.enabled = true
      plugin.status = 'active'

      // 初始化插件
      await this.initializePlugin(plugin)

      // 保存状态
      await this.savePlugins()

      // 触发事件
      this.emit('plugin:enabled', plugin)

      return true
    } catch (error) {
      console.error('插件启用失败:', error)
      return false
    }
  }

  // 停用插件
  async disablePlugin(pluginId: string): Promise<boolean> {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      plugin.enabled = false
      plugin.status = 'inactive'

      // 清理插件资源
      await this.cleanupPlugin(plugin)

      // 保存状态
      await this.savePlugins()

      // 触发事件
      this.emit('plugin:disabled', plugin)

      return true
    } catch (error) {
      console.error('插件停用失败:', error)
      return false
    }
  }

  // 更新插件
  async updatePlugin(pluginId: string): Promise<boolean> {
    try {
      const plugin = this.plugins.get(pluginId)
      if (!plugin) {
        throw new Error('插件不存在')
      }

      plugin.status = 'updating'

      // 模拟更新过程
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 更新版本信息
      plugin.version = '2.0.0'
      plugin.lastUpdated = new Date().toISOString().split('T')[0]
      plugin.status = 'active'

      // 保存状态
      await this.savePlugins()

      // 触发事件
      this.emit('plugin:updated', plugin)

      return true
    } catch (error) {
      console.error('插件更新失败:', error)
      return false
    }
  }

  // 获取插件列表
  getPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
  }

  // 获取插件
  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId)
  }

  // 检查权限
  private checkPermissions(permissions: string[]): boolean {
    // 简化的权限检查
    return this.context.user.permissions.includes('admin') || 
           permissions.every(p => this.context.user.permissions.includes(p))
  }

  // 检查依赖
  private async checkDependencies(dependencies: string[]): Promise<boolean> {
    // 简化的依赖检查
    return true
  }

  // 初始化插件
  private async initializePlugin(plugin: Plugin): Promise<void> {
    // 插件初始化逻辑
    console.log(`初始化插件: ${plugin.name}`)
  }

  // 清理插件
  private async cleanupPlugin(plugin: Plugin): Promise<void> {
    // 插件清理逻辑
    console.log(`清理插件: ${plugin.name}`)
  }

  // 保存插件状态
  private async savePlugins(): Promise<void> {
    const plugins = Array.from(this.plugins.values())
    await this.context.api.storage.set('installed_plugins', plugins)
  }

  // 事件监听
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, [])
    }
    this.eventListeners.get(event)!.push(callback)
  }

  // 触发事件
  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event) || []
    listeners.forEach(callback => callback(data))
  }
}

// 插件卡片组件
const PluginCard: React.FC<{
  plugin: Plugin
  onInstall?: (id: string) => void
  onUninstall?: (id: string) => void
  onEnable?: (id: string) => void
  onDisable?: (id: string) => void
  onUpdate?: (id: string) => void
  onConfigure?: (id: string) => void
}> = ({ 
  plugin, 
  onInstall, 
  onUninstall, 
  onEnable, 
  onDisable, 
  onUpdate, 
  onConfigure 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'updating': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'inactive': return <Pause className="w-4 h-4" />
      case 'error': return <XCircle className="w-4 h-4" />
      case 'updating': return <RefreshCw className="w-4 h-4 animate-spin" />
      default: return <Square className="w-4 h-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return <Zap className="w-4 h-4" />
      case 'productivity': return <Code className="w-4 h-4" />
      case 'utility': return <Settings className="w-4 h-4" />
      case 'integration': return <Globe className="w-4 h-4" />
      case 'entertainment': return <Heart className="w-4 h-4" />
      default: return <Square className="w-4 h-4" />
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{plugin.icon}</div>
            <div>
              <CardTitle className="text-lg">{plugin.name}</CardTitle>
              <CardDescription className="text-sm">
                v{plugin.version} • {plugin.author}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(plugin.status)}>
              {getStatusIcon(plugin.status)}
              <span className="ml-1 capitalize">{plugin.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {plugin.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {getCategoryIcon(plugin.category)}
              <span className="capitalize">{plugin.category}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>{plugin.downloads.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{plugin.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>大小: {plugin.size}</span>
          <span>更新: {plugin.lastUpdated}</span>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          {!plugin.installed ? (
            <Button 
              size="sm" 
              onClick={() => onInstall?.(plugin.id)}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-1" />
              安装
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant={plugin.enabled ? "destructive" : "default"}
                onClick={() => plugin.enabled ? onDisable?.(plugin.id) : onEnable?.(plugin.id)}
                className="flex-1"
              >
                {plugin.enabled ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    停用
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    启用
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onConfigure?.(plugin.id)}
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdate?.(plugin.id)}
                disabled={plugin.status === 'updating'}
              >
                <RefreshCw className={`w-4 h-4 ${plugin.status === 'updating' ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUninstall?.(plugin.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// 插件详情对话框
const PluginDetailDialog: React.FC<{
  plugin: Plugin | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onInstall?: (id: string) => void
  onUninstall?: (id: string) => void
}> = ({ plugin, open, onOpenChange, onInstall, onUninstall }) => {
  if (!plugin) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{plugin.icon}</div>
            <div>
              <DialogTitle className="text-xl">{plugin.name}</DialogTitle>
              <DialogDescription>
                v{plugin.version} • 由 {plugin.author} 开发
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{plugin.rating}</div>
              <div className="text-sm text-gray-600">评分</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{plugin.downloads.toLocaleString()}</div>
              <div className="text-sm text-gray-600">下载量</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{plugin.size}</div>
              <div className="text-sm text-gray-600">大小</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 capitalize">{plugin.category}</div>
              <div className="text-sm text-gray-600">分类</div>
            </div>
          </div>

          {/* 描述 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">插件描述</h3>
            <p className="text-gray-600">{plugin.description}</p>
          </div>

          {/* 截图 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">截图预览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plugin.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot || "/placeholder.svg"}
                  alt={`${plugin.name} 截图 ${index + 1}`}
                  className="rounded-lg border"
                />
              ))}
            </div>
          </div>

          {/* 权限 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">所需权限</h3>
            <div className="flex flex-wrap gap-2">
              {plugin.permissions.map((permission, index) => (
                <Badge key={index} variant="outline">
                  <Shield className="w-3 h-3 mr-1" />
                  {permission}
                </Badge>
              ))}
            </div>
          </div>

          {/* 依赖 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">依赖项</h3>
            <div className="flex flex-wrap gap-2">
              {plugin.dependencies.map((dep, index) => (
                <Badge key={index} variant="secondary">
                  <Code className="w-3 h-3 mr-1" />
                  {dep}
                </Badge>
              ))}
            </div>
          </div>

          {/* 更新日志 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">更新日志</h3>
            <div className="space-y-2">
              {plugin.changelog.map((change, index) => (
                <div key={index} className="text-sm text-gray-600 border-l-2 border-blue-200 pl-3">
                  {change}
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              关闭
            </Button>
            {!plugin.installed ? (
              <Button onClick={() => onInstall?.(plugin.id)}>
                <Download className="w-4 h-4 mr-2" />
                安装插件
              </Button>
            ) : (
              <Button variant="destructive" onClick={() => onUninstall?.(plugin.id)}>
                <Trash2 className="w-4 h-4 mr-2" />
                卸载插件
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// 插件配置对话框
const PluginConfigDialog: React.FC<{
  plugin: Plugin | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (id: string, config: Record<string, any>) => void
}> = ({ plugin, open, onOpenChange, onSave }) => {
  const [config, setConfig] = useState<Record<string, any>>({})

  useEffect(() => {
    if (plugin?.config) {
      setConfig(plugin.config)
    }
  }, [plugin])

  const handleSave = () => {
    if (plugin) {
      onSave?.(plugin.id, config)
      onOpenChange(false)
    }
  }

  if (!plugin) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>配置 {plugin.name}</DialogTitle>
          <DialogDescription>
            调整插件设置以满足您的需求
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {plugin.id === 'ai-translator' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="defaultLanguage">默认语言</Label>
                <Select
                  value={config.defaultLanguage || 'zh-CN'}
                  onValueChange={(value) => setConfig({...config, defaultLanguage: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh-CN">中文</SelectItem>
                    <SelectItem value="en-US">英语</SelectItem>
                    <SelectItem value="ja-JP">日语</SelectItem>
                    <SelectItem value="ko-KR">韩语</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoDetect"
                  checked={config.autoDetect || false}
                  onCheckedChange={(checked) => setConfig({...config, autoDetect: checked})}
                />
                <Label htmlFor="autoDetect">自动检测语言</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showConfidence"
                  checked={config.showConfidence || false}
                  onCheckedChange={(checked) => setConfig({...config, showConfidence: checked})}
                />
                <Label htmlFor="showConfidence">显示置信度</Label>
              </div>
            </>
          )}

          {plugin.id === 'code-formatter' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="tabSize">缩进大小</Label>
                <Input
                  id="tabSize"
                  type="number"
                  value={config.tabSize || 2}
                  onChange={(e) => setConfig({...config, tabSize: parseInt(e.target.value)})}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="useTabs"
                  checked={config.useTabs || false}
                  onCheckedChange={(checked) => setConfig({...config, useTabs: checked})}
                />
                <Label htmlFor="useTabs">使用Tab缩进</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="semiColons"
                  checked={config.semiColons || true}
                  onCheckedChange={(checked) => setConfig({...config, semiColons: checked})}
                />
                <Label htmlFor="semiColons">使用分号</Label>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="customSettings">自定义设置 (JSON)</Label>
            <Textarea
              id="customSettings"
              placeholder='{"key": "value"}'
              value={JSON.stringify(config, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  setConfig(parsed)
                } catch (error) {
                  // 忽略JSON解析错误
                }
              }}
              rows={6}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>
            <Settings className="w-4 h-4 mr-2" />
            保存配置
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// 主插件系统组件
export const PluginSystem: React.FC = () => {
  const [plugins, setPlugins] = useState<Plugin[]>(mockPlugins)
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null)
  const [configPlugin, setConfigPlugin] = useState<Plugin | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('installed')

  // 创建插件管理器实例
  const pluginManager = useMemo(() => {
    const context: PluginContext = {
      user: {
        id: 'user_123',
        name: '张三',
        permissions: ['admin']
      },
      app: {
        version: '3.0.0',
        theme: 'light',
        language: 'zh-CN'
      },
      api: {
        search: async (query: string) => ({ results: [] }),
        generate: async (prompt: string) => ({ content: '' }),
        storage: {
          get: async (key: string) => null,
          set: async (key: string, value: any) => {},
          delete: async (key: string) => {}
        }
      }
    }
    return new PluginManager(context)
  }, [])

  // 过滤插件
  const filteredPlugins = useMemo(() => {
    let filtered = plugins

    // 根据标签页过滤
    if (activeTab === 'installed') {
      filtered = filtered.filter(p => p.installed)
    } else if (activeTab === 'store') {
      filtered = mockPlugins // 显示所有可用插件
    }

    // 根据搜索查询过滤
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 根据分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    return filtered
  }, [plugins, searchQuery, selectedCategory, activeTab])

  // 安装插件
  const handleInstall = useCallback(async (pluginId: string) => {
    setLoading(true)
    try {
      const success = await pluginManager.installPlugin(pluginId)
      if (success) {
        setPlugins(prev => prev.map(p => 
          p.id === pluginId ? { ...p, installed: true, status: 'active' } : p
        ))
      }
    } catch (error) {
      console.error('安装失败:', error)
    } finally {
      setLoading(false)
    }
  }, [pluginManager])

  // 卸载插件
  const handleUninstall = useCallback(async (pluginId: string) => {
    setLoading(true)
    try {
      const success = await pluginManager.uninstallPlugin(pluginId)
      if (success) {
        setPlugins(prev => prev.map(p => 
          p.id === pluginId ? { ...p, installed: false, enabled: false, status: 'inactive' } : p
        ))
      }
    } catch (error) {
      console.error('卸载失败:', error)
    } finally {
      setLoading(false)
    }
  }, [pluginManager])

  // 启用插件
  const handleEnable = useCallback(async (pluginId: string) => {
    setLoading(true)
    try {
      const success = await pluginManager.enablePlugin(pluginId)
      if (success) {
        setPlugins(prev => prev.map(p => 
          p.id === pluginId ? { ...p, enabled: true, status: 'active' } : p
        ))
      }
    } catch (error) {
      console.error('启用失败:', error)
    } finally {
      setLoading(false)
    }
  }, [pluginManager])

  // 停用插件
  const handleDisable = useCallback(async (pluginId: string) => {
    setLoading(true)
    try {
      const success = await pluginManager.disablePlugin(pluginId)
      if (success) {
        setPlugins(prev => prev.map(p => 
          p.id === pluginId ? { ...p, enabled: false, status: 'inactive' } : p
        ))
      }
    } catch (error) {
      console.error('停用失败:', error)
    } finally {
      setLoading(false)
    }
  }, [pluginManager])

  // 更新插件
  const handleUpdate = useCallback(async (pluginId: string) => {
    setLoading(true)
    try {
      const success = await pluginManager.updatePlugin(pluginId)
      if (success) {
        setPlugins(prev => prev.map(p => 
          p.id === pluginId ? { ...p, status: 'active' } : p
        ))
      }
    } catch (error) {
      console.error('更新失败:', error)
    } finally {
      setLoading(false)
    }
  }, [pluginManager])

  // 配置插件
  const handleConfigure = useCallback((pluginId: string) => {
    const plugin = plugins.find(p => p.id === pluginId)
    if (plugin) {
      setConfigPlugin(plugin)
      setConfigDialogOpen(true)
    }
  }, [plugins])

  // 保存配置
  const handleSaveConfig = useCallback((pluginId: string, config: Record<string, any>) => {
    setPlugins(prev => prev.map(p => 
      p.id === pluginId ? { ...p, config } : p
    ))
  }, [])

  // 显示插件详情
  const handleShowDetail = useCallback((plugin: Plugin) => {
    setSelectedPlugin(plugin)
    setDetailDialogOpen(true)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">插件管理</h1>
          <p className="text-gray-600">管理和配置您的插件</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            上传插件
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            开发插件
          </Button>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{plugins.filter(p => p.installed && p.enabled).length}</div>
                <div className="text-sm text-gray-600">已启用</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{plugins.filter(p => p.installed).length}</div>
                <div className="text-sm text-gray-600">已安装</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{plugins.filter(p => p.status === 'updating').length}</div>
                <div className="text-sm text-gray-600">更新中</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{plugins.filter(p => p.status === 'error').length}</div>
                <div className="text-sm text-gray-600">错误</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和过滤 */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="搜索插件..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有分类</SelectItem>
            <SelectItem value="ai">AI工具</SelectItem>
            <SelectItem value="productivity">生产力</SelectItem>
            <SelectItem value="utility">实用工具</SelectItem>
            <SelectItem value="integration">集成</SelectItem>
            <SelectItem value="entertainment">娱乐</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 标签页 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="installed">已安装</TabsTrigger>
          <TabsTrigger value="store">插件商店</TabsTrigger>
        </TabsList>

        <TabsContent value="installed" className="space-y-4">
          {filteredPlugins.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Download className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold mb-2">暂无已安装插件</h3>
                <p className="text-gray-600 mb-4">前往插件商店安装您需要的插件</p>
                <Button onClick={() => setActiveTab('store')}>
                  浏览插件商店
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlugins.map((plugin) => (
                <div key={plugin.id} onClick={() => handleShowDetail(plugin)} className="cursor-pointer">
                  <PluginCard
                    plugin={plugin}
                    onInstall={handleInstall}
                    onUninstall={handleUninstall}
                    onEnable={handleEnable}
                    onDisable={handleDisable}
                    onUpdate={handleUpdate}
                    onConfigure={handleConfigure}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="store" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlugins.map((plugin) => (
              <div key={plugin.id} onClick={() => handleShowDetail(plugin)} className="cursor-pointer">
                <PluginCard
                  plugin={plugin}
                  onInstall={handleInstall}
                  onUninstall={handleUninstall}
                  onEnable={handleEnable}
                  onDisable={handleDisable}
                  onUpdate={handleUpdate}
                  onConfigure={handleConfigure}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 插件详情对话框 */}
      <PluginDetailDialog
        plugin={selectedPlugin}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        onInstall={handleInstall}
        onUninstall={handleUninstall}
      />

      {/* 插件配置对话框 */}
      <PluginConfigDialog
        plugin={configPlugin}
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        onSave={handleSaveConfig}
      />
    </div>
  )
}

export default PluginSystem
