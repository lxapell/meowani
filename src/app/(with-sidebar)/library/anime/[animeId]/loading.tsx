import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton for the anime detail page.
 * Matches the structure of AnimeInfoBanner and AnimeInfoTabs.
 */
export default function AnimePageLoading() {
  return (
    <div className="min-w-0 max-h-dvh overflow-x-hidden overflow-y-scroll flex flex-1 flex-col pt-0 gap-5 overflow-auto">
      {/* Banner Skeleton */}
      <section className="w-full">
        <div className="relative min-h-[240px] md:min-h-[300px] lg:min-h-[360px] flex items-end">
          {/* Banner background */}
          <Skeleton className="absolute inset-0 z-10" />
          <div className="absolute inset-0 z-11 bg-linear-to-t from-background from-20% via-background/80 via-60% to-transparent" />

          <div className="relative pointer-events-auto flex w-full flex-col items-center justify-center gap-6 px-4 pt-16 md:pt-24 md:px-10 xl:px-14 max-w-[1600px] z-20">
            <div className="flex w-full flex-col md:flex-row items-center gap-3 pt-4 md:pt-8 md:gap-5">
              {/* Cover Image */}
              <Skeleton className="h-[175px] w-[125px] shrink-0 rounded-xl md:h-[256px] md:w-[180px]" />

              {/* Info Section */}
              <div className="flex w-full flex-col items-start justify-end gap-2 md:gap-4">
                <div className="flex w-full flex-col gap-1 text-start md:gap-1.5 items-center md:items-start">
                  {/* Stats badges (desktop) */}
                  <div className="hidden md:flex w-full flex-wrap gap-1.5 pt-0.5 md:gap-3 md:pt-1">
                    <Skeleton className="h-5 w-16 rounded-full md:h-6" />
                    <Skeleton className="h-5 w-12 rounded-full md:h-6" />
                    <Skeleton className="h-5 w-20 rounded-full md:h-6" />
                    <Skeleton className="hidden lg:block h-5 w-16 rounded-full md:h-6" />
                  </div>

                  {/* Romaji title */}
                  <Skeleton className="hidden md:block h-5 w-48 md:w-64" />

                  {/* Main title */}
                  <Skeleton className="h-7 w-64 md:h-10 md:w-96" />

                  {/* Genres (desktop) */}
                  <div className="hidden md:flex flex-wrap items-center gap-2">
                    <Skeleton className="h-7 w-16 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-14 rounded-full" />
                    <Skeleton className="h-7 w-18 rounded-full" />
                  </div>

                  {/* Mobile badges */}
                  <div className="flex md:hidden flex-wrap items-center justify-center gap-2">
                    <Skeleton className="h-7 w-14 rounded-full" />
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-7 w-24 rounded-full" />
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 w-fit md:w-full items-stretch">
                    <Skeleton className="h-9 w-32 rounded-md md:h-10" />
                    <Skeleton className="h-9 w-9 rounded-md md:h-10 md:w-10" />
                    <Skeleton className="h-9 w-9 rounded-md md:h-10 md:w-10" />
                    <Skeleton className="h-9 w-9 rounded-md md:h-10 md:w-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Skeleton */}
      <div className="px-1.5 md:px-6 lg:px-12 xl:px-14 flex flex-col gap-4 sm:gap-6">
        {/* Tab triggers */}
        <div className="flex gap-0.5 p-1 sm:p-1.5 bg-white/3 border rounded-lg w-fit">
          <Skeleton className="h-8 w-20 rounded-md sm:w-24" />
          <Skeleton className="h-8 w-20 rounded-md sm:w-24" />
          <Skeleton className="h-8 w-24 rounded-md sm:w-28" />
        </div>

        {/* Tab content - Overview skeleton */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:items-stretch lg:gap-6">
          {/* Main content area */}
          <div className="flex flex-col space-y-3 lg:col-span-8 gap-0">
            {/* Next episode info */}
            <Skeleton className="h-10 w-full rounded-lg" />

            {/* Type and date row */}
            <div className="flex items-center gap-2 sm:gap-3 p-3 lg:p-4 rounded-lg border bg-white/3">
              <Skeleton className="h-7 w-12 rounded-md" />
              <Skeleton className="h-7 w-32 rounded-md" />
              <Skeleton className="ml-auto h-9 w-24 rounded-full" />
            </div>

            {/* Synopsis */}
            <div className="p-3 lg:p-4 rounded-lg border bg-white/3 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col space-y-3 lg:col-span-4">
            {/* Studios */}
            <div className="p-3 lg:p-4 rounded-lg border bg-white/3 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded" />
                <Skeleton className="h-3 w-14" />
              </div>
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Genres */}
            <div className="p-3 lg:p-4 rounded-lg border bg-white/3 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded" />
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>

            {/* Tags */}
            <div className="p-3 lg:p-4 rounded-lg border bg-white/3 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded" />
                <Skeleton className="h-3 w-8" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-18 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Skeleton */}
      <div className="px-1.5 md:px-6 lg:px-12 xl:px-14 space-y-3">
        <Skeleton className="h-6 w-40" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shrink-0 w-[120px] md:w-[150px]">
              <Skeleton className="aspect-[2/3] w-full rounded-xl" />
              <div className="mt-2 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
