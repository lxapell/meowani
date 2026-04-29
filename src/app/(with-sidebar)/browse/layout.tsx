import Providers from "./providers";
import { Suspense } from "react";
import {
  CatalogSearchSkeleton,
  CatalogResultSkeleton,
} from "@/components/custom/catalog-search";

/**
 * Layout component that wraps page content with Providers and a Suspense boundary that shows skeletons while loading.
 *
 * @param children - The page content to render inside the layout.
 * @returns The layout element containing `Providers` and a `Suspense` boundary; while suspended it displays `CatalogSearchSkeleton` and `CatalogResultSkeleton`.
 */
export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Suspense
        fallback={
          <div className="min-w-0 flex flex-1 shrink flex-col bg-background overflow-x-hidden gap-5 overflow-y-scroll max-h-dvh md:pt-16">
            <CatalogSearchSkeleton />
            <CatalogResultSkeleton />
          </div>
        }
      >
        {children}
      </Suspense>
    </Providers>
  );
}
