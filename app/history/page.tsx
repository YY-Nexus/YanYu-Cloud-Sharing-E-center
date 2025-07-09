"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Trash2,
  Star,
  Download,
  Upload,
  Mic,
  FileText,
  ImageIcon,
  ArrowLeft,
  Clock,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { HistoryManager, type SearchHistory, type HistoryStats } from "@/lib/history"

export default function HistoryPage() {
  const [history, setHistory] = useState<SearchHistory[]>([])
  const [filteredHistory, setFilteredHistory] = useState<SearchHistory[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [stats, setStats] = useState<HistoryStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showExportModal, setShowExportModal] = useState(false)

  const router = useRouter()

  useEffect(() => {
    loadHistory()
    loadStats()
  }, [])

  useEffect(() => {
    filterHistory()
  }, [history, searchQuery, selectedCategory])

  const loadHistory = () => {
    setLoading(true)
    try {
      const historyData = HistoryManager.getHistory()
      setHistory(historyData)
    } catch (error) {
      console.error("加载历史记录失败:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = () => {
    try {
      const statsData = HistoryManager.getHistoryStats()
      setStats(statsData)
    } catch (error) {
      console.error("加载统计数据失败:", error)
    }
  }

  const filterHistory = () => {
    let filtered = history

    // 按搜索查询过滤
    if (searchQuery.trim()) {
      filtered = HistoryManager.searchHistory(searchQuery)
    }

    // 按分类过滤
    if (selectedCategory !== "all") {
      if (selectedCategory === "favorites") {
        filtered = filtered.filter((item) => item.isFavorite)
      } else {
        filtered = filtered.filter((item) => item.category === selectedCategory)
      }
    }

    setFilteredHistory(filtered)
  }

  const handleSearch = (item: SearchHistory) => {
    const params = new URLSearchParams({
      q: item.question,
      type: "text",
    })
    router.push(`/thinking?${params.toString()}`)
  }

  const handleToggleFavorite = (id: string) => {
    const newFavoriteStatus = HistoryManager.toggleFavorite(id)
    loadHistory()
    loadStats()
  }

  const handleDeleteItem = (id: string) => {
    if (confirm("确定要删除这条历史记录吗？")) {
      HistoryManager.deleteHistory(id)
      loadHistory()
      loadStats()
    }
  }

  const handleDeleteSelected = () => {
    if (selectedItems.size === 0) return

    if (confirm(`确定要删除选中的 ${selectedItems.size} 条记录吗？`)) {
      const deletedCount = HistoryManager.deleteMultipleHistory(Array.from(selectedItems))
      setSelectedItems(new Set())
      loadHistory()
      loadStats()
      alert(`已删除 ${deletedCount} 条记录`)
    }
  }

  const handleClearAll = () => {
    if (confirm("确定要清空所有历史记录吗？此操作不可撤销。")) {
      HistoryManager.clearHistory()
      loadHistory()
      loadStats()
    }
  }

  const handleExport = (format: "json" | "csv") => {
    try {
      const exportData = HistoryManager.exportHistory(format)
      const blob = new Blob([exportData], {
        type: format === "json" ? "application/json" : "text/csv",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `search-history.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setShowExportModal(false)
    } catch (error) {
      console.error("导出失败:", error)
      alert("导出失败，请稍后重试")
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const format = file.name.endsWith(".csv") ? "csv" : "json"
        const importedCount = HistoryManager.importHistory(content, format)
        loadHistory()
        loadStats()
        alert(`成功导入 ${importedCount} 条记录`)
      } catch (error) {
        console.error("导入失败:", error)
        alert("导入失败：" + (error instanceof Error ? error.message : "未知错误"))
      }
    }
    reader.readAsText(file)
  }

  const handleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItems(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedItems.size === filteredHistory.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(filteredHistory.map((item) => item.id!)))
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "voice":
        return <Mic className="w-4 h-4 text-green-500" />
      case "image":
        return <ImageIcon className="w-4 h-4 text-blue-500" />
      case "file":
        return <FileText className="w-4 h-4 text-purple-500" />
      default:
        return <Search className="w-4 h-4 text-gray-500" />
    }
  }

  const categories = [
    { id: "all", name: "全部", count: history.length },
    { id: "favorites", name: "收藏", count: history.filter((item) => item.isFavorite).length },
    ...Array.from(new Set(history.map((item) => item.category))).map((category) => ({
      id: category,
      name: category,
      count: history.filter((item) => item.category === category).length,
    })),
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">加载历史记录中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">搜索历史</h1>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowExportModal(true)}>
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
              <label>
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    导入
                  </span>
                </Button>
                <input type="file" accept=".json,.csv" onChange={handleImport} className="hidden" />
              </label>
              {selectedItems.size > 0 && (
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  删除选中 ({selectedItems.size})
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计信息 */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Search className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSearches}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">总搜索次数</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.favoriteCount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">收藏数量</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageRating}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">平均评分</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-purple-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.topCategories[0]?.category || "无"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">热门分类</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏 - 分类和过滤 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">筛选</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 搜索框 */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索历史记录..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* 分类过滤 */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">分类</h4>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category.id
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" size="sm" onClick={handleSelectAll} className="w-full mb-2 bg-transparent">
                    {selectedItems.size === filteredHistory.length ? "取消全选" : "全选"}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleClearAll} className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    清空历史
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 主内容区域 */}
          <div className="lg:col-span-3">
            {filteredHistory.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {searchQuery || selectedCategory !== "all" ? "未找到匹配的记录" : "暂无搜索历史"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchQuery || selectedCategory !== "all"
                      ? "尝试调整搜索条件或筛选器"
                      : "开始搜索后，您的历史记录将显示在这里"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredHistory.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.id!)}
                            onChange={() => handleSelectItem(item.id!)}
                            className="mt-1"
                          />

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getTypeIcon("text")}
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</span>
                            </div>

                            <h3
                              className="font-medium text-gray-900 dark:text-white mb-2 cursor-pointer hover:text-blue-600"
                              onClick={() => handleSearch(item)}
                            >
                              {item.question}
                            </h3>

                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{item.answer}</p>

                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {item.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {item.rating && (
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= item.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleToggleFavorite(item.id!)}>
                            <Star
                              className={`w-4 h-4 ${
                                item.isFavorite ? "text-yellow-400 fill-current" : "text-gray-400"
                              }`}
                            />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id!)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 导出模态框 */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">导出历史记录</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">选择导出格式：</p>
            <div className="flex space-x-3">
              <Button onClick={() => handleExport("json")} className="flex-1">
                JSON 格式
              </Button>
              <Button onClick={() => handleExport("csv")} variant="outline" className="flex-1">
                CSV 格式
              </Button>
            </div>
            <Button variant="ghost" onClick={() => setShowExportModal(false)} className="w-full mt-3">
              取消
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
