"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  Copy,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Heart,
  MessageSquare,
  BarChart3,
  Sparkles,
  Globe,
  ImageIcon,
  Presentation,
  Brain,
  Users,
  Clock,
  Cpu,
  Download,
  RefreshCw,
  BookOpen,
  FileText,
  ExternalLink,
} from "lucide-react"
import { HistoryManager } from "@/lib/history"

interface AIResponse {
  id: string
  question: string
  answer: string
  confidence: number
  sources: string[]
  relatedQuestions: string[]
  followUpSuggestions: string[]
  metadata: {
    responseTime: number
    tokensUsed: number
    complexity: number
  }
}

interface RelatedResource {
  title: string
  description: string
  url: string
  type: "article" | "video" | "tutorial" | "documentation"
  relevance: number
}

export default function ResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const question = searchParams.get("q") || ""
  const useLocal = searchParams.get("useLocal") === "true"
  const model = searchParams.get("model") || ""
  const resultParam = searchParams.get("result")

  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState<AIResponse | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [showCopySuccess, setShowCopySuccess] = useState(false)
  const [streamingContent, setStreamingContent] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [relatedResources, setRelatedResources] = useState<RelatedResource[]>([])
  const [showFullAnswer, setShowFullAnswer] = useState(false)

  const abortControllerRef = useRef<AbortController | null>(null)

  // 生成AI回答
  const generateAIResponse = async (question: string): Promise<AIResponse> => {
    const startTime = Date.now()

    // 模拟AI思考和回答生成
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockAnswers = {
      如何学习人工智能: `# 人工智能学习指南

## 学习路径概述
人工智能是一个广阔的领域，包含机器学习、深度学习、自然语言处理等多个分支。以下是一个系统性的学习路径：

## 1. 基础知识准备
### 数学基础
- **线性代数**：矩阵运算、特征值、特征向量
- **概率统计**：贝叶斯定理、概率分布、统计推断
- **微积分**：导数、梯度、优化理论

### 编程基础
- **Python**：AI领域最主流的编程语言
- **数据结构与算法**：理解基本算法和数据结构
- **版本控制**：Git的使用

## 2. 机器学习入门
### 核心概念
- 监督学习、无监督学习、强化学习
- 训练集、验证集、测试集
- 过拟合、欠拟合、正则化

### 常用算法
- **线性回归**：最简单的预测模型
- **逻辑回归**：分类问题的基础
- **决策树**：易于理解的分类算法
- **随机森林**：集成学习方法
- **支持向量机**：强大的分类算法
- **K-means聚类**：无监督学习代表

## 3. 深度学习进阶
### 神经网络基础
- 感知机、多层感知机
- 反向传播算法
- 激活函数、损失函数

### 深度学习架构
- **卷积神经网络(CNN)**：图像处理
- **循环神经网络(RNN/LSTM)**：序列数据处理
- **Transformer**：自然语言处理的革命
- **生成对抗网络(GAN)**：生成模型

## 4. 实践项目建议
### 初级项目
1. **房价预测**：使用线性回归预测房价
2. **图像分类**：使用CNN识别手写数字
3. **情感分析**：分析文本的情感倾向

### 中级项目
1. **推荐系统**：构建电影或商品推荐系统
2. **聊天机器人**：基于NLP的对话系统
3. **股票价格预测**：时间序列分析

### 高级项目
1. **自动驾驶模拟**：计算机视觉应用
2. **语音识别系统**：语音到文本转换
3. **AI艺术生成**：使用GAN生成艺术作品

## 5. 学习资源推荐
### 在线课程
- **Andrew Ng的机器学习课程**：Coursera上的经典课程
- **Deep Learning Specialization**：深度学习专项课程
- **CS231n**：斯坦福大学的计算机视觉课程

### 书籍推荐
- 《机器学习》- 周志华
- 《深度学习》- Ian Goodfellow
- 《Python机器学习》- Sebastian Raschka

### 实践平台
- **Kaggle**：数据科学竞赛平台
- **Google Colab**：免费的GPU环境
- **GitHub**：开源项目学习

## 6. 学习建议
### 学习策略
1. **理论与实践并重**：不要只学理论，要动手实践
2. **循序渐进**：从简单项目开始，逐步增加复杂度
3. **持续学习**：AI领域发展迅速，需要持续更新知识

### 时间安排
- **基础阶段**：3-6个月掌握数学和编程基础
- **入门阶段**：6-12个月学习机器学习基础
- **进阶阶段**：12-24个月深入学习深度学习
- **专业阶段**：持续学习最新技术和应用

## 7. 职业发展方向
### 技术路线
- **算法工程师**：专注于算法研发和优化
- **数据科学家**：从数据中挖掘价值和洞察
- **AI产品经理**：将AI技术转化为产品

### 应用领域
- **计算机视觉**：图像识别、自动驾驶
- **自然语言处理**：机器翻译、智能客服
- **推荐系统**：个性化推荐、精准营销

## 总结
学习人工智能需要扎实的基础、大量的实践和持续的学习。建议从基础开始，循序渐进，理论与实践相结合，最终找到自己感兴趣的专业方向深入发展。

记住，AI学习是一个长期过程，保持耐心和热情是成功的关键！`,

      什么是机器学习: `# 机器学习详解

## 什么是机器学习？
机器学习（Machine Learning，ML）是人工智能的一个重要分支，它使计算机能够在没有明确编程的情况下学习和改进。

## 核心概念
机器学习的核心思想是让计算机通过数据学习模式，然后使用这些模式对新数据进行预测或决策。

### 基本工作原理
1. **数据收集**：收集相关的训练数据
2. **特征提取**：从数据中提取有用的特征
3. **模型训练**：使用算法训练模型
4. **模型评估**：测试模型的性能
5. **预测应用**：使用模型对新数据进行预测

## 机器学习的类型

### 1. 监督学习（Supervised Learning）
- **定义**：使用标记的训练数据来学习
- **应用**：分类、回归问题
- **例子**：邮件垃圾分类、房价预测

### 2. 无监督学习（Unsupervised Learning）
- **定义**：从未标记的数据中发现隐藏模式
- **应用**：聚类、降维、异常检测
- **例子**：客户分群、数据压缩

### 3. 强化学习（Reinforcement Learning）
- **定义**：通过与环境交互来学习最优策略
- **应用**：游戏AI、自动驾驶、机器人控制
- **例子**：AlphaGo、自动驾驶汽车

## 常用算法

### 监督学习算法
- **线性回归**：预测连续值
- **逻辑回归**：二分类问题
- **决策树**：易于理解的分类方法
- **随机森林**：多个决策树的集成
- **支持向量机**：寻找最优分类边界
- **神经网络**：模拟人脑神经元

### 无监督学习算法
- **K-means聚类**：将数据分成K个群组
- **层次聚类**：构建数据的层次结构
- **主成分分析**：降维和特征提取
- **关联规则**：发现数据间的关联

## 应用领域

### 1. 计算机视觉
- 图像识别和分类
- 人脸识别
- 医学影像分析
- 自动驾驶

### 2. 自然语言处理
- 机器翻译
- 情感分析
- 聊天机器人
- 文本摘要

### 3. 推荐系统
- 电商产品推荐
- 音乐和视频推荐
- 新闻推荐
- 社交媒体内容推荐

### 4. 金融科技
- 信用评分
- 欺诈检测
- 算法交易
- 风险管理

## 学习机器学习的步骤

### 第一步：数学基础
- 线性代数
- 概率统计
- 微积分

### 第二步：编程技能
- Python或R语言
- 数据处理库（Pandas、NumPy）
- 机器学习库（Scikit-learn、TensorFlow）

### 第三步：理论学习
- 算法原理
- 模型评估
- 特征工程

### 第四步：实践项目
- 从简单项目开始
- 参与Kaggle竞赛
- 构建完整的机器学习项目

## 机器学习的挑战

### 技术挑战
- **数据质量**：需要高质量的训练数据
- **过拟合**：模型在训练数据上表现好，但泛化能力差
- **特征选择**：选择合适的特征对模型性能至关重要
- **模型解释性**：复杂模型难以解释

### 实际应用挑战
- **数据隐私**：保护用户数据隐私
- **算法偏见**：避免算法产生不公平的结果
- **计算资源**：大规模机器学习需要大量计算资源
- **人才短缺**：需要具备跨学科知识的专业人才

## 未来发展趋势

### 技术趋势
- **自动机器学习（AutoML）**：自动化模型选择和调优
- **联邦学习**：在保护隐私的前提下进行分布式学习
- **可解释AI**：提高模型的可解释性和透明度
- **边缘计算**：在设备端运行机器学习模型

### 应用趋势
- **个性化服务**：更精准的个性化推荐和服务
- **智能制造**：工业4.0和智能制造
- **医疗健康**：精准医疗和药物发现
- **环境保护**：气候变化预测和环境监测

## 总结
机器学习是一个快速发展的领域，它正在改变我们的生活和工作方式。通过系统的学习和实践，任何人都可以掌握机器学习的基本概念和技能，并将其应用到实际问题中。

关键是要保持学习的热情，不断实践，并关注这个领域的最新发展。`,

      Python编程入门: `# Python编程入门指南

## Python简介
Python是一种高级、解释型的编程语言，以其简洁易读的语法而闻名。它是初学者学习编程的理想选择，同时也是专业开发者的强大工具。

## 为什么选择Python？

### 优势特点
- **简洁易读**：语法接近自然语言
- **功能强大**：拥有丰富的标准库和第三方库
- **跨平台**：可在Windows、Mac、Linux上运行
- **应用广泛**：Web开发、数据科学、AI、自动化等
- **社区活跃**：庞大的开发者社区和丰富的学习资源

## Python基础语法

### 1. 变量和数据类型
\`\`\`python
# 数字类型
age = 25
height = 1.75
is_student = True

# 字符串
name = "张三"
message = '你好，世界！'

# 列表
fruits = ["苹果", "香蕉", "橙子"]
numbers = [1, 2, 3, 4, 5]

# 字典
person = {
    "姓名": "李四",
    "年龄": 30,
    "城市": "北京"
}
\`\`\`

### 2. 控制结构
\`\`\`python
# 条件语句
if age >= 18:
    print("成年人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")

# 循环
for fruit in fruits:
    print(f"我喜欢{fruit}")

for i in range(5):
    print(f"数字: {i}")

# while循环
count = 0
while count < 3:
    print(f"计数: {count}")
    count += 1
\`\`\`

### 3. 函数定义
\`\`\`python
def greet(name):
    return f"你好，{name}！"

def calculate_area(length, width):
    return length * width

# 调用函数
message = greet("小明")
area = calculate_area(10, 5)
\`\`\`

## 面向对象编程

### 类和对象
\`\`\`python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.grades = []
    
    def add_grade(self, grade):
        self.grades.append(grade)
    
    def get_average(self):
        if self.grades:
            return sum(self.grades) / len(self.grades)
        return 0

# 创建对象
student = Student("王五", 20)
student.add_grade(85)
student.add_grade(92)
print(f"平均分: {student.get_average()}")
\`\`\`

## 常用库介绍

### 1. 标准库
- **os**：操作系统接口
- **datetime**：日期和时间处理
- **json**：JSON数据处理
- **random**：随机数生成
- **re**：正则表达式

### 2. 第三方库
- **requests**：HTTP请求
- **pandas**：数据分析
- **numpy**：数值计算
- **matplotlib**：数据可视化
- **flask/django**：Web开发

## 实践项目

### 项目1：简单计算器
\`\`\`python
def calculator():
    while True:
        print("\\n简单计算器")
        print("1. 加法")
        print("2. 减法")
        print("3. 乘法")
        print("4. 除法")
        print("5. 退出")
        
        choice = input("请选择操作 (1-5): ")
        
        if choice == '5':
            break
        
        if choice in ['1', '2', '3', '4']:
            num1 = float(input("输入第一个数字: "))
            num2 = float(input("输入第二个数字: "))
            
            if choice == '1':
                result = num1 + num2
                print(f"结果: {num1} + {num2} = {result}")
            elif choice == '2':
                result = num1 - num2
                print(f"结果: {num1} - {num2} = {result}")
            elif choice == '3':
                result = num1 * num2
                print(f"结果: {num1} × {num2} = {result}")
            elif choice == '4':
                if num2 != 0:
                    result = num1 / num2
                    print(f"结果: {num1} ÷ {num2} = {result}")
                else:
                    print("错误：除数不能为零！")
        else:
            print("无效选择，请重试。")

calculator()
\`\`\`

### 项目2：文件处理
\`\`\`python
def word_counter(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.read()
            words = content.split()
            
            word_count = {}
            for word in words:
                word = word.lower().strip('.,!?";')
                word_count[word] = word_count.get(word, 0) + 1
            
            # 显示最常见的10个词
            sorted_words = sorted(word_count.items(), 
                                key=lambda x: x[1], reverse=True)
            
            print("最常见的10个词:")
            for word, count in sorted_words[:10]:
                print(f"{word}: {count}")
                
    except FileNotFoundError:
        print("文件未找到！")
    except Exception as e:
        print(f"发生错误: {e}")
\`\`\`

## 学习路径建议

### 第一阶段：基础语法（1-2周）
1. 变量和数据类型
2. 控制结构（if、for、while）
3. 函数定义和调用
4. 基本输入输出

### 第二阶段：进阶概念（2-3周）
1. 列表、字典、集合操作
2. 文件读写
3. 异常处理
4. 模块和包

### 第三阶段：面向对象（1-2周）
1. 类和对象
2. 继承和多态
3. 特殊方法
4. 装饰器

### 第四阶段：实际应用（持续）
1. 选择感兴趣的领域（Web、数据科学、自动化等）
2. 学习相关库和框架
3. 完成实际项目
4. 参与开源项目

## 学习资源推荐

### 在线教程
- **Python官方教程**：权威的学习资源
- **廖雪峰Python教程**：中文优质教程
- **菜鸟教程**：适合初学者
- **实验楼**：在线编程实践

### 书籍推荐
- 《Python编程：从入门到实践》
- 《流畅的Python》
- 《Python核心编程》
- 《Effective Python》

### 实践平台
- **LeetCode**：算法练习
- **HackerRank**：编程挑战
- **Kaggle**：数据科学竞赛
- **GitHub**：开源项目

## 常见问题和解决方案

### 1. 环境配置问题
- 使用Anaconda进行Python环境管理
- 学习虚拟环境的使用
- 了解包管理工具pip

### 2. 调试技巧
- 使用print语句调试
- 学习使用调试器
- 理解错误信息

### 3. 代码规范
- 遵循PEP 8编码规范
- 使用有意义的变量名
- 添加适当的注释

## 总结
Python是一门优秀的编程语言，学习Python不仅能帮助你解决实际问题，还能培养编程思维。关键是要多练习、多实践，从简单的项目开始，逐步提高编程能力。

记住：编程是一门实践性很强的技能，只有通过大量的练习才能真正掌握。保持耐心和热情，你一定能成为一名优秀的Python程序员！`,
    }

    const answer =
      mockAnswers[question as keyof typeof mockAnswers] ||
      `# 关于"${question}"的详细解答

## 概述
感谢您提出这个有趣的问题。我将为您提供一个全面而详细的回答。

## 核心要点分析

### 1. 问题背景
您的问题涉及到多个重要方面，需要从不同角度进行分析和理解。

### 2. 关键概念解释
让我为您详细解释相关的核心概念：

- **基础概念**：首先需要理解基本定义和原理
- **应用场景**：在实际生活中的具体应用
- **发展趋势**：未来的发展方向和可能性

### 3. 详细分析

#### 理论层面
从理论角度来看，这个问题涉及到以下几个重要方面：
- 基础理论框架
- 相关研究成果
- 学术界的主流观点

#### 实践层面
在实际应用中，我们需要考虑：
- 具体实施方法
- 可能遇到的挑战
- 解决方案和最佳实践

### 4. 实用建议

基于以上分析，我为您提供以下实用建议：

1. **入门建议**：如果您是初学者，建议从基础开始
2. **进阶方法**：对于有一定基础的学习者，可以尝试更高级的方法
3. **专业发展**：如果希望在这个领域专业发展，需要系统性学习

### 5. 相关资源

为了帮助您更好地理解这个话题，我推荐以下资源：
- 权威书籍和文献
- 在线课程和教程
- 实践项目和案例研究

## 总结

总的来说，这是一个值得深入探讨的话题。通过系统性的学习和实践，您可以在这个领域获得很好的发展。

如果您有任何进一步的问题，欢迎随时询问！`

    return {
      id: `response-${Date.now()}`,
      question,
      answer,
      confidence: 0.92,
      sources: ["权威学术文献", "行业最佳实践", "专家经验总结"],
      relatedQuestions: [
        `${question}的最佳实践是什么？`,
        `如何深入学习${question}相关知识？`,
        `${question}的未来发展趋势如何？`,
        `${question}有哪些常见误区？`,
        `${question}的实际应用案例有哪些？`,
      ],
      followUpSuggestions: [
        "制定详细的学习计划",
        "寻找相关的实践项目",
        "加入专业社区交流",
        "关注最新发展动态",
        "建立知识体系框架",
      ],
      metadata: {
        responseTime: Date.now() - startTime,
        tokensUsed: Math.floor(answer.length / 4),
        complexity: Math.min(5, Math.floor(question.length / 10) + 2),
      },
    }
  }

  // 生成相关资源
  const generateRelatedResources = (question: string): RelatedResource[] => {
    const resources: RelatedResource[] = [
      {
        title: `${question} - 完整指南`,
        description: "全面介绍相关概念、方法和最佳实践的详细指南",
        url: "#",
        type: "article",
        relevance: 95,
      },
      {
        title: `${question} 视频教程`,
        description: "通过视频形式深入讲解核心概念和实践方法",
        url: "#",
        type: "video",
        relevance: 88,
      },
      {
        title: `${question} 实战案例`,
        description: "真实项目案例分析，展示实际应用和解决方案",
        url: "#",
        type: "tutorial",
        relevance: 92,
      },
      {
        title: `${question} 官方文档`,
        description: "权威的技术文档和API参考资料",
        url: "#",
        type: "documentation",
        relevance: 85,
      },
    ]

    return resources.sort((a, b) => b.relevance - a.relevance)
  }

  // 生成工具推荐
  const generateToolRecommendations = () => {
    const tools = [
      {
        name: "网页生成器",
        description: "基于您的问题生成相关网页",
        icon: Globe,
        action: () => router.push(`/generate/webpage?q=${encodeURIComponent(question)}`),
        color: "bg-blue-500",
      },
      {
        name: "海报制作",
        description: "创建相关主题的精美海报",
        icon: ImageIcon,
        action: () => router.push(`/generate/poster?q=${encodeURIComponent(question)}`),
        color: "bg-purple-500",
      },
      {
        name: "PPT生成",
        description: "制作专业的演示文稿",
        icon: Presentation,
        action: () => router.push(`/generate/ppt?q=${encodeURIComponent(question)}`),
        color: "bg-green-500",
      },
      {
        name: "思维导图",
        description: "可视化知识结构",
        icon: Brain,
        action: () => router.push(`/generate/mindmap?q=${encodeURIComponent(question)}`),
        color: "bg-orange-500",
      },
    ]

    return tools
  }

  useEffect(() => {
    if (!question) {
      router.push("/")
      return
    }

    const loadResult = async () => {
      setIsLoading(true)

      try {
        // 检查是否有预处理的结果
        if (resultParam) {
          const parsedResult = JSON.parse(resultParam)
          setResult(parsedResult)
        } else {
          // 生成AI回答
          const aiResponse = await generateAIResponse(question)
          setResult(aiResponse)

          // 添加到历史记录
          HistoryManager.addHistory(question, aiResponse.answer, "AI问答", ["智能搜索"])
        }

        // 生成相关资源
        const resources = generateRelatedResources(question)
        setRelatedResources(resources)

        // 检查收藏状态 - 修复错误
        try {
          const favoritesData = localStorage.getItem("ai-search-favorites")
          const favorites = favoritesData ? JSON.parse(favoritesData) : []
          if (Array.isArray(favorites)) {
            setIsFavorited(favorites.some((fav: any) => fav.question === question))
          } else {
            setIsFavorited(false)
          }
        } catch (error) {
          console.error("读取收藏数据失败:", error)
          setIsFavorited(false)
        }

        // 获取评分 - 修复错误
        try {
          const ratingsData = localStorage.getItem("ai-search-ratings")
          const ratings = ratingsData ? JSON.parse(ratingsData) : {}
          setRating(ratings[question] || null)
        } catch (error) {
          console.error("读取评分数据失败:", error)
          setRating(null)
        }
      } catch (error) {
        console.error("加载结果失败:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadResult()
  }, [question, router, resultParam])

  const handleCopy = async () => {
    const content = result?.answer || ""
    try {
      await navigator.clipboard.writeText(content)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 2000)
    } catch (error) {
      console.error("复制失败:", error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AI搜索结果",
          text: question,
          url: window.location.href,
        })
      } catch (error) {
        console.error("分享失败:", error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert("链接已复制到剪贴板")
      } catch (error) {
        console.error("复制链接失败:", error)
      }
    }
  }

  const handleFavorite = () => {
    try {
      const favoritesData = localStorage.getItem("ai-search-favorites")
      const favorites = favoritesData ? JSON.parse(favoritesData) : []

      // 确保favorites是数组
      const validFavorites = Array.isArray(favorites) ? favorites : []

      if (isFavorited) {
        const filtered = validFavorites.filter((fav: any) => fav.question !== question)
        localStorage.setItem("ai-search-favorites", JSON.stringify(filtered))
        setIsFavorited(false)
      } else {
        const newFavorite = {
          id: `fav-${Date.now()}`,
          question,
          answer: result?.answer || "",
          timestamp: Date.now(),
          tags: [],
        }
        validFavorites.unshift(newFavorite)
        localStorage.setItem("ai-search-favorites", JSON.stringify(validFavorites))
        setIsFavorited(true)
      }
    } catch (error) {
      console.error("处理收藏失败:", error)
    }
  }

  const handleRating = (newRating: number) => {
    try {
      const ratingsData = localStorage.getItem("ai-search-ratings")
      const ratings = ratingsData ? JSON.parse(ratingsData) : {}
      ratings[question] = newRating
      localStorage.setItem("ai-search-ratings", JSON.stringify(ratings))
      setRating(newRating)
    } catch (error) {
      console.error("保存评分失败:", error)
    }
  }

  const handleDownload = () => {
    if (!result) return

    const content = `# ${question}\n\n${result.answer}\n\n---\n生成时间: ${new Date().toLocaleString()}\n置信度: ${(result.confidence * 100).toFixed(1)}%`
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `AI回答-${question.slice(0, 20)}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const tools = generateToolRecommendations()

  if (!question) {
    return null
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
              <span>返回搜索</span>
            </button>

            <div className="flex items-center gap-3">
              {/* 模型信息 */}
              {useLocal && model && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <Cpu className="w-4 h-4" />
                  <span>本地模型: {model}</span>
                </div>
              )}

              <button
                onClick={() => router.push(`/thinking?q=${encodeURIComponent(question)}`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>重新搜索</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors relative"
                title="复制内容"
              >
                <Copy className="w-5 h-5" />
                {showCopySuccess && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    已复制
                  </div>
                )}
              </button>

              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="分享"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={handleFavorite}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorited
                    ? "text-red-600 bg-red-50 hover:bg-red-100"
                    : "text-gray-600 hover:text-red-600 hover:bg-gray-100"
                }`}
                title={isFavorited ? "取消收藏" : "添加收藏"}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="下载回答"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 主要内容区域 */}
          <div className="lg:col-span-3">
            {/* 问题显示 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <h1 className="text-xl font-semibold text-gray-800 mb-2">您的问题</h1>
              <p className="text-gray-700 leading-relaxed">{question}</p>
            </div>

            {/* 答案内容 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    AI 智能回答
                  </h2>

                  {result && (
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{result.metadata.responseTime}ms</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>置信度: {(result.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                  </div>
                ) : result ? (
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="text-gray-800 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: result.answer
                          .replace(/\n/g, "<br>")
                          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\*(.*?)\*/g, "<em>$1</em>")
                          .replace(/`(.*?)`/g, "<code class='bg-gray-100 px-1 py-0.5 rounded text-sm'>$1</code>")
                          .replace(/^### (.*$)/gm, "<h3 class='text-lg font-semibold mt-6 mb-3 text-gray-800'>$1</h3>")
                          .replace(/^## (.*$)/gm, "<h2 class='text-xl font-semibold mt-8 mb-4 text-gray-800'>$1</h2>")
                          .replace(/^# (.*$)/gm, "<h1 class='text-2xl font-bold mt-8 mb-4 text-gray-800'>$1</h1>")
                          .replace(/^- (.*$)/gm, "<li class='ml-4 mb-1'>$1</li>")
                          .replace(/^(\d+)\. (.*$)/gm, "<li class='ml-4 mb-1'>$2</li>"),
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">生成回答时出现错误，请重试</p>
                  </div>
                )}
              </div>

              {/* 评分区域 */}
              {!isLoading && result && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">这个回答对您有帮助吗？</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRating(1)}
                        className={`p-2 rounded-lg transition-colors ${
                          rating === 1
                            ? "bg-green-100 text-green-600"
                            : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                        }`}
                        title="有帮助"
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleRating(-1)}
                        className={`p-2 rounded-lg transition-colors ${
                          rating === -1 ? "bg-red-100 text-red-600" : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                        }`}
                        title="没有帮助"
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 相关问题 */}
            {result && result.relatedQuestions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                    相关问题
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.relatedQuestions.map((relatedQuestion, index) => (
                      <button
                        key={index}
                        onClick={() => router.push(`/thinking?q=${encodeURIComponent(relatedQuestion)}`)}
                        className="text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group"
                      >
                        <span className="text-gray-700 group-hover:text-purple-700">{relatedQuestion}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 float-right mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 相关资源 */}
            {relatedResources.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    相关资源
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {relatedResources.map((resource, index) => {
                      const typeIcons = {
                        article: FileText,
                        video: ImageIcon,
                        tutorial: BookOpen,
                        documentation: FileText,
                      }
                      const TypeIcon = typeIcons[resource.type]

                      return (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group cursor-pointer"
                        >
                          <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                            <TypeIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 group-hover:text-green-700 mb-1">
                              {resource.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="px-2 py-1 bg-gray-100 rounded">{resource.type}</span>
                              <span>相关度: {resource.relevance}%</span>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            {/* 相关工具 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                相关工具
              </h3>
              <div className="space-y-3">
                {tools.map((tool, index) => {
                  const Icon = tool.icon
                  return (
                    <button
                      key={index}
                      onClick={tool.action}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
                    >
                      <div
                        className={`p-2 rounded-lg ${tool.color} text-white group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-800 text-sm">{tool.name}</div>
                        <div className="text-xs text-gray-500">{tool.description}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 快速操作 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">快速操作</h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/conversations")}
                  className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">查看对话历史</span>
                </button>
                <button
                  onClick={() => router.push("/favorites")}
                  className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">我的收藏</span>
                </button>
                <button
                  onClick={() => router.push("/community")}
                  className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">学习社区</span>
                </button>
                <button
                  onClick={() => router.push("/analytics")}
                  className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">学习分析</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
