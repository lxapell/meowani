"use client";

import * as React from "react";

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

const test = [
  {
    relationType: "PREQUEL",
    id: "146066",
    title: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season",
    type: "TV",
    image:
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx146066-zzKl6P6OeEjy.jpg",
    color: "#bbd6f1",
    episodes: 13,
    chapters: undefined,
    status: "FINISHED",
    genres: [],
  },
  {
    relationType: "SOURCE",
    id: "115166",
    title: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e: 2-nensei-hen",
    type: "NOVEL",
    image:
      "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx115166-eBK5EqkUTplf.jpg",
    color: "#50bbe4",
    episodes: undefined,
    chapters: 130,
    status: "FINISHED",
    genres: [],
  },
  {
    relationType: "ALTERNATIVE",
    id: "141044",
    title: "Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e: 2-nensei-hen",
    type: "MANGA",
    image:
      "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/bx141044-bBPhRIc0J88X.jpg",
    color: "#781a50",
    episodes: undefined,
    chapters: 27,
    status: "FINISHED",
    genres: [],
  },
];

export function AnimeInfoBanner({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("w-full", className)} {...props}>
      <div className="relative min-h-[240px] md:min-h-[300px] lg:min-h-[360px] flex items-end">
        <Image
          src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/184951-Rx1mZZfKa9IU.jpg"
          alt="hEAD"
          fill
          className="object-cover w-full aspect-video absolute inset-0 z-10"
        />
        <div className="absolute inset-0 z-11 bg-linear-to-t from-background from-20% via-background/80 via-60% to-transparent" />
        <div className="relative pointer-events-auto flex w-full flex-col items-center justify-center gap-6 px-4 pt-16 md:pt-24 md:px-10 xl:px-14 max-w-[1600px] z-20">
          <div className="flex w-full flex-col md:flex-row items-center gap-3 pt-4 md:pt-8 md:gap-5">
            <Button
              className="group no-scale pt-0 relative h-[175px] w-[125px] shrink-0 overflow-hidden rounded-xl md:h-[256px] md:w-[180px]"
              aria-label="View full size image"
            >
              <Image
                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx184322-rRkaMQ7J1zOI.jpg"
                alt="hEAD"
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                className="h-full w-full object-cover"
              />
            </Button>

            {/* Anime Info */}
            <div className="flex w-full flex-col items-start justify-end gap-2 md:gap-4">
              <div className="flex w-full flex-col gap-1 text-start md:gap-1.5 items-center md:items-start">
                {/* Stats */}
                <div className="hidden md:flex w-full flex-wrap gap-1.5 pt-0.5 md:gap-3 md:pt-1">
                  {/* Episode */}
                  <Badge className="h-5 font-bold md:h-6 md:px-3.5 md:text-base">
                    24 EPS
                  </Badge>

                  {/* Type */}
                  <Badge
                    className="h-5 font-bold md:h-6 md:px-3.5 md:text-base"
                    asChild
                  >
                    <Link href="/browse?format=TV">TV</Link>
                  </Badge>

                  {/* Status */}
                  <Badge
                    className="h-5 font-bold md:h-6 md:px-3.5 md:text-base"
                    asChild
                  >
                    <Link href="/browse?status=RELEASING">RELEASING</Link>
                  </Badge>

                  {/* Season */}
                  <Badge
                    className="hidden h-5 font-bold md:h-6 md:px-3.5 md:text-base lg:inline-flex capitalize"
                    asChild
                  >
                    <Link href="/browse?season=WINTER%26year=2026">WINTER</Link>
                  </Badge>

                  {/* Score */}
                  <Badge
                    className="hidden font-bold h-5 md:h-6 md:px-3.5 md:text-base lg:inline-flex"
                    asChild
                  >
                    <Link href="/browse?sort=SCORE_DESC">61%</Link>
                  </Badge>
                </div>

                <h2 className="line-clamp-1 hidden text-base font-light text-muted-foreground select-text md:block md:text-lg">
                  Yuusha no Kuzu
                </h2>
                <h1 className="line-clamp-2 text-xl font-black select-text md:text-4xl">
                  Scum of the Brave
                </h1>

                {/* Genres */}
                <div className="flex flex-wrap items-center gap-2 md:justify-start md:self-start">
                  <Badge
                    variant="secondary"
                    className="hidden h-7 text-nowrap md:inline-flex"
                    asChild
                  >
                    <Link href="/browse?genre=Action">Action</Link>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="hidden h-7 text-nowrap md:inline-flex"
                    asChild
                  >
                    <Link href="/browse?genre=Comedy">Comedy</Link>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="hidden h-7 text-nowrap md:inline-flex"
                    asChild
                  >
                    <Link href="/browse?genre=Drama">Drama</Link>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="hidden h-7 text-nowrap md:inline-flex"
                    asChild
                  >
                    <Link href="/browse?genre=Fantasy">Fantasy</Link>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="hidden h-7 text-nowrap md:inline-flex"
                    asChild
                  >
                    <Link href="/browse?genre=Sci-Fi">Sci-Fi</Link>
                  </Badge>
                </div>

                <div className="flex md:hidden flex-wrap items-center justify-center gap-2">
                  <Badge
                    variant="outline"
                    className="h-7 border-cyan-500/20 bg-cyan-500/10 text-cyan-500"
                  >
                    <StarIcon fill="currentColor" />
                    7.9
                  </Badge>
                  <Badge variant="secondary" className="h-7">
                    ONGOING
                  </Badge>
                  <Badge variant="ghost" className="text-muted-foreground">
                    24 Episodes
                  </Badge>
                </div>

                <div className="md:justify-start gap-2 flex w-fit md:w-full items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2">
                  <ButtonGroup className="inline-flex items-center overflow-hidden">
                    <Button className="md:h-10 md:px-3" asChild>
                      <Link href="/library/watch/124/1">
                        <PlayIcon fill="currentColor" />
                        Watch Now
                      </Link>
                    </Button>
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

                {/* Description */}
                <div className="md:text-md hidden overflow-hidden line-clamp-3 pt-1 text-start text-xs text-muted-foreground md:pt-3 md:text-sm">
                  {
                    "The third season of <i>Jujutsu Kaisen</i>.<br><br>\nAfter the Shibuya Incident, a deadly jujutsu battle known as the Culling Game orchestrated by Noritoshi Kamo erupts across ten colonies in Japan.<br><br>\nHaunted by guilt over the mass killings in Shibuya and wary of Sukuna’s interest in Fushiguro, Itadori chooses not to return to Jujutsu High. Instead, he teams up with Choso to exorcise the countless cursed spirits unleashed by Noritoshi Kamo.\nAmid this chaos, the Jujutsu Headquarters revokes Yuji Itadori’s suspended death sentence and appoints special-grade sorcerer Yuta Okkotsu as his executioner. <br><br>\nNewly awakened modern sorcerers and resurrected ancient ones,  now fighting as players in the Culling Game, collide with conflicting motives, driving the world once more toward an age ruled by jujutsu.<br><br>\n(Source: TOHO Animation)"
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AnimeInfoTabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <Tabs
      className={cn("px-4 md:px-10 xl:px-14 gap-4 sm:gap-6", className)}
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
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-stretch lg:gap-6">
            <ItemGroup className="flex h-full flex-col space-y-3 rounded-md text-foreground/90 lg:col-span-8 gap-0">
              <Item
                variant="outline"
                className="border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-foreground/80"
              >
                <ItemContent className="flex-row gap-2">
                  <span className="font-medium text-foreground">Episode 7</span>
                  <span>airing in 5 days</span>
                  <span className="text-foreground/30">•</span>
                  <span className="text-foreground/50">Apr 22, 2026</span>
                </ItemContent>
              </Item>
              <Item
                variant="outline"
                className="items-center bg-white/3 text-foreground/80 px-3 py-2 sm:gap-3 lg:px-4"
              >
                <ItemContent className="flex-row gap-2 flex-none">
                  <div className="rounded-md border focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 border-border px-3 py-1.5 text-xs font-medium text-foreground/80">
                    TV
                  </div>
                  <div className="rounded-md border focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 border-border px-3 py-1.5 text-xs font-medium text-foreground/70">
                    Aired Apr 2026 - Jun 2026
                  </div>
                </ItemContent>
                <ItemActions className="ml-auto">
                  <Button
                    variant="outline"
                    className="flex items-center h-fit gap-2 rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-foreground/90 transition-all duration-200"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-background">
                      <PlayIcon fill="currentColor" />
                    </span>
                    Trailer
                  </Button>
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
                    <span className="group-data-[state=open]/synopsis:hidden lg:hidden">
                      {"The third season of "}
                      <i>Jujutsu Kaisen</i>
                      {"."}
                      <br />
                      <br />
                      {
                        "\nAfter the Shibuya Incident, a deadly jujutsu battle known as the Culling Game orchestrated by..."
                      }
                    </span>
                    <span className="hidden group-data-[state=open]/synopsis:block lg:block">
                      {"The third season of "}
                      <i>Jujutsu Kaisen</i>
                      {"."}
                      <br />
                      <br />
                      {
                        "\nAfter the Shibuya Incident, a deadly jujutsu battle known as the Culling Game orchestrated by Noritoshi Kamo erupts across ten colonies in Japan."
                      }
                      <br />
                      <br />
                      {
                        "\nHaunted by guilt over the mass killings in Shibuya and wary of Sukuna’s interest in Fushiguro, Itadori chooses not to return to Jujutsu High. Instead, he teams up with Choso to exorcise the countless cursed spirits unleashed by Noritoshi Kamo.\nAmid this chaos, the Jujutsu Headquarters revokes Yuji Itadori’s suspended death sentence and appoints special-grade sorcerer Yuta Okkotsu as his executioner."
                      }
                      <br />
                      <br />
                      {
                        "\nNewly awakened modern sorcerers and resurrected ancient ones,  now fighting as players in the Culling Game, collide with conflicting motives, driving the world once more toward an age ruled by jujutsu."
                      }
                      <br />
                      <br />
                      {"\n(Source: TOHO Animation)"}
                    </span>
                  </ItemContent>
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
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                        >
                          Lerche
                        </Badge>
                      </div>
                    </div>

                    {/* Synonyms */}
                    <div>
                      <p className="mb-1.5 text-[10px] font-medium tracking-widest text-foreground/35 uppercase">
                        Synonyms
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                        >
                          Lerche
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                        >
                          Lerche
                        </Badge>
                      </div>
                    </div>

                    {/* Genres */}
                    <div>
                      <p className="mb-1.5 text-[10px] font-medium tracking-widest text-foreground/35 uppercase">
                        Genres
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>
                      </div>
                    </div>

                    {/* External site */}
                    <div>
                      <p className="mb-1.5 text-[10px] font-medium tracking-widest text-foreground/35 uppercase">
                        Track on
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="https://anilist.co/anime/180745">
                            Anilist
                          </Link>
                        </Badge>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <p className="mb-1.5 text-[10px] font-medium tracking-widest text-foreground/35 uppercase">
                        Tags
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>{" "}
                        <Badge
                          variant="outline"
                          className="bg-white/5 px-2.5 py-0 text-[11px] text-foreground/65 transition font-normal"
                          asChild
                        >
                          <Link href="/browse?genres=Drama">Drama</Link>
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        className="mt-2 text-[10px] font-medium tracking-widest text-foreground/40 uppercase transition p-0 size-fit"
                      >
                        +8 more
                      </Button>
                    </div>
                  </ItemContent>
                </Item>
              </Collapsible>
            </aside>
          </div>
        </TabsContent>
        <TabsContent value="relations">
          <Relations items={mapSimple(test)} />
        </TabsContent>
        <TabsContent value="characters">
          <Characters items={mapChar(testChar)} />
        </TabsContent>
      </div>
    </Tabs>
  );
}

interface RelationsProps {
  items: {
    relationType?: string;
    id: string;
    status?: string;
    image?: string;
    title: string;
    genres?: string[];
    type?: string;
    chapters?: number | string;
    episodes?: number | string;
    color?: string;
  }[];
}

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
              status: undefined,
            };

            return (
              <CarouselItem
                key={item.id}
                className="basis-1/3 md:basis-1/5 lg:basis-1/6 min-w-0 shrink-0 grow-0"
              >
                <AnimeCard anime={anime} href={href} as={Link} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex justify-end gap-2 px-6 lg:px-12 mt-4">
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
    voiceActor: {
      id: number | string;
      name: string;
      image: string;
    };
  }[];
}

export function Characters({
  items,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"div">, "children"> & ICharactersProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <Carousel opts={{ align: "center", dragFree: true }} className="w-full">
        <CarouselContent className="min-w-0">
          {items.map((item) => {
            const anime = {
              ...item,
              status: item.role,
              title: item.name,
              id: item.id as string,
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
        <div className="flex justify-end gap-2 px-6 lg:px-12 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}

const mapChar = (chars: any[]) => {
  return chars.map((char) => {
    return {
      id: char.id,
      role: char.role,
      name: char.node?.name?.full,
      image: char.node?.image?.large,
    };
  });
};

const testChar = [
  {
    id: 570003,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Rokusuke",
        last: "Kouenji",
        full: "Rokusuke Kouenji",
        native: "\u9ad8\u5186\u5bfa\u516d\u52a9",
        userPreferred: "Rokusuke Kouenji",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b158988-P28e8SU3WpGK.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 116425,
          name: {
            first: "Toshiki",
            middle: null,
            last: "Iwasawa",
            full: "Toshiki Iwasawa",
            native: "\u5ca9\u6fa4\u4fca\u6a39",
            userPreferred: "Toshiki Iwasawa",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n116425-PAq9OC2StE1n.png",
          },
        },
      },
      {
        voiceActor: {
          id: 117629,
          name: {
            first: "Christopher",
            middle: null,
            last: "Wehkamp",
            full: "Christopher Wehkamp",
            native: null,
            userPreferred: "Christopher Wehkamp",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n117629-w22t54KeomD3.jpg",
          },
        },
      },
    ],
  },
  {
    id: 501617,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Kazuomi",
        last: "Housen",
        full: "Kazuomi Housen",
        native: "\u5b9d\u6cc9\u548c\u81e3",
        userPreferred: "Kazuomi Housen",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b159626-KQ7EjBs0Rq3c.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 191128,
          name: {
            first: "Hiroya",
            middle: null,
            last: "Egashira",
            full: "Hiroya Egashira",
            native: "\u6c5f\u982d\u5b8f\u54c9",
            userPreferred: "Hiroya Egashira",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n191128-QvdPhpQFWULM.png",
          },
        },
      },
      {
        voiceActor: {
          id: 275354,
          name: {
            first: "Bradley",
            middle: null,
            last: "Gareth",
            full: "Bradley Gareth",
            native: null,
            userPreferred: "Bradley Gareth",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n275354-5fOOWqkqsBqD.jpg",
          },
        },
      },
    ],
  },
  {
    id: 548468,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Kakeru",
        last: "Ryuuen",
        full: "Kakeru Ryuuen",
        native: "\u9f8d\u5712\u7fd4",
        userPreferred: "Kakeru Ryuuen",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b159627-kWwSUA1XR1Kx.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 126794,
          name: {
            first: "Masaaki",
            middle: null,
            last: "Mizunaka",
            full: "Masaaki Mizunaka",
            native: "\u6c34\u4e2d\u96c5\u7ae0",
            userPreferred: "Masaaki Mizunaka",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n126794-tZzYeLEQbsrj.png",
          },
        },
      },
      {
        voiceActor: {
          id: 95312,
          name: {
            first: "Eric",
            middle: null,
            last: "Vale",
            full: "Eric Vale",
            native: null,
            userPreferred: "Eric Vale",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n95312-lixmVhwE8AXE.png",
          },
        },
      },
    ],
  },
  {
    id: 501613,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Takuya",
        last: "Yagami",
        full: "Takuya Yagami",
        native: "\u516b\u795e\u62d3\u4e5f",
        userPreferred: "Takuya Yagami",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b159628-1TgwXeP2VrXp.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 138019,
          name: {
            first: "Shinnosuke",
            middle: null,
            last: "Tokudome",
            full: "Shinnosuke Tokudome",
            native: "\u5fb3\u7559\u614e\u4e43\u4f51",
            userPreferred: "Shinnosuke Tokudome",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n138019-ThPPMU8dqpnH.png",
          },
        },
      },
      {
        voiceActor: {
          id: 360824,
          name: {
            first: "Jack",
            middle: null,
            last: "Broadbent",
            full: "Jack Broadbent",
            native: null,
            userPreferred: "Jack Broadbent",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n360824-SxojaaLe9G6J.png",
          },
        },
      },
    ],
  },
  {
    id: 501616,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Ichika",
        last: "Amasawa",
        full: "Ichika Amasawa",
        native: "\u5929\u6ca2\u4e00\u590f",
        userPreferred: "Ichika Amasawa",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b159629-yQnBvQZUPY3o.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 298582,
          name: {
            first: "Momoko",
            middle: null,
            last: "Seto",
            full: "Momoko Seto",
            native: "\u702c\u6238\u6843\u5b50",
            userPreferred: "Momoko Seto",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n298582-wQG1c3x4Mej8.jpg",
          },
        },
      },
      {
        voiceActor: {
          id: 104526,
          name: {
            first: "Tia",
            middle: null,
            last: "Ballard",
            full: "Tia Ballard",
            native: null,
            userPreferred: "Tia Ballard",
          },
          image: {
            large: "https://s4.anilist.co/file/anilistcdn/staff/large/9526.jpg",
          },
        },
      },
    ],
  },
  {
    id: 565891,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Haruka",
        last: "Hasebe",
        full: "Haruka Hasebe",
        native: "\u9577\u8c37\u90e8\u6ce2\u7460\u52a0",
        userPreferred: "Haruka Hasebe",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b163517-pBRJeR0pkw0Z.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 101997,
          name: {
            first: "Yuiko",
            middle: null,
            last: "Tatsumi",
            full: "Yuiko Tatsumi",
            native: "\u5dfd\u60a0\u8863\u5b50",
            userPreferred: "Yuiko Tatsumi",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n101997-AUljb27RuBmm.png",
          },
        },
      },
      {
        voiceActor: {
          id: 119696,
          name: {
            first: "Alex",
            middle: null,
            last: "Moore",
            full: "Alex Moore",
            native: null,
            userPreferred: "Alex Moore",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/24696-mYojLQWADaE6.jpg",
          },
        },
      },
    ],
  },
  {
    id: 565881,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Hiyori",
        last: "Shiina",
        full: "Hiyori Shiina",
        native: "\u690e\u540d\u3072\u3088\u308a",
        userPreferred: "Hiyori Shiina",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b163518-xnSqZflOp9Wm.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 119331,
          name: {
            first: "Rie",
            middle: null,
            last: "Takahashi",
            full: "Rie Takahashi",
            native: "\u9ad8\u6a4b\u674e\u4f9d",
            userPreferred: "Rie Takahashi",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n119331-5dPuMCxu4RWf.jpg",
          },
        },
      },
      {
        voiceActor: {
          id: 276413,
          name: {
            first: "Veronica",
            middle: null,
            last: "Laux",
            full: "Veronica Laux",
            native: null,
            userPreferred: "Veronica Laux",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n276413-0oKjjPM5Gcrb.jpg",
          },
        },
      },
    ],
  },
  {
    id: 565889,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Maya",
        last: "Satou",
        full: "Maya Satou",
        native: "\u4f50\u85e4\u9ebb\u8036",
        userPreferred: "Maya Satou",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b163519-as1ccGaDehxI.jpg",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 118806,
          name: {
            first: "Lynn",
            middle: null,
            last: "",
            full: "Lynn",
            native: "Lynn",
            userPreferred: "Lynn",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n118806-AlHvdje5aHje.png",
          },
        },
      },
      {
        voiceActor: {
          id: 120245,
          name: {
            first: "Michelle",
            middle: null,
            last: "Rojas",
            full: "Michelle Rojas",
            native: null,
            userPreferred: "Michelle Rojas",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n120245-caA11LwLmwZR.jpg",
          },
        },
      },
    ],
  },
  {
    id: 501614,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Riku",
        last: "Utomiya",
        full: "Riku Utomiya",
        native: "\u5b87\u90fd\u5bae\u9678",
        userPreferred: "Riku Utomiya",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b171746-sMFYmfcMBvN7.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 158510,
          name: {
            first: "Shougo",
            middle: null,
            last: "Sakata",
            full: "Shougo Sakata",
            native: "\u5742\u7530\u5c06\u543e",
            userPreferred: "Shougo Sakata",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n158510-QDmd7dD9Rg89.jpg",
          },
        },
      },
      {
        voiceActor: {
          id: 319546,
          name: {
            first: "Ryan",
            middle: null,
            last: "Negr\u00f3n",
            full: "Ryan Negr\u00f3n",
            native: null,
            userPreferred: "Ryan Negr\u00f3n",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n319546-ln1FV5Q6rMum.png",
          },
        },
      },
    ],
  },
  {
    id: 501615,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Sakurako",
        last: "Tsubaki",
        full: "Sakurako Tsubaki",
        native: "\u693f\u685c\u5b50",
        userPreferred: "Sakurako Tsubaki",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b171747-4d7ct8VhjXyr.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 139844,
          name: {
            first: "Iori",
            middle: null,
            last: "Saeki",
            full: "Iori Saeki",
            native: "\u4f50\u4f2f\u4f0a\u7e54",
            userPreferred: "Iori Saeki",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n139844-zjqS38xT2FK4.png",
          },
        },
      },
      {
        voiceActor: {
          id: 113057,
          name: {
            first: "Morgan",
            middle: null,
            last: "Laur\u00e9",
            full: "Morgan Laur\u00e9",
            native: null,
            userPreferred: "Morgan Laur\u00e9",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/18057.jpg",
          },
        },
      },
    ],
  },
  {
    id: 501612,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Tsubasa",
        last: "Nanase",
        full: "Tsubasa Nanase",
        native: "\u4e03\u702c\u7ffc",
        userPreferred: "Tsubasa Nanase",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b171748-gAlTRa7d78vP.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 153559,
          name: {
            first: "Minako",
            middle: null,
            last: "Satou",
            full: "Minako Satou",
            native: "\u4f50\u85e4\u672a\u5948\u5b50",
            userPreferred: "Minako Satou",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n153559-38enHG3BWVgX.png",
          },
        },
      },
      {
        voiceActor: {
          id: 317523,
          name: {
            first: "Reshel",
            middle: null,
            last: "Mae",
            full: "Reshel Mae",
            native: null,
            userPreferred: "Reshel Mae",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n317523-p34y2aLop1m4.png",
          },
        },
      },
    ],
  },
  {
    id: 565883,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Teruhiko",
        last: "Yukimura",
        full: "Teruhiko Yukimura",
        native: "\u5e78\u6751\u8f1d\u5f66",
        userPreferred: "Teruhiko Yukimura",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b173450-3W4X5drCuO21.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 249687,
          name: {
            first: "Tsubasa",
            middle: null,
            last: "Gouden",
            full: "Tsubasa Gouden",
            native: "\u90f7\u7530\u7ffc",
            userPreferred: "Tsubasa Gouden",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n249687-D3BgeAM71rfJ.png",
          },
        },
      },
      {
        voiceActor: {
          id: 96047,
          name: {
            first: "Jessie James",
            middle: null,
            last: "Grelle",
            full: "Jessie James Grelle",
            native: null,
            userPreferred: "Jessie James Grelle",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n96047-E9nBWn3YL0Tn.jpg",
          },
        },
      },
    ],
  },
  {
    id: 569583,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Mio",
        last: "Ibuki",
        full: "Mio Ibuki",
        native: "\u4f0a\u5439\u6faa",
        userPreferred: "Mio Ibuki",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b174781-jzyPHUz3JBwi.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 105071,
          name: {
            first: "Mikako",
            middle: null,
            last: "Komatsu",
            full: "Mikako Komatsu",
            native: "\u5c0f\u677e\u672a\u53ef\u5b50",
            userPreferred: "Mikako Komatsu",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n105071-Hcj0X2gcliPq.png",
          },
        },
      },
      {
        voiceActor: {
          id: 95891,
          name: {
            first: "Jamie",
            middle: null,
            last: "Marchi",
            full: "Jamie Marchi",
            native: null,
            userPreferred: "Jamie Marchi",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n95891-QG8dyefPjUIz.jpg",
          },
        },
      },
    ],
  },
  {
    id: 569587,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Nazuna",
        last: "Asahina",
        full: "Nazuna Asahina",
        native: "\u671d\u6bd4\u5948\u306a\u305a\u306a",
        userPreferred: "Nazuna Asahina",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b189728-hkfJGlmYbBmx.png",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 116517,
          name: {
            first: "Sora",
            middle: null,
            last: "Amamiya",
            full: "Sora Amamiya",
            native: "\u96e8\u5bae\u5929",
            userPreferred: "Sora Amamiya",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/n116517-NQh6ewlCwzBN.jpg",
          },
        },
      },
    ],
  },
  {
    id: 565887,
    role: "SUPPORTING",
    node: {
      name: {
        first: "Chiaki",
        last: "Matsushita",
        full: "Chiaki Matsushita",
        native: "\u677e\u4e0b\u5343\u79cb",
        userPreferred: "Chiaki Matsushita",
      },
      image: {
        large:
          "https://s4.anilist.co/file/anilistcdn/character/large/b191401-QIpXOM9iZoG2.jpg",
      },
    },
    voiceActorRoles: [
      {
        voiceActor: {
          id: 118922,
          name: {
            first: "Masumi",
            middle: null,
            last: "Tazawa",
            full: "Masumi Tazawa",
            native: "\u7530\u6fa4\u8309\u7d14",
            userPreferred: "Masumi Tazawa",
          },
          image: {
            large:
              "https://s4.anilist.co/file/anilistcdn/staff/large/23922-Slv15f8EbFOz.png",
          },
        },
      },
    ],
  },
];
