"use client"

import React from "react"

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
}

export interface PWAIcon {
  src: string
  sizes: string
  type: string
  purpose?: "any" | "maskable" | "monochrome"
}

export interface InstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export class PWAManager {
  private static instance: PWAManager
  private deferredPrompt: InstallPromptEvent | null = null
  private isInstalled = false
  private isOnline = navigator.onLine
  private registration: ServiceWorkerRegistration | null = null

  private constructor() {
    this.init()
  }

  static getInstance(): PWAManager {
    if (!PWAManager.instance) {
      PWAManager.instance = new PWAManager()
    }
    return PWAManager.instance
  }

  // 初始化PWA
  private async init(): Promise<void> {
    if (typeof window === "undefined") return

    // 注册Service Worker
    await this.registerServiceWorker()

    // 监听安装提示
    this.setupInstallPrompt()

    // 监听网络状态
    this.setupNetworkListener()

    // 检查是否已安装
    this.checkInstallStatus()

    // 生成manifest
    this.generateManifest()
  }

  // 注册Service Worker
  private async registerServiceWorker(): Promise<void> {
    if ("serviceWorker" in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register("/sw.js")
        console.log("Service Worker注册成功:", this.registration)

        // 监听更新
        this.registration.addEventListener("updatefound", () => {
          const newWorker = this.registration!.installing
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                this.showUpdateNotification()
              }
            })
          }
        })
      } catch (error) {
        console.error("Service Worker注册失败:", error)
      }
    }
  }

  // 设置安装提示
  private setupInstallPrompt(): void {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      this.deferredPrompt = e as InstallPromptEvent
      this.showInstallButton()
    })

    window.addEventListener("appinstalled", () => {
      this.isInstalled = true
      this.hideInstallButton()
      this.showInstallSuccessMessage()
    })
  }

  // 设置网络监听
  private setupNetworkListener(): void {
    window.addEventListener("online", () => {
      this.isOnline = true
      this.showNetworkStatus("已连接到网络")
      this.syncOfflineData()
    })

    window.addEventListener("offline", () => {
      this.isOnline = false
      this.showNetworkStatus("网络连接已断开，应用将在离线模式下运行")
    })
  }

  // 检查安装状态
  private checkInstallStatus(): void {
    // 检查是否在独立模式下运行
    if (window.matchMedia("(display-mode: standalone)").matches) {
      this.isInstalled = true
    }

    // 检查是否从主屏幕启动
    if ((navigator as any).standalone === true) {
      this.isInstalled = true
    }
  }

  // 生成manifest文件
  private generateManifest(): void {
    const config: PWAConfig = {
      name: "AI搜索助手",
      shortName: "AI搜索",
      description: "智能搜索和内容生成助手",
      themeColor: "#2563eb",
      backgroundColor: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      startUrl: "/",
      scope: "/",
      icons: [
        {
          src: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icon-maskable-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    }

    // 动态创建manifest link
    const manifestLink = document.createElement("link")
    manifestLink.rel = "manifest"
    manifestLink.href = "data:application/json," + encodeURIComponent(JSON.stringify(config))
    document.head.appendChild(manifestLink)
  }

  // 显示安装按钮
  private showInstallButton(): void {
    const installButton = document.getElementById("pwa-install-button")
    if (installButton) {
      installButton.style.display = "block"
    }
  }

  // 隐藏安装按钮
  private hideInstallButton(): void {
    const installButton = document.getElementById("pwa-install-button")
    if (installButton) {
      installButton.style.display = "none"
    }
  }

  // 安装应用
  async installApp(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false
    }

    try {
      await this.deferredPrompt.prompt()
      const choiceResult = await this.deferredPrompt.userChoice

      if (choiceResult.outcome === "accepted") {
        console.log("用户接受了安装提示")
        return true
      } else {
        console.log("用户拒绝了安装提示")
        return false
      }
    } catch (error) {
      console.error("安装失败:", error)
      return false
    } finally {
      this.deferredPrompt = null
    }
  }

  // 显示网络状态
  private showNetworkStatus(message: string): void {
    // 创建或更新网络状态提示
    let statusElement = document.getElementById("network-status")
    if (!statusElement) {
      statusElement = document.createElement("div")
      statusElement.id = "network-status"
      statusElement.className = "fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50"
      document.body.appendChild(statusElement)
    }

    statusElement.textContent = message
    statusElement.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 ${
      this.isOnline ? "bg-green-500" : "bg-red-500"
    }`

    // 3秒后自动隐藏
    setTimeout(() => {
      if (statusElement) {
        statusElement.remove()
      }
    }, 3000)
  }

  // 显示安装成功消息
  private showInstallSuccessMessage(): void {
    this.showNetworkStatus("应用安装成功！")
  }

  // 显示更新通知
  private showUpdateNotification(): void {
    const updateNotification = document.createElement("div")
    updateNotification.className = "fixed bottom-4 left-4 right-4 bg-blue-500 text-white p-4 rounded-lg z-50"
    updateNotification.innerHTML = `
      <div class="flex justify-between items-center">
        <span>应用有新版本可用</span>
        <div>
          <button id="update-app" class="bg-white text-blue-500 px-3 py-1 rounded mr-2">更新</button>
          <button id="dismiss-update" class="text-white">稍后</button>
        </div>
      </div>
    `

    document.body.appendChild(updateNotification)

    // 绑定事件
    document.getElementById("update-app")?.addEventListener("click", () => {
      this.updateApp()
      updateNotification.remove()
    })

    document.getElementById("dismiss-update")?.addEventListener("click", () => {
      updateNotification.remove()
    })
  }

  // 更新应用
  private async updateApp(): Promise<void> {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" })
      window.location.reload()
    }
  }

  // 同步离线数据
  private async syncOfflineData(): Promise<void> {
    if ("serviceWorker" in navigator && this.registration) {
      try {
        await this.registration.sync.register("background-sync")
        console.log("后台同步已注册")
      } catch (error) {
        console.error("后台同步注册失败:", error)
      }
    }
  }

  // 请求推送通知权限
  async requestNotificationPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.log("此浏览器不支持通知")
      return false
    }

    if (Notification.permission === "granted") {
      return true
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission()
      return permission === "granted"
    }

    return false
  }

  // 发送推送通知
  async sendNotification(title: string, options?: NotificationOptions): Promise<void> {
    const hasPermission = await this.requestNotificationPermission()

    if (hasPermission) {
      if (this.registration) {
        await this.registration.showNotification(title, {
          icon: "/icon-192.png",
          badge: "/badge-72.png",
          ...options,
        })
      } else {
        new Notification(title, {
          icon: "/icon-192.png",
          ...options,
        })
      }
    }
  }

  // 获取状态
  getStatus() {
    return {
      isInstalled: this.isInstalled,
      isOnline: this.isOnline,
      canInstall: !!this.deferredPrompt,
      hasServiceWorker: !!this.registration,
    }
  }
}

// PWA安装按钮组件
export const PWAInstallButton: React.FC = () => {
  const [canInstall, setCanInstall] = React.useState(false)
  const [isInstalling, setIsInstalling] = React.useState(false)
  const pwaManager = PWAManager.getInstance()

  React.useEffect(() => {
    const checkInstallability = () => {
      const status = pwaManager.getStatus()
      setCanInstall(status.canInstall && !status.isInstalled)
    }

    checkInstallability()

    // 监听安装提示事件
    const handleBeforeInstallPrompt = () => {
      setCanInstall(true)
    }

    const handleAppInstalled = () => {
      setCanInstall(false)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
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
      id="pwa-install-button"
      onClick={handleInstall}
      disabled={isInstalling}
      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50 z-50"
    >
      {isInstalling ? "安装中..." : "安装应用"}
    </button>
  )
}

// 网络状态组件
export const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine)

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
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
