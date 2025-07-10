"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share2, Settings, Play, Pause, VolumeX, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface MindMapNode {
  id: string
  text: string
  x: number
  y: number
  level: number
  children: MindMapNode[]
  parent?: string
  color: string
  expanded: boolean
}

interface MindMapData {
  title: string
  nodes: MindMapNode[]
  connections: Array<{ from: string; to: string }>
}

export default function MindMapPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""

  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentNode, setCurrentNode] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedTheme, setSelectedTheme] = useState("default")
  const [showSettings, setShowSettings] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [playSpeed, setPlaySpeed] = useState(2000)

  const svgRef = useRef<SVGSVGElement>(null)
  const speechSynthesis = useRef<SpeechSynthesis | null>(null)
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const themes = {
    default: {
      background: "#ffffff",
      primary: "#3b82f6",
      secondary: "#10b981",
      accent: "#f59e0b",
      text: "#1f2937",
    },
    dark: {
      background: "#1f2937",
      primary: "#60a5fa",
      secondary: "#34d399",
      accent: "#fbbf24",
      text: "#f9fafb",
    },
    nature: {
      background: "#f0fdf4",
      primary: "#16a34a",
      secondary: "#059669",
      accent: "#ca8a04",
      text: "#14532d",
    },
    ocean: {
      background: "#f0f9ff",
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      accent: "#8b5cf6",
      text: "#0c4a6e",
    },
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthesis.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    generateMindMap()
  }, [query])

  useEffect(() => {
    if (autoPlay && mindMapData) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return () => stopAutoPlay()
  }, [autoPlay, mindMapData, playSpeed])

  const generateMindMap = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockData: MindMapData = {
        title: query || "知识图谱",
        nodes: [
          {
            id: "root",
            text: query || "主题",
            x: 400,
            y: 300,
            level: 0,
            children: [],
            color: themes[selectedTheme as keyof typeof themes].primary,
            expanded: true,
          },
          {
            id: "concept1",
            text: "基本概念",
            x: 200,
            y: 200,
            level: 1,
            children: [],
            parent: "root",
            color: themes[selectedTheme as keyof typeof themes].secondary,
            expanded: true,
          },
          {
            id: "concept2",
            text: "应用场景",
            x: 600,
            y: 200,
            level: 1,
            children: [],
            parent: "root",
            color: themes[selectedTheme as keyof typeof themes].secondary,
            expanded: true,
          },
          {
            id: "concept3",
            text: "技术原理",
            x: 200,
            y: 400,
            level: 1,
            children: [],
            parent: "root",
            color: themes[selectedTheme as keyof typeof themes].secondary,
            expanded: true,
          },
          {
            id: "concept4",
            text: "发展趋势",
            x: 600,
            y: 400,
            level: 1,
            children: [],
            parent: "root",
            color: themes[selectedTheme as keyof typeof themes].secondary,
            expanded: true,
          },
          {
            id: "detail1",
            text: "定义与特征",
            x: 100,
            y: 150,
            level: 2,
            children: [],
            parent: "concept1",
            color: themes[selectedTheme as keyof typeof themes].accent,
            expanded: false,
          },
          {
            id: "detail2",
            text: "核心要素",
            x: 100,
            y: 250,
            level: 2,
            children: [],
            parent: "concept1",
            color: themes[selectedTheme as keyof typeof themes].accent,
            expanded: false,
          },
          {
            id: "detail3",
            text: "实际案例",
            x: 700,
            y: 150,
            level: 2,
            children: [],
            parent: "concept2",
            color: themes[selectedTheme as keyof typeof themes].accent,
            expanded: false,
          },
          {
            id: "detail4",
            text: "行业应用",
            x: 700,
            y: 250,
            level: 2,
            children: [],
            parent: "concept2",
            color: themes[selectedTheme as keyof typeof themes].accent,
            expanded: false,
          },
        ],
        connections: [
          { from: "root", to: "concept1" },
          { from: "root", to: "concept2" },
          { from: "root", to: "concept3" },
          { from: "root", to: "concept4" },
          { from: "concept1", to: "detail1" },
          { from: "concept1", to: "detail2" },
          { from: "concept2", to: "detail3" },
          { from: "concept2", to: "detail4" },
        ],
      }

      setMindMapData(mockData)
    } catch (error) {
      console.error("生成思维导图失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNodeClick = (nodeId: string) => {
    if (!mindMapData) return

    setCurrentNode(nodeId)
    const node = mindMapData.nodes.find((n) => n.id === nodeId)
    if (node && speechSynthesis.current) {
      const utterance = new SpeechSynthesisUtterance(node.text)
      utterance.lang = "zh-CN"
      speechSynthesis.current.speak(utterance)
    }

    const updatedNodes = mindMapData.nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded }
      }
      return node
    })

    setMindMapData({ ...mindMapData, nodes: updatedNodes })
  }

  const startAutoPlay = () => {
    if (!mindMapData) return

    let currentIndex = 0
    const nodes = mindMapData.nodes

    playIntervalRef.current = setInterval(() => {
      if (currentIndex < nodes.length) {
        setCurrentNode(nodes[currentIndex].id)
        if (speechSynthesis.current) {
          const utterance = new SpeechSynthesisUtterance(nodes[currentIndex].text)
          utterance.lang = "zh-CN"
          speechSynthesis.current.speak(utterance)
        }
        currentIndex++
      } else {
        setAutoPlay(false)
        setCurrentNode(null)
      }
    }, playSpeed)
  }

  const stopAutoPlay = () => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current)
      playIntervalRef.current = null
    }
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel()
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.3))
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setCurrentNode(null)
  }

  const handleDownload = () => {
    if (!svgRef.current) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    canvas.width = 1200
    canvas.height = 800

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = themes[selectedTheme as keyof typeof themes].background
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)

        const link = document.createElement("a")
        link.download = `mindmap-${Date.now()}.png`
        link.href = canvas.toDataURL()
        link.click()
      }
    }

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
  }

  const handleShare = async () => {
    const shareData = {
      title: `思维导图: ${mindMapData?.title}`,
      text: `查看这个关于"${query}"的思维导图`,
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

  const renderConnections = () => {
    if (!mindMapData) return null

    return mindMapData.connections.map((conn, index) => {
      const fromNode = mindMapData.nodes.find((n) => n.id === conn.from)
      const toNode = mindMapData.nodes.find((n) => n.id === conn.to)

      if (!fromNode || !toNode || !toNode.expanded) return null

      return (
        <line
          key={index}
          x1={fromNode.x}
          y1={fromNode.y}
          x2={toNode.x}
          y2={toNode.y}
          stroke={themes[selectedTheme as keyof typeof themes].primary}
          strokeWidth="2"
          opacity="0.6"
        />
      )
    })
  }

  const renderNodes = () => {
    if (!mindMapData) return null

    return mindMapData.nodes.map((node) => {
      if (node.level > 1 && node.parent) {
        const parentNode = mindMapData.nodes.find((n) => n.id === node.parent)
        if (!parentNode?.expanded) return null
      }

      const isActive = currentNode === node.id
      const radius = node.level === 0 ? 60 : node.level === 1 ? 45 : 35

      return (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r={radius}
            fill={node.color}
            stroke={isActive ? "#ff6b6b" : "transparent"}
            strokeWidth={isActive ? "4" : "0"}
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
            onClick={() => handleNodeClick(node.id)}
          />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={node.level === 0 ? "16" : node.level === 1 ? "14" : "12"}
            fontWeight="bold"
            className="cursor-pointer select-none"
            onClick={() => handleNodeClick(node.id)}
          >
            {node.text.length > 8 ? node.text.substring(0, 8) + "..." : node.text}
          </text>
          {node.children.length > 0 && (
            <circle
              cx={node.x + radius - 10}
              cy={node.y - radius + 10}
              r="8"
              fill={node.expanded ? "#10b981" : "#6b7280"}
              className="cursor-pointer"
              onClick={() => handleNodeClick(node.id)}
            />
          )}
        </g>
      )
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg mb-2">正在生成思维导图...</p>
          <p className="text-gray-500 text-sm">分析内容结构中，请稍候</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">思维导图: {mindMapData?.title}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAutoPlay(!autoPlay)}
              className={autoPlay ? "text-red-600" : "text-green-600"}
            >
              {autoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={() => speechSynthesis.current?.cancel()}>
              <VolumeX className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Badge variant="outline" className="px-3 py-1">
              {Math.round(zoom * 100)}%
            </Badge>
          </div>

          <div
            className="w-full h-full overflow-auto"
            style={{
              background: themes[selectedTheme as keyof typeof themes].background,
              cursor: "grab",
            }}
          >
            <svg
              ref={svgRef}
              width="1200"
              height="800"
              style={{
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: "center center",
              }}
              className="transition-transform duration-200"
            >
              {renderConnections()}
              {renderNodes()}
            </svg>
          </div>
        </div>

        {showSettings && (
          <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">设置</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">主题</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(themes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedTheme(key)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTheme === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex space-x-1 mb-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.primary }} />
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.secondary }} />
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.accent }} />
                      </div>
                      <span className="text-xs font-medium capitalize">{key}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">自动播放速度 (毫秒)</label>
                <Input
                  type="number"
                  value={playSpeed}
                  onChange={(e) => setPlaySpeed(Number(e.target.value))}
                  min="1000"
                  max="10000"
                  step="500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">当前节点</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {currentNode ? (
                    <div>
                      <p className="font-medium">{mindMapData?.nodes.find((n) => n.id === currentNode)?.text}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        级别: {mindMapData?.nodes.find((n) => n.id === currentNode)?.level}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">未选择节点</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">操作指南</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• 点击节点查看详情</p>
                  <p>• 使用缩放控制调整视图</p>
                  <p>• 启用自动播放浏览全图</p>
                  <p>• 选择不同主题改变外观</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
