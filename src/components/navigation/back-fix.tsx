"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
