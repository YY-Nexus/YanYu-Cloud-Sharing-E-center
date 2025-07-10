"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Mic,
  Camera,
  Upload,
  Sparkles,
  Zap,
  Brain,
  Clock,
  TrendingUp,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  FileText,
  ImageIcon,
  Target,
  Share2,
  Download,
  Headphones,
  Map,
  BarChart3,
  Presentation,
  Globe,
  MessageCircle,
} from "lucide-react"
import { HistoryManager } from "@/lib/history"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  path: string
  category: "generate" | "analyze" | "learn" | "share"
}

interface TrendingTopic {
  id: string
  title: string
  count: number
  category: string
  trend: "up" | "hot" | "new"
}

interface RecentActivity {
  id: string
  type: "search" | "generate" | "favorite"
  title: string
  timestamp: number
  category: string
}

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [searchMode, setSearchMode] = useState<"quick" | "deep">("quick")
  const [isListening, setIsListening] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)

  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 快速操作配置
  const quickActions: QuickAction[] = [
    {
      id: "mindmap",
      title: "思维导图",
      description: "结构化知识展示",
      icon: <Map className="w-6 h-6" />,
      color: "bg-purple-500",
      path: "/generate/mindmap",
      category: "generate",
    },
    {
      id: "poster",
      title: "知识海报",
      description: "视觉化内容展示",
      icon: <ImageIcon className="w-6 h-6" />,
      color: "bg-green-500",
      path: "/generate/poster",
      category: "generate",
    },
    {
      id: "ppt",
      title: "PPT演示",
      description: "完整演示文稿",
      icon: <Presentation className="w-6 h-6" />,
      color: "bg-blue-500",
      path: "/generate/ppt",
      category: "generate",
    },
    {
      id: "webpage",
      title: "互动网页",
      description: "图表化结构展示",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-orange-500",
      path: "/generate/webpage",
      category: "generate",
    },
    {
      id: "learning-path",
      title: "学习路径",
      description: "个性化学习规划",
      icon: <Target className="w-6 h-6" />,
      color: "bg-indigo-500",
      path: "/learning-path/create",
      category: "learn",
    },
    {
      id: "analytics",
      title: "数据分析",
      description: "深度数据洞察",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-red-500",
      path: "/analytics",
      category: "analyze",
    },
    {
      id: "community",
      title: "社区分享",
      description: "知识协作交流",
      icon: <Users className="w-6 h-6" />,
      color: "bg-pink-500",
      path: "/community",
      category: "share",
    },
    {
      id: "ai-assistant",
      title: "AI助手",
      description: "智能对话分析",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-cyan-500",
      path: "/ai-assistant",
      category: "analyze",
    },
  ]

  useEffect(() => {
    loadTrendingTopics()
    loadRecentActivity()
  }, [])

  const loadTrendingTopics = () => {
    const mockTrending: TrendingTopic[] = [
      { id: "1", title: "人工智能发展趋势", count: 2341, category: "科技", trend: "hot" },
      { id: "2", title: "机器学习算法优化", count: 1876, category: "技术", trend: "up" },
      { id: "3", title: "深度学习框架对比", count: 1543, category: "开发", trend: "up" },
      { id: "4", title: "自然语言处理应用", count: 1234, category: "AI", trend: "new" },
      { id: "5", title: "计算机视觉技术", count: 987, category: "视觉", trend: "hot" },
      { id: "6", title: "量子计算原理", count: 756, category: "前沿", trend: "new" },
    ]
    setTrendingTopics(mockTrending)
  }

  const loadRecentActivity = () => {
    const history = HistoryManager.getHistory().slice(0, 5)
    const activities: RecentActivity[] = history.map((item) => ({
      id: item.id || `activity_${Date.now()}`,
      type: "search",
      title: item.question,
      timestamp: item.timestamp,
      category: item.category || "通用",
    }))
    setRecentActivity(activities)
  }

  const handleSearch = () => {
    if (!query.trim() && !selectedFile) return

    const searchQuery = selectedFile ? `分析文件: ${selectedFile.name}` : query

    if (searchMode === "quick") {
      router.push(`/results?query=${encodeURIComponent(searchQuery)}&mode=quick`)
    } else {
      router.push(`/thinking?query=${encodeURIComponent(searchQuery)}&mode=deep`)
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

    recognition.onstart = () => setIsListening(true)
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognition.start()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setQuery(`分析文件: ${file.name}`)
    }
  }

  const handleQuickAction = (action: QuickAction) => {
    if (query.trim()) {
      router.push(`${action.path}?query=${encodeURIComponent(query)}`)
    } else {
      router.push(action.path)
    }
  }

  const handleTrendingClick = (topic: TrendingTopic) => {
    setQuery(topic.title)
    handleSearch()
  }

  const getTrendIcon = (trend: TrendingTopic["trend"]) => {
    switch (trend) {
      case "hot":
        return <span className="text-red-500">🔥</span>
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "new":
        return <Sparkles className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "search":
        return <Search className="w-4 h-4 text-blue-500" />
      case "generate":
        return <Sparkles className="w-4 h-4 text-purple-500" />
      case "favorite":
        return <Star className="w-4 h-4 text-yellow-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI智能搜索
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/history")}>
                <Clock className="w-4 h-4 mr-2" />
                历史记录
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/favorites")}>
                <Star className="w-4 h-4 mr-2" />
                收藏夹
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/settings")}>
                设置
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 主搜索区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            智能搜索
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-3">
              新体验
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            结合AI技术的智能搜索引擎，支持思维导图、知识海报、PPT生成等多种展示方式， 让信息获取更高效、更直观、更有价值
          </p>

          {/* 搜索框 */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="输入您想了解的任何问题..."
                      className="w-full px-6 py-4 text-lg text-gray-900 border-none outline-none bg-transparent placeholder-gray-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch()
                        }
                      }}
                    />
                    {selectedFile && (
                      <div className="absolute top-full left-6 mt-2 flex items-center space-x-2 text-sm text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span>已选择: {selectedFile.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                          className="text-red-500 hover:text-red-700 p-1 h-auto"
                        >
                          移除
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceSearch}
                      disabled={isListening}
                      className={`p-3 ${isListening ? "text-red-500 animate-pulse" : "text-gray-600 hover:text-blue-600"}`}
                    >
                      <Mic className="w-5 h-5" />
                    </Button>

                    <Button variant="ghost" size="sm" className="p-3 text-gray-600 hover:text-green-600">
                      <Camera className="w-5 h-5" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 text-gray-600 hover:text-purple-600"
                    >
                      <Upload className="w-5 h-5" />
                    </Button>

                    <div className="w-px h-8 bg-gray-300 mx-2"></div>

                    <Button
                      onClick={handleSearch}
                      disabled={!query.trim() && !selectedFile}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      搜索
                    </Button>
                  </div>
                </div>

                {/* 搜索模式选择 */}
                <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant={searchMode === "quick" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSearchMode("quick")}
                    className={`flex items-center space-x-2 ${
                      searchMode === "quick" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span>急速回答</span>
                  </Button>
                  <Button
                    variant={searchMode === "deep" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSearchMode("deep")}
                    className={`flex items-center space-x-2 ${
                      searchMode === "deep" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-purple-600"
                    }`}
                  >
                    <Brain className="w-4 h-4" />
                    <span>深度分析</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.md"
            />
          </div>

          {/* 快速操作 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">智能生成工具</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Card
                  key={action.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm"
                  onClick={() => handleQuickAction(action)}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mx-auto mb-3`}
                    >
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 热门话题 */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-red-500" />
                    热门话题
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => router.push("/search")}>
                    查看更多
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendingTopics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => handleTrendingClick(topic)}
                      className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {topic.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(topic.trend)}
                          <span className="text-sm text-gray-500">{topic.count.toLocaleString()}</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">{topic.title}</h4>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 最近活动 */}
          <div>
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-blue-500" />
                    最近活动
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => router.push("/history")}>
                    查看全部
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setQuery(activity.title)
                          handleSearch()
                        }}
                      >
                        <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">{activity.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {activity.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(activity.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">暂无搜索记录</p>
                      <p className="text-sm text-gray-400 mt-1">开始您的第一次搜索吧</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 功能特色介绍 */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">强大的AI功能</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              不仅仅是搜索，更是知识的智能化处理和可视化展示平台
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <Map className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">思维导图生成</h3>
                <p className="text-sm text-gray-600 mb-4">将复杂信息结构化展示，支持交互式浏览和编辑</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-blue-600">
                  <Headphones className="w-4 h-4" />
                  <span>支持语音讲解</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">互动网页生成</h3>
                <p className="text-sm text-gray-600 mb-4">文字转图表，创建可交互的知识展示页面</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-green-600">
                  <Share2 className="w-4 h-4" />
                  <span>一键分享导出</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">知识海报制作</h3>
                <p className="text-sm text-gray-600 mb-4">知识点提炼与视觉化排版，便于学习分享</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-purple-600">
                  <Download className="w-4 h-4" />
                  <span>多格式导出</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <Presentation className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">PPT自动生成</h3>
                <p className="text-sm text-gray-600 mb-4">一键生成完整演示文稿，多种模板可选</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-orange-600">
                  <FileText className="w-4 h-4" />
                  <span>支持Word/PDF</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 设计价值展示 */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">设计价值与成果</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              基于用户需求分析和设计思维流程，打造高效、直观、可信的信息获取体���
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">提升用户体验</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• 信息获取更高效</li>
                <li>• 交互方式更灵活</li>
                <li>• 内容展示更直观</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">增强信息可信度</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• 明确来源链接</li>
                <li>• 支持溯源验证</li>
                <li>• 结构化展示逻辑</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">扩展应用场景</h3>
              <ul className="text-sm opacity-90 space-y-1">
                <li>• 适合汇报教学分享</li>
                <li>• 多平台导出支持</li>
                <li>• 协作学习功能</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AI智能搜索</span>
              </div>
              <p className="text-gray-400 text-sm">基于AI技术的智能搜索平台，让知识获取更高效、更直观、更有价值。</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">核心功能</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>智能搜索分析</li>
                <li>思维导图生成</li>
                <li>知识海报制作</li>
                <li>PPT自动生成</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">设计特色</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>结构化信息展示</li>
                <li>可视化知识呈现</li>
                <li>多格式内容导出</li>
                <li>协作学习支持</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">联系我们</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>产品反馈</li>
                <li>技术支持</li>
                <li>合作洽谈</li>
                <li>用户社区</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 AI智能搜索平台. 基于设计思维的界面跳转逻辑与搜索结果展示系统.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
