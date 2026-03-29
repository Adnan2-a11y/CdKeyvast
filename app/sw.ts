import { Serwist } from "serwist";

declare const self: any & {
  __SW_MANIFEST?: (string | PrecacheEntry)[];
};

interface PrecacheEntry {
  url: string;
  revision: string;
}

// Force immediate activation at the very top level
self.addEventListener("install", () => {
  console.log("[SW] Force installing service worker...");
  self.skipWaiting();
});

self.addEventListener("activate", (event: any) => {
  console.log("[SW] Force activating service worker...");
  event.waitUntil(self.clients.claim());
});

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST || [],
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  cacheId: `cdkeyvast-v${Date.now()}`,
});

// Handle skip waiting messages
self.addEventListener("message", (event: any) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("[SW] Received SKIP_WAITING message");
    self.skipWaiting();
  }
});

serwist.addEventListeners();
