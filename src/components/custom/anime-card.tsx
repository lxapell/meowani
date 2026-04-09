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
    <Carousel opts={{ align: "start", dragFree: true }} className="">
      <CarouselContent>
        {animes.map((anime) => {
          const href = `/library/anime/${anime.id}`;

          return (
            <CarouselItem
              key={anime.id}
              className="basis-1/3 md:basis-1/5"
              asChild
            >
              <Link href={href} className="p-1 w-full max-w-full">
                <Card>
                  <Image
                    src={anime.image}
                    alt="slide"
                    fill
                    sizes="200"
                    className="hidden object-cover"
                  />
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">s</span>
                  </CardContent>
                </Card>
                {/* <AspectRatio className="rounded-lg bg-muted">bds</AspectRatio> */}
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="static" />
      <CarouselNext className="static" />
    </Carousel>
  );
}
