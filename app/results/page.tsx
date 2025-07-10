"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Copy,
  Share2,
  Star,
  BookOpen,
  Clock,
  Tag,
  Eye,
  FileText,
  Check,
  Map,
  BarChart3,
  Globe,
  Play,
  Volume2,
  VolumeX,
  Search,
  Zap,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { HistoryManager } from "@/lib/history"

interface SearchResult {
  id: string
  question: string
  answer: string
  confidence: number
  sources: Array<{
    id: string
    title: string
    url: string
    snippet: string
    type: "article" | "video" | "document" | "website"
    reliability: number
  }>
  relatedQuestions: string[]
  tags: string[]
  category: string
  timestamp: number
  metadata: {
    responseTime: number
    model: string
    tokens: number
  }
  visualizations: {
    mindmap?: string
    timeline?: Array<{ year: string; event: string }>
    outline?: Array<{ level: number; title: string; content: string }>
  }
}

interface VoiceSettings {
  isPlaying: boolean
  speed: number
  voice: string
}

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const mode = searchParams.get("mode") || "quick"

  const [result, setResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [rating, setRating] = useState<"up" | "down" | null>(null)
  const [showSources, setShowSources] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    isPlaying: false,
    speed: 1,
    voice: "zh-CN",
  })
  const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set())

  const speechSynthesis = useRef<SpeechSynthesis | null>(null)
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthesis.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    // 模拟API调用获取结果
    const fetchResult = async () => {
      setIsLoading(true)

      try {
        // 模拟网络延迟
        await new Promise((resolve) => setTimeout(resolve, mode === "deep" ? 2000 : 1000))

        const mockResult: SearchResult = {
          id: `result_${Date.now()}`,
          question: query,
          answer: generateMockAnswer(query, mode),
          confidence: mode === "deep" ? 0.95 : 0.88,
          sources: generateMockSources(query),
          relatedQuestions: generateRelatedQuestions(query),
          tags: generateTags(query),
          category: inferCategory(query),
          timestamp: Date.now(),
          metadata: {
            responseTime: mode === "deep" ? 3240 : 1580,
            model: mode === "deep" ? "GPT-4-Turbo" : "GPT-4",
            tokens: mode === "deep" ? 2150 : 1250,
          },
          visualizations: {
            mindmap: generateMindmapData(query),
            timeline: generateTimelineData(query),
            outline: generateOutlineData(query),
          },
        }

        setResult(mockResult)
        setIsLoading(false)

        // 保存到历史记录
        HistoryManager.addToHistory({
          question: mockResult.question,
          answer: mockResult.answer,
          timestamp: mockResult.timestamp,
          category: mockResult.category,
          tags: mockResult.tags,
          metadata: {
            responseTime: mockResult.metadata.responseTime,
            confidence: mockResult.confidence,
            relatedQuestions: mockResult.relatedQuestions,
          },
        })
      } catch (error) {
        console.error("获取结果失败:", error)
        setIsLoading(false)
      }
    }

    if (query) {
      fetchResult()
    } else {
      router.push("/")
    }
  }, [query, mode, router])

  const generateMockAnswer = (query: string, mode: string): string => {
    const baseAnswer = `# ${query} - 详细解析

## 核心概念

${query}是一个重要的概念，在当前技术发展中具有关键作用。让我为您详细分析：

### 基本定义
${query}指的是相关领域中的核心技术或概念，它通过特定的方法和原理来实现预期的功能和效果。

### 主要特点
1. **技术先进性**：采用最新的技术标准和实现方法
2. **应用广泛性**：在多个领域都有重要应用
3. **发展前景**：具有良好的发展潜力和市场前景

## 实际应用

### 应用场景
- **场景一**：在特定环境下的应用实例
- **场景二**：解决实际问题的具体方案
- **场景三**：与其他技术结合的创新应用

### 成功案例
通过实际案例分析，我们可以看到${query}在解决实际问题中的重要作用和显著效果。

## 技术原理

### 核心机制
${query}的工作原理基于以下几个关键要素：
1. 基础理论支撑
2. 技术实现路径
3. 优化改进方法

### 关键技术
- **技术点1**：核心算法和实现方式
- **技术点2**：系统架构和设计模式
- **技术点3**：性能优化和扩展性考虑

## 发展趋势

### 当前状态
目前${query}已经在多个领域得到广泛应用，技术相对成熟，但仍有持续改进的空间。

### 未来展望
1. **技术演进**：向更高效、更智能的方向发展
2. **应用拓展**：在更多领域找到新的应用场景
3. **标准化**：建立更完善的行业标准和规范

## 学习建议

### 入门路径
1. **理论学习**：掌握基础概念和原理
2. **实践操作**：通过项目实践加深理解
3. **持续更新**：关注最新发展动态

### 推荐资源
- 权威教程和文档
- 开源项目和案例
- 专业社区和论坛

## 总结

${query}作为重要的技术概念，不仅在当前具有重要价值，在未来发展中也将发挥更大作用。建议深入学习和实践，把握技术发展机遇。`

    if (mode === "deep") {
      return (
        baseAnswer +
        `

## 深度分析

### 技术架构深入
从系统架构角度分析，${query}采用了分层设计模式，包括：
- **表示层**：用户界面和交互逻辑
- **业务层**：核心业务逻辑处理
- **数据层**：数据存储和管理

### 性能优化策略
1. **算法优化**：采用更高效的算法实现
2. **缓存机制**：合理使用缓存提升性能
3. **并发处理**：支持高并发访问场景

### 安全性考虑
- 数据加密和传输安全
- 访问控制和权限管理
- 异常处理和容错机制

### 可扩展性设计
系统设计充分考虑了未来扩展需求，采用模块化架构，支持功能的灵活扩展和升级。

### 行业对比分析
与同类技术相比，${query}在以下方面具有优势：
- 技术成熟度更高
- 社区支持更完善
- 文档资料更丰富

### 实施建议
1. **项目规划**：制定详细的实施计划
2. **团队建设**：组建专业的技术团队
3. **风险控制**：识别和管控潜在风险
4. **持续改进**：建立持续优化机制`
      )
    }

    return baseAnswer
  }

  const generateMockSources = (query: string) => {
    return [
      {
        id: "source-1",
        title: `权威百科全书 - ${query}`,
        url: "https://example.com/encyclopedia",
        snippet: `提供关于${query}的权威定义和详细解释，包含历史发展、技术原理、应用场景等全面信息...`,
        type: "article",
        reliability: 0.95,
      },
      {
        id: "source-2",
        title: `学术论文集 - ${query}研究进展`,
        url: "https://example.com/papers",
        snippet: `最新的学术研究成果和理论发展，涵盖${query}的前沿技术和创新应用...`,
        type: "document",
        reliability: 0.92,
      },
      {
        id: "source-3",
        title: `专业视频教程 - ${query}入门指南`,
        url: "https://example.com/video",
        snippet: `通过视频形式深入浅出地讲解${query}相关概念，适合初学者和进阶学习者...`,
        type: "video",
        reliability: 0.88,
      },
      {
        id: "source-4",
        title: `官方文档 - ${query}技术规范`,
        url: "https://example.com/docs",
        snippet: `官方发布的技术文档和使用指南，包含详细的API文档和最佳实践...`,
        type: "website",
        reliability: 0.96,
      },
      {
        id: "source-5",
        title: `行业报告 - ${query}市场分析`,
        url: "https://example.com/report",
        snippet: `专业机构发布的行业分析报告，包含市场趋势、竞争格局和发展预测...`,
        type: "document",
        reliability: 0.90,
      },
    ]
  }

  const generateRelatedQuestions = (query: string) => {
    return [
      `${query}的发展历史和演进过程是什么？`,
      `${query}在实际项目中有哪些成功应用案例？`,
      `如何系统性地学习和掌握${query}技术？`,
      `${query}的未来发展趋势和技术方向如何？`,
      `${query}与其他相关技术的区别和联系是什么？`,
      `实施${query}项目需要注意哪些关键要点？`,
    ]
  }

  const generateTags = (query: string) => {
    const commonTags = ["技术", "学习", "应用", "发展", "原理", "实践"]
    const specificTags = query.includes("人工智能")
      ? ["AI", "机器学习", "深度学习", "算法"]
      : query.includes("编程")
        ? ["代码", "开发", "软件", "框架"]
        : ["知识", "概念", "理论", "方法"]
    return [...commonTags, ...specificTags].slice(0, 8)
  }

  const inferCategory = (query: string) => {
    if (query.includes("人工智能") || query.includes("AI") || query.includes("机器学习")) {
      return "人工智能"
    }
    if (query.includes("编程") || query.includes("代码") || query.includes("开发")) {
      return "编程技术"
    }
    if (query.includes("设计") || query.includes("UI") || query.includes("UX")) {
      return "设计"
    }
    return "通用知识"
  }

  const generateMindmapData = (query: string) => {
    return `${query}思维导图数据`
  }

  const generateTimelineData = (query: string) => {
    return [
      { year: "2020", event: `${query}技术起步阶段` },
      { year: "2021", event: `${query}理论完善` },
      { year: "2022", event: `${query}实际应用` },
      { year: "2023", event: `${query}广泛推广` },
      { year: "2024", event: `${query}技术成熟` },
    ]
  }

  const generateOutlineData = (query: string) => {
    return [
      { level: 1, title: "基本概念", content: `${query}的定义和核心要点` },
      { level: 1, title: "技术原理", content: `${query}的工作机制和实现方法` },
      { level: 2, title: "核心算法", content: "关键算法和数据结构" },
      { level: 2, title: "系统架构", content: "整体架构设计和模块划分" },
      { level: 1, title: "应用场景", content: `${query}的实际应用领域` },
      { level: 1, title: "发展趋势", content: `${query}的未来发展方向` },
    ]
  }

  const handleCopy = async () => {
    if (!result) return

    try {
      await navigator.clipboard.writeText(result.answer)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error("复制失败:", error)
    }
  }

  const handleShare = async () => {
    if (!result) return

    const shareData = {
      title: `AI搜索结果: ${result.question}`,
      text: result.answer.slice(0, 200) + "...",
      url: window.location.href,
    }

    try {
      if (navigator.share && window.isSecureContext) {
        await navigator.share(shareData)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      }
    } catch (error) {
      console.error("分享失败:", error)
      try {
        await navigator.clipboard.writeText(window.location.href)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      } catch (clipboardError) {
        console.error("复制链接也失败:", clipboardError)
        alert("请手动复制当前页面链接进行分享")
      }
    }
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    if (result) {
      HistoryManager.toggleFavorite(result.id)
    }
  }

  const handleRating = (newRating: "up" | "down") => {
    setRating(rating === newRating ? null : newRating)
    if (result) {
      HistoryManager.rateHistory(result.id, newRating === "up" ? 5 : 1)
    }
  }

  const handleRelatedQuestion = (question: string) => {
    router.push(`/thinking?query=${encodeURIComponent(question)}`)
  }

  const handleVoicePlay = () => {
    if (!result || !speechSynthesis.current) return

    if (voiceSettings.isPlaying) {
      speechSynthesis.current.cancel()
      setVoiceSettings((prev) => ({ ...prev, isPlaying: false }))
      return
    }

    const utterance = new SpeechSynthesisUtterance(result.answer)
    utterance.lang = voiceSettings.voice
    utterance.rate = voiceSettings.speed
    utterance.onend = () => {
      setVoiceSettings((prev) => ({ ...prev, isPlaying: false }))
    }

    currentUtterance.current = utterance
    speechSynthesis.current.speak(utterance)
    setVoiceSettings((prev) => ({ ...prev, isPlaying: true }))
  }

  const toggleSourceExpansion = (sourceId: string) => {
    setExpandedSources((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sourceId)) {
        newSet.delete(sourceId)
      } else {
        newSet.add(sourceId)
      }
      return newSet
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "website":
        return <Globe className="w-4 h-4 text-blue-500" />
      case "video":
        return <Play className="w-4 h-4 text-red-500" />
      case "document":
        return <FileText className="w-4 h-4 text-green-500" />
      case "article":
        return <BookOpen className="w-4 h-4 text-purple-500" />
      default:
        return <Globe className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      website: "网站",
      video: "视频",
      document: "文档",
      article: "文章",
    }
    return labels[type as keyof typeof labels] || "网页"
  }

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 0.9) return "text-green-600 bg-green-100"
    if (reliability >= 0.8) return "text-blue-600 bg-blue-100"
    return "text-yellow-600 bg-yellow-100"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg mb-2">
            {mode === "deep" ? "深度分析中..." : "快速生成中..."}
          </p>
          <p className="text-gray-500 text-sm">
            {mode === "deep" ? "正在进行全面分析，请稍候" : "正在快速处理您的问题"}
          </p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">未找到结果</p>
          <Button onClick={() => router.back()} className="bg-blue-600 hover:bg-blue-700 text-white">
            返回搜索
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回
            </Button>
            <div className="flex items-center space-x-2">
              {mode === "deep" ? (
                <Brain className="w-5 h-5 text-purple-600" />
              ) : (
                <Zap className="w-5 h-5 text-blue-600" />
              )}
              <h1 className="text-lg font-semibold text-gray-900">
                {mode === "deep" ? "深度分析结果" : "快速搜索结果"}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoicePlay}
              className="text-gray-600 hover:text-blue-600"
              title={voiceSettings.isPlaying ? "停止播放" : "语音播放"}
            >
              {voiceSettings.isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-gray-600 hover:text-green-600"
              title="复制内容"
            >
              {copySuccess ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-gray-600 hover:text-blue-600"
              title="分享结果"
            >
              {shareSuccess ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className={`${
                isFavorited ? "text-yellow-600 bg-yellow-50" : "text-gray-600 hover:text-yellow-600"
              }`}
              title="收藏"
            >
              <Star className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 主要内容 */}
          <div className="lg:col-span-3">
            {/* 问题标题 */}
            <Card className="mb-6 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex-1">{result.question}</h2>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge
                      variant="outline"
                      className={`${getReliabilityColor(result.confidence)} border-0`}
                    >
                      置信度 {Math.round(result.confidence * 100)}%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>响应时间: {result.metadata.responseTime}ms</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>模型: {result.metadata.model}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>分类: {result.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 内容标签页 */}
            <Card className="mb-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
                    <TabsTrigger
                      value="content"
                      className="flex items-center space-x-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                    >
                      <FileText className="w-4 h-4" />
                      <span>详细内容</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="mindmap"
                      className="flex items-center space-x-2 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none"
                    >
                      <Map className="w-4 h-4" />
                      <span>思维导图</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="timeline"
                      className="flex items-center space-x-2 data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>时间线</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="outline"
                      className="flex items-center space-x-2 data-[state=active]:border-b-2 data-[state=active]:border-orange-600 rounded-none"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>大纲视图</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="p-6">
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {result.answer}
                      </div>
                    </div>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                      {result.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
                          onClick={() => router.push(`/thinking?query=${encodeURIComponent(tag)}`)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="mindmap" className="p-6">
                    <div className="flex justify-center items-center h-64 border border-gray-200 rounded-lg bg-gray-50">
                      <p className="text-gray-500">{result.visualizations.mindmap || "思维导图数据加载中..."}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="p-6">
                    <div className="space-y-4">
                      {result.visualizations.timeline?.map((item, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                              {item.year}
                            </div>
                            <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                          </div>
                          <div className="flex-1">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                              <p className="text-gray-800">{item.event}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="outline" className="p-6">
                    <div className="space-y-3">
                      {result.visualizations.outline?.map((item, index) => (
                        <div
                          key={index}
                          className={`ml-${(item.level - 1) * 4} pl-4 border-l-2 ${
                            item.level === 1 ? "border-blue-500" : "border-gray-300"
                          }`}
                        >
                          <h3 className={`text-lg font-medium text-gray-800 mb-1 ${item.level === 1 ? "text-xl" : ""}`}>
                            {item.title}
                          </h3>
                          <p className="text-gray-600">{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* 来源 */}
            <Card className="mb-6 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">参考来源</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSources(!showSources)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    {showSources ? "收起" : "展开"}
                  </Button>
                </div>

                {showSources && (
                  <div className="space-y-4">
                    {result.sources.map((source) => (
                      <div key={source.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center mb-2">
                          {getTypeIcon(source.type)}
                          <span className="ml-2 text-sm font-medium text-gray-700">{getTypeLabel(source.type)}</span>
                          <Badge
                            variant="outline"
                            className={`ml-2 ${getReliabilityColor(source.reliability)} text-xs border-0`}
                          >
                            可靠性 {Math.round(source.reliability * 100)}%
                          </Badge>
                        </div>
                        <h4 className="font-medium text-gray-900 hover:text-blue-600 mb-1">
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            {source.title}
                          </a>
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {expandedSources.has(source.id) ? source.snippet : `${source.snippet.substring(0, 100)}...`}
                        </p>
                        <button
                          className="text-blue-600 text-sm hover:underline"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSourceExpansion(source.id)
                          }}
                        >
                          {expandedSources.has(source.id) ? "收起" : "展开"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 相关问题 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">相关问题</h3>
                <div className="space-y-3">
                  {result.relatedQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-all cursor-pointer"
                      onClick={() => handleRelatedQuestion(question)}
                    >
                      <p className="text-gray-800">{question}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            {/* 操作栏 */}
            <Card className="mb-6 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">对结果评分</h3>
                <div className="flex space-x-2">
                  <Button
                    variant={rating === "up" ? "solid" : "outline"}
                    size="sm"
                    className={rating === "up" ? "bg-green-600 text-white" : "text-green-600"}
                    onClick={() => handleRating("up")}
                  >
                    <Check className="w-4 h-4 mr-1" /> 有帮助
                  </Button>
                  <Button
                    variant={rating === "down" ? "solid" : "outline"}
                    size="sm"
                    className={rating === "down" ? "bg-red-600 text-white" : "text-red-600"}
                    onClick={() => handleRating("down")}
                  >
                    <Check className="w-4 h-4 mr-1" /> 无帮助
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 语音设置 */}
            <Card className="mb-6 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">语音播放</h3>
                <div className="space-y-4">
                  <Button
                    variant="solid"
                    size="sm"
                    onClick={handleVoicePlay}
                    className={`${voiceSettings.isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} w-full`}
                  >
                    {voiceSettings.isPlaying ? (
                      <>
                        <VolumeX className="w-4 h-4 mr-2" /> 停止播放
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 mr-2" /> 开始播放
                      </>
                    )}
                  </Button>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">语速</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voiceSettings.speed}
                      onChange={(e) => setVoiceSettings((prev) => ({ ...prev, speed: parseFloat(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>慢</span>
                      <span>标准</span>
                      <span>快</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">语音</label>
                    <select
                      value={voiceSettings.voice}
                      onChange={(e) => setVoiceSettings((prev) => ({ ...prev, voice: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="zh-CN">中文 (中国大陆)</option>
                      <option value="zh-TW">中文 (台湾)</option>
                      <option value="en-US">英文 (美国)</option>
                      <option value="ja-JP">日文</option>
                      <option value="ko-KR">韩文</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 分享 */}
            <Card className="mb-6 border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">分享结果</h3>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                    <Copy className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
                    <FileText className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                    <Eye className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 元数据 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">元数据</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">生成时间</span>
                    <span className="text-gray-900">
                      {new Date(result.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">模型</span>
                    <span className="text-gray-900">{result.metadata.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">响应时间</span>
                    <span className="text-gray-900">{result.metadata.responseTime}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">令牌数量</span>
                    <span className="text-gray-900">{result.metadata.tokens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">置信度</span>
                    <span className="text-gray-900">{Math.round(result.confidence * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
