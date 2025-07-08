"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Send,
  Mic,
  Paperclip,
  Camera,
  Settings,
  GraduationCap,
  Globe,
  History,
  Clock,
  X,
  Heart,
  MessageSquare,
  Brain,
  Users,
  BarChart3,
  MicOff,
  Sparkles,
  Target,
  Trophy,
  Calendar,
  FileText,
  Video,
  Headphones,
  Map,
  Lightbulb,
  MoreHorizontal,
} from "lucide-react"
import { HistoryManager, type SearchHistory } from "@/lib/history"

export default function HomePage() {
  const [question, setQuestion] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true)
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleText, setBubbleText] = useState("")
  const [bubbleIndex, setBubbleIndex] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [filteredHistory, setFilteredHistory] = useState<SearchHistory[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showMoreTools, setShowMoreTools] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const router = useRouter()

  // 多元化友好对话内容
  const friendlyMessages = [
    "你好！我是你的AI学习伙伴 🎓",
    "准备好开始学习之旅了吗？✨",
    "有什么想要探索的知识吗？🔍",
    "让我们一起发现新的可能性！🚀",
    "今天想学点什么有趣的？💡",
    "我在这里帮助你解答疑问 🤝",
    "准备好迎接知识的惊喜了吗？🎉",
    "让我们开启智慧的大门吧！🌟",
    "每个问题都是新发现的开始 🔬",
    "知识的海洋等待我们探索 🌊",
  ]

  // 未开发功能列表
  const moreTools = [
    { id: "practice", name: "智能练习", icon: Target, description: "个性化练习模式" },
    { id: "achievements", name: "成就系统", icon: Trophy, description: "学习成就追踪" },
    { id: "schedule", name: "学习计划", icon: Calendar, description: "智能学习安排" },
    { id: "notes", name: "笔记管理", icon: FileText, description: "知识笔记整理" },
    { id: "videos", name: "视频学习", icon: Video, description: "视频课程资源" },
    { id: "audio", name: "音频学习", icon: Headphones, description: "音频内容播放" },
    { id: "inspiration", name: "灵感收集", icon: Lightbulb, description: "创意想法记录" },
    { id: "ai-assistant", name: "AI助手", icon: Sparkles, description: "高级AI功能" },
    { id: "global-resources", name: "全球资源", icon: Globe, description: "国际学习资源" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsSubmitting(true)

    try {
      // 添加到历史记录
      HistoryManager.addHistory(question.trim())

      // 跳转到思考过程页面
      router.push(`/thinking?q=${encodeURIComponent(question.trim())}`)
    } catch (error) {
      console.error("提交问题失败:", error)
      setIsSubmitting(false)
    }
  }

  const handleHistoryClick = (historyItem: SearchHistory) => {
    if (historyItem && historyItem.question) {
      setQuestion(historyItem.question)
      setShowHistory(false)
    }
  }

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      HistoryManager.removeHistory(id)
      loadHistory()
    } catch (error) {
      console.error("删除历史记录失败:", error)
    }
  }

  const loadHistory = () => {
    try {
      const history = HistoryManager.getHistory()
      setSearchHistory(history)
      setFilteredHistory(history)
    } catch (error) {
      console.error("加载历史记录失败:", error)
      setSearchHistory([])
      setFilteredHistory([])
    }
  }

  const handleQuestionChange = (value: string) => {
    setQuestion(value)

    try {
      // 实时搜索历史记录
      if (value && value.trim()) {
        const filtered = HistoryManager.searchHistory(value.trim())
        setFilteredHistory(Array.isArray(filtered) ? filtered.slice(0, 5) : [])
      } else {
        const recent = HistoryManager.getRecentHistory(10)
        setFilteredHistory(Array.isArray(recent) ? recent : [])
      }
    } catch (error) {
      console.error("搜索历史记录失败:", error)
      setFilteredHistory([])
    }
  }

  // 语音输入功能
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const audioChunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
        // 这里可以调用语音识别API
        handleVoiceRecognition(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("无法访问麦克风:", error)
      alert("无法访问麦克风，请检查权限设置")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleVoiceRecognition = async (audioBlob: Blob) => {
    try {
      // 模拟语音识别结果
      const mockTranscription = "这是语音识别的结果示例"
      setQuestion(mockTranscription)
    } catch (error) {
      console.error("语音识别失败:", error)
    }
  }

  // 文件上传功能
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        // 处理文件上传
        const fileName = file.name
        setQuestion(`请分析这个文件：${fileName}`)
        setShowFileUpload(false)
      } catch (error) {
        console.error("文件上传失败:", error)
      }
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        // 处理图片上传
        const fileName = file.name
        setQuestion(`请分析这张图片：${fileName}`)
      } catch (error) {
        console.error("图片上传失败:", error)
      }
    }
  }

  // 主要功能处理
  const handleMainMenuClick = (action: string) => {
    try {
      switch (action) {
        case "community":
          router.push("/community")
          break
        case "knowledge-graph":
          router.push("/knowledge-graph")
          break
        case "learning-path":
          router.push("/learning-path/create")
          break
        case "mindmap":
          router.push("/generate/mindmap")
          break
        default:
          break
      }
    } catch (error) {
      console.error("导航失败:", error)
    }
  }

  // 更多工具功能处理
  const handleMoreToolClick = (toolId: string) => {
    try {
      const tool = moreTools.find((t) => t.id === toolId)
      if (tool) {
        alert(`${tool.name}功能正在开发中...`)
      }
      setShowMoreTools(false)
    } catch (error) {
      console.error("工具点击失败:", error)
    }
  }

  const formatTime = (timestamp: number) => {
    try {
      if (!timestamp || typeof timestamp !== "number") return "未知时间"

      const now = Date.now()
      const diff = now - timestamp
      const minutes = Math.floor(diff / (1000 * 60))
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))

      if (minutes < 1) return "刚刚"
      if (minutes < 60) return `${minutes}分钟前`
      if (hours < 24) return `${hours}小时前`
      if (days < 7) return `${days}天前`
      return new Date(timestamp).toLocaleDateString("zh-CN")
    } catch (error) {
      console.error("时间格式化失败:", error)
      return "未知时间"
    }
  }

  useEffect(() => {
    try {
      // 动画序列：3秒后开始弹跳，弹跳完成后显示气泡
      const animationTimer = setTimeout(() => {
        setShowWelcomeAnimation(false)
      }, 3000)

      const bubbleTimer = setTimeout(() => {
        setShowBubble(true)
        setBubbleText(friendlyMessages[0])
      }, 4000)

      // 每5秒切换一次友好消息
      const messageInterval = setInterval(() => {
        if (showBubble) {
          setBubbleIndex((prev) => {
            const nextIndex = (prev + 1) % friendlyMessages.length
            setBubbleText(friendlyMessages[nextIndex])
            return nextIndex
          })
        }
      }, 5000)

      // 加载历史记录
      loadHistory()

      return () => {
        clearTimeout(animationTimer)
        clearTimeout(bubbleTimer)
        clearInterval(messageInterval)
      }
    } catch (error) {
      console.error("初始化失败:", error)
    }
  }, [showBubble])

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* AI角色动画 - 向上移动110px */}
      <div
        className={`fixed z-50 transition-all duration-1000 ease-out ${
          showWelcomeAnimation
            ? "top-4 left-1/2 transform -translate-x-1/2 scale-50"
            : "left-1/2 transform -translate-x-1/2 scale-100"
        }`}
        style={{
          top: showWelcomeAnimation ? "1rem" : "calc(50% - 110px)",
          animation: showWelcomeAnimation ? "none" : "bounce-in 1s ease-out",
        }}
      >
        {/* AI角色图片 - 使用新提供的图片 */}
        <div className="relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-2VgZzVLKblPRmH5bcKQzcTtVV56Nxu.png"
            alt="AI助手"
            className="w-32 h-32 drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3))",
            }}
          />

          {/* 友好气泡对话 - 多元化内容 */}
          {showBubble && (
            <div
              className="absolute -top-16 -left-8 bg-white rounded-2xl px-4 py-3 shadow-lg border-2 border-blue-200 animate-bubble-in min-w-[280px]"
              style={{
                animation: "bubble-in 0.5s ease-out",
              }}
            >
              <div className="text-sm text-gray-700 font-medium text-center transition-all duration-500">
                {bubbleText}
              </div>
              {/* 气泡尾巴 */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-blue-200 rotate-45"></div>
            </div>
          )}

          {/* 信号波动画 */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-3 bg-blue-500 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1.5s",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 遮罩层 - 动画期间显示 */}
      {showWelcomeAnimation && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-2xl font-bold mb-2">智能AI搜索</div>
            <div className="text-sm opacity-80">正在为您准备最佳体验...</div>
          </div>
        </div>
      )}

      {/* 原有页面内容 - 动画完成后显示 */}
      <div
        className={`transition-opacity duration-1000 ${
          showWelcomeAnimation ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* 顶部导航栏 */}
        <header className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-medium">智能AI搜索</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/conversations")}
              className="p-2 hover:bg-blue-700 rounded transition-colors relative group"
              title="对话记录"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                对话记录
              </span>
            </button>
            <button
              onClick={() => {
                setShowHistory(!showHistory)
                if (!showHistory) loadHistory()
              }}
              className="p-2 hover:bg-blue-700 rounded transition-colors relative group"
              title="搜索历史"
            >
              <History className="w-5 h-5" />
              {searchHistory.length > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {searchHistory.length > 9 ? "9+" : searchHistory.length}
                </div>
              )}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                搜索历史
              </span>
            </button>
            <button
              onClick={() => router.push("/favorites")}
              className="p-2 hover:bg-blue-700 rounded transition-colors relative group"
              title="我的收藏"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                我的收藏
              </span>
            </button>
            <button
              onClick={() => router.push("/analytics")}
              className="p-2 hover:bg-blue-700 rounded transition-colors relative group"
              title="学习分析"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                学习分析
              </span>
            </button>
            <button className="p-2 hover:bg-blue-700 rounded transition-colors relative group" title="设置">
              <Settings className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                设置
              </span>
            </button>
          </div>
        </header>

        <div className="flex">
          {/* 左侧菜单 - 简化设计 */}
          <aside className="hidden md:block w-16 bg-white border-r border-gray-200 min-h-screen">
            <nav className="flex flex-col items-center py-4 space-y-4">
              {/* 主要功能 - 已开发 */}
              <button
                onClick={() => handleMainMenuClick("community")}
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative group"
                title="学习社区"
              >
                <Users className="w-6 h-6" />
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2">
                  学习社区
                </span>
              </button>

              <button
                onClick={() => handleMainMenuClick("knowledge-graph")}
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative group"
                title="知识图谱"
              >
                <Brain className="w-6 h-6" />
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2">
                  知识图谱
                </span>
              </button>

              <button
                onClick={() => handleMainMenuClick("learning-path")}
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative group"
                title="学习路径"
              >
                <GraduationCap className="w-6 h-6" />
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2">
                  学习路径
                </span>
              </button>

              <button
                onClick={() => handleMainMenuClick("mindmap")}
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative group"
                title="思维导图"
              >
                <Map className="w-6 h-6" />
                <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2">
                  思维导图
                </span>
              </button>

              {/* 分隔线 */}
              <div className="w-8 h-px bg-gray-200 my-2"></div>

              {/* 更多工具 - 下拉菜单 */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreTools(!showMoreTools)}
                  className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative group"
                  title="更多工具"
                >
                  <MoreHorizontal className="w-6 h-6" />
                  <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2">
                    更多工具
                  </span>
                </button>

                {/* 下拉菜单 */}
                {showMoreTools && (
                  <div className="absolute left-16 top-0 bg-white border rounded-lg shadow-xl min-w-[200px] z-30 ml-2">
                    <div className="p-2 border-b bg-gray-50 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 text-sm">更多工具</h3>
                      <button onClick={() => setShowMoreTools(false)} className="p-1 hover:bg-gray-200 rounded">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {moreTools.map((tool) => {
                        const IconComponent = tool.icon
                        return (
                          <button
                            key={tool.id}
                            onClick={() => handleMoreToolClick(tool.id)}
                            className="w-full text-left p-3 hover:bg-gray-50 flex items-center gap-3 group"
                          >
                            <IconComponent className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-800">{tool.name}</div>
                              <div className="text-xs text-gray-500">{tool.description}</div>
                            </div>
                            <div className="text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded">开发中</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </aside>

          {/* 主内容区域 */}
          <main className="flex-1 flex flex-col items-center justify-center px-8 relative">
            {/* 历史记录面板 */}
            {showHistory && (
              <div className="absolute top-4 right-4 w-full md:w-96 max-w-sm md:max-w-none bg-white rounded-lg shadow-xl border z-30 max-h-96 overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <History className="w-5 h-5" />
                    搜索历史
                  </h3>
                  <button onClick={() => setShowHistory(false)} className="p-1 hover:bg-gray-200 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {searchHistory.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>暂无搜索历史</p>
                      <p className="text-sm mt-1">开始您的第一次搜索吧！</p>
                    </div>
                  ) : (
                    <div className="p-2">
                      {searchHistory.slice(0, 10).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleHistoryClick(item)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg group flex items-start gap-3"
                        >
                          <Clock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.question}</p>
                            <p className="text-xs text-gray-500 mt-1">{formatTime(item.timestamp)}</p>
                          </div>
                          <button
                            onClick={(e) => handleDeleteHistory(item.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                          >
                            <X className="w-3 h-3 text-gray-400" />
                          </button>
                        </button>
                      ))}
                      {searchHistory.length > 0 && (
                        <div className="p-3 border-t">
                          <button
                            onClick={() => {
                              try {
                                HistoryManager.clearHistory()
                                loadHistory()
                              } catch (error) {
                                console.error("清除历史记录失败:", error)
                              }
                            }}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            清除所有历史记录
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 搜索表单 */}
            <form onSubmit={handleSubmit} className="w-full max-w-4xl w-full px-4 md:px-0 relative">
              <div className="relative">
                <div className="relative">
                  <textarea
                    value={question}
                    onChange={(e) => handleQuestionChange(e.target.value)}
                    placeholder="请输入您的问题..."
                    className="w-full min-h-[120px] md:min-h-[120px] p-4 md:p-6 pr-20 border-2 border-blue-500 rounded-2xl resize-none focus:outline-none focus:border-blue-600 text-gray-800 text-base md:text-lg leading-relaxed"
                    disabled={isSubmitting}
                  />

                  {/* 输入框内的功能按钮 */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    {/* 语音输入按钮 */}
                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`p-2 rounded-lg transition-colors ${
                        isRecording
                          ? "bg-red-500 text-white animate-pulse"
                          : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                      title={isRecording ? "停止录音" : "语音输入"}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    {/* 文件上传按钮 */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowFileUpload(!showFileUpload)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="上传文件"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>

                      {/* 文件上传选项 */}
                      {showFileUpload && (
                        <div className="absolute bottom-full right-0 mb-2 bg-white border rounded-lg shadow-lg p-2 min-w-[120px]">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Paperclip className="w-4 h-4" />
                            上传文件
                          </button>
                          <button
                            type="button"
                            onClick={() => imageInputRef.current?.click()}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Camera className="w-4 h-4" />
                            上传图片
                          </button>
                        </div>
                      )}
                    </div>

                    {/* 发送按钮 */}
                    <button
                      type="submit"
                      disabled={!question.trim() || isSubmitting}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="发送"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 智能提示 - 当用户输入时显示匹配的历史记录 */}
                {question.trim() && filteredHistory.length > 0 && !showHistory && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-20 max-h-48 overflow-y-auto">
                    <div className="p-2">
                      <div className="text-xs text-gray-500 px-3 py-2">相关搜索历史</div>
                      {filteredHistory.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleHistoryClick(item)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center gap-3"
                        >
                          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">{item.question}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* 隐藏的文件输入 */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt,.md"
              onChange={handleFileUpload}
              className="hidden"
            />
            <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </main>
        </div>
      </div>

      {/* 点击外部关闭菜单 */}
      {showFileUpload && <div className="fixed inset-0 z-10" onClick={() => setShowFileUpload(false)} />}
      {showMoreTools && <div className="fixed inset-0 z-20" onClick={() => setShowMoreTools(false)} />}

      {/* 自定义动画样式 */}
      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
          70% {
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes bubble-in {
          0% {
            transform: scale(0) translateY(10px);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) translateY(-5px);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
