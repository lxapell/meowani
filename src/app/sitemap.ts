import { MetadataRoute } from "next";
import {
  trending,
  top100anime,
  seasonal,
  popular,
} from "@/constants/anilist/queries";
import { anilistRequest } from "@/lib/anilist/client";
import { TitleSlug } from "@/utils/formatter";
import { AnimeSeason } from "@/utils/current-season";
import {
  PopularQuery,
  SeasonalQuery,
  Top100AnimeQuery,
  TrendingQuery,
} from "@/types/anilist-types";
import { getISOWithOffset } from "@/utils/date";
import { DocumentNode } from "graphql";

export const revalidate = 604800;

async function safeFetch<T>(
  query: string | DocumentNode,
  variables: Record<string, any>,
  fallback: T,
): Promise<T> {
  try {
    return await anilistRequest<T>(query, variables);
  } catch (error) {
    console.error("[AnilistRequest] request failed", error);
    return fallback;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { season, year } = AnimeSeason.now();
  const lastModified: string = getISOWithOffset(
    new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Singapore" }),
    ),
    8,
  );
  const fallback = { Page: { pageInfo: null, media: [] } };
  const trendingData = await safeFetch<TrendingQuery>(
    trending,
    {
      page: 1,
      perPage: 15,
    },
    fallback,
  );
  const topData = await safeFetch<Top100AnimeQuery>(
    top100anime,
    {
      page: 1,
      perPage: 10,
    },
    fallback,
  );
  const seasonalData = await safeFetch<SeasonalQuery>(
    seasonal,
    {
      page: 1,
      perPage: 10,
      season,
      seasonYear: year,
    },
    fallback,
  );
  const popularData = await safeFetch<PopularQuery>(
    popular,
    {
      page: 1,
      perPage: 15,
    },
    fallback,
  );

  const allData = [
    ...(trendingData.Page?.media || []),
    ...(topData.Page?.media || []),
    ...(seasonalData.Page?.media || []),
    ...(popularData.Page?.media || []),
  ];

  const allMap = [
    ...new Map(allData.map((anime) => [anime?.id, anime])).values(),
  ].map((anime) => {
    const id = TitleSlug.fromTitle(
      anime?.title?.english || anime?.title?.romaji || "No Title",
      anime?.id as number,
    );
    return {
      url: `https://meowani.site/library/anime/${id}`,
      lastModified,
    };
  });

  return [
    {
      url: "https://meowani.site",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://meowani.site/library",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://meowani.site/browse",
      lastModified,
      priority: 0.5,
    },
    ...(allMap || []),
  ];
}
