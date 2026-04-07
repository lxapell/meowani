"use client";

import * as React from "react";

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
  const filtered = segments.filter(
    (segment) => segment !== "anime" && segment !== "watch",
  );

  return (
    <Breadcrumb>
      <BreadcrumbList className="">
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {filtered.map((segment, index) => {
          const isLast = index === filtered.length - 1;
          let label = segment
            .split("-")
            .filter((w) => !w.includes("_"))
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
          if (label.length > 20) {
            label = label
              .split(" ")
              .map((w) => w[0])
              .join(" ");
          }
          let href = `/${filtered.slice(0, index + 1).join("/")}`;

          const watchIndex = segments.indexOf("watch");
          if (watchIndex !== -1 && segment === segments[watchIndex + 1]) {
            href = `/library/anime/${segment}`;
          }

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator className="hidden md:block" />
              {isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
