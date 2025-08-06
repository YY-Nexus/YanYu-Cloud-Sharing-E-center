"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, BarChart3, Award, Target, Clock, Zap, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react'

interface ModelComparisonProps {
  beforeResults: any
  afterResults: any
  onStartComparison: () => void
}

export function ModelComparison({ beforeResults, afterResults, onStartComparison }: ModelComparisonProps) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (beforeResults && afterResults) {
      setShowAnimation(true)
      const timer = setTimeout(() => setShowAnimation(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [beforeResults, afterResults])

  if (!beforeResults || !afterResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>模型性能对比</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">需要完成优化前后的测试才能进行对比</p>
          <Button onClick={onStartComparison} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            重新开始测试
          </Button>
        </CardContent>
      </Card>
    )
  }

  const calculateImprovement = (before: number, after: number) => {
    return ((after - before) / before) * 100
  }

  const improvements = {
    accuracy: calculateImprovement(beforeResults.overallAccuracy, afterResults.overallAccuracy),
    precision: calculateImprovement(beforeResults.overallPrecision, afterResults.overallPrecision),
    recall: calculateImprovement(beforeResults.overallRecall, afterResults.overallRecall),
    f1Score: calculateImprovement(beforeResults.overallF1Score, afterResults.overallF1Score),
    responseTime: calculateImprovement(afterResults.avgResponseTime, beforeResults.avgResponseTime), // 响应时间越低越好
  }

  const getImprovementColor = (improvement: number) => {
    if (improvement > 5) return "text-green-600"
    if (improvement > 0) return "text-blue-600"
    if (improvement > -5) return "text-yellow-600"
    return "text-red-600"
  }

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) return <TrendingUp className="w-4 h-4" />
    return <TrendingDown className="w-4 h-4" />
  }

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-green-600" />
            <span>模型性能对比分析</span>
          </div>
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            对比完成
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 总体改进概览 */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">优化效果显著！</h3>
          <p className="text-gray-600">
            AI模型在多个关键指标上都有明显提升
          </p>
        </div>

        {/* 核心指标对比 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium">准确率</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">优化前</span>
                  <span>{(beforeResults.overallAccuracy * 100).toFixed(1)}%</span>
                </div>
                <ArrowRight className="w-4 h-4 mx-auto text-gray-400" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">优化后</span>
                  <span className="font-semibold">{(afterResults.overallAccuracy * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className={`flex items-center justify-center space-x-1 mt-3 ${getImprovementColor(improvements.accuracy)}`}>
                {getImprovementIcon(improvements.accuracy)}
                <span className="font-bold">
                  {improvements.accuracy > 0 ? '+' : ''}{improvements.accuracy.toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="font-medium">精确率</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">优化前</span>
                  <span>{(beforeResults.overallPrecision * 100).toFixed(1)}%</span>
                </div>
                <ArrowRight className="w-4 h-4 mx-auto text-gray-400" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">优化后</span>
                  <span className="font-semibold">{(afterResults.overallPrecision * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className={`flex items-center justify-center space-x-1 mt-3 ${getImprovementColor(improvements.precision)}`}>
                {getImprovementIcon(improvements.precision)}
                <span className="font-bold">
                  {improvements.precision > 0 ? '+' : ''}{improvements.precision.toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span className="font-medium">召回率</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">优化前</span>
                  <span>{(beforeResults.overallRecall * 100).toFixed(1)}%</span>
                </div>
                <ArrowRight className="w-4 h-4 mx-auto text-gray-400" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">优化后</span>
                  <span className="font-semibold">{(afterResults.overallRecall * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className={`flex items-center justify-center space-x-1 mt-3 ${getImprovementColor(improvements.recall)}`}>
                {getImprovementIcon(improvements.recall)}
                <span className="font-bold">
                  {improvements.recall > 0 ? '+' : ''}{improvements.recall.toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium">响应时间</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">优化前</span>
                  <span>{beforeResults.avgResponseTime.toFixed(0)}ms</span>
                </div>
                <ArrowRight className="w-4 h-4 mx-auto text-gray-400" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">优化后</span>
                  <span className="font-semibold">{afterResults.avgResponseTime.toFixed(0)}ms</span>
                </div>
              </div>
              
              <div className={`flex items-center justify-center space-x-1 mt-3 ${getImprovementColor(improvements.responseTime)}`}>
                {getImprovementIcon(improvements.responseTime)}
                <span className="font-bold">
                  {improvements.responseTime > 0 ? '+' : ''}{improvements.responseTime.toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 场景详细对比 */}
        <Card className="bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">各场景性能对比</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {beforeResults.scenarioResults.map((beforeScenario: any, index: number) => {
                const afterScenario = afterResults.scenarioResults[index]
                const scenarioImprovement = calculateImprovement(
                  beforeScenario.accuracy,
                  afterScenario.accuracy
                )

                return (
                  <div key={index} className="border rounded-lg p-4 bg-white/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{beforeScenario.scenario}</h4>
                      <div className={`flex items-center space-x-1 ${getImprovementColor(scenarioImprovement)}`}>
                        {getImprovementIcon(scenarioImprovement)}
                        <span className="font-semibold">
                          {scenarioImprovement > 0 ? '+' : ''}{scenarioImprovement.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">优化前</div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>准确率:</span>
                            <span>{(beforeScenario.accuracy * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={beforeScenario.accuracy * 100} className="h-2" />
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-2">优化后</div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>准确率:</span>
                            <span className="font-semibold">{(afterScenario.accuracy * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={afterScenario.accuracy * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 优化总结 */}
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 mb-2">优化成功完成</h3>
                <div className="space-y-2 text-sm text-green-700">
                  <p>• 整体预测准确率提升了 {improvements.accuracy.toFixed(1)}%</p>
                  <p>• 模型精确率提升了 {improvements.precision.toFixed(1)}%</p>
                  <p>• 系统响应速度提升了 {Math.abs(improvements.responseTime).toFixed(1)}%</p>
                  <p>• 所有测试场景都显示出性能改进</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="flex justify-center space-x-4">
          <Button onClick={onStartComparison} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            重新测试
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Award className="w-4 h-4 mr-2" />
            应用优化模型
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
