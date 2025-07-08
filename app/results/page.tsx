"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Copy,
  Share2,
  Star,
  ThumbsUp,
  ThumbsDown,
  Download,
  RefreshCw,
  BookOpen,
  ExternalLink,
  MessageCircle,
  Lightbulb,
  Clock,
  Tag,
  Eye,
  FileText,
  Target,
} from "lucide-react"
import { HistoryManager } from "@/lib/history"

interface SearchResult {
  id: string
  question: string
  answer: string
  confidence: number
  sources: Array<{
    title: string
    url: string
    snippet: string
    type: "article" | "video" | "document" | "website"
  }>
  relatedQuestions: string[]
  tags: string[]
  category: string
  timestamp: number
  metadata: {
    responseTime: number
    model: string
    tokens: number
  }
}

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const type = searchParams.get("type") || "text"

  const [result, setResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [rating, setRating] = useState<"up" | "down" | null>(null)
  const [showSources, setShowSources] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    // 模拟API调用获取结果
    const fetchResult = async () => {
      setIsLoading(true)

      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockResult: SearchResult = {
        id: `result_${Date.now()}`,
        question: query,
        answer: generateMockAnswer(query, type),
        confidence: 0.92,
        sources: generateMockSources(query),
        relatedQuestions: generateRelatedQuestions(query),
        tags: generateTags(query),
        category: inferCategory(query),
        timestamp: Date.now(),
        metadata: {
          responseTime: 2340,
          model: "GPT-4",
          tokens: 1250,
        },
      }

      setResult(mockResult)
      setIsLoading(false)

      // 保存到历史记录
      HistoryManager.addToHistory({
        question: mockResult.question,
        answer: mockResult.answer,
        timestamp: mockResult.timestamp,
        category: mockResult.category,
        tags: mockResult.tags,
        metadata: {
          responseTime: mockResult.metadata.responseTime,
          confidence: mockResult.confidence,
          relatedQuestions: mockResult.relatedQuestions,
        },
      })
    }

    if (query) {
      fetchResult()
    }
  }, [query, type])

  const generateMockAnswer = (query: string, type: string): string => {
    const answers = {
      人工智能: `人工智能（Artificial Intelligence，AI）是计算机科学的一个分支，致力于创建能够执行通常需要人类智能的任务的系统。

## 核心概念

人工智能的目标是开发能够模拟、扩展和增强人类智能的计算机系统。这包括：

- **学习能力**：从数据中获取知识和技能
- **推理能力**：基于已知信息得出结论
- **感知能力**：理解和解释环境信息
- **语言处理**：理解和生成自然语言
- **问题解决**：找到复杂问题的解决方案

## 主要技术领域

### 1. 机器学习 (Machine Learning)
- 监督学习：使用标记数据训练模型
- 无监督学习：从未标记数据中发现模式
- 强化学习：通过试错学习最优策略

### 2. 深度学习 (Deep Learning)
- 神经网络：模拟人脑神经元结构
- 卷积神经网络：专门处理图像数据
- 循环神经网络：处理序列数据

### 3. 自然语言处理 (NLP)
- 文本理解和生成
- 机器翻译
- 情感分析
- 对话系统

## 应用领域

人工智能已经在多个领域取得了显著进展：

- **医疗健康**：疾病诊断、药物发现、个性化治疗
- **金融服务**：风险评估、算法交易、欺诈检测
- **交通运输**：自动驾驶、路线优化、交通管理
- **教育**：个性化学习、智能辅导、自动评分
- **娱乐**：推荐系统、游戏AI、内容创作

## 发展历程

- **1950年代**：AI概念提出，图灵测试
- **1960-70年代**：专家系统发展
- **1980年代**：机器学习兴起
- **2000年代**：大数据推动AI发展
- **2010年代**：深度学习突破
- **2020年代**：大语言模型时代

## 未来展望

人工智能的未来发展方向包括：

1. **通用人工智能 (AGI)**：具备人类水平的通用智能
2. **可解释AI**：让AI决策过程更加透明
3. **边缘AI**：在设备端运行的轻量级AI
4. **AI伦理**：确保AI技术的负责任发展

人工智能正在改变我们的生活和工作方式，但同时也带来了新的挑战和机遇。理解AI的基本原理和应用，对于在AI时代保持竞争力至关重要。`,

      机器学习: `机器学习是人工智能的一个重要分支，它使计算机能够在没有明确编程的情况下学习和改进。

## 基本概念

机器学习的核心思想是让计算机通过数据学习模式，并使用这些模式对新数据进行预测或决策。

### 学习过程
1. **数据收集**：获取相关的训练数据
2. **特征提取**：识别数据中的重要特征
3. **模型训练**：使用算法学习数据模式
4. **模型评估**：测试模型的性能
5. **模型部署**：将模型应用到实际问题

## 主要类型

### 1. 监督学习 (Supervised Learning)
使用标记的训练数据来学习输入和输出之间的映射关系。

**分类任务**：
- 邮件垃圾检测
- 图像识别
- 疾病诊断

**回归任务**：
- 房价预测
- 股票价格预测
- 销售预测

**常用算法**：
- 线性回归
- 决策树
- 随机森林
- 支持向量机
- 神经网络

### 2. 无监督学习 (Unsupervised Learning)
从未标记的数据中发现隐藏的模式和结构。

**聚类**：
- 客户分群
- 基因序列分析
- 市场细分

**降维**：
- 数据可视化
- 特征选择
- 噪声减少

**常用算法**：
- K-means聚类
- 层次聚类
- 主成分分析(PCA)
- t-SNE

### 3. 强化学习 (Reinforcement Learning)
通过与环境交互，学习最优的行动策略。

**应用场景**：
- 游戏AI（如AlphaGo）
- 自动驾驶
- 机器人控制
- 推荐系统

## 关键概念

### 过拟合与欠拟合
- **过拟合**：模型在训练数据上表现很好，但在新数据上表现差
- **欠拟合**：模型过于简单，无法捕捉数据的复杂模式

### 偏差-方差权衡
- **偏差**：模型的预测值与真实值的差异
- **方差**：模型对训练数据变化的敏感性

### 交叉验证
用于评估模型性能和选择最佳参数的技术。

## 实际应用

### 商业应用
- **推荐系统**：Netflix、Amazon的个性化推荐
- **搜索引擎**：Google的搜索算法优化
- **金融**：信用评分、风险管理
- **营销**：客户细分、价格优化

### 科学研究
- **生物信息学**：基因序列分析
- **天文学**：天体识别和分类
- **气候科学**：天气预测模型
- **材料科学**：新材料发现

## 学习路径

### 基础知识
1. **数学基础**：线性代数、概率统计、微积分
2. **编程技能**：Python、R、SQL
3. **数据处理**：数据清洗、特征工程

### 进阶学习
1. **算法理解**：深入学习各种ML算法
2. **实践项目**：完成端到端的ML项目
3. **专业领域**：选择特定应用领域深入

### 工具和框架
- **Python库**：scikit-learn、pandas、numpy
- **深度学习**：TensorFlow、PyTorch
- **可视化**：matplotlib、seaborn、plotly
- **云平台**：AWS、Google Cloud、Azure

机器学习是一个快速发展的领域，持续学习和实践是掌握这门技术的关键。`,

      default: `根据您的问题"${query}"，我为您提供以下详细解答：

这是一个很好的问题。让我从多个角度为您分析：

## 核心要点

${query}涉及多个重要方面，需要综合考虑：

1. **基本概念**：首先需要理解相关的基础概念和原理
2. **实际应用**：了解在现实中的具体应用场景
3. **最佳实践**：掌握行业内的最佳实践方法
4. **注意事项**：避免常见的误区和问题

## 详细分析

### 背景信息
这个话题在当前环境下具有重要意义，需要从历史发展和现状两个维度来理解。

### 关键因素
影响这个问题的主要因素包括：
- 技术层面的考虑
- 经济效益的评估
- 社会影响的分析
- 未来发展的趋势

### 解决方案
针对您的具体需求，建议采用以下方法：

1. **短期策略**：立即可以实施的措施
2. **中期规划**：需要一定时间准备的方案
3. **长期目标**：战略性的发展方向

## 实践建议

基于以上分析，我建议您：

- 从基础开始，循序渐进
- 结合实际情况，灵活应用
- 持续学习，保持更新
- 寻求专业指导，避免弯路

希望这个回答对您有所帮助。如果您需要更具体的信息或有其他问题，请随时告诉我。`,
    }

    return answers[query as keyof typeof answers] || answers.default
  }

  const generateMockSources = (query: string) => {
    return [
      {
        title: "权威百科全书 - " + query,
        url: "https://example.com/encyclopedia",
        snippet: "提供关于" + query + "的权威定义和详细解释...",
        type: "article" as const,
      },
      {
        title: "学术论文集 - " + query + "研究进展",
        url: "https://example.com/papers",
        snippet: "最新的学术研究成果和理论发展...",
        type: "document" as const,
      },
      {
        title: "专业视频教程 - " + query + "入门指南",
        url: "https://example.com/video",
        snippet: "通过视频形式深入浅出地讲解相关概念...",
        type: "video" as const,
      },
      {
        title: "官方文档 - " + query + "技术规范",
        url: "https://example.com/docs",
        snippet: "官方发布的技术文档和使用指南...",
        type: "website" as const,
      },
    ]
  }

  const generateRelatedQuestions = (query: string) => {
    const related = [
      query + "的发展历史是什么？",
      query + "有哪些实际应用？",
      "如何学习" + query + "？",
      query + "的未来趋势如何？",
      query + "与其他技术的区别是什么？",
    ]
    return related.slice(0, 4)
  }

  const generateTags = (query: string) => {
    const commonTags = ["技术", "学习", "应用", "发展"]
    const specificTags = query.includes("人工智能")
      ? ["AI", "机器学习", "深度学习"]
      : query.includes("编程")
        ? ["代码", "开发", "软件"]
        : ["知识", "概念", "理论"]
    return [...commonTags, ...specificTags].slice(0, 6)
  }

  const inferCategory = (query: string) => {
    if (query.includes("人工智能") || query.includes("AI") || query.includes("机器学习")) {
      return "人工智能"
    }
    if (query.includes("编程") || query.includes("代码") || query.includes("开发")) {
      return "编程技术"
    }
    if (query.includes("设计") || query.includes("UI") || query.includes("UX")) {
      return "设计"
    }
    return "通用知识"
  }

  const handleCopy = async () => {
    if (!result) return

    try {
      await navigator.clipboard.writeText(result.answer)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error("复制失败:", error)
    }
  }

  const handleShare = async () => {
    if (!result) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: result.question,
          text: result.answer.slice(0, 200) + "...",
          url: window.location.href,
        })
      } catch (error) {
        console.error("分享失败:", error)
      }
    } else {
      // 降级到复制链接
      await navigator.clipboard.writeText(window.location.href)
      alert("链接已复制到剪贴板")
    }
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    if (result) {
      HistoryManager.toggleFavorite(result.id)
    }
  }

  const handleRating = (newRating: "up" | "down") => {
    setRating(rating === newRating ? null : newRating)
    if (result) {
      HistoryManager.rateHistory(result.id, newRating === "up" ? 5 : 1)
    }
  }

  const handleRelatedQuestion = (question: string) => {
    router.push(`/thinking?query=${encodeURIComponent(question)}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">正在生成结果...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">未找到结果</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            返回
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">搜索结果</h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="复制答案"
            >
              <Copy className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="分享结果"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                isFavorited ? "text-yellow-600 bg-yellow-50" : "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
              }`}
              title="收藏"
            >
              <Star className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 主要内容 */}
          <div className="lg:col-span-3">
            {/* 问题标题 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex-1">{result.question}</h2>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-1 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>置信度 {Math.round(result.confidence * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>响应时间: {result.metadata.responseTime}ms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>模型: {result.metadata.model}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span>分类: {result.category}</span>
                </div>
              </div>
            </div>

            {/* 答案内容 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{result.answer}</div>
              </div>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                {result.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleRating("up")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      rating === "up"
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>有帮助</span>
                  </button>
                  <button
                    onClick={() => handleRating("down")}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      rating === "down" ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>需要改进</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  {copySuccess && <span className="text-green-600 text-sm">已复制!</span>}
                  <button
                    onClick={() => router.push(`/generate/mindmap?query=${encodeURIComponent(result.question)}`)}
                    className="flex items-center space-x-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>生成思维导图</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 相关问题 */}
            {result.relatedQuestions.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                  相关问题
                </h3>
                <div className="space-y-3">
                  {result.relatedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleRelatedQuestion(question)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800">{question}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 信息来源 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">信息来源</h3>
                <button
                  onClick={() => setShowSources(!showSources)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {showSources ? "收起" : "展开"}
                </button>
              </div>

              <div className={`space-y-3 ${showSources ? "" : "max-h-32 overflow-hidden"}`}>
                {result.sources.map((source, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {source.type === "video" ? (
                          <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                        ) : source.type === "document" ? (
                          <FileText className="w-4 h-4 text-blue-600" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{source.title}</h4>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{source.snippet}</p>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-xs mt-2 inline-flex items-center"
                        >
                          查看来源
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 快速操作 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/learning-path/create?topic=${encodeURIComponent(result.question)}`)}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-800">创建学习路径</span>
                </button>

                <button
                  onClick={() => router.push(`/generate/poster?topic=${encodeURIComponent(result.question)}`)}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="text-gray-800">生成海报</span>
                </button>

                <button
                  onClick={() => router.push(`/community/share?content=${encodeURIComponent(result.answer)}`)}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-800">分享到社区</span>
                </button>

                <button
                  onClick={() => router.push(`/thinking?query=${encodeURIComponent("请深入分析：" + result.question)}`)}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-800">深入分析</span>
                </button>
              </div>
            </div>

            {/* 统计信息 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">统计信息</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">响应时间:</span>
                  <span className="font-medium">{result.metadata.responseTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">使用模型:</span>
                  <span className="font-medium">{result.metadata.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Token数量:</span>
                  <span className="font-medium">{result.metadata.tokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">置信度:</span>
                  <span className="font-medium">{Math.round(result.confidence * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">生成时间:</span>
                  <span className="font-medium">{new Date(result.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
