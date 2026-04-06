"use client";

import * as React from "react";

import { AppSidebar } from "@/components/navigation/default";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useIsMobile } from "@/hooks/shadcn/use-mobile";

export default function NavWithBreadcrumb({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="md:bg-background/95 md:backdrop-blur-md md:border-b">
        {/*<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">*/}
        <header className="md:absolute md:top-0 md:left-0 md:right-0 md:z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4 justify-between">
          <div className="flex items-center gap-2 md:px-2.5 md:h-9 md:bg-background/50 md:backdrop-blur-sm md:rounded-md md:border-border dark:border-input md:shadow-xs">
            <SidebarTrigger className="-ms-1" />
            <Separator
              orientation="vertical"
              className="me-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {segments.map((segment, index) => {
                  const href = `/${segments.slice(0, index + 1).join("/")}`;
                  const isLast = index === segments.length - 1;
                  const label = segment
                    .replace(/-/g, " ")
                    .replace(/^\w/, (c) => c.toUpperCase());

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
          </div>
          <div>
            <Button
              variant={isMobile ? "ghost" : "outline"}
              size="icon"
              className="md:rounded-full md:bg-background/50 md:backdrop-blur-md"
            >
              <SearchIcon />
            </Button>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
