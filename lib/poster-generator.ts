export interface PosterTemplate {
  id: string
  name: string
  category: string
  description: string
  preview: string
  features: string[]
  colorSchemes: string[]
  layouts: string[]
}

export interface PosterConfig {
  template: string
  title: string
  subtitle?: string
  content: string
  colorScheme: string
  layout: string
  size: "A4" | "A3" | "square" | "banner"
  author?: string
  watermark?: boolean
  createdAt: string
}

export interface GeneratedPoster {
  id: string
  title: string
  config: PosterConfig
  svgContent: string
  createdAt: string
  updatedAt: string
}

export class PosterGenerator {
  private static readonly STORAGE_KEY = "ai-generated-posters"
  private static readonly MAX_POSTERS = 50

  // 预设模板
  static getTemplates(): PosterTemplate[] {
    return [
      {
        id: "business-promo",
        name: "商务推广",
        category: "商务",
        description: "专业的商务推广海报模板",
        preview: "/modern-business-poster.png",
        features: ["专业设计", "企业风格", "高端配色"],
        colorSchemes: ["blue", "gray", "navy"],
        layouts: ["centered", "left-aligned", "grid"],
      },
      {
        id: "event-promotion",
        name: "活动宣传",
        category: "活动",
        description: "吸引眼球的活动宣传海报",
        preview: "/event-poster.png",
        features: ["醒目标题", "时间地点", "联系方式"],
        colorSchemes: ["red", "orange", "purple"],
        layouts: ["banner", "vertical", "square"],
      },
      {
        id: "product-showcase",
        name: "产品展示",
        category: "产品",
        description: "突出产品特色的展示海报",
        preview: "/generic-product-poster.png",
        features: ["产品图片", "特色介绍", "价格展示"],
        colorSchemes: ["green", "blue", "black"],
        layouts: ["product-focus", "feature-list", "comparison"],
      },
      {
        id: "educational",
        name: "教育培训",
        category: "教育",
        description: "清晰易读的教育培训海报",
        preview: "/education-poster.png",
        features: ["课程信息", "讲师介绍", "报名方式"],
        colorSchemes: ["blue", "green", "orange"],
        layouts: ["academic", "timeline", "grid"],
      },
      {
        id: "creative-art",
        name: "创意艺术",
        category: "艺术",
        description: "富有创意的艺术风格海报",
        preview: "/creative-art-poster.png",
        features: ["艺术字体", "创意布局", "丰富色彩"],
        colorSchemes: ["rainbow", "pastel", "vibrant"],
        layouts: ["artistic", "abstract", "collage"],
      },
      {
        id: "minimalist",
        name: "极简风格",
        category: "设计",
        description: "简洁优雅的极简主义海报",
        preview: "/minimalist-poster.png",
        features: ["简洁布局", "留白设计", "精选字体"],
        colorSchemes: ["monochrome", "minimal", "clean"],
        layouts: ["minimal", "text-focus", "geometric"],
      },
    ]
  }

  // 生成AI内容
  static async generateAIContent(
    topic: string,
    template: string,
  ): Promise<{
    title: string
    subtitle: string
    content: string
    suggestions: string[]
  }> {
    // 模拟AI内容生成
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const templates = this.getTemplates()
    const selectedTemplate = templates.find((t) => t.id === template)

    return {
      title: `${topic} - 专业海报`,
      subtitle: `基于${selectedTemplate?.name || "默认"}模板生成`,
      content: `这是关于"${topic}"的专业海报内容。AI已根据您选择的模板和主题，智能生成了适合的标题、副标题和主要内容。您可以进一步编辑和自定义这些内容以满足您的具体需求。`,
      suggestions: [
        "调整标题字体大小以增强视觉冲击力",
        "考虑添加相关图标或图片元素",
        "优化配色方案以提升整体美感",
        "调整布局以突出重点信息",
      ],
    }
  }

  // 创建海报
  static async createPoster(config: PosterConfig): Promise<GeneratedPoster> {
    const id = Date.now().toString()
    const svgContent = this.generateSVG(config)

    const poster: GeneratedPoster = {
      id,
      title: config.title,
      config,
      svgContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // 保存到本地存储
    this.savePoster(poster)

    return poster
  }

  // 生成SVG内容
  private static generateSVG(config: PosterConfig): string {
    const { title, subtitle, content, colorScheme, layout, size } = config

    // 根据尺寸设置画布大小
    const dimensions = this.getSizeDimensions(size)
    const colors = this.getColorScheme(colorScheme)

    return `
      <svg width="${dimensions.width}" height="${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:0.1" />
            <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:0.2" />
          </linearGradient>
        </defs>
        
        <!-- 背景 -->
        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        
        <!-- 主标题 -->
        <text x="50%" y="20%" text-anchor="middle" font-family="Arial, sans-serif" 
              font-size="36" font-weight="bold" fill="${colors.primary}">
          ${title}
        </text>
        
        ${
          subtitle
            ? `
        <!-- 副标题 -->
        <text x="50%" y="30%" text-anchor="middle" font-family="Arial, sans-serif" 
              font-size="24" fill="${colors.secondary}">
          ${subtitle}
        </text>
        `
            : ""
        }
        
        <!-- 主要内容 -->
        <foreignObject x="10%" y="40%" width="80%" height="50%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: ${colors.text};
            text-align: ${layout === "centered" ? "center" : "left"};
            padding: 20px;
          ">
            ${content}
          </div>
        </foreignObject>
        
        <!-- 装饰元素 -->
        <circle cx="10%" cy="10%" r="20" fill="${colors.accent}" opacity="0.3" />
        <circle cx="90%" cy="90%" r="30" fill="${colors.accent}" opacity="0.2" />
        
        ${
          config.watermark
            ? `
        <!-- 水印 -->
        <text x="95%" y="95%" text-anchor="end" font-family="Arial, sans-serif" 
              font-size="12" fill="${colors.text}" opacity="0.5">
          AI Generated
        </text>
        `
            : ""
        }
      </svg>
    `
  }

  // 获取尺寸配置
  private static getSizeDimensions(size: string) {
    const sizes = {
      A4: { width: 595, height: 842 },
      A3: { width: 842, height: 1191 },
      square: { width: 800, height: 800 },
      banner: { width: 1200, height: 400 },
    }
    return sizes[size] || sizes["A4"]
  }

  // 获取配色方案
  private static getColorScheme(scheme: string) {
    const schemes = {
      blue: {
        primary: "#2563eb",
        secondary: "#3b82f6",
        accent: "#60a5fa",
        text: "#1e293b",
      },
      red: {
        primary: "#dc2626",
        secondary: "#ef4444",
        accent: "#f87171",
        text: "#1e293b",
      },
      green: {
        primary: "#059669",
        secondary: "#10b981",
        accent: "#34d399",
        text: "#1e293b",
      },
      purple: {
        primary: "#7c3aed",
        secondary: "#8b5cf6",
        accent: "#a78bfa",
        text: "#1e293b",
      },
      orange: {
        primary: "#ea580c",
        secondary: "#f97316",
        accent: "#fb923c",
        text: "#1e293b",
      },
      gray: {
        primary: "#374151",
        secondary: "#4b5563",
        accent: "#6b7280",
        text: "#1e293b",
      },
    }
    return schemes[scheme] || schemes.blue
  }

  // 保存海报
  private static savePoster(poster: GeneratedPoster): void {
    if (typeof window === "undefined") return

    try {
      const posters = this.getPosters()
      posters.unshift(poster)

      // 限制数量
      if (posters.length > this.MAX_POSTERS) {
        posters.splice(this.MAX_POSTERS)
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(posters))
    } catch (error) {
      console.error("保存海报失败:", error)
    }
  }

  // 获取所有海报
  static getPosters(): GeneratedPoster[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // 获取单个海报
  static getPoster(id: string): GeneratedPoster | null {
    const posters = this.getPosters()
    return posters.find((p) => p.id === id) || null
  }

  // 删除海报
  static deletePoster(id: string): void {
    if (typeof window === "undefined") return

    try {
      const posters = this.getPosters()
      const filtered = posters.filter((p) => p.id !== id)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error("删除海报失败:", error)
    }
  }

  // 下载海报
  static async downloadPoster(id: string, format: "svg" | "png" = "svg"): Promise<void> {
    const poster = this.getPoster(id)
    if (!poster) throw new Error("海报不存在")

    if (format === "svg") {
      // 下载SVG
      const blob = new Blob([poster.svgContent], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${poster.title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "_")}.svg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      // 转换为PNG并下载
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      return new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx?.drawImage(img, 0, 0)

          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = `${poster.title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "_")}.png`
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
              resolve()
            } else {
              reject(new Error("转换PNG失败"))
            }
          })
        }

        img.onerror = () => reject(new Error("加载图片失败"))
        img.src = "data:image/svg+xml;base64," + btoa(poster.svgContent)
      })
    }
  }

  // 分析海报并提供建议
  static async analyzePoster(id: string): Promise<string> {
    const poster = this.getPoster(id)
    if (!poster) throw new Error("海报不存在")

    // 模拟AI分析
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const suggestions = [
      "标题字体可以更大一些以增强视觉冲击力",
      "考虑调整配色方案以提升整体美感",
      "内容布局可以更加平衡",
      "添加更多视觉元素会让海报更吸引人",
    ]

    return suggestions[Math.floor(Math.random() * suggestions.length)]
  }
}
