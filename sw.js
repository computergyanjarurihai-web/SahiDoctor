/* ============================================================
   सहीDoctor — Service Worker (multi-page PWA)
   Version bump karne se sabhi users ko naya site milta hai.
   Purana single-page cache clear ho jaayega.
   ============================================================ */
const CACHE = "sahidoctor-v3-2026-07-20";   // <-- naye deploy pe ye version badlein

/* Har page + app shell precache (offline ke liye). Sirf wahi files
   jinke hone ka yaqeen hai — warna install fail ho sakta hai. */
const CORE = [
  "/",
  "/index.html",
  "/lakshan-janch.html",
  "/bimari-guide.html",
  "/doctor-khojen.html",
  "/lab-janch.html",
  "/sarkari-aspatal.html",
  "/ambulance.html",
  "/dawa-dukan.html",
  "/juden.html",
  "/jankari.html",
  "/about.html",
  "/disclaimer.html",
  "/privacy.html",
  "/contact.html",
  "/sd-app.js",
  "/tailwind.css",
  "/manifest.json"
];

/* ---- Install: core files cache karo ---- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

/* ---- Activate: purane cache हटाओ ---- */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ---- Fetch strategy ---- */
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  /* External (Google Translate/Maps, cdnjs, fonts, nominatim,
     postalpincode) — SW beech mein na aaye, seedha network. */
  if (!sameOrigin) return;

  /* HTML pages -> NETWORK FIRST (fresh content), fallback cache, phir offline. */
  const isHTML = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");
  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((r) => r || caches.match("/index.html"))
        )
    );
    return;
  }

  /* /data/ JSON -> STALE-WHILE-REVALIDATE (turant cache se, background mein update). */
  if (url.pathname.startsWith("/data/")) {
    event.respondWith(
      caches.open(CACHE).then((c) =>
        c.match(req).then((cached) => {
          const net = fetch(req).then((res) => { c.put(req, res.clone()); return res; }).catch(() => cached);
          return cached || net;
        })
      )
    );
    return;
  }

  /* Baaki same-origin static (sd-app.js, icons, images) -> CACHE FIRST. */
  event.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      })
    )
  );
});
