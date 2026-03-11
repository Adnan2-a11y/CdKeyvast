"use client";

import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiOff, RefreshCw, Home, ShoppingBag } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <WifiOff className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">You're Offline</CardTitle>
          <CardDescription>
            It looks like you've lost your internet connection. Some features may not be available until you're back online.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✅ Cached pages are still available</p>
            <p>✅ Your shopping cart is saved locally</p>
            <p>❌ New products and search require internet</p>
            <p>❌ Checkout requires internet connection</p>
          </div>
          
          <div className="flex flex-col gap-2 pt-4">
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Button 
              onClick={() => window.location.href = "/"} 
              className="w-full"
              variant="outline"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
            
            <Button 
              onClick={() => window.location.href = "/products"} 
              className="w-full"
              variant="outline"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse Products (Cached)
            </Button>
          </div>
          
          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>Your changes are saved locally and will sync when you're back online.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
