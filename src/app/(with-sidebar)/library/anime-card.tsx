import { AnimeCardsEmpty } from "@/components/custom/anime-card";
import AnimeCardsClient from "@/components/custom/anime-card.wrapper";
import { anilistRequest } from "@/lib/anilist/client";
import { trending, seasonal, popular } from "@/constants/anilist/queries";
import { AnimeSeason } from "@/utils/current-season";

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
    const mapped = map(raw.Page.media);

    return <AnimeCardsClient animes={mapped} />;
  } catch (error) {
    console.error("[TrendingFetch] Error fetching trending:", error);
    return <AnimeCardsEmpty />;
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

    return <AnimeCardsClient animes={mapped} label={label} />;
  } catch (error) {
    console.error("[SeasonalFetch] Error fetching seasonal:", error);
    return <AnimeCardsEmpty label={label} />;
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

    return <AnimeCardsClient animes={mapped} label={label} />;
  } catch (error) {
    console.error("[PopularFetch] Error fetching popular:", error);
    return <AnimeCardsEmpty label={label} />;
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

    return <AnimeCardsClient animes={mapped} label={label} />;
  } catch (error) {
    console.error("[UpcomingFetch] Error fetching upcoming:", error);
    return <AnimeCardsEmpty label={label} />;
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
    return {
      id,
      title: (anime.title.english || anime.title.romaji) as string,
      image: anime.coverImage.large as string,
      type: anime.format as string,
      status: (anime.status[0].toUpperCase() +
        anime.status.slice(1).toLowerCase()) as string,
      genre: anime.genres as string[],
      episodes: anime.episodes as number,
    };
  });
