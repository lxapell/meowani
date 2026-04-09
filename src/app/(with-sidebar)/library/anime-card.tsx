import { AnimeCards } from "@/components/custom/anime-card.wrapper";
import { anilistRequest } from "@/lib/anilist/client";
import { trending, seasonal } from "@/constants/anilist/queries";
import { getCurrentAnimeSeason } from "@/utils/current-season";

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
    const mapped = raw.Page.media.map((anime) => {
      return {
        id: (anime.title.english
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") +
          "-" +
          anime.id) as string,
        title: anime.title.english as string,
        image: anime.coverImage.large as string,
        type: anime.format as string,
        status: (anime.status[0].toUpperCase() +
          anime.status.slice(1).toLowerCase()) as string,
        genre: anime.genres as string[],
        episodes: anime.episodes as number,
      };
    });

    return <AnimeCards animes={mapped} />;
  } catch (error) {
    console.error("[TrendingFetch] Error fetching trending:", error);
    return <>Banana</>;
  }
}

export async function SeasonalComponent() {
  "use cache";

  const { season, year } = getCurrentAnimeSeason();
  try {
    const raw: IAnilistQuery = await anilistRequest(seasonal, {
      page: 1,
      perPage: 10,
      season,
      seasonYear: year,
    });
    const mapped = raw.Page.media.map((anime) => {
      return {
        id: (anime.title.english
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") +
          "-" +
          anime.id) as string,
        title: anime.title.english as string,
        image: anime.coverImage.large as string,
        type: anime.format as string,
        status: (anime.status[0].toUpperCase() +
          anime.status.slice(1).toLowerCase()) as string,
        genre: anime.genres as string[],
        episodes: anime.episodes as number,
      };
    });

    return <AnimeCards animes={mapped} label="Popular This Season" />;
  } catch (error) {
    console.error("[SeasonalFetch] Error fetching seasonal:", error);
    return <>Mango</>;
  }
}
