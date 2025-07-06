// 模拟API客户端，未来可替换为真实API调用

import type { PerformanceMetric, Resource, Complaint, EquipmentStatus, ActionRecommendation, AlertLevel } from "@/types"

// 模拟获取性能指标
export async function getPerformanceMetrics(): Promise<PerformanceMetric[]> {
  // 模拟API延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    { name: "客房入住率", value: 78.4, target: 75, status: "success", trend: "up" },
    { name: "娱乐区客流量", value: 65.2, target: 60, status: "success", trend: "stable" },
    { name: "餐饮翻台率", value: 82.1, target: 80, status: "success", trend: "up" },
    { name: "客户满意度", value: 4.7, target: 4.5, status: "success", trend: "up" },
    { name: "员工效能", value: 92.3, target: 90, status: "success", trend: "up" },
  ]
}

// 模拟获取资源状态
export async function getResources(): Promise<Resource[]> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  return [
    { type: "human", name: "前台接待", status: "充足", quantity: 8 },
    { type: "human", name: "客房服务", status: "充足", quantity: 14 },
    { type: "human", name: "餐饮服务", status: "充足", quantity: 12 },
    { type: "human", name: "安保人员", status: "充足", quantity: 8 },
    { type: "material", name: "客房用品", status: "充足" },
    { type: "material", name: "餐饮原料", status: "充足" },
    { type: "material", name: "清洁用品", status: "充足" },
    { type: "material", name: "维修配件", status: "偏低" },
    { type: "equipment", name: "空调系统", status: "正常" },
    { type: "equipment", name: "电梯系统", status: "正常" },
    { type: "equipment", name: "安防系统", status: "正常" },
    { type: "equipment", name: "厨房设备", status: "需检修" },
  ]
}

// 模拟获取警报状态
export async function getAlertStatus(): Promise<{
  level: AlertLevel
  complaints: Complaint[]
  equipmentIssues: EquipmentStatus[]
}> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    level: "medium",
    complaints: [
      { type: "噪音问题", count: 3, status: "pending", priority: "medium" },
      { type: "设施故障", count: 2, status: "pending", priority: "medium" },
      { type: "服务态度", count: 1, status: "resolved", priority: "low" },
      { type: "其他问题", count: 0, status: "resolved", priority: "low" },
    ],
    equipmentIssues: [
      { name: "空调系统", status: "normal" },
      { name: "电梯系统", status: "normal" },
      { name: "热水系统", status: "warning" },
      { name: "厨房设备", status: "warning" },
    ],
  }
}

// 模拟获取行动建议
export async function getActionRecommendations(): Promise<ActionRecommendation[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  return [
    { id: 1, description: "增加SPA区人力配置，应对18:00-21:00客流高峰", priority: 1, impact: "high" },
    { id: 2, description: "安排厨房设备检修，避免影响晚餐服务质量", priority: 2, impact: "high" },
    { id: 3, description: "针对噪音投诉，调整502-508房间的隔音措施", priority: 3, impact: "medium" },
    { id: 4, description: "周末增加20%客房服务人员，应对入住高峰", priority: 1, impact: "high" },
    { id: 5, description: "提前备货高需求餐饮原料，优化厨房工作流程", priority: 2, impact: "medium" },
    { id: 6, description: "调整会议厅设备配置，满足周末活动需求", priority: 3, impact: "medium" },
  ]
}
