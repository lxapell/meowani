import { Suspense } from "react";

import type { FilterState } from "@/types/catalog";
import { fetchCatalog } from "./actions";
import {
  CatalogFiltersProvider,
  CatalogSearch,
  CatalogResult,
  CatalogResultSkeleton,
} from "@/components/custom/catalog-search";
import FooterClient from "@/components/custom/footer.wrapper";
import {
  URLParamsToFilters,
  filtersToURLParams,
} from "@/utils/catalog/helpers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

/**
 * Next.js server component that derives initial catalog filters from route search params, prefetches catalog data into a TanStack QueryClient, hydrates that cache for the client, and renders the browse UI.
 *
 * @param searchParams - A promise that resolves to the route's query parameters (string or string[] values) used to construct the initial filters.
 * @returns The browse page element with prefetched and hydrated catalog data and UI providers (filters, search, and results).
 */
export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((V) => urlParams.append(key, V));
    } else if (value !== undefined) {
      urlParams.set(key, value);
    }
  });
  const initialFilters = URLParamsToFilters(urlParams);

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["catalog", JSON.stringify(initialFilters)],
    queryFn: ({ pageParam = 1 }) =>
      fetchCatalog({ pageParam, filters: initialFilters }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-w-0 flex flex-1 shrink flex-col bg-background overflow-x-hidden gap-5 overflow-y-scroll max-h-dvh md:pt-16">
        <CatalogFiltersProvider initialFilters={initialFilters}>
          <CatalogSearch />
          <Suspense fallback={<CatalogResultSkeleton />}>
            <CatalogResult />
          </Suspense>
          <FooterClient />
        </CatalogFiltersProvider>
      </div>
    </HydrationBoundary>
  );
}
