"use server";

import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { anilistRequest } from "@/lib/anilist/client";
import { animeInfo } from "@/constants/anilist/queries";
import { AnimeInfoQuery } from "@/types/anilist-types";
import { ClientError } from "graphql-request";

/**
 * Cached function to fetch anime info from AniList.
 * Throws on error to prevent caching error states.
 */
async function getCachedAnimeInfo(animeId: number): Promise<AnimeInfoQuery> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`anime-${animeId}`);

  const data = await anilistRequest<AnimeInfoQuery>(animeInfo, { id: animeId });
  return data;
}

/**
 * Fetches AniList anime details for the specified anime ID.
 * Error handling is done outside the cache to prevent caching error states.
 *
 * @param animeId - The AniList media ID identifying the anime
 * @returns An `AnimeInfoQuery` result containing a `Media` property with the anime data;
 *          if the AniList API returns 404, returns `{ Media: null }`;
 *          other `ClientError` responses are rethrown
 */
export async function getAnimeInfo(animeId: number): Promise<AnimeInfoQuery> {
  try {
    return await getCachedAnimeInfo(animeId);
  } catch (err) {
    if (err instanceof ClientError && err.response.status === 404) {
      return { Media: null };
    }
    throw err;
  }
}

/**
 * Force revalidation of cached anime data associated with the given anime ID.
 *
 * @param animeId - The anime identifier used to form the cache tag (`anime-{animeId}`)
 */
export async function revalidateAnime(animeId: string) {
  revalidateTag(`anime-${animeId}`, "max");
}
