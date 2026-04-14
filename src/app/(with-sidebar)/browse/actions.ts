"use server";

import type { FilterState } from "@/types/catalog";
import { filtersToURLParams } from "@/utils/catalog/helpers";
import { anilistRequest } from "@/lib/anilist/client";
import { advancedsearch, advancedstudio } from "@/constants/anilist/queries";
import type {
  AdvancedSearchQuery,
  AdvancedSearchQueryVariables,
  InputMaybe,
  MediaSort,
  MediaSeason,
  MediaStatus,
  MediaFormat,
  AdvancedStudioSearchQueryVariables,
  Scalars,
  Studio,
  AdvancedStudioSearchQuery,
} from "@/types/anilist-types";
import { mapStatus } from "@/utils/mapper";
import { Maybe } from "graphql/jsutils/Maybe";
import { Variable } from "lucide-react";

export async function fetchCatalog({
  pageParam = 1,
  filters,
}: {
  pageParam: number;
  filters: FilterState;
}) {
  const baseVariables = {
    page: pageParam,
    search: filters.Query || null,
    type: "ANIME" as const,
    format: filters.Formats.map((f) => f.value) as MediaFormat[],
    genres: filters.Genres.map((g) => g.value),
    tags: filters.Tags.map((t) => t.value),
    seasonYear: filters.Year ? parseInt(filters.Year.value) : null,
    season: (filters.Season?.value as MediaSeason) || null,
    status: (filters.Status?.value as MediaStatus) || null,
    sort: filters["Sort by"]
      ? [filters["Sort by"].value as MediaSort]
      : ["POPULARITY_DESC"],
    durationGreater: filters["Min Duration"]
      ? parseInt(filters["Min Duration"])
      : null,
    durationLesser: filters["Max Duration"]
      ? parseInt(filters["Max Duration"])
      : null,
    episodesGreater: filters["Min Episodes"]
      ? parseInt(filters["Min Episodes"])
      : null,
    episodesLesser: filters["Max Episodes"]
      ? parseInt(filters["Max Episodes"])
      : null,
  } as AdvancedSearchQueryVariables;

  Object.keys(baseVariables).forEach((key) => {
    const val = baseVariables[key as keyof typeof baseVariables];
    if (
      val === undefined ||
      val === null ||
      (Array.isArray(val) && val.length === 0)
    ) {
      delete baseVariables[key as keyof typeof baseVariables];
    }
  });

  console.log(filters.Studio?.value);
  let query;
  if (filters.Studio?.value) {
    const variables = {
      ...baseVariables,
      studioId: filters.Studio ? parseInt(filters.Studio.value) : null,
    };
    query = advancedstudio;
    const raw = await anilistRequest<AdvancedStudioSearchQuery>(
      query,
      variables,
    );
    console.log(map(raw.Studio?.media?.nodes!));
    return {
      pageInfo: raw.Studio!.media!.pageInfo,
      media: map(raw.Studio?.media?.nodes!),
    };
  } else {
    query = advancedsearch;
    const raw = await anilistRequest<AdvancedSearchQuery>(query, baseVariables);
    console.log(map(raw.Page?.media!));
    return { pageInfo: raw.Page?.pageInfo, media: map(raw.Page?.media!) };
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
      genre: anime.genres as string[],
      episodes: anime.episodes as number,
      studios: anime.studios.nodes.map((studio: Studio) => studio.name),
    };
  });
