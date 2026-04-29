"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Attaches a `pageshow` listener that forces a reload when the page is restored from the back/forward cache (bfcache) for the current pathname.
 *
 * This client-only component registers an event listener on mount and removes it on unmount. When a `pageshow` event with `persisted === true` is observed, it calls `window.location.reload()` to ensure a fresh load.
 *
 * @returns Null — this component renders no UI.
 */
export function BackNavigationFix() {
  const pathname = usePathname();
  console.log(
    `[BackFix] Hook mounting on ${pathname}:`,
    typeof window !== "undefined" ? "Client" : "Server",
  );
  useEffect(() => {
    console.log("[BackFix] Hook mounted", pathname);
    const handlePageShow = (event: PageTransitionEvent) =>
      // event: PageTransitionEvent
      {
        console.log("[BackFix] page show transition detected", pathname);
        if (event.persisted) {
          window.location.reload();
          console.log("[BackFix] bfcache detected: reloading");
        }
        // window.location.reload();
      };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [pathname]);

  return null;
}
