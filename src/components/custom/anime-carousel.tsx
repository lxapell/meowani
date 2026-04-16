"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { PlayIcon, TvIcon } from "lucide-react";

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
  label?: string;
}

export function AnimeCards({ animes, label = "Trending Now" }: AnimeProps) {
  return (
    <section className="w-full min-w-0 py-4 md:py-8 pt-0 md:pt-0">
      <Label className="flex items-center gap-3 px-6 lg:px-12 mb-4">
        <div className="h-6 w-0.75 rounded-full bg-foreground shadow-[0_0_12px_rgba(255,255,255,0.6)] md:h-8 md:w-1" />
        <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl transition-colors">
          {label}
        </h2>
      </Label>
      <Carousel opts={{ align: "center", dragFree: true }} className="w-full">
        <CarouselContent className="min-w-0 -ml-4 px-6 lg:px-12">
          {animes.map((anime) => {
            const href = `/library/anime/${anime.id}`;

            return (
              <CarouselItem
                key={anime.id}
                className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-4 min-w-0 shrink-0 grow-0"
              >
                <Link href={href} className="group relative block w-full">
                  <Card className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-foreground/5 ring-1 ring-foreground/6 transition-all duration-300 group-hover:ring-foreground/20 group-hover:shadow-xl group-hover:shadow-black/30">
                    <Image
                      src={anime.image}
                      alt={anime.title}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />

                    {/*Play Button*/}
                    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg backdrop-blur-sm transition-transform duration-300 scale-75 group-hover:scale-100">
                        <PlayIcon fill="currentColor" />
                      </div>
                    </div>

                    {/* Hover Info */}
                    <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-linear-to-t from black/90 via-black/60 to-transparent p-3 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="line-clamp-2 text-xs leading-snug text-white/90">
                        {anime.title}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {anime.genre.map((genre) => (
                          <Badge key={genre} className="">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Info Below */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <TvIcon className="size-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">
                          {anime.type}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-primary text-primary-foreground text-[8px] h-4 px-1.5"
                      >
                        {anime.status}
                      </Badge>
                    </div>
                    <h3 className="line-clamp-2 text-xs font-semibold text-foreground/90 group-hover:text-foreground">
                      {anime.title}
                    </h3>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex justify-end gap-2 px-6 lg:px-12 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}

interface SkeletonProps {
  label?: string;
  count?: number;
}

export function AnimeCardsSkeleton({
  label = "Trending Now",
  count = 10,
}: SkeletonProps) {
  return (
    <section className="w-full min-w-0 py-4 md:py-8 pt-0 md:pt-0">
      <Label className="flex items-center gap-3 px-6 lg:px-12 mb-4">
        <div className="h-6 w-0.75 rounded-full bg-foreground shadow-[0_0_12px_rgba(255,255,255,0.6)] md:h-8 md:w-1" />
        <Skeleton className="h-6 w-32 md:h-8 md:w-40" />
      </Label>
      <div className="w-full">
        <div className="min-w-0 -ml-4 px-6 lg:px-12 flex gap-0">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-4 min-w-0 shrink-0 grow-0"
            >
              <div className="relative w-full">
                <Skeleton className="aspect-[2/3] w-full rounded-xl" />

                {/* Info Below */}
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-10" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface EmptyProps {
  label?: string;
  message?: string;
}

export function AnimeCardsEmpty({
  label = "Trending Now",
  message = "No Anime Found",
}: EmptyProps) {
  return (
    <section className="w-full min-w-0 py-4 md:py-8 pt-0 md:pt-0">
      <Label className="flex items-center gap-3 px-6 lg:px-12 mb-4">
        <div className="h-6 w-0.75 rounded-full bg-foreground shadow-[0_0_12px_rgba(255,255,255,0.6)] md:h-8 md:w-1" />
        <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl transition-colors">
          {label}
        </h2>
      </Label>
      <div className="px-6 lg:px-12">
        <div className="flex items-center justify-center min-h-[200px] md:min-h-[280px] rounded-xl bg-muted/20 border border-dashed border-muted-foreground/25">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
