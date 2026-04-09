import * as React from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayIcon, TvIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AnimeProps {
  animes: {
    id: string;
    status: string;
    image: string;
    title: string;
    genre: string[];
    type: string;
    episodes: number;
  }[];
}

export function AnimeCards({ animes }: AnimeProps) {
  return (
    <Carousel
      opts={{ align: "start", dragFree: true }}
      className="group/row w-full relative flex flex-col gap-4 py-4 md:py-8 transition-opacity duration-500"
    >
      <Label className="flex items-center gap-3 px-6 lg:px-12 mb-2">
        <div className="h-6 w-0.75 rounded-full bg-foreground shadow-[0_0_12px_rgba(255,255,255,0.6)] md:h-8 md:w-1" />
        <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl transition-colors">
          Trending Now
        </h2>
      </Label>
      <div className="overflow-hidden w-full">
        <CarouselContent className="min-w-0 -ml-4 px-6 lg:px-12">
          {animes.map((anime) => {
            const href = `/library/anime/${anime.id}`;

            return (
              <CarouselItem
                key={anime.id}
                className="basis-1/3 sm:basis-1/4 md:basis-1/5 pl-4"
              >
                <div className="perspective-distant transform-3d">
                  <Link
                    href={href}
                    className="group relative block min-w-0 transform-all duration-300 ease-out w-[140px] sm:w-[160px] md:w-[180px]"
                  >
                    <Card className="relative aspect-2/3 w-full overflow-hidden max-w-45 rounded-xl bg-foreground/5 ring-1 ring-foreground/6 transition-all duration-300 group-hover:ring-foreground/20 group-hover:shadow-xl group-hover:shadow-black/30">
                      <Image
                        src={anime.image}
                        alt="slide"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
                      <div className="absolute inset-0 z-10 flex flex-col items-end justify-start p-2 gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="inline-block transform-none">
                          <div className="flex size-2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg backdrop-blur-sm transition-transform duration-300 scale-75 group-hover:scale-100">
                            <PlayIcon />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/60 to-transparent p-3 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="line-clamp-3 text-[10px] leading-snug text-foreground/90">
                          {anime.title}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          <Badge>Adventure</Badge>
                          <Badge>Drama</Badge>
                        </div>
                      </div>
                    </Card>
                    <div className="mt-2.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <TvIcon className="size-3 text-muted-foreground" />
                          <span className="text-[11px] font-medium text-muted-foreground">
                            {anime.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>{anime.status}</Badge>
                        </div>
                      </div>
                      <h3 className="line-clamp-2 text-[13px] font-semibold leading-tight text-foreground/90 transition-colors duration-200 group-hover:text-foreground">
                        {anime.title}
                      </h3>
                    </div>
                    {/* <AspectRatio className="rounded-lg bg-muted">bds</AspectRatio> */}
                  </Link>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </div>
      <CarouselPrevious className="static" />
      <CarouselNext className="static" />
    </Carousel>
  );
}
