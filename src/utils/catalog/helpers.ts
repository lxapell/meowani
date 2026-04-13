import { initialFilters, staticCatalogData } from "@/constants/anilist/enums";
import type { FilterState, Normalized } from "@/types/catalog";

export function normalize(item: string | any): Normalized {
  if (typeof item === "string") {
    return { label: item, value: item };
  }
  return {
    label: "normal" in item ? item.normal : item.name,
    value: "query" in item ? item.query : item.name,
  };
}

export function URLParamsToFilters(params: URLSearchParams): FilterState {
  const filters = { ...initialFilters };

  filters.Query = params.get("q") || "";

  const genresParam = params.get("genres");
  if (genresParam) {
    const values = genresParam.split(",");
    filters.Genres = staticCatalogData
      .find((d) => d.label === "Genres")!
      .data.filter((item) => values.includes(item.value));
  }
  const tagsParam = params.get("tags");
  if (tagsParam) {
    const values = tagsParam.split(",");
    filters.Tags = staticCatalogData
      .find((d) => d.label === "Tags")!
      .data.filter((item) => values.includes(item.value));
  }
  const formatsParam = params.get("formats");
  if (formatsParam) {
    const values = formatsParam.split(",");
    filters.Formats = staticCatalogData
      .find((d) => d.label === "Formats")!
      .data.filter((item) => values.includes(item.value));
  }
  const yearParam = params.get("year");
  if (yearParam) {
    filters.Year =
      staticCatalogData
        .find((d) => d.label === "Year")!
        .data.find((item) => item.value === yearParam) || null;
  }
  const seasonParam = params.get("season");
  if (seasonParam) {
    filters.Season =
      staticCatalogData
        .find((d) => d.label === "Season")!
        .data.find((item) => item.value === seasonParam) || null;
  }
  const statusParam = params.get("status");
  if (statusParam) {
    filters.Status =
      staticCatalogData
        .find((d) => d.label === "Status")!
        .data.find((item) => item.value === statusParam) || null;
  }
  const sortParam = params.get("sort");
  if (sortParam) {
    filters["Sort by"] =
      staticCatalogData
        .find((d) => d.label === "Sort by")!
        .data.find((item) => item.value === sortParam) || null;
  }
  const studioParam = params.get("studio");
  if (studioParam) {
    filters.Studio =
      staticCatalogData
        .find((d) => d.label === "Studio")!
        .data.find((item) => item.value === studioParam) || null;
  }
  filters["Min Duration"] = params.get("minDuration") || "";
  filters["Max Duration"] = params.get("maxDuration") || "";
  filters["Min Episodes"] = params.get("minEpisodes") || "";
  filters["Max Episodes"] = params.get("maxEpisodes") || "";
  return filters;
}

export function filtersToURLParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.Query) params.set("q", filters.Query);
  if (filters.Genres.length)
    params.set("genres", filters.Genres.map((g) => g.value).join(","));
  if (filters.Tags.length)
    params.set("tags", filters.Tags.map((t) => t.value).join(","));
  if (filters.Formats.length)
    params.set("formats", filters.Formats.map((f) => f.value).join(","));
  if (filters.Year) params.set("year", filters.Year.value);
  if (filters.Season) params.set("season", filters.Season.value);
  if (filters.Status) params.set("status", filters.Status.value);
  if (filters["Sort by"]) params.set("sort", filters["Sort by"].value);
  if (filters.Studio) params.set("studio", filters.Studio.value);
  if (filters["Min Duration"])
    params.set("minDuration", filters["Min Duration"]);
  if (filters["Max Duration"])
    params.set("maxDuration", filters["Max Duration"]);
  if (filters["Min Episodes"])
    params.set("minEpisodes", filters["Min Episodes"]);
  if (filters["Max Episodes"])
    params.set("maxEpisodes", filters["Max Episodes"]);
  return params;
}
