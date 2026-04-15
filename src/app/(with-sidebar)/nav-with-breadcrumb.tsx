import * as React from "react";

import DynamicBreadcrumb from "@/components/navigation/dynamic-breadcrumb";
import { AppSidebar } from "@/components/navigation/default";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";

export default function NavWithBreadcrumb({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = false;
  return (
    <SidebarProvider className="" defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="md:bg-background/95 md:backdrop-blur-md md:border-b w-[calc(100%-var(--sidebar-width))] group-data-[collapsible=icon]:w-[calc(100%-var(--sidebar-width-icon))] min-w-0 flex-1 shrink overflow-x-hidden transition-[width] duration-200 ease-linear overflow-hidden max-h-dvh">
        {/*<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">*/}
        <header className="md:absolute md:top-0 md:left-0 md:right-0 md:z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4 justify-between">
          <div className="flex items-center gap-2 md:px-2.5 md:h-9 md:bg-background/50 md:backdrop-blur-sm md:rounded-md md:border-border dark:border-input md:shadow-xs">
            <SidebarTrigger className="-ms-1" />
            <Separator
              orientation="vertical"
              className="me-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <React.Suspense fallback={<></>}>
              <DynamicBreadcrumb />
            </React.Suspense>
          </div>
          <div className="hidden">
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
