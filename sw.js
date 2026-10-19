const CACHE_NAME = 'craftland-ff-v1';
const assetsToCache = [
  './',
  './index.html',
  './items.json'
];

// تثبيت Service Worker وتخزين الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// تفعيل Service Worker وتنظيف التخزين القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// جلب الملفات من التخزين المؤقت في حال انقطاع الإنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        // إذا فشل الاتصال بالإنترنت وكان الطلب لصفحة HTML يمكن إرجاع الصفحة الرئيسية المخزنة
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
            
