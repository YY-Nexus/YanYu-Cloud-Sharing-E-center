const CACHE_NAME = "ai-search-app-v1"
const urlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
]

// 安装事件
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("缓存已打开")
      return cache.addAll(urlsToCache)
    }),
  )
})

// 获取事件
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果缓存中有响应，则返回缓存的版本
      if (response) {
        return response
      }

      // 否则从网络获取
      return fetch(event.request).then((response) => {
        // 检查是否收到有效响应
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response
        }

        // 克隆响应
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    }),
  )
})

// 激活事件
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("删除旧缓存:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// 后台同步
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync())
  }
})

// 推送通知
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "您有新的通知",
    icon: "/icon-192.png",
    badge: "/badge-72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "查看详情",
        icon: "/icon-192.png",
      },
      {
        action: "close",
        title: "关闭",
        icon: "/icon-192.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("AI搜索助手", options))
})

// 通知点击
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  }
})

// 后台同步函数
async function doBackgroundSync() {
  try {
    // 获取离线存储的数据
    const cache = await caches.open("offline-data")
    const requests = await cache.keys()

    // 同步数据到服务器
    for (const request of requests) {
      try {
        await fetch(request)
        await cache.delete(request)
      } catch (error) {
        console.error("同步失败:", error)
      }
    }
  } catch (error) {
    console.error("后台同步失败:", error)
  }
}

// 消息处理
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
})
