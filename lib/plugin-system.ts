"use client"

import React from "react"

export interface Plugin {
  id: string
  name: string
  version: string
  description: string
  author: string
  permissions: string[]
  enabled: boolean
  config?: Record<string, any>
  hooks?: PluginHooks
  components?: PluginComponents
  apis?: PluginAPI[]
}

export interface PluginHooks {
  onSearchQuery?: (query: string) => Promise<string>
  onAIRequest?: (request: any) => Promise<any>
  onUserLogin?: (user: any) => Promise<void>
  onResultGenerated?: (result: any) => Promise<void>
}

export interface PluginComponents {
  sidebar?: React.ComponentType<any>
  toolbar?: React.ComponentType<any>
  modal?: React.ComponentType<any>
  widget?: React.ComponentType<any>
}

export interface PluginAPI {
  path: string
  method: "GET" | "POST" | "PUT" | "DELETE"
  handler: (req: any) => Promise<any>
}

export interface PluginManifest {
  id: string
  name: string
  version: string
  description: string
  author: string
  permissions: string[]
  main: string
  dependencies?: string[]
  minAppVersion?: string
}

export class PluginSystem {
  private static plugins: Map<string, Plugin> = new Map()
  private static hooks: Map<string, Function[]> = new Map()
  private static components: Map<string, React.ComponentType<any>[]> = new Map()
  private static apis: Map<string, PluginAPI> = new Map()

  // 注册插件
  static async registerPlugin(manifest: PluginManifest, pluginCode: string): Promise<void> {
    try {
      // 验证权限
      if (!this.validatePermissions(manifest.permissions)) {
        throw new Error("插件权限验证失败")
      }

      // 执行插件代码
      const pluginModule = await this.executePluginCode(pluginCode)

      const plugin: Plugin = {
        id: manifest.id,
        name: manifest.name,
        version: manifest.version,
        description: manifest.description,
        author: manifest.author,
        permissions: manifest.permissions,
        enabled: false,
        hooks: pluginModule.hooks,
        components: pluginModule.components,
        apis: pluginModule.apis,
      }

      this.plugins.set(manifest.id, plugin)

      // 注册钩子
      if (plugin.hooks) {
        this.registerHooks(plugin.id, plugin.hooks)
      }

      // 注册组件
      if (plugin.components) {
        this.registerComponents(plugin.id, plugin.components)
      }

      // 注册API
      if (plugin.apis) {
        this.registerAPIs(plugin.id, plugin.apis)
      }

      console.log(`插件 ${manifest.name} 注册成功`)
    } catch (error) {
      console.error(`插件注册失败:`, error)
      throw error
    }
  }

  // 启用插件
  static enablePlugin(pluginId: string): void {
    const plugin = this.plugins.get(pluginId)
    if (!plugin) {
      throw new Error("插件不存在")
    }

    plugin.enabled = true
    this.savePluginState()
    console.log(`插件 ${plugin.name} 已启用`)
  }

  // 禁用插件
  static disablePlugin(pluginId: string): void {
    const plugin = this.plugins.get(pluginId)
    if (!plugin) {
      throw new Error("插件不存在")
    }

    plugin.enabled = false
    this.savePluginState()
    console.log(`插件 ${plugin.name} 已禁用`)
  }

  // 卸载插件
  static uninstallPlugin(pluginId: string): void {
    const plugin = this.plugins.get(pluginId)
    if (!plugin) {
      throw new Error("插件不存在")
    }

    // 清理钩子
    this.unregisterHooks(pluginId)

    // 清理组件
    this.unregisterComponents(pluginId)

    // 清理API
    this.unregisterAPIs(pluginId)

    this.plugins.delete(pluginId)
    this.savePluginState()
    console.log(`插件 ${plugin.name} 已卸载`)
  }

  // 执行钩子
  static async executeHook(hookName: string, ...args: any[]): Promise<any[]> {
    const hookFunctions = this.hooks.get(hookName) || []
    const results = []

    for (const hookFn of hookFunctions) {
      try {
        const result = await hookFn(...args)
        results.push(result)
      } catch (error) {
        console.error(`钩子执行失败 ${hookName}:`, error)
      }
    }

    return results
  }

  // 获取插件组件
  static getPluginComponents(type: string): React.ComponentType<any>[] {
    return this.components.get(type) || []
  }

  // 获取所有插件
  static getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
  }

  // 获取启用的插件
  static getEnabledPlugins(): Plugin[] {
    return Array.from(this.plugins.values()).filter((p) => p.enabled)
  }

  // 验证权限
  private static validatePermissions(permissions: string[]): boolean {
    const allowedPermissions = [
      "search.query",
      "ai.request",
      "user.profile",
      "storage.read",
      "storage.write",
      "network.request",
      "ui.sidebar",
      "ui.toolbar",
      "api.register",
    ]

    return permissions.every((permission) => allowedPermissions.includes(permission))
  }

  // 执行插件代码
  private static async executePluginCode(code: string): Promise<any> {
    // 创建安全的执行环境
    const sandbox = {
      console: {
        log: (...args: any[]) => console.log("[Plugin]", ...args),
        error: (...args: any[]) => console.error("[Plugin]", ...args),
      },
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
      fetch: (url: string, options?: RequestInit) => {
        // 限制网络请求
        if (!url.startsWith("https://api.")) {
          throw new Error("不允许的网络请求")
        }
        return fetch(url, options)
      },
    }

    // 使用Function构造器执行代码
    const func = new Function(
      "sandbox",
      `
      with (sandbox) {
        ${code}
        return typeof module !== 'undefined' ? module.exports : {};
      }
    `,
    )

    return func(sandbox)
  }

  // 注册钩子
  private static registerHooks(pluginId: string, hooks: PluginHooks): void {
    Object.entries(hooks).forEach(([hookName, hookFn]) => {
      if (!this.hooks.has(hookName)) {
        this.hooks.set(hookName, [])
      }
      this.hooks.get(hookName)!.push(hookFn)
    })
  }

  // 注册组件
  private static registerComponents(pluginId: string, components: PluginComponents): void {
    Object.entries(components).forEach(([type, component]) => {
      if (!this.components.has(type)) {
        this.components.set(type, [])
      }
      this.components.get(type)!.push(component)
    })
  }

  // 注册API
  private static registerAPIs(pluginId: string, apis: PluginAPI[]): void {
    apis.forEach((api) => {
      const key = `${api.method}:${api.path}`
      this.apis.set(key, api)
    })
  }

  // 清理钩子
  private static unregisterHooks(pluginId: string): void {
    // 实现钩子清理逻辑
  }

  // 清理组件
  private static unregisterComponents(pluginId: string): void {
    // 实现组件清理逻辑
  }

  // 清理API
  private static unregisterAPIs(pluginId: string): void {
    // 实现API清理逻辑
  }

  // 保存插件状态
  private static savePluginState(): void {
    if (typeof window !== "undefined") {
      const pluginStates = Array.from(this.plugins.entries()).map(([id, plugin]) => ({
        id,
        enabled: plugin.enabled,
        config: plugin.config,
      }))
      localStorage.setItem("plugin-states", JSON.stringify(pluginStates))
    }
  }

  // 加载插件状态
  static loadPluginStates(): void {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("plugin-states")
        if (stored) {
          const states = JSON.parse(stored)
          states.forEach((state: any) => {
            const plugin = this.plugins.get(state.id)
            if (plugin) {
              plugin.enabled = state.enabled
              plugin.config = state.config
            }
          })
        }
      } catch (error) {
        console.error("加载插件状态失败:", error)
      }
    }
  }
}

// 插件管理器组件
export const PluginManager: React.FC = () => {
  const [plugins, setPlugins] = React.useState<Plugin[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    loadPlugins()
  }, [])

  const loadPlugins = () => {
    setPlugins(PluginSystem.getAllPlugins())
  }

  const togglePlugin = (pluginId: string, enabled: boolean) => {
    try {
      if (enabled) {
        PluginSystem.enablePlugin(pluginId)
      } else {
        PluginSystem.disablePlugin(pluginId)
      }
      loadPlugins()
    } catch (error) {
      console.error("切换插件状态失败:", error)
    }
  }

  const uninstallPlugin = (pluginId: string) => {
    try {
      PluginSystem.uninstallPlugin(pluginId)
      loadPlugins()
    } catch (error) {
      console.error("卸载插件失败:", error)
    }
  }

  return (
    <div className="plugin-manager p-6">
      <h2 className="text-2xl font-bold mb-6">插件管理</h2>

      <div className="grid gap-4">
        {plugins.map((plugin) => (
          <div key={plugin.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{plugin.name}</h3>
                <p className="text-sm text-gray-600">{plugin.description}</p>
                <p className="text-xs text-gray-500">
                  版本: {plugin.version} | 作者: {plugin.author}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePlugin(plugin.id, !plugin.enabled)}
                  className={`px-3 py-1 rounded text-sm ${
                    plugin.enabled ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {plugin.enabled ? "已启用" : "已禁用"}
                </button>
                <button
                  onClick={() => uninstallPlugin(plugin.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  卸载
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500">权限: {plugin.permissions.join(", ")}</div>
          </div>
        ))}
      </div>

      {plugins.length === 0 && <div className="text-center text-gray-500 py-8">暂无已安装的插件</div>}
    </div>
  )
}
