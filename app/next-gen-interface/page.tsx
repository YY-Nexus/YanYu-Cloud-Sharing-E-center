"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Brain, Eye, Zap, Sparkles, Heart, Target, Globe } from "lucide-react"
import { AdvancedAIEngine } from "@/lib/advanced-ai-engine"
import { CrossDeviceSyncManager } from "@/lib/cross-device-sync"
import { ARVRInterfaceManager } from "@/lib/ar-vr-interface"
import { EmotionAIEngine } from "@/lib/emotion-ai"
import { PredictiveInteractionEngine } from "@/lib/predictive-interaction"

interface NextGenState {
  // AI状态
  aiPersonality: "analytical" | "creative" | "supportive" | "adaptive"
  contextualMemory: any[]
  emotionalState: any
  predictiveInsights: any[]

  // 跨设备状态
  connectedDevices: any[]
  activeHandoffs: any[]
  collaborativeSessions: any[]

  // AR/VR状态
  spatialMode: "2d" | "ar" | "vr" | "mixed"
  spatialElements: any[]
  gestureRecognition: boolean

  // 情绪计算状态
  userEmotion: any
  moodInterface: any
  emotionalInterventions: any[]

  // 预测性交互状态
  predictedActions: any[]
  proactiveServices: any[]
  behaviorPatterns: any[]
}

export default function NextGenInterfacePage() {
  const router = useRouter()
  const [state, setState] = useState<NextGenState>({
    aiPersonality: "adaptive",
    contextualMemory: [],
    emotionalState: null,
    predictiveInsights: [],
    connectedDevices: [],
    activeHandoffs: [],
    collaborativeSessions: [],
    spatialMode: "2d",
    spatialElements: [],
    gestureRecognition: false,
    userEmotion: null,
    moodInterface: null,
    emotionalInterventions: [],
    predictedActions: [],
    proactiveServices: [],
    behaviorPatterns: [],
  })

  const [isInitializing, setIsInitializing] = useState(true)
  const [activeFeatures, setActiveFeatures] = useState<string[]>([])
  const [userInput, setUserInput] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // 初始化下一代界面
  useEffect(() => {
    initializeNextGenInterface()
  }, [])

  // 实时情绪监测
  useEffect(() => {
    if (activeFeatures.includes("emotion_ai")) {
      startEmotionMonitoring()
    }
  }, [activeFeatures])

  // 预测性交互
  useEffect(() => {
    if (activeFeatures.includes("predictive_interaction")) {
      startPredictiveInteraction()
    }
  }, [activeFeatures])

  const initializeNextGenInterface = async () => {
    try {
      setIsInitializing(true)

      // 初始化跨设备同步
      const syncManager = CrossDeviceSyncManager.getInstance()
      await syncManager.initialize("user-001", {
        name: "Next-Gen Interface",
        type: "desktop",
        capabilities: ["ai", "ar", "emotion", "prediction"],
      })

      // 检测AR/VR能力
      const arvrManager = ARVRInterfaceManager.getInstance()
      const capabilities = await arvrManager.detectCapabilities()

      // 启动摄像头用于情绪检测
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          })
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
          setActiveFeatures((prev) => [...prev, "emotion_ai"])
        } catch (error) {
          console.warn("摄像头访问失败:", error)
        }
      }

      // 启用预测性交互
      setActiveFeatures((prev) => [...prev, "predictive_interaction"])

      // 如果支持AR/VR，启用空间界面
      if (capabilities.hasAR || capabilities.hasVR) {
        setActiveFeatures((prev) => [...prev, "spatial_interface"])
      }

      // 启用高级AI
      setActiveFeatures((prev) => [...prev, "advanced_ai"])

      setIsInitializing(false)
    } catch (error) {
      console.error("下一代界面初始化失败:", error)
      setIsInitializing(false)
    }
  }

  const startEmotionMonitoring = async () => {
    const monitorEmotion = async () => {
      try {
        // 获取多模态情绪数据
        const emotionData = await EmotionAIEngine.analyzeRealTimeEmotion({
          text: userInput,
          behavioral: {
            clickPattern: [Date.now()],
            scrollSpeed: 100,
            dwellTime: 2000,
            errorRate: 0.1,
          },
        })

        setState((prev) => ({ ...prev, userEmotion: emotionData }))

        // 生成情绪适应性界面
        if (emotionData.primaryEmotion !== "neutral") {
          const moodInterface = await EmotionAIEngine.generateEmotionalInterface("user-001", {
            primary: emotionData.primaryEmotion,
            intensity: emotionData.intensity,
            valence: emotionData.valence,
            arousal: emotionData.arousal,
          })

          setState((prev) => ({ ...prev, moodInterface }))

          // 应用界面调整
          applyMoodInterface(moodInterface)
        }

        // 如果检测到负面情绪，启动干预
        if (emotionData.valence < -0.3) {
          const intervention = await EmotionAIEngine.performEmotionalIntervention("user-001", "calm", emotionData)

          setState((prev) => ({
            ...prev,
            emotionalInterventions: [...prev.emotionalInterventions, ...intervention.interventions],
          }))

          // 执行情绪干预
          executeEmotionalInterventions(intervention.interventions)
        }
      } catch (error) {
        console.error("情绪监测失败:", error)
      }
    }

    // 每5秒监测一次情绪
    const emotionInterval = setInterval(monitorEmotion, 5000)
    return () => clearInterval(emotionInterval)
  }

  const startPredictiveInteraction = async () => {
    const generatePredictions = async () => {
      try {
        const currentContext = {
          currentPage: "next-gen-interface",
          recentActions: ["initialize", "emotion_monitor"],
          timeOfDay: new Date().getHours(),
          dayOfWeek: new Date().getDay(),
          sessionDuration: Date.now() - performance.timing.navigationStart,
          deviceType: "desktop",
          emotionalState: state.userEmotion,
        }

        const predictions = await PredictiveInteractionEngine.predictUserIntent("user-001", currentContext)

        setState((prev) => ({
          ...prev,
          predictedActions: predictions.nextActions,
          proactiveServices: predictions.proactiveServices,
        }))

        // 执行高置信度的预测性行动
        const highConfidenceActions = predictions.nextActions.filter((action) => action.confidence > 0.8)

        for (const action of highConfidenceActions) {
          if (action.timing === "immediate") {
            await executePredictiveAction(action)
          }
        }
      } catch (error) {
        console.error("预测性交互失败:", error)
      }
    }

    // 每30秒生成一次预测
    const predictionInterval = setInterval(generatePredictions, 30000)
    return () => clearInterval(predictionInterval)
  }

  const handleAdvancedAIInteraction = async (input: string) => {
    if (!input.trim()) return

    setIsProcessing(true)
    setUserInput("")

    try {
      // 使用高级AI引擎生成回应
      const response = await AdvancedAIEngine.generateAdvancedResponse(input, "user-001", {
        emotionalState: state.userEmotion,
        recentInteractions: state.contextualMemory.slice(-5),
        currentTask: "next_gen_interface_exploration",
        environment: "desktop_browser",
      })

      setAiResponse(response.response)

      // 更新上下文记忆
      setState((prev) => ({
        ...prev,
        contextualMemory: [
          ...prev.contextualMemory,
          {
            type: "user_input",
            content: input,
            timestamp: Date.now(),
          },
          {
            type: "ai_response",
            content: response.response,
            timestamp: Date.now(),
            metadata: {
              emotionalTone: response.emotionalTone,
              predictiveInsights: response.predictiveInsights,
            },
          },
        ].slice(-20), // 保留最近20条记录
        predictiveInsights: response.predictiveInsights,
      }))

      // 执行建议的行动
      for (const action of response.suggestedActions) {
        await executeSuggestedAction(action)
      }
    } catch (error) {
      console.error("高级AI交互失败:", error)
      setAiResponse("抱歉，我遇到了一些技术问题。让我重新组织一下回答。")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeviceHandoff = async (targetDevice: string) => {
    try {
      const syncManager = CrossDeviceSyncManager.getInstance()
      const handoffResult = await syncManager.performHandoff("current-device", targetDevice, {
        currentPage: "next-gen-interface",
        userInput,
        aiResponse,
        emotionalState: state.userEmotion,
        contextualMemory: state.contextualMemory,
      })

      if (handoffResult.success) {
        setState((prev) => ({
          ...prev,
          activeHandoffs: [...prev.activeHandoffs, handoffResult],
        }))

        // 显示切换成功提示
        showNotification(`成功切换到${targetDevice}`, "success")
      } else {
        showNotification(`设备切换失败: ${handoffResult.error}`, "error")
      }
    } catch (error) {
      console.error("设备切换失败:", error)
      showNotification("设备切换失败", "error")
    }
  }

  const toggleSpatialMode = async () => {
    try {
      const arvrManager = ARVRInterfaceManager.getInstance()

      if (state.spatialMode === "2d") {
        // 切换到AR模式
        await arvrManager.initializeARVR("ar")
        setState((prev) => ({ ...prev, spatialMode: "ar" }))

        // 创建空间UI元素
        const welcomePanel = await arvrManager.createSpatialElement({
          type: "panel",
          content: {
            title: "欢迎来到空间界面",
            body: "您现在可以通过手势和语音与3D界面交互",
          },
          position: { x: 0, y: 1.5, z: -2 },
          interactive: true,
        })

        setState((prev) => ({
          ...prev,
          spatialElements: [...prev.spatialElements, welcomePanel],
        }))
      } else {
        // 切换回2D模式
        setState((prev) => ({ ...prev, spatialMode: "2d", spatialElements: [] }))
      }
    } catch (error) {
      console.error("空间模式切换失败:", error)
      showNotification("空间模式切换失败", "error")
    }
  }

  const applyMoodInterface = (moodInterface: any) => {
    if (!containerRef.current) return

    const container = containerRef.current

    // 应用色彩方案
    container.style.setProperty("--primary-color", moodInterface.colorScheme.primary)
    container.style.setProperty("--secondary-color", moodInterface.colorScheme.secondary)
    container.style.setProperty("--accent-color", moodInterface.colorScheme.accent)
    container.style.setProperty("--background-color", moodInterface.colorScheme.background)
    container.style.setProperty("--text-color", moodInterface.colorScheme.text)

    // 应用动画设置
    const animationSpeed = {
      slow: "2s",
      normal: "1s",
      fast: "0.5s",
    }[moodInterface.animations.speed]

    container.style.setProperty("--animation-duration", animationSpeed)

    // 应用布局调整
    if (moodInterface.layout.spacing === "spacious") {
      container.style.setProperty("--spacing-multiplier", "1.5")
    } else if (moodInterface.layout.spacing === "compact") {
      container.style.setProperty("--spacing-multiplier", "0.75")
    }
  }

  const executeEmotionalInterventions = async (interventions: any[]) => {
    for (const intervention of interventions) {
      switch (intervention.type) {
        case "color_therapy":
          await applyColorTherapy(intervention.config)
          break
        case "breathing_guide":
          await showBreathingGuide(intervention.config)
          break
        case "music_therapy":
          await playTherapeuticMusic(intervention.config)
          break
        case "content_adjustment":
          await adjustContentPresentation(intervention.config)
          break
        case "interaction_style":
          await adjustInteractionStyle(intervention.config)
          break
      }
    }
  }

  const executePredictiveAction = async (action: any) => {
    switch (action.type) {
      case "content_suggestion":
        await showContentSuggestion(action.action)
        break
      case "ui_adjustment":
        await adjustUI(action.action)
        break
      case "workflow_optimization":
        await optimizeWorkflow(action.action)
        break
      case "proactive_help":
        await showProactiveHelp(action.action)
        break
    }
  }

  const executeSuggestedAction = async (action: string) => {
    // 执行AI建议的行动
    console.log("执行建议行动:", action)
  }

  // 辅助方法实现
  const applyColorTherapy = async (config: any) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const colors = config.colors

    let colorIndex = 0
    const colorInterval = setInterval(() => {
      container.style.backgroundColor = colors[colorIndex % colors.length]
      colorIndex++
    }, config.duration / colors.length)

    setTimeout(() => {
      clearInterval(colorInterval)
      container.style.backgroundColor = ""
    }, config.duration)
  }

  const showBreathingGuide = async (config: any) => {
    // 显示呼吸指导界面
    const breathingGuide = document.createElement("div")
    breathingGuide.className = "breathing-guide"
    breathingGuide.innerHTML = `
      <div class="breathing-circle">
        <div class="breathing-text">跟随圆圈呼吸</div>
      </div>
    `

    document.body.appendChild(breathingGuide)

    // 3分钟后自动移除
    setTimeout(() => {
      document.body.removeChild(breathingGuide)
    }, 180000)
  }

  const playTherapeuticMusic = async (config: any) => {
    // 播放治疗性音乐
    try {
      const audio = new Audio("/therapeutic-music.mp3")
      audio.volume = config.volume
      audio.loop = true
      await audio.play()

      setTimeout(() => {
        audio.pause()
      }, config.duration)
    } catch (error) {
      console.warn("音乐播放失败:", error)
    }
  }

  const adjustContentPresentation = async (config: any) => {
    if (!containerRef.current) return

    const container = containerRef.current

    if (config.complexity === "reduced") {
      container.classList.add("simplified-content")
    }

    if (config.pace === "slower") {
      container.style.setProperty("--animation-duration", "3s")
    }

    if (config.supportLevel === "increased") {
      // 显示更多帮助提示
      showNotification("我在这里为您提供额外支持", "info")
    }
  }

  const adjustInteractionStyle = async (config: any) => {
    // 调整交互风格
    console.log("调整交互风格:", config)
  }

  const showContentSuggestion = async (suggestion: string) => {
    showNotification(`内容建议: ${suggestion}`, "info")
  }

  const adjustUI = async (adjustment: string) => {
    console.log("UI调整:", adjustment)
  }

  const optimizeWorkflow = async (optimization: string) => {
    console.log("工作流程优化:", optimization)
  }

  const showProactiveHelp = async (help: string) => {
    showNotification(`主动帮助: ${help}`, "help")
  }

  const showNotification = (message: string, type: "success" | "error" | "info" | "help") => {
    // 简化的通知实现
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
      document.body.removeChild(notification)
    }, 5000)
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">初始化下一代界面</h2>
          <p className="text-gray-300">正在启动AI、情绪计算、预测交互和空间界面...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      style={{
        backgroundColor: state.moodInterface?.colorScheme?.background || "",
        color: state.moodInterface?.colorScheme?.text || "",
      }}
    >
      {/* 隐藏的视频元素用于情绪检测 */}
      <video ref={videoRef} autoPlay muted className="hidden" onLoadedMetadata={() => console.log("摄像头已启动")} />

      {/* 顶部控制栏 */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-xl font-bold text-white">下一代智能界面</h1>
                <p className="text-sm text-gray-400">AI + 情绪计算 + 预测交互 + 空间界面</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* 功能状态指示器 */}
            {activeFeatures.map((feature) => (
              <div
                key={feature}
                className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-400 text-xs"
              >
                {feature.replace("_", " ").toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* 左侧：AI交互面板 */}
        <div className="w-1/3 p-6 border-r border-white/10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-400" />
              高级AI助手
            </h3>

            {/* AI回应显示 */}
            <div className="flex-1 mb-4 p-4 bg-black/20 rounded-lg overflow-y-auto">
              {aiResponse ? (
                <div className="text-white leading-relaxed">
                  {aiResponse}
                  {state.predictiveInsights.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <h4 className="text-sm font-medium text-purple-400 mb-2">预测性洞察:</h4>
                      {state.predictiveInsights.slice(0, 3).map((insight, index) => (
                        <div key={index} className="text-sm text-gray-300 mb-1">
                          • {insight.prediction} (置信度: {Math.round(insight.confidence * 100)}%)
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>AI助手准备就绪</p>
                  <p className="text-sm">支持情绪感知和预测性交互</p>
                </div>
              )}
            </div>

            {/* 输入区域 */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="与AI助手对话..."
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isProcessing) {
                    handleAdvancedAIInteraction(userInput)
                  }
                }}
                disabled={isProcessing}
              />
              <button
                onClick={() => handleAdvancedAIInteraction(userInput)}
                disabled={!userInput.trim() || isProcessing}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Zap className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 中间：情绪和预测面板 */}
        <div className="w-1/3 p-6">
          <div className="space-y-6 h-full">
            {/* 情绪状态面板 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-400" />
                情绪计算
              </h3>

              {state.userEmotion ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">主要情绪:</span>
                    <span className="text-white font-medium">{state.userEmotion.primaryEmotion}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">强度:</span>
                    <div className="flex-1 mx-3 bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-red-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${state.userEmotion.intensity * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{Math.round(state.userEmotion.intensity * 100)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">情绪价值:</span>
                    <span
                      className={`font-medium ${state.userEmotion.valence > 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {state.userEmotion.valence > 0 ? "积极" : "消极"}
                    </span>
                  </div>

                  {state.userEmotion.recommendations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <h4 className="text-sm font-medium text-blue-400 mb-2">AI建议:</h4>
                      {state.userEmotion.recommendations.slice(0, 2).map((rec: string, index: number) => (
                        <div key={index} className="text-sm text-gray-300 mb-1">
                          • {rec}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-4">
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">正在分析情绪状态...</p>
                </div>
              )}
            </div>

            {/* 预测性交互面板 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex-1">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                预测性交互
              </h3>

              {state.predictedActions.length > 0 ? (
                <div className="space-y-3">
                  {state.predictedActions.slice(0, 4).map((action, index) => (
                    <div key={index} className="p-3 bg-black/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">{action.action}</span>
                        <span className="text-xs text-gray-400">{Math.round(action.confidence * 100)}%</span>
                      </div>
                      <div className="text-xs text-gray-300">{action.reasoning}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            action.priority === "high"
                              ? "bg-red-500/20 text-red-400"
                              : action.priority === "medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {action.priority}
                        </span>
                        <span className="text-xs text-gray-400">{action.timing}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">正在分析行为模式...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧：跨设备和空间界面面板 */}
        <div className="w-1/3 p-6 border-l border-white/10">
          <div className="space-y-6 h-full">
            {/* 跨设备同步面板 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                跨设备同步
              </h3>

              <div className="space-y-3">
                {["iPhone 15 Pro", "MacBook Pro", "iPad Air"].map((device, index) => (
                  <div key={device} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-white text-sm">{device}</span>
                    </div>
                    <button
                      onClick={() => handleDeviceHandoff(device)}
                      className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded text-blue-400 text-xs transition-colors"
                    >
                      切换
                    </button>
                  </div>
                ))}
              </div>

              {state.activeHandoffs.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <h4 className="text-sm font-medium text-green-400 mb-2">活跃切换:</h4>
                  {state.activeHandoffs.map((handoff, index) => (
                    <div key={index} className="text-xs text-gray-300 mb-1">
                      • 已切换到 {handoff.continuationUrl ? "目标设备" : "未知设备"}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 空间界面面板 */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex-1">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                空间界面
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">当前模式:</span>
                  <span className="text-white font-medium uppercase">{state.spatialMode}</span>
                </div>

                <button
                  onClick={toggleSpatialMode}
                  className={`w-full py-3 px-4 rounded-lg transition-colors ${
                    state.spatialMode === "2d"
                      ? "bg-purple-500 hover:bg-purple-600 text-white"
                      : "bg-gray-600 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  {state.spatialMode === "2d" ? "启用AR模式" : "返回2D模式"}
                </button>

                {state.spatialElements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-purple-400">空间元素:</h4>
                    {state.spatialElements.map((element, index) => (
                      <div key={index} className="text-xs text-gray-300 p-2 bg-black/20 rounded">
                        • 空间元素 #{index + 1}
                      </div>
                    ))}
                  </div>
                )}

                {activeFeatures.includes("spatial_interface") && (
                  <div className="text-xs text-green-400 text-center py-2">✓ 空间界面已启用</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 情绪干预覆盖层 */}
      {state.emotionalInterventions.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md mx-4">
            <h3 className="text-xl font-medium text-white mb-4 text-center">情绪关怀</h3>
            <div className="space-y-4">
              {state.emotionalInterventions.slice(0, 2).map((intervention, index) => (
                <div key={index} className="text-center">
                  <div className="text-gray-300 mb-2">
                    {intervention.type === "breathing_guide" && "让我们一起深呼吸"}
                    {intervention.type === "color_therapy" && "感受这些舒缓的色彩"}
                    {intervention.type === "music_therapy" && "享受这段放松的音乐"}
                  </div>
                  <div className="text-sm text-gray-400">
                    预计持续时间: {Math.round(intervention.duration / 60000)} 分钟
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setState((prev) => ({ ...prev, emotionalInterventions: [] }))}
              className="w-full mt-6 py-2 px-4 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-colors"
            >
              我感觉好多了
            </button>
          </div>
        </div>
      )}

      {/* 预测性帮助浮动提示 */}
      {state.predictedActions.some((action) => action.timing === "immediate" && action.confidence > 0.9) && (
        <div className="fixed bottom-6 right-6 bg-blue-500/90 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4 max-w-sm">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">智能建议</h4>
              <p className="text-blue-100 text-sm">
                {
                  state.predictedActions.find((action) => action.timing === "immediate" && action.confidence > 0.9)
                    ?.action
                }
              </p>
              <button
                onClick={() => {
                  const action = state.predictedActions.find((a) => a.timing === "immediate" && a.confidence > 0.9)
                  if (action) executePredictiveAction(action)
                }}
                className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-xs transition-colors"
              >
                执行建议
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 动态背景效果 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* 全局样式 */}
      <style jsx>{`
        .breathing-guide {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .breathing-circle {
          width: 200px;
          height: 200px;
          border: 2px solid #8b5cf6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: breathe 4s infinite;
        }

        .breathing-text {
          color: white;
          font-size: 18px;
          text-align: center;
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 20px;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }

        .notification-success {
          background: rgba(34, 197, 94, 0.9);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .notification-error {
          background: rgba(239, 68, 68, 0.9);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .notification-info {
          background: rgba(59, 130, 246, 0.9);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .notification-help {
          background: rgba(168, 85, 247, 0.9);
          border: 1px solid rgba(168, 85, 247, 0.3);
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .simplified-content * {
          font-size: 1.1em !important;
          line-height: 1.6 !important;
        }

        .simplified-content .complex-element {
          display: none !important;
        }
      `}</style>
    </div>
  )
}
