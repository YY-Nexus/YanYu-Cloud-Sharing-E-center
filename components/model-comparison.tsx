"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, BarChart3, Target, Zap, Award, AlertTriangle } from 'lucide-react'

interface ModelComparisonProps {
  beforeResults?: any
  afterResults?: any
  onStartComparison?: () => void
}

export function ModelComparison({ beforeResults, afterResults, onStartComparison }: ModelComparisonProps) {
  if (!beforeResults && !afterResults) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>模型性能对比分析</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="space-y-4">
            <div className="text-gray-500">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>暂无测试数据</p>
              <p className="text-sm">请先运行准确性测试以获取对比数据</p>
            </div>
            {onStartComparison && (
              <Button onClick={onStartComparison}>
                开始性能测试
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  const calculateImprovement = (before: number, after: number) => {
    if (!before || !after) return 0
    return ((after - before) / before) * 100
  }

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 2) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (improvement < -2) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-600" />
  }

  const getImprovementColor = (improvement: number) => {
    if (improvement > 2) return "text-green-600"
    if (improvement < -2) return "text-red-600"
    return "text-gray-600"
  }

  const metrics = [
    {
      name: "总体准确率",
      before: beforeResults?.overallAccuracy,
      after: afterResults?.overallAccuracy,
      format: (value: number) => `${(value * 100).toFixed(1)}%`,
      icon: <Target className="w-4 h-4" />,
    },
    {
      name: "测试通过率",
      before: beforeResults?.passRate,
      after: afterResults?.passRate,
      format: (value: number) => `${(value * 100).toFixed(1)}%`,
      icon: <Award className="w-4 h-4" />,
    },
    {
      name: "通过测试数",
      before: beforeResults?.passedTests,
      after: afterResults?.passedTests,
      format: (value: number) => `${value}/${beforeResults?.totalTests || afterResults?.totalTests || 5}`,
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ]

  const overallImprovement = beforeResults && afterResults 
    ? calculateImprovement(beforeResults.overallAccuracy, afterResults.overallAccuracy)
    : 0

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>模型性能对比分析</span>
        </CardTitle>
        {beforeResults && afterResults && (
          <div className="flex items-center space-x-2">
            <Badge className={overallImprovement > 0 ? "bg-green-500" : "bg-red-500"}>
              {overallImprovement > 0 ? "性能提升" : "性能下降"}
            </Badge>
            <span className="text-sm text-gray-600">
              整体改进: {overallImprovement.toFixed(1)}%
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 总体对比卡片 */}
        {beforeResults && afterResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">优化前模型</h3>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-gray-800">
                    {(beforeResults.overallAccuracy * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">总体准确率</div>
                  <div className="flex justify-center space-x-4 text-xs">
                    <div>
                      <div className="font-medium">{beforeResults.passedTests}</div>
                      <div className="text-gray-500">通过测试</div>
                    </div>
                    <div>
                      <div className="font-medium">{(beforeResults.passRate * 100).toFixed(0)}%</div>
                      <div className="text-gray-500">通过率</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-4 text-blue-700">优化后模型</h3>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-blue-800">
                    {(afterResults.overallAccuracy * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-600">总体准确率</div>
                  <div className="flex justify-center space-x-4 text-xs">
                    <div>
                      <div className="font-medium text-blue-700">{afterResults.passedTests}</div>
                      <div className="text-blue-500">通过测试</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-700">{(afterResults.passRate * 100).toFixed(0)}%</div>
                      <div className="text-blue-500">通过率</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 详细指标对比 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">详细性能指标对比</h3>
          
          <div className="space-y-3">
            {metrics.map((metric, index) => {
              const improvement = calculateImprovement(metric.before, metric.after)
              
              return (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-gray-600">
                          {metric.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{metric.name}</h4>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        {/* 优化前数值 */}
                        {metric.before !== undefined && (
                          <div className="text-center">
                            <div className="text-sm text-gray-500">优化前</div>
                            <div className="font-medium text-gray-700">
                              {metric.format(metric.before)}
                            </div>
                          </div>
                        )}
                        
                        {/* 改进指示器 */}
                        {metric.before !== undefined && metric.after !== undefined && (
                          <div className="flex items-center space-x-2">
                            {getImprovementIcon(improvement)}
                            <span className={`text-sm font-medium ${getImprovementColor(improvement)}`}>
                              {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
                            </span>
                          </div>
                        )}
                        
                        {/* 优化后数值 */}
                        {metric.after !== undefined && (
                          <div className="text-center">
                            <div className="text-sm text-blue-500">优化后</div>
                            <div className="font-medium text-blue-700">
                              {metric.format(metric.after)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 进度条显示改进程度 */}
                    {metric.before !== undefined && metric.after !== undefined && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>改进程度</span>
                          <span>{Math.abs(improvement).toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={Math.min(100, Math.abs(improvement) * 2)} 
                          className={`h-2 ${
                            improvement > 0 ? "bg-green-100" : 
                            improvement < 0 ? "bg-red-100" : "bg-gray-100"
                          }`}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* 测试场景详细对比 */}
        {beforeResults?.testResults && afterResults?.testResults && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">各测试场景对比</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3">测试场景</th>
                    <th className="text-center p-3">优化前准确率</th>
                    <th className="text-center p-3">优化后准确率</th>
                    <th className="text-center p-3">改进幅度</th>
                    <th className="text-center p-3">状态变化</th>
                  </tr>
                </thead>
                <tbody>
                  {beforeResults.testResults.map((beforeTest: any, index: number) => {
                    const afterTest = afterResults.testResults[index]
                    const improvement = calculateImprovement(beforeTest.actualAccuracy, afterTest?.actualAccuracy || 0)
                    
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{beforeTest.scenario}</div>
                            <div className="text-xs text-gray-500">{beforeTest.description}</div>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <div className="font-medium">
                            {(beforeTest.actualAccuracy * 100).toFixed(1)}%
                          </div>
                          <Badge variant={beforeTest.passed ? "secondary" : "destructive"} className="text-xs">
                            {beforeTest.passed ? "通过" : "未通过"}
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          {afterTest && (
                            <>
                              <div className="font-medium text-blue-700">
                                {(afterTest.actualAccuracy * 100).toFixed(1)}%
                              </div>
                              <Badge variant={afterTest.passed ? "secondary" : "destructive"} className="text-xs">
                                {afterTest.passed ? "通过" : "未通过"}
                              </Badge>
                            </>
                          )}
                        </td>
                        <td className="text-center p-3">
                          {afterTest && (
                            <div className={`flex items-center justify-center space-x-1 ${getImprovementColor(improvement)}`}>
                              {getImprovementIcon(improvement)}
                              <span className="font-medium">
                                {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="text-center p-3">
                          {afterTest && (
                            <div>
                              {beforeTest.passed === afterTest.passed ? (
                                <Badge variant="outline">无变化</Badge>
                              ) : afterTest.passed ? (
                                <Badge className="bg-green-500">改进</Badge>
                              ) : (
                                <Badge className="bg-red-500">退步</Badge>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 优化建议和总结 */}
        {beforeResults && afterResults && (
          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">性能分析总结</h4>
                  <div className="text-sm text-yellow-700 space-y-2">
                    {overallImprovement > 5 ? (
                      <p>✅ <strong>优化效果显著！</strong> 模型性能有明显提升，建议部署到生产环境。</p>
                    ) : overallImprovement > 0 ? (
                      <p>✅ <strong>优化有效。</strong> 模型性能有所改善，可以考虑进一步优化。</p>
                    ) : (
                      <p>⚠️ <strong>优化效果有限。</strong> 建议检查优化策略或调整参数配置。</p>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="font-medium mb-1">主要改进:</p>
                        <ul className="text-xs space-y-1">
                          {afterResults.improvements && (
                            <>
                              <li>• 准确率提升 {(afterResults.improvements.accuracyImprovement * 100).toFixed(1)}%</li>
                              <li>• 精确率提升 {(afterResults.improvements.precisionImprovement * 100).toFixed(1)}%</li>
                              <li>• 召回率提升 {(afterResults.improvements.recallImprovement * 100).toFixed(1)}%</li>
                            </>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-1">建议措施:</p>
                        <ul className="text-xs space-y-1">
                          <li>• 持续监控模型性能表现</li>
                          <li>• 定期收集新的训练数据</li>
                          <li>• 考虑A/B测试验证效果</li>
                          <li>• 建立性能预警机制</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 操作按钮 */}
        <div className="flex justify-center space-x-4">
          {onStartComparison && (
            <Button onClick={onStartComparison} variant="outline">
              重新测试
            </Button>
          )}
          
          {beforeResults && afterResults && (
            <Button className="bg-green-600 hover:bg-green-700">
              <Zap className="w-4 h-4 mr-2" />
              应用优化模型
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
