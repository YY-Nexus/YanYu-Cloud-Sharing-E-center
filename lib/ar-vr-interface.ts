export interface XRCapabilities {
  supportsAR: boolean
  supportsVR: boolean
  hasHandTracking: boolean
  hasEyeTracking: boolean
  hasVoiceCommands: boolean
  supportedFeatures: string[]
}

export interface SpatialGesture {
  type: "pinch" | "grab" | "point" | "swipe" | "tap" | "wave"
  confidence: number
  position: { x: number; y: number; z: number }
  direction?: { x: number; y: number; z: number }
  handedness: "left" | "right" | "both"
  timestamp: number
}

export interface VoiceCommand {
  command: string
  confidence: number
  parameters: Record<string, any>
  timestamp: number
}

export interface SpatialUI {
  id: string
  type: "panel" | "button" | "menu" | "visualization" | "text" | "media"
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  content: any
  interactive: boolean
  visible: boolean
  anchored: boolean
}

export interface XRSession {
  id: string
  mode: "ar" | "vr"
  isActive: boolean
  startTime: number
  spatialElements: Map<string, SpatialUI>
  gestureHistory: SpatialGesture[]
  voiceHistory: VoiceCommand[]
  eyeGazeData?: Array<{ x: number; y: number; timestamp: number }>
}

export class ARVRInterfaceManager {
  private xrSession: XRSession | null = null
  private xrCapabilities: XRCapabilities | null = null
  private gestureRecognizer: any = null
  private voiceRecognizer: any = null
  private spatialElements: Map<string, SpatialUI> = new Map()
  private eventListeners: Map<string, Function[]> = new Map()

  async initialize(): Promise<boolean> {
    try {
      // 检测XR能力
      this.xrCapabilities = await this.detectXRCapabilities()

      if (!this.xrCapabilities.supportsAR && !this.xrCapabilities.supportsVR) {
        console.warn("设备不支持AR/VR功能")
        return false
      }

      // 初始化手势识别
      if (this.xrCapabilities.hasHandTracking) {
        await this.initializeGestureRecognition()
      }

      // 初始化语音识别
      if (this.xrCapabilities.hasVoiceCommands) {
        await this.initializeVoiceRecognition()
      }

      console.log("AR/VR界面管理器初始化完成")
      return true
    } catch (error) {
      console.error("AR/VR初始化失败:", error)
      return false
    }
  }

  async startARSession(): Promise<boolean> {
    if (!this.xrCapabilities?.supportsAR) {
      console.error("设备不支持AR")
      return false
    }

    try {
      // @ts-ignore
      const xrSession = await navigator.xr?.requestSession("immersive-ar", {
        requiredFeatures: ["local", "hand-tracking"],
        optionalFeatures: ["eye-tracking", "voice-input"],
      })

      if (xrSession) {
        this.xrSession = {
          id: `ar_session_${Date.now()}`,
          mode: "ar",
          isActive: true,
          startTime: Date.now(),
          spatialElements: new Map(),
          gestureHistory: [],
          voiceHistory: [],
        }

        // 设置XR会话事件监听器
        this.setupXRSessionListeners(xrSession)

        // 创建默认的空间UI元素
        await this.createDefaultSpatialUI()

        this.emit("ar-session-started", this.xrSession)
        return true
      }

      return false
    } catch (error) {
      console.error("启动AR会话失败:", error)
      return false
    }
  }

  async startVRSession(): Promise<boolean> {
    if (!this.xrCapabilities?.supportsVR) {
      console.error("设备不支持VR")
      return false
    }

    try {
      // @ts-ignore
      const xrSession = await navigator.xr?.requestSession("immersive-vr", {
        requiredFeatures: ["local", "hand-tracking"],
        optionalFeatures: ["eye-tracking", "voice-input"],
      })

      if (xrSession) {
        this.xrSession = {
          id: `vr_session_${Date.now()}`,
          mode: "vr",
          isActive: true,
          startTime: Date.now(),
          spatialElements: new Map(),
          gestureHistory: [],
          voiceHistory: [],
        }

        this.setupXRSessionListeners(xrSession)
        await this.createDefaultSpatialUI()

        this.emit("vr-session-started", this.xrSession)
        return true
      }

      return false
    } catch (error) {
      console.error("启动VR会话失败:", error)
      return false
    }
  }

  createSpatialElement(config: Omit<SpatialUI, "id">): string {
    const id = `spatial_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const element: SpatialUI = {
      id,
      ...config,
    }

    this.spatialElements.set(id, element)

    if (this.xrSession) {
      this.xrSession.spatialElements.set(id, element)
    }

    this.emit("spatial-element-created", element)
    return id
  }

  updateSpatialElement(id: string, updates: Partial<SpatialUI>): boolean {
    const element = this.spatialElements.get(id)
    if (!element) return false

    Object.assign(element, updates)
    this.spatialElements.set(id, element)

    if (this.xrSession) {
      this.xrSession.spatialElements.set(id, element)
    }

    this.emit("spatial-element-updated", element)
    return true
  }

  removeSpatialElement(id: string): boolean {
    const removed = this.spatialElements.delete(id)

    if (this.xrSession) {
      this.xrSession.spatialElements.delete(id)
    }

    if (removed) {
      this.emit("spatial-element-removed", id)
    }

    return removed
  }

  async processGesture(gestureData: any): Promise<SpatialGesture | null> {
    if (!this.gestureRecognizer) return null

    try {
      const gesture: SpatialGesture = {
        type: this.classifyGesture(gestureData),
        confidence: gestureData.confidence || 0.8,
        position: gestureData.position || { x: 0, y: 0, z: 0 },
        direction: gestureData.direction,
        handedness: gestureData.handedness || "right",
        timestamp: Date.now(),
      }

      if (this.xrSession) {
        this.xrSession.gestureHistory.push(gesture)

        // 保持最近100个手势
        if (this.xrSession.gestureHistory.length > 100) {
          this.xrSession.gestureHistory.shift()
        }
      }

      // 处理手势命令
      await this.handleGestureCommand(gesture)

      this.emit("gesture-recognized", gesture)
      return gesture
    } catch (error) {
      console.error("手势处理失败:", error)
      return null
    }
  }

  async processVoiceCommand(audioData: ArrayBuffer): Promise<VoiceCommand | null> {
    if (!this.voiceRecognizer) return null

    try {
      // 使用Web Speech API或自定义语音识别
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = "zh-CN"
      recognition.continuous = false
      recognition.interimResults = false

      return new Promise((resolve) => {
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          const confidence = event.results[0][0].confidence

          const command: VoiceCommand = {
            command: transcript,
            confidence,
            parameters: this.parseVoiceParameters(transcript),
            timestamp: Date.now(),
          }

          if (this.xrSession) {
            this.xrSession.voiceHistory.push(command)

            if (this.xrSession.voiceHistory.length > 50) {
              this.xrSession.voiceHistory.shift()
            }
          }

          this.handleVoiceCommand(command)
          this.emit("voice-command-recognized", command)
          resolve(command)
        }

        recognition.onerror = () => resolve(null)
        recognition.start()
      })
    } catch (error) {
      console.error("语音命令处理失败:", error)
      return null
    }
  }

  create3DVisualization(data: any, type: "chart" | "model" | "network" | "mindmap"): string {
    const visualizationConfig: Omit<SpatialUI, "id"> = {
      type: "visualization",
      position: { x: 0, y: 1.5, z: -2 }, // 用户前方2米，高度1.5米
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      content: {
        type,
        data,
        interactive: true,
        animations: this.getVisualizationAnimations(type),
      },
      interactive: true,
      visible: true,
      anchored: false,
    }

    return this.createSpatialElement(visualizationConfig)
  }

  createSpatialMenu(items: Array<{ label: string; action: string; icon?: string }>): string {
    const menuConfig: Omit<SpatialUI, "id"> = {
      type: "menu",
      position: { x: 0.5, y: 1.2, z: -1 }, // 用户右侧
      rotation: { x: 0, y: -30, z: 0 }, // 稍微朝向用户
      scale: { x: 1, y: 1, z: 1 },
      content: {
        items,
        layout: "circular",
        style: "floating",
      },
      interactive: true,
      visible: true,
      anchored: true,
    }

    return this.createSpatialElement(menuConfig)
  }

  createFloatingPanel(content: any, position?: { x: number; y: number; z: number }): string {
    const panelConfig: Omit<SpatialUI, "id"> = {
      type: "panel",
      position: position || { x: 0, y: 1.0, z: -1.5 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 0.1 },
      content: {
        ...content,
        background: "rgba(255, 255, 255, 0.9)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      },
      interactive: true,
      visible: true,
      anchored: false,
    }

    return this.createSpatialElement(panelConfig)
  }

  endSession(): void {
    if (this.xrSession) {
      this.xrSession.isActive = false
      this.emit("xr-session-ended", this.xrSession)
      this.xrSession = null
    }

    // 清理空间元素
    this.spatialElements.clear()

    // 停止识别器
    if (this.gestureRecognizer) {
      this.gestureRecognizer.stop?.()
    }
    if (this.voiceRecognizer) {
      this.voiceRecognizer.stop?.()
    }
  }

  getSession(): XRSession | null {
    return this.xrSession
  }

  getSpatialElements(): SpatialUI[] {
    return Array.from(this.spatialElements.values())
  }

  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, [])
    }
    this.eventListeners.get(event)!.push(callback)
  }

  off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      const index = listeners.indexOf(callback)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  private async detectXRCapabilities(): Promise<XRCapabilities> {
    const capabilities: XRCapabilities = {
      supportsAR: false,
      supportsVR: false,
      hasHandTracking: false,
      hasEyeTracking: false,
      hasVoiceCommands: false,
      supportedFeatures: [],
    }

    try {
      // @ts-ignore
      if ("xr" in navigator) {
        // @ts-ignore
        const xr = navigator.xr

        capabilities.supportsAR = await xr.isSessionSupported("immersive-ar")
        capabilities.supportsVR = await xr.isSessionSupported("immersive-vr")

        // 检测手势追踪
        capabilities.hasHandTracking = await xr.isSessionSupported("immersive-ar", {
          optionalFeatures: ["hand-tracking"],
        })

        // 检测眼动追踪
        capabilities.hasEyeTracking = await xr.isSessionSupported("immersive-ar", {
          optionalFeatures: ["eye-tracking"],
        })
      }

      // 检测语音命令支持
      capabilities.hasVoiceCommands = "webkitSpeechRecognition" in window || "SpeechRecognition" in window

      // 收集支持的功能
      if (capabilities.supportsAR) capabilities.supportedFeatures.push("ar")
      if (capabilities.supportsVR) capabilities.supportedFeatures.push("vr")
      if (capabilities.hasHandTracking) capabilities.supportedFeatures.push("hand-tracking")
      if (capabilities.hasEyeTracking) capabilities.supportedFeatures.push("eye-tracking")
      if (capabilities.hasVoiceCommands) capabilities.supportedFeatures.push("voice-commands")
    } catch (error) {
      console.error("XR能力检测失败:", error)
    }

    return capabilities
  }

  private async initializeGestureRecognition(): Promise<void> {
    // 这里应该初始化手势识别库，比如MediaPipe或TensorFlow.js
    console.log("初始化手势识别...")

    // 模拟手势识别器初始化
    this.gestureRecognizer = {
      start: () => console.log("手势识别已启动"),
      stop: () => console.log("手势识别已停止"),
      isActive: true,
    }
  }

  private async initializeVoiceRecognition(): Promise<void> {
    console.log("初始化语音识别...")

    try {
      // 检查浏览器支持
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        this.voiceRecognizer = new SpeechRecognition()
        this.voiceRecognizer.continuous = true
        this.voiceRecognizer.interimResults = true
        this.voiceRecognizer.lang = "zh-CN"
      }
    } catch (error) {
      console.error("语音识别初始化失败:", error)
    }
  }

  private setupXRSessionListeners(xrSession: any): void {
    xrSession.addEventListener("end", () => {
      this.endSession()
    })

    // 设置输入源监听器
    xrSession.addEventListener("inputsourceschange", (event: any) => {
      console.log("输入源变化:", event)
    })
  }

  private async createDefaultSpatialUI(): Promise<void> {
    // 创建主菜单
    this.createSpatialMenu([
      { label: "搜索", action: "search", icon: "🔍" },
      { label: "创建", action: "create", icon: "✨" },
      { label: "设置", action: "settings", icon: "⚙️" },
      { label: "帮助", action: "help", icon: "❓" },
    ])

    // 创建状态面板
    this.createFloatingPanel(
      {
        title: "AI助手状态",
        content: "准备就绪",
        type: "status",
      },
      { x: -0.8, y: 1.5, z: -1 },
    )
  }

  private classifyGesture(gestureData: any): SpatialGesture["type"] {
    // 简化的手势分类逻辑
    // 实际应用中应该使用机器学习模型

    if (gestureData.fingers?.pinched) return "pinch"
    if (gestureData.fingers?.extended === 1) return "point"
    if (gestureData.movement?.speed > 0.5) return "swipe"
    if (gestureData.fingers?.closed) return "grab"

    return "tap"
  }

  private async handleGestureCommand(gesture: SpatialGesture): Promise<void> {
    switch (gesture.type) {
      case "pinch":
        // 处理捏合手势，可能是选择或缩放
        this.emit("gesture-pinch", gesture)
        break
      case "point":
        // 处理指向手势，可能是选择UI元素
        this.emit("gesture-point", gesture)
        break
      case "swipe":
        // 处理滑动手势，可能是导航
        this.emit("gesture-swipe", gesture)
        break
      case "grab":
        // 处理抓取手势，可能是移动对象
        this.emit("gesture-grab", gesture)
        break
    }
  }

  private async handleVoiceCommand(command: VoiceCommand): Promise<void> {
    const { command: text, parameters } = command

    // 简单的语音命令处理
    if (text.includes("搜索") || text.includes("查找")) {
      this.emit("voice-search", { query: parameters.query || text })
    } else if (text.includes("创建") || text.includes("生成")) {
      this.emit("voice-create", { type: parameters.type || "general" })
    } else if (text.includes("关闭") || text.includes("退出")) {
      this.emit("voice-close", {})
    } else if (text.includes("帮助")) {
      this.emit("voice-help", {})
    }
  }

  private parseVoiceParameters(transcript: string): Record<string, any> {
    const parameters: Record<string, any> = {}

    // 简单的参数提取逻辑
    if (transcript.includes("搜索")) {
      const match = transcript.match(/搜索(.+)/)
      if (match) parameters.query = match[1].trim()
    }

    if (transcript.includes("创建")) {
      if (transcript.includes("思维导图")) parameters.type = "mindmap"
      else if (transcript.includes("海报")) parameters.type = "poster"
      else if (transcript.includes("PPT")) parameters.type = "presentation"
    }

    return parameters
  }

  private getVisualizationAnimations(type: string): any {
    switch (type) {
      case "chart":
        return {
          entrance: "fadeInUp",
          hover: "pulse",
          selection: "highlight",
        }
      case "model":
        return {
          entrance: "rotateIn",
          idle: "slowRotate",
          interaction: "bounce",
        }
      case "network":
        return {
          entrance: "expandFromCenter",
          connections: "flowingLines",
          nodes: "breathe",
        }
      case "mindmap":
        return {
          entrance: "branchGrowth",
          expansion: "smoothBranching",
          focus: "zoomHighlight",
        }
      default:
        return {
          entrance: "fadeIn",
          hover: "scale",
          selection: "glow",
        }
    }
  }

  private emit(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.forEach((callback) => callback(data))
    }
  }
}

// 全局实例
export const arvrInterface = new ARVRInterfaceManager()
