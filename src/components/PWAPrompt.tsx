import { useEffect } from "react";
import { X, RefreshCw, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWA, useInstallPrompt } from "@/hooks/usePWA";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const PWAPrompt = () => {
  const { t } = useTranslation();
  const { needRefresh, offlineReady, updateServiceWorker, close } = usePWA();
  const { isInstallable, promptInstall } = useInstallPrompt();

  // Auto-hide offline ready message after 3 seconds
  useEffect(() => {
    if (offlineReady) {
      const timer = setTimeout(() => {
        close();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [offlineReady, close]);

  const showPrompt = needRefresh || offlineReady || isInstallable;

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
        >
          <div className="bg-card border border-border rounded-lg shadow-lg p-4">
            {/* Offline Ready Message */}
            {offlineReady && (
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-foreground flex-1">
                  App ready for offline use
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={close}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Update Available Message */}
            {needRefresh && !offlineReady && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      New version available
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click reload to update the app
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={close}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => updateServiceWorker(true)}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reload
                </Button>
              </div>
            )}

            {/* Install Prompt */}
            {/* Install prompt disabled - users can install via browser menu
            {isInstallable && !needRefresh && !offlineReady && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      Install NinescapeLand
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add to home screen for faster access
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={close}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={promptInstall}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Install App
                </Button>
              </div>
            )}
            */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAPrompt;
