"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function LibraryPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );
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
                  <CardContent
                    className="absolute inset-0 flex items-center justify-center p-6"
                    // style={{
                    //   backgroundImage:
                    //     "url('https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx184322-rRkaMQ7J1zOI.jpg')",
                    // }}
                  >
                    <span className="text-4xl font-semibold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                      Text goes here yada yada {index + 1}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/*<ScrollBar />*/}
    </div>
  );
}
