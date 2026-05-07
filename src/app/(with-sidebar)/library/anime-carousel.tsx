import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";

import { AnimeCardsEmpty } from "@/components/custom/anime-carousel";
import AnimeCardsClient from "@/components/custom/anime-carousel.wrapper";
import { anilistRequest } from "@/lib/anilist/client";
import { trending, seasonal, popular } from "@/constants/anilist/queries";
import { AnimeSeason } from "@/utils/current-season";
import { mapSimple, mapStatus } from "@/utils/mapper";
import SpotlightClient from "@/components/custom/spotlight.wrapper";
import { SpotlightEmpty } from "@/components/custom/spotlight";

interface IAnilistQuery {
  Page: {
    pageInfo: any;
    media: any[];
  };
}

async function getCachedTrending() {
  "use cache";

  cacheLife("hours");
  cacheTag("trending");

  const raw: IAnilistQuery = await anilistRequest(trending, {
    page: 1,
    perPage: 10,
  });
  return map(raw?.Page?.media);
}

async function getCachedSeasonal(season: string, year: number) {
  "use cache";

  cacheLife("hours");
  cacheTag("seasonal", `seasonal-${season}-${year}`);

  const raw: IAnilistQuery = await anilistRequest(seasonal, {
    page: 1,
    perPage: 10,
    season,
    seasonYear: year,
  });
  return map(raw.Page.media);
}

async function getCachedPopular() {
  "use cache";

  cacheLife("hours");
  cacheTag("popular");

  const raw: IAnilistQuery = await anilistRequest(popular, {
    page: 1,
    perPage: 10,
  });
  return map(raw.Page.media);
}

async function getCachedUpcoming(season: string, year: number) {
  "use cache";

  cacheLife("days");
  cacheTag("upcoming", `upcoming-${season}-${year}`);

  const raw: IAnilistQuery = await anilistRequest(seasonal, {
    page: 1,
    perPage: 10,
    season,
    seasonYear: year,
  });
  return map(raw.Page.media);
}

async function getCachedSpotlight() {
  "use cache";

  cacheLife("days");
  cacheTag("spotlight");

  const raw: IAnilistQuery = await anilistRequest(trending, {
    page: 1,
    perPage: 9,
  });
  return mapSimple(raw?.Page?.media);
}

/**
 * Render a carousel of the top trending anime.
 * Error handling is done outside the cache to prevent caching error states.
 *
 * Fetches the top 10 trending titles from AniList, maps them into card data, and renders an `AnimeCardsClient` carousel. If fetching or mapping fails, logs the error and renders an `AnimeCardsEmpty` fallback with the same horizontal padding.
 *
 * @returns A JSX element containing the trending anime cards or an empty fallback component on error.
 */
export async function TrendingComponent() {
  try {
    const mapped = await getCachedTrending();
    return (
      <AnimeCardsClient
        paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14"
        animes={mapped}
        href="/browse?sort=TRENDING_DESC"
      />
    );
  } catch (error) {
    console.error("[TrendingFetch] Error fetching trending:", error);
    return <AnimeCardsEmpty paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14" />;
  }
}

/**
 * Render a carousel of popular anime for the current season.
 * Error handling is done outside the cache to prevent caching error states.
 *
 * Fetches seasonal anime for the current season and year, maps results into
 * card data, and renders an AnimeCardsClient configured with a season-specific
 * browse link. If fetching or mapping fails, renders an AnimeCardsEmpty fallback.
 *
 * @returns A JSX element displaying seasonal anime cards or an empty fallback component on error.
 */
export async function SeasonalComponent() {
  await connection(); // Opt into dynamic rendering before accessing current time;
  const label = "Popular This Season";
  const { season, year } = AnimeSeason.now();
  try {
    const mapped = await getCachedSeasonal(season, year);
    return (
      <AnimeCardsClient
        animes={mapped}
        label={label}
        paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14"
        href={`/browse?season=${season}&year=${year}`}
      />
    );
  } catch (error) {
    console.error("[SeasonalFetch] Error fetching seasonal:", error);
    return (
      <AnimeCardsEmpty
        paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14"
        label={label}
      />
    );
  }
}

/**
 * Render a carousel of all-time popular anime.
 * Error handling is done outside the cache to prevent caching error states.
 *
 * Attempts to fetch the all-time popular anime list from AniList and render an anime cards client; if fetching or mapping fails, renders an empty fallback with the "All Time Popular" label.
 *
 * @returns A JSX element containing the populated anime cards client for all-time popular titles, or an empty fallback component when an error occurs.
 */
export async function PopularComponent() {
  const label = "All Time Popular";
  try {
    const mapped = await getCachedPopular();
    return (
      <AnimeCardsClient
        animes={mapped}
        paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14"
        label={label}
        href="/browse?sort=POPULARITY_DESC"
      />
    );
  } catch (error) {
    console.error("[PopularFetch] Error fetching popular:", error);
    return (
      <AnimeCardsEmpty
        paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14"
        label={label}
      />
    );
  }
}

/**
 * Renders an anime cards carousel for the upcoming season.
 * Error handling is done outside the cache to prevent caching error states.
 *
 * @returns A JSX element containing the carousel populated with upcoming-season anime; returns an empty fallback component if fetching or mapping fails.
 */
export async function UpcomingComponent() {
  await connection(); // Opt into dynamic rendering before accessing current time;
  const label = "Upcoming Anime";
  const { season, year } = AnimeSeason.now().next();
  try {
    const mapped = await getCachedUpcoming(season, year);
    return (
      <AnimeCardsClient
        animes={mapped}
        label={label}
        paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14"
        href={`/browse?season=${season}&year=${year}`}
      />
    );
  } catch (error) {
    console.error("[UpcomingFetch] Error fetching upcoming:", error);
    return (
      <AnimeCardsEmpty
        paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14"
        label={label}
      />
    );
  }
}

/**
 * Render a spotlight carousel populated with trending anime for the UI.
 * Error handling is done outside the cache to prevent caching error states.
 *
 * @returns A JSX element rendering a spotlight carousel of mapped trending anime items, or a `SpotlightEmpty` fallback if fetching or mapping fails.
 */
export async function SpotlightComponent() {
  "use cache";

  try {
    const mapped = await getCachedSpotlight();
    return <SpotlightClient items={mapped} />;
  } catch (error) {
    console.error("[SpotlightFormatter] Error processing spotlight", error);
    return <SpotlightEmpty />;
  }
}

const map = (data: any[]) =>
  data.map((anime) => {
    const id = anime.title.english
      ? `${anime.title.english
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}-${anime.id}`
      : `${anime.title.romaji
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}-${anime.id}`;
    const status = mapStatus(anime.status);
    return {
      id,
      title: (anime.title.english || anime.title.romaji) as string,
      image: anime.coverImage.large as string,
      type: anime.format as string,
      status: (status[0].toUpperCase() +
        status.slice(1).toLowerCase()) as string,
      genres: anime.genres as string[],
      episodes: anime.episodes as number,
      color: anime.coverImage.color as string,
    };
  });
