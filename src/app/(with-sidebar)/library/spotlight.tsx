import { cacheLife, cacheTag } from "next/cache";
import type { ISpotlight } from "@/types/library";

import SpotlightClient from "@/components/custom/spotlight.wrapper";
import { SpotlightEmpty } from "@/components/custom/spotlight";
import { SOURCE_API } from "@/constants/api";

/**
 * Cached function to fetch and format spotlight data from HiAnime.
 * Throws on error to prevent caching error states.
 */
async function getCachedSpotlight() {
  "use cache";
  cacheLife("days");
  cacheTag("hianime-spotlight");

  const raw = await fetch(SOURCE_API.HIANIME.SPOTLIGHT);
  if (!raw.ok) {
    throw new Error(`HiAnime API error: ${raw.status}`);
  }

  const { results } = await raw.json();

  const formatted = await Promise.all(
    results.map(async (item: ISpotlight) => {
      const { alID } = await getItem(item.id);
      return {
        ...item,
        id: `${item.id.split("-").slice(0, -1).join("-")}-${alID}`,
      };
    }),
  );

  return formatted;
}

/**
 * Fetches HiAnime spotlight entries, replaces each item's final ID segment with
 * the corresponding AniList ID, and renders the SpotlightClient with the updated items.
 * Error handling is done outside the cache to prevent caching error states.
 */
export async function SpotlightComponent() {
  try {
    const formatted = await getCachedSpotlight();
    return <SpotlightClient items={formatted} />;
  } catch (error) {
    console.error("[SpotlightFormatter] Error processing spotlight", error);
    return <SpotlightEmpty />;
  }
}

/**
 * Cached function to fetch canonical external IDs for a spotlight item.
 * Throws on error to prevent caching error states.
 */
async function getCachedItem(id: string) {
  "use cache";
  cacheLife("weeks");
  cacheTag(`hianime-info-${id}`);

  const req = await fetch(`${SOURCE_API.HIANIME.INFO}id=${id}`);
  if (!req.ok) {
    throw new Error(`HiAnime info API error: ${req.status}`);
  }

  const { malID, alID } = await req.json();
  return { malID, alID };
}

/**
 * Fetches canonical external IDs for a spotlight item from the HiAnime info endpoint.
 * Error handling propagates to parent for proper cache behavior.
 *
 * @param id - The spotlight item identifier used to query the HiAnime info API
 * @returns An object containing `malID` (MyAnimeList ID) and `alID` (AniList ID)
 */
async function getItem(id: string) {
  return getCachedItem(id);
}
