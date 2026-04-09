import * as React from "react";

import { SpotlightComponent } from "./spotlight";
import { SpotlightSkeleton } from "@/components/custom/spotlight";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimeCardsComponent } from "./anime-card";
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
    <div className="min-w-0 flex flex-1 shrink w-full flex-col pt-0 overflow-x-hidden gap-5">
      <React.Suspense fallback={<SpotlightSkeleton />}>
        <SpotlightComponent />
      </React.Suspense>
      {/*<ScrollBar />*/}
      <React.Suspense fallback={<>vav</>}>
        <AnimeCardsComponent />
      </React.Suspense>
    </div>
  );
}
