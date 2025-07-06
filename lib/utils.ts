import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化百分比
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

// 格式化货币
export function formatCurrency(value: number): string {
  return `¥${value.toLocaleString("zh-CN")}`
}

// 格式化日期
export function formatDate(date: Date): string {
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// 格式化时间
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// 获取状态颜色
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    success: "text-green-400",
    warning: "text-yellow-400",
    error: "text-red-400",
    normal: "text-green-400",
    warning: "text-yellow-400",
    error: "text-red-400",
    充足: "text-green-400",
    正常: "text-green-400",
    偏低: "text-yellow-400",
    需检修: "text-yellow-400",
  }

  return statusMap[status] || "text-blue-400"
}

// 生成随机ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
