"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Brain, Eye, Heart, Zap, Smartphone, Monitor, Activity, TrendingUp, Play, Pause, Volume2, Palette, Wind, Music, Target, Users, Sparkles, CircuitBoard, Lightbulb, Settings, BarChart3, Cpu, Database, Headphones, Camera, Mic, Globe, Wifi, Battery, Clock, Award, Star } from 'lucide-react'

// 导入高级功能模块
import { advancedAI, type UserContext } from "@/lib/advanced-ai-engine"
import { crossDeviceSync, type Device } from "@/lib/cross-device-sync"
import { arvrInterface, type XRSession } from "@/lib/ar-vr-interface"
import { emotionAI, type EmotionData, type ColorTherapyConfig } from "@/lib/emotion-ai"
import {
  predictiveInteraction,
  type WorkflowOptimization,
  type ProactiveAssistance,
  type PredictiveInsight,
  type PredictionModelConfig,
  type ModelPerformanceMetrics,
} from "@/lib/predictive-interaction"

// 导入组件
import { OptimizationProgress } from "@/components/optimization-progress"
import { PredictionAccuracyTest } from "@/components/prediction-accuracy-test"
import { ModelComparison } from "@/components/model-comparison"

export default function NextGenInterfacePage() {
  const router = useRouter()
  
  // 状态管理
  const [activeTab, setActiveTab] = useState("overview")
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null)
  const [connectedDevices, setConnectedDevices] = useState<Device[]>([])
  const [xrSession, setXrSession] = useState<XRSession | null>(null)
  const [predictions, setPredictions] = useState<PredictiveInsight[]>([])
  const [modelPerformance, setModelPerformance] = useState<ModelPerformanceMetrics | null>(null)
  const [colorTherapy, setColorTherapy] = useState<ColorTherapyConfig | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<any>(null)
  const [beforeTestResults, setBeforeTestResults] = useState<any>(null)
  const [afterTestResults, setAfterTestResults] = useState<any>(null)
  const [showComparison, setShowComparison] = useState(false)

  // 初始化系统
  useEffect(() => {
    const initializeSystem = async () => {
      try {
        // 初始化各个AI系统
        await Promise.all([
          advancedAI.initialize(),
          crossDeviceSync.initialize(),
          arvrInterface.initialize(),
          emotionAI.initialize(),
          predictiveInteraction.initialize(),
        ])

        // 为当前用户初始化预测系统
        await predictiveInteraction.initializeForUser("current_user")

        // 获取初始数据
        const devices = await crossDeviceSync.discoverDevices()
        setConnectedDevices(devices)

        const performance = predictiveInteraction.getModelPerformance("current_user")
        setModelPerformance(performance)

        // 模拟情绪分析
        const emotion = await emotionAI.analyzeEmotion({
          userId: "current_user",
          text: "我对这个新界面很感兴趣",
        })
        setCurrentEmotion(emotion)

        // 生成色彩疗法
        const therapy = await emotionAI.generateColorTherapy(emotion)
        setColorTherapy(therapy)

        setIsInitialized(true)
      } catch (error) {
        console.error("系统初始化失败:", error)
      }
    }

    initializeSystem()
  }, [])

  // 定期更新预测
  useEffect(() => {
    if (!isInitialized) return

    const updatePredictions = async () => {
      try {
        const insight = await predictiveInteraction.predictNextAction("current_user", "immediate")
        if (insight) {
          setPredictions(prev => [insight, ...prev.slice(0, 4)])
        }
      } catch (error) {
        console.error("预测更新失败:", error)
      }
    }

    const interval = setInterval(updatePredictions, 10000) // 每10秒更新一次
    return () => clearInterval(interval)
  }, [isInitialized])

  // 处理优化完成
  const handleOptimizationComplete = (results: any) => {
    setOptimizationResults(results)
    setIsOptimizing(false)
    
    // 更新模型性能
    const updatedPerformance = predictiveInteraction.getModelPerformance("current_user")
    setModelPerformance(updatedPerformance)
  }

  // 处理测试完成
  const handleTestComplete = (results: any, isBefore: boolean) => {
    if (isBefore) {
      setBeforeTestResults(results)
    } else {
      setAfterTestResults(results)
      setShowComparison(true)
    }
  }

  // 开始优化
  const startOptimization = async () => {
    setIsOptimizing(true)
    try {
      await predictiveInteraction.optimizePredictionAlgorithm("current_user")
    } catch (error) {
      console.error("优化失败:", error)
      setIsOptimizing(false)
    }
  }

  // 启动AR会话
  const startARSession = async () => {
    try {
      const success = await arvrInterface.startARSession()
      if (success) {
        const session = arvrInterface.getSession()
        setXrSession(session)
      }
    } catch (error) {
      console.error("AR会话启动失败:", error)
    }
  }

  // 切换设备
  const switchToDevice = async (deviceId: string) => {
    try {
      const success = await crossDeviceSync.handoffToDevice(deviceId, {
        currentPage: "/next-gen-interface",
        userState: { activeTab, predictions },
      })
      
      if (success) {
        // 显示成功消息
        console.log("设备切换成功")
      }
    } catch (error) {
      console.error("设备切换失败:", error)
    }
  }

  const tabs = [
    { id: "overview", label: "系统概览", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "emotion", label: "情绪AI", icon: <Heart className="w-4 h-4" /> },
    { id: "prediction", label: "预测交互", icon: <Brain className="w-4 h-4" /> },
    { id: "devices", label: "跨设备同步", icon: <Smartphone className="w-4 h-4" /> },
    { id: "ar-vr", label: "AR/VR界面", icon: <Eye className="w-4 h-4" /> },
    { id: "optimization", label: "模型优化", icon: <Zap className="w-4 h-4" /> },
  ]

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CircuitBoard className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold mb-2">初始化下一代AI界面</h2>
            <p className="text-gray-600 mb-4">正在加载高级AI功能模块...</p>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">预计还需要几秒钟</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 顶部导航 */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">下一代AI界面</h1>
                  <p className="text-xs text-gray-500">智能预测 • 情绪感知 • 跨设备协作</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* 实时状态指示器 */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">AI系统运行中</span>
              </div>
              
              {/* 当前情绪显示 */}
              {currentEmotion && (
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">
                  <Heart className="w-3 h-3 mr-1" />
                  {currentEmotion.primary}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 标签导航 */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-lg border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white shadow-sm text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="space-y-8">
          {/* 系统概览 */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* 系统状态卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">AI模型准确率</p>
                        <p className="text-2xl font-bold">
                          {modelPerformance ? `${(modelPerformance.accuracy * 100).toFixed(1)}%` : "加载中..."}
                        </p>
                      </div>
                      <Brain className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">连接设备数</p>
                        <p className="text-2xl font-bold">{connectedDevices.length}</p>
                      </div>
                      <Smartphone className="w-8 h-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">预测准确度</p>
                        <p className="text-2xl font-bold">
                          {modelPerformance ? `${(modelPerformance.precision * 100).toFixed(1)}%` : "加载中..."}
                        </p>
                      </div>
                      <Target className="w-8 h-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">响应时间</p>
                        <p className="text-2xl font-bold">
                          {modelPerformance ? `${modelPerformance.predictionLatency.toFixed(0)}ms` : "加载中..."}
                        </p>
                      </div>
                      <Zap className="w-8 h-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 实时预测面板 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>实时AI预测</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {predictions.length > 0 ? (
                    <div className="space-y-3">
                      {predictions.map((prediction, index) => (
                        <div
                          key={prediction.id}
                          className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{prediction.prediction.action}</h4>
                              <Badge variant="outline">
                                {(prediction.confidence * 100).toFixed(0)}% 置信度
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {prediction.prediction.reasoning[0]}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{prediction.timeframe}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>正在收集用户行为数据以生成预测...</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 系统功能概览 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("emotion")}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-pink-600" />
                      </div>
                      <h3 className="font-semibold">情绪AI系统</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      实时分析用户情绪状态，提供个性化的界面适配和情绪支持
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">已激活</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("prediction")}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold">预测交互系统</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      基于用户行为模式预测下一步操作，提前准备相关功能和内容
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">学习中</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("devices")}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="font-semibold">跨设备同步</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      无缝在多个设备间切换，保持工作状态和个人偏好同步
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">{connectedDevices.length} 设备在线</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* 情绪AI */}
          {activeTab === "emotion" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <span>情绪AI分析系统</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 当前情绪状态 */}
                  {currentEmotion && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
                        <CardContent className="p-6 text-center">
                          <h3 className="font-semibold mb-2">主要情绪</h3>
                          <div className="text-3xl font-bold text-pink-600 mb-2">
                            {currentEmotion.primary}
                          </div>
                          <div className="text-sm text-gray-600">
                            强度: {(currentEmotion.intensity * 100).toFixed(0)}%
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                        <CardContent className="p-6 text-center">
                          <h3 className="font-semibold mb-2">情绪效价</h3>
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {currentEmotion.valence > 0 ? "积极" : currentEmotion.valence < 0 ? "消极" : "中性"}
                          </div>
                          <div className="text-sm text-gray-600">
                            数值: {currentEmotion.valence.toFixed(2)}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                        <CardContent className="p-6 text-center">
                          <h3 className="font-semibold mb-2">唤醒度</h3>
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            {currentEmotion.arousal > 0.6 ? "高" : currentEmotion.arousal > 0.4 ? "中" : "低"}
                          </div>
                          <div className="text-sm text-gray-600">
                            数值: {currentEmotion.arousal.toFixed(2)}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* 色彩疗法 */}
                  {colorTherapy && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Palette className="w-5 h-5 text-purple-600" />
                          <span>个性化色彩疗法</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div
                              className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-gray-200"
                              style={{ backgroundColor: colorTherapy.primaryColor }}
                            ></div>
                            <p className="text-sm font-medium">主色调</p>
                            <p className="text-xs text-gray-500">{colorTherapy.primaryColor}</p>
                          </div>
                          <div className="text-center">
                            <div
                              className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-gray-200"
                              style={{ backgroundColor: colorTherapy.accentColor }}
                            ></div>
                            <p className="text-sm font-medium">强调色</p>
                            <p className="text-xs text-gray-500">{colorTherapy.accentColor}</p>
                          </div>
                          <div className="text-center">
                            <div
                              className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-gray-200"
                              style={{ backgroundColor: colorTherapy.backgroundColor }}
                            ></div>
                            <p className="text-sm font-medium">背景色</p>
                            <p className="text-xs text-gray-500">{colorTherapy.backgroundColor}</p>
                          </div>
                          <div className="text-center">
                            <div
                              className="w-16 h-16 rounded-lg mx-auto mb-2 border-2 border-gray-200"
                              style={{ backgroundColor: colorTherapy.textColor }}
                            ></div>
                            <p className="text-sm font-medium">文字色</p>
                            <p className="text-xs text-gray-500">{colorTherapy.textColor}</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-center">
                          <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                            <Palette className="w-4 h-4 mr-2" />
                            应用色彩疗法
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* 情绪支持功能 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Wind className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">呼吸练习</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          基于当前情绪状态的个性化呼吸指导
                        </p>
                        <Button size="sm" variant="outline">
                          开始练习
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Music className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">音乐疗法</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          根据情绪推荐舒缓或激励的音乐
                        </p>
                        <Button size="sm" variant="outline">
                          播放音乐
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">情绪建议</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          AI生成的个性化情绪调节建议
                        </p>
                        <Button size="sm" variant="outline">
                          获取建议
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 预测交互 */}
          {activeTab === "prediction" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <span>预测交互系统</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 模型性能指标 */}
                  {modelPerformance && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {(modelPerformance.accuracy * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">准确率</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {(modelPerformance.precision * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">精确率</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {(modelPerformance.recall * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">召回率</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {modelPerformance.predictionLatency.toFixed(0)}ms
                        </div>
                        <div className="text-sm text-gray-600">响应时间</div>
                      </div>
                    </div>
                  )}

                  {/* 实时预测列表 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">实时行为预测</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {predictions.length > 0 ? (
                        <div className="space-y-4">
                          {predictions.map((prediction, index) => (
                            <div
                              key={prediction.id}
                              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Badge className="bg-blue-500">
                                      {prediction.type}
                                    </Badge>
                                    <span className="font-medium">{prediction.prediction.action}</span>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {prediction.prediction.reasoning.join(" • ")}
                                  </p>
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <span>置信度: {(prediction.confidence * 100).toFixed(0)}%</span>
                                    <span>时间框架: {prediction.timeframe}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium text-blue-600">
                                    {(prediction.prediction.probability * 100).toFixed(0)}%
                                  </div>
                                  <div className="text-xs text-gray-500">概率</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>正在学习您的使用模式...</p>
                          <p className="text-sm">请继续使用系统以生成更准确的预测</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* 预测配置 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">预测系统配置</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">特征权重分配</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">行为模式</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={30} className="w-20 h-2" />
                                <span className="text-sm text-gray-600">30%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">时间模式</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={25} className="w-20 h-2" />
                                <span className="text-sm text-gray-600">25%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">上下文信息</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={25} className="w-20 h-2" />
                                <span className="text-sm text-gray-600">25%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">历史数据</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={20} className="w-20 h-2" />
                                <span className="text-sm text-gray-600">20%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">置信度阈值</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">高置信度</span>
                              <Badge variant="outline">≥ 80%</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">中等置信度</span>
                              <Badge variant="outline">60% - 79%</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">低置信度</span>
                              <Badge variant="outline">40% - 59%</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">学习率</span>
                              <Badge variant="outline">0.01</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 跨设备同步 */}
          {activeTab === "devices" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span>跨设备同步系统</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 连接的设备 */}
                  <div>
                    <h3 className="font-semibold mb-4">已连接设备 ({connectedDevices.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {connectedDevices.map((device) => (
                        <Card key={device.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                  {device.type === "mobile" && <Smartphone className="w-5 h-5 text-green-600" />}
                                  {device.type === "desktop" && <Monitor className="w-5 h-5 text-green-600" />}
                                  {device.type === "tablet" && <Smartphone className="w-5 h-5 text-green-600" />}
                                </div>
                                <div>
                                  <h4 className="font-medium">{device.name}</h4>
                                  <p className="text-sm text-gray-500">{device.platform}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-500">在线</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span>屏幕</span>
                                <span className="text-gray-600">
                                  {device.capabilities.screen.width}×{device.capabilities.screen.height}
                                </span>
                              </div>
                              {device.capabilities.battery && (
                                <div className="flex items-center justify-between text-sm">
                                  <span>电池</span>
                                  <div className="flex items-center space-x-2">
                                    <Progress value={device.capabilities.battery.level * 100} className="w-16 h-2" />
                                    <span className="text-gray-600">
                                      {(device.capabilities.battery.level * 100).toFixed(0)}%
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => switchToDevice(device.id)}
                            >
                              切换到此设备
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* 同步功能 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">同步状态</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">对话历史</span>
                            <Badge className="bg-green-500">已同步</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">用户偏好</span>
                            <Badge className="bg-green-500">已同步</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">搜索历史</span>
                            <Badge className="bg-green-500">已同步</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">书签收藏</span>
                            <Badge className="bg-yellow-500">同步中</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">协作功能</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Button className="w-full" variant="outline">
                            <Users className="w-4 h-4 mr-2" />
                            创建协作会话
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Globe className="w-4 h-4 mr-2" />
                            共享当前页面
                          </Button>
                          <Button className="w-full" variant="outline">
                            <Wifi className="w-4 h-4 mr-2" />
                            发现附近设备
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* AR/VR界面 */}
          {activeTab === "ar-vr" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    <span>AR/VR沉浸式界面</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* XR支持状态 */}
                  <div className="text-center py-8">
                    {arvrInterface.isSupported() ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                          <Eye className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold">XR设备支持已启用</h3>
                        <p className="text-gray-600">您的设备支持增强现实和虚拟现实功能</p>
                        
                        {!xrSession ? (
                          <div className="flex justify-center space-x-4">
                            <Button onClick={startARSession} className="bg-purple-600 hover:bg-purple-700">
                              <Eye className="w-4 h-4 mr-2" />
                              启动AR会话
                            </Button>
                            <Button variant="outline" onClick={() => arvrInterface.startVRSession()}>
                              <Eye className="w-4 h-4 mr-2" />
                              启动VR会话
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Badge className="bg-green-500">XR会话已激活</Badge>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="text-center">
                                <div className="font-medium">{xrSession.elements.length}</div>
                                <div className="text-gray-500">空间元素</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">{xrSession.interactions.length}</div>
                                <div className="text-gray-500">交互次数</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">{xrSession.device.name}</div>
                                <div className="text-gray-500">设备</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">{xrSession.status}</div>
                                <div className="text-gray-500">状态</div>
                              </div>
                            </div>
                            <Button variant="outline" onClick={() => arvrInterface.endSession()}>
                              结束XR会话
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <Eye className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600">XR设备不支持</h3>
                        <p className="text-gray-500">您的设备或浏览器不支持WebXR功能</p>
                        <p className="text-sm text-gray-400">
                          请使用支持WebXR的现代浏览器或XR设备访问此功能
                        </p>
                      </div>
                    )}
                  </div>

                  {/* XR功能演示 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Target className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold mb-2">空间搜索</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          在3D空间中进行直观的信息搜索和浏览
                        </p>
                        <Badge variant="outline">AR功能</Badge>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2">协作空间</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          与他人在虚拟空间中实时协作和讨论
                        </p>
                        <Badge variant="outline">VR功能</Badge>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <BarChart3 className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold mb-2">数据可视化</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          在3D空间中展示和操作复杂数据
                        </p>
                        <Badge variant="outline">混合现实</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 模型优化 */}
          {activeTab === "optimization" && (
            <div className="space-y-6">
              {/* 优化进度 */}
              {isOptimizing && (
                <OptimizationProgress
                  isOptimizing={isOptimizing}
                  onComplete={handleOptimizationComplete}
                />
              )}

              {/* 优化结果 */}
              {optimizationResults && !isOptimizing && (
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-800">
                      <Award className="w-5 h-5" />
                      <span>优化完成！</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          +{(optimizationResults.improvements.accuracy * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-green-600">准确率提升</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          +{(optimizationResults.improvements.precision * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-green-600">精确率提升</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          +{(optimizationResults.improvements.recall * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-green-600">召回率提升</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          -{optimizationResults.improvements.latencyReduction}%
                        </div>
                        <div className="text-sm text-green-600">延迟降低</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button
                        onClick={() => setActiveTab("prediction")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        查看优化后的预测系统
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 准确性测试 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">优化前测试</h3>
                  <PredictionAccuracyTest
                    modelVersion="before"
                    onTestComplete={(results) => handleTestComplete(results, true)}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">优化后测试</h3>
                  {optimizationResults ? (
                    <PredictionAccuracyTest
                      modelVersion="after"
                      onTestComplete={(results) => handleTestComplete(results, false)}
                    />
                  ) : (
                    <Card className="h-full flex items-center justify-center">
                      <CardContent className="text-center py-12">
                        <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">请先完成模型优化</p>
                        <Button
                          onClick={startOptimization}
                          disabled={isOptimizing}
                          className="mt-4"
                        >
                          {isOptimizing ? "优化中..." : "开始优化"}
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* 性能对比 */}
              {showComparison && (
                <ModelComparison
                  beforeResults={beforeTestResults}
                  afterResults={afterTestResults}
                  onStartComparison={() => {
                    setBeforeTestResults(null)
                    setAfterTestResults(null)
                    setShowComparison(false)
                  }}
                />
              )}

              {/* 优化控制面板 */}
              {!isOptimizing && !optimizationResults && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <span>AI模型优化中心</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">智能模型优化</h3>
                      <p className="text-gray-600 mb-6">
                        使用先进的机器学习算法自动优化AI模型性能，提升预测准确性和响应速度
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <h4 className="font-medium">性能提升</h4>
                          <p className="text-sm text-gray-600">预期提升5-15%</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <h4 className="font-medium">优化时间</h4>
                          <p className="text-sm text-gray-600">约2-3分钟</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                          <h4 className="font-medium">智能调优</h4>
                          <p className="text-sm text-gray-600">自动参数调整</p>
                        </div>
                      </div>
                      
                      <Button
                        onClick={startOptimization}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        开始AI模型优化
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
