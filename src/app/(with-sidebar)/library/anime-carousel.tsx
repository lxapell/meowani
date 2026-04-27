import { AnimeCardsEmpty } from "@/components/custom/anime-carousel";
import AnimeCardsClient from "@/components/custom/anime-carousel.wrapper";
import { anilistRequest } from "@/lib/anilist/client";
import { trending, seasonal, popular } from "@/constants/anilist/queries";
import { AnimeSeason } from "@/utils/current-season";
import { mapSimple, mapStatus } from "@/utils/mapper";
import SpotlightClient from "@/components/custom/spotlight.wrapper";

interface IAnilistQuery {
  Page: {
    pageInfo: any;
    media: any[];
  };
}

export const revalidate = 86400;

export async function TrendingComponent() {
  "use cache";

  try {
    const raw: IAnilistQuery = await anilistRequest(trending, {
      page: 1,
      perPage: 10,
    });
    const mapped = map(raw?.Page?.media);

    return (
      <AnimeCardsClient
        paddingX="px-1.5"
        animes={mapped}
        href="/browse?sort=TRENDING_DESC"
      />
    );
  } catch (error) {
    console.error("[TrendingFetch] Error fetching trending:", error);
    return <AnimeCardsEmpty paddingX="px-1.5" />;
  }
}

export async function SeasonalComponent() {
  "use cache";

  const label = "Popular This Season";
  const { season, year } = AnimeSeason.now();
  try {
    const raw: IAnilistQuery = await anilistRequest(seasonal, {
      page: 1,
      perPage: 10,
      season,
      seasonYear: year,
    });
    const mapped = map(raw.Page.media);

    return (
      <AnimeCardsClient
        animes={mapped}
        label={label}
        paddingX="px-1.5"
        href={`/browse?season=${season}&year=${year}`}
      />
    );
  } catch (error) {
    console.error("[SeasonalFetch] Error fetching seasonal:", error);
    return <AnimeCardsEmpty paddingX="px-1.5" label={label} />;
  }
}

export async function PopularComponent() {
  "use cache";

  const label = "All Time Popular";
  try {
    const raw: IAnilistQuery = await anilistRequest(popular, {
      page: 1,
      perPage: 10,
    });
    const mapped = map(raw.Page.media);

    return (
      <AnimeCardsClient
        animes={mapped}
        paddingX="px-1.5"
        label={label}
        href="/browse?sort=POPULARITY_DESC"
      />
    );
  } catch (error) {
    console.error("[PopularFetch] Error fetching popular:", error);
    return <AnimeCardsEmpty paddingX="px-1.5" label={label} />;
  }
}

export async function UpcomingComponent() {
  "use cache";

  const label = "Upcoming Anime";
  const { season, year } = AnimeSeason.now().next();
  try {
    const raw: IAnilistQuery = await anilistRequest(seasonal, {
      page: 1,
      perPage: 10,
      season,
      seasonYear: year,
    });
    const mapped = map(raw.Page.media);

    return (
      <AnimeCardsClient
        animes={mapped}
        label={label}
        paddingX="px-1.5"
        href={`/browse?season=${season}&year=${year}`}
      />
    );
  } catch (error) {
    console.error("[UpcomingFetch] Error fetching upcoming:", error);
    return <AnimeCardsEmpty paddingX="px-1.5" label={label} />;
  }
}

export async function SpotlightComponent() {
  try {
    const raw: IAnilistQuery = await anilistRequest(trending, {
      page: 1,
      perPage: 9,
    });
    const mapped = mapSimple(raw?.Page?.media);

    return <SpotlightClient items={mapped} />;
  } catch (error) {
    console.error("[SpotlightFormatter] Error processing spotlight", error);
    return <>Banana</>;
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
