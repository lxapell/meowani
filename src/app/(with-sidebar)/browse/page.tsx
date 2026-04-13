import type { FilterState } from "@/types/catalog";
import { fetchCatalog } from "./actions";
import {
  CatalogProvider,
  CatalogSearch,
  CatalogResult,
} from "@/components/custom/catalog-search";
import {
  URLParamsToFilters,
  filtersToURLParams,
} from "@/utils/catalog/helpers";
import { initialFilters } from "@/constants/anilist/enums";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((V) => urlParams.append(key, v));
    } else if (value !== undefined) {
      urlParams.set(key, value);
    }
  });

  const initialFilters = URLParamsToFilters(urlParams);
  const initialData = await fetchCatalog({
    pageParam: 1,
    filters: initialFilters,
  });

  return (
    <div className="w-full flex flex-col flex-1 px-6 md:px-12 md:pt-16 overflow-y-scroll max-h-screen">
      <CatalogProvider
        initialData={initialData}
        initialFilters={initialFilters}
      >
        <CatalogSearch />
        <CatalogResult />
      </CatalogProvider>
    </div>
  );
}
