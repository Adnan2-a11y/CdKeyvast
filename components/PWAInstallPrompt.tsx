"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Download, X, Smartphone, Apple } from "lucide-react";

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, isIOS, install, dismiss } = usePWAInstall();

  // Don't show if already installed or not installable
  if (isInstalled || (!isInstallable && !isIOS)) {
    return null;
  }

  const handleInstall = async () => {
    await install();
  };

  const handleDismiss = () => {
    dismiss();
  };

  // iOS install instructions (since iOS doesn't support beforeinstallprompt)
  if (isIOS && !isInstalled) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 shadow-lg border-2 border-primary/20 z-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Apple className="w-5 h-5" />
              <CardTitle className="text-lg">Install App</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Install CDKeyVast on your iPhone for quick access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">1</Badge>
              <span>Tap the Share button <span className="font-mono bg-muted px-1 rounded">⎈</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">2</Badge>
              <span>Scroll down and tap "Add to Home Screen"</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">3</Badge>
              <span>Tap "Add" to install the app</span>
            </div>
          </div>
          <Button onClick={handleDismiss} className="w-full">
            Got it!
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Android/Desktop install prompt
  if (isInstallable) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 shadow-lg border-2 border-primary/20 z-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <CardTitle className="text-lg">Install App</CardTitle>
              <Badge variant="default" className="text-xs">New</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Install CDKeyVast for faster access and offline features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>Offline Access</span>
            </div>
            <div className="flex items-center gap-1">
              <Smartphone className="w-4 h-4" />
              <span>App Experience</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>Quick Launch</span>
            </div>
            <div className="flex items-center gap-1">
              <Smartphone className="w-4 h-4" />
              <span>Push Notifications</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleInstall} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
            <Button onClick={handleDismiss} variant="outline">
              Not Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
