import type { EmotionAIService } from "../interface"
import type { EmotionData, ColorTherapyConfig } from "@/lib/emotion-ai"
import { getEnvVariable } from "@/lib/env"

export class RealEmotionAIService implements EmotionAIService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = getEnvVariable("EMOTION_AI_API_KEY")
    this.baseUrl = getEnvVariable("EMOTION_AI_BASE_URL", { defaultValue: "https://api.real-emotion-ai.com" })
  }

  async initialize() {
    // 可选：探测健康状态
  }

  async analyzeEmotion(input: { userId: string; text: string }): Promise<EmotionData> {
    const res = await fetch(`${this.baseUrl}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ user_id: input.userId, text: input.text, model: "emotion-v2" }),
    })
    if (!res.ok) {
      throw new Error(`情绪分析API失败: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    const emotion: EmotionData = {
      primary: data.primary_emotion,
      intensity: data.intensity,
      valence: data.valence,
      arousal: data.arousal,
      secondary: data.secondary_emotions || [],
    }
    return emotion
  }

  async generateColorTherapy(emotion: EmotionData): Promise<ColorTherapyConfig> {
    // 如真实服务不提供，可在服务端自定义映射或再次请求
    const res = await fetch(`${this.baseUrl}/color-therapy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ primary: emotion.primary, valence: emotion.valence, arousal: emotion.arousal }),
    })
    if (!res.ok) {
      // 回退策略：本地简单映射
      return {
        primaryColor: emotion.valence >= 0 ? "#7C3AED" : "#3B82F6",
        accentColor: emotion.valence >= 0 ? "#EC4899" : "#10B981",
        backgroundColor: emotion.valence >= 0 ? "#F5F3FF" : "#EFF6FF",
        textColor: "#1F2937",
      }
    }
    return (await res.json()) as ColorTherapyConfig
  }
}
