"use client";

import * as React from "react";

import { NavFilters } from "@/components/navigation/default/nav-filters";
import { NavUser } from "@/components/navigation/default/nav-user";
import { NavHeader } from "@/components/navigation/default/nav-header";
import { NavMain } from "@/components/navigation/default/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { genreEnums } from "@/constants/anilist/enums";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  ClapperboardIcon,
  TagsIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

const genres = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Dementia",
  "Demons",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Game",
  "Harem",
  "Historical",
  "Horror",
  "Isekai",
  "Josei",
  "Kids",
  "Magic",
  "Martial Arts",
  "Mecha",
  "Military",
  "Music",
  "Mystery",
  "Parody",
  "Police",
  "Psychological",
  "Romance",
  "Samurai",
  "School",
  "Sci-Fi",
  "Seinen",
  "Shoujo",
  "Shoujo Ai",
  "Shounen",
  "Shounen Ai",
  "Slice of Life",
  "Space",
  "Sports",
  "Super Power",
  "Supernatural",
  "Thriller",
  "Vampire",
];

const data = {
  user: {
    name: "Yohan",
    email: "meowhandev@gmail.com",
    avatar: "/assets/logo/apple-touch-icon.png",
    isAuth: true,
  },
  app: {
    name: "MeowAni",
    logo: "/assets/logo/logo-1.svg",
    plan: "Free",
  },
  navFilters: [
    {
      title: "Type",
      url: "#",
      icon: <ClapperboardIcon />,
      isActive: true,
      items: [
        {
          title: "Movies",
          url: "/type/movie",
        },
        {
          title: "TV series",
          url: "/type/tv",
        },
        {
          title: "OVAs",
          url: "/type/ova",
        },
        {
          title: "ONAs",
          url: "/type/ona",
        },
        {
          title: "Specials",
          url: "/type/special",
        },
      ],
    },
    {
      title: "Genre",
      url: "#",
      icon: <TagsIcon />,
      items: genreEnums.map((name) => {
        const params = new URLSearchParams();
        params.set("genres", name);
        return {
          title: name,
          url: "/browse?" + params,
        };
      }),
    },
    {
      title: "Others",
      url: "#",
      icon: <SlidersHorizontalIcon />,
      items: [
        {
          title: "Subbed",
          url: "/subbed-anime",
        },
        {
          title: "Dubbed",
          url: "/dubbed-anime",
        },
        {
          title: "Most Popular",
          url: "/most-popular",
        },
        {
          title: "Events",
          url: "/events",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="select-none">
        <NavHeader app={data.app} />
      </SidebarHeader>
      <SidebarContent className="select-none">
        <NavMain />
        <SidebarSeparator className="data-horizontal:w-auto" />
        <NavFilters items={data.navFilters} />
      </SidebarContent>
      <SidebarFooter className="select-none">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
