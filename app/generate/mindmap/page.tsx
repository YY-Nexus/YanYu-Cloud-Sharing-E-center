"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Download, Share2, Plus, Minus } from "lucide-react"
import { MindMapManager, type MindMapData } from "@/lib/mindmap"

export default function GenerateMindMapPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const question = searchParams.get("q") || ""

  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null)
  const [isGenerating, setIsGenerating] = useState(true)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState("")

  useEffect(() => {
    if (question) {
      generateMindMap(question)
    }
  }, [question])

  const generateMindMap = async (query: string) => {
    setIsGenerating(true)

    // 模拟AI生成思维导图内容
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const sampleContent = `
主要概念
  核心要点
    详细说明1
    详细说明2
  相关理论
    理论A
    理论B
应用场景
  实际应用1
  实际应用2
  案例研究
扩展思考
  深入分析
  未来发展
  相关问题
    `

    const mindMap = MindMapManager.createMindMap(query, sampleContent)
    setMindMapData(mindMap)
    setIsGenerating(false)
  }

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId)
    const node = mindMapData?.nodes.find((n) => n.id === nodeId)
    if (node) {
      setEditText(node.text)
    }
  }

  const handleNodeDoubleClick = (nodeId: string) => {
    setSelectedNode(nodeId)
    setIsEditing(true)
    const node = mindMapData?.nodes.find((n) => n.id === nodeId)
    if (node) {
      setEditText(node.text)
    }
  }

  const handleSaveEdit = () => {
    if (mindMapData && selectedNode && editText.trim()) {
      const updatedNodes = mindMapData.nodes.map((node) =>
        node.id === selectedNode ? { ...node, text: editText.trim() } : node,
      )

      const updatedMindMap = { ...mindMapData, nodes: updatedNodes }
      setMindMapData(updatedMindMap)
      MindMapManager.saveMindMap(updatedMindMap)
    }

    setIsEditing(false)
    setSelectedNode(null)
    setEditText("")
  }

  const handleAddChildNode = () => {
    if (mindMapData && selectedNode) {
      MindMapManager.addChildNode(mindMapData.id, selectedNode, "新节点")
      const updatedMindMap = MindMapManager.getMindMapById(mindMapData.id)
      if (updatedMindMap) {
        setMindMapData(updatedMindMap)
      }
    }
  }

  const handleExport = () => {
    if (mindMapData) {
      const exportData = MindMapManager.exportMindMap(mindMapData.id)
      const blob = new Blob([exportData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `mindmap_${mindMapData.title}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleShare = async () => {
    if (navigator.share && mindMapData) {
      try {
        await navigator.share({
          title: `思维导图: ${mindMapData.title}`,
          text: `查看我创建的思维导图: ${mindMapData.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("分享失败:", error)
      }
    }
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">正在生成思维导图</h2>
          <p className="text-gray-600">AI正在分析您的问题并构建知识结构...</p>
        </div>
      </div>
    )
  }

  if (!mindMapData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">生成失败</h2>
          <p className="text-gray-600 mb-4">无法生成思维导图，请重试</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            返回
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部工具栏 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{mindMapData.title}</h1>
                <p className="text-sm text-gray-600">思维导图</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedNode && (
                <button
                  onClick={handleAddChildNode}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="w-4 h-4" />
                  添加子节点
                </button>
              )}

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                导出
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Share2 className="w-4 h-4" />
                分享
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 思维导图画布 */}
      <div className="relative w-full h-screen overflow-hidden">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle, #f8fafc 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        >
          {/* 渲染连接线 */}
          {mindMapData.connections.map((connection, index) => {
            const fromNode = mindMapData.nodes.find((n) => n.id === connection.from)
            const toNode = mindMapData.nodes.find((n) => n.id === connection.to)

            if (!fromNode || !toNode) return null

            return (
              <line
                key={index}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray={fromNode.isExpanded ? "none" : "5,5"}
              />
            )
          })}
        </svg>

        {/* 渲染节点 */}
        {mindMapData.nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
              selectedNode === node.id ? "scale-110 z-10" : "hover:scale-105"
            }`}
            style={{
              left: node.x,
              top: node.y,
            }}
            onClick={() => handleNodeClick(node.id)}
            onDoubleClick={() => handleNodeDoubleClick(node.id)}
          >
            <div
              className={`px-4 py-2 rounded-lg shadow-md border-2 min-w-[120px] text-center ${
                selectedNode === node.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              style={{ backgroundColor: node.color + "20", borderColor: node.color }}
            >
              <div className="font-medium text-sm" style={{ color: node.color }}>
                {node.text}
              </div>

              {node.children.length > 0 && (
                <div className="mt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      MindMapManager.toggleNodeExpansion(mindMapData.id, node.id)
                      const updatedMindMap = MindMapManager.getMindMapById(mindMapData.id)
                      if (updatedMindMap) {
                        setMindMapData(updatedMindMap)
                      }
                    }}
                    className="w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    {node.isExpanded ? <Minus className="w-2 h-2" /> : <Plus className="w-2 h-2" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 编辑对话框 */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">编辑节点</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="输入节点文本"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setIsEditing(false)
                  setSelectedNode(null)
                  setEditText("")
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                取消
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
