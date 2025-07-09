"use client"

import type React from "react"
import { useState, useEffect } from "react"

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

export class PluginManager {
  private static plugins: Map<string, Plugin> = new Map()
  private static enabledPlugins: Set<string> = new Set()
  private static pluginConfigs: Map<string, Record<string, any>> = new Map()

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
      await PluginManager.enablePlugin(pluginId)
      loadPlugins()
    } catch (error) {
      console.error("启用插件失败:", error)
      alert("启用插件失败: " + (error instanceof Error ? error.message : String(error)))
    }
  }

  const handleDisablePlugin = async (pluginId: string) => {
    try {
      await PluginManager.disablePlugin(pluginId)
      loadPlugins()
    } catch (error) {
      console.error("禁用插件失败:", error)
      alert("禁用插件失败: " + (error instanceof Error ? error.message : String(error)))
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
      alert("卸载插件失败: " + (error instanceof Error ? error.message : String(error)))
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="plugin-manager p-6">
      <h2 className="text-2xl font-bold mb-6">插件管理</h2>

      {plugins.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">暂无已安装的插件</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">浏览插件市场</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{plugin.name}</h3>
                  <p className="text-gray-600 mt-1">{plugin.description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="mr-3">版本: {plugin.version}</span>
                    <span>作者: {plugin.author}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {plugin.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {plugin.isEnabled ? (
                    <button
                      onClick={() => handleDisablePlugin(plugin.id)}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
                    >
                      禁用
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnablePlugin(plugin.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      启用
                    </button>
                  )}
                  <button
                    onClick={() => handleConfigurePlugin(plugin)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    配置
                  </button>
                  <button
                    onClick={() => handleUninstallPlugin(plugin.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    卸载
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-1">权限</h4>
                <div className="flex flex-wrap gap-1">
                  {plugin.permissions.map((permission) => (
                    <span key={permission} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              {plugin.dependencies.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">依赖</h4>
                  <div className="flex flex-wrap gap-1">
                    {plugin.dependencies.map((dep) => (
                      <span key={dep} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 配置模态框 */}
      {showConfigModal && selectedPlugin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">配置插件: {selectedPlugin.name}</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-4">调整插件设置以满足您的需求。</p>
              <div className="space-y-4">
                {Object.entries(selectedPlugin.config).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                    {typeof value === "boolean" ? (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => {
                          const newConfig = { ...selectedPlugin.config, [key]: e.target.checked }
                          selectedPlugin.config = newConfig
                        }}
                        className="rounded border-gray-300"
                      />
                    ) : typeof value === "number" ? (
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => {
                          const newConfig = { ...selectedPlugin.config, [key]: Number(e.target.value) }
                          selectedPlugin.config = newConfig
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value as string}
                        onChange={(e) => {
                          const newConfig = { ...selectedPlugin.config, [key]: e.target.value }
                          selectedPlugin.config = newConfig
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                取消
              </button>
              <button
                onClick={() => handleSaveConfig(selectedPlugin.config)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
