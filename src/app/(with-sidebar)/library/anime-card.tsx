import { AnimeCards } from "@/components/custom/anime-card.grid";
import { anilistRequest } from "@/lib/anilist/client";
import { trending } from "@/constants/anilist/queries";

interface ITrending {
  Page: {
    pageInfo: any;
    media: any[];
  };
}

export const revalidate = 86400;

export async function AnimeCardsComponent() {
  "use cache";

  try {
    const raw: ITrending = await anilistRequest(trending, {
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
    console.error("[SpotlightFormatter] Error processing spotlight", error);
    return <>Banana</>;
  }
}
