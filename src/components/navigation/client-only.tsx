"use client";

import { useEffect, useState, ReactNode } from "react";

/**
 * Render children only after the component has mounted on the client.
 *
 * Delays rendering to avoid hydration mismatches by returning `null` until the component has mounted.
 *
 * @param children - React nodes to render once the component has mounted
 * @returns The `children` wrapped in a fragment after mount, or `null` before mount.
 */
export default function ClientOnly({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
}
