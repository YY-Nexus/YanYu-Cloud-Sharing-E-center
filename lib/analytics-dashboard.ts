"use client"

import React from "react"

export interface UserBehavior {
  id: string
  userId: string
  action: string
  target: string
  timestamp: Date
  metadata?: Record<string, any>
  sessionId: string
  userAgent: string
  ip?: string
}

export interface SearchAnalytics {
  query: string
  timestamp: Date
  userId: string
  resultCount: number
  clickedResults: string[]
  timeSpent: number
  satisfaction?: number
}

export interface ContentAnalytics {
  contentId: string
  contentType: "ppt" | "poster" | "mindmap" | "webpage" | "learning-path"
  views: number
  shares: number
  likes: number
  downloads: number
  avgRating: number
  createdAt: Date
  lastViewed: Date
}

export interface SystemMetrics {
  timestamp: Date
  activeUsers: number
  totalRequests: number
  avgResponseTime: number
  errorRate: number
  memoryUsage: number
  cpuUsage: number
}

export interface AnalyticsDashboardData {
  userBehaviors: UserBehavior[]
  searchAnalytics: SearchAnalytics[]
  contentAnalytics: ContentAnalytics[]
  systemMetrics: SystemMetrics[]
  summary: {
    totalUsers: number
    totalSearches: number
    totalContent: number
    avgSessionTime: number
    popularQueries: string[]
    topContent: ContentAnalytics[]
  }
}

export class AnalyticsCollector {
  private static instance: AnalyticsCollector
  private sessionId: string
  private userId: string | null = null
  private behaviors: UserBehavior[] = []
  private sessionStart: Date = new Date()

  private constructor() {
    this.sessionId = this.generateSessionId()
    this.init()
  }

  static getInstance(): AnalyticsCollector {
    if (!AnalyticsCollector.instance) {
      AnalyticsCollector.instance = new AnalyticsCollector()
    }
    return AnalyticsCollector.instance
  }

  private init(): void {
    if (typeof window === "undefined") return

    // 监听页面卸载，保存数据
    window.addEventListener("beforeunload", () => {
      this.saveBehaviors()
    })

    // 定期保存数据
    setInterval(() => {
      this.saveBehaviors()
    }, 30000) // 每30秒保存一次

    // 监听用户交互
    this.setupEventListeners()
  }

  private setupEventListeners(): void {
    // 点击事件
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement
      this.trackBehavior("click", this.getElementSelector(target), {
        text: target.textContent?.slice(0, 100),
        tagName: target.tagName,
        className: target.className,
      })
    })

    // 滚动事件
    let scrollTimeout: NodeJS.Timeout
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        this.trackBehavior("scroll", window.location.pathname, {
          scrollY: window.scrollY,
          scrollPercent: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
        })
      }, 1000)
    })

    // 表单提交
    document.addEventListener("submit", (e) => {
      const form = e.target as HTMLFormElement
      this.trackBehavior("form_submit", this.getElementSelector(form), {
        action: form.action,
        method: form.method,
      })
    })
  }

  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  private getElementSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`
    if (element.className) return `.${element.className.split(" ")[0]}`
    return element.tagName.toLowerCase()
  }

  // 设置用户ID
  setUserId(userId: string): void {
    this.userId = userId
  }

  // 跟踪用户行为
  trackBehavior(action: string, target: string, metadata?: Record<string, any>): void {
    const behavior: UserBehavior = {
      id: Date.now().toString(),
      userId: this.userId || "anonymous",
      action,
      target,
      timestamp: new Date(),
      metadata,
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
    }

    this.behaviors.push(behavior)

    // 如果行为数量过多，立即保存
    if (this.behaviors.length >= 50) {
      this.saveBehaviors()
    }
  }

  // 跟踪搜索
  trackSearch(query: string, resultCount: number): void {
    this.trackBehavior("search", query, {
      resultCount,
      timestamp: new Date().toISOString(),
    })
  }

  // 跟踪内容查看
  trackContentView(contentId: string, contentType: string): void {
    this.trackBehavior("content_view", contentId, {
      contentType,
      timestamp: new Date().toISOString(),
    })
  }

  // 跟踪内容分享
  trackContentShare(contentId: string, platform: string): void {
    this.trackBehavior("content_share", contentId, {
      platform,
      timestamp: new Date().toISOString(),
    })
  }

  // 跟踪内容下载
  trackContentDownload(contentId: string, contentType: string): void {
    this.trackBehavior("content_download", contentId, {
      contentType,
      timestamp: new Date().toISOString(),
    })
  }

  // 跟踪错误
  trackError(error: string, context?: string): void {
    this.trackBehavior("error", error, {
      context,
      stack: new Error().stack,
      timestamp: new Date().toISOString(),
    })
  }

  // 保存行为数据
  private saveBehaviors(): void {
    if (this.behaviors.length === 0) return

    try {
      // 保存到本地存储
      const stored = localStorage.getItem("analytics_behaviors") || "[]"
      const existingBehaviors = JSON.parse(stored)
      const allBehaviors = [...existingBehaviors, ...this.behaviors]

      // 限制存储数量
      if (allBehaviors.length > 1000) {
        allBehaviors.splice(0, allBehaviors.length - 1000)
      }

      localStorage.setItem("analytics_behaviors", JSON.stringify(allBehaviors))

      // 发送到服务器（如果在线）
      if (navigator.onLine) {
        this.sendToServer(this.behaviors)
      }

      this.behaviors = []
    } catch (error) {
      console.error("保存行为数据失败:", error)
    }
  }

  // 发送到服务器
  private async sendToServer(behaviors: UserBehavior[]): Promise<void> {
    try {
      await fetch("/api/analytics/behaviors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          behaviors,
          sessionId: this.sessionId,
          sessionStart: this.sessionStart,
        }),
      })
    } catch (error) {
      console.error("发送分析数据失败:", error)
    }
  }

  // 获取会话统计
  getSessionStats() {
    const now = new Date()
    const sessionTime = now.getTime() - this.sessionStart.getTime()

    return {
      sessionId: this.sessionId,
      sessionTime: Math.round(sessionTime / 1000), // 秒
      behaviorCount: this.behaviors.length,
      userId: this.userId,
    }
  }
}

export class AnalyticsDashboard {
  private static readonly STORAGE_KEY = "analytics_dashboard_data"

  // 获取仪表板数据
  static async getDashboardData(): Promise<AnalyticsDashboardData> {
    try {
      // 从本地存储获取数据
      const localData = this.getLocalData()

      // 从服务器获取最新数据
      const serverData = await this.fetchServerData()

      // 合并数据
      return this.mergeData(localData, serverData)
    } catch (error) {
      console.error("获取仪表板数据失败:", error)
      return this.getEmptyDashboardData()
    }
  }

  // 从本地存储获取数据
  private static getLocalData(): Partial<AnalyticsDashboardData> {
    if (typeof window === "undefined") return {}

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  }

  // 从服务器获取数据
  private static async fetchServerData(): Promise<Partial<AnalyticsDashboardData>> {
    try {
      const response = await fetch("/api/analytics/dashboard")
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.error("获取服务器数据失败:", error)
    }
    return {}
  }

  // 合并数据
  private static mergeData(
    localData: Partial<AnalyticsDashboardData>,
    serverData: Partial<AnalyticsDashboardData>,
  ): AnalyticsDashboardData {
    return {
      userBehaviors: [...(localData.userBehaviors || []), ...(serverData.userBehaviors || [])],
      searchAnalytics: [...(localData.searchAnalytics || []), ...(serverData.searchAnalytics || [])],
      contentAnalytics: [...(localData.contentAnalytics || []), ...(serverData.contentAnalytics || [])],
      systemMetrics: [...(localData.systemMetrics || []), ...(serverData.systemMetrics || [])],
      summary: serverData.summary || this.calculateSummary(localData),
    }
  }

  // 计算摘要数据
  private static calculateSummary(data: Partial<AnalyticsDashboardData>) {
    const behaviors = data.userBehaviors || []
    const searches = data.searchAnalytics || []
    const content = data.contentAnalytics || []

    // 计算独特用户数
    const uniqueUsers = new Set(behaviors.map((b) => b.userId)).size

    // 计算平均会话时间
    const sessions = new Map<string, Date[]>()
    behaviors.forEach((b) => {
      if (!sessions.has(b.sessionId)) {
        sessions.set(b.sessionId, [])
      }
      sessions.get(b.sessionId)!.push(b.timestamp)
    })

    let totalSessionTime = 0
    sessions.forEach((timestamps) => {
      if (timestamps.length > 1) {
        const sorted = timestamps.sort((a, b) => a.getTime() - b.getTime())
        const sessionTime = sorted[sorted.length - 1].getTime() - sorted[0].getTime()
        totalSessionTime += sessionTime
      }
    })

    const avgSessionTime = sessions.size > 0 ? totalSessionTime / sessions.size / 1000 : 0

    // 计算热门查询
    const queryCount = new Map<string, number>()
    searches.forEach((s) => {
      queryCount.set(s.query, (queryCount.get(s.query) || 0) + 1)
    })
    const popularQueries = Array.from(queryCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([query]) => query)

    // 获取热门内容
    const topContent = content.sort((a, b) => b.views - a.views).slice(0, 10)

    return {
      totalUsers: uniqueUsers,
      totalSearches: searches.length,
      totalContent: content.length,
      avgSessionTime: Math.round(avgSessionTime),
      popularQueries,
      topContent,
    }
  }

  // 获取空的仪表板数据
  private static getEmptyDashboardData(): AnalyticsDashboardData {
    return {
      userBehaviors: [],
      searchAnalytics: [],
      contentAnalytics: [],
      systemMetrics: [],
      summary: {
        totalUsers: 0,
        totalSearches: 0,
        totalContent: 0,
        avgSessionTime: 0,
        popularQueries: [],
        topContent: [],
      },
    }
  }

  // 生成用户行为报告
  static generateBehaviorReport(behaviors: UserBehavior[]): any {
    const actionCounts = new Map<string, number>()
    const hourlyActivity = new Array(24).fill(0)
    const dailyActivity = new Map<string, number>()

    behaviors.forEach((behavior) => {
      // 统计行为类型
      actionCounts.set(behavior.action, (actionCounts.get(behavior.action) || 0) + 1)

      // 统计小时活动
      const hour = behavior.timestamp.getHours()
      hourlyActivity[hour]++

      // 统计日活动
      const day = behavior.timestamp.toDateString()
      dailyActivity.set(day, (dailyActivity.get(day) || 0) + 1)
    })

    return {
      totalBehaviors: behaviors.length,
      actionCounts: Object.fromEntries(actionCounts),
      hourlyActivity,
      dailyActivity: Object.fromEntries(dailyActivity),
      uniqueUsers: new Set(behaviors.map((b) => b.userId)).size,
      uniqueSessions: new Set(behaviors.map((b) => b.sessionId)).size,
    }
  }

  // 生成搜索分析报告
  static generateSearchReport(searches: SearchAnalytics[]): any {
    const queryFrequency = new Map<string, number>()
    const avgResultCounts = new Map<string, number[]>()
    let totalSatisfaction = 0
    let satisfactionCount = 0

    searches.forEach((search) => {
      queryFrequency.set(search.query, (queryFrequency.get(search.query) || 0) + 1)

      if (!avgResultCounts.has(search.query)) {
        avgResultCounts.set(search.query, [])
      }
      avgResultCounts.get(search.query)!.push(search.resultCount)

      if (search.satisfaction !== undefined) {
        totalSatisfaction += search.satisfaction
        satisfactionCount++
      }
    })

    const popularQueries = Array.from(queryFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)

    const avgSatisfaction = satisfactionCount > 0 ? totalSatisfaction / satisfactionCount : 0

    return {
      totalSearches: searches.length,
      uniqueQueries: queryFrequency.size,
      popularQueries,
      avgSatisfaction: Math.round(avgSatisfaction * 100) / 100,
      avgResultCount: searches.reduce((sum, s) => sum + s.resultCount, 0) / searches.length,
    }
  }
}

// 分析仪表板组件
export const AnalyticsDashboardComponent: React.FC = () => {
  const [data, setData] = React.useState<AnalyticsDashboardData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<"overview" | "users" | "content" | "system">("overview")

  React.useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const dashboardData = await AnalyticsDashboard.getDashboardData()
      setData(dashboardData)
    } catch (error) {
      console.error("加载仪表板数据失败:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!data) {
    return <div className="text-center text-gray-500 py-8">无法加载分析数据</div>
  }

  return (
    <div className="analytics-dashboard p-6">
      <h1 className="text-3xl font-bold mb-6">数据分析面板</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b">
        {[
          { key: "overview", label: "概览" },
          { key: "users", label: "用户行为" },
          { key: "content", label: "内容分析" },
          { key: "system", label: "系统指标" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.key ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 概览标签页 */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">总用户数</h3>
            <p className="text-3xl font-bold text-blue-600">{data.summary.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">总搜索次数</h3>
            <p className="text-3xl font-bold text-green-600">{data.summary.totalSearches}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">总内容数</h3>
            <p className="text-3xl font-bold text-purple-600">{data.summary.totalContent}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">平均会话时间</h3>
            <p className="text-3xl font-bold text-orange-600">{data.summary.avgSessionTime}s</p>
          </div>
        </div>
      )}

      {/* 用户行为标签页 */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">热门搜索查询</h3>
            <div className="space-y-2">
              {data.summary.popularQueries.slice(0, 10).map((query, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{query}</span>
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 内容分析标签页 */}
      {activeTab === "content" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">热门内容</h3>
            <div className="space-y-4">
              {data.summary.topContent.slice(0, 10).map((content, index) => (
                <div key={content.contentId} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <span className="font-medium">{content.contentType}</span>
                    <p className="text-sm text-gray-600">ID: {content.contentId}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{content.views} 次查看</p>
                    <p className="text-sm text-gray-600">{content.downloads} 次下载</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 系统指标标签页 */}
      {activeTab === "system" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">系统性能</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>平均响应时间</span>
                  <span className="font-semibold">
                    {data.systemMetrics.length > 0
                      ? Math.round(
                          data.systemMetrics.reduce((sum, m) => sum + m.avgResponseTime, 0) / data.systemMetrics.length,
                        )
                      : 0}
                    ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>错误率</span>
                  <span className="font-semibold">
                    {data.systemMetrics.length > 0
                      ? (
                          (data.systemMetrics.reduce((sum, m) => sum + m.errorRate, 0) / data.systemMetrics.length) *
                          100
                        ).toFixed(2)
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
  )
}
