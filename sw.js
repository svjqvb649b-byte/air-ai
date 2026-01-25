// sw-version: 2026-01-26-disabled

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

// fetch は書かない（完全無効化）
