import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LibraryIcon } from "lucide-react";
import FooterClient from "@/components/custom/footer.wrapper";

/**
 * Render a full-height "Anime not found" page with a primary link to the library.
 *
 * @returns A JSX element containing a centered "404" heading, an "Anime not found" subheading, a short explanatory paragraph, a large button linking to `/library`, and the page footer.
 */
export default function InfoNotFound() {
  return (
    <div className="min-w-0 max-h-dvh overflow-x-hidden overflow-y-scroll flex flex-1 flex-col pt-0 gap-5 overflow-auto">
      <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter text-destructive sm:text-7xl md:text-8xl">
            404
          </h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-destructive">
              Anime not found
            </h2>
            <p className="text-muted-foreground">
              Oops... This anime does not exist (yet?).
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/library">
              <LibraryIcon />
              Library
            </Link>
          </Button>
        </div>
      </div>
      <FooterClient />
    </div>
  );
}
