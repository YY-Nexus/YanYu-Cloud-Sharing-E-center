import { NextResponse } from "next/server"

export async function GET() {
  try {
    // 模拟API响应
    const data = {
      message: "API响应成功",
      timestamp: new Date().toISOString(),
      status: "online",
      data: {
        items: [
          { id: 1, title: "测试项目1", description: "这是一个测试项目" },
          { id: 2, title: "测试项目2", description: "这是另一个测试项目" },
        ],
      },
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      {
        error: "服务器错误",
        message: "无法获取数据",
        offline: false,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 模拟数据处理
    const response = {
      success: true,
      message: "数据提交成功",
      timestamp: new Date().toISOString(),
      receivedData: body,
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        error: "处理失败",
        message: "无法处理提交的数据",
      },
      { status: 400 },
    )
  }
}
