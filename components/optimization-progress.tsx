"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle, AlertCircle, TrendingUp, Clock, Cpu, Database, Brain } from 'lucide-react'

interface OptimizationProgressProps {
  isOptimizing: boolean
  onComplete: (results: any) => void
}

export function OptimizationProgress({ isOptimizing, onComplete }: OptimizationProgressProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)

  const optimizationSteps = [
    {
      id: "data-analysis",
      name: "数据分析",
      description: "分析用户行为模式和历史数据",
      icon: <Database className="w-4 h-4" />,
      duration: 15000,
    },
    {
      id: "model-training",
      name: "模型训练",
      description: "使用最新数据重新训练预测模型",
      icon: <Brain className="w-4 h-4" />,
      duration: 45000,
    },
    {
      id: "parameter-tuning",
      name: "参数调优",
      description: "自动调整模型超参数以获得最佳性能",
      icon: <Cpu className="w-4 h-4" />,
      duration: 30000,
    },
    {
      id: "validation",
      name: "性能验证",
      description: "验证优化后的模型性能和准确性",
      icon: <CheckCircle className="w-4 h-4" />,
      duration: 20000,
    },
  ]

  useEffect(() => {
    if (!isOptimizing) return

    let totalDuration = 0
    let currentDuration = 0

    const runOptimization = async () => {
      for (let i = 0; i < optimizationSteps.length; i++) {
        setCurrentStep(i)
        setStepProgress(0)

        const step = optimizationSteps[i]
        const stepDuration = step.duration

        // 模拟步骤进度
        const stepInterval = setInterval(() => {
          setStepProgress(prev => {
            const newProgress = prev + (100 / (stepDuration / 100))
            if (newProgress >= 100) {
              clearInterval(stepInterval)
              return 100
            }
            return newProgress
          })
        }, 100)

        // 更新总体进度
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + (100 / (optimizationSteps.reduce((sum, s) => sum + s.duration, 0) / 100))
            if (newProgress >= 100) {
              clearInterval(progressInterval)
              return 100
            }
            return newProgress
          })
        }, 100)

        await new Promise(resolve => setTimeout(resolve, stepDuration))
        
        clearInterval(stepInterval)
        clearInterval(progressInterval)
        setStepProgress(100)
      }

      // 完成优化
      setTimeout(() => {
        const results = {
          success: true,
          improvements: {
            accuracy: 0.08,
            precision: 0.12,
            recall: 0.06,
            latencyReduction: 15,
          },
          optimizedParameters: {
            learningRate: 0.008,
            batchSize: 64,
            epochs: 150,
          },
          timestamp: new Date(),
        }
        onComplete(results)
      }, 1000)
    }

    runOptimization()
  }, [isOptimizing, onComplete])

  if (!isOptimizing) return null

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <Zap className="w-5 h-5 animate-pulse" />
          <span>AI模型优化进行中</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 总体进度 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">总体进度</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* 当前步骤 */}
        <div className="space-y-4">
          {optimizationSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                index === currentStep
                  ? "bg-white border-2 border-blue-300 shadow-sm"
                  : index < currentStep
                  ? "bg-green-50 border border-green-200"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index === currentStep
                    ? "bg-blue-100 text-blue-600"
                    : index < currentStep
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{step.name}</h4>
                  {index === currentStep && (
                    <Badge className="bg-blue-500">
                      {Math.round(stepProgress)}%
                    </Badge>
                  )}
                  {index < currentStep && (
                    <Badge className="bg-green-500">完成</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                
                {index === currentStep && (
                  <Progress value={stepProgress} className="h-2" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 优化信息 */}
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium mb-3 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span>预期改进</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-green-600">+8-12%</div>
              <div className="text-gray-600">准确率</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-600">+6-10%</div>
              <div className="text-gray-600">精确率</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-purple-600">+5-8%</div>
              <div className="text-gray-600">召回率</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-orange-600">-10-20%</div>
              <div className="text-gray-600">响应时间</div>
            </div>
          </div>
        </div>

        {/* 估计剩余时间 */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>
            预计剩余时间: {Math.max(0, Math.round((100 - progress) * 1.2))} 秒
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
