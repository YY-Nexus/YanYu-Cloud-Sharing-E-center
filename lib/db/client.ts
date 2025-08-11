import { Pool, type PoolConfig } from "pg"
import { getEnvVariable, hasEnv } from "@/lib/env"

// 为了在本地/生产统一复用，使用连接池单例
let pool: Pool | null = null

function getConfig(): PoolConfig {
  // 允许未配置时返回空配置，但调用方会在真正 query 前做 hasEnv 判断
  const host = getEnvVariable("DB_HOST")
  const port = Number.parseInt(getEnvVariable("DB_PORT") || "5432", 10)
  const user = getEnvVariable("DB_USER")
  const password = getEnvVariable("DB_PASSWORD")
  const database = getEnvVariable("DB_NAME")
  const max = 10
  const idleTimeoutMillis = 30_000

  return {
    host,
    port,
    user,
    password,
    database,
    max,
    idleTimeoutMillis,
  }
}

export function getDbPool(): Pool {
  if (!pool) {
    if (!hasEnv("DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME")) {
      // 未配置时也创建一个惰性 pool，防止调用处因未定义而崩溃；真正 query 时会尝试连接从而报错
      // 建议在调用前用 hasDbConfig() 判定，返回 503 给客户端
      // 这里仍然返回 pool 以保持接口一致性
    }
    pool = new Pool(getConfig())
    pool.on("error", (err) => {
      console.error("数据库连接错误:", err)
      // 下次调用时会重新创建连接池
      pool = null
    })
  }
  return pool
}

export async function dbQuery<T = any>(text: string, params?: any[]): Promise<T[]> {
  const start = Date.now()
  const pool = getDbPool()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log(`数据库查询执行: ${text} (${duration}ms)`)
  return res.rows as T[]
}

export function hasDbConfig(): boolean {
  return hasEnv("DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME")
}
