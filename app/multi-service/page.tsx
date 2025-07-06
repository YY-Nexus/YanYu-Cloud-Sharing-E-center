import MultiServicePageClient from "./MultiServicePageClient"

export default function MultiServicePage() {
  return <MultiServicePageClient />
}

export const metadata = {
  title: "多服务管理 - YanYu丨☁️³Mgmt",
  description: "微服务架构统一管理平台",
}

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#3b82f6",
  }
}
