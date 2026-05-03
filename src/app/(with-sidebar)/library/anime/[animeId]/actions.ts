"use server";

import { unstable_cache, revalidateTag } from "next/cache";
import { anilistRequest } from "@/lib/anilist/client";
import { animeInfo } from "@/constants/anilist/queries";
import { AnimeInfoQuery } from "@/types/anilist-types";
import { ClientError } from "graphql-request";

/**
 * Fetches AniList anime details for the specified anime ID.
 *
 * @param animeId - The AniList media ID identifying the anime
 * @returns An `AnimeInfoQuery` result containing a `Media` property with the anime data; if the AniList API returns 404, returns `{ Media: null }`; other `ClientError` responses are rethrown as `ClientError`
 */
export async function getAnimeInfo(
  animeId: string,
): Promise<AnimeInfoQuery | ClientError> {
  const cachedAnime = unstable_cache(
    async (id: string) => {
      const data = await anilistRequest<AnimeInfoQuery>(animeInfo, { id })
        .then((data) => {
          return data;
        })
        .catch((err: ClientError) => {
          console.log(err.response.status);
          if (err.response.status === 404) return { Media: null };
          throw err;
        });
      // console.log("[TestFetch] anime info:", data);
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
