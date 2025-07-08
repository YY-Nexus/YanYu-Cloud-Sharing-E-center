"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PosterGenerator, type GeneratedPoster } from "@/lib/poster-generator"

export default function PosterResultPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [poster, setPoster] = useState<GeneratedPoster | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCode, setShowCode] = useState(false)
  const svgRef = useRef<HTMLDivElement>(null)

  const posterId = searchParams.get("id")

  useEffect(() => {
    if (posterId) {
      const posters = PosterGenerator.getPosters()
      const foundPoster = posters.find((p) => p.id === posterId)

      if (foundPoster) {
        setPoster(foundPoster)
      }
    } else {
      // 如果没有ID，从URL参数生成海报
      const params = Object.fromEntries(searchParams.entries())
      if (params.prompt) {
        generatePosterFromParams(params)
      }
    }

    setIsLoading(false)
  }, [posterId, searchParams])

  const generatePosterFromParams = async (params: any) => {
    try {
      const aiContent = await PosterGenerator.generateAIContent(params.prompt, params.theme || "business")

      const config = {
        template: params.template || "business-promo",
        title: params.title || aiContent.title,
        description: params.prompt,
        theme: params.theme || "business",
        style: params.style || "modern",
        colorScheme: params.colorScheme || "blue",
        size: params.size || "A4",
        elements: {},
        content: {
          mainText: aiContent.title,
          subText: aiContent.subtitle,
          callToAction: aiContent.callToAction,
          additionalInfo: [aiContent.mainText],
        },
        layout: "centered",
      }

      const generatedPoster = await PosterGenerator.generatePoster(config as any)
      PosterGenerator.savePoster(generatedPoster)
      setPoster(generatedPoster)
    } catch (error) {
      console.error("生成海报失败:", error)
    }
  }

  const handleDownloadSVG = () => {
    if (!poster) return

    const blob = new Blob([poster.svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${poster.config.title.replace(/\s+/g, "-").toLowerCase()}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadPNG = async () => {
    if (!poster || !svgRef.current) return

    try {
      const svgElement = svgRef.current.querySelector("svg")
      if (!svgElement) return

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = new Image()
      img.crossOrigin = "anonymous"

      const svgData = new XMLSerializer().serializeToString(svgElement)
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(svgBlob)

      img.onload = () => {
        canvas.width = img.width * 2 // 高分辨率
        canvas.height = img.height * 2
        ctx.scale(2, 2)
        ctx.drawImage(img, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = pngUrl
            a.download = `${poster.config.title.replace(/\s+/g, "-").toLowerCase()}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(pngUrl)
          }
        }, "image/png")

        URL.revokeObjectURL(url)
      }

      img.src = url
    } catch (error) {
      console.error("PNG导出失败:", error)
    }
  }

  const handleShare = async () => {
    if (!poster) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: poster.config.title,
          text: poster.config.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("分享失败:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("链接已复制到剪贴板")
    }
  }

  const handleEdit = () => {
    router.push(`/generate/poster?edit=${poster?.id}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">正在加载海报...</h2>
          <p className="text-gray-600 mt-2">请稍候</p>
        </div>
      </div>
    )
  }

  if (!poster) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">海报未找到</h2>
          <p className="text-gray-600 mb-4">请检查链接是否正确</p>
          <button
            onClick={() => router.push("/generate/poster")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            创建新海报
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* 工具栏 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
                ← 返回
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{poster.config.title}</h1>
                <p className="text-sm text-gray-600">{poster.config.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                {showCode ? "隐藏代码" : "查看SVG"}
              </button>
              <button
                onClick={handleEdit}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                编辑
              </button>
              <button
                onClick={handleShare}
                className="px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                分享
              </button>
              <button
                onClick={handleDownloadSVG}
                className="px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                下载SVG
              </button>
              <button
                onClick={handleDownloadPNG}
                className="px-3 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                下载PNG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* 海报预览 */}
        <div className={`${showCode ? "w-2/3" : "w-full"} transition-all duration-300`}>
          <div className="h-full p-8 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl max-h-full overflow-auto">
              <div ref={svgRef} dangerouslySetInnerHTML={{ __html: poster.svg }} />
            </div>
          </div>
        </div>

        {/* 代码查看器 */}
        {showCode && (
          <div className="w-1/3 bg-gray-900 text-white overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">SVG 代码</h3>
            </div>
            <div className="h-full overflow-auto p-4">
              <pre className="text-sm">
                <code>{poster.svg}</code>
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* 海报信息面板 */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <h4 className="font-semibold text-gray-900 mb-2">海报信息</h4>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">主题:</span> {poster.config.theme}
          </p>
          <p>
            <span className="font-medium">风格:</span> {poster.config.style}
          </p>
          <p>
            <span className="font-medium">配色:</span> {poster.config.colorScheme}
          </p>
          <p>
            <span className="font-medium">尺寸:</span> {poster.config.size}
          </p>
          <p>
            <span className="font-medium">创建时间:</span> {new Date(poster.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
