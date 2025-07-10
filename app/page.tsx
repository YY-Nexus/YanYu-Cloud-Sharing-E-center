"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Upload,
  Sparkles,
  Brain,
  FileText,
  ImageIcon,
  Presentation,
  Globe,
  History,
  Settings,
  User,
  Lightbulb,
  BookOpen,
  Users,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const quickActions = [
    {
      id: "mindmap",
      title: "思维导图",
      description: "生成知识结构图",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-purple-500",
      path: "/generate/mindmap",
    },
    {
      id: "summary",
      title: "智能总结",
      description: "提取关键信息",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-500",
      path: "/thinking",
    },
    {
      id: "poster",
      title: "海报生成",
      description: "创建精美海报",
      icon: <ImageIcon className="w-6 h-6" />,
      color: "bg-green-500",
      path: "/generate/poster",
    },
    {
      id: "ppt",
      title: "PPT制作",
      description: "自动生成演示文稿",
      icon: <Presentation className="w-6 h-6" />,
      color: "bg-orange-500",
      path: "/generate/ppt",
    },
    {
      id: "webpage",
      title: "网页生成",
      description: "创建交互式网页",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-pink-500",
      path: "/generate/webpage",
    },
    {
      id: "learning",
      title: "学习路径",
      description: "个性化学习计划",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-indigo-500",
      path: "/learning-path/create",
    },
  ]

  const trendingTopics = [
    "人工智能发展趋势",
    "量子计算原理",
    "区块链技术应用",
    "机器学习算法",
    "数据科学方法",
    "云计算架构",
  ]

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("recentSearches")
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) {
            setRecentSearches(parsed)
          }
        }
      } catch (error) {
        console.error("Error loading recent searches:", error)
        setRecentSearches([])
      }
    }
  }, [])

  const handleSearch = async (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    if (!finalQuery || !finalQuery.trim()) return

    setIsLoading(true)

    try {
      const updatedSearches = [finalQuery, ...recentSearches.filter((s) => s !== finalQuery)].slice(0, 10)
      setRecentSearches(updatedSearches)

      if (typeof window !== "undefined") {
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push(`/results?query=${encodeURIComponent(finalQuery)}`)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: any) => {
    if (query && query.trim()) {
      router.push(`${action.path}?query=${encodeURIComponent(query)}`)
    } else {
      router.push(action.path)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setQuery(`分析文件: ${file.name}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">YanYu AI</h1>
                <p className="text-sm text-gray-600">智能搜索与内容生成平台</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => router.push("/history")}>
                <History className="w-5 h-5 mr-2" />
                历史记录
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/settings")}>
                <Settings className="w-5 h-5 mr-2" />
                设置
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push("/auth/login")}>
                <User className="w-5 h-5 mr-2" />
                登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            探索知识的
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">无限可能</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            通过AI驱动的智能搜索和内容生成，让学习和创作变得更加高效
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="输入您想了解的任何内容..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full h-14 pl-6 pr-32 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-purple-500"
            />
            <div className="absolute right-2 top-2 flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} className="h-10 px-3">
                <Upload className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => handleSearch()}
                disabled={isLoading || !query.trim()}
                className="h-10 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
            />
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-purple-600" />
            快速操作
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.id}
                className="border-gray-200 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => handleQuickAction(action)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-white`}
                  >
                    {action.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {recentSearches.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-600" />
              最近搜索
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.slice(0, 8).map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
            热门话题
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {trendingTopics.map((topic, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 text-left justify-start hover:bg-purple-50 hover:border-purple-300 bg-transparent"
                onClick={() => handleSearch(topic)}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-purple-600">#{index + 1}</span>
                  <span className="text-sm">{topic}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Card className="border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-8">
              <Lightbulb className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">开始您的AI之旅</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                无论是学习新知识、创作内容还是解决问题，YanYu AI都能为您提供智能化的解决方案。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push("/learning")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  开始学习
                </Button>
                <Button variant="outline" onClick={() => router.push("/community")} className="px-8 py-3">
                  <Users className="w-5 h-5 mr-2" />
                  加入社区
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
