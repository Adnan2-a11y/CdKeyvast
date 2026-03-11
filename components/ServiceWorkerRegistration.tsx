"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Force unregister all existing service workers first
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
          console.log('[SW] Unregistering existing service worker:', registration.scope);
          registration.unregister();
        }
        
        // Wait a bit for unregistration to complete
        setTimeout(() => {
          // Register the service worker with forced cache bypass
          navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none'
          }).then(function(registration) {
            console.log('[SW] Manual registration successful:', registration.scope);
            
            // Force update immediately
            registration.update();
            
            // Listen for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New worker is ready, tell it to skip waiting
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    console.log('[SW] Update found and skip waiting sent');
                  }
                });
              }
            });
          }).catch(function(error) {
            console.error('[SW] Manual registration failed:', error);
          });
        }, 100);
      });
    }
  }, []);

  return null;
}
