import type { EmotionData, ColorTherapyConfig } from "@/lib/emotion-ai"
import type { PredictiveInsight } from "@/lib/predictive-interaction"

export interface EmotionAIService {
  initialize?(): Promise<void>
  analyzeEmotion(input: { userId: string; text: string }): Promise<EmotionData>
  generateColorTherapy(emotion: EmotionData): Promise<ColorTherapyConfig>
}

export type Timeframe = "immediate" | "short" | "long"

export interface PredictiveService {
  initialize?(): Promise<void>
  initializeForUser?(userId: string): Promise<void>
  getModelPerformance?(userId: string): any
  predictNextAction(userId: string, timeframe: Timeframe): Promise<PredictiveInsight | null>
  optimizePredictionAlgorithm(userId: string): Promise<void>
}
