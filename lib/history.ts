export interface SearchHistory {
  id: string
  question: string
  timestamp: number
  category?: string
}

export class HistoryManager {
  private static readonly STORAGE_KEY = "ai-search-history"
  private static readonly MAX_HISTORY = 100

  static addHistory(question: string, category?: string): void {
    try {
      const history = this.getHistory()
      const newItem: SearchHistory = {
        id: Date.now().toString(),
        question: question.trim(),
        timestamp: Date.now(),
        category,
      }

      // 避免重复添加相同问题
      const filtered = history.filter((item) => item.question !== question.trim())
      const updated = [newItem, ...filtered].slice(0, this.MAX_HISTORY)

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("添加历史记录失败:", error)
    }
  }

  static getHistory(): SearchHistory[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      console.error("获取历史记录失败:", error)
      return []
    }
  }

  static removeHistory(id: string): void {
    try {
      const history = this.getHistory()
      const filtered = history.filter((item) => item.id !== id)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error("删除历史记录失败:", error)
    }
  }

  static clearHistory(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error("清除历史记录失败:", error)
    }
  }

  static searchHistory(query: string): SearchHistory[] {
    try {
      const history = this.getHistory()
      const lowercaseQuery = query.toLowerCase()
      return history.filter((item) => item.question.toLowerCase().includes(lowercaseQuery))
    } catch (error) {
      console.error("搜索历史记录失败:", error)
      return []
    }
  }

  static getRecentHistory(limit = 10): SearchHistory[] {
    try {
      const history = this.getHistory()
      return history.slice(0, limit)
    } catch (error) {
      console.error("获取最近历史记录失败:", error)
      return []
    }
  }

  static getCategoryHistory(category: string): SearchHistory[] {
    try {
      const history = this.getHistory()
      return history.filter((item) => item.category === category)
    } catch (error) {
      console.error("获取分类历史记录失败:", error)
      return []
    }
  }
}
