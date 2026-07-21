const CACHE_NAME = "nutribihar-pwa-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./menu.html",
  "./shop.html",
  "./dairy.html",
  "./subscriptions.html",
  "./grade.html",
  "./trace.html",
  "./farmers.html",
  "./schedule.html",
  "./about.html",
  "./story.html",
  "./catering.html",
  "./packaging.html",
  "./contact.html",
  "./policies.html",
  "./credits.html",
  "./offline.html",
  "./styles.css",
  "./site.js",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/flavoursync-icon.png",
  "./assets/flavoursync-logo.png",
  "./assets/pwa-icon-192.png",
  "./assets/pwa-icon-512.png",
  "./assets/pwa-maskable-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/packaging/flavoursync-packaging-spec.csv",
  "./assets/packaging/label-sheet.html",
  "./assets/nutribihar/atta.webp",
  "./assets/nutribihar/black_pepper.webp",
  "./assets/nutribihar/chana_seeds.webp",
  "./assets/nutribihar/coriander.webp",
  "./assets/nutribihar/dosa_idli.webp",
  "./assets/nutribihar/fresh-dahi.png",
  "./assets/nutribihar/fresh-paneer.png",
  "./assets/nutribihar/ginger.webp",
  "./assets/nutribihar/green_chilli.webp",
  "./assets/nutribihar/jeera.webp",
  "./assets/nutribihar/khichdi.webp",
  "./assets/nutribihar/makhana.webp",
  "./assets/nutribihar/masala-chaas.png",
  "./assets/nutribihar/muesli.webp",
  "./assets/nutribihar/nut_butters.webp",
  "./assets/nutribihar/oats.webp",
  "./assets/nutribihar/red_chilli.webp",
  "./assets/nutribihar/sattu.webp",
  "./assets/nutribihar/turmeric.webp",
  "./assets/menu/handi-mutton.jpg",
  "./assets/menu/chicken-masala.jpg",
  "./assets/menu/veg-thali.jpg",
  "./assets/menu/biryani.jpg",
  "./assets/menu/paneer-combo.jpg",
  "./assets/menu/kebab-box.jpg",
  "./assets/menu/dal-rice.jpg",
  "./assets/menu/party-mutton.jpg"
];

function scopedUrl(path) {
  return new URL(path, self.registration.scope).toString();
}

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL.map(path => scopedUrl(path))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(async () => {
          return await caches.match(event.request) || await caches.match(scopedUrl("./offline.html"));
        })
    );
    return;
  }

  if (!isSameOrigin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
