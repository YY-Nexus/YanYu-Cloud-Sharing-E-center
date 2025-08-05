"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Brain,
  Eye,
  Heart,
  Zap,
  Smartphone,
  Monitor,
  Activity,
  TrendingUp,
  Play,
  Pause,
  Volume2,
  Palette,
  Wind,
  Music,
  Target,
  Users,
  Sparkles,
  CircuitBoard,
  Lightbulb,
} from "lucide-react"

// 导入高级功能模块
import { advancedAI, type PredictiveInsight } from "@/lib/advanced-ai-engine"
import { crossDeviceSync, type Device } from "@/lib/cross-device-sync"
import { arvrInterface, type XRSession } from "@/lib/ar-vr-interface"
import { emotionAI, type EmotionData, type ColorTherapyConfig } from "@/lib/emotion-ai"
import {
  predictiveInteraction,
  type WorkflowOptimization,
  type ProactiveAssistance,
} from "@/lib/predictive-interaction"

interface SystemStatus {
  aiEngine: "active" | "standby" | "offline"
  emotionAI: "monitoring" | "analyzing" | "intervening" | "offline"
  crossDeviceSync: "syncing" | "connected" | "disconnected"
  arvrInterface: "ready" | "active" | "unavailable"
  predictiveEngine: "learning" | "predicting" | "optimizing" | "offline"
}

interface RealTimeMetrics {
  emotionState: EmotionData
  cognitiveLoad: number
  attentionLevel: number
  stressLevel: number
  engagementScore: number
  productivityIndex: number
  wellbeingScore: number
}

export default function NextGenInterfacePage() {
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    aiEngine: 'standby',
    emotionAI: 'offline',
    crossDeviceSync: 'disconnected',
    arvrInterface: 'unavailable',
    predictiveEngine: 'offline'
  })
  
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    emotionState: {
      primary: 'neutral',
      secondary: [],
      intensity: 0.5,
      confidence: 0.8,
      valence: 0,
      arousal: 0.5,
      timestamp: Date.now(),
      source: 'multimodal'
    },
    cognitiveLoad: 0.4,
    attentionLevel: 0.8,
    stressLevel: 0.3,
    engagementScore: 0.7,
    productivityIndex: 0.6,
    wellbeingScore: 0.75
  })

  const [connectedDevices, setConnectedDevices] = useState<Device[]>([])
  const [activeXRSession, setActiveXRSession] = useState<XRSession | null>(null)
  const [currentTherapy, setCurrentTherapy] = useState<{
    type: 'color' | 'breathing' | 'music' | null
    config: any
    active: boolean
  }>({ type: null, config: null, active: false })
  
  const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([])
  const [proactiveHelp, setProactiveHelp] = useState<ProactiveAssistance[]>([])
  const [workflowOptimizations, setWorkflowOptimizations] = useState<WorkflowOptimization[]>([])

  const [selectedTab, setSelectedTab] = useState<'overview' | 'emotion' | 'devices' | 'ar-vr' | 'predictions' | 'wellness'>('overview')
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [adaptiveUI, setAdaptiveUI] = useState<any>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    initializeNextGenSystems()
    return () => {
      cleanup()
    }
  }, [])

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        updateRealTimeMetrics()
      }, 2000) // 每2秒更新一次

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  const initializeNextGenSystems = async () => {
    try {
      console.log('🚀 初始化下一代智能交互系统...')
      
      // 1. 初始化高级AI引擎
      setSystemStatus(prev => ({ ...prev, aiEngine: 'active' }))
      await advancedAI.updateUserContext('current_user', {
        userId: 'current_user',
        sessionId: `session_${Date.now()}`,
        preferences: {
          communicationStyle: 'empathetic',
          responseLength: 'detailed',
          topics: ['technology', 'ai', 'productivity'],
          learningGoals: ['improve efficiency', 'learn new skills']
        },
        emotionalProfile: {
          baseline: realTimeMetrics.emotionState,
          currentState: realTimeMetrics.emotionState,
          history: []
        },
        cognitiveLoad: realTimeMetrics.cognitiveLoad,
        attentionSpan: 15,
        expertise: { 'ai': 0.7, 'technology': 0.8 }
      })

      // 2. 初始化情绪AI
      setSystemStatus(prev => ({ ...prev, emotionAI: 'monitoring' }))
      
      // 3. 初始化跨设备同步
      setSystemStatus(prev => ({ ...prev, crossDeviceSync: 'connected' }))
      const devices = await crossDeviceSync.discoverDevices()
      setConnectedDevices(devices)

      // 4. 初始化AR/VR界面
      const arvrInitialized = await arvrInterface.initialize()
      setSystemStatus(prev => ({ 
        ...prev, 
        arvrInterface: arvrInitialized ? 'ready' : 'unavailable' 
      }))

      // 5. 初始化预测性交互
      setSystemStatus(prev => ({ ...prev, predictiveEngine: 'learning' }))
      await predictiveInteraction.initializeForUser('current_user')
      
      // 6. 启动实时监控
      await startRealTimeMonitoring()

      setIsInitialized(true)
      console.log('✅ 下一代智能交互系统初始化完成')
      
    } catch (error) {
      console.error('❌ 系统初始化失败:', error)
    }
  }

  const startRealTimeMonitoring = async () => {
    try {
      // 启动摄像头用于面部情绪识别
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }

        // 启动音频上下文用于语音分析
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      setIsMonitoring(true)
    } catch (error) {
      console.error('启动实时监控失败:', error)
    }
  }

  const updateRealTimeMetrics = async () => {
    try {
      // 1. 情绪分析
      const emotionInput = {
        userId: 'current_user',
        text: '当前用户状态分析', // 实际应用中会从用户输入获取
        // audioData: 从麦克风获取
        // videoFrame: 从摄像头获取
        physiological: {
          heartRate: 72 + Math.random() * 20, // 模拟心率数据
          skinConductance: 5 + Math.random() * 3
        }
      }

      const newEmotionState = await emotionAI.analyzeEmotion(emotionInput)
      
      // 2. 更新UI适应
      const uiConfig = await emotionAI.adaptUIToEmotion('current_user', newEmotionState)
      setAdaptiveUI(uiConfig)

      // 3. 检查是否需要情绪干预
      if (newEmotionState.intensity > 0.7 || newEmotionState.valence < -0.5) {
        await triggerEmotionalIntervention(newEmotionState)
      }

      // 4. 更新预测性洞察
      setSystemStatus(prev => ({ ...prev, predictiveEngine: 'predicting' }))
      const insights = await predictiveInteraction.predictNextAction('current_user', 'immediate')
      if (insights) {
        setPredictiveInsights(prev => [insights, ...prev.slice(0, 4)])
      }

      // 5. 更新实时指标
      setRealTimeMetrics(prev => ({
        ...prev,
        emotionState: newEmotionState,
        cognitiveLoad: Math.max(0, Math.min(1, prev.cognitiveLoad + (Math.random() - 0.5) * 0.1)),
        attentionLevel: Math.max(0, Math.min(1, prev.attentionLevel + (Math.random() - 0.5) * 0.1)),
        stressLevel: newEmotionState.primary === 'anger' || newEmotionState.primary === 'fear' ? 
          Math.min(1, newEmotionState.intensity) : prev.stressLevel * 0.95,
        engagementScore: Math.max(0, Math.min(1, prev.engagementScore + (Math.random() - 0.5) * 0.1)),
        productivityIndex: Math.max(0, Math.min(1, prev.productivityIndex + (Math.random() - 0.5) * 0.05)),
        wellbeingScore: (1 - prev.stressLevel + prev.engagementScore + (newEmotionState.valence + 1) / 2) / 3
      }))

    } catch (error) {
      console.error('更新实时指标失败:', error)
    }
  }

  const triggerEmotionalIntervention = async (emotionState: EmotionData) => {
    try {
      setSystemStatus(prev => ({ ...prev, emotionAI: 'intervening' }))

      // 根据情绪状态选择干预类型
      if (emotionState.arousal > 0.8) {
        // 高激活状态 - 呼吸练习
        const breathingExercise = await emotionAI.generateBreathingExercise(emotionState)
        setCurrentTherapy({
          type: 'breathing',
          config: breathingExercise,
          active: true
        })
      } else if (emotionState.valence < -0.5) {
        // 负面情绪 - 色彩疗法
        const colorTherapy = await emotionAI.generateColorTherapy(emotionState)
        setCurrentTherapy({
          type: 'color',
          config: colorTherapy,
          active: true
        })
        
        // 应用色彩疗法到界面
        applyColorTherapy(colorTherapy)
      } else if (emotionState.intensity > 0.7) {
        // 强烈情绪 - 音乐疗法
        const musicTherapy = await emotionAI.generateMusicTherapy(emotionState)
        setCurrentTherapy({
          type: 'music',
          config: musicTherapy,
          active: true
        })
      }

      // 5秒后自动停止干预
      setTimeout(() => {
        setCurrentTherapy({ type: null, config: null, active: false })
        setSystemStatus(prev => ({ ...prev, emotionAI: 'monitoring' }))
      }, 15000)

    } catch (error) {
      console.error('情绪干预失败:', error)
    }
  }

  const applyColorTherapy = (config: ColorTherapyConfig) => {
    const root = document.documentElement
    root.style.setProperty('--therapy-primary', config.primaryColor)
    root.style.setProperty('--therapy-accent', config.accentColor)
    root.style.setProperty('--therapy-bg', config.backgroundColor)
    root.style.setProperty('--therapy-text', config.textColor)
    
    // 添加过渡效果
    root.style.setProperty('--therapy-transition', `all ${config.duration}ms ${config.transition}`)
  }

  const startARSession = async () => {
    try {
      const success = await arvrInterface.startARSession()
      if (success) {
        const session = arvrInterface.getSession()
        setActiveXRSession(session)
        setSystemStatus(prev => ({ ...prev, arvrInterface: 'active' }))
        
        // 创建默认的空间UI元素
        arvrInterface.createSpatialMenu([
          { label: 'AI助手', action: 'ai-assistant' },
          { label: '数据可视化', action: 'visualization' },
          { label: '协作空间', action: 'collaboration' },
          { label: '设置', action: 'settings' }
        ])
      }
    } catch (error) {
      console.error('启动AR会话失败:', error)
    }
  }

  const startVRSession = async () => {
    try {
      const success = await arvrInterface.startVRSession()
      if (success) {
        const session = arvrInterface.getSession()
        setActiveXRSession(session)
        setSystemStatus(prev => ({ ...prev, arvrInterface: 'active' }))
      }
    } catch (error) {
      console.error('启动VR会话失败:', error)
    }
  }

  const handoffToDevice = async (deviceId: string) => {
    try {
      const context = {
        conversation: 'current_conversation',
        userState: realTimeMetrics,
        aiMemory: advancedAI.getUserContext('current_user')
      }
      
      const success = await crossDeviceSync.handoffToDevice(deviceId, context)
      if (success) {
        console.log(`成功切换到设备: ${deviceId}`)
      }
    } catch (error) {
      console.error('设备切换失败:', error)
    }
  }

  const optimizeCurrentWorkflow = async () => {
    try {
      setSystemStatus(prev => ({ ...prev, predictiveEngine: 'optimizing' }))
      const optimization = await predictiveInteraction.optimizeWorkflow('current_user', 'current_workflow')
      if (optimization) {
        setWorkflowOptimizations(prev => [optimization, ...prev.slice(0, 2)])
      }
    } catch (error) {
      console.error('工作流程优化失败:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'monitoring':
      case 'connected':
      case 'ready':
      case 'learning':
      case 'predicting':
        return 'bg-green-500'
      case 'standby':
      case 'analyzing':
      case 'syncing':
      case 'optimizing':
        return 'bg-yellow-500'
      case 'intervening':
        return 'bg-blue-500'
      case 'offline':
      case 'disconnected':
      case 'unavailable':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getEmotionColor = (emotion: string) => {
    const colorMap: Record<string, string> = {
      joy: 'text-yellow-600 bg-yellow-100',
      sadness: 'text-blue-600 bg-blue-100',
      anger: 'text-red-600 bg-red-100',
      fear: 'text-purple-600 bg-purple-100',
      surprise: 'text-green-600 bg-green-100',
      disgust: 'text-orange-600 bg-orange-100',
      neutral: 'text-gray-600 bg-gray-100'
    }
    return colorMap[emotion] || 'text-gray-600 bg-gray-100'
  }

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'joy': return '😊'
      case 'sadness': return '😢'
      case 'anger': return '😠'
      case 'fear': return '😨'
      case 'surprise': return '😲'
      case 'disgust': return '🤢'
      default: return '😐'
    }
  }

  const cleanup = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
    
    arvrInterface.endSession()
    crossDeviceSync.destroy()
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-4">🚀 初始化下一代智能交互系统</h2>
          <div className="space-y-2 text-sm opacity-80">
            <p>🧠 启动高级AI引擎...</p>
            <p>❤️ 初始化情绪计算系统...</p>
            <p>🔄 建立跨设备同步...</p>
            <p>🥽 准备AR/VR界面...</p>
            <p>🔮 激活预测性交互...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" 
         style={adaptiveUI?.colors ? {
           backgroundColor: `var(--therapy-bg, ${adaptiveUI.colors.backgroundColor})`,
           transition: 'var(--therapy-transition, all 300ms ease)'
         } : {}}>
      
      {/* 隐藏的视频和画布元素用于实时分析 */}
      <video ref={videoRef} className="hidden" autoPlay muted />
      <canvas ref={canvasRef} className="hidden" />

      {/* 顶部状态栏 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回
              </Button>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  🌟 下一代智能交互中心
                </h1>
                <p className="text-sm text-gray-500">
                  情绪感知 • 预测智能 • 跨设备协同 • 空间计算
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* 系统状态指示器 */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus.aiEngine)}`}></div>
                  <span className="text-xs text-gray-600">AI</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus.emotionAI)}`}></div>
                  <span className="text-xs text-gray-600">情绪</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus.crossDeviceSync)}`}></div>
                  <span className="text-xs text-gray-600">同步</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus.arvrInterface)}`}></div>
                  <span className="text-xs text-gray-600">XR</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus.predictiveEngine)}`}></div>
                  <span className="text-xs text-gray-600">预测</span>
                </div>
              </div>

              <Button 
                variant={isMonitoring ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsMonitoring(!isMonitoring)}
              >
                {isMonitoring ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isMonitoring ? '暂停监控' : '开始监控'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 情绪干预覆盖层 */}
      {currentTherapy.active && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <Card className="w-96 shadow-2xl border-0" style={{
            backgroundColor: currentTherapy.type === 'color' ? 
              currentTherapy.config?.backgroundColor : 'white'
          }}>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                {currentTherapy.type === 'color' && <Palette className="w-5 h-5" />}
                {currentTherapy.type === 'breathing' && <Wind className="w-5 h-5" />}
                {currentTherapy.type === 'music' && <Music className="w-5 h-5" />}
                <span>
                  {currentTherapy.type === 'color' && '色彩疗法'}
                  {currentTherapy.type === 'breathing' && '呼吸练习'}
                  {currentTherapy.type === 'music' && '音乐疗法'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {currentTherapy.type === 'breathing' && (
                <div className="space-y-4">
                  <div className="text-lg font-medium">
                    {currentTherapy.config.type} 呼吸法
                  </div>
                  <div className="text-sm text-gray-600">
                    吸气 {currentTherapy.config.inhaleTime}秒 → 
                    保持 {currentTherapy.config.holdTime}秒 → 
                    呼气 {currentTherapy.config.exhaleTime}秒
                  </div>
                  <div className="w-20 h-20 mx-auto border-4 border-blue-500 rounded-full animate-pulse"></div>
                  <div className="text-sm">
                    剩余 {currentTherapy.config.cycles} 个循环
                  </div>
                </div>
              )}
              
              {currentTherapy.type === 'color' && (
                <div className="space-y-4">
                  <div className="text-lg font-medium">舒缓色彩环境</div>
                  <div className="flex justify-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: currentTherapy.config.primaryColor }}
                    ></div>
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: currentTherapy.config.accentColor }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    让这些颜色帮助您放松心情
                  </div>
                </div>
              )}
              
              {currentTherapy.type === 'music' && (
                <div className="space-y-4">
                  <div className="text-lg font-medium">
                    {currentTherapy.config.genre} 音乐疗法
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Volume2 className="w-6 h-6 text-blue-500" />
                    <div className="text-sm">
                      {currentTherapy.config.tempo} BPM • {currentTherapy.config.key}
                    </div>
                  </div>
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-spin">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentTherapy({ type: null, config: null, active: false })}
              >
                结束疗法
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 标签导航 */}
        <div className="flex space-x-1 mb-6 bg-white/50 backdrop-blur-sm rounded-lg p-1">
          {[
            { id: 'overview', label: '总览', icon: Activity },
            { id: 'emotion', label: '情绪AI', icon: Heart },
            { id: 'devices', label: '设备协同', icon: Smartphone },
            { id: 'ar-vr', label: 'AR/VR', icon: Eye },
            { id: 'predictions', label: '预测智能', icon: Brain },
            { id: 'wellness', label: '健康管理', icon: Target }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* 总览标签 */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* 实时指标仪表板 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">情绪状态</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-2xl">{getEmotionIcon(realTimeMetrics.emotionState.primary)}</span>
                        <div>
                          <p className="font-bold text-blue-900 capitalize">
                            {realTimeMetrics.emotionState.primary}
                          </p>
                          <p className="text-xs text-blue-600">
                            强度: {Math.round(realTimeMetrics.emotionState.intensity * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <Heart className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">认知负荷</p>
                      <p className="text-2xl font-bold text-green-900">
                        {Math.round(realTimeMetrics.cognitiveLoad * 100)}%
                      </p>
                      <Progress 
                        value={realTimeMetrics.cognitiveLoad * 100} 
                        className="h-2 mt-2"
                      />
                    </div>
                    <Brain className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">专注度</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {Math.round(realTimeMetrics.attentionLevel * 100)}%
                      </p>
                      <Progress 
                        value={realTimeMetrics.attentionLevel * 100} 
                        className="h-2 mt-2"
                      />
                    </div>
                    <Target className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 font-medium">健康指数</p>
                      <p className="text-2xl font-bold text-orange-900">
                        {Math.round(realTimeMetrics.wellbeingScore * 100)}%
                      </p>
                      <Progress 
                        value={realTimeMetrics.wellbeingScore * 100} 
                        className="h-2 mt-2"
                      />
                    </div>
                    <Activity className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 系统状态和快速操作 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CircuitBoard className="w-5 h-5 mr-2 text-blue-600" />
                    系统状态
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(systemStatus).map(([system, status]) => (
                    <div key={system} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                        <span className="font-medium capitalize">
                          {system === 'aiEngine' && 'AI引擎'}
                          {system === 'emotionAI' && '情绪AI'}
                          {system === 'crossDeviceSync' && '设备同步'}
                          {system === 'arvrInterface' && 'AR/VR界面'}
                          {system === 'predictiveEngine' && '预测引擎'}
                        </span>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                    快速操作
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-transparent" 
                    variant="outline"
                    onClick={startARSession}
                    disabled={systemStatus.arvrInterface === 'unavailable'}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    启动AR体验
                  </Button>
                  
                  <Button 
                    className="w-full justify-start bg-transparent" 
                    variant="outline"
                    onClick={optimizeCurrentWorkflow}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    优化工作流程
                  </Button>
                  
                  <Button 
                    className="w-full justify-start bg-transparent" 
                    variant="outline"
                    onClick={() => {
                      const colorTherapy = emotionAI.generateColorTherapy(realTimeMetrics.emotionState)
                      colorTherapy.then(config => {
                        setCurrentTherapy({ type: 'color', config, active: true })
                      })
                    }}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    启动色彩疗法
                  </Button>
                  
                  <Button 
                    className="w-full justify-start bg-transparent" 
                    variant="outline"
                    onClick={() => crossDeviceSync.createCollaborationSession('新协作会话')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    创建协作会话
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* 预测性洞察 */}
            {predictiveInsights.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                    AI预测洞察
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {predictiveInsights.slice(0, 3).map((insight) => (
                      <div key={insight.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {insight.timeframe}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                置信度: {Math.round(insight.confidence * 100)}%
                              </Badge>
                            </div>
                            <p className="font-medium text-gray-900 mb-1">
                              {insight.prediction.action}
                            </p>
                            <p className="text-sm text-gray-600">
                              {insight.prediction.reasoning.join(' • ')}
                            </p>
                          </div>
                          <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 ml-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* 其他标签内容... */}
        {selectedTab === 'emotion' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  情绪AI分析中心
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">情绪AI功能开发中</h3>
                  <p className="text-gray-600">
                    高级情绪分析、色彩疗法、呼吸指导等功能即将上线
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 设备协同标签 */}
        {selectedTab === 'devices' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-blue-500" />
                  跨设备协同中心
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {connectedDevices.map((device) => (
                    <div key={device.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {device.type === 'desktop' && <Monitor className="w-5 h-5" />}
                          {device.type === 'mobile' && <Smartphone className="w-5 h-5" />}
                          <span className="font-medium">{device.name}</span>
                        </div>
                        <div className={
