"use server";

import { anilistRequest } from "@/lib/anilist/client";
import { totalPage, page } from "@/constants/anilist/queries";
import { TitleSlug } from "@/utils/formatter";

interface Media {
  id: number;
  title: {
    romaji: string | null;
    english: string | null;
    native: string | null;
    userPreferred: string | null;
  };
}

interface CountData {
  Page: {
    pageInfo: { total: number };
    media: Media[];
  };
}

interface PageData {
  Page: {
    media: Media[];
  };
}

export async function getRandomAnime(): Promise<string | null> {
  try {
    const count = await anilistRequest<CountData>(totalPage);
    const total = count.Page.pageInfo.total;
    if (!total) return null;

    const randomIndex = Math.floor(Math.random() * total);
    const randomPage = Math.floor(randomIndex / 20) + 1;
    const indexInPage = randomIndex % 20;

    const pageData = await anilistRequest<PageData>(page, {
      page: randomPage,
      perPage: 20,
    });
    const mediaList = pageData.Page.media;

    if (indexInPage >= mediaList.length) return null;
    const media = mediaList[indexInPage];
    return `${TitleSlug.fromTitle(
      media.title.english || media.title.romaji || "No Title",
      media.id,
    )}`;
  } catch (error) {
    console.error("[RandomAnime] error:", error);
    return null;
  }
}
