"use client";

import * as React from "react";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { useDebouncedCallback } from "@/hooks/use-debounce";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  TvIcon,
  PlayIcon,
} from "lucide-react";
import {
  genreEnums,
  tagEnums,
  formatEnums,
  seasonEnums,
  statusEnums,
  sortEnums,
  studioEnums,
  yearEnums,
} from "@/constants/anilist/enums";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface Normalized {
  label: string;
  value: string;
}
interface Data {
  label: string;
  data: Normalized[];
  type: "single" | "multiple";
  defaultValue: null | [];
}
type FilterState = Record<string, any>;

interface PageData {
  pageInfo: { hasNextPage: boolean };
  media: {
    id: string;
    status: string;
    image: string;
    title: string;
    genre: string[];
    type: string;
    episodes: number;
  };
}

type CatalogContextValue = {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  clearFilters: () => void;
  data: InfiniteData<PageData> | undefined;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: () => void;
  isFetchingNextPage: boolean;
};

const CatalogContext = React.createContext<CatalogContextValue | null>(null);

function useCatalog() {
  const ctx = React.useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}

function CatalogProvider({
  initialData,
  initialFilters: initialFiltersProps,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  initialData: PageData;
  initialFilters: FilterState;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] =
    React.useState<FilterState>(initialFiltersProps);

  const updateFilter = React.useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        const params;
      });
    },
  );
}

function normalize(item: string | any): Normalized {
  if (typeof item === "string") {
    return { label: item, value: item };
  }
  return {
    label: "normal" in item ? item.normal : item.name,
    value: "query" in item ? item.query : item.name,
  };
}
const data: Data[] = [
  {
    label: "Genres",
    data: genreEnums.map((genre, index) => normalize(genre)),
    type: "multiple",
    defaultValue: [],
  },
  {
    label: "Tags",
    data: tagEnums
      .filter((tag) => !tag.isAdult)
      .map((tag, index) => normalize(tag)),
    type: "multiple",
    defaultValue: [],
  },
  {
    label: "Formats",
    data: formatEnums.map((format, index) => normalize(format)),
    type: "multiple",
    defaultValue: [],
  },
  {
    label: "Year",
    data: yearEnums.map((year, index) => normalize(year)),
    type: "single",
    defaultValue: null,
  },
  {
    label: "Season",
    data: seasonEnums.map((season, index) => normalize(season)),
    type: "single",
    defaultValue: null,
  },
  {
    label: "Status",
    data: statusEnums.map((status, index) => normalize(status)),
    type: "single",
    defaultValue: null,
  },
  {
    label: "Sort by",
    data: sortEnums.map((sort, index) => normalize(sort)),
    type: "single",
    defaultValue: null,
  },
  {
    label: "Studio",
    data: studioEnums.map((studio, index) => normalize(studio)),
    type: "single",
    defaultValue: null,
  },
];

const initialFilters: FilterState = {
  Genres: [],
  Tags: [],
  Formats: [],
  Year: null,
  Season: null,
  Status: null,
  "Sort by": null,
  Studio: null,
  Query: "",
  "Min Duration": "",
  "Max Duration": "",
  "Min Episodes": "1",
  "Max Episodes": "",
};

export function CatalogSearch() {
  const anchor = useComboboxAnchor();
  const [filters, setFilters] = React.useState<FilterState>(initialFilters);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChange = (key: string, value: any) => {
    updateFilter(key as keyof FilterState, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFilter(name as keyof FilterState, value);
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
  };

  const debouncedFetch = useDebouncedCallback((currentFilters: FilterState) => {
    console.log("[DebounceTest] Fetching:", currentFilters);
  }, 500);

  React.useEffect(() => {
    debouncedFetch(filters);
  }, [filters, debouncedFetch]);

  return (
    <>
      <Collapsible className="w-full flex flex-col gap-2">
        <ButtonGroup className="flex w-full flex-col">
          <Label className="py-1.5 px-0 text-xs font-bold text-muted-foreground">
            Search
          </Label>
          <div className="flex w-full gap-2">
            <ButtonGroup className="flex flex-1">
              <InputGroup className="md:h-10 relative flex w-full">
                <InputGroupInput
                  name="Query"
                  value={filters.Query}
                  onChange={handleInputChange}
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
            {data.map((data) => {
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
                  value={filters[data.label] ?? data.defaultValue}
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
      <div className="space-y-6">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-5 pt-5">
          {Array.from({ length: 24 }).map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Link href="/" className="group relative block w-full">
                  <Card className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-foreground/6 transition-all duration-300 group-hover:ring-foreground/20 group-hover:shadow-xl group-hover:shadow-black/30">
                    <Image
                      src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/184951-Rx1mZZfKa9IU.jpg"
                      alt="Card"
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />

                    {/*Play Button*/}
                    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg backdrop-blur-sm transition-transform duration-300 scale-75 group-hover:scale-100">
                        <PlayIcon />
                      </div>
                    </div>

                    {/* Hover Info */}
                    <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-linear-to-t from black/90 via-black/60 to-transparent p-3 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="line-clamp-2 text-xs leading-snug text-white/90">
                        {index + 1}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {Array.from({ length: 3 }).map((_, genre) => (
                          <Badge key={genre} className="">
                            {genre + 1}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Info Below */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <TvIcon className="size-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">
                          TV
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-primary text-primary-foreground text-[8px] h-4 px-1.5"
                      >
                        Ongoing
                      </Badge>
                    </div>
                    <h3 className="line-clamp-2 text-xs font-semibold text-foreground/90 group-hover:text-foreground">
                      {index + 1}
                    </h3>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function CatalogResult();
