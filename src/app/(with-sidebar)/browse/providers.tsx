"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * Provides a QueryClientProvider with a single QueryClient configured to set queries' stale time to 60 seconds.
 *
 * @param children - React nodes to render inside the provider
 * @returns A React element that wraps `children` with a `QueryClientProvider` using the created `QueryClient`
 */
export default function TanstackProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
