import { Suspense } from "react";
import {
  CatalogSearchSkeleton,
  CatalogResultSkeleton,
} from "@/components/custom/catalog-search";

/**
 * Layout component that wraps `children` in a React Suspense boundary and shows catalog skeletons while descendants are pending.
 *
 * @param children - The content to render inside the layout.
 * @returns The layout element that renders `children` when ready, or a skeleton fallback UI while descendants are loading.
 */
export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
