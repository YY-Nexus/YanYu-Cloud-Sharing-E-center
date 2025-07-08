import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// 支持的文件类型
const ALLOWED_FILE_TYPES = {
  // 图片
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/webp": ".webp",
  // 文档
  "text/plain": ".txt",
  "text/markdown": ".md",
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
  // 音频
  "audio/mpeg": ".mp3",
  "audio/wav": ".wav",
  "audio/ogg": ".ogg",
  // 其他
  "application/json": ".json",
  "text/csv": ".csv",
}

// 最大文件大小 (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

// 文件处理函数
async function processFile(file: File): Promise<{
  filename: string
  originalName: string
  size: number
  type: string
  url: string
  content?: string
}> {
  // 生成唯一文件名
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 15)
  const extension = ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES] || ""
  const filename = `${timestamp}_${randomStr}${extension}`

  // 确保上传目录存在
  const uploadDir = path.join(process.cwd(), "public", "uploads")
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  // 保存文件
  const filePath = path.join(uploadDir, filename)
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  await writeFile(filePath, buffer)

  const result = {
    filename,
    originalName: file.name,
    size: file.size,
    type: file.type,
    url: `/uploads/${filename}`,
  }

  // 如果是文本文件，读取内容
  if (file.type.startsWith("text/") || file.type === "application/json") {
    try {
      const content = buffer.toString("utf-8")
      return { ...result, content }
    } catch (error) {
      console.error("读取文本文件内容失败:", error)
    }
  }

  return result
}

// 分析文件内容
async function analyzeFileContent(
  file: File,
  content?: string,
): Promise<{
  summary: string
  keywords: string[]
  type: "text" | "image" | "audio" | "document" | "other"
  analysis: string
}> {
  const fileType = file.type
  let analysisType: "text" | "image" | "audio" | "document" | "other" = "other"

  if (fileType.startsWith("text/")) {
    analysisType = "text"
  } else if (fileType.startsWith("image/")) {
    analysisType = "image"
  } else if (fileType.startsWith("audio/")) {
    analysisType = "audio"
  } else if (fileType.includes("document") || fileType.includes("pdf")) {
    analysisType = "document"
  }

  let summary = ""
  let keywords: string[] = []
  let analysis = ""

  switch (analysisType) {
    case "text":
      if (content) {
        summary = content.length > 200 ? content.substring(0, 200) + "..." : content
        // 简单的关键词提取
        keywords = content
          .toLowerCase()
          .split(/\W+/)
          .filter((word) => word.length > 3)
          .slice(0, 10)
        analysis = `文本文件包含 ${content.length} 个字符，${content.split("\n").length} 行内容。`
      }
      break

    case "image":
      summary = `图片文件：${file.name}`
      keywords = ["图片", "图像", file.name.split(".")[0]]
      analysis = `图片文件，大小：${(file.size / 1024).toFixed(2)} KB，格式：${fileType}`
      break

    case "audio":
      summary = `音频文件：${file.name}`
      keywords = ["音频", "声音", file.name.split(".")[0]]
      analysis = `音频文件，大小：${(file.size / 1024).toFixed(2)} KB，格式：${fileType}`
      break

    case "document":
      summary = `文档文件：${file.name}`
      keywords = ["文档", "资料", file.name.split(".")[0]]
      analysis = `文档文件，大小：${(file.size / 1024).toFixed(2)} KB，格式：${fileType}`
      break

    default:
      summary = `文件：${file.name}`
      keywords = [file.name.split(".")[0]]
      analysis = `文件大小：${(file.size / 1024).toFixed(2)} KB，格式：${fileType}`
  }

  return {
    summary,
    keywords,
    type: analysisType,
    analysis,
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "没有找到文件" }, { status: 400 })
    }

    // 检查文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `文件大小超过限制 (最大 ${MAX_FILE_SIZE / 1024 / 1024}MB)` }, { status: 400 })
    }

    // 检查文件类型
    if (!ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]) {
      return NextResponse.json({ error: `不支持的文件类型: ${file.type}` }, { status: 400 })
    }

    // 处理文件
    const fileInfo = await processFile(file)

    // 分析文件内容
    const contentAnalysis = await analyzeFileContent(file, fileInfo.content)

    const response = {
      success: true,
      file: fileInfo,
      analysis: contentAnalysis,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("文件上传错误:", error)
    return NextResponse.json({ error: "文件上传失败" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "文件上传API正常运行",
    supportedTypes: Object.keys(ALLOWED_FILE_TYPES),
    maxSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
    timestamp: new Date().toISOString(),
  })
}
