import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface EmotionalProfile {
  userId: string
  dominantEmotions: string[]
  emotionalPatterns: EmotionalPattern[]
  triggers: EmotionalTrigger[]
  preferences: EmotionalPreference[]
  adaptationHistory: AdaptationRecord[]
  lastUpdated: number
}

export interface EmotionalPattern {
  pattern: string
  frequency: number
  contexts: string[]
  timeOfDay: number[]
  duration: number
  intensity: number
}

export interface EmotionalTrigger {
  trigger: string
  emotion: string
  intensity: number
  context: string[]
  frequency: number
}

export interface EmotionalPreference {
  category: string
  preference: string
  emotionalContext: string
  strength: number
}

export interface AdaptationRecord {
  timestamp: number
  originalEmotion: string
  targetEmotion: string
  intervention: string
  success: boolean
  feedback: number
}

export interface EmotionalIntervention {
  type: "color_therapy" | "music_therapy" | "breathing_guide" | "content_adjustment" | "interaction_style"
  config: any
  duration: number
  intensity: number
}

export interface MoodBasedInterface {
  colorScheme: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  animations: {
    speed: "slow" | "normal" | "fast"
    type: "gentle" | "energetic" | "minimal"
    intensity: number
  }
  layout: {
    spacing: "compact" | "normal" | "spacious"
    elements: "minimal" | "standard" | "rich"
    focus: "single" | "multi"
  }
  interactions: {
    feedback: "subtle" | "normal" | "pronounced"
    responsiveness: number
    guidance: "minimal" | "helpful" | "detailed"
  }
}

export class EmotionAIEngine {
  private static emotionalProfiles: Map<string, EmotionalProfile> = new Map()
  private static interventionHistory: Map<string, EmotionalIntervention[]> = new Map()
  private static moodInterfaces: Map<string, MoodBasedInterface> = new Map()

  // 实时情绪分析
  static async analyzeRealTimeEmotion(data: {
    text?: string
    voice?: Float32Array
    facial?: ImageData
    physiological?: {
      heartRate?: number
      skinConductance?: number
      temperature?: number
      breathing?: number
    }
    behavioral?: {
      clickPattern?: number[]
      scrollSpeed?: number
      dwellTime?: number
      errorRate?: number
    }
  }): Promise<{
    primaryEmotion: string
    secondaryEmotions: string[]
    intensity: number
    confidence: number
    valence: number // -1 to 1 (negative to positive)
    arousal: number // 0 to 1 (calm to excited)
    context: any
    recommendations: string[]
  }> {
    const analyses: any[] = []

    // 文本情绪分析
    if (data.text) {
      const textAnalysis = await this.analyzeTextEmotion(data.text)
      analyses.push({ ...textAnalysis, weight: 0.3 })
    }

    // 语音情绪分析
    if (data.voice) {
      const voiceAnalysis = await this.analyzeVoiceEmotion(data.voice)
      analyses.push({ ...voiceAnalysis, weight: 0.4 })
    }

    // 面部表情分析
    if (data.facial) {
      const facialAnalysis = await this.analyzeFacialEmotion(data.facial)
      analyses.push({ ...facialAnalysis, weight: 0.5 })
    }

    // 生理信号分析
    if (data.physiological) {
      const physioAnalysis = await this.analyzePhysiologicalEmotion(data.physiological)
      analyses.push({ ...physioAnalysis, weight: 0.6 })
    }

    // 行为模式分析
    if (data.behavioral) {
      const behaviorAnalysis = await this.analyzeBehavioralEmotion(data.behavioral)
      analyses.push({ ...behaviorAnalysis, weight: 0.2 })
    }

    // 融合分析结果
    const fusedResult = this.fuseEmotionalAnalyses(analyses)

    // 生成个性化建议
    const recommendations = await this.generateEmotionalRecommendations(fusedResult)

    return {
      ...fusedResult,
      recommendations,
    }
  }

  // 情绪适应性界面生成
  static async generateEmotionalInterface(
    userId: string,
    currentEmotion: {
      primary: string
      intensity: number
      valence: number
      arousal: number
    },
  ): Promise<MoodBasedInterface> {
    const profile = this.getEmotionalProfile(userId)
    const existingInterface = this.moodInterfaces.get(userId)

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: `你是情绪感知UI设计专家。基于用户当前情绪状态设计最适合的界面配置。

用户情绪状态:
- 主要情绪: ${currentEmotion.primary}
- 强度: ${currentEmotion.intensity}
- 情绪价值: ${currentEmotion.valence} (-1负面到1正面)
- 唤醒度: ${currentEmotion.arousal} (0平静到1兴奋)

用户情绪档案:
- 主导情绪: ${profile.dominantEmotions.join(", ")}
- 情绪偏好: ${JSON.stringify(profile.preferences.slice(0, 3))}

请设计情绪适应性界面配置，包括色彩、动画、布局、交互方式。返回JSON格式。`,
        prompt: "为当前用户情绪状态生成最适合的界面配置。",
      })

      const interfaceConfig = JSON.parse(text)
      const moodInterface: MoodBasedInterface = {
        colorScheme: interfaceConfig.colorScheme || this.getDefaultColorScheme(currentEmotion),
        animations: interfaceConfig.animations || this.getDefaultAnimations(currentEmotion),
        layout: interfaceConfig.layout || this.getDefaultLayout(currentEmotion),
        interactions: interfaceConfig.interactions || this.getDefaultInteractions(currentEmotion),
      }

      this.moodInterfaces.set(userId, moodInterface)
      return moodInterface
    } catch (error) {
      console.error("情绪界面生成失败:", error)
      return this.getFallbackInterface(currentEmotion)
    }
  }

  // 情绪干预系统
  static async performEmotionalIntervention(
    userId: string,
    targetEmotion: string,
    currentEmotion: any,
  ): Promise<{
    interventions: EmotionalIntervention[]
    estimatedDuration: number
    successProbability: number
    followUpActions: string[]
  }> {
    const profile = this.getEmotionalProfile(userId)
    const interventions: EmotionalIntervention[] = []

    // 基于情绪状态选择干预策略
    if (currentEmotion.valence < -0.5) {
      // 负面情绪干预
      interventions.push(
        {
          type: "color_therapy",
          config: {
            colors: ["#FFE4B5", "#98FB98", "#87CEEB"], // 温暖、舒缓的颜色
            transition: "gentle",
            duration: 300000, // 5分钟
          },
          duration: 300000,
          intensity: 0.7,
        },
        {
          type: "breathing_guide",
          config: {
            pattern: "4-7-8", // 吸气4秒，屏息7秒，呼气8秒
            cycles: 10,
            visualization: "ocean_waves",
          },
          duration: 180000, // 3分钟
          intensity: 0.8,
        },
      )
    }

    if (currentEmotion.arousal > 0.8) {
      // 高唤醒度干预
      interventions.push({
        type: "music_therapy",
        config: {
          genre: "ambient",
          tempo: "slow",
          volume: 0.3,
          binaural: true,
          frequency: "alpha", // 8-12Hz，促进放松
        },
        duration: 600000, // 10分钟
        intensity: 0.6,
      })
    }

    if (currentEmotion.primary === "stress" || currentEmotion.primary === "anxiety") {
      interventions.push({
        type: "content_adjustment",
        config: {
          complexity: "reduced",
          pace: "slower",
          supportLevel: "increased",
          positiveFraming: true,
        },
        duration: 1800000, // 30分钟
        intensity: 0.9,
      })
    }

    // 调整交互风格
    interventions.push({
      type: "interaction_style",
      config: {
        tone: this.getAdaptiveTone(currentEmotion, targetEmotion),
        responsiveness: this.getAdaptiveResponsiveness(currentEmotion),
        guidance: this.getAdaptiveGuidance(currentEmotion),
        feedback: this.getAdaptiveFeedback(currentEmotion),
      },
      duration: 3600000, // 1小时
      intensity: 0.5,
    })

    // 记录干预历史
    this.interventionHistory.set(userId, [...(this.interventionHistory.get(userId) || []), ...interventions])

    // 估算成功概率
    const successProbability = this.calculateInterventionSuccess(profile, interventions, currentEmotion)

    return {
      interventions,
      estimatedDuration: Math.max(...interventions.map((i) => i.duration)),
      successProbability,
      followUpActions: await this.generateFollowUpActions(currentEmotion, targetEmotion),
    }
  }

  // 情绪感知对话生成
  static async generateEmotionallyAwareResponse(
    input: string,
    userEmotion: any,
    conversationHistory: any[],
  ): Promise<{
    response: string
    emotionalTone: string
    adaptations: string[]
    supportLevel: number
    followUpQuestions: string[]
  }> {
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: `你是具备高度情绪智能的AI助手。你能够感知用户的情绪状态并相应调整回应方式。

用户当前情绪状态:
- 主要情绪: ${userEmotion.primary}
- 情绪强度: ${userEmotion.intensity}
- 情绪价值: ${userEmotion.valence}
- 唤醒度: ${userEmotion.arousal}

对话历史: ${JSON.stringify(conversationHistory.slice(-3))}

请基于用户情绪状态调整你的回应:
1. 如果用户情绪低落，提供温暖支持和鼓励
2. 如果用户焦虑，提供冷静和安抚
3. 如果用户兴奋，匹配其能量水平
4. 如果用户愤怒，保持冷静和理解
5. 始终展现同理心和专业性

回应要自然、真诚，避免过度技术化的语言。`,
        prompt: input,
        temperature: 0.7 + userEmotion.intensity * 0.2, // 根据情绪强度调整创造性
      })

      const adaptations = this.identifyEmotionalAdaptations(text, userEmotion)
      const supportLevel = this.calculateSupportLevel(userEmotion)
      const followUpQuestions = await this.generateEmotionalFollowUp(userEmotion, text)

      return {
        response: text,
        emotionalTone: this.determineResponseTone(userEmotion),
        adaptations,
        supportLevel,
        followUpQuestions,
      }
    } catch (error) {
      console.error("情绪感知回应生成失败:", error)
      return {
        response: "我理解您现在的感受。让我们一起找到最好的解决方案。",
        emotionalTone: "supportive",
        adaptations: ["empathetic_language"],
        supportLevel: 0.8,
        followUpQuestions: ["您希望我如何帮助您？"],
      }
    }
  }

  // 情绪学习和适应
  static async learnFromEmotionalFeedback(
    userId: string,
    intervention: EmotionalIntervention,
    feedback: {
      effectiveness: number // 1-10
      comfort: number // 1-10
      preference: number // 1-10
      comments?: string
    },
  ): Promise<void> {
    const profile = this.getEmotionalProfile(userId)

    // 记录适应历史
    const adaptationRecord: AdaptationRecord = {
      timestamp: Date.now(),
      originalEmotion: "", // 从上下文获取
      targetEmotion: "", // 从上下文获取
      intervention: intervention.type,
      success: feedback.effectiveness > 6,
      feedback: (feedback.effectiveness + feedback.comfort + feedback.preference) / 3,
    }

    profile.adaptationHistory.push(adaptationRecord)

    // 更新情绪偏好
    if (feedback.effectiveness > 7) {
      const existingPreference = profile.preferences.find((p) => p.category === intervention.type)

      if (existingPreference) {
        existingPreference.strength += 0.1
      } else {
        profile.preferences.push({
          category: intervention.type,
          preference: "effective",
          emotionalContext: "", // 从上下文获取
          strength: 0.7,
        })
      }
    }

    // 更新用户档案
    profile.lastUpdated = Date.now()
    this.emotionalProfiles.set(userId, profile)

    // 使用机器学习优化未来干预
    await this.optimizeInterventionModel(userId, adaptationRecord)
  }

  // 群体情绪分析
  static async analyzeGroupEmotion(
    participants: {
      userId: string
      emotion: any
      influence: number
    }[],
  ): Promise<{
    groupMood: string
    dominantEmotions: string[]
    emotionalDynamics: any
    recommendations: string[]
    interventionNeeded: boolean
  }> {
    const emotions = participants.map((p) => p.emotion)
    const influences = participants.map((p) => p.influence)

    // 计算加权平均情绪
    const weightedEmotions = emotions.map((emotion, index) => ({
      ...emotion,
      weight: influences[index],
    }))

    const groupEmotion = this.calculateGroupEmotion(weightedEmotions)
    const dynamics = this.analyzeEmotionalDynamics(participants)

    return {
      groupMood: groupEmotion.primary,
      dominantEmotions: groupEmotion.secondary,
      emotionalDynamics: dynamics,
      recommendations: await this.generateGroupRecommendations(groupEmotion, dynamics),
      interventionNeeded: groupEmotion.valence < -0.3 || dynamics.conflict > 0.7,
    }
  }

  // 私有方法实现
  private static async analyzeTextEmotion(text: string): Promise<any> {
    try {
      const { text: result } = await generateText({
        model: openai("gpt-4o"),
        system: `分析文本的情绪状态，返回JSON格式：
{
  "primary": "主要情绪",
  "secondary": ["次要情绪"],
  "intensity": 0.0-1.0,
  "valence": -1.0到1.0,
  "arousal": 0.0-1.0,
  "confidence": 0.0-1.0
}`,
        prompt: `分析以下文本的情绪：${text}`,
      })

      return JSON.parse(result)
    } catch (error) {
      return {
        primary: "neutral",
        secondary: [],
        intensity: 0.5,
        valence: 0,
        arousal: 0.5,
        confidence: 0.3,
      }
    }
  }

  private static async analyzeVoiceEmotion(voiceData: Float32Array): Promise<any> {
    // 语音情绪分析实现（模拟）
    const pitch = this.calculatePitch(voiceData)
    const energy = this.calculateEnergy(voiceData)
    const tempo = this.calculateTempo(voiceData)

    let primary = "neutral"
    let valence = 0
    let arousal = 0.5

    if (pitch > 200 && energy > 0.7) {
      primary = "excitement"
      valence = 0.8
      arousal = 0.9
    } else if (pitch < 100 && energy < 0.3) {
      primary = "sadness"
      valence = -0.6
      arousal = 0.2
    } else if (tempo > 150 && energy > 0.6) {
      primary = "anxiety"
      valence = -0.3
      arousal = 0.8
    }

    return {
      primary,
      secondary: [],
      intensity: energy,
      valence,
      arousal,
      confidence: 0.7,
    }
  }

  private static async analyzeFacialEmotion(imageData: ImageData): Promise<any> {
    // 面部表情分析实现（模拟）
    // 实际实现会使用计算机视觉库
    return {
      primary: "neutral",
      secondary: [],
      intensity: 0.5,
      valence: 0,
      arousal: 0.5,
      confidence: 0.6,
    }
  }

  private static async analyzePhysiologicalEmotion(data: any): Promise<any> {
    let primary = "neutral"
    let valence = 0
    let arousal = 0.5

    if (data.heartRate > 100) {
      arousal += 0.3
      if (data.skinConductance > 0.7) {
        primary = "stress"
        valence = -0.4
      } else {
        primary = "excitement"
        valence = 0.6
      }
    }

    if (data.breathing > 20) {
      arousal += 0.2
      if (primary === "neutral") {
        primary = "anxiety"
        valence = -0.3
      }
    }

    return {
      primary,
      secondary: [],
      intensity: arousal,
      valence,
      arousal: Math.min(arousal, 1.0),
      confidence: 0.8,
    }
  }

  private static async analyzeBehavioralEmotion(data: any): Promise<any> {
    let primary = "neutral"
    let valence = 0
    let arousal = 0.5

    if (data.errorRate > 0.1) {
      primary = "frustration"
      valence = -0.5
      arousal = 0.7
    }

    if (data.scrollSpeed > 1000) {
      arousal += 0.2
      if (primary === "neutral") {
        primary = "impatience"
        valence = -0.2
      }
    }

    if (data.dwellTime < 1000) {
      arousal += 0.1
    }

    return {
      primary,
      secondary: [],
      intensity: arousal,
      valence,
      arousal: Math.min(arousal, 1.0),
      confidence: 0.4,
    }
  }

  private static fuseEmotionalAnalyses(analyses: any[]): any {
    if (analyses.length === 0) {
      return {
        primaryEmotion: "neutral",
        secondaryEmotions: [],
        intensity: 0.5,
        confidence: 0.3,
        valence: 0,
        arousal: 0.5,
        context: {},
      }
    }

    // 加权融合
    const totalWeight = analyses.reduce((sum, a) => sum + a.weight, 0)

    const weightedValence = analyses.reduce((sum, a) => sum + a.valence * a.weight, 0) / totalWeight
    const weightedArousal = analyses.reduce((sum, a) => sum + a.arousal * a.weight, 0) / totalWeight
    const weightedIntensity = analyses.reduce((sum, a) => sum + a.intensity * a.weight, 0) / totalWeight
    const weightedConfidence = analyses.reduce((sum, a) => sum + a.confidence * a.weight, 0) / totalWeight

    // 选择置信度最高的主要情绪
    const bestAnalysis = analyses.reduce((best, current) => (current.confidence > best.confidence ? current : best))

    return {
      primaryEmotion: bestAnalysis.primary,
      secondaryEmotions: analyses.flatMap((a) => a.secondary).slice(0, 3),
      intensity: weightedIntensity,
      confidence: weightedConfidence,
      valence: weightedValence,
      arousal: weightedArousal,
      context: { fusedFrom: analyses.length },
    }
  }

  private static async generateEmotionalRecommendations(emotion: any): Promise<string[]> {
    const recommendations = []

    if (emotion.valence < -0.3) {
      recommendations.push("建议进行情绪调节活动")
      recommendations.push("考虑休息或放松")
    }

    if (emotion.arousal > 0.8) {
      recommendations.push("建议进行深呼吸练习")
      recommendations.push("降低环境刺激")
    }

    if (emotion.intensity > 0.8) {
      recommendations.push("建议暂停当前活动")
      recommendations.push("寻求情绪支持")
    }

    return recommendations
  }

  private static getEmotionalProfile(userId: string): EmotionalProfile {
    if (!this.emotionalProfiles.has(userId)) {
      this.emotionalProfiles.set(userId, {
        userId,
        dominantEmotions: ["neutral"],
        emotionalPatterns: [],
        triggers: [],
        preferences: [],
        adaptationHistory: [],
        lastUpdated: Date.now(),
      })
    }
    return this.emotionalProfiles.get(userId)!
  }

  private static getDefaultColorScheme(emotion: any): MoodBasedInterface["colorScheme"] {
    if (emotion.valence < -0.3) {
      return {
        primary: "#6B73FF",
        secondary: "#9B59B6",
        accent: "#3498DB",
        background: "#F8F9FA",
        text: "#2C3E50",
      }
    } else if (emotion.arousal > 0.7) {
      return {
        primary: "#E74C3C",
        secondary: "#F39C12",
        accent: "#E67E22",
        background: "#FDF2E9",
        text: "#2C3E50",
      }
    } else {
      return {
        primary: "#27AE60",
        secondary: "#2ECC71",
        accent: "#1ABC9C",
        background: "#E8F8F5",
        text: "#2C3E50",
      }
    }
  }

  private static getDefaultAnimations(emotion: any): MoodBasedInterface["animations"] {
    if (emotion.arousal > 0.7) {
      return {
        speed: "fast",
        type: "energetic",
        intensity: 0.8,
      }
    } else if (emotion.valence < -0.3) {
      return {
        speed: "slow",
        type: "gentle",
        intensity: 0.3,
      }
    } else {
      return {
        speed: "normal",
        type: "gentle",
        intensity: 0.5,
      }
    }
  }

  private static getDefaultLayout(emotion: any): MoodBasedInterface["layout"] {
    if (emotion.arousal > 0.7) {
      return {
        spacing: "compact",
        elements: "minimal",
        focus: "single",
      }
    } else {
      return {
        spacing: "normal",
        elements: "standard",
        focus: "multi",
      }
    }
  }

  private static getDefaultInteractions(emotion: any): MoodBasedInterface["interactions"] {
    if (emotion.valence < -0.3) {
      return {
        feedback: "pronounced",
        responsiveness: 0.9,
        guidance: "detailed",
      }
    } else {
      return {
        feedback: "normal",
        responsiveness: 0.7,
        guidance: "helpful",
      }
    }
  }

  private static getFallbackInterface(emotion: any): MoodBasedInterface {
    return {
      colorScheme: this.getDefaultColorScheme(emotion),
      animations: this.getDefaultAnimations(emotion),
      layout: this.getDefaultLayout(emotion),
      interactions: this.getDefaultInteractions(emotion),
    }
  }

  private static getAdaptiveTone(currentEmotion: any, targetEmotion: string): string {
    if (currentEmotion.valence < -0.5) return "supportive"
    if (currentEmotion.arousal > 0.8) return "calming"
    if (targetEmotion === "confidence") return "encouraging"
    return "balanced"
  }

  private static getAdaptiveResponsiveness(emotion: any): number {
    return Math.max(0.3, 1.0 - emotion.arousal * 0.5)
  }

  private static getAdaptiveGuidance(emotion: any): string {
    if (emotion.valence < -0.3) return "detailed"
    if (emotion.arousal > 0.7) return "minimal"
    return "helpful"
  }

  private static getAdaptiveFeedback(emotion: any): string {
    if (emotion.intensity > 0.7) return "pronounced"
    if (emotion.valence < -0.3) return "pronounced"
    return "normal"
  }

  private static calculateInterventionSuccess(
    profile: EmotionalProfile,
    interventions: EmotionalIntervention[],
    currentEmotion: any,
  ): number {
    let baseSuccess = 0.6

    // 基于历史成功率调整
    const relevantHistory = profile.adaptationHistory.filter((record) =>
      interventions.some((i) => i.type === record.intervention),
    )

    if (relevantHistory.length > 0) {
      const avgSuccess = relevantHistory.reduce((sum, r) => sum + (r.success ? 1 : 0), 0) / relevantHistory.length
      baseSuccess = (baseSuccess + avgSuccess) / 2
    }

    // 基于情绪强度调整
    if (currentEmotion.intensity > 0.8) {
      baseSuccess *= 0.8 // 强烈情绪更难干预
    }

    return Math.min(baseSuccess, 0.95)
  }

  private static async generateFollowUpActions(currentEmotion: any, targetEmotion: string): Promise<string[]> {
    const actions = []

    if (currentEmotion.valence < -0.3) {
      actions.push("安排后续情绪检查", "提供额外支持资源")
    }

    if (targetEmotion === "calm") {
      actions.push("监控压力水平", "建议放松活动")
    }

    if (targetEmotion === "confident") {
      actions.push("提供成就确认", "设置积极目标")
    }

    return actions
  }

  private static identifyEmotionalAdaptations(response: string, emotion: any): string[] {
    const adaptations = []

    if (response.includes("理解") || response.includes("感受")) {
      adaptations.push("empathetic_language")
    }

    if (emotion.valence < -0.3 && (response.includes("支持") || response.includes("帮助"))) {
      adaptations.push("supportive_tone")
    }

    if (emotion.arousal > 0.7 && response.length < 200) {
      adaptations.push("concise_response")
    }

    return adaptations
  }

  private static calculateSupportLevel(emotion: any): number {
    let support = 0.5

    if (emotion.valence < -0.3) support += 0.3
    if (emotion.intensity > 0.7) support += 0.2
    if (emotion.primary === "anxiety" || emotion.primary === "stress") support += 0.2

    return Math.min(support, 1.0)
  }

  private static async generateEmotionalFollowUp(emotion: any, response: string): Promise<string[]> {
    const questions = []

    if (emotion.valence < -0.3) {
      questions.push("您现在感觉如何？", "还有什么我可以帮助您的吗？")
    }

    if (emotion.arousal > 0.7) {
      questions.push("您希望我们放慢节奏吗？", "需要休息一下吗？")
    }

    return questions.slice(0, 2)
  }

  private static determineResponseTone(emotion: any): string {
    if (emotion.valence < -0.5) return "supportive"
    if (emotion.arousal > 0.8) return "calming"
    if (emotion.primary === "joy") return "enthusiastic"
    return "balanced"
  }

  private static async optimizeInterventionModel(userId: string, record: AdaptationRecord): Promise<void> {
    // 机器学习模型优化（简化实现）
    console.log(`优化用户 ${userId} 的干预模型，基于记录:`, record)
  }

  private static calculateGroupEmotion(weightedEmotions: any[]): any {
    const totalWeight = weightedEmotions.reduce((sum, e) => sum + e.weight, 0)

    const avgValence = weightedEmotions.reduce((sum, e) => sum + e.valence * e.weight, 0) / totalWeight
    const avgArousal = weightedEmotions.reduce((sum, e) => sum + e.arousal * e.weight, 0) / totalWeight

    // 确定主导情绪
    const emotionCounts = new Map()
    weightedEmotions.forEach((e) => {
      const count = emotionCounts.get(e.primary) || 0
      emotionCounts.set(e.primary, count + e.weight)
    })

    const primary = Array.from(emotionCounts.entries()).sort((a, b) => b[1] - a[1])[0][0]

    return {
      primary,
      secondary: Array.from(emotionCounts.keys()).slice(1, 4),
      valence: avgValence,
      arousal: avgArousal,
    }
  }

  private static analyzeEmotionalDynamics(participants: any[]): any {
    // 分析群体情绪动态
    const emotions = participants.map((p) => p.emotion.primary)
    const uniqueEmotions = new Set(emotions)

    const diversity = uniqueEmotions.size / participants.length
    const conflict = this.calculateEmotionalConflict(participants)
    const harmony = 1 - conflict

    return {
      diversity,
      conflict,
      harmony,
      polarization: this.calculatePolarization(participants),
    }
  }

  private static calculateEmotionalConflict(participants: any[]): number {
    let conflict = 0
    const n = participants.length

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const diff = Math.abs(participants[i].emotion.valence - participants[j].emotion.valence)
        conflict += diff
      }
    }

    return conflict / ((n * (n - 1)) / 2)
  }

  private static calculatePolarization(participants: any[]): number {
    const valences = participants.map((p) => p.emotion.valence)
    const mean = valences.reduce((sum, v) => sum + v, 0) / valences.length
    const variance = valences.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / valences.length

    return Math.sqrt(variance)
  }

  private static async generateGroupRecommendations(groupEmotion: any, dynamics: any): Promise<string[]> {
    const recommendations = []

    if (dynamics.conflict > 0.7) {
      recommendations.push("建议进行团队情绪调节", "考虑分组活动")
    }

    if (groupEmotion.valence < -0.3) {
      recommendations.push("提供团队支持", "安排积极活动")
    }

    if (dynamics.diversity < 0.3) {
      recommendations.push("鼓励多元化表达", "创造安全空间")
    }

    return recommendations
  }

  // 音频分析辅助方法
  private static calculatePitch(audioData: Float32Array): number {
    // 简化的基频检测
    let sum = 0
    for (let i = 0; i < audioData.length; i++) {
      sum += Math.abs(audioData[i])
    }
    return (sum / audioData.length) * 440 // 模拟基频
  }

  private static calculateEnergy(audioData: Float32Array): number {
    let energy = 0
    for (let i = 0; i < audioData.length; i++) {
      energy += audioData[i] * audioData[i]
    }
    return Math.sqrt(energy / audioData.length)
  }

  private static calculateTempo(audioData: Float32Array): number {
    // 简化的节拍检测
    return 120 + Math.random() * 60 // 模拟BPM
  }
}
