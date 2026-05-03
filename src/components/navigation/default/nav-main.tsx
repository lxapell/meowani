"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getRandomAnime } from "@/app/(with-sidebar)/actions";

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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

/**
 * Render the main sidebar navigation group labeled "Menu".
 *
 * @returns The sidebar group JSX element containing menu items for Library, Browse, and Random.
 */
export function NavMain() {
  const router = useRouter();
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const randomLoading = loadingRandom || isPending;

  const handleRandom = async () => {
    setLoadingRandom(true);
    setError(null);
    const id = await getRandomAnime();
    if (!id) {
      setLoadingRandom(false);
      setError("No anime found");
      return;
    }

    startTransition(() => {
      router.push(`/library/anime/${id}`);
    });

    setLoadingRandom(false);
  };

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
          <SidebarMenuButton
            tooltip="Random"
            onClick={handleRandom}
            disabled={randomLoading}
          >
            {randomLoading ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <ShuffleIcon />
            )}
            {error ? error : "Random"}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
