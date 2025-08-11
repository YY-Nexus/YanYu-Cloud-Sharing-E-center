import type { EmotionAIService, PredictiveService } from "./interface"
import { MockEmotionAIService } from "./mock/emotion-service"
import { MockPredictiveService } from "./mock/predictive-service"
import { RealEmotionAIService } from "./real/emotion-service"
import { RealPredictiveService } from "./real/predictive-service"

const useReal = (process.env.USE_REAL_AI_SERVICES || "").toLowerCase() === "true"

export const getEmotionAIService = (): EmotionAIService => {
  return useReal ? new RealEmotionAIService() : new MockEmotionAIService()
}

export const getPredictiveService = (): PredictiveService => {
  return useReal ? new RealPredictiveService() : new MockPredictiveService()
}
