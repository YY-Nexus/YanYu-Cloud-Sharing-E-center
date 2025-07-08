"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Send,
  Sparkles,
  Brain,
  FileText,
  Lightbulb,
  Zap,
  Settings,
  Download,
  Share2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react"
import {
  AIEnhancedEngine,
  type SmartQARequest,
  type SmartQAResponse,
  type ContentGenerationRequest,
  type GeneratedContent,
} from "@/lib/ai-enhanced"

export default function AIAssistantPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"chat" | "content" | "insights">("chat")
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<SmartQAResponse[]>([])
  const [currentResponse, setCurrentResponse] = useState<SmartQAResponse | null>(null)

  // 内容生成相关状态
  const [contentType, setContentType] = useState<ContentGenerationRequest["type"]>("article")
  const [contentTopic, setContentTopic] = useState("")
  const [contentDifficulty, setContentDifficulty] = useState<"beginner" | "intermediate" | "advanced">("intermediate")
  const [contentLength, setContentLength] = useState<"short" | "medium" | "long">("medium")
  const [contentStyle, setContentStyle] = useState<"formal" | "casual" | "academic" | "conversational">(
    "conversational",
  )
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)

  // 设置相关状态
  const [responseStyle, setResponseStyle] = useState<SmartQARequest["responseStyle"]>("detailed")
  const [includeReferences, setIncludeReferences] = useState(true)
  const [domain, setDomain] = useState("")

  // 语音相关状态
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    // 加载历史记录
    const history = AIEnhancedEngine.getQAHistory()
    setChatHistory(history.slice(0, 10))
  }, [])

  useEffect(() => {
    // 自动滚动到底部
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory, currentResponse])

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isLoading) return

    setIsLoading(true)
    setCurrentResponse(null)

    try {
      const request: SmartQARequest = {
        question: chatInput,
        domain: domain || undefined,
        responseStyle,
        includeReferences,
      }

      const response = await AIEnhancedEngine.smartQA(request)
      setCurrentResponse(response)
      setChatHistory((prev) => [response, ...prev].slice(0, 10))
      setChatInput("")
    } catch (error) {
      console.error("智能问答失败:", error)
      alert("问答服务暂时不可用，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  const handleContentGeneration = async () => {
    if (!contentTopic.trim() || isLoading) return

    setIsLoading(true)
    setGeneratedContent(null)

    try {
      const request: ContentGenerationRequest = {
        type: contentType,
        topic: contentTopic,
        difficulty: contentDifficulty,
        length: contentLength,
        style: contentStyle,
        language: "zh-CN",
      }

      const content = await AIEnhancedEngine.generateContent(request)
      setGeneratedContent(content)
    } catch (error) {
      console.error("内容生成失败:", error)
      alert("内容生成服务暂时不可用，请稍后重试")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = async () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

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
    // 模拟语音识别结果
    const mockTranscription = "这是语音识别的结果示例"
    setChatInput(mockTranscription)
  }

  const handleTextToSpeech = (text: string) => {
    if (isSpeaking) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "zh-CN"
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
      setIsSpeaking(true)
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert("内容已复制到剪贴板")
    } catch (error) {
      console.error("复制失败:", error)
    }
  }

  const handleShare = async (content: string, title: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: content,
        })
      } catch (error) {
        console.error("分享失败:", error)
      }
    } else {
      handleCopy(content)
    }
  }

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回首页</span>
            </button>

            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-800">AI智能助手</h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  activeTab === "chat" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                智能问答
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  activeTab === "content" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                内容生成
              </button>
              <button
                onClick={() => setActiveTab("insights")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  activeTab === "insights" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                学习洞察
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 智能问答标签页 */}
        {activeTab === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 主聊天区域 */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
                {/* 聊天历史 */}
                <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-4">
                  {chatHistory.length === 0 && !currentResponse && (
                    <div className="text-center py-12">
                      <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">开始智能对话</h3>
                      <p className="text-gray-500">向AI助手提问任何问题，获得专业的回答和建议</p>
                    </div>
                  )}

                  {/* 显示当前回答 */}
                  {currentResponse && (
                    <div className="space-y-4">
                      {/* 用户问题 */}
                      <div className="flex justify-end">
                        <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs lg:max-w-md">
                          {currentResponse.question}
                        </div>
                      </div>

                      {/* AI回答 */}
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-3 max-w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">AI助手</span>
                            <span className="text-xs text-gray-500">
                              置信度: {Math.round(currentResponse.confidence * 100)}%
                            </span>
                          </div>

                          <div className="prose prose-sm max-w-none">
                            <div
                              className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{
                                __html: currentResponse.answer
                                  .replace(/\n/g, "<br>")
                                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                  .replace(/\*(.*?)\*/g, "<em>$1</em>")
                                  .replace(
                                    /`(.*?)`/g,
                                    "<code class='bg-gray-200 px-1 py-0.5 rounded text-sm'>$1</code>",
                                  ),
                              }}
                            />
                          </div>

                          {/* 操作按钮 */}
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                            <button
                              onClick={() => handleTextToSpeech(currentResponse.answer)}
                              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                              title={isSpeaking ? "停止朗读" : "朗读回答"}
                            >
                              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleCopy(currentResponse.answer)}
                              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                              title="复制回答"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleShare(currentResponse.answer, currentResponse.question)}
                              className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                              title="分享回答"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <div className="flex-1"></div>
                            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          </div>

                          {/* 相关问题 */}
                          {currentResponse.relatedQuestions.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-200">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">相关问题：</h4>
                              <div className="space-y-1">
                                {currentResponse.relatedQuestions.map((question, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setChatInput(question)}
                                    className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    • {question}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 后续建议 */}
                          {currentResponse.followUpSuggestions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">后续建议：</h4>
                              <div className="space-y-1">
                                {currentResponse.followUpSuggestions.map((suggestion, index) => (
                                  <div key={index} className="text-sm text-gray-600">
                                    • {suggestion}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 历史对话 */}
                  {chatHistory.slice(1).map((qa) => (
                    <div key={qa.id} className="space-y-4 opacity-70">
                      <div className="flex justify-end">
                        <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs lg:max-w-md">
                          {qa.question}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-3 max-w-full">
                          <div className="text-gray-800 text-sm line-clamp-3">{qa.answer}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 输入区域 */}
                <div className="border-t border-gray-200 p-4">
                  <form onSubmit={handleChatSubmit} className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="输入您的问题..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={handleVoiceInput}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors ${
                          isRecording ? "text-red-600 animate-pulse" : "text-gray-400 hover:text-blue-600"
                        }`}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || isLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      发送
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* 设置侧边栏 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  对话设置
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">回答风格</label>
                    <select
                      value={responseStyle}
                      onChange={(e) => setResponseStyle(e.target.value as SmartQARequest["responseStyle"])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="detailed">详细回答</option>
                      <option value="concise">简洁回答</option>
                      <option value="step-by-step">分步说明</option>
                      <option value="examples">举例说明</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">专业领域</label>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="如：技术、教育、商业等"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includeReferences"
                      checked={includeReferences}
                      onChange={(e) => setIncludeReferences(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="includeReferences" className="text-sm text-gray-700">
                      包含参考来源
                    </label>
                  </div>
                </div>

                {/* 快捷问题 */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 mb-3">快捷问题</h4>
                  <div className="space-y-2">
                    {["如何提高学习效率？", "什么是人工智能？", "如何制定学习计划？", "编程入门建议"].map(
                      (question) => (
                        <button
                          key={question}
                          onClick={() => setChatInput(question)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {question}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 内容生成标签页 */}
        {activeTab === "content" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 生成设置 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  内容生成
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">内容类型</label>
                    <select
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value as ContentGenerationRequest["type"])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="article">文章</option>
                      <option value="summary">摘要</option>
                      <option value="quiz">测验</option>
                      <option value="flashcards">学习卡片</option>
                      <option value="outline">大纲</option>
                      <option value="explanation">概念解释</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">主题</label>
                    <input
                      type="text"
                      value={contentTopic}
                      onChange={(e) => setContentTopic(e.target.value)}
                      placeholder="输入内容主题..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">难度级别</label>
                    <select
                      value={contentDifficulty}
                      onChange={(e) => setContentDifficulty(e.target.value as "beginner" | "intermediate" | "advanced")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="beginner">初级</option>
                      <option value="intermediate">中级</option>
                      <option value="advanced">高级</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">内容长度</label>
                    <select
                      value={contentLength}
                      onChange={(e) => setContentLength(e.target.value as "short" | "medium" | "long")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="short">简短</option>
                      <option value="medium">中等</option>
                      <option value="long">详细</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">写作风格</label>
                    <select
                      value={contentStyle}
                      onChange={(e) =>
                        setContentStyle(e.target.value as "formal" | "casual" | "academic" | "conversational")
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="conversational">对话式</option>
                      <option value="formal">正式</option>
                      <option value="casual">轻松</option>
                      <option value="academic">学术</option>
                    </select>
                  </div>

                  <button
                    onClick={handleContentGeneration}
                    disabled={!contentTopic.trim() || isLoading}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    生成内容
                  </button>
                </div>
              </div>
            </div>

            {/* 生成结果 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {generatedContent ? (
                  <div>
                    {/* 内容头部 */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">{generatedContent.title}</h2>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>类型: {generatedContent.type}</span>
                            <span>字数: {generatedContent.metadata.wordCount}</span>
                            <span>阅读时间: {generatedContent.metadata.readingTime}分钟</span>
                            <span>难度: {generatedContent.metadata.difficulty}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(generatedContent.content)}
                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                            title="复制内容"
                          >
                            <Copy className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleShare(generatedContent.content, generatedContent.title)}
                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                            title="分享内容"
                          >
                            <Share2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDownload(generatedContent.content, `${generatedContent.title}.txt`)}
                            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                            title="下载内容"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 内容正文 */}
                    <div className="p-6">
                      <div className="prose prose-lg max-w-none">
                        <div
                          className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{
                            __html: generatedContent.content
                              .replace(/\n/g, "<br>")
                              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                              .replace(/\*(.*?)\*/g, "<em>$1</em>")
                              .replace(/`(.*?)`/g, "<code class='bg-gray-100 px-1 py-0.5 rounded text-sm'>$1</code>")
                              .replace(
                                /^### (.*$)/gm,
                                "<h3 class='text-lg font-semibold mt-6 mb-3 text-gray-800'>$1</h3>",
                              )
                              .replace(
                                /^## (.*$)/gm,
                                "<h2 class='text-xl font-semibold mt-8 mb-4 text-gray-800'>$1</h2>",
                              )
                              .replace(/^# (.*$)/gm, "<h1 class='text-2xl font-bold mt-8 mb-4 text-gray-800'>$1</h1>"),
                          }}
                        />
                      </div>
                    </div>

                    {/* 标签 */}
                    {generatedContent.metadata.topics.length > 0 && (
                      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">相关主题：</h4>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.metadata.topics.map((topic, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">开始内容生成</h3>
                    <p className="text-gray-500">选择内容类型和主题，让AI为您生成专业内容</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 学习洞察标签页 */}
        {activeTab === "insights" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  学习洞察
                </h3>
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">洞察功能开发中</h3>
                  <p className="text-gray-500">基于您的学习历史生成个性化洞察和建议</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-800 mb-4">学习统计</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">总问答次数</span>
                    <span className="font-semibold">{chatHistory.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">生成内容数</span>
                    <span className="font-semibold">{generatedContent ? 1 : 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">平均置信度</span>
                    <span className="font-semibold">
                      {chatHistory.length > 0
                        ? Math.round(
                            (chatHistory.reduce((sum, qa) => sum + qa.confidence, 0) / chatHistory.length) * 100,
                          )
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
