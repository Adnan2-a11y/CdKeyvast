'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button"; // Adjust based on your UI library
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry or Logtail
    console.error("Global Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle size={48} />
      </div>
      
      <h1 className="mb-2 font-display text-3xl font-bold tracking-tight text-foreground">
        Something went wrong!
      </h1>
      
      <p className="mb-8 max-w-md text-muted-foreground">
        We encountered an error while communicating with our servers. 
        This might be a temporary connection issue with our inventory.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button 
          onClick={() => reset()} 
          variant="default" 
          className="flex items-center gap-2"
        >
          <RefreshCcw size={16} />
          Try Again
        </Button>
        
        <Button variant="outline" asChild className="flex items-center gap-2">
          <Link href="/">
            <Home size={16} />
            Back to Home
          </Link>
        </Button>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="mt-10 w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-muted p-4 text-left">
          <p className="mb-2 text-xs font-bold uppercase text-muted-foreground">Debug Info:</p>
          <pre className="overflow-x-auto text-xs text-destructive">
            {error.message || "Unknown error"}
          </pre>
        </div>
      )}
    </div>
  );
}
