"use server";

import type { FilterState } from "@/types/catalog";
import { anilistRequest } from "@/lib/anilist/client";
import { advancedsearch, advancedstudio } from "@/constants/anilist/queries";
import type {
  AdvancedSearchQuery,
  AdvancedSearchQueryVariables,
  MediaSort,
  MediaSeason,
  MediaStatus,
  MediaFormat,
  AdvancedStudioSearchQuery,
  PageInfo,
} from "@/types/anilist-types";
import { mapSimple } from "@/utils/mapper";

const parseOptionalInt = (value?: string | null) => {
  if (!value?.trim()) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
};

export type CatalogResult =
  | {
      success: true;
      pageInfo: PageInfo | null;
      media: ReturnType<typeof mapSimple>;
    }
  | {
      success: false;
      error: string;
    };

/**
 * Fetches a paginated anime catalog from AniList using the provided filter state;
 * if a studio filter is present, performs a studio-specific search.
 *
 * @param pageParam - Page number to request (1-based)
 * @param filters - UI filter state used to construct AniList search variables
 * @returns A structured result with `success: true` and data, or `success: false` with error message
 */
export async function fetchCatalog({
  pageParam = 1,
  filters,
}: {
  pageParam: number;
  filters: FilterState;
}): Promise<CatalogResult> {
  try {
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
      durationGreater: parseOptionalInt(filters["Min Duration"]),
      durationLesser: parseOptionalInt(filters["Max Duration"]),
      episodesGreater: parseOptionalInt(filters["Min Episodes"]),
      episodesLesser: parseOptionalInt(filters["Max Episodes"]),
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

    if (filters.Studio?.value) {
      const variables = {
        ...baseVariables,
        studioId: filters.Studio ? parseInt(filters.Studio.value) : null,
      };
      const raw = await anilistRequest<AdvancedStudioSearchQuery>(
        advancedstudio,
        variables,
      );
      return {
        success: true,
        pageInfo: raw.Studio?.media?.pageInfo ?? null,
        media: mapSimple(raw.Studio?.media?.nodes ?? []),
      };
    } else {
      const raw = await anilistRequest<AdvancedSearchQuery>(
        advancedsearch,
        baseVariables,
      );
      return {
        success: true,
        pageInfo: raw.Page?.pageInfo ?? null,
        media: mapSimple(raw.Page?.media ?? []),
      };
    }
  } catch (error) {
    console.error("[fetchCatalog] Error fetching catalog:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch catalog",
    };
  }
}
