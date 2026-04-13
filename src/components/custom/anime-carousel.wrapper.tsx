"use client";

import dynamic from "next/dynamic";

import { AnimeCardsSkeleton } from "@/components/custom/anime-carousel";

interface AnimeProps {
  animes: {
    id: string;
    status: string;
    image: string;
    title: string;
    genre: string[];
    type: string;
    episodes: number;
  }[];
  label?: string;
}

const AnimeCards = dynamic(
  () =>
    import("@/components/custom/anime-carousel").then((mod) => mod.AnimeCards),
  { ssr: false, loading: () => <AnimeCardsSkeleton /> },
);

export default function AnimeCardsClient({
  animes,
  label = "Trending Now",
}: AnimeProps) {
  return <AnimeCards animes={animes} label={label} />;
}
