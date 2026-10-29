const CACHE='calc-v7-final';
const URLS=['/calculator/','/calculator/index.html','/calculator/style.css','/calculator/script.js','/calculator/manifest.json','/calculator/icon-192.png','/calculator/icon-512.png'];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.map(x=>x!==CACHE&&caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
