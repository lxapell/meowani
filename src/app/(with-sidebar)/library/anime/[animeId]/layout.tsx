import { Suspense } from "react";
import {
  CatalogSearchSkeleton,
  CatalogResultSkeleton,
} from "@/components/custom/catalog-search";

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
