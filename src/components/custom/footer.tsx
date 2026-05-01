"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AnimeSeason } from "@/utils/current-season";
import { cn } from "@/lib/shadcn/utils";

const text =
  '<div className="min-w-0 flex flex-1 flex-col bg-background overflow-x-hidden gap-5 overflow-y-scroll max-h-dvh"';

export function Footer({ className }: React.ComponentPropsWithoutRef<"div">) {
  const season = AnimeSeason.now();
  return (
    <div className={cn("mt-auto", className)}>
      <footer className="mt-auto w-full text-xs px-1.5 md:px-6 lg:px-12 xl:px-14 pt-6 pb-3 font-light text-muted-foreground border-t border-border bg-secondary/30">
        <div className="mx-auto grid w-full max-w-[1920px] grid-cols-12 gap-4 px-4 sm:px-8 lg:px-16">
          <div className="col-span-12 mb-2 md:col-span-6 md:text-left">
            <span className="truncate leading-tight text-xl font-extrabold font-stretch-100% text-foreground">
              MeowAni
            </span>
            <p className="mt-1 text-xs text-muted-foreground lg:w-[480px]">
              {
                "MeowAni acts solely as an index and display platform for content made available by third-party providers. We do not host, store, or control any files on our servers. Accordingly, all legal matters—including copyright or other infringement claims—must be directed to the originating third-party provider, not to MeowAni."
              }
            </p>
          </div>
          <div className="col-span-6 flex sm:col-span-4 md:col-span-3 md:justify-end">
            <div className="flex flex-col gap-1">
              <div className="mb-1 font-semibold text-foreground">Browse</div>
              <Path
                href={`/browse?season=${season.season}&year=${season.year}`}
              >
                This Season
              </Path>
              <Path
                href={`/browse?season=${season.next().season}&year=${season.next().year}`}
              >
                Upcoming
              </Path>
              <Path href="/browse?formats=MOVIE">Movies</Path>
              <Path href="/browse?formats=TV">TV Shows</Path>
            </div>
          </div>
          <div className="col-span-6 flex sm:col-span-4 md:col-span-3 md:justify-end">
            <div className="flex flex-col gap-1">
              <div className="mb-1 font-semibold text-foreground">
                Resources
              </div>
            </div>
          </div>
        </div>
        <Separator className="shrink-0 my-4" />
        <div className="mx-auto h-7.5 flex w-full items-center pb-2 text-[0.7rem] text-muted-foreground lg:text-[0.8rem] justify-center">
          <span className="items-center justify-center">
            {"© 2026 "}
            <Path href="/" className="font-medium">
              MeowAni
            </Path>
          </span>
        </div>
      </footer>
    </div>
  );
}

function Path({
  href,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
