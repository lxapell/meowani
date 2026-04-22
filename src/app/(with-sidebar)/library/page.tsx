import * as React from "react";

import { SpotlightSkeleton } from "@/components/custom/spotlight";
import { EndOfContent } from "@/components/custom/end-of-content";
import {
  AnimeCardsSkeleton,
  AnimeCardsEmpty,
} from "@/components/custom/anime-carousel";
import {
  TrendingComponent,
  SeasonalComponent,
  PopularComponent,
  UpcomingComponent,
  SpotlightComponent,
} from "./anime-carousel";

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
    <div className="min-w-0 flex flex-1 shrink flex-col bg-background overflow-x-hidden gap-5 overflow-y-scroll max-h-dvh">
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
      <EndOfContent className="my-8" />
      {/*<AnimeCardsEmpty label="TEST" />*/}
    </div>
  );
}
