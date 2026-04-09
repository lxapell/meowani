"use client";

import type { ISpotlight } from "@/types/library";
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

import { InfoIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface SpotlightProps {
  items: ISpotlight[];
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
      className="pb-4 md:pb-8"
    >
      <CarouselContent className="-ml-1 border-none">
        {items.map((item: ISpotlight) => (
          <CarouselItem
            key={item.id}
            className="rounded-none border-none pl-0 w-full max-w-full relative overflow-hidden"
          >
            <div className="w-full max-w-full">
              <Card className="rounded-none overflow-hidden p-0">
                <div className="relative aspect-video">
                  <Image
                    src={item.banner}
                    alt="slide"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 bg-transparent" />
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
              <div className="relative w-full aspect-video" />{" "}
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
