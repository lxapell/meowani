import type {
  MediaStatus,
  MediaRelation,
  MediaFormat,
  Studio,
  Media,
} from "@/types/anilist-types";

export type TStatus =
  | "CANCELLED"
  | "FINISHED"
  | "HIATUS"
  | "UPCOMING"
  | "ONGOING"
  | "OTHER";

export interface ISimpleAnimeData {
  relationType?: MediaRelation;
  id: string;
  title: string;
  image?: string;
  color?: string;
  type?: MediaFormat;
  status?: TStatus;
  genres?: string[];
  episodes?: number | string;
  chapters?: number | string;
  studios?: string[];
}

export const mapStatus = (status: MediaStatus): TStatus => {
  switch (status) {
    case "NOT_YET_RELEASED":
      return "UPCOMING";
    case "RELEASING":
      return "ONGOING";
    default:
      return status;
  }
};

export const mapRelationType = (
  relationType: MediaRelation,
): MediaRelation | undefined => {
  if (!relationType) return;
  return (relationType[0].toUpperCase() +
    relationType.slice(1).toLowerCase()) as MediaRelation;
};

export const capitalize = (text: string): string => {
  return text[0].toUpperCase() + text.slice(1).toUpperCase();
};

export const mapSimple = (data: any[]): ISimpleAnimeData[] =>
  data.map((anime) => {
    let animeData;
    if (anime.mediaRecommendation) {
      animeData = anime.mediaRecommendation;
    } else if (anime.node) {
      animeData = anime.node;
    } else animeData = anime;

    const title =
      animeData.title?.english || animeData.title?.romaji || animeData.title;

    const id = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${animeData.id}`;
    const status = mapStatus(animeData.status);

    const relationType = animeData.relationType
      ? mapRelationType(animeData.relationType)
      : mapRelationType(anime.relationType);

    return {
      relationType: relationType || undefined,
      id,
      title,
      image: animeData.coverImage?.large || animeData.image || undefined,
      type: animeData.format || animeData.type || undefined,
      status: status ? (capitalize(status) as TStatus) : undefined,
      genres: animeData.genres || undefined,
      episodes: animeData.episodes || undefined,
      chapters: animeData.chapters || undefined,
      studios: animeData.studios
        ? animeData.studios.nodes?.map((studio: Studio) => studio.name)
        : undefined,
      color: animeData.coverImage?.color || animeData.color || undefined,
    };
  });
