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

export const revalidate = 604800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { season, year } = AnimeSeason.now();
  const trendingData = await anilistRequest<TrendingQuery>(trending, {
    page: 1,
    perPage: 15,
  });
  const topData = await anilistRequest<Top100AnimeQuery>(top100anime, {
    page: 1,
    perPage: 10,
  });
  const seasonalData = await anilistRequest<SeasonalQuery>(seasonal, {
    page: 1,
    perPage: 10,
    season,
    seasonYear: year,
  });
  const popularData = await anilistRequest<PopularQuery>(popular, {
    page: 1,
    perPage: 15,
  });

  const trendingMap = trendingData.Page?.media?.map((anime) => {
    const id = TitleSlug.fromTitle(
      anime?.title?.english || anime?.title?.romaji || "No Title",
      anime?.id as number,
    );
    return {
      url: `https://meowani.site/library/anime/${id}`,
      lastModified: new Date(),
    };
  });

  const topMap = topData.Page?.media?.map((anime) => {
    const id = TitleSlug.fromTitle(
      anime?.title?.english || anime?.title?.romaji || "No Title",
      anime?.id as number,
    );
    return {
      url: `https://meowani.site/library/anime/${id}`,
      lastModified: new Date(),
    };
  });

  const seasonalMap = seasonalData.Page?.media?.map((anime) => {
    const id = TitleSlug.fromTitle(
      anime?.title?.english || anime?.title?.romaji || "No Title",
      anime?.id as number,
    );
    return {
      url: `https://meowani.site/library/anime/${id}`,
      lastModified: new Date(),
    };
  });

  const popularMap = popularData.Page?.media?.map((anime) => {
    const id = TitleSlug.fromTitle(
      anime?.title?.english || anime?.title?.romaji || "No Title",
      anime?.id as number,
    );
    return {
      url: `https://meowani.site/library/anime/${id}`,
      lastModified: new Date(),
    };
  });

  return [
    {
      url: "https://meowani.site",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://meowani.site/library",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://meowani.site/browse",
      lastModified: new Date(),
      priority: 0.5,
    },
    ...(trendingMap || []),
    ...(topMap || []),
    ...(seasonalMap || []),
    ...(popularMap || []),
  ];
}
