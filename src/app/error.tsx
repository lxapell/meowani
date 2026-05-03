"use client";

import { useRouter } from "next-nprogress-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

/**
 * Render a full-screen 500 error page with actions to retry or navigate home.
 *
 * @param reset - Callback invoked when the user clicks "Try Again" to attempt to recover or re-render the page
 * @returns The error page element containing the "500" message, explanatory text, and action buttons for retrying or going home
 */
export default function ErrorPage({ reset }: { reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col item-s-center justify-center px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tighter text-destructive sm:text-7xl md:text-8xl">
          500
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-destructive">
            Error Occurred
          </h2>
          <p className="text-muted-foreground">
            Oops... Something went wrong while loading the page!
          </p>
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Button size="lg" onClick={() => reset()}>
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              router.push("/");
            }}
          >
            <HomeIcon />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
