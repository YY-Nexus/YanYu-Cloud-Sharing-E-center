import { NextResponse } from "next/server"

export async function GET() {
  // 模拟离线数据响应
  return NextResponse.json({
    message: "离线模式测试数据",
    offline: false,
    timestamp: new Date().toISOString(),
    data: {
      items: [
        {
          id: "test-1",
          title: "测试数据1",
          description: "这是在线获取的测试数据",
        },
        {
          id: "test-2",
          title: "测试数据2",
          description: "这是另一条在线测试数据",
        },
      ],
    },
  })
}
