"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "@/hooks/shadcn/use-mobile";

export default function LibraryPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );
  const isMobile = useIsMobile();

  return (
    <div className="min-w-0 flex flex-1 flex-col pt-0 overflow-x-hidden">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className=""
      >
        <CarouselContent className="-ml-1 border-none">
          {Array.from({ length: 9 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="rounded-none border-none pl-0 w-full relative"
            >
              <div className="w-full max-w-full">
                <Card className="rounded-none overflow-hidden p-0">
                  <div className="relative aspect-video">
                    <Image
                      src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx184322-rRkaMQ7J1zOI.jpg"
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
                          #{index + 1} Spotlight
                        </Badge>
                      </CardAction>
                      <Badge
                        variant="ghost"
                        className="bg-primary text-cyan-300"
                      >
                        #{index + 1} Spotlight
                      </Badge>
                      <CardTitle className="text-sm md:text-2xl font-semibold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                        My Gift Lvl 9999 Unlimited Gacha: Backstabbed in a
                        Backwater Dungeon, I'm out for Revenge!
                      </CardTitle>
                      <CardDescription className="hidden md:block">
                        When Light is kicked out of the Concord of the Tribes,
                        his former comrades instantly turn on him. Light escapes
                        this diabolical act of betrayal by the skin of his
                        teeth...Only to find himself in the deepest part of the
                        Abyss, the most dangerous dungeon in the rea...
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex gap-2 px-4 md:px-10">
                      <Button size="lg" asChild>
                        <Link href="/library/watch/123/episode-1">
                          Watch Now
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link href="/library/anime/123">
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

      {/*<ScrollBar />*/}
    </div>
  );
}
