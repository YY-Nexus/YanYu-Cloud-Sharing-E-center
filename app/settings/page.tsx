"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Zap,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

interface UserSettings {
  profile: {
    displayName: string
    email: string
    bio: string
    avatar: string
  }
  preferences: {
    language: string
    theme: string
    timezone: string
    dateFormat: string
  }
  notifications: {
    email: boolean
    push: boolean
    marketing: boolean
    searchReminders: boolean
  }
  privacy: {
    profileVisibility: string
    searchHistory: boolean
    analytics: boolean
    dataSharing: boolean
  }
  ai: {
    model: string
    temperature: number
    maxTokens: number
    enableStreaming: boolean
  }
  storage: {
    autoBackup: boolean
    backupFrequency: string
    maxStorageSize: number
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      displayName: "用户",
      email: "user@example.com",
      bio: "",
      avatar: "/diverse-avatars.png",
    },
    preferences: {
      language: "zh-CN",
      theme: "auto",
      timezone: "Asia/Shanghai",
      dateFormat: "YYYY-MM-DD",
    },
    notifications: {
      email: true,
      push: true,
      marketing: false,
      searchReminders: true,
    },
    privacy: {
      profileVisibility: "public",
      searchHistory: true,
      analytics: true,
      dataSharing: false,
    },
    ai: {
      model: "gpt-4",
      temperature: 0.7,
      maxTokens: 2048,
      enableStreaming: true,
    },
    storage: {
      autoBackup: true,
      backupFrequency: "daily",
      maxStorageSize: 1024,
    },
  })

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem("userSettings")
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    } catch (error) {
      console.error("加载设置失败:", error)
    }
  }

  const saveSettings = async () => {
    setLoading(true)
    try {
      localStorage.setItem("userSettings", JSON.stringify(settings))

      // 应用主题设置
      if (settings.preferences.theme !== theme) {
        setTheme(settings.preferences.theme)
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error("保存设置失败:", error)
      alert("保存设置失败，请稍后重试")
    } finally {
      setLoading(false)
    }
  }

  const resetSettings = () => {
    if (confirm("确定要重置所有设置吗？此操作不可撤销。")) {
      localStorage.removeItem("userSettings")
      window.location.reload()
    }
  }

  const exportSettings = () => {
    try {
      const dataStr = JSON.stringify(settings, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "settings.json"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("导出设置失败:", error)
      alert("导出设置失败")
    }
  }

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string)
        setSettings(importedSettings)
        alert("设置导入成功")
      } catch (error) {
        console.error("导入设置失败:", error)
        alert("导入设置失败：文件格式不正确")
      }
    }
    reader.readAsText(file)
  }

  const clearData = (dataType: string) => {
    if (confirm(`确定要清除所有${dataType}吗？此操作不可撤销。`)) {
      switch (dataType) {
        case "搜索历史":
          localStorage.removeItem("ai-search-history")
          break
        case "收藏":
          localStorage.removeItem("favorites")
          break
        case "缓存":
          // 清除所有缓存
          Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("cache_")) {
              localStorage.removeItem(key)
            }
          })
          break
      }
      alert(`${dataType}已清除`)
    }
  }

  const updateSettings = (section: keyof UserSettings, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">设置</h1>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={saveSettings}
                disabled={loading}
                className={saved ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : saved ? (
                  <Save className="w-4 h-4 mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {saved ? "已保存" : "保存设置"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">个人资料</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">偏好设置</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">通知</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">隐私</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">AI设置</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">数据</span>
            </TabsTrigger>
          </TabsList>

          {/* 个人资料 */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>管理您的个人信息和头像</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    <img
                      src={settings.profile.avatar || "/placeholder.svg"}
                      alt="头像"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      更换头像
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">支持 JPG、PNG 格式，最大 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="displayName">显示名称</Label>
                    <Input
                      id="displayName"
                      value={settings.profile.displayName}
                      onChange={(e) => updateSettings("profile", "displayName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">邮箱地址</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => updateSettings("profile", "email", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea
                    id="bio"
                    placeholder="介绍一下自己..."
                    value={settings.profile.bio}
                    onChange={(e) => updateSettings("profile", "bio", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 偏好设置 */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>偏好设置</CardTitle>
                <CardDescription>自定义您的使用体验</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="language">语言</Label>
                    <Select
                      value={settings.preferences.language}
                      onValueChange={(value) => updateSettings("preferences", "language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="zh-TW">繁體中文</SelectItem>
                        <SelectItem value="en-US">English</SelectItem>
                        <SelectItem value="ja-JP">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="theme">主题</Label>
                    <Select
                      value={settings.preferences.theme}
                      onValueChange={(value) => updateSettings("preferences", "theme", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">浅色</SelectItem>
                        <SelectItem value="dark">深色</SelectItem>
                        <SelectItem value="auto">跟随系统</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">时区</Label>
                    <Select
                      value={settings.preferences.timezone}
                      onValueChange={(value) => updateSettings("preferences", "timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">北京时间 (UTC+8)</SelectItem>
                        <SelectItem value="Asia/Tokyo">东京时间 (UTC+9)</SelectItem>
                        <SelectItem value="America/New_York">纽约时间 (UTC-5)</SelectItem>
                        <SelectItem value="Europe/London">伦敦时间 (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dateFormat">日期格式</Label>
                    <Select
                      value={settings.preferences.dateFormat}
                      onValueChange={(value) => updateSettings("preferences", "dateFormat", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YYYY-MM-DD">2024-01-01</SelectItem>
                        <SelectItem value="MM/DD/YYYY">01/01/2024</SelectItem>
                        <SelectItem value="DD/MM/YYYY">01/01/2024</SelectItem>
                        <SelectItem value="YYYY年MM月DD日">2024年01月01日</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 通知设置 */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>管理您接收通知的方式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">邮件通知</Label>
                      <p className="text-sm text-gray-500">接收重要更新和提醒</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => updateSettings("notifications", "email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">推送通知</Label>
                      <p className="text-sm text-gray-500">浏览器推送通知</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => updateSettings("notifications", "push", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-notifications">营销通知</Label>
                      <p className="text-sm text-gray-500">产品更新和促销信息</p>
                    </div>
                    <Switch
                      id="marketing-notifications"
                      checked={settings.notifications.marketing}
                      onCheckedChange={(checked) => updateSettings("notifications", "marketing", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="search-reminders">搜索提醒</Label>
                      <p className="text-sm text-gray-500">定期搜索建议和提醒</p>
                    </div>
                    <Switch
                      id="search-reminders"
                      checked={settings.notifications.searchReminders}
                      onCheckedChange={(checked) => updateSettings("notifications", "searchReminders", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 隐私设置 */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>隐私设置</CardTitle>
                <CardDescription>控制您的数据和隐私</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="profile-visibility">个人资料可见性</Label>
                    <Select
                      value={settings.privacy.profileVisibility}
                      onValueChange={(value) => updateSettings("privacy", "profileVisibility", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">公开</SelectItem>
                        <SelectItem value="friends">仅好友</SelectItem>
                        <SelectItem value="private">私密</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="search-history">保存搜索历史</Label>
                      <p className="text-sm text-gray-500">允许保存和分析搜索记录</p>
                    </div>
                    <Switch
                      id="search-history"
                      checked={settings.privacy.searchHistory}
                      onCheckedChange={(checked) => updateSettings("privacy", "searchHistory", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics">使用分析</Label>
                      <p className="text-sm text-gray-500">帮助改进产品体验</p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={settings.privacy.analytics}
                      onCheckedChange={(checked) => updateSettings("privacy", "analytics", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-sharing">数据共享</Label>
                      <p className="text-sm text-gray-500">与第三方服务共享匿名数据</p>
                    </div>
                    <Switch
                      id="data-sharing"
                      checked={settings.privacy.dataSharing}
                      onCheckedChange={(checked) => updateSettings("privacy", "dataSharing", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI设置 */}
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI设置</CardTitle>
                <CardDescription>配置AI模型和参数</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="ai-model">AI模型</Label>
                  <Select value={settings.ai.model} onValueChange={(value) => updateSettings("ai", "model", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4 (推荐)</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                      <SelectItem value="local">本地模型</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="temperature">创造性 (Temperature)</Label>
                  <div className="mt-2">
                    <input
                      type="range"
                      id="temperature"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.ai.temperature}
                      onChange={(e) => updateSettings("ai", "temperature", Number.parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>保守 (0)</span>
                      <span>当前: {settings.ai.temperature}</span>
                      <span>创新 (1)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="max-tokens">最大令牌数</Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    min="100"
                    max="4096"
                    value={settings.ai.maxTokens}
                    onChange={(e) => updateSettings("ai", "maxTokens", Number.parseInt(e.target.value))}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">控制回答长度，更高的值允许更长的回答</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="streaming">流式输出</Label>
                    <p className="text-sm text-gray-500">实时显示AI回答过程</p>
                  </div>
                  <Switch
                    id="streaming"
                    checked={settings.ai.enableStreaming}
                    onCheckedChange={(checked) => updateSettings("ai", "enableStreaming", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据管理 */}
          <TabsContent value="data">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>数据备份</CardTitle>
                  <CardDescription>管理您的数据备份和恢复</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">自动备份</Label>
                      <p className="text-sm text-gray-500">定期自动备份您的数据</p>
                    </div>
                    <Switch
                      id="auto-backup"
                      checked={settings.storage.autoBackup}
                      onCheckedChange={(checked) => updateSettings("storage", "autoBackup", checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="backup-frequency">备份频率</Label>
                    <Select
                      value={settings.storage.backupFrequency}
                      onValueChange={(value) => updateSettings("storage", "backupFrequency", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">每日</SelectItem>
                        <SelectItem value="weekly">每周</SelectItem>
                        <SelectItem value="monthly">每月</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={exportSettings} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      导出设置
                    </Button>
                    <label>
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          导入设置
                        </span>
                      </Button>
                      <input type="file" accept=".json" onChange={importSettings} className="hidden" />
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>数据清理</CardTitle>
                  <CardDescription>清除存储的数据以释放空间</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      onClick={() => clearData("搜索历史")}
                      className="flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      清除搜索历史
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => clearData("收藏")}
                      className="flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      清除收藏
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => clearData("缓存")}
                      className="flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      清除缓存
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button variant="destructive" onClick={resetSettings} className="w-full">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      重置所有设置
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
