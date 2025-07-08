"use client"

import { PluginManager } from "@/lib/plugin-system"

export default function PluginsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <PluginManager />
      </div>
    </div>
  )
}
