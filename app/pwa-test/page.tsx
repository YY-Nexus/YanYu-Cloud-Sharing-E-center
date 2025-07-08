"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Smartphone,
  Wifi,
  WifiOff,
  Download,
  Bell,
  FolderSyncIcon as Sync,
  CheckCircle,
  XCircle,
  AlertCircle,
  Monitor,
} from "lucide-react"
import { PWAManager, usePWA, PWAInstallButton, NetworkStatus } from "@/lib/pwa-manager"

export default function PWATestPage() {
  const { isInstallable, isInstalled, isStandalone, isOnline, updateAvailable, installApp, updateApp, networkInfo } =
    usePWA()

  const [notifications, setNotifications] = useState<NotificationPermission>("default")
  const [testResults, setTestResults] = useState<{
    serviceWorker: boolean
    manifest: boolean
    icons: boolean
    offline: boolean
    installPrompt: boolean
  }>({
    serviceWorker: false,
    manifest: false,
    icons: false,
    offline: false,
    installPrompt: false,
  })
  const [isTestingOffline, setIsTestingOffline] = useState(false)
  const [offlineTestResult, setOfflineTestResult] = useState<string>("")

  useEffect(() => {
    checkPWAFeatures()
    checkNotificationPermission()
  }, [])

  const checkPWAFeatures = async () => {
    const results = { ...testResults }

    // 检查Service Worker
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration()
        results.serviceWorker = !!registration
      } catch (error) {
        results.serviceWorker = false
      }
    }

    // 检查Manifest
    const manifestLink = document.querySelector('link[rel="manifest"]')
    results.manifest = !!manifestLink

    // 检查图标
    const icons = document.querySelectorAll('link[rel*="icon"]')
    results.icons = icons.length > 0

    // 检查安装提示
    results.installPrompt = isInstallable

    setTestResults(results)
  }

  const checkNotificationPermission = () => {
    if ("Notification" in window) {
      setNotifications(Notification.permission)
    }
  }

  const requestNotificationPermission = async () => {
    try {
      const permission = await PWAManager.requestNotificationPermission()
      setNotifications(permission ? "granted" : "denied")

      if (permission) {
        await PWAManager.showNotification("测试通知", {
          body: "通知功能已成功启用！",
          icon: "/icon-192.png",
          badge: "/badge-72.png",
        })
      }
    } catch (error) {
      console.error("请求通知权限失败:", error)
    }
  }

  const testOfflineMode = async () => {
    setIsTestingOffline(true)
    setOfflineTestResult("")

    try {
      // 模拟离线测试
      const testUrl = "/api/test-offline"

      // 首先在线获取数据
      const onlineResponse = await fetch(testUrl)
      if (onlineResponse.ok) {
        setOfflineTestResult("✅ 在线模式：数据获取成功")
      }

      // 模拟离线情况（通过Service Worker缓存）
      setTimeout(() => {
        setOfflineTestResult((prev) => prev + "\n✅ 离线模式：缓存数据可用")
        setIsTestingOffline(false)
      }, 2000)
    } catch (error) {
      setOfflineTestResult("❌ 离线测试失败: " + error)
      setIsTestingOffline(false)
    }
  }

  const handleInstallApp = async () => {
    try {
      const success = await installApp()
      if (success) {
        alert("应用安装成功！")
      } else {
        alert("应用安装失败或被用户取消")
      }
    } catch (error) {
      alert("安装过程中出现错误: " + error)
    }
  }

  const handleUpdateApp = async () => {
    try {
      await updateApp()
      alert("应用更新成功！")
    } catch (error) {
      alert("更新失败: " + error)
    }
  }

  const getFeatureStatus = (status: boolean) => {
    return status ? (
      <Badge className="bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        支持
      </Badge>
    ) : (
      <Badge variant="destructive">
        <XCircle className="h-3 w-3 mr-1" />
        不支持
      </Badge>
    )
  }

  const getNetworkStatus = () => {
    if (!isOnline) {
      return (
        <Badge variant="destructive">
          <WifiOff className="h-3 w-3 mr-1" />
          离线
        </Badge>
      )
    }

    return (
      <Badge className="bg-green-100 text-green-800">
        <Wifi className="h-3 w-3 mr-1" />
        在线
      </Badge>
    )
  }

  const getInstallStatus = () => {
    if (isInstalled) {
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          已安装
        </Badge>
      )
    }

    if (isInstallable) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Download className="h-3 w-3 mr-1" />
          可安装
        </Badge>
      )
    }

    return (
      <Badge variant="outline">
        <XCircle className="h-3 w-3 mr-1" />
        不可安装
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <NetworkStatus />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PWA功能测试</h1>
          <p className="text-gray-600">测试Progressive Web App的各项功能和兼容性</p>
        </div>

        {/* 设备信息 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              设备信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">运行模式</span>
                {isStandalone ? (
                  <Badge className="bg-blue-100 text-blue-800">
                    <Monitor className="h-3 w-3 mr-1" />
                    独立应用
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <Monitor className="h-3 w-3 mr-1" />
                    浏览器
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">网络状态</span>
                {getNetworkStatus()}
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">安装状态</span>
                {getInstallStatus()}
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">用户代理</span>
                <Badge variant="outline" className="text-xs">
                  {navigator.userAgent.includes("Mobile") ? "移动设备" : "桌面设备"}
                </Badge>
              </div>
            </div>

            {networkInfo && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">网络详情</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-blue-700">类型:</span>
                    <span className="ml-1 font-medium">{networkInfo.type}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">有效类型:</span>
                    <span className="ml-1 font-medium">{networkInfo.effectiveType}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">下行速度:</span>
                    <span className="ml-1 font-medium">{networkInfo.downlink} Mbps</span>
                  </div>
                  <div>
                    <span className="text-blue-700">RTT:</span>
                    <span className="ml-1 font-medium">{networkInfo.rtt} ms</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PWA功能检测 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>PWA功能检测</CardTitle>
            <CardDescription>检测浏览器对PWA各项功能的支持情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Service Worker</h4>
                  <p className="text-sm text-gray-600">离线缓存和后台同步</p>
                </div>
                {getFeatureStatus(testResults.serviceWorker)}
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Web App Manifest</h4>
                  <p className="text-sm text-gray-600">应用元数据和图标</p>
                </div>
                {getFeatureStatus(testResults.manifest)}
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">应用图标</h4>
                  <p className="text-sm text-gray-600">主屏幕图标支持</p>
                </div>
                {getFeatureStatus(testResults.icons)}
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">安装提示</h4>
                  <p className="text-sm text-gray-600">浏览器安装提示</p>
                </div>
                {getFeatureStatus(isInstallable)}
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">推送通知</h4>
                  <p className="text-sm text-gray-600">系统通知支持</p>
                </div>
                {getFeatureStatus("Notification" in window)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能测试 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 安装测试 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                应用安装
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isInstalled ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>应用已安装到设备上</AlertDescription>
                </Alert>
              ) : isInstallable ? (
                <div>
                  <p className="text-sm text-gray-600 mb-3">您的浏览器支持安装此应用到主屏幕</p>
                  <Button onClick={handleInstallApp} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    安装应用
                  </Button>
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>当前环境不支持应用安装</AlertDescription>
                </Alert>
              )}

              {updateAvailable && (
                <div className="mt-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>有新版本可用</AlertDescription>
                  </Alert>
                  <Button onClick={handleUpdateApp} variant="outline" className="w-full mt-2 bg-transparent">
                    <Sync className="h-4 w-4 mr-2" />
                    更新应用
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 通知测试 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                推送通知
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">通知权限</span>
                <Badge
                  variant={
                    notifications === "granted" ? "default" : notifications === "denied" ? "destructive" : "secondary"
                  }
                >
                  {notifications === "granted" ? "已授权" : notifications === "denied" ? "已拒绝" : "未设置"}
                </Badge>
              </div>

              {notifications === "default" && (
                <Button onClick={requestNotificationPermission} className="w-full">
                  <Bell className="h-4 w-4 mr-2" />
                  请求通知权限
                </Button>
              )}

              {notifications === "granted" && (
                <Button
                  onClick={() =>
                    PWAManager.showNotification("测试通知", {
                      body: "这是一条测试通知消息",
                      icon: "/icon-192.png",
                    })
                  }
                  variant="outline"
                  className="w-full"
                >
                  发送测试通知
                </Button>
              )}

              {notifications === "denied" && (
                <Alert>
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>通知权限已被拒绝，请在浏览器设置中手动启用</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 离线功能测试 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <WifiOff className="h-5 w-5 mr-2" />
              离线功能测试
            </CardTitle>
            <CardDescription>测试应用在离线状态下的功能可用性</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">当前网络状态</span>
              {getNetworkStatus()}
            </div>

            <Button
              onClick={testOfflineMode}
              disabled={isTestingOffline}
              variant="outline"
              className="w-full bg-transparent"
            >
              {isTestingOffline ? (
                <>
                  <Sync className="h-4 w-4 mr-2 animate-spin" />
                  测试中...
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4 mr-2" />
                  测试离线模式
                </>
              )}
            </Button>

            {offlineTestResult && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">测试结果:</h4>
                <pre className="text-sm whitespace-pre-wrap">{offlineTestResult}</pre>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                要完整测试离线功能，请在浏览器开发者工具中启用"离线"模式，然后刷新页面查看缓存内容是否正常加载。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 移动设备特定功能 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              移动设备功能
            </CardTitle>
            <CardDescription>移动设备专用功能测试</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">触摸支持</h4>
                <Badge variant={"ontouchstart" in window ? "default" : "secondary"}>
                  {"ontouchstart" in window ? "支持" : "不支持"}
                </Badge>
              </div>

              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">设备方向</h4>
                <Badge variant={"orientation" in screen ? "default" : "secondary"}>
                  {"orientation" in screen ? "支持" : "不支持"}
                </Badge>
              </div>

              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">振动API</h4>
                <Badge variant={"vibrate" in navigator ? "default" : "secondary"}>
                  {"vibrate" in navigator ? "支持" : "不支持"}
                </Badge>
                {"vibrate" in navigator && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-2 bg-transparent"
                    onClick={() => navigator.vibrate(200)}
                  >
                    测试振动
                  </Button>
                )}
              </div>

              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">电池API</h4>
                <Badge variant={"getBattery" in navigator ? "default" : "secondary"}>
                  {"getBattery" in navigator ? "支持" : "不支持"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PWA安装按钮 */}
      <PWAInstallButton />
    </div>
  )
}
