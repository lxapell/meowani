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
  {
    ssr: false,
    loading: () => (
      <AnimeCardsSkeleton paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14" />
    ),
  },
);

/**
 * Client-side wrapper component that renders the anime carousel with the given props.
 *
 * @param props - Props matching `AnimeProps`: an `animes` array (each with `id`, `status`, `image`, `title`, `genres`, `type`, and `episodes`) and optional `label`, `href`, and `paddingX` strings.
 * @returns The rendered `AnimeCards` React element populated with the provided props.
 */
export default function AnimeCardsClient({ ...props }: AnimeProps) {
  return <AnimeCards {...props} />;
}
