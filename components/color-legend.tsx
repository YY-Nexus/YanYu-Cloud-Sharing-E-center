interface ColorLegendProps {
  className?: string
}

export function ColorLegend({ className }: ColorLegendProps) {
  const legends = [
    { name: "客房入住率", color: "bg-emerald-500" },
    { name: "娱乐区客流量", color: "bg-purple-500" },
    { name: "餐饮翻台率", color: "bg-amber-500" },
    { name: "对标分析", color: "bg-teal-500" },
    { name: "历史趋势", color: "bg-rose-500" },
    { name: "竞品动态", color: "bg-orange-500" },
  ]

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {legends.map((legend) => (
        <div key={legend.name} className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded-full ${legend.color}`} />
          <span className="text-xs text-blue-300">{legend.name}</span>
        </div>
      ))}
    </div>
  )
}
