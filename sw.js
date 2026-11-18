// Ανέβασε τον αριθμό (v2, v3...) κάθε φορά που αλλάζεις κάποιο αρχείο,
// αλλιώς το κινητό θα συνεχίσει να δείχνει την παλιά έκδοση.
const CACHE = 'progress-v1';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Cache-first: ανοίγει πάντα από το κινητό, χωρίς να χρειάζεται internet
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request))
  );
});
