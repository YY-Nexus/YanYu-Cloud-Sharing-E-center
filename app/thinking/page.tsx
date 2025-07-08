"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Brain, Sparkles, CheckCircle, Clock } from "lucide-react"

export default function ThinkingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const question = searchParams.get("q") || ""

  const thinkingSteps = [
    { text: "正在理解您的问题...", duration: 1500 },
    { text: "搜索相关知识库...", duration: 2000 },
    { text: "分析最佳答案...", duration: 1800 },
    { text: "整理回答内容...", duration: 1200 },
    { text: "准备完整回复...", duration: 1000 },
  ]

  useEffect(() => {
    if (!question) {
      router.push("/")
      return
    }

    let timeoutId: NodeJS.Timeout

    const processSteps = () => {
      if (currentStep < thinkingSteps.length) {
        timeoutId = setTimeout(() => {
          setCurrentStep((prev) => prev + 1)
        }, thinkingSteps[currentStep].duration)
      } else {
        setIsComplete(true)
        // 跳转到结果页面
        setTimeout(() => {
          router.push(`/results?q=${encodeURIComponent(question)}`)
        }, 1000)
      }
    }

    processSteps()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [currentStep, question, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="返回首页"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">AI思考中...</h1>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* AI思考动画 */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-12 h-12 text-white animate-pulse" />
              </div>
              {/* 思考波纹效果 */}
              <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping opacity-20"></div>
              <div className="absolute inset-2 rounded-full border-4 border-purple-300 animate-ping opacity-30 animation-delay-200"></div>
            </div>
          </div>

          {/* 问题显示 */}
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">您的问题</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{question}</p>
          </div>

          {/* 思考步骤 */}
          <div className="space-y-4">
            {thinkingSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                  index < currentStep
                    ? "bg-green-50 border border-green-200"
                    : index === currentStep
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex-shrink-0">
                  {index < currentStep ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : index === currentStep ? (
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Clock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <span
                  className={`text-lg ${
                    index < currentStep
                      ? "text-green-700 font-medium"
                      : index === currentStep
                        ? "text-blue-700 font-medium"
                        : "text-gray-500"
                  }`}
                >
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* 完成状态 */}
          {isComplete && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="w-8 h-8 text-green-500" />
                <span className="text-xl font-semibold text-green-700">思考完成！</span>
              </div>
              <p className="text-green-600">正在为您准备详细回答...</p>
            </div>
          )}

          {/* 进度条 */}
          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep + (isComplete ? 1 : 0)) / (thinkingSteps.length + 1)) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {isComplete ? "100%" : `${Math.round((currentStep / thinkingSteps.length) * 100)}%`} 完成
            </p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  )
}
