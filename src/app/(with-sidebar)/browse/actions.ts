"use server";

import type { FilterState } from "@/types/catalog";
import { filtersToURLParams } from "@/utils/catalog/helpers";
import { anilistRequest } from "@/lib/anilist/client";
import { advancedsearch, advancedstudio } from "@/constants/anilist/queries";
import type {
  AdvancedSearchQueryVariables,
  InputMaybe,
  MediaSort,
  MediaSeason,
  MediaStatus,
  MediaFormat,
} from "@/types/anilist-types";
import { mapStatus } from "@/utils/mapper";

export async function fetchCatalog({
  pageParam = 1,
  filters,
}: {
  pageParam: number;
  filters: FilterState;
}) {
  const variables: AdvancedSearchQueryVariables = {
    page: pageParam,
    search: filters.Query || null,
    type: "ANIME",
    format: filters.Formats.map((f) => f.value) as MediaFormat[],
    genres: filters.Genres.map((g) => g.value),
    tags: filters.Tags.map((t) => t.value),
    seasonYear: filters.Year ? parseInt(filters.Year.value) : null,
    season: (filters.Season?.value as MediaSeason) || null,
    status: (filters.Status?.value as MediaStatus) || null,
    sort: filters["Sort by"]
      ? [filters["Sort by"].value as MediaSort]
      : ["POPULARITY_DESC"],
    studioId: filters.Studio ? parseInt(filters.Studio.value) : null,
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
  };

  Object.keys(variables).forEach((key) => {
    const val = variables[key];
    if (val === undefined || !val || (Array.isArray(val) && val.length === 0)) {
      delete variables[key];
    }
  });

  console.log(filters.Studio?.value);
  console.log(variables.studioId);
  let query;
  if (variables.studioId) {
    query = advancedstudio;
  } else {
    query = advancedsearch;
  }

  const raw: {
    Page: { pageInfo: any; media: any[] };
    Studio: { media: { pageInfo: any; nodes: any[] } };
  } = await anilistRequest(query, variables);

  if (query === advancedstudio) {
    console.log(map(raw.Studio.media.nodes));
    return {
      pageInfo: raw.Studio.media.pageInfo,
      media: map(raw.Studio.media.nodes),
    };
  }
  console.log(map(raw.Page.media));
  return { pageInfo: raw.Page.pageInfo, media: map(raw.Page.media) };
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
      studios: anime.studios.nodes.map((studio) => studio.name),
    };
  });
