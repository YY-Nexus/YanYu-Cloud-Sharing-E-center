import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // 模拟数据同步处理
    console.log("同步数据:", data)

    // 模拟处理延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = {
      success: true,
      message: "数据同步成功",
      syncedAt: new Date().toISOString(),
      syncedData: {
        id: data.id,
        type: data.type,
        title: data.title,
        synced: true,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("数据同步失败:", error)

    return NextResponse.json(
      {
        success: false,
        error: "同步失败",
        message: "服务器处理数据时发生错误",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // 获取待同步的数据列表
    const pendingSync = [
      {
        id: "1",
        type: "note",
        title: "待同步笔记1",
        timestamp: Date.now() - 3600000, // 1小时前
      },
      {
        id: "2",
        type: "bookmark",
        title: "待同步书签1",
        timestamp: Date.now() - 1800000, // 30分钟前
      },
    ]

    return NextResponse.json({
      success: true,
      pendingSync,
      count: pendingSync.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "获取同步数据失败",
      },
      { status: 500 },
    )
  }
}
