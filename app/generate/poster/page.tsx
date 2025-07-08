"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function GeneratePosterPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("modern")
  const [size, setSize] = useState("A4")
  const [theme, setTheme] = useState("business")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // 模拟生成过程
    setTimeout(() => {
      const params = new URLSearchParams({
        prompt: prompt,
        style: style,
        size: size,
        theme: theme,
      })
      router.push(`/poster-result?${params.toString()}`)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI海报生成器</h1>
          <p className="text-gray-600">描述您的海报需求，AI将为您创建专业的设计作品</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* 海报描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">海报内容描述</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：为科技公司设计一张产品发布会海报，主题是人工智能，需要体现创新和未来感..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            {/* 主题选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">海报主题</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "business", label: "商务专业", desc: "企业宣传" },
                  { value: "creative", label: "创意艺术", desc: "设计感强" },
                  { value: "event", label: "活动宣传", desc: "节日庆典" },
                  { value: "product", label: "产品展示", desc: "商品推广" },
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      theme === option.value ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 设计风格 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">设计风格</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "modern", label: "现代简约" },
                  { value: "vintage", label: "复古经典" },
                  { value: "minimalist", label: "极简主义" },
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setStyle(option.value)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors text-center ${
                      style === option.value ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-sm">{option.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 尺寸选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">海报尺寸</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: "A4", label: "A4", desc: "210×297mm" },
                  { value: "A3", label: "A3", desc: "297×420mm" },
                  { value: "square", label: "方形", desc: "1:1比例" },
                  { value: "banner", label: "横幅", desc: "16:9比例" },
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setSize(option.value)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors text-center ${
                      size === option.value ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium text-sm">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  正在生成海报...
                </div>
              ) : (
                "生成海报"
              )}
            </button>
          </div>
        </div>

        {/* 设计提示 */}
        <div className="mt-6 bg-yellow-50 rounded-lg p-4">
          <h3 className="font-medium text-yellow-900 mb-2">🎨 设计建议</h3>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>• 明确说明海报的用途和目标受众</p>
            <p>• 提供具体的文字内容和重点信息</p>
            <p>• 描述期望的色彩搭配和视觉效果</p>
            <p>• 如有品牌要求，请详细说明品牌元素</p>
          </div>
        </div>
      </div>
    </div>
  )
}
