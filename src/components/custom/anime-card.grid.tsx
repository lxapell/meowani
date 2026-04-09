"use client";

import * as React from "react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  PlayIcon,
  TvIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/shadcn/utils";

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
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, SetCanScrollLeft] = React.useState(false);
  const [canScrollRight, SetCanScrollRight] = React.useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      SetCanScrollLeft(scrollLeft > 0);
      SetCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const element = scrollRef.current;
    if (element) {
      element.addEventListener("scroll", checkScroll);
      return () => element.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full min-w-0 py-4 md:py-8">
      <div className="flex items-center justify-between px-6 lg:px-12 mb-4">
        <Label className="flex items-center gap-3 m-0">
          <div className="h-6 w-0.75 rounded-full bg-foreground shadow-[0_0_12px_rgba(255,255,255,0.6)] md:h-8 md:w-1" />
          <h2 className="text-xl font-bold tracking-tight text-foreground md:text-2xl transition-colors">
            {label}
          </h2>
        </Label>

        {/* Scroll Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
          >
            <ChevronLeftIcon className="rtl:rotate-180" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="rounded-full"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
          >
            <ChevronRightIcon className="rtl:rotate-180" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar px-6 lg:px-12 pb-4"
      >
        <div className="grid grid-flow-col auto-cols-[minmax(100px,140px)] sm:auto-cols-[minmax(120px,160px)] md:auto-cols-[minmax(140px,180px)] gap-3">
          {animes.map((anime) => {
            const href = `/library/anime/${anime.id}`;

            return (
              <React.Fragment key={anime.id}>
                <Link
                  href={href}
                  className="group relative block w-full min-w-0"
                >
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
                        <PlayIcon />
                      </div>
                    </div>

                    {/* Hover Info */}
                    <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-linear-to-t from black/90 via-black/60 to-transparent p-3 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="line-clamp-2 text-xs leading-snug text-white/90">
                        {anime.title}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {anime.genre.map((genre) => (
                          <Badge key={genre}>{genre}</Badge>
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
                        className="bg-primary text-primary-foreground hover:bg-primary/80 text-[8px] h-4"
                      >
                        {anime.status}
                      </Badge>
                    </div>
                    <h3 className="line-clamp-2 text-xs font-semibold text-foreground/90 group-hover:text-foreground">
                      {anime.title}
                    </h3>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
