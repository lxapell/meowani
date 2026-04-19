"use server";

import { unstable_cache, revalidateTag } from "next/cache";
import { anilistRequest } from "@/lib/anilist/client";
import { animeInfo } from "@/constants/anilist/queries";

export async function getAnimeInfo(animeId: string): Promise<{ Media: any }> {
  const cachedAnime = unstable_cache(
    async (id: string) => {
      const data = await anilistRequest<{ Media: any }>(animeInfo, { id });
      console.log("[TestFetch] anime info:", data);
      return data;
    },
    [`anime-${animeId}`],
    {
      revalidate: 60 * 5,
      tags: [`anime-${animeId}`],
    },
  );

  return cachedAnime(animeId);
}

export async function revalidateAnime(animeId: string) {
  revalidateTag(`anime-${animeId}`, "max");
}
