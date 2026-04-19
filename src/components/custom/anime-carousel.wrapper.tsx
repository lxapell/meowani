"use client";

import dynamic from "next/dynamic";

import { AnimeCardsSkeleton } from "@/components/custom/anime-carousel";

interface AnimeProps {
  animes: {
    id: string;
    status: string;
    image: string;
    title: string;
    genres: string[];
    type: string;
    episodes: number;
  }[];
  label?: string;
  href?: string;
  paddingX?: string;
}

const AnimeCards = dynamic(
  () =>
    import("@/components/custom/anime-carousel").then((mod) => mod.AnimeCards),
  { ssr: false, loading: () => <AnimeCardsSkeleton /> },
);

export default function AnimeCardsClient({ ...props }: AnimeProps) {
  return <AnimeCards {...props} />;
}
