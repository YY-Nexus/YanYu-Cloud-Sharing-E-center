import ProposalPageClient from "./ProposalPageClient"

export default function ProposalPage() {
  return <ProposalPageClient />
}

export const metadata = {
  title: "创新提案 - YanYu丨☁️³Mgmt",
  description: "创新提案管理和评估平台",
}

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#f59e0b",
  }
}
