"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useServiceWorkerUpdate } from "@/hooks/useServiceWorkerUpdate";
import { RefreshCw, Download, X, Zap } from "lucide-react";

export function SWUpdateNotification() {
  const { hasUpdate, isUpdating, updateApp, dismissUpdate } = useServiceWorkerUpdate();

  if (!hasUpdate) {
    return null;
  }

  const handleUpdate = async () => {
    await updateApp();
  };

  const handleDismiss = () => {
    dismissUpdate();
  };

  return (
    <Card className="fixed top-4 right-4 w-80 shadow-lg border-2 border-primary/20 z-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Update Available</CardTitle>
            <Badge variant="default" className="text-xs animate-pulse">
              New
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-8 w-8 p-0"
            disabled={isUpdating}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          A new version of CDKeyVast is available with improvements and bug fixes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Latest features and improvements</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Performance enhancements</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>Bug fixes and security updates</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleUpdate} 
            className="flex-1"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh to Update
              </>
            )}
          </Button>
          <Button 
            onClick={handleDismiss} 
            variant="outline"
            disabled={isUpdating}
          >
            Later
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          Your current session will be saved during the update.
        </p>
      </CardContent>
    </Card>
  );
}
