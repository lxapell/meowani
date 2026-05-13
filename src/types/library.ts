import type { MediaFormat } from "@/types/anilist-types";

/** Subset of MediaFormat commonly used for display */
type DisplayMediaType = Extract<MediaFormat, "TV" | "MOVIE" | "OVA" | "ONA" | "SPECIAL" | "MUSIC">;

export interface ISpotlight {
  id: string;
  title: string;
  japaneseTitle: string;
  banner: string;
  rank: number;
  url: string;
  type: DisplayMediaType;
  duration: string;
  releaseDate: string;
  quality: string;
  sub: number;
  dub: number;
  episodes: number;
  description: string;
}

export interface IRecentlyAdded {
  id: string;
  title: string;
  url: string;
  image: string;
  duration: string;
  japaneseTitle: string;
  type: DisplayMediaType;
  nsfw: boolean;
  sub: number;
  dub: number;
  episodes: number;
}
