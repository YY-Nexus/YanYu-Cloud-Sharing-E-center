export interface PPTSlide {
  id: string
  title: string
  content: string
  type: "title" | "content" | "image" | "chart" | "quote"
  layout: string
  notes?: string
}

export interface PPTTemplate {
  id: string
  name: string
  category: string
  description: string
  preview: string
  features: string[]
  colorSchemes: string[]
  layouts: string[]
}

export interface PPTConfig {
  template: string
  title: string
  author: string
  theme: string
  colorScheme: string
  footer?: string
  watermark?: boolean
  createdAt: string
}

export interface GeneratedPPT {
  id: string
  title: string
  slides: PPTSlide[]
  config: PPTConfig
  htmlContent: string
  createdAt: string
  updatedAt: string
}

export class PPTGenerator {
  private static readonly STORAGE_KEY = "ai-generated-ppts"
  private static readonly MAX_PPTS = 50

  // 预设模板
  static getTemplates(): PPTTemplate[] {
    return [
      {
        id: "business-presentation",
        name: "商务演示",
        category: "商务",
        description: "专业的商务演示模板",
        preview: "/placeholder.svg?height=300&width=400",
        features: ["专业布局", "图表支持", "数据展示"],
        colorSchemes: ["blue", "gray", "navy"],
        layouts: ["title-slide", "content-slide", "chart-slide"],
      },
      {
        id: "educational-course",
        name: "教育课程",
        category: "教育",
        description: "适合教学和培训的课程模板",
        preview: "/placeholder.svg?height=300&width=400",
        features: ["清晰结构", "互动元素", "知识点突出"],
        colorSchemes: ["green", "blue", "orange"],
        layouts: ["lesson-intro", "content-detail", "summary"],
      },
      {
        id: "creative-proposal",
        name: "创意提案",
        category: "创意",
        description: "富有创意的提案展示模板",
        preview: "/placeholder.svg?height=300&width=400",
        features: ["创新设计", "视觉冲击", "故事叙述"],
        colorSchemes: ["purple", "pink", "gradient"],
        layouts: ["creative-title", "story-flow", "impact-slide"],
      },
      {
        id: "product-launch",
        name: "产品发布",
        category: "产品",
        description: "产品发布会专用模板",
        preview: "/placeholder.svg?height=300&width=400",
        features: ["产品展示", "特性介绍", "市场分析"],
        colorSchemes: ["red", "black", "modern"],
        layouts: ["product-hero", "feature-grid", "comparison"],
      },
      {
        id: "financial-report",
        name: "财务报告",
        category: "财务",
        description: "专业的财务数据展示模板",
        preview: "/placeholder.svg?height=300&width=400",
        features: ["数据图表", "趋势分析", "专业格式"],
        colorSchemes: ["blue", "green", "corporate"],
        layouts: ["data-overview", "chart-focus", "summary-table"],
      },
      {
        id: "team-meeting",
        name: "团队会议",
        category: "会议",
        description: "团队会议和讨论用模板",
        preview: "/placeholder.svg?height=300&width=400",
        features: ["议程清单", "讨论要点", "行动计划"],
        colorSchemes: ["teal", "orange", "neutral"],
        layouts: ["agenda-slide", "discussion-point", "action-items"],
      },
    ]
  }

  // 生成AI幻灯片内容
  static async generateAISlides(topic: string, slideCount: number, theme: string): Promise<PPTSlide[]> {
    // 模拟AI内容生成
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const slides: PPTSlide[] = []

    // 生成标题页
    slides.push({
      id: "1",
      title: topic,
      content: `关于${topic}的专业演示\n\n由AI智能生成\n${new Date().toLocaleDateString()}`,
      type: "title",
      layout: "title-slide",
      notes: "这是演示的开场页面，介绍主题和基本信息",
    })

    // 生成目录页
    slides.push({
      id: "2",
      title: "目录",
      content: `1. 概述\n2. 主要内容\n3. 详细分析\n4. 实际应用\n5. 总结与展望`,
      type: "content",
      layout: "content-slide",
      notes: "演示的整体结构和主要章节",
    })

    // 生成内容页
    for (let i = 3; i <= slideCount; i++) {
      const slideTypes: Array<PPTSlide["type"]> = ["content", "image", "chart", "quote"]
      const randomType = slideTypes[Math.floor(Math.random() * slideTypes.length)]

      slides.push({
        id: i.toString(),
        title: `${topic} - 第${i - 2}部分`,
        content: this.generateSlideContent(topic, randomType, i - 2),
        type: randomType,
        layout: this.getLayoutForType(randomType),
        notes: `这是关于${topic}的第${i - 2}个要点的详细说明`,
      })
    }

    return slides
  }

  // 生成幻灯片内容
  private static generateSlideContent(topic: string, type: PPTSlide["type"], index: number): string {
    switch (type) {
      case "content":
        return `关于${topic}的重要观点：\n\n• 核心概念和基础理论\n• 实际应用场景分析\n• 关键成功因素\n• 潜在挑战和解决方案\n\n这些内容将帮助您更好地理解${topic}的核心价值。`

      case "image":
        return `${topic}的视觉展示\n\n[此处应包含相关图片或图表]\n\n图片说明：展示${topic}的实际应用效果和视觉呈现，帮助观众更直观地理解概念。`

      case "chart":
        return `${topic}数据分析\n\n[数据图表展示]\n\n• 趋势分析：显示${topic}的发展趋势\n• 对比数据：与其他方案的比较\n• 预测模型：未来发展预期\n\n数据来源：AI分析和行业报告`

      case "quote":
        return `"${topic}代表了未来发展的重要方向，它不仅改变了我们的工作方式，更重要的是为我们提供了新的思考角度。"\n\n—— 行业专家观点\n\n这个观点强调了${topic}的重要性和深远影响。`

      default:
        return `${topic}的详细内容将在这里展示，包括相关的理论基础、实践经验和未来展望。`
    }
  }

  // 根据类型获取布局
  private static getLayoutForType(type: PPTSlide["type"]): string {
    const layouts = {
      title: "title-slide",
      content: "content-slide",
      image: "image-slide",
      chart: "chart-slide",
      quote: "quote-slide",
    }
    return layouts[type] || "content-slide"
  }

  // 创建PPT
  static async createPPT(slides: PPTSlide[], config: PPTConfig): Promise<GeneratedPPT> {
    const id = Date.now().toString()
    const htmlContent = this.generateHTML(slides, config)

    const ppt: GeneratedPPT = {
      id,
      title: config.title,
      slides,
      config,
      htmlContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // 保存到本地存储
    this.savePPT(ppt)

    return ppt
  }

  // 生成HTML内容
  private static generateHTML(slides: PPTSlide[], config: PPTConfig): string {
    const colors = this.getColorScheme(config.colorScheme)

    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Microsoft YaHei', Arial, sans-serif; 
            background: linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10);
            overflow: hidden;
        }
        .presentation { width: 100vw; height: 100vh; position: relative; }
        .slide { 
            width: 100%; height: 100%; 
            display: none; padding: 60px; 
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .slide.active { display: flex; flex-direction: column; justify-content: center; }
        .slide h1 { 
            font-size: 3em; color: ${colors.primary}; 
            margin-bottom: 30px; text-align: center;
        }
        .slide h2 { 
            font-size: 2.5em; color: ${colors.primary}; 
            margin-bottom: 25px;
        }
        .slide .content { 
            font-size: 1.4em; line-height: 1.8; 
            color: #333; white-space: pre-line;
        }
        .navigation { 
            position: fixed; bottom: 30px; left: 50%; 
            transform: translateX(-50%); z-index: 1000;
            background: rgba(0,0,0,0.8); padding: 10px 20px; 
            border-radius: 25px; color: white;
        }
        .nav-btn { 
            background: none; border: none; color: white; 
            padding: 8px 15px; margin: 0 5px; cursor: pointer;
            border-radius: 15px; transition: background 0.3s;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.2); }
        .slide-counter { margin: 0 15px; }
        .title-slide { text-align: center; }
        .title-slide h1 { font-size: 4em; margin-bottom: 40px; }
        .quote-slide { text-align: center; font-style: italic; }
        .quote-slide .content { font-size: 1.8em; color: ${colors.secondary}; }
        ${
          config.watermark
            ? `
        .watermark { 
            position: fixed; bottom: 10px; right: 20px; 
            opacity: 0.3; font-size: 12px; color: #666;
        }`
            : ""
        }
    </style>
</head>
<body>
    <div class="presentation">
        ${slides
          .map(
            (slide, index) => `
        <div class="slide ${slide.type === "title" ? "title-slide" : ""} ${slide.type === "quote" ? "quote-slide" : ""}" data-index="${index}">
            ${slide.type === "title" ? `<h1>${slide.title}</h1>` : `<h2>${slide.title}</h2>`}
            <div class="content">${slide.content}</div>
        </div>
        `,
          )
          .join("")}
    </div>
    
    <div class="navigation">
        <button class="nav-btn" onclick="previousSlide()">◀ 上一页</button>
        <span class="slide-counter">
            <span id="current">1</span> / <span id="total">${slides.length}</span>
        </span>
        <button class="nav-btn" onclick="nextSlide()">下一页 ▶</button>
    </div>
    
    ${config.watermark ? '<div class="watermark">AI Generated PPT</div>' : ""}
    
    <script>
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            document.getElementById('current').textContent = index + 1;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        function previousSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }
        
        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
            if (e.key === 'ArrowLeft') previousSlide();
            if (e.key === 'Escape') document.exitFullscreen?.();
        });
        
        // 初始化
        showSlide(0);
        document.getElementById('total').textContent = totalSlides;
    </script>
</body>
</html>
    `
  }

  // 获取配色方案
  private static getColorScheme(scheme: string) {
    const schemes = {
      blue: { primary: "#2563eb", secondary: "#3b82f6" },
      green: { primary: "#059669", secondary: "#10b981" },
      purple: { primary: "#7c3aed", secondary: "#8b5cf6" },
      red: { primary: "#dc2626", secondary: "#ef4444" },
      orange: { primary: "#ea580c", secondary: "#f97316" },
      gray: { primary: "#374151", secondary: "#4b5563" },
    }
    return schemes[scheme] || schemes.blue
  }

  // 保存PPT
  private static savePPT(ppt: GeneratedPPT): void {
    if (typeof window === "undefined") return

    try {
      const ppts = this.getPPTs()
      ppts.unshift(ppt)

      // 限制数量
      if (ppts.length > this.MAX_PPTS) {
        ppts.splice(this.MAX_PPTS)
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ppts))
    } catch (error) {
      console.error("保存PPT失败:", error)
    }
  }

  // 获取所有PPT
  static getPPTs(): GeneratedPPT[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // 获取单个PPT
  static getPPT(id: string): GeneratedPPT | null {
    const ppts = this.getPPTs()
    return ppts.find((p) => p.id === id) || null
  }

  // 删除PPT
  static deletePPT(id: string): void {
    if (typeof window === "undefined") return

    try {
      const ppts = this.getPPTs()
      const filtered = ppts.filter((p) => p.id !== id)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error("删除PPT失败:", error)
    }
  }

  // 下载PPT
  static async downloadPPT(id: string): Promise<void> {
    const ppt = this.getPPT(id)
    if (!ppt) throw new Error("PPT不存在")

    // 下载HTML文件
    const blob = new Blob([ppt.htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${ppt.title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "_")}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // 分析PPT并提供建议
  static async analyzePPT(id: string): Promise<string> {
    const ppt = this.getPPT(id)
    if (!ppt) throw new Error("PPT不存在")

    // 模拟AI分析
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const suggestions = [
      "建议在标题页添加更多视觉元素以增强吸引力",
      "内容页面可以增加更多图表和数据支撑",
      "考虑调整字体大小以提升可读性",
      "建议在结尾添加总结和行动计划",
      "可以考虑使用更丰富的配色方案",
      "建议增加互动元素以提升观众参与度",
    ]

    return suggestions[Math.floor(Math.random() * suggestions.length)]
  }
}
