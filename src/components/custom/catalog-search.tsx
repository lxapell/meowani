"use client";

import * as React from "react";
import type { FilterState, Normalized } from "@/types/catalog";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useQueryState, parseAsString, parseAsArrayOf } from "nuqs";
import { useVirtualizer } from "@tanstack/react-virtual";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { AnimeCard, AnimeCardSkeleton } from "@/components/custom/anime-card";
import { VirtualizedComboboxList } from "@/components/ui/virtualized-list";
import { EndOfContent } from "@/components/custom/end-of-content";

import {
  ChevronsUpDownIcon,
  SearchIcon,
  SlidersVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { staticCatalogData } from "@/constants/anilist/enums";
import { fetchCatalog } from "@/app/(with-sidebar)/browse/actions";
import { cn } from "@/lib/shadcn/utils";
import Link from "next/link";

interface Data {
  label: string;
  data: Normalized[];
  type: "single" | "multiple";
  defaultValue: any;
}

const FiltersStateContext = React.createContext<FilterState | null>(null);

type TDispatchContext = ReturnType<typeof useCatalogFilters>["setters"];
const FiltersDispatchContext = React.createContext<TDispatchContext | null>(
  null,
);

/**
 * Provides catalog filter state and setter contexts, initialized from the given filters.
 *
 * @param initialFilters - The initial FilterState used to populate the URL-synced filter values.
 * @param children - React children rendered inside the providers.
 * @returns A React element that supplies `FiltersStateContext` and `FiltersDispatchContext` to its children.
 */
function CatalogFiltersProvider({
  children,
  initialFilters,
  ...props
}: React.ComponentProps<"div"> & { initialFilters: FilterState }) {
  const { filters, setters } = useCatalogFilters(initialFilters);

  const stateValue = React.useMemo(() => filters, [filters]);
  const dispatchValue = React.useMemo(() => setters, [setters]);

  return (
    <FiltersStateContext.Provider value={stateValue}>
      <FiltersDispatchContext.Provider value={dispatchValue} {...props}>
        {children}
      </FiltersDispatchContext.Provider>
    </FiltersStateContext.Provider>
  );
}

/**
 * Access the current catalog filter state from the provider-backed context.
 *
 * @returns The current `FilterState` provided by `CatalogFiltersProvider`.
 * @throws Error if called outside of a `CatalogFiltersProvider`.
 */
function useFiltersState() {
  const ctx = React.useContext(FiltersStateContext);
  if (!ctx)
    throw new Error(
      "useFiltersState must be used within a CatalogFiltersProvider",
    );
  return ctx;
}

/**
 * Accesses the filters dispatch context provided by CatalogFiltersProvider.
 *
 * @returns An object containing setter functions for updating catalog filter state.
 * @throws If called outside a CatalogFiltersProvider, throws an Error.
 */
function useFiltersDispatch() {
  const ctx = React.useContext(FiltersDispatchContext);
  if (!ctx)
    throw new Error(
      "useFiltersDispatch must be used within a CatalogFiltersProvider",
    );
  return ctx;
}

/**
 * Creates and infinite-query-backed data source for catalog pages using the given filter state.
 *
 * @param filters - FilterState used to build the query key and passed to the catalog fetcher
 * @returns The infinite query result for catalog pages, containing paginated `data.pages`, pagination helpers (`fetchNextPage`, `hasNextPage`), and status flags such as `isLoading`, `isError`, and `isFetchingNextPage`
 */
function useCatalogData(filters: FilterState) {
  const serializedFilters = JSON.stringify(filters);

  return useInfiniteQuery({
    queryKey: ["catalog", serializedFilters],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await fetchCatalog({
        pageParam: pageParam as number,
        filters,
      });
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo?.hasNextPage && lastPage.pageInfo?.currentPage != null
        ? lastPage.pageInfo.currentPage + 1
        : undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

type ComboboxKeys = Exclude<
  keyof FilterState,
  "Query" | "Min Duration" | "Max Duration" | "Min Episodes" | "Max Episodes"
>;

/**
 * Renders the catalog search input and collapsible filter panel and wires user interactions to the catalog filters context.
 *
 * Maintains a local search draft (with deferred updates) and exposes comboboxes, numeric range inputs, and a clear-all action that update the shared filter state.
 *
 * @returns The catalog search and filter UI as a React element.
 */
function CatalogSearch() {
  const filters = useFiltersState();
  const dispatch = useFiltersDispatch();
  const [isPending, startTransition] = React.useTransition();

  const [searchDraft, setSearchDraft] = React.useState(filters.Query);
  const deferredSearch = React.useDeferredValue(searchDraft);

  React.useEffect(() => {
    if (deferredSearch !== filters.Query) {
      dispatch.setQuery(deferredSearch);
    }
  }, [deferredSearch, filters.Query, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchDraft(val);
  };

  const handleChange = (key: keyof typeof dispatch, value: any) => {
    startTransition(() => {
      (dispatch[key] as Function)(value);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    startTransition(() => {
      if (name === "Min Duration") dispatch.setMinDuration(value);
      else if (name === "Max Duration") dispatch.setMaxDuration(value);
      else if (name === "Min Episodes") dispatch.setMinEpisodes(value);
      else if (name === "Max Episodes") dispatch.setMaxEpisodes(value);
    });
  };

  const handleClearAll = () => {
    startTransition(() => {
      dispatch.setQuery("");
      dispatch.setGenres([]);
      dispatch.setTags([]);
      dispatch.setFormats([]);
      dispatch.setYear(null);
      dispatch.setSeason(null);
      dispatch.setStatus(null);
      dispatch.setSortBy(null);
      dispatch.setStudio(null);
      dispatch.setMinDuration("");
      dispatch.setMaxDuration("");
      dispatch.setMinEpisodes("");
      dispatch.setMaxEpisodes("");
    });
    setSearchDraft("");
  };

  return (
    <>
      <Collapsible className="w-full flex flex-col gap-2 px-6 lg:px-12">
        <ButtonGroup className="flex w-full flex-col">
          <Label className="py-1.5 px-0 text-xs font-bold ">Search</Label>
          <div className="flex w-full gap-2">
            <ButtonGroup className="flex flex-1">
              <InputGroup className="md:h-10 relative flex w-full">
                <InputGroupInput
                  name="Query"
                  value={searchDraft}
                  onChange={handleSearchChange}
                  placeholder="Search for anime, movies..."
                />
                <InputGroupAddon align="inline-start">
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </ButtonGroup>
            <div className="gap-2 w-fit items-stretch flex">
              <CollapsibleTrigger asChild>
                <Button className="md:size-10">
                  <SlidersVerticalIcon />
                </Button>
              </CollapsibleTrigger>
              <Button className="md:size-10" onClick={handleClearAll}>
                <Trash2Icon />
              </Button>
            </div>
          </div>
        </ButtonGroup>
        <CollapsibleContent>
          <ComboboxGroup className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {staticCatalogData.map((data) => (
              <MemoizedCombobox
                key={data.label}
                data={data as Data}
                value={filters[data.label as ComboboxKeys] ?? data.defaultValue}
                onChange={(value) => {
                  const setterKey =
                    data.label === "Sort by"
                      ? "setSortBy"
                      : (`set${data.label}` as keyof typeof dispatch);
                  handleChange(setterKey, value);
                }}
              />
            ))}

            <FieldGroup className="grid grid-cols-2 col-span-2 gap-2">
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="min-duration"
                  className="py-1.5 text-xs text-muted-foreground px-0 font-bold"
                >
                  Min duration
                </FieldLabel>
                <Input
                  name="Min Duration"
                  value={filters["Min Duration"]}
                  onChange={handleInputChange}
                  min={0}
                  id="min-duration"
                  type="number"
                  placeholder="0"
                />
              </Field>
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="max-duration"
                  className="py-1.5 text-xs text-muted-foreground px-0 font-bold"
                >
                  Max duration
                </FieldLabel>
                <Input
                  name="Max Duration"
                  value={filters["Max Duration"]}
                  onChange={handleInputChange}
                  min={0}
                  id="max-duration"
                  type="number"
                  placeholder="Any"
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-2 col-span-2 gap-2">
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="min-episodes"
                  className="py-1.5 text-xs text-muted-foreground px-0 font-bold"
                >
                  Min episodes
                </FieldLabel>
                <Input
                  name="Min Episodes"
                  value={filters["Min Episodes"]}
                  onChange={handleInputChange}
                  min={1}
                  id="min-episodes"
                  type="number"
                  placeholder="1"
                />
              </Field>
              <Field className="gap-0">
                <FieldLabel
                  htmlFor="max-episodes"
                  className="py-1.5 text-xs text-muted-foreground px-0 font-bold"
                >
                  Max expisodes
                </FieldLabel>
                <Input
                  name="Max Episodes"
                  value={filters["Max Episodes"]}
                  onChange={handleInputChange}
                  min={1}
                  id="max-episodes"
                  type="number"
                  placeholder="Any"
                />
              </Field>
            </FieldGroup>
          </ComboboxGroup>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

const MemoizedCombobox = React.memo(
  ({
    data,
    value,
    onChange,
  }: {
    data: Data;
    value: any;
    onChange: (value: any) => void;
  }) => {
    const virtualizerRef = React.useRef<ReturnType<
      typeof useVirtualizer<HTMLDivElement, Element>
    > | null>(null);
    const virtualized = data.label === "Tags" || data.label === "Studio";

    return (
      <Combobox
        key={data.label}
        virtualized={virtualized}
        multiple={data.type === "multiple"}
        autoHighlight
        items={data.data}
        onValueChange={onChange}
        value={value}
        onItemHighlighted={(item, { reason, index }) => {
          const virtualizer = virtualizerRef.current;
          if (!item || !virtualizer) return;
          const isStart = index === 0;
          const isEnd = index === virtualizer.options.count - 1;
          const shouldScroll =
            reason === "none" || (reason === "keyboard" && (isStart || isEnd));

          if (shouldScroll) {
            queueMicrotask(() => {
              virtualizer.scrollToIndex(index, {
                align: isEnd ? "start" : "end",
              });
            });
          }
        }}
      >
        <div className="flex flex-col relative">
          <ComboboxLabel className="px-0 font-bold">{data.label}</ComboboxLabel>
          <ComboboxTrigger
            aria-placeholder={data.label}
            render={
              <Button variant="outline" className="justify-between font-normal">
                <div className="w-full text-start truncate">
                  <ComboboxValue placeholder="Any" />
                </div>
                <ChevronsUpDownIcon />
              </Button>
            }
          />
        </div>
        <ComboboxContent className="">
          <ComboboxInput
            showTrigger={false}
            placeholder="Search"
            showClear
            autoComplete="on"
          >
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </ComboboxInput>
          <ComboboxEmpty className="p-5">No results found.</ComboboxEmpty>
          {virtualized ? (
            <ComboboxList>
              <VirtualizedComboboxList
                overscan={5}
                virtualizerRef={virtualizerRef}
              />
            </ComboboxList>
          ) : (
            <ComboboxList>
              {(item: Normalized) => (
                <ComboboxItem key={item.value} value={item}>
                  <div className="truncate line-clamp-1">{item.label}</div>
                </ComboboxItem>
              )}
            </ComboboxList>
          )}
        </ComboboxContent>
      </Combobox>
    );
  },
  (prev, next) => prev.value === next.value && prev.data === next.data,
);
MemoizedCombobox.displayName = "MemoizedCombobox";

const CatalogResult = React.memo(function CatalogResult() {
  const filters = useFiltersState();
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isError,
    isFetchingNextPage,
  } = useCatalogData(filters);
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <CatalogResultSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-destructive px-6 md:px-12">
        Failed to load catalog
      </div>
    );
  }

  const medias = data?.pages.flatMap((page) => page.media) ?? [];

  if (medias.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground px-6 md:px-12">
        No results found.
      </div>
    );
  }

  return (
    <div className="space-y-6 px-1.5 md:px-6 lg:px-12">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {medias.map((media) => {
          const href = `/library/anime/${media.id}`;
          return (
            <AnimeCard key={media.id} href={href} as={Link} anime={media} />
          );
        })}
      </div>
      {isFetchingNextPage && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 overflow-hidden min-w-0 px-0">
          {Array.from({ length: 48 }).map((_, index) => (
            <AnimeCardSkeleton key={index} className="basis-0 pl-0 static" />
          ))}
        </div>
      )}
      <div
        ref={ref}
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
      ></div>
      {!hasNextPage && !isFetchingNextPage && (
        <>
          <EndOfContent />
        </>
      )}
    </div>
  );
});

/**
 * Renders a disabled skeleton of the catalog search and filter controls.
 *
 * The skeleton replicates the search input, filter/collapse trigger, and clear button
 * layout with disabled inputs and buttons to visually indicate loading.
 *
 * @returns A JSX element containing disabled inputs and buttons that match the search/filter UI layout.
 */
function CatalogSearchSkeleton({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("w-full flex flex-col gap-2 px-6 lg:px-12", className)}
      {...props}
    >
      <ButtonGroup className="flex w-full flex-col">
        <Label className="py-1.5 px-0 text-xs font-bold ">Search</Label>
        <div className="flex w-full gap-2">
          <ButtonGroup className="flex flex-1">
            <InputGroup className="md:h-10 relative flex w-full" data-disabled>
              <InputGroupInput
                name="Query"
                placeholder="Search for anime, movies..."
                disabled
              />
              <InputGroupAddon align="inline-start">
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </ButtonGroup>
          <div className="gap-2 w-fit items-stretch flex">
            <Button className="md:size-10" disabled>
              <SlidersVerticalIcon />
            </Button>
            <Button className="md:size-10" disabled>
              <Trash2Icon />
            </Button>
          </div>
        </div>
      </ButtonGroup>
    </div>
  );
}

/**
 * Render a grid of anime card skeleton placeholders that match the catalog results layout.
 *
 * @param amount - The number of `AnimeCardSkeleton` placeholders to render (default: 24).
 * @param className - Additional CSS class names applied to the outer container.
 * @returns A React element containing a responsive grid of `AnimeCardSkeleton` placeholders.
 */
function CatalogResultSkeleton({
  amount = 24,
  className,
  ...props
}: React.ComponentPropsWithRef<"div"> & { amount?: number }) {
  return (
    <div
      className={cn("space-y-6 px-1.5 md:px-6 lg:px-12", className)}
      {...props}
    >
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 overflow-hidden min-w-0 px-0">
        {Array.from({ length: amount }).map((_, index) => (
          <AnimeCardSkeleton key={index} className="basis-0 pl-0 static" />
        ))}
      </div>
    </div>
  );
}

/**
 * Synchronizes catalog filter state with URL query parameters and exposes current filters and setters.
 *
 * Builds a FilterState derived from URL-bound query parameters (initialized from `defaultFilters`) and returns setter functions that update those URL parameters. Array-valued filters (genres, tags, formats) are stored as repeated query values; single-select filters (year, season, status, sort by, studio) are stored as string values; numeric range fields are stored as strings.
 *
 * @param defaultFilters - Initial filter values used when query parameters are not present
 * @returns An object containing:
 *  - `filters`: the current FilterState reconstructed from URL parameters and available catalog data
 *  - `setters`: functions to update each filter field (e.g., `setQuery`, `setGenres`, `setYear`, `setMinDuration`, etc.)
 */
function useCatalogFilters(defaultFilters: FilterState) {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault(defaultFilters.Query),
  );

  const [genreValues, setGenreValues] = useQueryState(
    "genres",
    parseAsArrayOf(parseAsString).withDefault(
      defaultFilters.Genres.map((genre) => genre.value),
    ),
  );
  const [tagValues, setTagValues] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString).withDefault(
      defaultFilters.Tags.map((tag) => tag.value),
    ),
  );
  const [formatValues, setFormatValues] = useQueryState(
    "formats",
    parseAsArrayOf(parseAsString).withDefault(
      defaultFilters.Formats.map((format) => format.value),
    ),
  );

  const [year, setYear] = useQueryState(
    "year",
    parseAsString.withDefault(defaultFilters.Year?.value ?? ""),
  );
  const [season, setSeason] = useQueryState(
    "season",
    parseAsString.withDefault(defaultFilters.Season?.value ?? ""),
  );
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault(defaultFilters.Status?.value ?? ""),
  );
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsString.withDefault(defaultFilters["Sort by"]?.value ?? ""),
  );
  const [studio, setStudio] = useQueryState(
    "studio",
    parseAsString.withDefault(defaultFilters.Studio?.value ?? ""),
  );

  const [minDuration, setMinDuration] = useQueryState(
    "minDuration",
    parseAsString.withDefault(defaultFilters["Min Duration"]),
  );
  const [maxDuration, setMaxDuration] = useQueryState(
    "maxDuration",
    parseAsString.withDefault(defaultFilters["Max Duration"]),
  );
  const [minEpisodes, setMinEpisodes] = useQueryState(
    "minEpisodes",
    parseAsString.withDefault(defaultFilters["Min Episodes"]),
  );
  const [maxEpisodes, setMaxEpisodes] = useQueryState(
    "maxEpisodes",
    parseAsString.withDefault(defaultFilters["Max Episodes"]),
  );

  const findItem = React.useCallback(
    (data: Normalized[], value: string) =>
      data.find((item) => item.value === value) ?? null,
    [],
  );

  const filters: FilterState = React.useMemo(
    () => ({
      Query: query,
      Genres: genreValues
        .map((v) =>
          findItem(
            staticCatalogData.find((d) => d.label === "Genres")!.data,
            v,
          ),
        )
        .filter(Boolean) as Normalized[],
      Tags: tagValues
        .map((v) =>
          findItem(staticCatalogData.find((d) => d.label === "Tags")!.data, v),
        )
        .filter(Boolean) as Normalized[],
      Formats: formatValues
        .map((v) =>
          findItem(
            staticCatalogData.find((d) => d.label === "Formats")!.data,
            v,
          ),
        )
        .filter(Boolean) as Normalized[],
      Year: year
        ? findItem(
            staticCatalogData.find((d) => d.label === "Year")!.data,
            year,
          )
        : null,
      Season: season
        ? findItem(
            staticCatalogData.find((d) => d.label === "Season")!.data,
            season,
          )
        : null,
      Status: status
        ? findItem(
            staticCatalogData.find((d) => d.label === "Status")!.data,
            status,
          )
        : null,
      "Sort by": sortBy
        ? findItem(
            staticCatalogData.find((d) => d.label === "Sort by")!.data,
            sortBy,
          )
        : null,
      Studio: studio
        ? findItem(
            staticCatalogData.find((d) => d.label === "Studio")!.data,
            studio,
          )
        : null,
      "Min Duration": minDuration,
      "Max Duration": maxDuration,
      "Min Episodes": minEpisodes,
      "Max Episodes": maxEpisodes,
    }),
    [
      query,
      genreValues,
      tagValues,
      formatValues,
      year,
      season,
      status,
      sortBy,
      studio,
      minDuration,
      maxDuration,
      minEpisodes,
      maxEpisodes,
      findItem,
    ],
  );

  const setters = React.useMemo(
    () => ({
      setQuery,
      setGenres: (items: Normalized[]) =>
        setGenreValues(items.map((i) => i.value)),
      setTags: (items: Normalized[]) => setTagValues(items.map((i) => i.value)),
      setFormats: (items: Normalized[]) =>
        setFormatValues(items.map((i) => i.value)),
      setYear: (item: Normalized | null) => setYear(item?.value ?? ""),
      setSeason: (item: Normalized | null) => setSeason(item?.value ?? ""),
      setStatus: (item: Normalized | null) => setStatus(item?.value ?? ""),
      setSortBy: (item: Normalized | null) => setSortBy(item?.value ?? ""),
      setStudio: (item: Normalized | null) => setStudio(item?.value ?? ""),
      setMinDuration,
      setMaxDuration,
      setMinEpisodes,
      setMaxEpisodes,
    }),
    [
      setQuery,
      setGenreValues,
      setTagValues,
      setFormatValues,
      setSeason,
      setStatus,
      setSortBy,
      setStudio,
      setMinDuration,
      setMaxDuration,
      setMinEpisodes,
      setMaxEpisodes,
    ],
  );

  return { filters, setters };
}

export {
  CatalogFiltersProvider,
  CatalogSearch,
  CatalogResult,
  CatalogSearchSkeleton,
  CatalogResultSkeleton,
  useCatalogData,
};
