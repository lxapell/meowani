import { Suspense } from "react";

import type { FilterState } from "@/types/catalog";
import { fetchCatalog } from "./actions";
import {
  CatalogFiltersProvider,
  CatalogSearch,
  CatalogResult,
  CatalogResultSkeleton,
} from "@/components/custom/catalog-search";
import {
  URLParamsToFilters,
  filtersToURLParams,
} from "@/utils/catalog/helpers";
import { initialFilters } from "@/constants/anilist/enums";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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
        </CatalogFiltersProvider>
      </div>
    </HydrationBoundary>
  );
}
