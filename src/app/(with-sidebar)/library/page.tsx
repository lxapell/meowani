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

export default function LibraryPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );
  return (
    <div className="min-w-0 flex flex-col pt-0 overflow-x-hidden">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className=""
      >
        <CarouselContent className="-ml-1">
          {Array.from({ length: 9 }).map((_, index) => (
            <CarouselItem key={index} className="rounded-none pl-1 w-full">
              <div className="p-1 min-w-full">
                <Card className="rounded-none h-full">
                  <CardContent className="flex aspect-[1/0.7] md:aspect-video h-full items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
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
