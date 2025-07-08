"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Mic,
  Camera,
  Upload,
  Sparkles,
  Brain,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  History,
  Star,
  Zap,
  MessageSquare,
  FileText,
  ImageIcon,
  Palette,
  Sun,
  Moon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

interface SearchHistory {
  id: string
  query: string
  timestamp: Date
  type: "text" | "voice" | "image" | "file"
  results?: number
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  color: string
  path: string
}

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // 快捷操作配置
  const quickActions: QuickAction[] = [
    {
      id: "search",
      title: "智能搜索",
      description: "AI驱动的智能搜索引擎",
      icon: Search,
      color: "bg-blue-500",
      path: "/search",
    },
    {
      id: "chat",
      title: "AI对话",
      description: "与AI助手进行深度对话",
      icon: MessageSquare,
      color: "bg-green-500",
      path: "/ai-assistant",
    },
    {
      id: "mindmap",
      title: "思维导图",
      description: "生成知识思维导图",
      icon: Brain,
      color: "bg-purple-500",
      path: "/generate/mindmap",
    },
    {
      id: "learning",
      title: "学习路径",
      description: "个性化学习计划制定",
      icon: BookOpen,
      color: "bg-orange-500",
      path: "/learning-path/create",
    },
    {
      id: "community",
      title: "知识社区",
      description: "与他人分享和讨论",
      icon: Users,
      color: "bg-pink-500",
      path: "/community",
    },
    {
      id: "analytics",
      title: "学习分析",
      description: "查看学习进度和统计",
      icon: BarChart3,
      color: "bg-indigo-500",
      path: "/analytics",
    },
    {
      id: "poster",
      title: "海报生成",
      description: "AI生成精美海报",
      icon: Palette,
      color: "bg-red-500",
      path: "/generate/poster",
    },
    {
      id: "ppt",
      title: "PPT制作",
      description: "智能PPT生成工具",
      icon: FileText,
      color: "bg-yellow-500",
      path: "/generate/ppt",
    },
  ]

  // 热门搜索标签
  const trendingTags = [
    "人工智能",
    "机器学习",
    "深度学习",
    "自然语言处理",
    "计算机视觉",
    "数据科学",
    "Python编程",
    "前端开发",
    "区块链技术",
    "量子计算",
    "生物信息学",
    "云计算",
  ]

  useEffect(() => {
    // 加载搜索历史
    loadSearchHistory()

    // 注册Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }
  }, [])

  const loadSearchHistory = () => {
    const saved = localStorage.getItem("searchHistory")
    if (saved) {
      const parsed = JSON.parse(saved).map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }))
      setSearchHistory(parsed.slice(0, 5)) // 只显示最近5条
    }
  }

  const saveToHistory = (query: string, type: "text" | "voice" | "image" | "file") => {
    const newEntry: SearchHistory = {
      id: Date.now().toString(),
      query,
      timestamp: new Date(),
      type,
      results: Math.floor(Math.random() * 1000) + 100,
    }

    const updated = [newEntry, ...searchHistory].slice(0, 10)
    setSearchHistory(updated)
    localStorage.setItem("searchHistory", JSON.stringify(updated))
  }

  const handleSearch = async (searchQuery?: string, type: "text" | "voice" | "image" | "file" = "text") => {
    const finalQuery = searchQuery || query
    if (!finalQuery.trim() && !selectedFile) return

    setIsLoading(true)

    try {
      // 保存到历史记录
      saveToHistory(finalQuery || selectedFile?.name || "文件搜索", type)

      // 跳转到思考页面
      const params = new URLSearchParams({
        q: finalQuery,
        type: type,
      })

      if (selectedFile) {
        // 这里应该上传文件并获取URL
        params.append("file", selectedFile.name)
      }

      router.push(`/thinking?${params.toString()}`)
    } catch (error) {
      console.error("搜索失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceSearch = async () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("您的浏览器不支持语音识别功能")
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = "zh-CN"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)
      handleSearch(transcript, "voice")
    }

    recognition.onerror = (event: any) => {
      console.error("语音识别错误:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setQuery(`分析文件: ${file.name}`)
    }
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error("摄像头访问失败:", error)
      alert("无法访问摄像头，请检查权限设置")
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      setQuery(`分析文件: ${file.name}`)
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    router.push(action.path)
  }

  const handleTrendingTag = (tag: string) => {
    setQuery(tag)
    handleSearch(tag)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI智能搜索平台
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={() => router.push("/history")}>
                <History className="w-4 h-4 mr-2" />
                历史记录
              </Button>

              <Button variant="ghost" size="sm" onClick={() => router.push("/favorites")}>
                <Star className="w-4 h-4 mr-2" />
                收藏夹
              </Button>

              <Button variant="ghost" size="sm" onClick={() => router.push("/settings")}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 主搜索区域 */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              探索无限
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                知识世界
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              基于先进AI技术的智能搜索平台，为您提供精准答案和创意内容生成
            </p>
          </div>

          {/* 搜索框 */}
          <div className="max-w-4xl mx-auto mb-8">
            <div
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 transition-all duration-300 ${
                dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex items-center p-4">
                <div className="flex-1">
                  <Textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="输入您的问题，或拖拽文件到此处..."
                    className="border-0 resize-none focus:ring-0 text-lg bg-transparent"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSearch()
                      }
                    }}
                  />
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceSearch}
                    disabled={isListening}
                    className={isListening ? "text-red-500 animate-pulse" : ""}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" size="sm" onClick={handleCameraCapture}>
                    <Camera className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-5 h-5" />
                  </Button>

                  <Button
                    onClick={() => handleSearch()}
                    disabled={isLoading || (!query.trim() && !selectedFile)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {selectedFile && (
                <div className="px-4 pb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>已选择文件: {selectedFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      移除
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.md"
            />
          </div>

          {/* 热门标签 */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">热门搜索:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {trendingTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900 dark:hover:text-blue-300 transition-colors"
                  onClick={() => handleTrendingTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 快捷操作网格 */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">功能中心</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => {
              const IconComponent = action.icon
              return (
                <Card
                  key={action.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                  onClick={() => handleQuickAction(action)}
                >
                  <CardHeader className="text-center pb-2">
                    <div
                      className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-sm">{action.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* 搜索历史 */}
        {searchHistory.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">最近搜索</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchHistory.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                  onClick={() => handleSearch(item.query, item.type)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {item.type === "voice" && <Mic className="w-4 h-4 text-green-500" />}
                        {item.type === "image" && <ImageIcon className="w-4 h-4 text-blue-500" />}
                        {item.type === "file" && <FileText className="w-4 h-4 text-purple-500" />}
                        {item.type === "text" && <Search className="w-4 h-4 text-gray-500" />}
                        <Badge variant="outline" className="text-xs">
                          {item.type === "voice"
                            ? "语音"
                            : item.type === "image"
                              ? "图片"
                              : item.type === "file"
                                ? "文件"
                                : "文本"}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">{item.timestamp.toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">{item.query}</p>
                    {item.results && <p className="text-xs text-gray-500">约 {item.results.toLocaleString()} 个结果</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <Search className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">1.2M+</div>
              <div className="text-sm opacity-90">搜索查询</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm opacity-90">活跃用户</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <Brain className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">99.5%</div>
              <div className="text-sm opacity-90">准确率</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <Zap className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">0.3s</div>
              <div className="text-sm opacity-90">平均响应</div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* 隐藏的视频元素用于摄像头 */}
      <video ref={videoRef} className="hidden" autoPlay playsInline />
    </div>
  )
}
