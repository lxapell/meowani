"use client";

import * as React from "react";
import type { FilterState, Normalized, PageData } from "@/types/catalog";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxGroup,
  useComboboxAnchor,
  ComboboxValue,
  ComboboxTrigger,
  ComboboxLabel,
} from "@/components/ui/combobox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { useVirtualizer } from "@tanstack/react-virtual";
import { VirtualizedComboboxList } from "@/components/ui/virtualized-list";
import {
  ChevronsUpDownIcon,
  SearchIcon,
  SlidersVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { initialFilters, staticCatalogData } from "@/constants/anilist/enums";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { filtersToURLParams } from "@/utils/catalog/helpers";
import { fetchCatalog } from "@/app/(with-sidebar)/browse/actions";
import { AnimeCard, AnimeCardSkeleton } from "./anime-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EndOfContent } from "@/components/custom/end-of-content";
import { cn } from "@/lib/shadcn/utils";

interface Data {
  label: string;
  data: Normalized[];
  type: "single" | "multiple";
  defaultValue: null | [];
}

type CatalogContextValue = {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  clearFilters: () => void;
  data: InfiniteData<{ pageInfo: any; media: any[] }> | undefined;
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

const CatalogContext = React.createContext<CatalogContextValue | null>(null);

function useCatalog() {
  const ctx = React.useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}

function CatalogProvider({
  initialFilters: initialFiltersProps,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  initialFilters: FilterState;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] =
    React.useState<FilterState>(initialFiltersProps);
  const [isPending, startTransition] = React.useTransition();

  const updateFilter = React.useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      startTransition(() => {
        setFilters((prev) => ({ ...prev, [key]: value }));
      });
    },
    [],
  );

  const clearFilters = React.useCallback(() => {
    startTransition(() => {
      setFilters(initialFilters);
    });
  }, [initialFilters]);

  React.useEffect(() => {
    const params = filtersToURLParams(filters);
    const url = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(url, { scroll: false });
  }, [filters, pathname, router]);

  const serializedFilters = React.useMemo(
    () => JSON.stringify(filters),
    [filters],
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["catalog", serializedFilters],
    queryFn: ({ pageParam }) =>
      fetchCatalog({ pageParam: pageParam as number, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.pageInfo?.hasNextPage
        ? lastPage?.pageInfo?.currentPage! + 1
        : undefined,
  });

  const value = React.useMemo(
    () => ({
      filters,
      updateFilter,
      clearFilters,
      data,
      isLoading,
      isError,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    }),
    [
      filters,
      updateFilter,
      clearFilters,
      data,
      isLoading,
      isError,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    ],
  );

  return (
    <CatalogContext.Provider value={value} {...props}>
      {children}
    </CatalogContext.Provider>
  );
}

type ComboboxKeys = Exclude<
  keyof FilterState,
  "Query" | "Min Duration" | "Max Duration" | "Min Episodes" | "Max Episodes"
>;

const CatalogSearch = React.memo(function CatalogSearch() {
  const { filters, updateFilter, clearFilters } = useCatalog();

  const [searchDraft, setSearchDraft] = React.useState(filters.Query);

  const debouncedCommitSearch = useDebouncedCallback((value: string) => {
    updateFilter("Query", value);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchDraft(val);
    debouncedCommitSearch(val);
  };

  React.useEffect(() => {
    setSearchDraft(filters.Query);
  }, [filters.Query]);

  const handleChange = (key: string, value: any) => {
    updateFilter(key as keyof FilterState, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFilter(name as keyof FilterState, value);
  };

  return (
    <>
      <Collapsible className="w-full flex flex-col gap-2 px-6 md:px-12">
        <ButtonGroup className="flex w-full flex-col">
          <Label className="py-1.5 px-0 text-xs font-bold ">Search</Label>
          <div className="flex w-full gap-2">
            <ButtonGroup className="flex flex-1">
              <InputGroup className="md:h-10 relative flex w-full">
                <InputGroupInput
                  name="Query"
                  value={filters.Query}
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
              <Button className="md:size-10" onClick={clearFilters}>
                <Trash2Icon />
              </Button>
            </div>
          </div>
        </ButtonGroup>
        <CollapsibleContent>
          <ComboboxGroup className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {staticCatalogData.map((data) => {
              const virtualizerRef = React.useRef<ReturnType<
                typeof useVirtualizer<HTMLDivElement, Element>
              > | null>(null);
              const virtualized =
                data.label === "Tags" || data.label === "Studio";

              return (
                <Combobox
                  key={data.label}
                  virtualized={virtualized}
                  multiple={data.type === "multiple"}
                  autoHighlight
                  items={data.data}
                  onValueChange={(value) => handleChange(data.label, value)}
                  value={
                    filters[data.label as ComboboxKeys] ?? data.defaultValue
                  }
                  onItemHighlighted={(item, { reason, index }) => {
                    const virtualizer = virtualizerRef.current;
                    if (!item || !virtualizer) return;
                    const isStart = index === 0;
                    const isEnd = index === virtualizer.options.count - 1;
                    const shouldScroll =
                      reason === "none" ||
                      (reason === "keyboard" && (isStart || isEnd));

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
                    <ComboboxLabel className="px-0 font-bold">
                      {data.label}
                    </ComboboxLabel>
                    <ComboboxTrigger
                      aria-placeholder={data.label}
                      render={
                        <Button
                          variant="outline"
                          className="justify-between font-normal"
                        >
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
                    <ComboboxEmpty className="p-5">
                      No results found.
                    </ComboboxEmpty>
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
                            <div className="truncate line-clamp-1">
                              {item.label}
                            </div>
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    )}
                  </ComboboxContent>
                </Combobox>
              );
            })}
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
});

const CatalogResult = React.memo(function CatalogResult() {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isError,
    isFetchingNextPage,
  } = useCatalog();
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
    <div className="space-y-6 px-6 md:px-12">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {medias.map((media) => {
          const href = `/library/anime/${media.id}`;
          return <AnimeCard key={media.id} href={href} anime={media} />;
        })}
      </div>
      {isFetchingNextPage && (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 overflow-hidden min-w-0 px-0 block">
          {Array.from({ length: 48 }).map((_, index) => (
            <AnimeCardSkeleton key={index} className="basis-0 pl-0 static" />
          ))}
        </div>
      )}
      <div
        ref={ref}
        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
      ></div>
      {!isFetchingNextPage && <EndOfContent />}
    </div>
  );
});

function CatalogSearchSkeleton({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("w-full flex flex-col gap-2 px-6 md:px-12", className)}
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

function CatalogResultSkeleton({
  amount = 24,
  className,
  ...props
}: React.ComponentPropsWithRef<"div"> & { amount?: number }) {
  return (
    <div className={cn("space-y-6 px-6 md:px-12", className)} {...props}>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 overflow-hidden min-w-0 px-0 block">
        {Array.from({ length: amount }).map((_, index) => (
          <AnimeCardSkeleton key={index} className="basis-0 pl-0 static" />
        ))}
      </div>
    </div>
  );
}

export {
  CatalogProvider,
  CatalogSearch,
  CatalogResult,
  CatalogSearchSkeleton,
  CatalogResultSkeleton,
  useCatalog,
};
