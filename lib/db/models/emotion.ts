import { dbQuery } from "../client"
import type { EmotionData } from "@/lib/emotion-ai"

export type DbEmotionRecord = {
  id: string
  user_id: string
  primary_emotion: string
  intensity: number
  valence: number
  arousal: number
  created_at: string // 使用 ISO 字符串，便于序列化
}

// 保存情绪数据
export const saveEmotionData = async (userId: string, emotion: EmotionData): Promise<DbEmotionRecord> => {
  const query = `
    INSERT INTO user_emotions (user_id, primary_emotion, intensity, valence, arousal, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING id, user_id, primary_emotion, intensity, valence, arousal, created_at
  `
  const params = [userId, emotion.primary, emotion.intensity, emotion.valence, emotion.arousal]
  const [row] = await dbQuery<DbEmotionRecord>(query, params)
  return row
}

// 查询最近情绪数据
export const getRecentEmotions = async (userId: string, limit = 10): Promise<DbEmotionRecord[]> => {
  const query = `
    SELECT id, user_id, primary_emotion, intensity, valence, arousal, created_at
    FROM user_emotions
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2
  `
  return dbQuery<DbEmotionRecord>(query, [userId, limit])
}
