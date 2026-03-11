"use client";

import { useState, useEffect, useCallback } from "react";

interface UseServiceWorkerUpdateReturn {
  hasUpdate: boolean;
  isUpdating: boolean;
  updateApp: () => Promise<void>;
  dismissUpdate: () => void;
}

export function useServiceWorkerUpdate(): UseServiceWorkerUpdateReturn {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        setRegistration(reg);

        // Force update check immediately and on every page load
        reg.update();
        
        // Check for updates immediately
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                // New service worker is available, show update notification
                setHasUpdate(true);
                console.log("[SW] New version available");
              }
            });
          }
        });

        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data && event.data.type === "SW_UPDATED") {
            setHasUpdate(true);
          }
        });

        // Check for existing updates
        if (reg.waiting) {
          setHasUpdate(true);
        }

        // Force update check more frequently (every 5 minutes instead of 30)
        const intervalId = setInterval(() => {
          reg.update();
          console.log("[SW] Checking for updates...");
        }, 5 * 60 * 1000);

        return () => {
          clearInterval(intervalId);
        };
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    };

    registerServiceWorker();
  }, []);

  const updateApp = useCallback(async () => {
    if (!registration) {
      return;
    }

    setIsUpdating(true);

    try {
      // Tell the waiting service worker to skip waiting
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      // Wait for the new service worker to become active
      const newWorker = registration.installing || registration.waiting;
      if (newWorker) {
        await new Promise<void>((resolve) => {
          const handleStateChange = () => {
            if (newWorker.state === "activated") {
              newWorker.removeEventListener("statechange", handleStateChange);
              resolve();
            }
          };
          newWorker.addEventListener("statechange", handleStateChange);
        });
      }

      // Reload the page to get the new version
      window.location.reload();
    } catch (error) {
      console.error("Error updating app:", error);
      setIsUpdating(false);
    }
  }, [registration]);

  const dismissUpdate = useCallback(() => {
    setHasUpdate(false);
  }, []);

  return {
    hasUpdate,
    isUpdating,
    updateApp,
    dismissUpdate,
  };
}
