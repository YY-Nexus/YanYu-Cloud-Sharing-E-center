"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, CheckCircle, XCircle, Target, TrendingUp, BarChart3 } from 'lucide-react'

interface PredictionAccuracyTestProps {
  modelVersion: "before" | "after"
  onTestComplete: (results: any) => void
}

export function PredictionAccuracyTest({ modelVersion, onTestComplete }: PredictionAccuracyTestProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTest, setCurrentTest] = useState(0)
  const [results, setResults] = useState<any>(null)
  const [testData, setTestData] = useState<any[]>([])

  const testScenarios = [
    {
      name: "搜索行为预测",
      description: "预测用户下一步搜索意图",
      expectedAccuracy: modelVersion === "before" ? 0.72 : 0.84,
    },
    {
      name: "界面交互预测",
      description: "预测用户界面操作序列",
      expectedAccuracy: modelVersion === "before" ? 0.68 : 0.79,
    },
    {
      name: "内容偏好预测",
      description: "预测用户内容偏好和兴趣",
      expectedAccuracy: modelVersion === "before" ? 0.75 : 0.87,
    },
    {
      name: "时间模式预测",
      description: "预测用户活跃时间模式",
      expectedAccuracy: modelVersion === "before" ? 0.71 : 0.82,
    },
    {
      name: "设备切换预测",
      description: "预测用户设备使用偏好",
      expectedAccuracy: modelVersion === "before" ? 0.69 : 0.78,
    },
  ]

  const runTest = async () => {
    setIsRunning(true)
    setProgress(0)
    setCurrentTest(0)
    setResults(null)
    setTestData([])

    const testResults: any[] = []

    for (let i = 0; i < testScenarios.length; i++) {
      setCurrentTest(i)
      const scenario = testScenarios[i]

      // 模拟测试运行
      for (let j = 0; j <= 100; j += 5) {
        setProgress((i * 100 + j) / testScenarios.length)
        await new Promise(resolve => setTimeout(resolve, 50))
      }

      // 生成测试结果
      const baseAccuracy = scenario.expectedAccuracy
      const variance = 0.03
      const actualAccuracy = baseAccuracy + (Math.random() - 0.5) * variance

      const testResult = {
        scenario: scenario.name,
        description: scenario.description,
        accuracy: Math.max(0, Math.min(1, actualAccuracy)),
        precision: Math.max(0, Math.min(1, actualAccuracy + (Math.random() - 0.5) * 0.02)),
        recall: Math.max(0, Math.min(1, actualAccuracy + (Math.random() - 0.5) * 0.02)),
        f1Score: 0,
        testCases: 100,
        correctPredictions: Math.round(actualAccuracy * 100),
        avgResponseTime: modelVersion === "before" ? 
          150 + Math.random() * 50 : 
          120 + Math.random() * 30,
      }

      testResult.f1Score = (2 * testResult.precision * testResult.recall) / 
        (testResult.precision + testResult.recall)

      testResults.push(testResult)
      setTestData([...testResults])
    }

    // 计算总体结果
    const overallResults = {
      modelVersion,
      timestamp: new Date(),
      overallAccuracy: testResults.reduce((sum, r) => sum + r.accuracy, 0) / testResults.length,
      overallPrecision: testResults.reduce((sum, r) => sum + r.precision, 0) / testResults.length,
      overallRecall: testResults.reduce((sum, r) => sum + r.recall, 0) / testResults.length,
      overallF1Score: testResults.reduce((sum, r) => sum + r.f1Score, 0) / testResults.length,
      avgResponseTime: testResults.reduce((sum, r) => sum + r.avgResponseTime, 0) / testResults.length,
      totalTestCases: testResults.reduce((sum, r) => sum + r.testCases, 0),
      totalCorrectPredictions: testResults.reduce((sum, r) => sum + r.correctPredictions, 0),
      scenarioResults: testResults,
    }

    setResults(overallResults)
    setIsRunning(false)
    onTestComplete(overallResults)
  }

  const resetTest = () => {
    setProgress(0)
    setCurrentTest(0)
    setResults(null)
    setTestData([])
    setIsRunning(false)
  }

  return (
    <Card className={`${modelVersion === "before" ? "border-orange-200" : "border-green-200"}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className={`w-5 h-5 ${modelVersion === "before" ? "text-orange-600" : "text-green-600"}`} />
            <span>
              {modelVersion === "before" ? "优化前" : "优化后"}模型测试
            </span>
          </div>
          <Badge className={modelVersion === "before" ? "bg-orange-500" : "bg-green-500"}>
            {modelVersion === "before" ? "基准版本" : "优化版本"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 控制按钮 */}
        <div className="flex items-center space-x-2">
          <Button
            onClick={runTest}
            disabled={isRunning}
            className={`${
              modelVersion === "before" 
                ? "bg-orange-600 hover:bg-orange-700" 
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? "测试中..." : "开始测试"}
          </Button>
          
          <Button
            onClick={resetTest}
            variant="outline"
            disabled={isRunning}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重置
          </Button>
        </div>

        {/* 测试进度 */}
        {isRunning && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">测试进度</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="text-sm text-gray-600">
              当前测试: {testScenarios[currentTest]?.name}
            </div>
          </div>
        )}

        {/* 测试结果 */}
        {results && (
          <div className="space-y-6">
            {/* 总体指标 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`text-center p-4 rounded-lg ${
                modelVersion === "before" ? "bg-orange-50" : "bg-green-50"
              }`}>
                <div className={`text-2xl font-bold ${
                  modelVersion === "before" ? "text-orange-600" : "text-green-600"
                }`}>
                  {(results.overallAccuracy * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">总体准确率</div>
              </div>
              
              <div className={`text-center p-4 rounded-lg ${
                modelVersion === "before" ? "bg-orange-50" : "bg-green-50"
              }`}>
                <div className={`text-2xl font-bold ${
                  modelVersion === "before" ? "text-orange-600" : "text-green-600"
                }`}>
                  {(results.overallPrecision * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">精确率</div>
              </div>
              
              <div className={`text-center p-4 rounded-lg ${
                modelVersion === "before" ? "bg-orange-50" : "bg-green-50"
              }`}>
                <div className={`text-2xl font-bold ${
                  modelVersion === "before" ? "text-orange-600" : "text-green-600"
                }`}>
                  {(results.overallRecall * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">召回率</div>
              </div>
              
              <div className={`text-center p-4 rounded-lg ${
                modelVersion === "before" ? "bg-orange-50" : "bg-green-50"
              }`}>
                <div className={`text-2xl font-bold ${
                  modelVersion === "before" ? "text-orange-600" : "text-green-600"
                }`}>
                  {results.avgResponseTime.toFixed(0)}ms
                </div>
                <div className="text-sm text-gray-600">平均响应时间</div>
              </div>
            </div>

            {/* 详细结果 */}
            <div>
              <h4 className="font-medium mb-4 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>详细测试结果</span>
              </h4>
              
              <div className="space-y-3">
                {results.scenarioResults.map((result: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{result.scenario}</h5>
                      <div className="flex items-center space-x-2">
                        {result.accuracy > 0.8 ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : result.accuracy > 0.7 ? (
                          <Target className="w-4 h-4 text-yellow-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <Badge variant="outline">
                          {(result.accuracy * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{result.description}</p>
                    
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <div className="font-medium">{(result.precision * 100).toFixed(1)}%</div>
                        <div className="text-gray-500">精确率</div>
                      </div>
                      <div>
                        <div className="font-medium">{(result.recall * 100).toFixed(1)}%</div>
                        <div className="text-gray-500">召回率</div>
                      </div>
                      <div>
                        <div className="font-medium">{(result.f1Score * 100).toFixed(1)}%</div>
                        <div className="text-gray-500">F1分数</div>
                      </div>
                      <div>
                        <div className="font-medium">{result.correctPredictions}/{result.testCases}</div>
                        <div className="text-gray-500">正确预测</div>
                      </div>
                      <div>
                        <div className="font-medium">{result.avgResponseTime.toFixed(0)}ms</div>
                        <div className="text-gray-500">响应时间</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 空状态 */}
        {!isRunning && !results && (
          <div className="text-center py-8 text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>点击"开始测试"来评估模型性能</p>
            <p className="text-sm">测试将运行多个场景来全面评估预测准确性</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
