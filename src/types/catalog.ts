export interface Normalized {
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
  pageInfo: {
    total: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
  };
  media: {
    id: string;
    status: string;
    image: string;
    title: string;
    genre: string[];
    type: string;
    episodes: number;
  };
}
