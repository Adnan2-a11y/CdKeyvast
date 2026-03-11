'use client';

import { useEffect } from 'react';

export function ManualServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Unregister any existing service workers first
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      }).then(() => {
        // Manually register the service worker with force activation
        navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        }).then((registration) => {
          console.log('[Manual SW] Service Worker registered successfully:', registration.scope);
          
          // Force update check
          registration.update().then(() => {
            console.log('[Manual SW] Update check completed');
          });
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              console.log('[Manual SW] New service worker found');
              
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[Manual SW] New service worker is installed and ready');
                  // Force the new service worker to become active
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            }
          });
        }).catch((error) => {
          console.error('[Manual SW] Service Worker registration failed:', error);
        });
      });

      // Listen for controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[Manual SW] Controller changed, reloading page');
        window.location.reload();
      });
    }
  }, []);

  return null;
}
