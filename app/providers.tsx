"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PostHogProvider } from "./posthog-provider";
import { Suspense } from "react";
import { PostHogPageView } from "./posthog-pageview";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Suspense>
            <PostHogPageView />
          </Suspense>
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </PostHogProvider>
  );
}
