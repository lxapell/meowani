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
import { mapSimple, mapStatus } from "@/utils/mapper";

/**
 * Fetches a paginated anime catalog from AniList using the provided filter state; if a studio filter is present, performs a studio-specific search.
 *
 * @param pageParam - Page number to request (1-based)
 * @param filters - UI filter state used to construct AniList search variables
 * @returns An object `{ pageInfo, media }` where `pageInfo` is AniList pagination information and `media` is an array of simplified media entries matching the filters
 */
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
    // console.log(map(raw.Studio?.media?.nodes!));
    return {
      pageInfo: raw.Studio!.media!.pageInfo,
      media: mapSimple(raw.Studio?.media?.nodes!),
    };
  } else {
    query = advancedsearch;
    const raw = await anilistRequest<AdvancedSearchQuery>(query, baseVariables);
    // console.log(map(raw.Page?.media!));
    return { pageInfo: raw.Page?.pageInfo, media: mapSimple(raw.Page?.media!) };
  }
}
