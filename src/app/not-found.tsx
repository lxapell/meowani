import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

/**
 * Render a full-screen 404 "Page not found" UI with a link to the home page.
 *
 * @returns A JSX element that displays a centered "404" heading, a "Page not found" subheading,
 * and an outlined "Go Home" button linking to `/`.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col item-s-center justify-center px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tighter text-destructive sm:text-7xl md:text-8xl">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-destructive">
            Page not found
          </h2>
          <p className="text-muted-foreground">
            Oops... This page does not exist (yet?).
          </p>
        </div>
        <Button variant="outline" size="lg" asChild>
          <Link href="/">
            <HomeIcon />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
