import type {
  MediaStatus,
  MediaRelation,
  MediaFormat,
  Studio,
  Media,
} from "@/types/anilist-types";

/** Normalized status values used throughout the app */
export type NormalizedStatus =
  | "Cancelled"
  | "Finished"
  | "Hiatus"
  | "Upcoming"
  | "Ongoing";

/** Simplified anime data structure returned by mapSimple */
export interface ISimpleAnimeData {
  rank?: number;
  description?: string;
  relationType: string | null;
  id: string;
  title: string;
  image: string | null;
  banner?: string;
  color: string | null;
  type: string | null;
  status: NormalizedStatus | null;
  genres: string[];
  episodes: number | null;
  chapters: number | null;
  studios: string[];
}

export const mapStatus = (status: MediaStatus | null | undefined): NormalizedStatus | null => {
  if (!status) return null;
  switch (status) {
    case "NOT_YET_RELEASED":
      return "Upcoming";
    case "RELEASING":
      return "Ongoing";
    case "CANCELLED":
      return "Cancelled";
    case "FINISHED":
      return "Finished";
    case "HIATUS":
      return "Hiatus";
    default:
      return null;
  }
};

export const mapRelationType = (
  relationType: MediaRelation,
): MediaRelation | undefined => {
  if (!relationType) return;
  switch (relationType) {
    case "SPIN_OFF":
      return "Spin Off" as MediaRelation;
    case "SIDE_STORY":
      return "Side Story" as MediaRelation;
    default:
      return (relationType[0].toUpperCase() +
        relationType.slice(1).toLowerCase()) as MediaRelation;
  }
};

export const capitalize = (text: string): string => {
  return text[0].toUpperCase() + text.slice(1).toUpperCase();
};

export const mapMediaType = (type: MediaFormat): string => {
  switch (type) {
    case "ONE_SHOT":
      return "MANGA";
    case "TV_SHORT":
      return "SHORT";
    default:
      return type;
  }
};

interface MediaRecommendation {
  mediaRecommendation: {
    id: number;
    title: any;
    coverImage: string;
    episodes: number;
    status: string;
    format: string;
    nextAiringEpisode: any;
  };
}

export const mapSimple = (data: any[]): ISimpleAnimeData[] =>
  data
    .filter((anime): anime is any & MediaRecommendation => {
      return anime.mediaRecommendation !== null;
    })
    .map((anime, index) => {
      let animeData;
      if (anime.mediaRecommendation) {
        animeData = anime.mediaRecommendation;
      } else if (anime.node) {
        animeData = anime.node;
      } else animeData = anime;

      const title =
        animeData.title?.english || animeData.title?.romaji || animeData.title;
      const id = `${String(title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}-${animeData.id}`;
      const status = mapStatus(animeData.status);

      const relationType = animeData.relationType
        ? mapRelationType(animeData.relationType)
        : mapRelationType(anime.relationType);

      const type = animeData.format
        ? mapMediaType(animeData.format)
        : animeData.type
          ? mapMediaType(animeData.type)
          : null;

      return {
        relationType: relationType || null,
        rank: index + 1,
        id,
        title: String(title),
        image: animeData.coverImage?.large || animeData.image || null,
        banner: animeData.bannerImage,
        type,
        status,
        genres: animeData.genres ?? [],
        episodes: typeof animeData.episodes === "number" ? animeData.episodes : null,
        chapters: typeof animeData.chapters === "number" ? animeData.chapters : null,
        studios: animeData.studios?.nodes?.map((studio: Studio) => studio.name) ?? [],
        color: animeData.coverImage?.color || animeData.color || null,
        description: animeData.description,
      };
    });
