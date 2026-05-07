import { cacheLife, cacheTag } from "next/cache";
import { AnimeCardsEmpty } from "@/components/custom/anime-carousel";
import AnimeCardsClient from "@/components/custom/anime-carousel.wrapper";
import { anilistRequest } from "@/lib/anilist/client";
import { trending, seasonal, popular } from "@/constants/anilist/queries";
import { AnimeSeason } from "@/utils/current-season";
import { mapSimple } from "@/utils/mapper";
import SpotlightClient from "@/components/custom/spotlight.wrapper";
import { SpotlightEmpty } from "@/components/custom/spotlight";

interface IAnilistQuery {
  Page: {
    pageInfo: any;
    media: any[];
  };
}

// Cached data fetching functions - these throw on error to prevent caching error states

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
  cacheLife("hours");
  cacheTag("spotlight");

  const raw: IAnilistQuery = await anilistRequest(trending, {
    page: 1,
    perPage: 9,
  });
  return mapSimple(raw?.Page?.media);
}

// Component wrappers - handle errors outside of cache to prevent caching error states

/**
 * Render a carousel of the top trending anime.
 * Error handling is done outside the cache to prevent caching error states.
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
 */
export async function SeasonalComponent() {
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
 */
export async function UpcomingComponent() {
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
 */
export async function SpotlightComponent() {
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
    const status =
      anime.status === "RELEASING"
        ? "Airing"
        : anime.status === "FINISHED"
          ? "Completed"
          : anime.status === "NOT_YET_RELEASED"
            ? "Upcoming"
            : anime.status === "CANCELLED"
              ? "Cancelled"
              : anime.status === "HIATUS"
                ? "Hiatus"
                : "Unknown";
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
