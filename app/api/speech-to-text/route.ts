import { type NextRequest, NextResponse } from "next/server"

// 模拟语音识别结果
const MOCK_SPEECH_RESULTS = [
  {
    text: "你好，我想了解人工智能的基础知识",
    confidence: 0.95,
  },
  {
    text: "请帮我解释一下机器学习的概念",
    confidence: 0.92,
  },
  {
    text: "如何开始学习编程",
    confidence: 0.88,
  },
  {
    text: "Python编程语言有什么特点",
    confidence: 0.91,
  },
  {
    text: "深度学习和机器学习有什么区别",
    confidence: 0.89,
  },
  {
    text: "请推荐一些学习资源",
    confidence: 0.93,
  },
  {
    text: "如何提高编程技能",
    confidence: 0.87,
  },
  {
    text: "数据科学需要学习哪些知识",
    confidence: 0.9,
  },
]

// 分析音频文件属性
function analyzeAudioFile(file: File): {
  duration: number
  quality: "high" | "medium" | "low"
  format: string
  sampleRate: number
} {
  // 模拟音频分析
  const duration = Math.random() * 30 + 5 // 5-35秒
  const quality = file.size > 500000 ? "high" : file.size > 100000 ? "medium" : "low"
  const format = file.type.split("/")[1] || "unknown"
  const sampleRate = quality === "high" ? 44100 : quality === "medium" ? 22050 : 16000

  return {
    duration: Math.round(duration * 100) / 100,
    quality,
    format,
    sampleRate,
  }
}

// 模拟语音识别处理
async function processAudioFile(file: File): Promise<{
  text: string
  confidence: number
  alternatives?: Array<{ text: string; confidence: number }>
  audioInfo: ReturnType<typeof analyzeAudioFile>
  processingTime: number
}> {
  const startTime = Date.now()

  // 分析音频文件
  const audioInfo = analyzeAudioFile(file)

  // 模拟处理时间（基于音频时长）
  const processingDelay = Math.min(audioInfo.duration * 100, 3000) // 最多3秒
  await new Promise((resolve) => setTimeout(resolve, processingDelay))

  // 随机选择一个识别结果
  const result = MOCK_SPEECH_RESULTS[Math.floor(Math.random() * MOCK_SPEECH_RESULTS.length)]

  // 根据音频质量调整置信度
  let adjustedConfidence = result.confidence
  if (audioInfo.quality === "low") {
    adjustedConfidence *= 0.8
  } else if (audioInfo.quality === "high") {
    adjustedConfidence = Math.min(adjustedConfidence * 1.1, 0.99)
  }

  // 生成替代识别结果
  const alternatives = MOCK_SPEECH_RESULTS.filter((r) => r.text !== result.text)
    .slice(0, 2)
    .map((r) => ({
      text: r.text,
      confidence: r.confidence * 0.7, // 替代结果置信度较低
    }))

  const processingTime = Date.now() - startTime

  return {
    text: result.text,
    confidence: Math.round(adjustedConfidence * 100) / 100,
    alternatives,
    audioInfo,
    processingTime,
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return NextResponse.json({ error: "没有找到音频文件" }, { status: 400 })
    }

    // 检查文件类型
    const allowedTypes = ["audio/wav", "audio/mpeg", "audio/mp3", "audio/ogg", "audio/webm"]
    if (!allowedTypes.includes(audioFile.type)) {
      return NextResponse.json({ error: `不支持的音频格式: ${audioFile.type}` }, { status: 400 })
    }

    // 检查文件大小 (最大 10MB)
    const maxSize = 10 * 1024 * 1024
    if (audioFile.size > maxSize) {
      return NextResponse.json({ error: "音频文件过大，请上传小于10MB的文件" }, { status: 400 })
    }

    // 处理音频文件
    const result = await processAudioFile(audioFile)

    const response = {
      success: true,
      result: {
        text: result.text,
        confidence: result.confidence,
        alternatives: result.alternatives,
        metadata: {
          audioInfo: result.audioInfo,
          processingTime: result.processingTime,
          fileSize: audioFile.size,
          fileName: audioFile.name,
        },
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("语音识别错误:", error)
    return NextResponse.json({ error: "语音识别处理失败" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "语音识别API正常运行",
    supportedFormats: ["wav", "mp3", "ogg", "webm"],
    maxFileSize: "10MB",
    features: ["语音转文字", "置信度评估", "多候选结果", "音频质量分析"],
    timestamp: new Date().toISOString(),
  })
}
