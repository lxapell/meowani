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
                    className="h-7 bg-secondary text-secondary-foreground"
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
      className={cn("px-4 md:px-10 xl:px-14", className)}
      defaultValue="overview"
      orientation="horizontal"
      {...props}
    >
      <TabsList className="group-data-horizontal/tabs:h-10 h-10 bg-white/3 border ring-ring">
        <TabsTrigger
          value="overview"
          className="text-primary-foreground/60 hover:text-primary-foreground dark:hover:text-primary-foreground data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground data-active:border-transparent dark:data-active:border-transparent"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="relations"
          className="text-primary-foreground/60 hover:text-primary-foreground dark:hover:text-primary-foreground data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground data-active:border-transparent dark:data-active:border-transparent"
        >
          Relations
        </TabsTrigger>
        <TabsTrigger
          value="characters"
          className="text-primary-foreground/60 hover:text-primary-foreground dark:hover:text-primary-foreground data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground data-active:border-transparent dark:data-active:border-transparent"
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
        <TabsContent value="relations">CHeese</TabsContent>
        <TabsContent value="characters">Grape</TabsContent>
      </div>
    </Tabs>
  );
}
