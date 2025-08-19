import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YanYu Cloud Sharing E-center - 智能管理系统",
  description: "YanYu Cloud Sharing E-center 专业的企业智能管理平台，提供数据中心、组织管理、绩效激励等全方位解决方案",
  keywords: "YanYu Cloud, 言语云, 智能管理, 企业管理, 数据中心, 组织管理",
  authors: [{ name: "YanYu Cloud Team" }],
  creator: "YanYu Cloud Sharing E-center",
  publisher: "YanYu Cloud Sharing E-center",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3B82F6",
  openGraph: {
    title: "YanYu Cloud Sharing E-center - 智能管理系统",
    description: "专业的企业智能管理平台",
    type: "website",
    locale: "zh_CN",
    siteName: "YanYu Cloud Sharing E-center",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/yanyu-cloud-logo.png" />
        <link rel="apple-touch-icon" href="/yanyu-cloud-logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
