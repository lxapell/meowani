"use client";

import * as React from "react";
import { TitleSlug } from "@/utils/formatter";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  let filtered = segments.filter(
    (segment) => segment !== "anime" && segment !== "watch",
  );

  return (
    <Breadcrumb>
      <BreadcrumbList className="">
        {/*<BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>*/}
        {filtered.map((segment, index) => {
          const isLast = index === filtered.length - 1;
          const animeIndex = segments.indexOf("anime");
          let label = segment
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
          if (animeIndex !== -1 && segment === segments[animeIndex + 1]) {
            try {
              const slug = new TitleSlug(segment);
              const { title } = slug.toTitle();
              label = title;
            } catch (err) {}
          }

          let href = `/${filtered.slice(0, index + 1).join("/")}`;

          const watchIndex = segments.indexOf("watch");
          if (watchIndex !== -1 && segment === segments[watchIndex + 1]) {
            href = `/library/anime/${segment}`;
            try {
              const slug = new TitleSlug(segment);
              const { title } = slug.toTitle();
              label = title;
            } catch (err) {}
          }

          return (
            <React.Fragment key={href}>
              {isLast ? (
                <BreadcrumbItem className="max-w-[20ch]">
                  <BreadcrumbPage className="truncate">{label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem className="hidden md:block max-w-[20ch]">
                    <BreadcrumbLink
                      className="max-w-[20ch] overflow-hidden"
                      asChild
                    >
                      <Link className="line-clamp-1 text-wrap" href={href}>
                        {label}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
