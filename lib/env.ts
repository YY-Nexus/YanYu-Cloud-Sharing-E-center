export function getEnvVariable(key: string, options?: { required?: boolean; defaultValue?: string }): string {
  const value = process.env[key]
  if (value === undefined || value === "") {
    if (options?.required) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
    return options?.defaultValue ?? ""
  }
  return value
}

// 便捷检测，避免在未配置时误连数据库/第三方服务
export function hasEnv(...keys: string[]): boolean {
  return keys.every((k) => {
    const v = process.env[k]
    return v !== undefined && v !== ""
  })
}
