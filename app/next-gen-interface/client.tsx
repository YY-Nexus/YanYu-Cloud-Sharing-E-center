"use client"

import React, { useEffect, useRef, useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Lazy load optional presentational components to avoid build-time coupling
const OptimizationProgress = React.lazy(async () => {
  const mod: any = await import("@/components/optimization-progress")
  return { default: mod.default ?? mod.OptimizationProgress ?? (() => null) }
})
const PredictionAccuracyTest = React.lazy(async () => {
  const mod: any = await import("@/components/prediction-accuracy-test")
  return { default: mod.default ?? mod.PredictionAccuracyTest ?? (() => null) }
})
const ModelComparison = React.lazy(async () => {
  const mod: any = await import("@/components/model-comparison")
  return { default: mod.default ?? mod.ModelComparison ?? (() => null) }
})

type AnyModule = Record<string, unknown>

export default function NextGenInterfaceClient() {
  // Refs to hold dynamically imported modules
  const aiEngineRef = useRef<AnyModule | null>(null)
  const predictiveRef = useRef<AnyModule | null>(null)
  const arvrRef = useRef<AnyModule | null>(null)
  const syncRef = useRef<AnyModule | null>(null)
  const emotionRef = useRef<AnyModule | null>(null)

  const [isInitializing, setIsInitializing] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)

  // Only initialize when user clicks, to ensure client-only execution
  const initializeSystem = async () => {
    if (isInitializing || isInitialized) return
    setIsInitializing(true)
    setInitError(null)
    try {
      // Dynamically import advanced modules on client to avoid SSR/static init
      const [advancedAI, predictive, arvr, sync, emotion] = await Promise.allSettled([
        import("@/lib/advanced-ai-engine").catch(() => null),
        import("@/lib/predictive-interaction").catch(() => null),
        import("@/lib/ar-vr-interface").catch(() => null),
        import("@/lib/cross-device-sync").catch(() => null),
        import("@/lib/emotion-ai").catch(() => null),
      ])

      aiEngineRef.current = advancedAI.status === "fulfilled" ? (advancedAI.value as AnyModule) : null
      predictiveRef.current = predictive.status === "fulfilled" ? (predictive.value as AnyModule) : null
      arvrRef.current = arvr.status === "fulfilled" ? (arvr.value as AnyModule) : null
      syncRef.current = sync.status === "fulfilled" ? (sync.value as AnyModule) : null
      emotionRef.current = emotion.status === "fulfilled" ? (emotion.value as AnyModule) : null

      setIsInitialized(true)
    } catch (err: any) {
      setInitError(err?.message ?? "初始化失败")
    } finally {
      setIsInitializing(false)
    }
  }

  useEffect(() => {
    // Optional: auto-initialize on mount
    // initializeSystem()
  }, [])

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">下一代 AI 界面</h1>
        <div className="flex items-center gap-3">
          <Button
            onClick={initializeSystem}
            disabled={isInitializing || isInitialized}
            aria-disabled={isInitializing || isInitialized}
          >
            {isInitializing ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                正在初始化
              </span>
            ) : isInitialized ? (
              "已初始化"
            ) : (
              "初始化系统"
            )}
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>系统状态</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              {"初始化进度："}
              <span className={isInitialized ? "text-green-600" : "text-yellow-600"}>
                {isInitialized ? "完成" : isInitializing ? "进行中" : "未开始"}
              </span>
            </div>
            {initError && (
              <div className="text-sm text-red-600" role="alert">
                {"错误："}
                {initError}
              </div>
            )}
            <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
              <li>
                {"高级 AI 引擎："}
                {aiEngineRef.current ? "已加载" : "未加载"}
              </li>
              <li>
                {"预测交互："}
                {predictiveRef.current ? "已加载" : "未加载"}
              </li>
              <li>
                {"AR/VR 接口："}
                {arvrRef.current ? "已加载" : "未加载"}
              </li>
              <li>
                {"跨设备同步："}
                {syncRef.current ? "已加载" : "未加载"}
              </li>
              <li>
                {"情绪识别："}
                {emotionRef.current ? "已加载" : "未加载"}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>操作</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              disabled={!isInitialized}
              onClick={() => {
                // 示例：后续可在此触发模块方法调用
                console.log("模拟执行：优化模型参数")
              }}
            >
              开始优化
            </Button>
            <Button
              variant="outline"
              disabled={!isInitialized}
              onClick={() => {
                console.log("模拟执行：生成交互预测")
              }}
            >
              生成预测
            </Button>
            <Button
              variant="outline"
              disabled={!isInitialized}
              onClick={() => {
                console.log("模拟执行：同步设备状态")
              }}
            >
              同步设备
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <CardTitle>优化进度</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">正在加载组件...</CardContent>
            </Card>
          }
        >
          <OptimizationProgress />
        </Suspense>

        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <CardTitle>预测准确度测试</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">正在加载组件...</CardContent>
            </Card>
          }
        >
          <PredictionAccuracyTest />
        </Suspense>

        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <CardTitle>模型对比</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">正在加载组件...</CardContent>
            </Card>
          }
        >
          <ModelComparison />
        </Suspense>
      </section>
    </main>
  )
}
