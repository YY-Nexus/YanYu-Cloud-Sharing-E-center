export interface EmotionData {
  primary: "joy" | "sadness" | "anger" | "fear" | "surprise" | "disgust" | "neutral"
  secondary: string[]
  intensity: number // 0-1
  confidence: number // 0-1
  valence: number // -1 to 1 (negative to positive)
  arousal: number // 0-1 (calm to excited)
  timestamp: number
  source: "text" | "voice" | "facial" | "physiological" | "multimodal"
}

export interface ColorTherapyConfig {
  primaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  intensity: number // 0-1
  duration: number // milliseconds
  transition: "smooth" | "pulse" | "wave" | "gradient"
}

export interface BreathingExercise {
  type: "box" | "triangle" | "4-7-8" | "coherent"
  inhaleTime: number
  holdTime: number
  exhaleTime: number
  cycles: number
  guidance: {
    visual: boolean
    audio: boolean
    haptic: boolean
  }
}

export interface MusicTherapySession {
  genre: "ambient" | "classical" | "nature" | "binaural" | "custom"
  tempo: number // BPM
  key: string
  duration: number // minutes
  adaptToEmotion: boolean
  volumeControl: "auto" | "manual"
}

export interface EmotionalIntervention {
  id: string
  type: "color_therapy" | "breathing" | "music" | "mindfulness" | "cognitive_reframe"
  trigger: EmotionData
  config: ColorTherapyConfig | BreathingExercise | MusicTherapySession | any
  effectiveness: number // 0-1, learned over time
  lastUsed: number
  userFeedback: Array<{ rating: number; timestamp: number; notes?: string }>
}

export interface GroupEmotionState {
  groupId: string
  participants: Array<{
    userId: string
    emotion: EmotionData
    influence: number // how much this person affects group mood
  }>
  averageEmotion: EmotionData
  emotionalDynamics: {
    harmony: number // 0-1, how aligned emotions are
    energy: number // 0-1, overall group energy
    stability: number // 0-1, how stable the emotional state is
    trends: Array<{ emotion: string; direction: "rising" | "falling"; strength: number }>
  }
  recommendations: string[]
}

export class EmotionAI {
  private emotionHistory: Map<string, EmotionData[]> = new Map()
  private interventions: Map<string, EmotionalIntervention[]> = new Map()
  private groupStates: Map<string, GroupEmotionState> = new Map()
  private personalityProfiles: Map<string, any> = new Map()
  private currentTherapySessions: Map<string, any> = new Map()

  async analyzeEmotion(input: {
    userId: string
    text?: string
    audioData?: ArrayBuffer
    videoFrame?: ImageData
    physiological?: {
      heartRate?: number
      skinConductance?: number
      temperature?: number
      bloodPressure?: { systolic: number; diastolic: number }
    }
  }): Promise<EmotionData> {
    try {
      const multimodalAnalysis = await this.performMultimodalAnalysis(input)

      // 融合多模态分析结果
      const fusedEmotion = this.fuseEmotionData(multimodalAnalysis)

      // 应用个性化调整
      const personalizedEmotion = this.applyPersonalityAdjustment(input.userId, fusedEmotion)

      // 更新情绪历史
      this.updateEmotionHistory(input.userId, personalizedEmotion)

      // 检查是否需要干预
      await this.checkForIntervention(input.userId, personalizedEmotion)

      return personalizedEmotion
    } catch (error) {
      console.error("情绪分析失败:", error)
      return this.getDefaultEmotion()
    }
  }

  async generateColorTherapy(emotion: EmotionData): Promise<ColorTherapyConfig> {
    // 基于情绪状态生成色彩疗法配置
    const colorMap = {
      joy: { primary: "#FFD700", accent: "#FFA500", bg: "#FFFACD" },
      sadness: { primary: "#87CEEB", accent: "#4682B4", bg: "#F0F8FF" },
      anger: { primary: "#FF6B6B", accent: "#FF4444", bg: "#FFE4E1" },
      fear: { primary: "#DDA0DD", accent: "#9370DB", bg: "#F8F0FF" },
      surprise: { primary: "#98FB98", accent: "#32CD32", bg: "#F0FFF0" },
      disgust: { primary: "#F0E68C", accent: "#DAA520", bg: "#FFFAF0" },
      neutral: { primary: "#D3D3D3", accent: "#A9A9A9", bg: "#F5F5F5" },
    }

    const colors = colorMap[emotion.primary] || colorMap.neutral

    return {
      primaryColor: colors.primary,
      accentColor: colors.accent,
      backgroundColor: colors.bg,
      textColor: this.getOptimalTextColor(colors.bg),
      intensity: Math.max(0.3, 1 - emotion.intensity), // 情绪强度越高，颜色越柔和
      duration: 5000 + emotion.intensity * 10000, // 5-15秒
      transition: emotion.arousal > 0.7 ? "pulse" : "smooth",
    }
  }

  async generateBreathingExercise(emotion: EmotionData): Promise<BreathingExercise> {
    // 根据情绪状态推荐呼吸练习
    let exerciseType: BreathingExercise["type"] = "box"
    let inhale = 4,
      hold = 4,
      exhale = 4,
      cycles = 5

    if (emotion.primary === "anger" || emotion.arousal > 0.8) {
      // 高激活状态，使用4-7-8呼吸法平静
      exerciseType = "4-7-8"
      inhale = 4
      hold = 7
      exhale = 8
      cycles = 4
    } else if (emotion.primary === "sadness" || emotion.valence < -0.5) {
      // 低情绪状态，使用连贯呼吸提升能量
      exerciseType = "coherent"
      inhale = 5
      hold = 0
      exhale = 5
      cycles = 10
    } else if (emotion.primary === "fear" || emotion.primary === "surprise") {
      // 不稳定状态，使用盒式呼吸稳定
      exerciseType = "box"
      inhale = 4
      hold = 4
      exhale = 4
      cycles = 6
    }

    return {
      type: exerciseType,
      inhaleTime: inhale,
      holdTime: hold,
      exhaleTime: exhale,
      cycles,
      guidance: {
        visual: true,
        audio: emotion.intensity > 0.6, // 强烈情绪时提供音频指导
        haptic: false, // 可以根据设备能力启用
      },
    }
  }

  async generateMusicTherapy(emotion: EmotionData): Promise<MusicTherapySession> {
    const musicMap = {
      joy: { genre: "ambient", tempo: 120, key: "C major", duration: 10 },
      sadness: { genre: "classical", tempo: 60, key: "D minor", duration: 15 },
      anger: { genre: "nature", tempo: 40, key: "F major", duration: 20 },
      fear: { genre: "ambient", tempo: 70, key: "G major", duration: 12 },
      surprise: { genre: "binaural", tempo: 100, key: "A major", duration: 8 },
      disgust: { genre: "nature", tempo: 50, key: "E minor", duration: 10 },
      neutral: { genre: "ambient", tempo: 80, key: "C major", duration: 10 },
    } as const

    const config = musicMap[emotion.primary] || musicMap.neutral

    return {
      genre: config.genre,
      tempo: config.tempo + emotion.arousal * 20, // 调整节拍适应激活水平
      key: config.key,
      duration: config.duration,
      adaptToEmotion: true,
      volumeControl: "auto",
    }
  }

  async analyzeGroupEmotion(
    groupId: string,
    participants: Array<{ userId: string; emotion: EmotionData }>,
  ): Promise<GroupEmotionState> {
    // 计算群体情绪状态
    const totalParticipants = participants.length
    if (totalParticipants === 0) {
      throw new Error("群体中没有参与者")
    }

    // 计算平均情绪
    const emotionCounts = new Map<string, number>()
    let totalValence = 0
    let totalArousal = 0
    let totalIntensity = 0

    participants.forEach(({ emotion }) => {
      emotionCounts.set(emotion.primary, (emotionCounts.get(emotion.primary) || 0) + 1)
      totalValence += emotion.valence
      totalArousal += emotion.arousal
      totalIntensity += emotion.intensity
    })

    // 找出主导情绪
    const dominantEmotion = Array.from(emotionCounts.entries()).sort(
      ([, a], [, b]) => b - a,
    )[0][0] as EmotionData["primary"]

    const averageEmotion: EmotionData = {
      primary: dominantEmotion,
      secondary: [],
      intensity: totalIntensity / totalParticipants,
      confidence: 0.8,
      valence: totalValence / totalParticipants,
      arousal: totalArousal / totalParticipants,
      timestamp: Date.now(),
      source: "multimodal",
    }

    // 计算情绪动态
    const emotionalDynamics = this.calculateEmotionalDynamics(participants)

    // 生成建议
    const recommendations = this.generateGroupRecommendations(averageEmotion, emotionalDynamics)

    const groupState: GroupEmotionState = {
      groupId,
      participants: participants.map((p) => ({
        ...p,
        influence: this.calculateEmotionalInfluence(p.userId, participants),
      })),
      averageEmotion,
      emotionalDynamics,
      recommendations,
    }

    this.groupStates.set(groupId, groupState)
    return groupState
  }

  async adaptUIToEmotion(userId: string, emotion: EmotionData): Promise<any> {
    const colorTherapy = await this.generateColorTherapy(emotion)

    // 生成UI适应配置
    const uiConfig = {
      colors: colorTherapy,
      layout: {
        spacing: emotion.intensity > 0.7 ? "relaxed" : "normal",
        animations: emotion.arousal > 0.6 ? "minimal" : "normal",
        contrast: emotion.primary === "fear" ? "high" : "normal",
      },
      interactions: {
        responseTime: emotion.arousal > 0.8 ? "immediate" : "normal",
        feedback: emotion.intensity > 0.6 ? "enhanced" : "standard",
        guidance: emotion.confidence < 0.6 ? "detailed" : "minimal",
      },
      content: {
        tone: this.getContentTone(emotion),
        complexity: emotion.arousal > 0.7 ? "simplified" : "normal",
        supportLevel: emotion.valence < -0.3 ? "high" : "normal",
      },
    }

    return uiConfig
  }

  startEmotionalIntervention(userId: string, intervention: EmotionalIntervention): void {
    const userInterventions = this.interventions.get(userId) || []
    userInterventions.push(intervention)
    this.interventions.set(userId, userInterventions)

    // 开始干预会话
    this.currentTherapySessions.set(`${userId}_${intervention.id}`, {
      startTime: Date.now(),
      intervention,
      progress: 0,
      userEngagement: 1.0,
    })
  }

  async recordInterventionFeedback(
    userId: string,
    interventionId: string,
    feedback: { rating: number; notes?: string },
  ): Promise<void> {
    const userInterventions = this.interventions.get(userId) || []
    const intervention = userInterventions.find((i) => i.id === interventionId)

    if (intervention) {
      intervention.userFeedback.push({
        rating: feedback.rating,
        timestamp: Date.now(),
        notes: feedback.notes,
      })

      // 更新干预效果评估
      const avgRating =
        intervention.userFeedback.reduce((sum, f) => sum + f.rating, 0) / intervention.userFeedback.length
      intervention.effectiveness = avgRating / 5 // 转换为0-1范围
    }
  }

  getEmotionHistory(userId: string, timeRange?: { start: number; end: number }): EmotionData[] {
    const history = this.emotionHistory.get(userId) || []

    if (timeRange) {
      return history.filter((emotion) => emotion.timestamp >= timeRange.start && emotion.timestamp <= timeRange.end)
    }

    return history
  }

  getEmotionTrends(userId: string, period: "hour" | "day" | "week" | "month"): any {
    const history = this.getEmotionHistory(userId)
    if (history.length === 0) return null

    const now = Date.now()
    const periodMs = {
      hour: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
    }[period]

    const recentHistory = history.filter((emotion) => emotion.timestamp > now - periodMs)

    if (recentHistory.length === 0) return null

    // 计算趋势
    const valenceValues = recentHistory.map((e) => e.valence)
    const arousalValues = recentHistory.map((e) => e.arousal)

    return {
      period,
      dataPoints: recentHistory.length,
      valence: {
        average: valenceValues.reduce((a, b) => a + b, 0) / valenceValues.length,
        trend: this.calculateTrend(valenceValues),
        stability: this.calculateStability(valenceValues),
      },
      arousal: {
        average: arousalValues.reduce((a, b) => a + b, 0) / arousalValues.length,
        trend: this.calculateTrend(arousalValues),
        stability: this.calculateStability(arousalValues),
      },
      dominantEmotions: this.getDominantEmotions(recentHistory),
    }
  }

  private async performMultimodalAnalysis(input: any): Promise<any[]> {
    const analyses = []

    // 文本情绪分析
    if (input.text) {
      analyses.push(await this.analyzeTextEmotion(input.text))
    }

    // 语音情绪分析
    if (input.audioData) {
      analyses.push(await this.analyzeVoiceEmotion(input.audioData))
    }

    // 面部表情分析
    if (input.videoFrame) {
      analyses.push(await this.analyzeFacialEmotion(input.videoFrame))
    }

    // 生理信号分析
    if (input.physiological) {
      analyses.push(await this.analyzePhysiologicalEmotion(input.physiological))
    }

    return analyses
  }

  private async analyzeTextEmotion(text: string): Promise<EmotionData> {
    // 简化的文本情绪分析
    // 实际应用中应该使用更复杂的NLP模型

    const emotionKeywords = {
      joy: ["开心", "快乐", "高兴", "兴奋", "愉快", "满意"],
      sadness: ["难过", "伤心", "沮丧", "失望", "悲伤", "郁闷"],
      anger: ["生气", "愤怒", "恼火", "烦躁", "气愤", "不满"],
      fear: ["害怕", "恐惧", "担心", "焦虑", "紧张", "不安"],
      surprise: ["惊讶", "意外", "震惊", "吃惊", "惊奇"],
      disgust: ["恶心", "厌恶", "反感", "讨厌"],
    }

    let maxScore = 0
    let detectedEmotion: EmotionData["primary"] = "neutral"

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      const score = keywords.reduce((count, keyword) => count + (text.includes(keyword) ? 1 : 0), 0)

      if (score > maxScore) {
        maxScore = score
        detectedEmotion = emotion as EmotionData["primary"]
      }
    }

    return {
      primary: detectedEmotion,
      secondary: [],
      intensity: Math.min(maxScore / 3, 1),
      confidence: maxScore > 0 ? 0.7 : 0.5,
      valence: this.getEmotionValence(detectedEmotion),
      arousal: this.getEmotionArousal(detectedEmotion),
      timestamp: Date.now(),
      source: "text",
    }
  }

  private async analyzeVoiceEmotion(audioData: ArrayBuffer): Promise<EmotionData> {
    // 语音情绪分析的简化实现
    // 实际应用中需要使用音频处理库和机器学习模型

    return {
      primary: "neutral",
      secondary: [],
      intensity: 0.5,
      confidence: 0.6,
      valence: 0,
      arousal: 0.5,
      timestamp: Date.now(),
      source: "voice",
    }
  }

  private async analyzeFacialEmotion(videoFrame: ImageData): Promise<EmotionData> {
    // 面部表情分析的简化实现
    // 实际应用中需要使用计算机视觉库

    return {
      primary: "neutral",
      secondary: [],
      intensity: 0.5,
      confidence: 0.7,
      valence: 0,
      arousal: 0.5,
      timestamp: Date.now(),
      source: "facial",
    }
  }

  private async analyzePhysiologicalEmotion(physiological: any): Promise<EmotionData> {
    // 基于生理信号的情绪分析
    let arousal = 0.5
    let valence = 0
    let primary: EmotionData["primary"] = "neutral"

    if (physiological.heartRate) {
      // 心率分析
      if (physiological.heartRate > 100) {
        arousal = Math.min((physiological.heartRate - 60) / 100, 1)
        primary = arousal > 0.8 ? "fear" : "surprise"
      } else if (physiological.heartRate < 60) {
        arousal = 0.3
        valence = -0.3
        primary = "sadness"
      }
    }

    if (physiological.skinConductance) {
      // 皮肤电导分析
      if (physiological.skinConductance > 10) {
        arousal = Math.max(arousal, 0.8)
        primary = "anger"
      }
    }

    return {
      primary,
      secondary: [],
      intensity: arousal,
      confidence: 0.6,
      valence,
      arousal,
      timestamp: Date.now(),
      source: "physiological",
    }
  }

  private fuseEmotionData(analyses: EmotionData[]): EmotionData {
    if (analyses.length === 0) {
      return this.getDefaultEmotion()
    }

    if (analyses.length === 1) {
      return analyses[0]
    }

    // 加权融合多模态分析结果
    const weights = {
      text: 0.3,
      voice: 0.25,
      facial: 0.3,
      physiological: 0.15,
    }

    let totalWeight = 0
    let weightedValence = 0
    let weightedArousal = 0
    let weightedIntensity = 0
    const emotionCounts = new Map<string, number>()

    analyses.forEach((analysis) => {
      const weight = weights[analysis.source] || 0.25
      totalWeight += weight

      weightedValence += analysis.valence * weight
      weightedArousal += analysis.arousal * weight
      weightedIntensity += analysis.intensity * weight

      emotionCounts.set(analysis.primary, (emotionCounts.get(analysis.primary) || 0) + weight)
    })

    // 找出加权后的主导情绪
    const dominantEmotion = Array.from(emotionCounts.entries()).sort(
      ([, a], [, b]) => b - a,
    )[0][0] as EmotionData["primary"]

    return {
      primary: dominantEmotion,
      secondary: Array.from(emotionCounts.keys())
        .filter((e) => e !== dominantEmotion)
        .slice(0, 2),
      intensity: weightedIntensity / totalWeight,
      confidence: Math.min(totalWeight, 1),
      valence: weightedValence / totalWeight,
      arousal: weightedArousal / totalWeight,
      timestamp: Date.now(),
      source: "multimodal",
    }
  }

  private applyPersonalityAdjustment(userId: string, emotion: EmotionData): EmotionData {
    const personality = this.personalityProfiles.get(userId)
    if (!personality) return emotion

    // 根据个性特征调整情绪解读
    // 这里是简化的实现
    const adjusted = { ...emotion }

    if (personality.neuroticism > 0.7) {
      // 高神经质的人情绪强度更高
      adjusted.intensity = Math.min(adjusted.intensity * 1.2, 1)
    }

    if (personality.extraversion < 0.3) {
      // 内向的人可能表达情绪更含蓄
      adjusted.intensity = adjusted.intensity * 0.8
    }

    return adjusted
  }

  private updateEmotionHistory(userId: string, emotion: EmotionData): void {
    const history = this.emotionHistory.get(userId) || []
    history.push(emotion)

    // 保持最近1000条记录
    if (history.length > 1000) {
      history.shift()
    }

    this.emotionHistory.set(userId, history)
  }

  private async checkForIntervention(userId: string, emotion: EmotionData): Promise<void> {
    // 检查是否需要情绪干预
    const needsIntervention =
      emotion.intensity > 0.8 ||
      emotion.valence < -0.7 ||
      (emotion.primary === "anger" && emotion.intensity > 0.6) ||
      (emotion.primary === "fear" && emotion.intensity > 0.5)

    if (needsIntervention) {
      const intervention = await this.createIntervention(userId, emotion)
      this.startEmotionalIntervention(userId, intervention)
    }
  }

  private async createIntervention(userId: string, emotion: EmotionData): Promise<EmotionalIntervention> {
    const interventionType = this.selectInterventionType(emotion)
    let config: any

    switch (interventionType) {
      case "color_therapy":
        config = await this.generateColorTherapy(emotion)
        break
      case "breathing":
        config = await this.generateBreathingExercise(emotion)
        break
      case "music":
        config = await this.generateMusicTherapy(emotion)
        break
      default:
        config = {}
    }

    return {
      id: `intervention_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: interventionType,
      trigger: emotion,
      config,
      effectiveness: 0.5, // 初始值，会根据用户反馈调整
      lastUsed: Date.now(),
      userFeedback: [],
    }
  }

  private selectInterventionType(emotion: EmotionData): EmotionalIntervention["type"] {
    if (emotion.arousal > 0.8) {
      return "breathing" // 高激活状态优先使用呼吸练习
    } else if (emotion.valence < -0.5) {
      return "color_therapy" // 负面情绪使用色彩疗法
    } else if (emotion.intensity > 0.7) {
      return "music" // 强烈情绪使用音乐疗法
    } else {
      return "mindfulness" // 默认使用正念练习
    }
  }

  private calculateEmotionalDynamics(
    participants: Array<{ userId: string; emotion: EmotionData }>,
  ): GroupEmotionState["emotionalDynamics"] {
    const emotions = participants.map((p) => p.emotion)

    // 计算情绪和谐度
    const valences = emotions.map((e) => e.valence)
    const arousals = emotions.map((e) => e.arousal)

    const valenceVariance = this.calculateVariance(valences)
    const arousalVariance = this.calculateVariance(arousals)
    const harmony = 1 - Math.min((valenceVariance + arousalVariance) / 2, 1)

    // 计算群体能量
    const avgArousal = arousals.reduce((a, b) => a + b, 0) / arousals.length
    const energy = avgArousal

    // 计算稳定性
    const stability = 1 - Math.max(valenceVariance, arousalVariance)

    // 分析趋势
    const emotionCounts = new Map<string, number>()
    emotions.forEach((e) => {
      emotionCounts.set(e.primary, (emotionCounts.get(e.primary) || 0) + 1)
    })

    const trends = Array.from(emotionCounts.entries()).map(([emotion, count]) => ({
      emotion,
      direction: count > participants.length / 2 ? "rising" : ("falling" as const),
      strength: count / participants.length,
    }))

    return {
      harmony,
      energy,
      stability,
      trends,
    }
  }

  private calculateEmotionalInfluence(
    userId: string,
    participants: Array<{ userId: string; emotion: EmotionData }>,
  ): number {
    // 简化的影响力计算
    // 实际应用中应该考虑历史数据、社交网络位置等因素
    const userEmotion = participants.find((p) => p.userId === userId)?.emotion
    if (!userEmotion) return 0

    // 情绪强度高的人影响力更大
    return Math.min(userEmotion.intensity * 1.2, 1)
  }

  private generateGroupRecommendations(
    averageEmotion: EmotionData,
    dynamics: GroupEmotionState["emotionalDynamics"],
  ): string[] {
    const recommendations: string[] = []

    if (dynamics.harmony < 0.5) {
      recommendations.push("群体情绪不够和谐，建议进行团队建设活动")
    }

    if (dynamics.energy < 0.3) {
      recommendations.push("群体能量较低，建议安排激励性活动或休息")
    }

    if (averageEmotion.valence < -0.3) {
      recommendations.push("群体情绪偏负面，建议关注成员心理健康")
    }

    if (dynamics.stability < 0.4) {
      recommendations.push("群体情绪波动较大，建议提供稳定的支持环境")
    }

    return recommendations
  }

  private getDefaultEmotion(): EmotionData {
    return {
      primary: "neutral",
      secondary: [],
      intensity: 0.5,
      confidence: 0.5,
      valence: 0,
      arousal: 0.5,
      timestamp: Date.now(),
      source: "multimodal",
    }
  }

  private getEmotionValence(emotion: EmotionData["primary"]): number {
    const valenceMap = {
      joy: 0.8,
      surprise: 0.3,
      neutral: 0,
      disgust: -0.4,
      fear: -0.6,
      anger: -0.7,
      sadness: -0.8,
    }
    return valenceMap[emotion] || 0
  }

  private getEmotionArousal(emotion: EmotionData["primary"]): number {
    const arousalMap = {
      anger: 0.9,
      fear: 0.8,
      surprise: 0.8,
      joy: 0.7,
      disgust: 0.5,
      neutral: 0.5,
      sadness: 0.2,
    }
    return arousalMap[emotion] || 0.5
  }

  private getOptimalTextColor(backgroundColor: string): string {
    // 简化的文本颜色选择逻辑
    // 实际应用中应该计算对比度
    const lightColors = ["#FFFACD", "#F0F8FF", "#FFE4E1", "#F8F0FF", "#F0FFF0", "#FFFAF0", "#F5F5F5"]
    return lightColors.includes(backgroundColor) ? "#333333" : "#FFFFFF"
  }

  private getContentTone(emotion: EmotionData): string {
    if (emotion.valence < -0.5) return "supportive"
    if (emotion.valence > 0.5) return "enthusiastic"
    if (emotion.arousal > 0.7) return "calming"
    return "neutral"
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    const squaredDiffs = values.map((value) => Math.pow(value - mean, 2))
    return squaredDiffs.reduce((a, b) => a + b, 0) / values.length
  }

  private calculateTrend(values: number[]): "rising" | "falling" | "stable" {
    if (values.length < 2) return "stable"

    const first = values.slice(0, Math.floor(values.length / 2))
    const second = values.slice(Math.floor(values.length / 2))

    const firstAvg = first.reduce((a, b) => a + b, 0) / first.length
    const secondAvg = second.reduce((a, b) => a + b, 0) / second.length

    const diff = secondAvg - firstAvg

    if (Math.abs(diff) < 0.1) return "stable"
    return diff > 0 ? "rising" : "falling"
  }

  private calculateStability(values: number[]): number {
    return 1 - this.calculateVariance(values)
  }

  private getDominantEmotions(emotions: EmotionData[]): Array<{ emotion: string; percentage: number }> {
    const counts = new Map<string, number>()
    emotions.forEach((e) => {
      counts.set(e.primary, (counts.get(e.primary) || 0) + 1)
    })

    return Array.from(counts.entries())
      .map(([emotion, count]) => ({
        emotion,
        percentage: (count / emotions.length) * 100,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3)
  }
}

// 全局实例
export const emotionAI = new EmotionAI()
