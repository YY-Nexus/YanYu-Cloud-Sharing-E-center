import type { PredictiveService, Timeframe } from "../interface"
import type { PredictiveInsight } from "@/lib/predictive-interaction"

export class MockPredictiveService implements PredictiveService {
  async initialize() {}
  async initializeForUser() {}

  getModelPerformance() {
    return {
      accuracy: 0.91,
      precision: 0.88,
      recall: 0.86,
      predictionLatency: 120,
    }
  }

  async predictNextAction(userId: string, timeframe: Timeframe): Promise<PredictiveInsight | null> {
    const now = Date.now()
    return {
      id: String(now),
      type: "behavior",
      timeframe,
      confidence: 0.82,
      prediction: {
        action: "打开预测交互系统",
        probability: 0.78,
        reasoning: ["近期多次访问预测页", "当前活跃交互组件与历史相似"],
      },
    }
  }

  async optimizePredictionAlgorithm() {
    // mock no-op
  }
}
