import IncubationPageClient from "./IncubationPageClient"

export default function IncubationPage() {
  return <IncubationPageClient />
}

export const metadata = {
  title: "孵化管理 - YanYu丨☁️³Mgmt",
  description: "创新项目孵化过程管理平台",
}

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#f59e0b",
  }
}
