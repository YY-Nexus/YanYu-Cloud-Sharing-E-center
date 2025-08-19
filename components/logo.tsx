"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const handleLogoClick = async () => {
    if (isNavigating) return

    setIsNavigating(true)

    // 添加页面淡出效果
    document.body.classList.add("page-fade-out")

    // 等待动画完成后导航
    setTimeout(() => {
      router.push("/")

      // 导航完成后添加淡入效果
      setTimeout(() => {
        document.body.classList.remove("page-fade-out")
        document.body.classList.add("page-fade-in")

        // 清理淡入类
        setTimeout(() => {
          document.body.classList.remove("page-fade-in")
          setIsNavigating(false)
        }, 500)
      }, 100)
    }, 400)
  }

  return (
    <div
      className={cn("logo-container flex items-center gap-3", className)}
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleLogoClick()
        }
      }}
      aria-label="返回主页"
    >
      <div className={cn("relative shrink-0", sizeClasses[size])}>
        <Image
          src="/yanyu-cloud-logo.png"
          alt="YanYu Cloud Logo"
          width={size === "lg" ? 48 : size === "md" ? 36 : 24}
          height={size === "lg" ? 48 : size === "md" ? 36 : 24}
          className="object-contain transition-all duration-300 ease-out"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("text-slate-700 font-bold leading-tight", textSizeClasses[size])}>
            YanYu Cloud Sharing
          </span>
          <span
            className={cn(
              "text-slate-500 leading-tight logo-tagline",
              size === "lg" ? "text-base" : size === "md" ? "text-sm" : "text-xs",
            )}
          >
            E-center 智能管理中心
          </span>
        </div>
      )}

      {/* 悬停时显示的标语 */}
      <div className="logo-tagline absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">
        点击返回主页
      </div>
    </div>
  )
}
