export interface SearchHistory {
  id: string
  question: string
  answer?: string
  timestamp: number
  tags: string[]
  category: string
}

export class HistoryManager {
  private static readonly STORAGE_KEY = "ai-search-history"
  private static readonly MAX_HISTORY = 100

  static addHistory(question: string, answer?: string, category = "搜索", tags: string[] = []): void {
    if (typeof window === "undefined") return

    try {
      const history = this.getHistory()
      const newItem: SearchHistory = {
        id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        question: question.trim(),
        answer: answer || "",
        timestamp: Date.now(),
        tags: Array.isArray(tags) ? tags : [],
        category: category || "搜索",
      }

      // 检查是否已存在相同问题
      const existingIndex = history.findIndex((item) => item.question === newItem.question)
      if (existingIndex !== -1) {
        // 更新现有记录的时间戳
        history[existingIndex].timestamp = newItem.timestamp
        if (answer) {
          history[existingIndex].answer = answer
        }
      } else {
        // 添加新记录
        history.unshift(newItem)
      }

      // 限制历史记录数量
      const limitedHistory = history.slice(0, this.MAX_HISTORY)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedHistory))
    } catch (error) {
      console.error("保存搜索历史失败:", error)
    }
  }

  static getHistory(): SearchHistory[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const parsed = JSON.parse(stored)
      if (!Array.isArray(parsed)) return []

      // 确保每个历史记录都有必需的字段
      return parsed.map((item: any) => ({
        id: item.id || `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        question: item.question || "",
        answer: item.answer || "",
        timestamp: item.timestamp || Date.now(),
        tags: Array.isArray(item.tags) ? item.tags : [],
        category: item.category || "搜索",
      }))
    } catch (error) {
      console.error("获取搜索历史失败:", error)
      return []
    }
  }

  static removeHistory(id: string): void {
    if (typeof window === "undefined") return

    try {
      const history = this.getHistory()
      const filtered = history.filter((item) => item.id !== id)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error("删除搜索历史失败:", error)
    }
  }

  static clearHistory(): void {
    if (typeof window === "undefined") return

    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error("清除搜索历史失败:", error)
    }
  }

  static searchHistory(query: string): SearchHistory[] {
    if (!query || typeof query !== "string") return []

    try {
      const history = this.getHistory()
      const lowerQuery = query.toLowerCase().trim()

      if (!lowerQuery) return history.slice(0, 10)

      return history.filter((item) => {
        if (!item || typeof item !== "object") return false

        // 安全检查每个字段
        const question = (item.question || "").toLowerCase()
        const answer = (item.answer || "").toLowerCase()
        const category = (item.category || "").toLowerCase()
        const tags = Array.isArray(item.tags) ? item.tags : []

        // 检查问题匹配
        if (question.includes(lowerQuery)) return true

        // 检查答案匹配
        if (answer.includes(lowerQuery)) return true

        // 检查分类匹配
        if (category.includes(lowerQuery)) return true

        // 安全检查标签匹配
        try {
          return tags.some((tag) => {
            if (typeof tag !== "string") return false
            return tag.toLowerCase().includes(lowerQuery)
          })
        } catch (tagError) {
          console.warn("标签检查出错:", tagError)
          return false
        }
      })
    } catch (error) {
      console.error("搜索历史记录失败:", error)
      return []
    }
  }

  static getRecentHistory(limit = 10): SearchHistory[] {
    try {
      const history = this.getHistory()
      return history.slice(0, Math.max(0, limit))
    } catch (error) {
      console.error("获取最近历史失败:", error)
      return []
    }
  }

  static getPopularSearches(limit = 5): { query: string; count: number }[] {
    try {
      const history = this.getHistory()
      const queryCount: { [key: string]: number } = {}

      history.forEach((item) => {
        if (item && item.question && typeof item.question === "string") {
          const query = item.question.trim()
          if (query) {
            queryCount[query] = (queryCount[query] || 0) + 1
          }
        }
      })

      return Object.entries(queryCount)
        .map(([query, count]) => ({ query, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, Math.max(0, limit))
    } catch (error) {
      console.error("获取热门搜索失败:", error)
      return []
    }
  }

  static getHistoryByCategory(category: string): SearchHistory[] {
    if (!category || typeof category !== "string") return []

    try {
      const history = this.getHistory()
      return history.filter((item) => {
        return item && item.category === category
      })
    } catch (error) {
      console.error("按分类获取历史失败:", error)
      return []
    }
  }

  static getHistoryByDateRange(startDate: Date, endDate: Date): SearchHistory[] {
    if (!startDate || !endDate || !(startDate instanceof Date) || !(endDate instanceof Date)) {
      return []
    }

    try {
      const start = startDate.getTime()
      const end = endDate.getTime()
      const history = this.getHistory()

      return history.filter((item) => {
        if (!item || typeof item.timestamp !== "number") return false
        return item.timestamp >= start && item.timestamp <= end
      })
    } catch (error) {
      console.error("按日期范围获取历史失败:", error)
      return []
    }
  }

  static exportHistory(): string {
    try {
      const history = this.getHistory()
      return JSON.stringify(history, null, 2)
    } catch (error) {
      console.error("导出历史失败:", error)
      return "[]"
    }
  }

  static importHistory(jsonData: string): boolean {
    if (!jsonData || typeof jsonData !== "string") return false

    try {
      const imported = JSON.parse(jsonData)
      if (!Array.isArray(imported)) return false

      // 验证导入的数据格式
      const validHistory = imported
        .filter((item) => {
          return (
            item && typeof item === "object" && typeof item.question === "string" && typeof item.timestamp === "number"
          )
        })
        .map((item) => ({
          id: item.id || `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          question: item.question,
          answer: item.answer || "",
          timestamp: item.timestamp,
          tags: Array.isArray(item.tags) ? item.tags : [],
          category: item.category || "搜索",
        }))

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(validHistory))
      return true
    } catch (error) {
      console.error("导入搜索历史失败:", error)
      return false
    }
  }

  static validateHistoryItem(item: any): item is SearchHistory {
    return (
      item &&
      typeof item === "object" &&
      typeof item.id === "string" &&
      typeof item.question === "string" &&
      typeof item.timestamp === "number" &&
      Array.isArray(item.tags) &&
      typeof item.category === "string"
    )
  }

  static repairHistory(): void {
    try {
      const history = this.getHistory()
      const repairedHistory = history.map((item) => ({
        id: item.id || `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        question: item.question || "",
        answer: item.answer || "",
        timestamp: item.timestamp || Date.now(),
        tags: Array.isArray(item.tags) ? item.tags : [],
        category: item.category || "搜索",
      }))

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(repairedHistory))
    } catch (error) {
      console.error("修复历史记录失败:", error)
    }
  }
}
