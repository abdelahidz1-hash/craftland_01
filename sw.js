const CACHE_NAME = "offline-app-v1";
const assetsToCache = [
    "index.html",
    "manifest.json"
];

// تثبيت الملفات في الذاكرة المؤقتة
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assetsToCache);
        })
    );
});

// جلب الملفات من الذاكرة المؤقتة عند انقطاع الإنترنت
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
