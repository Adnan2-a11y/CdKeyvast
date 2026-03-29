'use client';

import { useState, useEffect } from 'react';

export function PWAStatus() {
  const [status, setStatus] = useState({
    isSupported: false,
    isRegistered: false,
    isController: false,
    registration: null as ServiceWorkerRegistration | null,
    controller: null as ServiceWorker | null,
    lastUpdate: null as string | null,
  });

  useEffect(() => {
    const updateStatus = () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((registration) => {
          setStatus({
            isSupported: true,
            isRegistered: !!registration,
            isController: !!navigator.serviceWorker.controller,
            registration: registration || null,
            controller: navigator.serviceWorker.controller,
            lastUpdate: new Date().toLocaleTimeString(),
          });
        });
      } else {
        setStatus(prev => ({
          ...prev,
          isSupported: false,
          lastUpdate: new Date().toLocaleTimeString(),
        }));
      }
    };

    // Initial check
    updateStatus();

    // Listen for controller changes
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', updateStatus);
    }

    // Update every 2 seconds
    const interval = setInterval(updateStatus, 2000);

    return () => {
      clearInterval(interval);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', updateStatus);
      }
    };
  }, []);

  const forceRefresh = () => {
    if (status.registration) {
      status.registration.update();
    }
  };

  const unregisterSW = async () => {
    if (status.registration) {
      await status.registration.unregister();
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-sm font-mono text-xs">
      <div className="font-bold mb-2 text-yellow-400">PWA Status Debug</div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Supported:</span>
          <span className={status.isSupported ? 'text-green-400' : 'text-red-400'}>
            {status.isSupported ? 'YES' : 'NO'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Registered:</span>
          <span className={status.isRegistered ? 'text-green-400' : 'text-red-400'}>
            {status.isRegistered ? 'YES' : 'NO'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Controller:</span>
          <span className={status.isController ? 'text-green-400' : 'text-red-400'}>
            {status.isController ? 'ACTIVE' : 'NONE'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Last Update:</span>
          <span className="text-blue-400">{status.lastUpdate}</span>
        </div>
      </div>

      {status.registration && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <div className="text-gray-400 mb-2">SW State: {status.registration.active?.state || 'N/A'}</div>
          <div className="text-gray-400 mb-2">Scope: {status.registration.scope}</div>
        </div>
      )}

      <div className="mt-3 space-y-2">
        <button
          onClick={forceRefresh}
          className="w-full bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
        >
          Force Update Check
        </button>
        <button
          onClick={unregisterSW}
          className="w-full bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
        >
          Unregister SW
        </button>
      </div>
    </div>
  );
}
