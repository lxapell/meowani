import * as React from "react";

import { SpotlightComponent } from "./spotlight";
import { SpotlightSkeleton } from "@/components/custom/spotlight";
import {
  AnimeCardsSkeleton,
  AnimeCardsEmpty,
} from "@/components/custom/anime-card.wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TrendingComponent,
  SeasonalComponent,
  PopularComponent,
  UpcomingComponent,
} from "./anime-card";
import { anilistRequest } from "@/lib/anilist/client";

const test = [
  {
    id: "sjd",
  },
  {
    id: "@34",
  },
];

export default function LibraryPage() {
  return (
    <div className="min-w-0 flex flex-1 shrink flex-col overflow-x-hidden gap-5">
      <React.Suspense fallback={<SpotlightSkeleton />}>
        <SpotlightComponent />
      </React.Suspense>
      {/*<ScrollBar />*/}
      <React.Suspense fallback={<AnimeCardsSkeleton />}>
        <TrendingComponent />
      </React.Suspense>

      <React.Suspense
        fallback={<AnimeCardsSkeleton label="Popular This Season" />}
      >
        <SeasonalComponent />
      </React.Suspense>

      <React.Suspense
        fallback={<AnimeCardsSkeleton label="All Time Popular" />}
      >
        <PopularComponent />
      </React.Suspense>

      <React.Suspense fallback={<AnimeCardsSkeleton label="Upcoming Anime" />}>
        <UpcomingComponent />
      </React.Suspense>

      {/*<AnimeCardsEmpty label="TEST" />*/}
    </div>
  );
}
