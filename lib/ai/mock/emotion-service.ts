import type { EmotionAIService } from "../interface"
import type { EmotionData, ColorTherapyConfig } from "@/lib/emotion-ai"

export class MockEmotionAIService implements EmotionAIService {
  async analyzeEmotion(input: { userId: string; text: string }): Promise<EmotionData> {
    const positive = /喜欢|感兴趣|开心|满意|great|love|interested/.test(input.text)
    const intensity = positive ? 0.76 : 0.42
    const valence = positive ? 0.65 : -0.2
    const arousal = positive ? 0.55 : 0.35
    return {
      primary: positive ? "愉悦" : "平静",
      intensity,
      valence,
      arousal,
      secondary: positive ? ["期待", "满足"] : ["专注"],
    }
  }

  async generateColorTherapy(emotion: EmotionData): Promise<ColorTherapyConfig> {
    if (emotion.valence >= 0) {
      return {
        primaryColor: "#7C3AED", // purple-600
        accentColor: "#EC4899", // pink-500
        backgroundColor: "#F5F3FF", // violet-50
        textColor: "#1F2937", // gray-800
      }
    }
    return {
      primaryColor: "#3B82F6", // blue-500
      accentColor: "#10B981", // emerald-500
      backgroundColor: "#EFF6FF", // blue-50
      textColor: "#111827", // gray-900
    }
  }
}
