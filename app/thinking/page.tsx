"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Brain, Lightbulb, Search, Zap, CheckCircle, ArrowRight } from "lucide-react"

export default function ThinkingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const question = searchParams.get("q") || ""

  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // 思考步骤
  const thinkingSteps = [
    {
      id: 1,
      title: "理解问题",
      description: "分析您的问题，识别关键信息和意图",
      icon: Brain,
      duration: 1000,
    },
    {
      id: 2,
      title: "知识检索",
      description: "搜索相关知识库和信息源",
      icon: Search,
      duration: 1500,
    },
    {
      id: 3,
      title: "智能分析",
      description: "运用AI算法分析和处理信息",
      icon: Zap,
      duration: 2000,
    },
    {
      id: 4,
      title: "生成回答",
      description: "整合信息，生成个性化的详细回答",
      icon: Lightbulb,
      duration: 1500,
    },
  ]

  useEffect(() => {
    if (!question) {
      router.push("/")
      return
    }

    let stepIndex = 0
    let progressValue = 0

    const processSteps = () => {
      if (stepIndex < thinkingSteps.length) {
        setCurrentStep(stepIndex)

        // 模拟步骤进度
        const stepDuration = thinkingSteps[stepIndex].duration
        const progressInterval = setInterval(() => {
          progressValue += 2
          setProgress(progressValue)

          if (progressValue >= (stepIndex + 1) * 25) {
            clearInterval(progressInterval)
            stepIndex++
            setTimeout(processSteps, 300)
          }
        }, stepDuration / 12.5) // 每步25%进度，分12.5次更新
      } else {
        // 所有步骤完成
        setIsComplete(true)
        setTimeout(() => {
          router.push(`/results?q=${encodeURIComponent(question)}`)
        }, 1000)
      }
    }

    // 开始处理
    setTimeout(processSteps, 500)
  }, [question, router])

  if (!question) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 主标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Brain className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">AI正在思考中...</h1>
          <p className="text-gray-600 text-lg">为您的问题寻找最佳答案</p>
        </div>

        {/* 问题显示 */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">您的问题</h2>
          <p className="text-gray-700 leading-relaxed">{question}</p>
        </div>

        {/* 进度条 */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">处理进度</span>
            <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 思考步骤 */}
        <div className="space-y-4">
          {thinkingSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isCompleted = index < currentStep || isComplete
            const isCurrent = index === currentStep && !isComplete

            return (
              <div
                key={step.id}
                className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-500 ${
                  isActive ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                          ? "bg-blue-500 text-white animate-pulse"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className={`w-6 h-6 ${isCurrent ? "animate-bounce" : ""}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold transition-colors duration-300 ${
                        isCompleted ? "text-green-600" : isCurrent ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isCompleted || isCurrent ? "text-gray-700" : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                  {isCompleted && (
                    <div className="ml-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </div>
                  )}
                  {isCurrent && (
                    <div className="ml-4">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                            style={{
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: "1s",
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* 完成状态 */}
        {isComplete && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">思考完成！</h3>
            <p className="text-green-700 mb-4">正在为您展示详细答案...</p>
            <div className="flex items-center justify-center text-green-600">
              <span className="mr-2">跳转中</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        )}

        {/* 底部提示 */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">AI正在运用先进算法为您分析问题，请稍候...</p>
        </div>
      </div>
    </div>
  )
}
