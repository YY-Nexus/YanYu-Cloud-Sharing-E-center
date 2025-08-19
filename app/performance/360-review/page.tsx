"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Star, TrendingUp, MessageSquare, Target, BarChart3, Clock } from "lucide-react"

export default function Review360Page() {
  const reviewCycles = [
    { name: "2024年度评估", status: "进行中", participants: 85, completion: 68 },
    { name: "2023年度评估", status: "已完成", participants: 92, completion: 100 },
    { name: "2023年中评估", status: "已完成", participants: 88, completion: 95 },
  ]

  const evaluationData = [
    { name: "张三", position: "高级工程师", selfScore: 4.2, peerScore: 4.0, managerScore: 4.3, avgScore: 4.17 },
    { name: "李四", position: "产品经理", selfScore: 3.8, peerScore: 4.1, managerScore: 3.9, avgScore: 3.93 },
    { name: "王五", position: "设计师", selfScore: 4.5, peerScore: 4.2, managerScore: 4.1, avgScore: 4.27 },
  ]

  const competencyAreas = [
    { area: "专业技能", score: 4.2, feedback: 12 },
    { area: "沟通协作", score: 3.9, feedback: 15 },
    { area: "领导力", score: 3.7, feedback: 8 },
    { area: "创新能力", score: 4.0, feedback: 10 },
    { area: "执行力", score: 4.3, feedback: 14 },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">360度评估</h1>
          <p className="text-slate-600 mt-2">多维度评价、同事互评、上下级评估</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <BarChart3 className="h-4 w-4" />
            评估报告
          </Button>
          <Button className="gap-2">
            <Users className="h-4 w-4" />
            发起评估
          </Button>
        </div>
      </div>

      {/* 评估周期概览 */}
      <div className="grid gap-6">
        {reviewCycles.map((cycle, index) => (
          <Card key={index} className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{cycle.name}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {cycle.participants} 人参与
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      完成率 {cycle.completion}%
                    </span>
                  </CardDescription>
                </div>
                <Badge variant={cycle.status === "进行中" ? "secondary" : "default"}>{cycle.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={cycle.completion} className="h-2" />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>评估进度</span>
                  <span>{cycle.completion}% 完成</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 评估详情 */}
      <Tabs defaultValue="results" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">评估结果</TabsTrigger>
          <TabsTrigger value="competency">能力分析</TabsTrigger>
          <TabsTrigger value="feedback">反馈汇总</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                多维度评估结果
              </CardTitle>
              <CardDescription>自评、同事评价、上级评估综合结果</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {evaluationData.map((person, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-slate-600">{person.position}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-lg font-semibold">{person.avgScore}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="font-medium text-blue-600">{person.selfScore}</div>
                        <div className="text-slate-600">自评</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="font-medium text-green-600">{person.peerScore}</div>
                        <div className="text-slate-600">同事评价</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="font-medium text-purple-600">{person.managerScore}</div>
                        <div className="text-slate-600">上级评估</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                能力维度分析
              </CardTitle>
              <CardDescription>各项能力的评估得分和反馈数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competencyAreas.map((area, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{area.area}</span>
                        <Badge variant="outline">{area.feedback} 条反馈</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">{area.score}</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <Progress value={area.score * 20} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                反馈汇总
              </CardTitle>
              <CardDescription>评估过程中收集的详细反馈意见</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">反馈分析中</h3>
                <p className="text-slate-600 mb-4">正在整理和分析评估反馈，请稍候...</p>
                <Button>查看详细反馈</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
