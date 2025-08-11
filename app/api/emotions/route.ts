import { NextResponse } from "next/server"
import { hasDbConfig } from "@/lib/db/client"
import { saveEmotionData, getRecentEmotions } from "@/lib/db/models/emotion"
import type { EmotionData } from "@/lib/emotion-ai"

// 注意：该路由默认运行在 Node.js Runtime（不要设置为 edge）

export async function GET() {
  try {
    if (!hasDbConfig()) {
      return NextResponse.json(
        {
          error: "数据库未配置",
          hint: "请配置 DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME",
        },
        { status: 503 },
      )
    }
    const userId = "current_user"
    const emotions = await getRecentEmotions(userId, 10)
    return NextResponse.json(emotions)
  } catch (err: any) {
    console.error("GET /api/emotions 失败:", err)
    return NextResponse.json({ error: "查询失败" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!hasDbConfig()) {
      return NextResponse.json(
        {
          error: "数据库未配置",
          hint: "请配置 DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME",
        },
        { status: 503 },
      )
    }
    const userId = "current_user" // 待与真实认证系统接入
    const emotion = (await request.json()) as EmotionData
    const saved = await saveEmotionData(userId, emotion)
    return NextResponse.json(saved, { status: 201 })
  } catch (err: any) {
    console.error("POST /api/emotions 失败:", err)
    return NextResponse.json({ error: "保存失败" }, { status: 500 })
  }
}
