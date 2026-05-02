"use client";

import * as React from "react";
import sanitizeHTML from "sanitize-html";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs as TabsPrimitive } from "radix-ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/shadcn/utils";
import Link from "next/link";
import {
  PlayIcon,
  PencilLineIcon,
  BookmarkIcon,
  Share2Icon,
  ClapperboardIcon,
  StarIcon,
  InfoIcon,
  LayersIcon,
  ChevronDown,
  Building2Icon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimeCard } from "@/components/custom/anime-card";
import { mapSimple } from "@/utils/mapper";
import { getShimmerDataURL } from "@/utils/placeholder";
import { DateFormatter, TitleSlug, truncateHTML } from "@/utils/formatter";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IAnimeInfoBannerProps {
  data: {
    id: number;
    image?: { large: string; extraLarge: string };
    color?: string;
    bannerImage?: string;
    title?: { eng?: string; romaji?: string };
    episodes?: number;
    type?: string;
    status?: string;
    season?: string;
    score?: number;
    genres: string[];
  };
}

/**
 * Render a responsive anime information hero/banner with background imagery, a cover modal, metadata badges (episodes/type/status/season/score), genres, and action controls.
 *
 * @param data - The banner data object containing images, color, titles, numeric/string metadata (episodes, type, status, season, score), and required `genres: string[]`. Used to populate images, badges, titles, genre links, and action targets.
 * @returns A React element representing the anime info banner section.
 */
export function AnimeInfoBanner({
  data,
  className,
  ...props
}: IAnimeInfoBannerProps & React.ComponentProps<"section">) {
  return (
    <section className={cn("w-full", className)} {...props}>
      <div className="relative min-h-[240px] md:min-h-[300px] lg:min-h-[360px] flex items-end">
        <Image
          src={
            data.bannerImage ||
            data.image?.large ||
            getShimmerDataURL(data.color || "#FFFFFF")
          }
          alt={data.title?.eng || "banner"}
          placeholder="blur"
          blurDataURL={getShimmerDataURL(data.color || "#8bdfea")}
          fill
          className="object-cover w-full aspect-video absolute inset-0 z-10"
        />
        <div className="absolute inset-0 z-11 bg-linear-to-t from-background from-20% via-background/80 via-60% to-transparent" />
        <div className="relative pointer-events-auto flex w-full flex-col items-center justify-center gap-6 px-4 pt-16 md:pt-24 md:px-10 xl:px-14 max-w-[1600px] z-20">
          <div className="flex w-full flex-col md:flex-row items-center gap-3 pt-4 md:pt-8 md:gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="group no-scale pt-0 relative h-[175px] w-[125px] shrink-0 overflow-hidden rounded-xl md:h-[256px] md:w-[180px]"
                  aria-label="View full size image"
                >
                  <Image
                    src={
                      data.image?.large ||
                      getShimmerDataURL(data.color || "8bdfea")
                    }
                    alt={data.title?.eng || "cover"}
                    placeholder="blur"
                    blurDataURL={getShimmerDataURL(data.color || "#8bdfea")}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                    className="h-full w-full object-cover"
                  />
                </Button>
              </DialogTrigger>
              <DialogContent
                showCloseButton={false}
                className="max-w-[90vw] max-h-[90vh] p-0 border-0 border-none bg-transparent shadow-none w-auto md:w-full"
              >
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    className="flex rounded-xl h-auto ps-0 pe-0 px-0"
                  >
                    <Image
                      src={
                        data.image?.extraLarge ||
                        data.image?.large ||
                        getShimmerDataURL(data.color || "8bdfea")
                      }
                      placeholder="blur"
                      blurDataURL={getShimmerDataURL(data.color || "#8bdfea")}
                      alt={data.title?.eng || "cover"}
                      className="size-auto md:size-full object-contain rounded-xl"
                      width={800}
                      height={1000}
                    />
                  </Button>
                </DialogClose>
                <VisuallyHidden>
                  <DialogTitle>Anime cover image</DialogTitle>
                  <DialogDescription>
                    The cover image of the current anime
                  </DialogDescription>
                </VisuallyHidden>
              </DialogContent>
            </Dialog>

            {/* Anime Info */}
            <div className="flex w-full flex-col items-start justify-end gap-2 md:gap-4">
              <div className="flex w-full flex-col gap-1 text-start md:gap-1.5 items-center md:items-start">
                {/* Stats */}
                <div className="hidden md:flex w-full flex-wrap gap-1.5 pt-0.5 md:gap-3 md:pt-1">
                  {/* Episode */}
                  {data.episodes && (
                    <Badge className="h-5 font-bold md:h-6 md:px-3.5 md:text-base">
                      {data.episodes} EPS
                    </Badge>
                  )}

                  {/* Type */}
                  {data.type && (
                    <Badge
                      className="h-5 font-bold md:h-6 md:px-3.5 md:text-base"
                      asChild
                    >
                      <Link href={`/browse?format=${data.type}`}>
                        {data.type}
                      </Link>
                    </Badge>
                  )}

                  {/* Status */}
                  {data.status && (
                    <Badge
                      className="h-5 font-bold md:h-6 md:px-3.5 md:text-base"
                      asChild
                    >
                      <Link href={`/browse?status=${data.status}`}>
                        {data.status}
                      </Link>
                    </Badge>
                  )}

                  {/* Season */}
                  {data.season && (
                    <Badge
                      className="hidden h-5 font-bold md:h-6 md:px-3.5 md:text-base lg:inline-flex capitalize"
                      asChild
                    >
                      <Link href={`/browse?season=${data.season}`}>
                        {data.season}
                      </Link>
                    </Badge>
                  )}

                  {/* Score */}
                  {data.score && (
                    <Badge
                      className="hidden font-bold h-5 md:h-6 md:px-3.5 md:text-base lg:inline-flex"
                      asChild
                    >
                      <Link href="/browse?sort=SCORE_DESC">{data.score}%</Link>
                    </Badge>
                  )}
                </div>

                <h2 className="line-clamp-1 hidden text-base font-light text-muted-foreground select-text md:block md:text-lg">
                  {data.title?.romaji}
                </h2>
                <h1 className="line-clamp-2 text-xl font-black select-text md:text-4xl text-center md:text-start">
                  {data.title?.eng || data.title?.romaji || "No Title"}
                </h1>

                {/* Genres */}
                {data.genres && (
                  <div className="flex flex-wrap items-center gap-2 md:justify-start md:self-start">
                    {data.genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="hidden h-7 text-nowrap md:inline-flex"
                        asChild
                      >
                        <Link href={`/browse?genres=${genre}`}>{genre}</Link>
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex md:hidden flex-wrap items-center justify-center gap-2">
                  {data.score && (
                    <Badge
                      variant="outline"
                      className="h-7 border-cyan-500/20 bg-cyan-500/10 text-cyan-500"
                    >
                      <StarIcon fill="currentColor" />
                      {data.score / 10}
                    </Badge>
                  )}
                  {data.status && (
                    <Badge variant="secondary" className="h-7">
                      {data.status}
                    </Badge>
                  )}
                  {data.episodes && (
                    <Badge variant="ghost" className="text-muted-foreground">
                      {data.episodes} Episodes
                    </Badge>
                  )}
                </div>

                <div className="md:justify-start gap-2 flex w-fit md:w-full items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2">
                  <ButtonGroup className="inline-flex items-center overflow-hidden">
                    {data.episodes && data.episodes >= 1 ? (
                      <Button className="md:h-10 md:px-3" asChild>
                        <Link
                          href={`/library/watch/${TitleSlug.fromTitle(data.title?.eng || data.title?.romaji || "No Title", data.id)}/1`}
                        >
                          <PlayIcon fill="currentColor" />
                          Watch Now
                        </Link>
                      </Button>
                    ) : (
                      <Button className="md:h-10 md:px-3" disabled>
                        <PlayIcon fill="currentColor" />
                        Watch Now
                      </Button>
                    )}
                    <Button className="md:h-10 md:px-3">
                      <PencilLineIcon />
                    </Button>
                  </ButtonGroup>
                  <Button className="md:size-10">
                    <BookmarkIcon />
                  </Button>
                  <Button className="md:size-10">
                    <Share2Icon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Renders a tabbed interface with Overview, Relations, and Characters panels for a given anime.
 *
 * @param data - Anime data used to populate the panels. Must include `relations` and `characters` arrays and any fields consumed by the Overview panel (e.g., synopsis, nextEpisode, studios, tags, externalLinks).
 * @param className - Optional additional CSS classes applied to the root Tabs container.
 * @returns A React element containing a Tabs control with Overview, Relations, and Characters content derived from `data`.
 */
export function AnimeInfoTabs({
  data,
  className,
  ...props
}: { data: any } & React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <Tabs
      className={cn(
        "px-1.5 md:px-6 lg:px-12 xl:px-14 gap-4 sm:gap-6",
        className,
      )}
      defaultValue="overview"
      orientation="horizontal"
      {...props}
    >
      <TabsList className="group-data-horizontal/tabs:h-10 h-10 bg-white/3 border ring-ring w-fit p-1 gap-0.5 sm:p-1.5">
        <TabsTrigger
          value="overview"
          className="text-primary-foreground/60 hover:text-primary-foreground dark:hover:text-primary-foreground data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground data-active:border-transparent dark:data-active:border-transparenti px-3.5 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-semibold transition-colors duration-300 ease-in-out"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="relations"
          className="text-primary-foreground/60 hover:text-primary-foreground dark:hover:text-primary-foreground data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground data-active:border-transparent dark:data-active:border-transparenti px-3.5 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-semibold transition-colors duration-300 ease-in-out"
        >
          Relations
        </TabsTrigger>
        <TabsTrigger
          value="characters"
          className="text-primary-foreground/60 hover:text-primary-foreground dark:hover:text-primary-foreground data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground data-active:border-transparent dark:data-active:border-transparenti px-3.5 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-semibold transition-colors duration-300 ease-in-out"
        >
          Characters
        </TabsTrigger>
      </TabsList>
      <div className="transition-all duration-300">
        <TabsContent
          value="overview"
          className="space-y-3 rounded-md text-foreground/90 shadow-sm lg:space-y-6"
        >
          <Overview items={data} />
        </TabsContent>
        <TabsContent value="relations">
          <Relations items={data.relations} />
        </TabsContent>
        <TabsContent value="characters">
          <Characters items={data.characters} />
        </TabsContent>
      </div>
    </Tabs>
  );
}

interface IOverviewProps {
  items: {
    id: number;
    releaseDate: string | null;
    endDate: string | null;
    nextEpisode: { airing: number | null; episode: number | null };
    trailer: { url: string | null; thumbnail: string | null };
    type: string | null;
    status: string | null;
    description: string;
    studios: string[];
    genres: string[];
    tags: string[];
    synonyms: string[];
    externalLinks: { site: string; url: string }[];
  };
}

/**
 * Renders the overview panel for an anime, including airing info, metadata, synopsis, studios, synonyms, genres, external tracking links, and tags.
 *
 * @param items - Anime overview data. Expected fields used: `id`, `description`, `type`, `releaseDate`, `endDate`, `nextEpisode` (with `airing` and `episode`), `trailer` (with `url`), `studios`, `synonyms`, `genres`, `externalLinks` (array of `{ url, site }`), and `tags` (string[]).
 * @returns The rendered overview JSX element for the provided anime data.
 */
function Overview({
  items,
  className,
  ...props
}: IOverviewProps & Omit<React.ComponentPropsWithoutRef<"div">, "children">) {
  const date = items.nextEpisode.airing
    ? new DateFormatter(items.nextEpisode.airing)
    : null;
  const synopsis = truncateHTML(
    sanitizeHTML(items.description, {
      allowedTags: ["i", "b", "em", "strong", "br", "p", "span"],
      allowedAttributes: {},
    }),
    200,
  );
  const [tagExpanded, setTagExpanded] = React.useState(false);
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-stretch lg:gap-6",
        className,
      )}
      {...props}
    >
      <ItemGroup className="flex h-full flex-col space-y-3 rounded-md text-foreground/90 lg:col-span-8 gap-0">
        {date && (
          <Item
            variant="outline"
            className="border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-foreground/80"
          >
            <ItemContent className="flex-row gap-2">
              <span className="font-medium text-foreground">
                Episode {items.nextEpisode.episode}
              </span>
              <span>airing {date?.diff}</span>
              <span className="text-foreground/30">•</span>
              <span className="text-foreground/50">{date?.formattted}</span>
            </ItemContent>
          </Item>
        )}
        <Item
          variant="outline"
          className="flex-row items-center bg-white/3 text-foreground/80 px-3 py-2 gap-2 sm:gap-3 lg:px-4"
        >
          <ItemContent className="flex-row gap-2 flex-none">
            <div className="rounded-md border focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 border-border px-3 py-1.5 text-xs font-medium text-foreground/80 bg-input/30">
              {items.type}
            </div>
            {items.releaseDate && (
              <div className="rounded-md border focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 border-border px-3 py-1.5 text-xs font-medium text-foreground/70 bg-input/30">
                {items.status?.toUpperCase() === "UPCOMING"
                  ? "Airing "
                  : "Aired "}
                {items.releaseDate}
                {items.endDate ? ` - ${items.endDate}` : ""}
              </div>
            )}
          </ItemContent>
          <ItemActions className="ml-auto">
            {items.trailer.url && (
              <Button
                variant="outline"
                className="items-center h-fit gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-foreground/90 transition-all duration-200"
                disabled={
                  items.trailer.url === null || items.trailer.url === undefined
                }
                asChild
              >
                <Link
                  href={items.trailer.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-background">
                    <PlayIcon fill="currentColor" />
                  </span>
                  Trailer
                </Link>
              </Button>
            )}
          </ItemActions>
        </Item>
        <Collapsible className="group/synopsis">
          <Item
            variant="outline"
            className="flex min-h-0 flex-col gap-0 bg-white/3 p-3 lg:h-full lg:flex-1 lg:p-4 lg:md:p-5"
          >
            <h3 className="mb-2 w-full flex items-center gap-2 text-[10px] font-medium tracking-widest text-muted-foreground uppercase lg:mb-3">
              <InfoIcon size={12} />
              Synopsis
            </h3>
            <ItemContent className="prose prose-invert prose-sm max-w-none w-full flex-1 overflow-auto text-sm leading-relaxed font-normal text-foreground/75 [&_p]:my-1 [&_p]:text-sm">
              {synopsis.truncated ? (
                <>
                  <span
                    className="group-data-[state=open]/synopsis:hidden lg:hidden"
                    dangerouslySetInnerHTML={{ __html: synopsis.truncated }}
                  />
                  <span
                    className="hidden group-data-[state=open]/synopsis:block lg:block"
                    dangerouslySetInnerHTML={{ __html: synopsis.full }}
                  />
                </>
              ) : (
                <span
                  className="group-data-[state=open]/synopsis:block lg:block"
                  dangerouslySetInnerHTML={{ __html: synopsis.full }}
                />
              )}
            </ItemContent>
            {synopsis.truncated && (
              <ItemActions className="w-full">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-secondary mt-2 text-[10px] font-medium tracking-widest uppercase transition-all duration-200 w-full px-3 py-1.5 text-foreground/60 h-fit lg:hidden"
                  >
                    <span className="group-data-[state=open]/synopsis:hidden text-foreground/60">
                      Read more
                    </span>
                    <span className="text-foreground/60 group-data-[state=closed]/synopsis:hidden">
                      Read less
                    </span>
                  </Button>
                </CollapsibleTrigger>
              </ItemActions>
            )}
          </Item>
        </Collapsible>
      </ItemGroup>
      <aside className="h-full lg:col-span-4">
        <Collapsible className="h-full group">
          <Item
            variant="outline"
            className="h-full overflow-auto p-3 lg:p-4 bg-white/3 items-start"
          >
            <ItemActions className="w-full lg:hidden">
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full uppercase transition-all duration-200 px-3 py-2 flex justify-between text-left gap-2 border-none"
                >
                  <span className="flex items-center gap-2 text-[10px] font-medium tracking-widest text-foreground/40 uppercase">
                    <LayersIcon size={12} />
                    <span className="group-data-[state=open]:hidden">
                      Show more info
                    </span>
                    <span className="group-data-[state=closed]:hidden">
                      Hide info
                    </span>
                  </span>
                  <ChevronDown
                    size={14}
                    className="shrink-0 text-foreground/40 transition-transform duration-200 group-data-[state=open]/button:rotate-180"
                  />
                </Button>
              </CollapsibleTrigger>
            </ItemActions>
            <ItemContent className="group-data-[state=closed]:hidden lg:group-data-[state=open]:block lg:group-data-[state=closed]:block space-y-4">
              {/* Studios */}
              <div>
                <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium tracking-widest text-foreground/35 uppercase">
                  <Building2Icon size={11} />
                  Studios
                </div>
                {items.studios && (
                  <div className="flex flex-wrap gap-1.5">
                    {items.studios.map((studio) => (
                      <Badge
                        key={studio}
                        variant="outline"
                        className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                      >
                        {studio}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Synonyms */}
              <div>
                <p className="mb-1.5 text-[10px] font-medium tracking-widest text-foreground/35 uppercase">
                  Synonyms
                </p>
                {items.synonyms && (
                  <div className="flex flex-wrap gap-1.5">
                    {items.synonyms.map((synonym) => (
                      <Badge
                        key={synonym}
                        variant="outline"
                        className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                      >
                        {synonym}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Genres */}
              <div>
                <p className="mb-1.5 text-[10px] font-medium tracking-widest text-foreground/35 uppercase">
                  Genres
                </p>
                {items.genres && (
                  <div className="flex flex-wrap gap-1.5">
                    {items.genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="outline"
                        className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                        asChild
                      >
                        <Link href={`/browse?genres=${genre}`}>{genre}</Link>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* External site */}
              <div>
                <p className="mb-1.5 text-[10px] font-medium tracking-widest text-foreground/35 uppercase">
                  Track on
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    key="anilist"
                    variant="outline"
                    className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                    asChild
                  >
                    <Link
                      href={`https://anilist.co/anime/${items.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Anilist
                    </Link>
                  </Badge>
                  {items.externalLinks?.map((link) => (
                    <Badge
                      key={link.url}
                      variant="outline"
                      className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                      asChild
                    >
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.site}
                      </Link>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="mb-1.5 text-[10px] font-medium tracking-widest text-foreground/35 uppercase">
                  Tags
                </p>
                {items.tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {(tagExpanded ? items.tags : items.tags.slice(0, 10)).map(
                      (tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href={`/browse?tags=${tag}`}>{tag}</Link>
                        </Badge>
                      ),
                    )}
                  </div>
                )}
                {items.tags.length > 10 && (
                  <Button
                    variant="ghost"
                    onClick={() => setTagExpanded(!tagExpanded)}
                    className="mt-2 text-[10px] font-medium tracking-widest text-foreground/40 uppercase transition p-0 size-fit"
                  >
                    {tagExpanded
                      ? "Show less"
                      : `+${items.tags.length - 10} more`}
                  </Button>
                )}
              </div>
            </ItemContent>
          </Item>
        </Collapsible>
      </aside>
    </div>
  );
}

interface RelationsProps {
  items: {
    relationType: string | null;
    id: string;
    status: string | null;
    image: string | null;
    title: string;
    genres: string[] | [] | null;
    type: string | null;
    chapters: number | string | null;
    episodes: number | string | null;
    color: string | null;
    media: "ANIME" | "MANGA";
  }[];
}

/**
 * Render a filterable carousel of related media grouped by relation type.
 *
 * Renders a row of filter buttons derived from the provided items' `relationType`
 * (with an "All" option) and a draggable carousel of `AnimeCard` tiles for the
 * currently selected relation group.
 *
 * @param items - Array of relation entries to display. Each entry should include at least `id` and `relationType`; `media` is used to determine the card wrapper element.
 * @returns A React element containing relation-type filter controls and a carousel of related entries.
 */
function Relations({
  items,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"div">, "children"> & RelationsProps) {
  const relations = React.useMemo(() => {
    const uniqueRelations = Array.from(
      new Set(items.map((item) => item.relationType)),
    );
    return ["All", ...uniqueRelations];
  }, [items]);

  const [activeFilter, setActiveFilter] = React.useState("All");

  const filteredItems = React.useMemo(() => {
    if (activeFilter === "All") return items;
    return items.filter((item) => item.relationType === activeFilter);
  }, [items, activeFilter]);

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div className="flex flex-wrap gap-2 items-center">
        {relations.map((type) => (
          <Button
            key={type}
            variant={activeFilter === type ? "default" : "outline"}
            data-active={activeFilter === type}
            onClick={() => setActiveFilter(type!)}
            className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 data-[active=false]:bg-white/3 data-[active=false]:text-foreground/60 size-fit"
          >
            {type}
          </Button>
        ))}
      </div>
      <Carousel
        opts={{ align: "center", dragFree: true }}
        className="w-full mt-3"
      >
        <CarouselContent className="min-w-0">
          {filteredItems.map((item) => {
            const href = `/library/anime/${item.id}`;
            const anime = {
              ...item,
              relationType: mapType(item.relationType!),
              status: null,
            };

            return (
              <CarouselItem
                key={item.id}
                className="basis-1/3 md:basis-1/5 lg:basis-1/6 min-w-0 shrink-0 grow-0"
              >
                <AnimeCard
                  anime={anime}
                  href={href}
                  as={
                    item.media === "ANIME" &&
                    item.relationType?.toLowerCase() !== "music"
                      ? Link
                      : "div"
                  }
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}

const mapType = (type: string) => {
  switch (type.toLowerCase()) {
    case "alternative":
      return "ALT";
    default:
      return type;
  }
};

export interface ICharactersProps {
  items: {
    id: number | string;
    role: string;
    name: string;
    image: string;
  }[];
}

/**
 * Renders a horizontal carousel of character cards.
 *
 * Each character in `items` is converted into an `AnimeCard`-compatible shape (the character's `name` becomes the card title, `role` becomes the card status, and `id` is used as the card id) and displayed as a carousel cell.
 *
 * @param items - Array of character entries to render.
 * @param className - Optional additional CSS classes applied to the wrapper.
 * @returns A React element containing a carousel of character cards.
 */
export function Characters({
  items,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"div">, "children"> & ICharactersProps) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      <Carousel opts={{ align: "center", dragFree: true }} className="w-full">
        <CarouselContent className="min-w-0">
          {items.map((item) => {
            const anime = {
              ...item,
              status: item.role,
              title: item.name,
              id: item.id as string,
              genres: null,
              color: null,
              episodes: null,
              chapters: null,
              relationType: null,
              type: null,
            };

            return (
              <CarouselItem
                key={item.id}
                className="basis-1/3 md:basis-1/5 lg:basis-1/6 min-w-0 shrink-0 grow-0"
              >
                <AnimeCard anime={anime} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
