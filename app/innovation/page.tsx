import InnovationClientPage from "./InnovationClientPage"

export default function InnovationPage() {
  return <InnovationClientPage />
}

export const metadata = {
  title: "创新管理 - YanYu丨☁️³Mgmt",
  description: "企业创新项目管理和孵化平台",
}

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#3b82f6",
  }
}
