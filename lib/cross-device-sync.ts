export interface DeviceInfo {
  id: string
  name: string
  type: "mobile" | "tablet" | "desktop" | "ar" | "vr" | "watch" | "tv"
  platform: string
  capabilities: string[]
  lastSeen: number
  isOnline: boolean
  location?: {
    latitude: number
    longitude: number
    accuracy: number
  }
}

export interface SyncData {
  id: string
  type: "settings" | "history" | "conversations" | "preferences" | "ai_memory" | "emotional_state"
  data: any
  timestamp: number
  deviceId: string
  userId: string
  version: number
  checksum: string
}

export interface SyncConflict {
  id: string
  type: string
  localData: any
  remoteData: any
  timestamp: number
  resolution?: "local" | "remote" | "merge" | "manual"
}

export interface CrossDeviceSession {
  id: string
  userId: string
  devices: DeviceInfo[]
  sharedState: any
  activeDevice: string
  handoffHistory: HandoffRecord[]
  createdAt: number
  lastActivity: number
}

export interface HandoffRecord {
  fromDevice: string
  toDevice: string
  context: any
  timestamp: number
  success: boolean
  continuationPoint: string
}

export class CrossDeviceSyncManager {
  private static instance: CrossDeviceSyncManager
  private syncQueue: SyncData[] = []
  private conflicts: SyncConflict[] = []
  private devices: Map<string, DeviceInfo> = new Map()
  private sessions: Map<string, CrossDeviceSession> = new Map()
  private syncInterval: NodeJS.Timeout | null = null

  static getInstance(): CrossDeviceSyncManager {
    if (!this.instance) {
      this.instance = new CrossDeviceSyncManager()
    }
    return this.instance
  }

  // 初始化跨设备同步
  async initialize(userId: string, deviceInfo: Partial<DeviceInfo>): Promise<void> {
    const device: DeviceInfo = {
      id: deviceInfo.id || this.generateDeviceId(),
      name: deviceInfo.name || this.getDefaultDeviceName(),
      type: deviceInfo.type || this.detectDeviceType(),
      platform: deviceInfo.platform || navigator.platform,
      capabilities: deviceInfo.capabilities || this.detectCapabilities(),
      lastSeen: Date.now(),
      isOnline: true,
      location: await this.getCurrentLocation(),
    }

    this.devices.set(device.id, device)

    // 启动同步服务
    this.startSyncService(userId, device.id)

    // 发现其他设备
    await this.discoverDevices(userId)

    // 创建或加入会话
    await this.createOrJoinSession(userId, device.id)
  }

  // 同步数据到云端和其他设备
  async syncData(data: Omit<SyncData, "id" | "timestamp" | "checksum">): Promise<void> {
    const syncData: SyncData = {
      id: this.generateSyncId(),
      timestamp: Date.now(),
      checksum: this.calculateChecksum(data.data),
      ...data,
    }

    // 添加到同步队列
    this.syncQueue.push(syncData)

    // 立即同步高优先级数据
    if (this.isHighPriority(syncData.type)) {
      await this.performSync(syncData)
    }
  }

  // 执行设备间切换
  async performHandoff(
    fromDeviceId: string,
    toDeviceId: string,
    context: any,
  ): Promise<{
    success: boolean
    continuationUrl?: string
    error?: string
  }> {
    try {
      const fromDevice = this.devices.get(fromDeviceId)
      const toDevice = this.devices.get(toDeviceId)

      if (!fromDevice || !toDevice) {
        throw new Error("设备不存在")
      }

      if (!toDevice.isOnline) {
        throw new Error("目标设备离线")
      }

      // 准备切换上下文
      const handoffContext = {
        currentPage: context.currentPage,
        scrollPosition: context.scrollPosition,
        formData: context.formData,
        conversationState: context.conversationState,
        aiMemory: context.aiMemory,
        userPreferences: context.userPreferences,
        timestamp: Date.now(),
      }

      // 发送切换请求到目标设备
      const handoffResult = await this.sendHandoffRequest(toDeviceId, handoffContext)

      // 记录切换历史
      const handoffRecord: HandoffRecord = {
        fromDevice: fromDeviceId,
        toDevice: toDeviceId,
        context: handoffContext,
        timestamp: Date.now(),
        success: handoffResult.success,
        continuationPoint: handoffResult.continuationUrl || "",
      }

      this.recordHandoff(handoffRecord)

      return handoffResult
    } catch (error) {
      console.error("设备切换失败:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "未知错误",
      }
    }
  }

  // 智能设备推荐
  async recommendDevice(
    currentContext: any,
    userPreferences: any,
  ): Promise<{
    recommendedDevice: DeviceInfo | null
    reason: string
    confidence: number
    alternatives: DeviceInfo[]
  }> {
    const availableDevices = Array.from(this.devices.values()).filter((d) => d.isOnline)

    if (availableDevices.length === 0) {
      return {
        recommendedDevice: null,
        reason: "没有可用设备",
        confidence: 0,
        alternatives: [],
      }
    }

    // 基于上下文和用户偏好评分设备
    const scoredDevices = availableDevices.map((device) => ({
      device,
      score: this.calculateDeviceScore(device, currentContext, userPreferences),
    }))

    scoredDevices.sort((a, b) => b.score - a.score)

    const best = scoredDevices[0]
    const alternatives = scoredDevices.slice(1, 4).map((s) => s.device)

    return {
      recommendedDevice: best.device,
      reason: this.generateRecommendationReason(best.device, currentContext),
      confidence: best.score,
      alternatives,
    }
  }

  // 实时协作功能
  async enableCollaboration(sessionId: string, participants: string[]): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      throw new Error("会话不存在")
    }

    // 启用实时协作
    session.sharedState = {
      ...session.sharedState,
      collaboration: {
        enabled: true,
        participants,
        sharedCursor: {},
        sharedSelection: {},
        liveEditing: true,
        voiceChat: false,
        screenSharing: false,
      },
    }

    // 通知所有参与者
    await this.notifyParticipants(sessionId, "collaboration_enabled", {
      participants,
      capabilities: ["cursor_sharing", "live_editing", "voice_chat"],
    })
  }

  // 上下文感知同步
  async contextAwareSync(context: {
    location?: { latitude: number; longitude: number }
    timeOfDay?: number
    activity?: string
    environment?: string
    urgency?: "low" | "medium" | "high"
  }): Promise<void> {
    // 基于上下文调整同步策略
    let syncPriority = "normal"
    let syncFrequency = 30000 // 30秒

    if (context.urgency === "high") {
      syncPriority = "high"
      syncFrequency = 5000 // 5秒
    } else if (context.environment === "low_bandwidth") {
      syncPriority = "low"
      syncFrequency = 120000 // 2分钟
    }

    // 调整同步间隔
    if (this.syncInterval) {
      clearInterval(this.syncInterval)
    }

    this.syncInterval = setInterval(() => {
      this.performBatchSync(syncPriority)
    }, syncFrequency)
  }

  // 冲突解决
  async resolveConflicts(conflicts: SyncConflict[]): Promise<void> {
    for (const conflict of conflicts) {
      try {
        const resolution = await this.determineConflictResolution(conflict)
        await this.applyConflictResolution(conflict, resolution)
      } catch (error) {
        console.error("冲突解决失败:", error)
        // 标记为需要手动解决
        conflict.resolution = "manual"
      }
    }
  }

  // 离线支持
  async enableOfflineMode(): Promise<void> {
    // 缓存关键数据
    const criticalData = await this.getCriticalData()
    await this.storeCriticalDataLocally(criticalData)

    // 启用离线队列
    this.enableOfflineQueue()

    // 监听网络状态
    window.addEventListener("online", () => {
      this.handleOnlineReconnection()
    })

    window.addEventListener("offline", () => {
      this.handleOfflineMode()
    })
  }

  // 私有方法实现
  private generateDeviceId(): string {
    return `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private getDefaultDeviceName(): string {
    const platform = navigator.platform.toLowerCase()
    if (platform.includes("win")) return "Windows设备"
    if (platform.includes("mac")) return "Mac设备"
    if (platform.includes("linux")) return "Linux设备"
    if (platform.includes("iphone")) return "iPhone"
    if (platform.includes("android")) return "Android设备"
    return "未知设备"
  }

  private detectDeviceType(): DeviceInfo["type"] {
    const userAgent = navigator.userAgent.toLowerCase()
    const screenWidth = window.screen.width

    if (userAgent.includes("mobile")) return "mobile"
    if (screenWidth > 768 && screenWidth < 1024) return "tablet"
    if (screenWidth >= 1024) return "desktop"
    return "mobile"
  }

  private detectCapabilities(): string[] {
    const capabilities = ["sync", "offline"]

    if ("serviceWorker" in navigator) capabilities.push("pwa")
    if ("geolocation" in navigator) capabilities.push("location")
    if ("mediaDevices" in navigator) capabilities.push("camera", "microphone")
    if ("vibrate" in navigator) capabilities.push("haptic")
    if ("share" in navigator) capabilities.push("native_sharing")

    return capabilities
  }

  private async getCurrentLocation(): Promise<DeviceInfo["location"]> {
    if (!("geolocation" in navigator)) return undefined

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          })
        },
        () => resolve(undefined),
        { timeout: 5000 },
      )
    })
  }

  private generateSyncId(): string {
    return `sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private calculateChecksum(data: any): string {
    // 简化的校验和计算
    const str = JSON.stringify(data)
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // 转换为32位整数
    }
    return hash.toString(36)
  }

  private isHighPriority(type: SyncData["type"]): boolean {
    return ["emotional_state", "ai_memory", "conversations"].includes(type)
  }

  private async performSync(data: SyncData): Promise<void> {
    try {
      // 发送到云端
      await this.syncToCloud(data)

      // 广播到其他设备
      await this.broadcastToDevices(data)
    } catch (error) {
      console.error("同步失败:", error)
      // 重新加入队列等待重试
      this.syncQueue.push(data)
    }
  }

  private async syncToCloud(data: SyncData): Promise<void> {
    // 模拟云端同步
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  private async broadcastToDevices(data: SyncData): Promise<void> {
    const onlineDevices = Array.from(this.devices.values()).filter((d) => d.isOnline)

    for (const device of onlineDevices) {
      if (device.id !== data.deviceId) {
        await this.sendToDevice(device.id, data)
      }
    }
  }

  private async sendToDevice(deviceId: string, data: SyncData): Promise<void> {
    // 模拟设备间通信
    console.log(`发送数据到设备 ${deviceId}:`, data.type)
  }

  private startSyncService(userId: string, deviceId: string): void {
    this.syncInterval = setInterval(() => {
      this.performBatchSync("normal")
    }, 30000) // 30秒同步一次
  }

  private async performBatchSync(priority: string): Promise<void> {
    if (this.syncQueue.length === 0) return

    const batchSize = priority === "high" ? 10 : 5
    const batch = this.syncQueue.splice(0, batchSize)

    for (const data of batch) {
      await this.performSync(data)
    }
  }

  private async discoverDevices(userId: string): Promise<void> {
    // 模拟设备发现
    const mockDevices: DeviceInfo[] = [
      {
        id: "device-mobile-001",
        name: "iPhone 15 Pro",
        type: "mobile",
        platform: "iOS",
        capabilities: ["sync", "camera", "location", "haptic"],
        lastSeen: Date.now() - 300000,
        isOnline: true,
      },
      {
        id: "device-desktop-001",
        name: "MacBook Pro",
        type: "desktop",
        platform: "macOS",
        capabilities: ["sync", "camera", "microphone", "pwa"],
        lastSeen: Date.now() - 60000,
        isOnline: true,
      },
    ]

    mockDevices.forEach((device) => {
      this.devices.set(device.id, device)
    })
  }

  private async createOrJoinSession(userId: string, deviceId: string): Promise<void> {
    const sessionId = `session-${userId}`

    if (!this.sessions.has(sessionId)) {
      const session: CrossDeviceSession = {
        id: sessionId,
        userId,
        devices: [this.devices.get(deviceId)!],
        sharedState: {},
        activeDevice: deviceId,
        handoffHistory: [],
        createdAt: Date.now(),
        lastActivity: Date.now(),
      }

      this.sessions.set(sessionId, session)
    } else {
      const session = this.sessions.get(sessionId)!
      if (!session.devices.find((d) => d.id === deviceId)) {
        session.devices.push(this.devices.get(deviceId)!)
      }
      session.lastActivity = Date.now()
    }
  }

  private async sendHandoffRequest(
    toDeviceId: string,
    context: any,
  ): Promise<{ success: boolean; continuationUrl?: string }> {
    // 模拟设备切换请求
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      continuationUrl: `https://yyc-ai.com/continue?context=${encodeURIComponent(JSON.stringify(context))}`,
    }
  }

  private recordHandoff(record: HandoffRecord): void {
    // 记录到所有相关会话
    this.sessions.forEach((session) => {
      if (session.devices.find((d) => d.id === record.fromDevice || d.id === record.toDevice)) {
        session.handoffHistory.push(record)
        session.lastActivity = Date.now()
      }
    })
  }

  private calculateDeviceScore(device: DeviceInfo, context: any, preferences: any): number {
    let score = 0.5 // 基础分数

    // 设备类型适配性
    if (context.taskType === "reading" && device.type === "tablet") score += 0.3
    if (context.taskType === "creation" && device.type === "desktop") score += 0.3
    if (context.taskType === "quick_action" && device.type === "mobile") score += 0.3

    // 设备能力匹配
    if (context.needsCamera && device.capabilities.includes("camera")) score += 0.2
    if (context.needsLocation && device.capabilities.includes("location")) score += 0.2

    // 用户偏好
    if (preferences.preferredDevice === device.type) score += 0.2

    // 设备状态
    if (device.isOnline) score += 0.1
    if (Date.now() - device.lastSeen < 300000) score += 0.1 // 5分钟内活跃

    return Math.min(score, 1.0)
  }

  private generateRecommendationReason(device: DeviceInfo, context: any): string {
    const reasons = []

    if (context.taskType === "reading" && device.type === "tablet") {
      reasons.push("平板设备更适合阅读")
    }
    if (context.taskType === "creation" && device.type === "desktop") {
      reasons.push("桌面设备提供更好的创作体验")
    }
    if (device.capabilities.includes("camera") && context.needsCamera) {
      reasons.push("支持摄像头功能")
    }

    return reasons.join("，") || "设备性能和兼容性最佳"
  }

  private async notifyParticipants(sessionId: string, event: string, data: any): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) return

    for (const device of session.devices) {
      await this.sendToDevice(device.id, {
        id: this.generateSyncId(),
        type: "notification" as any,
        data: { event, ...data },
        timestamp: Date.now(),
        deviceId: device.id,
        userId: session.userId,
        version: 1,
        checksum: "",
      })
    }
  }

  private async determineConflictResolution(conflict: SyncConflict): Promise<"local" | "remote" | "merge"> {
    // 简化的冲突解决策略
    if (conflict.localData.timestamp > conflict.remoteData.timestamp) {
      return "local"
    } else if (conflict.remoteData.timestamp > conflict.localData.timestamp) {
      return "remote"
    } else {
      return "merge"
    }
  }

  private async applyConflictResolution(conflict: SyncConflict, resolution: string): Promise<void> {
    switch (resolution) {
      case "local":
        // 保持本地数据
        break
      case "remote":
        // 使用远程数据
        await this.applyRemoteData(conflict.remoteData)
        break
      case "merge":
        // 合并数据
        const mergedData = this.mergeData(conflict.localData, conflict.remoteData)
        await this.applyMergedData(mergedData)
        break
    }
  }

  private async applyRemoteData(data: any): Promise<void> {
    // 应用远程数据
    console.log("应用远程数据:", data)
  }

  private mergeData(localData: any, remoteData: any): any {
    // 简化的数据合并
    return { ...localData, ...remoteData, merged: true }
  }

  private async applyMergedData(data: any): Promise<void> {
    // 应用合并后的数据
    console.log("应用合并数据:", data)
  }

  private async getCriticalData(): Promise<any> {
    return {
      settings: localStorage.getItem("yyc-ai-settings"),
      recentHistory: localStorage.getItem("yyc-ai-history"),
      userPreferences: localStorage.getItem("yyc-ai-preferences"),
    }
  }

  private async storeCriticalDataLocally(data: any): Promise<void> {
    localStorage.setItem("yyc-ai-offline-cache", JSON.stringify(data))
  }

  private enableOfflineQueue(): void {
    // 启用离线操作队列
    console.log("离线队列已启用")
  }

  private handleOnlineReconnection(): void {
    console.log("网络已恢复，开始同步离线数据")
    this.performBatchSync("high")
  }

  private handleOfflineMode(): void {
    console.log("进入离线模式")
  }
}
