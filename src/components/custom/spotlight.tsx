"use client";

import type { ISimpleAnimeData } from "@/utils/mapper";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardTitle,
  CardHeader,
  CardAction,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { InfoIcon, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getShimmerDataURL } from "@/utils/placeholder";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface SpotlightProps {
  items: ISimpleAnimeData[];
}

export function Spotlight({ items }: SpotlightProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        loop: true,
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="pb-4 md:pb-8 aspect-video"
    >
      <CarouselContent className="-ml-1 border-none">
        {items.map((item: ISimpleAnimeData) => (
          <CarouselItem
            key={item.id}
            className="rounded-none border-none pl-0 w-full max-w-full relative overflow-hidden"
          >
            <div className="w-full max-w-full">
              <Card className="rounded-none overflow-hidden p-0">
                <div className="relative aspect-video">
                  <Image
                    src={
                      item.banner ||
                      item.image ||
                      getShimmerDataURL(item.color || "#8bdfea")
                    }
                    alt={item.title || "No Title"}
                    placeholder="blur"
                    blurDataURL={getShimmerDataURL(item.color || "#8bdfea")}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background from-20% via-background/80 via-60% bg-transparent" />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50" />
                </div>
                <div className="absolute inset-0 flex flex-col gap-4 justify-end max-h-auto pb-4 md:pb-10">
                  <CardHeader
                    className="px-4 md:px-10"
                    // style={{
                    //   backgroundImage:
                    //     "url('https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx184322-rRkaMQ7J1zOI.jpg')",
                    // }}
                  >
                    <CardAction className="ml-4">
                      <Badge variant="secondary" className="invisible">
                        #{item.rank} Spotlight
                      </Badge>
                    </CardAction>
                    <Badge variant="ghost" className="bg-primary text-cyan-300">
                      #{item.rank} Spotlight
                    </Badge>
                    <CardTitle className="text-sm md:text-2xl font-semibold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="hidden md:line-clamp-3">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex gap-2 px-4 md:px-10">
                    <Button size="lg" asChild>
                      <Link href={`/library/watch/${item.id}/1`}>
                        Watch Now
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link
                        href={"/library/anime/" + item.id}
                        className="backdrop-blur-md"
                      >
                        <InfoIcon />
                        Details
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 flex gap-2">
        <CarouselPrevious
          size="icon"
          className="backdrop-blur-sm static translate-y-0 z-10"
        />
        <CarouselNext
          size="icon"
          className="backdrop-blur-sm static translate-y-0"
        />
      </div>
    </Carousel>
  );
}

export function SpotlightSkeleton() {
  return (
    <Carousel className="pb-4 md:pb-8">
      <CarouselContent className="-ml-1 border-none">
        <CarouselItem className="rounded-none border-none pl-0 w-full relative">
          <div className="w-full max-w-full">
            <Card className="rounded-none overflow-hidden p-0">
              <div className="relative w-full aspect-video" />
              <div className="absolute inset-0 flex flex-col gap-4 justify-end max-h-auto pb-4 md:pb-10">
                <CardHeader className="px-4 md:px-10">
                  <CardAction className="ml-4">
                    <Badge variant="secondary" className="invisible">
                      #1 Spotlight
                    </Badge>
                  </CardAction>
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="hidden md:block h-16" />
                </CardHeader>
                <CardFooter className="flex gap-2 px-4 md:px-10">
                  <Skeleton className="h-10 w-52" />
                </CardFooter>
              </div>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export function SpotlightEmpty() {
  return (
    <Carousel className="md:mt-15 pb-4 md:pb-8 px-1.5 md:px-6 lg:px-12 xl:px-14">
      <Item
        variant="outline"
        className="border-amber-500/90 bg-orange-500/10 px-3 py-1.5 text-sm text-foreground/80"
      >
        <ItemMedia variant="icon" className="text-amber-500/90">
          <ExclamationTriangleIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="font-medium text-foreground">
            Spotlight Unavailable
          </ItemTitle>
          <ItemDescription>
            Oops... looks like there won't be any spotlight in the meantime.
          </ItemDescription>
          {/*<span className="font-medium text-foreground">Episode</span>
          <span>airing</span>
          <span className="text-foreground/30">•</span>
          <span className="text-foreground/50"></span>*/}
        </ItemContent>
      </Item>
    </Carousel>
  );
}
