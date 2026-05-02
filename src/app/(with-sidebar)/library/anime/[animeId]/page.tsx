import {
  AnimeInfoBanner,
  AnimeInfoTabs,
  Characters,
} from "@/components/custom/anime-info";
import { EndOfContent } from "@/components/custom/end-of-content";

import { anilistRequest } from "@/lib/anilist/client";
import { animeInfo } from "@/constants/anilist/queries";
import { getAnimeInfo } from "./actions";
import { notFound } from "next/navigation";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { formatYearMonth, TitleSlug } from "@/utils/formatter";
import { MediaEdge, Studio } from "@/types/anilist-types";
import { mapStatus, mapSimple } from "@/utils/mapper";
import { recommendedRules } from "graphql";
import {
  AnimeCards,
  AnimeCardsEmpty,
} from "@/components/custom/anime-carousel";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import FooterClient from "@/components/custom/footer.wrapper";

// const raw = await anilistRequest(animeInfo, { id: 180745 });
// const mapped = raw.Media.characters.edges.map((character) => {
//   const voiceActor = character.voiceActorRoles.map((actor) =>
//     console.log({
//       id: actor.voiceActor.id,
//       name: actor.voiceActor.name.userPreferred,
//       image: actor.voiceActor.image.large,
//     }),
//   );
//   return {
//     id: character.id,
//     role: character.role,
//     name: character.node.name.userPreferred,
//     image: character.node.image.large,
//     voiceActor: voiceActor,
//   };
// });
/**
 * Render the anime details page for the given route parameter.
 *
 * Retrieves anime data by extracting the numeric id from `animeId` (the last hyphen-separated segment), fetches and maps the AniList media into a UI-friendly shape, and returns a page containing the anime banner, tabs, recommendations (or an empty recommendations state), and end-of-content marker. If the anime cannot be found or an error occurs, returns an "Anime Info Unavailable" fallback UI.
 *
 * @param params - A promise resolving to an object with `animeId`, a route slug (e.g. `"some-title-12345"`)
 * @returns The rendered React element for the anime details page or a fallback unavailable-state element
 */

export default async function Page({
  params,
}: {
  params: Promise<{ animeId: string }>;
}) {
  const { animeId } = await params;
  const id = animeId.split("-").pop();

  try {
    const anime = await getAnimeInfo(id!);
    if (!anime?.Media) notFound();
    const animeInfo = mapAdvanced(anime.Media);
    // throw new Error("Error test");

    return (
      <div className="min-w-0 max-h-dvh overflow-x-hidden overflow-y-scroll flex flex-1 flex-col pt-0 gap-5 overflow-auto">
        <AnimeInfoBanner data={animeInfo} />
        <AnimeInfoTabs data={animeInfo} />
        {animeInfo.recommendations?.length > 0 ? (
          <AnimeCards
            animes={animeInfo.recommendations}
            label="Recommendations"
            paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14"
          />
        ) : (
          <AnimeCardsEmpty
            label="Recommendations"
            paddingX="px-1.5 md:px-6 lg:px-12 xl:px-14"
          />
        )}
        <EndOfContent />
        <FooterClient />
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="min-w-0 max-h-dvh overflow-x-hidden overflow-y-scroll flex flex-1 flex-col pt-0 gap-5 overflow-auto">
        <div className="md:mt-15 px-1.5 md:px-6 lg:px-12 xl:px-14">
          <Item
            variant="outline"
            className="border-amber-500/90 bg-orange-500/10 px-3 py-1.5 text-sm text-foreground/80"
          >
            <ItemMedia variant="icon" className="text-amber-500/90">
              <ExclamationTriangleIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="font-medium text-foreground">
                Anime Info Unavailable
              </ItemTitle>
              <ItemDescription>
                Oops... looks like there won't be any anime info in the
                meantime.
              </ItemDescription>
            </ItemContent>
          </Item>
        </div>
        <FooterClient />
      </div>
    );
  }
}

const mapAdvanced = (data: any) => {
  return {
    ...data,
    title: { eng: data.title?.english, romaji: data.title?.romaji },
    image: {
      large: data.coverImage?.large,
      extraLarge: data.coverImage?.extraLarge,
    },
    bannerImage: data.bannerImage || data.coverImage?.extraLarge,
    color: data.coverImage?.color,
    type: data.format,
    score: data.averageScore,
    year: data.seasonYear,
    studios: data.studios?.nodes?.map((studio: Studio) => studio.name),
    nextEpisode: {
      airing: data.nextAiringEpisode?.airingAt,
      episode: data.nextAiringEpisode?.episode,
    },
    releaseDate:
      data.startDate.year && data.startDate.month
        ? formatYearMonth(data.startDate.year, data.startDate.month)
        : null,
    endDate:
      data.endDate.year && data.endDate.month
        ? formatYearMonth(data.endDate.year, data.endDate.month)
        : null,
    trailer: {
      url: data.trailer?.id
        ? `https://youtube.com/watch?v=${data.trailer?.id}`
        : null,
      thumbnail: data.trailer?.thumbnail,
    },
    tags: data.tags
      .filter((tag: { isAdult: boolean; name: string }) => !tag.isAdult)
      .map((tag: { isAdult: boolean; name: string }) => tag.name),
    status: data.status ? mapStatus(data.status) : null,
    characters: data.characters?.edges ? mapChar(data.characters?.edges) : null,
    relations: data.relations?.edges
      ? mapRelations(data.relations?.edges)
      : null,
    recommendations: data.recommendations?.nodes
      ? mapSimple(data.recommendations?.nodes)
      : null,
  };
};

const mapChar = (chars: any[]) => {
  return chars.map((char) => {
    return {
      id: char.id,
      role: char.role,
      name: char.node?.name?.full,
      image: char.node?.image?.large,
    };
  });
};

const mapRelations = (relations: any[]) => {
  return relations.map((relation) => {
    const node = relation.node;
    const title = node.title.english || node.title.romaji;
    const id = TitleSlug.fromTitle(title, node.id).slug;

    return {
      relationType: relation.relationType,
      id,
      title,
      type: node.format,
      status: mapStatus(node.status),
      image: node.coverImage?.large,
      color: node.coverImage?.color,
      episodes: node.episodes,
      chapters: node.chapters,
      media: node.type,
    };
  });
};

const mapRecommendations = (recommendations: any[]) => {
  return recommendations.map((recommendation) => {
    const media = recommendation.mediaRecommendation;
    return {};
  });
};

// relationType?: string;
// id: string;
// status?: string;
// image?: string;
// title: string;
// genres?: string[];
// type?: string;
// chapters?: number | string;
// episodes?: number | string;
// color?: string;
