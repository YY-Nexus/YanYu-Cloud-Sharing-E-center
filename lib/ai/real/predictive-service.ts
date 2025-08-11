import type { PredictiveService, Timeframe } from "../interface"
import type { PredictiveInsight } from "@/lib/predictive-interaction"
import { getEnvVariable } from "@/lib/env"

export class RealPredictiveService implements PredictiveService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = getEnvVariable("PREDICTIVE_API_KEY")
    this.baseUrl = getEnvVariable("PREDICTIVE_BASE_URL", { defaultValue: "https://api.real-predictive.ai" })
  }

  async initialize() {}

  async initializeForUser(userId: string) {
    await fetch(`${this.baseUrl}/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ user_id: userId }),
    })
  }

  async getModelPerformance(userId: string) {
    const res = await fetch(`${this.baseUrl}/performance?user_id=${encodeURIComponent(userId)}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    })
    if (!res.ok) return null
    return res.json()
  }

  async predictNextAction(userId: string, timeframe: Timeframe): Promise<PredictiveInsight | null> {
    const res = await fetch(`${this.baseUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ user_id: userId, timeframe }),
    })
    if (!res.ok) return null
    return res.json()
  }

  async optimizePredictionAlgorithm(userId: string) {
    await fetch(`${this.baseUrl}/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ user_id: userId }),
    })
  }
}
