"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  ChevronRightIcon,
  CompassIcon,
  HomeIcon,
  LibraryIcon,
  ShuffleIcon,
} from "lucide-react";
import Link from "next/link";

/**
 * Render the main sidebar navigation group labeled "Menu".
 *
 * @returns The sidebar group JSX element containing menu items for Library, Browse, and Random.
 */
export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {/*<SidebarMenuItem>
          <SidebarMenuButton tooltip="Home" asChild>
            <Link href="/">
              <HomeIcon />
              Home
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>*/}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Library" asChild>
            <Link href="/library">
              <LibraryIcon />
              Library
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Browse" asChild>
            <Link href="/browse">
              <CompassIcon />
              Browse
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Random" asChild>
            <Link href="#">
              <ShuffleIcon />
              Random
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
