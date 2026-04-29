import { PageInfo } from "./anilist-types";

export interface Normalized {
  id?: number;
  label: string;
  value: string;
}

export interface FilterState {
  Query: string;
  Genres: Normalized[];
  Tags: Normalized[];
  Formats: Normalized[];
  Year: Normalized | null;
  Season: Normalized | null;
  Status: Normalized | null;
  "Sort by": Normalized | null;
  Studio: Normalized | null;
  "Min Duration": string;
  "Max Duration": string;
  "Min Episodes": string;
  "Max Episodes": string;
}

export interface PageData {
  pageInfo: PageInfo;
  media: {
    id: string;
    status: string;
    image: string;
    title: string;
    genre: string[];
    type: string;
    episodes: number;
    studios: string[];
    color: string;
  }[];
}
