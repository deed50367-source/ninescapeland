/// <reference types="vite-plugin-pwa/client" />

import { useEffect, useState, useCallback } from "react";

interface PWAStatus {
  needRefresh: boolean;
  offlineReady: boolean;
  updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  close: () => void;
}

export const usePWA = (): PWAStatus => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // iOS Safari has known issues with stale SW caches causing blank screens.
    // We add defensive checks and force-unregister broken SWs.
    const registerSWModule = async () => {
      try {
        // First, detect and clean up broken service workers on iOS
        if ("serviceWorker" in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const reg of registrations) {
            // If a SW is in a broken "redundant" state, unregister it
            if (reg.active?.state === "redundant") {
              console.log("Removing redundant SW:", reg.scope);
              await reg.unregister();
            }
          }
        }

        const { registerSW } = await import("virtual:pwa-register");
        
        const updateSW = registerSW({
          onNeedRefresh() {
            setNeedRefresh(true);
          },
          onOfflineReady() {
            setOfflineReady(true);
          },
          onRegisteredSW(swUrl, r) {
            console.log("SW Registered:", swUrl);
            setRegistration(r || null);
            // Check for updates every hour
            if (r) {
              setInterval(() => {
                r.update();
              }, 60 * 60 * 1000);
            }
          },
          onRegisterError(error) {
            console.log("SW registration error", error);
            // On iOS, a failed SW can cause blank screens on next visit.
            // Unregister all SWs so the next load is clean.
            if ("serviceWorker" in navigator) {
              navigator.serviceWorker.getRegistrations().then((regs) => {
                regs.forEach((reg) => reg.unregister());
              });
            }
          },
        });
      } catch (error) {
        // PWA not available in dev mode or module not found
        console.log("PWA registration skipped:", error);
      }
    };

    registerSWModule();
  }, []);

  const updateServiceWorker = useCallback(async (reloadPage = true) => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      if (reloadPage) {
        window.location.reload();
      }
    }
  }, [registration]);

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, []);

  return {
    needRefresh,
    offlineReady,
    updateServiceWorker,
    close,
  };
};

export const useInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!installPrompt) return false;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
    }
    
    setInstallPrompt(null);
    return outcome === "accepted";
  };

  return {
    isInstallable,
    isInstalled,
    promptInstall,
  };
};
