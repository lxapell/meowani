import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/shadcn/utils";
import Link from "next/link";
import {
  PlayIcon,
  PencilIcon,
  BookmarkIcon,
  Share2Icon,
  ClapperboardIcon,
} from "lucide-react";

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
          <div className="flex w-full flex-row items-start gap-3 pt-4 md:pt-8 md:flex-row md:items-end md:gap-5">
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
              <div className="flex w-full flex-col gap-1 text-start md:gap-1.5">
                {/* Stats */}
                <div className="flex w-full flex-wrap gap-1.5 pt-0.5 md:gap-3 md:pt-1">
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

                {/* Description */}
                <div className="md:text-md overflow-hidden line-clamp-3 pt-1 text-start text-xs text-muted-foreground md:pt-3 md:text-sm">
                  {
                    "The third season of <i>Jujutsu Kaisen</i>.<br><br>\nAfter the Shibuya Incident, a deadly jujutsu battle known as the Culling Game orchestrated by Noritoshi Kamo erupts across ten colonies in Japan.<br><br>\nHaunted by guilt over the mass killings in Shibuya and wary of Sukuna’s interest in Fushiguro, Itadori chooses not to return to Jujutsu High. Instead, he teams up with Choso to exorcise the countless cursed spirits unleashed by Noritoshi Kamo.\nAmid this chaos, the Jujutsu Headquarters revokes Yuji Itadori’s suspended death sentence and appoints special-grade sorcerer Yuta Okkotsu as his executioner. <br><br>\nNewly awakened modern sorcerers and resurrected ancient ones,  now fighting as players in the Culling Game, collide with conflicting motives, driving the world once more toward an age ruled by jujutsu.<br><br>\n(Source: TOHO Animation)"
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="md:justify-start gap-2 flex w-full items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2">
            <ButtonGroup className="inline-flex items-center overflow-hidden">
              <Button className="md:h-10 md:px-3" asChild>
                <Link href="/library/watch/124/1">
                  <PlayIcon fill="currentColor" />
                  Watch Now
                </Link>
              </Button>
              <Button className="md:h-10 md:px-3">
                <PencilIcon />
              </Button>
            </ButtonGroup>
            <Button className="md:size-10">
              <BookmarkIcon />
            </Button>
            <Button className="md:size-10">
              <Share2Icon />
            </Button>
            <Button className="h-10 hidden lg:block">
              <ClapperboardIcon />
            </Button>
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
      <TabsContent value="overview">Banana</TabsContent>
      <TabsContent value="relations">CHeese</TabsContent>
      <TabsContent value="characters">Grape</TabsContent>
    </Tabs>
  );
}
