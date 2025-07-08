const CACHE_NAME = "ai-search-app-v1.2"
const STATIC_CACHE = "static-v1.2"
const DYNAMIC_CACHE = "dynamic-v1.2"

// 需要缓存的静态资源
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/pwa-test",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-maskable-192.png",
  "/_next/static/css/app/layout.css",
  "/_next/static/chunks/webpack.js",
  "/_next/static/chunks/main.js",
]

// 需要缓存的API路由
const API_ROUTES = ["/api/chat", "/api/search", "/api/analytics"]

// 安装事件 - 缓存静态资源
self.addEventListener("install", (event) => {
  console.log("Service Worker: 安装中...")

  event.waitUntil(
    Promise.all([
      // 缓存静态资源
      caches
        .open(STATIC_CACHE)
        .then((cache) => {
          console.log("Service Worker: 缓存静态资源")
          return cache.addAll(STATIC_ASSETS)
        }),
      // 预缓存离线页面
      caches
        .open(DYNAMIC_CACHE)
        .then((cache) => {
          return cache.add("/offline")
        }),
    ]).then(() => {
      console.log("Service Worker: 安装完成")
      return self.skipWaiting()
    }),
  )
})

// 激活事件 - 清理旧缓存
self.addEventListener("activate", (event) => {
  console.log("Service Worker: 激活中...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
              console.log("Service Worker: 删除旧缓存", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("Service Worker: 激活完成")
        return self.clients.claim()
      }),
  )
})

// 拦截网络请求
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 跳过非GET请求和chrome-extension请求
  if (request.method !== "GET" || url.protocol === "chrome-extension:") {
    return
  }

  // 处理导航请求（页面请求）
  if (request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(request))
    return
  }

  // 处理静态资源请求
  if (isStaticAsset(url)) {
    event.respondWith(handleStaticAssetRequest(request))
    return
  }

  // 处理API请求
  if (isApiRequest(url)) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // 其他请求使用网络优先策略
  event.respondWith(handleOtherRequest(request))
})

// 处理导航请求（页面请求）
async function handleNavigationRequest(request) {
  try {
    // 尝试从网络获取
    const networkResponse = await fetch(request)

    // 如果成功，缓存响应并返回
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
      return networkResponse
    }

    throw new Error("Network response not ok")
  } catch (error) {
    console.log("Service Worker: 网络请求失败，尝试缓存", error)

    // 尝试从缓存获取
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // 如果缓存中也没有，返回离线页面
    const offlinePage = await caches.match("/offline")
    return (
      offlinePage ||
      new Response("离线状态", {
        status: 503,
        statusText: "Service Unavailable",
      })
    )
  }
}

// 处理静态资源请求
async function handleStaticAssetRequest(request) {
  // 缓存优先策略
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
      return networkResponse
    }
    throw new Error("Network response not ok")
  } catch (error) {
    console.log("Service Worker: 静态资源请求失败", error)
    return new Response("资源不可用", {
      status: 404,
      statusText: "Not Found",
    })
  }
}

// 处理API请求
async function handleApiRequest(request) {
  try {
    // 网络优先策略
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      // 只缓存GET请求的成功响应
      if (request.method === "GET") {
        const cache = await caches.open(DYNAMIC_CACHE)
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    }

    throw new Error("API response not ok")
  } catch (error) {
    console.log("Service Worker: API请求失败，尝试缓存", error)

    // 只对GET请求尝试缓存
    if (request.method === "GET") {
      const cachedResponse = await caches.match(request)
      if (cachedResponse) {
        return cachedResponse
      }
    }

    // 返回离线API响应
    return new Response(
      JSON.stringify({
        error: "离线状态",
        message: "当前处于离线状态，请稍后重试",
        offline: true,
      }),
      {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

// 处理其他请求
async function handleOtherRequest(request) {
  try {
    return await fetch(request)
  } catch (error) {
    const cachedResponse = await caches.match(request)
    return (
      cachedResponse ||
      new Response("请求失败", {
        status: 503,
        statusText: "Service Unavailable",
      })
    )
  }
}

// 判断是否为静态资源
function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/static/") ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
  )
}

// 判断是否为API请求
function isApiRequest(url) {
  return url.pathname.startsWith("/api/")
}

// 后台同步
self.addEventListener("sync", (event) => {
  console.log("Service Worker: 后台同步", event.tag)

  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

// 执行后台同步
async function doBackgroundSync() {
  try {
    console.log("Service Worker: 执行后台同步")

    // 获取离线存储的数据
    const offlineData = await getOfflineData()

    if (offlineData.length > 0) {
      // 同步数据到服务器
      for (const data of offlineData) {
        try {
          await syncDataToServer(data)
          await removeOfflineData(data.id)
        } catch (error) {
          console.error("Service Worker: 同步数据失败", error)
        }
      }
    }
  } catch (error) {
    console.error("Service Worker: 后台同步失败", error)
  }
}

// 获取离线数据
async function getOfflineData() {
  try {
    const cache = await caches.open("offline-data")
    const requests = await cache.keys()
    const data = []

    for (const request of requests) {
      const response = await cache.match(request)
      if (response) {
        const jsonData = await response.json()
        data.push(jsonData)
      }
    }

    return data
  } catch (error) {
    console.error("Service Worker: 获取离线数据失败", error)
    return []
  }
}

// 同步数据到服务器
async function syncDataToServer(data) {
  const response = await fetch("/api/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("同步失败")
  }

  return response.json()
}

// 删除已同步的离线数据
async function removeOfflineData(id) {
  try {
    const cache = await caches.open("offline-data")
    await cache.delete(`/offline-data/${id}`)
  } catch (error) {
    console.error("Service Worker: 删除离线数据失败", error)
  }
}

// 推送通知
self.addEventListener("push", (event) => {
  console.log("Service Worker: 收到推送通知")

  let notificationData = {
    title: "AI搜索助手",
    body: "您有新的通知",
    icon: "/icon-192.png",
    badge: "/badge-72.png",
    tag: "default",
  }

  if (event.data) {
    try {
      notificationData = { ...notificationData, ...event.data.json() }
    } catch (error) {
      notificationData.body = event.data.text()
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    tag: notificationData.tag,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: notificationData.tag,
    },
    actions: [
      {
        action: "open",
        title: "打开应用",
        icon: "/icon-192.png",
      },
      {
        action: "close",
        title: "关闭",
        icon: "/icon-192.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification(notificationData.title, options))
})

// 通知点击处理
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: 通知被点击", event.action)

  event.notification.close()

  if (event.action === "open" || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clientList) => {
        // 如果已有窗口打开，则聚焦到该窗口
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) {
            return client.focus()
          }
        }

        // 否则打开新窗口
        if (clients.openWindow) {
          return clients.openWindow("/")
        }
      }),
    )
  }
})

// 消息处理
self.addEventListener("message", (event) => {
  console.log("Service Worker: 收到消息", event.data)

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }

  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, options } = event.data
    self.registration.showNotification(title, options)
  }

  if (event.data && event.data.type === "CACHE_URLS") {
    const { urls } = event.data
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.addAll(urls)
      }),
    )
  }
})

// 错误处理
self.addEventListener("error", (event) => {
  console.error("Service Worker: 发生错误", event.error)
})

self.addEventListener("unhandledrejection", (event) => {
  console.error("Service Worker: 未处理的Promise拒绝", event.reason)
})

console.log("Service Worker: 脚本加载完成")
