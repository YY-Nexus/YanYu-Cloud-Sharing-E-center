import EfficiencyPageClient from "./EfficiencyPageClient"

export default function EfficiencyPage() {
  return <EfficiencyPageClient />
}

export const metadata = {
  title: "效率提升 - YanYu丨☁️³Mgmt",
  description: "业务流程效率监控和优化平台",
}

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#3b82f6",
  }
}
