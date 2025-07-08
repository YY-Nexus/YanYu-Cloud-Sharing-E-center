"use client"

import { useState, useEffect } from "react"

// PWA管理器
export interface PWAConfig {
  name: string
  shortName: string
  description: string
  themeColor: string
  backgroundColor: string
  display: "standalone" | "fullscreen" | "minimal-ui" | "browser"
  orientation: "portrait" | "landscape" | "any"
  startUrl: string
  scope: string
  icons: PWAIcon[]
  shortcuts: PWAShortcut[]
  categories: string[]
}

export interface PWAIcon {
  src: string
  sizes: string
  type: string
  purpose?: "any" | "maskable" | "monochrome"
}

export interface PWAShortcut {
  name: string
  shortName?: string
  description: string
  url: string
  icons: PWAIcon[]
}

export interface InstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export class PWAManager {
  private static instance: PWAManager
  private deferredPrompt: InstallPromptEvent | null = null
  private isInstalled = false
  private isStandalone = false
  private serviceWorker: ServiceWorkerRegistration | null = null

  private constructor() {
    this.init()
  }

  static getInstance(): PWAManager {
    if (!PWAManager.instance) {
      PWAManager.instance = new PWAManager()
    }
    return PWAManager.instance
  }

  private async init() {
    if (typeof window === "undefined") return

    // 检查是否为独立模式
    this.isStandalone =
      window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true

    // 检查是否已安装
    this.isInstalled = this.isStandalone || localStorage.getItem("pwa-installed") === "true"

    // 监听安装提示事件
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      this.deferredPrompt = e as InstallPromptEvent
      this.dispatchEvent("installable", { canInstall: true })
    })

    // 监听应用安装事件
    window.addEventListener("appinstalled", () => {
      this.isInstalled = true
      localStorage.setItem("pwa-installed", "true")
      this.deferredPrompt = null
      this.dispatchEvent("installed", { installed: true })
    })

    // 注册Service Worker
    await this.registerServiceWorker()

    // 检查更新
    this.checkForUpdates()
  }

  // 注册Service Worker
  private async registerServiceWorker(): Promise<void> {
    if (!("serviceWorker" in navigator)) {
      console.warn("Service Worker不支持")
      return
    }

    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      })

      this.serviceWorker = registration

      // 监听更新
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              this.dispatchEvent("updateavailable", { registration })
            }
          })
        }
      })

      console.log("Service Worker注册成功")
    } catch (error) {
      console.error("Service Worker注册失败:", error)
    }
  }

  // 检查更新
  private async checkForUpdates(): Promise<void> {
    if (!this.serviceWorker) return

    try {
      await this.serviceWorker.update()
    } catch (error) {
      console.error("检查更新失败:", error)
    }
  }

  // 安装应用
  async installApp(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.warn("无法安装应用：没有安装提示")
      return false
    }

    try {
      await this.deferredPrompt.prompt()
      const choiceResult = await this.deferredPrompt.userChoice

      if (choiceResult.outcome === "accepted") {
        console.log("用户接受了安装")
        return true
      } else {
        console.log("用户拒绝了安装")
        return false
      }
    } catch (error) {
      console.error("安装失败:", error)
      return false
    } finally {
      this.deferredPrompt = null
    }
  }

  // 应用更新
  async updateApp(): Promise<void> {
    if (!this.serviceWorker) return

    const waitingWorker = this.serviceWorker.waiting
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" })
      window.location.reload()
    }
  }

  // 获取安装状态
  getInstallStatus(): {
    isInstallable: boolean
    isInstalled: boolean
    isStandalone: boolean
  } {
    return {
      isInstallable: !!this.deferredPrompt,
      isInstalled: this.isInstalled,
      isStandalone: this.isStandalone,
    }
  }

  // 生成Web App Manifest
  static generateManifest(config: PWAConfig): string {
    const manifest = {
      name: config.name,
      short_name: config.shortName,
      description: config.description,
      start_url: config.startUrl,
      scope: config.scope,
      display: config.display,
      orientation: config.orientation,
      theme_color: config.themeColor,
      background_color: config.backgroundColor,
      icons: config.icons,
      shortcuts: config.shortcuts,
      categories: config.categories,
    }

    return JSON.stringify(manifest, null, 2)
  }

  // 生成Service Worker
  static generateServiceWorker(options: {
    cacheName: string
    cacheUrls: string[]
    offlineUrl?: string
  }): string {
    return `
const CACHE_NAME = '${options.cacheName}'
const CACHE_URLS = ${JSON.stringify(options.cacheUrls)}
const OFFLINE_URL = '${options.offlineUrl || "/offline"}'

// 安装事件
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([...CACHE_URLS, OFFLINE_URL])
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// 激活事件
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})

// 拦截请求
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
            .then((cache) => {
              return cache.match(OFFLINE_URL)
            })
        })
    )
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request)
        })
    )
  }
})

// 消息处理
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
`
  }

  // 事件分发
  private dispatchEvent(type: string, detail: any): void {
    const event = new CustomEvent(`pwa-${type}`, { detail })
    window.dispatchEvent(event)
  }

  // 离线检测
  static isOnline(): boolean {
    return navigator.onLine
  }

  // 网络状态监听
  static onNetworkChange(callback: (isOnline: boolean) => void): () => void {
    const handleOnline = () => callback(true)
    const handleOffline = () => callback(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }

  // 获取网络信息
  static getNetworkInfo(): {
    type: string
    effectiveType: string
    downlink: number
    rtt: number
  } | null {
    const connection =
      (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    if (!connection) return null

    return {
      type: connection.type || "unknown",
      effectiveType: connection.effectiveType || "unknown",
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
    }
  }

  // 推送通知
  static async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) {
      throw new Error("浏览器不支持通知")
    }

    return await Notification.requestPermission()
  }

  static async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (Notification.permission !== "granted") {
      throw new Error("通知权限未授予")
    }

    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      // 通过Service Worker显示通知
      navigator.serviceWorker.controller.postMessage({
        type: "SHOW_NOTIFICATION",
        title,
        options,
      })
    } else {
      // 直接显示通知
      new Notification(title, options)
    }
  }

  // 后台同步
  static async registerBackgroundSync(tag: string): Promise<void> {
    if (!("serviceWorker" in navigator) || !("sync" in window.ServiceWorkerRegistration.prototype)) {
      throw new Error("浏览器不支持后台同步")
    }

    const registration = await navigator.serviceWorker.ready
    await registration.sync.register(tag)
  }

  // 应用快捷方式
  static async addShortcut(shortcut: PWAShortcut): Promise<void> {
    if (!("getInstalledRelatedApps" in navigator)) {
      throw new Error("浏览器不支持应用快捷方式")
    }

    // 这里需要通过Service Worker或其他方式添加快捷方式
    console.log("添加快捷方式:", shortcut)
  }
}

// PWA Hook
export function usePWA() {
  const [installStatus, setInstallStatus] = useState({
    isInstallable: false,
    isInstalled: false,
    isStandalone: false,
  })
  const [isOnline, setIsOnline] = useState(true)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    const pwa = PWAManager.getInstance()

    // 获取初始状态
    setInstallStatus(pwa.getInstallStatus())
    setIsOnline(PWAManager.isOnline())

    // 监听PWA事件
    const handleInstallable = () => {
      setInstallStatus(pwa.getInstallStatus())
    }

    const handleInstalled = () => {
      setInstallStatus(pwa.getInstallStatus())
    }

    const handleUpdateAvailable = () => {
      setUpdateAvailable(true)
    }

    window.addEventListener("pwa-installable", handleInstallable)
    window.addEventListener("pwa-installed", handleInstalled)
    window.addEventListener("pwa-updateavailable", handleUpdateAvailable)

    // 监听网络状态
    const unsubscribeNetwork = PWAManager.onNetworkChange(setIsOnline)

    return () => {
      window.removeEventListener("pwa-installable", handleInstallable)
      window.removeEventListener("pwa-installed", handleInstalled)
      window.removeEventListener("pwa-updateavailable", handleUpdateAvailable)
      unsubscribeNetwork()
    }
  }, [])

  const installApp = async () => {
    const pwa = PWAManager.getInstance()
    return await pwa.installApp()
  }

  const updateApp = async () => {
    const pwa = PWAManager.getInstance()
    await pwa.updateApp()
    setUpdateAvailable(false)
  }

  return {
    ...installStatus,
    isOnline,
    updateAvailable,
    installApp,
    updateApp,
    networkInfo: PWAManager.getNetworkInfo(),
  }
}

// PWA安装按钮组件
export function PWAInstallButton() {
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)
  const [pwaManager, setPwaManager] = useState<PWAManager | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const manager = PWAManager.getInstance()
      setPwaManager(manager)

      const status = manager.getInstallStatus()
      setCanInstall(status.isInstallable && !status.isInstalled)

      const handleBeforeInstallPrompt = () => {
        setCanInstall(true)
      }

      const handleAppInstalled = () => {
        setCanInstall(false)
      }

      window.addEventListener("pwa-installable", handleBeforeInstallPrompt)
      window.addEventListener("appinstalled", handleAppInstalled)

      return () => {
        window.removeEventListener("pwa-installable", handleBeforeInstallPrompt)
        window.removeEventListener("appinstalled", handleAppInstalled)
      }
    }
  }, [])

  const handleInstall = async () => {
    if (!pwaManager) return

    setIsInstalling(true)
    try {
      const success = await pwaManager.installApp()
      if (success) {
        setCanInstall(false)
      }
    } catch (error) {
      console.error("安装失败:", error)
    } finally {
      setIsInstalling(false)
    }
  }

  if (!canInstall) {
    return null
  }

  return (
    <button
      onClick={handleInstall}
      disabled={isInstalling}
      className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 z-50"
    >
      {isInstalling ? "安装中..." : "安装应用"}
    </button>
  )
}

// 网络状态组件
export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine)

      const handleOnline = () => setIsOnline(true)
      const handleOffline = () => setIsOnline(false)

      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  if (isOnline) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 z-50">
      <span>离线模式 - 部分功能可能不可用</span>
    </div>
  )
}
