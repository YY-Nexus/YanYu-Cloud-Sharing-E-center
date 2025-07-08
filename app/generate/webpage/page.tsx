"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { WebpageGenerator, type WebpageTemplate, type WebpageConfig } from "@/lib/webpage-generator"

export default function GenerateWebpagePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [templates, setTemplates] = useState<WebpageTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)

  const [config, setConfig] = useState<WebpageConfig>({
    template: "",
    title: "",
    description: "",
    style: "modern",
    colorScheme: "blue",
    layout: "single",
    features: [],
    content: {},
  })

  useEffect(() => {
    setTemplates(WebpageGenerator.getTemplates())
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    setConfig((prev) => ({ ...prev, template: templateId }))
  }

  const handleConfigChange = (field: keyof WebpageConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const handleContentChange = (section: string, field: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: {
          ...prev.content[section as keyof typeof prev.content],
          [field]: value,
        },
      },
    }))
  }

  const handleGenerate = async () => {
    if (!config.title.trim()) return

    setIsGenerating(true)

    try {
      const webpage = await WebpageGenerator.generateWebpage(config)
      WebpageGenerator.saveWebpage(webpage)

      setTimeout(() => {
        router.push(`/interactive-webpage?id=${webpage.id}`)
      }, 2000)
    } catch (error) {
      console.error("生成网页失败:", error)
      setIsGenerating(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">选择网页模板</h2>
        <p className="text-gray-600">从预设模板开始，快速创建专业网页</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
              <span className="text-gray-400 text-sm">模板预览</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{template.description}</p>
            <div className="flex flex-wrap gap-1">
              {template.features.map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setStep(2)}
          disabled={!selectedTemplate}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一步
        </button>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">基础设置</h2>
        <p className="text-gray-600">配置网页的基本信息和样式</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">网站标题</label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => handleConfigChange("title", e.target.value)}
            placeholder="输入网站标题"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">网站描述</label>
          <input
            type="text"
            value={config.description}
            onChange={(e) => handleConfigChange("description", e.target.value)}
            placeholder="简短描述网站内容"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">设计风格</label>
          <select
            value={config.style}
            onChange={(e) => handleConfigChange("style", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="modern">现代简约</option>
            <option value="classic">经典商务</option>
            <option value="creative">创意时尚</option>
            <option value="minimal">极简主义</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">配色方案</label>
          <div className="grid grid-cols-5 gap-2">
            {[
              { value: "blue", color: "#3B82F6", name: "蓝色" },
              { value: "purple", color: "#7C3AED", name: "紫色" },
              { value: "green", color: "#10B981", name: "绿色" },
              { value: "orange", color: "#F59E0B", name: "橙色" },
              { value: "dark", color: "#1F2937", name: "深色" },
            ].map((scheme) => (
              <div
                key={scheme.value}
                onClick={() => handleConfigChange("colorScheme", scheme.value)}
                className={`w-12 h-12 rounded-md cursor-pointer border-2 ${
                  config.colorScheme === scheme.value ? "border-gray-800" : "border-gray-200"
                }`}
                style={{ backgroundColor: scheme.color }}
                title={scheme.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setStep(1)} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
          上一步
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!config.title.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一步
        </button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">内容配置</h2>
        <p className="text-gray-600">设置网页的具体内容</p>
      </div>

      <div className="space-y-8">
        {/* 首页横幅 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">首页横幅</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">主标题</label>
              <input
                type="text"
                value={config.content.hero?.title || ""}
                onChange={(e) => handleContentChange("hero", "title", e.target.value)}
                placeholder="欢迎来到我们的网站"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">副标题</label>
              <input
                type="text"
                value={config.content.hero?.subtitle || ""}
                onChange={(e) => handleContentChange("hero", "subtitle", e.target.value)}
                placeholder="提供优质的产品和服务"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">按钮文字</label>
              <input
                type="text"
                value={config.content.hero?.buttonText || ""}
                onChange={(e) => handleContentChange("hero", "buttonText", e.target.value)}
                placeholder="立即开始"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 关于我们 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">关于我们</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
              <input
                type="text"
                value={config.content.about?.title || ""}
                onChange={(e) => handleContentChange("about", "title", e.target.value)}
                placeholder="关于我们"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
              <textarea
                value={config.content.about?.content || ""}
                onChange={(e) => handleContentChange("about", "content", e.target.value)}
                placeholder="介绍您的公司、团队或个人背景..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* 联系信息 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">联系信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
              <input
                type="email"
                value={config.content.contact?.email || ""}
                onChange={(e) => handleContentChange("contact", "email", e.target.value)}
                placeholder="contact@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">电话</label>
              <input
                type="tel"
                value={config.content.contact?.phone || ""}
                onChange={(e) => handleContentChange("contact", "phone", e.target.value)}
                placeholder="400-123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">地址</label>
              <input
                type="text"
                value={config.content.contact?.address || ""}
                onChange={(e) => handleContentChange("contact", "address", e.target.value)}
                placeholder="北京市朝阳区..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setStep(2)} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
          上一步
        </button>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              生成中...
            </div>
          ) : (
            "生成网页"
          )}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI网页生成器</h1>
          <p className="text-gray-600">三步创建专业网页，无需编程知识</p>
        </div>

        {/* 步骤指示器 */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  )
}
