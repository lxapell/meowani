"use server";

import type { FilterState } from "@/types/catalog";
import { filtersToURLParams } from "@/utils/catalog/helpers";
import { anilistRequest } from "@/lib/anilist/client";
import { advancedsearch } from "@/constants/anilist/queries";
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
    // studioId: filters.Studio ? [filters.Studio.value] : null,
    durationGreater: filters["Max Duration"]
      ? parseInt(filters["Max Duration"])
      : null,
    durationLesser: filters["Min Duration"]
      ? parseInt(filters["Min Duration"])
      : null,
    episodesGreater: filters["Max Episodes"]
      ? parseInt(filters["Max Episodes"])
      : null,
    episodesLesser: filters["Min Episodes"]
      ? parseInt(filters["Min Episodes"])
      : null,
  };

  Object.keys(variables).forEach((key) => {
    const val = variables[key];
    if (val === undefined || !val || (Array.isArray(val) && val.length === 0)) {
      delete variables[key];
    }
  });

  const raw: { Page: { pageInfo: any; media: any[] } } = await anilistRequest(
    advancedsearch,
    variables,
  );
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
    };
  });
