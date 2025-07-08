"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  WifiOff,
  Wifi,
  Save,
  FolderSyncIcon as Sync,
  Database,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
} from "lucide-react"

interface OfflineData {
  id: string
  type: "search" | "note" | "bookmark"
  title: string
  content: string
  timestamp: number
  synced: boolean
}

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true)
  const [offlineData, setOfflineData] = useState<OfflineData[]>([])
  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")

  useEffect(() => {
    // 检查网络状态
    setIsOnline(navigator.onLine)

    // 监听网络状态变化
    const handleOnline = () => {
      setIsOnline(true)
      syncOfflineData()
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // 加载离线数据
    loadOfflineData()

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const loadOfflineData = () => {
    try {
      const stored = localStorage.getItem("offline-data")
      if (stored) {
        setOfflineData(JSON.parse(stored))
      }
    } catch (error) {
      console.error("加载离线数据失败:", error)
    }
  }

  const saveOfflineData = (data: OfflineData[]) => {
    try {
      localStorage.setItem("offline-data", JSON.stringify(data))
      setOfflineData(data)
    } catch (error) {
      console.error("保存离线数据失败:", error)
    }
  }

  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return

    const note: OfflineData = {
      id: Date.now().toString(),
      type: "note",
      title: newNote.title,
      content: newNote.content,
      timestamp: Date.now(),
      synced: false,
    }

    const updatedData = [...offlineData, note]
    saveOfflineData(updatedData)
    setNewNote({ title: "", content: "" })

    // 如果在线，尝试立即同步
    if (isOnline) {
      syncSingleItem(note)
    }
  }

  const deleteItem = (id: string) => {
    const updatedData = offlineData.filter((item) => item.id !== id)
    saveOfflineData(updatedData)
  }

  const syncSingleItem = async (item: OfflineData) => {
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 标记为已同步
      const updatedData = offlineData.map((data) => (data.id === item.id ? { ...data, synced: true } : data))
      saveOfflineData(updatedData)
    } catch (error) {
      console.error("同步失败:", error)
    }
  }

  const syncOfflineData = async () => {
    if (!isOnline) return

    setSyncStatus("syncing")

    try {
      const unsyncedItems = offlineData.filter((item) => !item.synced)

      for (const item of unsyncedItems) {
        await syncSingleItem(item)
      }

      setSyncStatus("success")
      setTimeout(() => setSyncStatus("idle"), 3000)
    } catch (error) {
      console.error("同步失败:", error)
      setSyncStatus("error")
      setTimeout(() => setSyncStatus("idle"), 3000)
    }
  }

  const clearAllData = () => {
    if (confirm("确定要清除所有离线数据吗？")) {
      localStorage.removeItem("offline-data")
      setOfflineData([])
    }
  }

  const getStatusBadge = (synced: boolean) => {
    if (synced) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          已同步
        </Badge>
      )
    }
    return (
      <Badge variant="secondary">
        <Clock className="h-3 w-3 mr-1" />
        待同步
      </Badge>
    )
  }

  const getSyncStatusMessage = () => {
    switch (syncStatus) {
      case "syncing":
        return (
          <Alert>
            <Sync className="h-4 w-4 animate-spin" />
            <AlertDescription>正在同步离线数据...</AlertDescription>
          </Alert>
        )
      case "success":
        return (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>数据同步成功！</AlertDescription>
          </Alert>
        )
      case "error":
        return (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>数据同步失败，请稍后重试</AlertDescription>
          </Alert>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">离线功能测试</h1>
          <p className="text-gray-600">测试应用在离线状态下的数据存储和同步功能</p>
        </div>

        {/* 网络状态 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              {isOnline ? (
                <Wifi className="h-5 w-5 mr-2 text-green-600" />
              ) : (
                <WifiOff className="h-5 w-5 mr-2 text-red-600" />
              )}
              网络状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">当前状态</span>
              {isOnline ? (
                <Badge className="bg-green-100 text-green-800">
                  <Wifi className="h-3 w-3 mr-1" />
                  在线
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <WifiOff className="h-3 w-3 mr-1" />
                  离线
                </Badge>
              )}
            </div>

            {!isOnline && (
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>您当前处于离线状态。所有操作将保存到本地存储，网络恢复后自动同步。</AlertDescription>
              </Alert>
            )}

            {isOnline && offlineData.some((item) => !item.synced) && (
              <div className="mt-4">
                <Button onClick={syncOfflineData} disabled={syncStatus === "syncing"}>
                  <Sync className={`h-4 w-4 mr-2 ${syncStatus === "syncing" ? "animate-spin" : ""}`} />
                  同步离线数据
                </Button>
              </div>
            )}

            {getSyncStatusMessage() && <div className="mt-4">{getSyncStatusMessage()}</div>}
          </CardContent>
        </Card>

        {/* 添加笔记 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Save className="h-5 w-5 mr-2" />
              添加离线笔记
            </CardTitle>
            <CardDescription>即使在离线状态下也可以创建和保存笔记</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
              <Input
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="输入笔记标题..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
              <Textarea
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="输入笔记内容..."
                rows={4}
              />
            </div>

            <Button onClick={addNote} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              保存笔记
            </Button>
          </CardContent>
        </Card>

        {/* 离线数据列表 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                离线数据 ({offlineData.length})
              </div>
              {offlineData.length > 0 && (
                <Button onClick={clearAllData} variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  清除所有
                </Button>
              )}
            </CardTitle>
            <CardDescription>本地存储的数据，网络恢复后将自动同步到服务器</CardDescription>
          </CardHeader>
          <CardContent>
            {offlineData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>暂无离线数据</p>
              </div>
            ) : (
              <div className="space-y-4">
                {offlineData.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.synced)}
                        <Button onClick={() => deleteItem(item.id)} variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-2">{item.content}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>类型: {item.type}</span>
                      <span>创建时间: {new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 离线功能说明 */}
        <Card>
          <CardHeader>
            <CardTitle>离线功能说明</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium">本地存储</h4>
                  <p className="text-sm text-gray-600">所有数据都会保存到浏览器的本地存储中，即使离线也能正常使用</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium">自动同步</h4>
                  <p className="text-sm text-gray-600">网络恢复后，未同步的数据会自动上传到服务器</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium">状态指示</h4>
                  <p className="text-sm text-gray-600">每条数据都有同步状态标识，方便了解数据的同步情况</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">4</span>
                </div>
                <div>
                  <h4 className="font-medium">冲突处理</h4>
                  <p className="text-sm text-gray-600">如果同一数据在多个设备上被修改，系统会智能处理冲突</p>
                </div>
              </div>
            </div>

            <Alert className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>测试建议：</strong>
                尝试断开网络连接，添加一些笔记，然后重新连接网络观察自动同步功能。
                您也可以在浏览器开发者工具的Network标签页中模拟离线状态。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
