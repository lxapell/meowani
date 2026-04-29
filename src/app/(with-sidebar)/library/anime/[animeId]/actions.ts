"use server";

import { unstable_cache, revalidateTag } from "next/cache";
import { anilistRequest } from "@/lib/anilist/client";
import { animeInfo } from "@/constants/anilist/queries";

/**
 * Fetches anime details from AniList for the given anime ID.
 *
 * @param animeId - The AniList media ID (as a string) identifying the anime
 * @returns The AniList response object containing a `Media` property with the anime's data
 */
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

/**
 * Force revalidation of cached anime data associated with the given anime ID.
 *
 * @param animeId - The anime identifier used to form the cache tag (`anime-{animeId}`)
 */
export async function revalidateAnime(animeId: string) {
  revalidateTag(`anime-${animeId}`, "max");
}
