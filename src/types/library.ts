type MediaType = "TV" | "MOVIE" | "OVA" | "ONA" | "SPECIAL" | "MUSIC";

export interface ISpotlight {
  id: string;
  title: string;
  japaneseTitle: string;
  banner: string;
  rank: number;
  url: string;
  type: MediaType;
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
  type: MediaType;
  nsfw: boolean;
  sub: number;
  dub: number;
  episodes: number;
}
