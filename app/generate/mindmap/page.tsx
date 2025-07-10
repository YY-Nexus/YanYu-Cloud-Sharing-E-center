"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Share2,
  Play,
  Pause,
  Volume2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Settings,
  Eye,
  Lightbulb,
  Link,
} from "lucide-react"

interface MindMapNode {
  id: string
  title: string
  content: string
  level: number
  children: MindMapNode[]
  position: { x: number; y: number }
  color: string
  sourceId?: string
  confidence: number
  expanded: boolean
}

interface MindMapData {
  id: string
  title: string
  rootNode: MindMapNode
  theme: "default" | "dark" | "colorful" | "minimal"
  metadata: {
    totalNodes: number
    maxDepth: number
    createdAt: number
    confidence: number
  }
}

interface VoiceNarration {
  nodeId: string
  text: string
  duration: number
  order: number
}

export default function MindMapPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentNarrationIndex, setCurrentNarrationIndex] = useState(0)
  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1,
    voice: "zh-CN",
    autoPlay: false,
  })
  const [theme, setTheme] = useState<MindMapData["theme"]>("default")
  const [showSources, setShowSources] = useState(true)

  const svgRef = useRef<SVGSVGElement>(null)
  const speechSynthesis = useRef<SpeechSynthesis | null>(null)
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthesis.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    generateMindMap()
  }, [query])

  const generateMindMap = async () => {
    setIsLoading(true)

    try {
      // 模拟AI生成思维导图
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockMindMap: MindMapData = {
        id: `mindmap_${Date.now()}`,
        title: `${query} - 思维导图`,
        rootNode: generateMockMindMapNodes(query),
        theme: "default",
        metadata: {
          totalNodes: 15,
          maxDepth: 3,
          createdAt: Date.now(),
          confidence: 0.92,
        },
      }

      setMindMapData(mockMindMap)
      setSelectedNode(mockMindMap.rootNode)
    } catch (error) {
      console.error("生成思维导图失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockMindMapNodes = (topic: string): MindMapNode => {
    const rootNode: MindMapNode = {
      id: "root",
      title: topic,
      content: `${topic}是一个重要的概念，涉及多个方面的知识和应用。`,
      level: 0,
      children: [],
      position: { x: 400, y: 300 },
      color: "#3B82F6",
      confidence: 0.95,
      expanded: true,
    }

    // 生成子节点
    const childTopics = [
      { title: "基本概念", content: `${topic}的核心定义和基础理论`, color: "#10B981" },
      { title: "技术原理", content: `${topic}的工作机制和实现方法`, color: "#8B5CF6" },
      { title: "应用场景", content: `${topic}在实际中的应用领域`, color: "#F59E0B" },
      { title: "发展趋势", content: `${topic}的未来发展方向`, color: "#EF4444" },
    ]

    childTopics.forEach((childTopic, index) => {
      const angle = (index * 2 * Math.PI) / childTopics.length
      const radius = 200
      const x = rootNode.position.x + Math.cos(angle) * radius
      const y = rootNode.position.y + Math.sin(angle) * radius

      const childNode: MindMapNode = {
        id: `child_${index}`,
        title: childTopic.title,
        content: childTopic.content,
        level: 1,
        children: [],
        position: { x, y },
        color: childTopic.color,
        sourceId: `source_${index}`,
        confidence: 0.88 + Math.random() * 0.1,
        expanded: true,
      }

      // 为每个子节点生成孙子节点
      const grandChildTopics = [
        `${childTopic.title}详解`,
        `${childTopic.title}案例`,
        `${childTopic.title}要点`,
      ]

      grandChildTopics.forEach((grandChildTopic, grandIndex) => {
        const grandAngle = angle + (grandIndex - 1) * 0.5
        const grandRadius = 120
        const grandX = x + Math.cos(grandAngle) * grandRadius
        const grandY = y + Math.sin(grandAngle) * grandRadius

        const grandChildNode: MindMapNode = {
          id: `grandchild_${index}_${grandIndex}`,
          title: grandChildTopic,
          content: `关于${grandChildTopic}的详细说明和分析`,
          level: 2,
          children: [],
          position: { x: grandX, y: grandY },
          color: childTopic.color,
          confidence: 0.8 + Math.random() * 0.15,
          expanded: false,
        }

        childNode.children.push(grandChildNode)
      })

      rootNode.children.push(childNode)
    })

    return rootNode
  }

  const handleNodeClick = (node: MindMapNode) => {
    setSelectedNode(node)
    
    // 切换节点展开状态
    if (node.children.length > 0) {
      node.expanded = !node.expanded
      setMindMapData((prev) => prev ? { ...prev } : null)
    }

    // 播放节点语音
    if (voiceSettings.autoPlay) {
      playNodeNarration(node)
    }
  }

  const playNodeNarration = (node: MindMapNode) => {
    if (!speechSynthesis.current) return

    // 停止当前播放
    speechSynthesis.current.cancel()

    const utterance = new SpeechSynthesisUtterance(node.content)
    utterance.lang = voiceSettings.voice
    utterance.rate = voiceSettings.speed
    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)

    currentUtterance.current = utterance
    speechSynthesis.current.speak(utterance)
  }

  const handlePlayPause = () => {
    if (!speechSynthesis.current) return

    if (isPlaying) {
      speechSynthesis.current.cancel()
      setIsPlaying(false)
    } else if (selectedNode) {
      playNodeNarration(selectedNode)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setZoomLevel(1)
    if (mindMapData) {
      setSelectedNode(mindMapData.rootNode)
    }
  }

  const handleDownload = () => {
    if (!svgRef.current) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    const downloadLink = document.createElement("a")
    downloadLink.href = svgUrl
    downloadLink.download = `${query}_mindmap.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(svgUrl)
  }

  const handleShare = async () => {
    const shareData = {
      title: `${query} - 思维导图`,
      text: `查看关于"${query}"的AI生成思维导图`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert("链接已复制到剪贴板")
      }
    } catch (error) {
      console.error("分享失败:", error)
    }
  }

  const renderMindMapNode = (node: MindMapNode, parentNode?: MindMapNode) => {
    const isSelected = selectedNode?.id === node.id
    const nodeRadius = node.level === 0 ? 60 : node.level === 1 ? 45 : 35
    const fontSize = node.level === 0 ? 14 : node.level === 1 ? 12 : 10

    return (
      <g key={node.id}>
        {/* 连接线 */}
        {parentNode && (
          <line
            x1={parentNode.position.x}
            y1={parentNode.position.y}
            x2={node.position.x}
            y2={node.position.y}
            stroke="#E5E7EB"
            strokeWidth="2"
            opacity={node.expanded ? 1 : 0.3}
          />
        )}

        {/* 节点圆圈 */}
        <circle
          cx={node.position.x}
          cy={node.position.y}
          r={nodeRadius}
          fill={node.color}
          stroke={isSelected ? "#1F2937" : "white"}
          strokeWidth={isSelected ? 3 : 2}
          opacity={node.expanded ? 1 : 0.7}
          className="cursor-pointer transition-all duration-200 hover:opacity-80"
          onClick={() => handleNodeClick(node)}
        />

        {/* 节点文字 */}
        <text
          x={node.position.x}
          y={node.position.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={fontSize}
          fontWeight="bold"
          className="cursor-pointer select-none"
          onClick={() => handleNodeClick(node)}
        >
          {node.title.length > 8 ? node.title.slice(0, 8) + "..." : node.title}
        </text>

        {/* 置信度指示器 */}
        <circle
          cx={node.position.x + nodeRadius - 8}
          cy={node.position.y - nodeRadius + 8}
          r="6"
          fill={node.confidence > 0.9 ? "#10B981" : node.confidence > 0.8 ? "#F59E0B" : "#EF4444"}
          opacity="0.8"
        />

        {/* 来源指示器 */}
        {node.sourceId && (
          <circle
            cx={node.position.x - nodeRadius + 8}
            cy={node.position.y - nodeRadius + 8}
            r="6"
            fill="#3B82F6"
            opacity="0.8"
          />
        )}

        {/* 展开/收起指示器 */}
        {node.children.length > 0 && (
          <circle
            cx={node.position.x}
            cy={node.position.y + nodeRadius + 15}
            r="8"
            fill="#6B7280"
            className="cursor-pointer"
            onClick={() => handleNodeClick(node)}
          />
        )}

        {/* 递归渲染子节点 */}
        {node.expanded &&
          node.children.map((child) => renderMindMapNode(child, node))}
      </g>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg mb-2">AI正在生成思维导图...</p>
          <p className="text-gray-500 text-sm">分析知识结构，构建思维网络</p>
        </div>
      </div>
    )
  }

  if (!mindMapData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">生成思维导图失败</p>
          <Button onClick={() => router.back()}>返回</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部工具栏 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">{mindMapData.title}</h1>
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                置信度 {Math.round(mindMapData.metadata.confidence * 100)}%
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              {/* 语音控制 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="text-gray-600 hover:text-purple-600"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              {/* 缩放控制 */}
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-5 h-5" />
              </Button>
              <span className="text-sm text-gray-600 min-w-[3rem] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-5 h-5" />
              </Button>

              {/* 重置 */}
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="w-5 h-5" />
              </Button>

              {/* 下载 */}
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="w-5 h-5" />
              </Button>

              {/* 分享 */}
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* 思维导图主区域 */}
        <div className="flex-1 relative overflow-hidden bg-white">
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            style={{ transform: `scale(${zoomLevel})` }}
            className="transition-transform duration-200"
          >
            {mindMapData && renderMindMapNode(mindMapData.rootNode)}
          </svg>

          {/* 图例 */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
            <h3 className="font-semibold text-gray-900 mb-3">图例说明</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>高置信度 (90%+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>中等置信度 (80-90%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>低置信度 (<80%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>有来源支持</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <Tabs defaultValue="details" className="h-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
              <TabsTrigger value="details\" className=\"flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>节点详情</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>设置</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="p-4 space-y-4">
              {selectedNode && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedNode.title}
                    </h3>
                    <Badge variant="outline" className="mb-3">
                      层级 {selectedNode.level + 1}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">详细内容</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {selectedNode.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">置信度</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                          style={{ width: `${selectedNode.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.round(selectedNode.confidence * 100)}%
                      </span>
                    </div>
                  </div>

                  {selectedNode.sourceId && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Link className="w-4 h-4 mr-1" />
                        参考来源
                      </h4>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          来源ID: {selectedNode.sourceId}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 p-0 h-auto mt-1"
                        >
                          查看原文 ↗
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedNode.children.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">子节点</h4>
                      <div className="space-y-2">
                        {selectedNode.children.map((child) => (
                          <div
                            key={child.id}
                            className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                            onClick={() => setSelectedNode(child)}
                          >
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: child.color }}
                              ></div>
                              <span className="text-sm font-medium">{child.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => selectedNode && playNodeNarration(selectedNode)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      disabled={isPlaying}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      {isPlaying ? "播放中..." : "听讲解"}
                    </Button>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="settings" className="p-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">语音设置</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      语速
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voiceSettings.speed}
                      onChange={(e) =>
                        setVoiceSettings((prev) => ({
                          ...prev,
                          speed: Number.parseFloat(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>慢</span>
                      <span>标准</span>
                      <span>快</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      语言
                    </label>
                    <select
                      value={voiceSettings.voice}
                      onChange={(e) =>
                        setVoiceSettings((prev) => ({ ...prev, voice: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="zh-CN">中文</option>
                      <option value="en-US">英文</option>
                      <option value="ja-JP">日文</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="autoPlay"
                      checked={voiceSettings.autoPlay}
                      onChange={(e) =>
                        setVoiceSettings((prev) => ({ ...prev, autoPlay: e.target.checked }))
                      }
                      className="rounded"
                    />
                    <label htmlFor="autoPlay" className="text-sm text-gray-700">
                      点击节点时自动播放
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">显示设置</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      主题
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value as MindMapData["theme"])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="default">默认</option>
                      <option value="dark">深色</option>
                      <option value="colorful">彩色</option>
                      <option value="minimal">简约</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="showSources"
                      checked={showSources}
                      onChange={(e) => setShowSources(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="showSources" className="text-sm text-gray-700">
                      显示来源指示器
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">统计信息</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">总节点数</span>
                    <span className="font-medium">{mindMapData.metadata.totalNodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">最大深度</span>
                    <span className="font-medium">{mindMapData.metadata.maxDepth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">生成时间</span>
                    <span className="font-medium">
                      {new Date(mindMapData.metadata.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )\
}
