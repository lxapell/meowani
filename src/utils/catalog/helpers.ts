// import {
//   initialFilters,
//   staticCatalogData,
//   studioEnums,
// } from "@/constants/anilist/enums";
import type { FilterState, Normalized } from "@/types/catalog";

/**
 * Normalize various catalog item shapes into a consistent `{ id, label, value }` object.
 *
 * @param item - A value to normalize: a string, a studio-like object (`{ id, name }`), or a generic option object (may contain `id`, `name`, `normal`, `query`).
 * @param index - Index used to generate a fallback `id` when `item` has no `id`.
 * @param type - Optional hint; when `"studio"` treats `item` as a studio object and uses its `id` and `name`.
 * @returns An object with:
 *  - `id`: the item's `id` if present, otherwise `index + 1`;
 *  - `label`: `item.normal` if present, otherwise `item.name` (or the string value when `item` is a string);
 *  - `value`: `item.query` if present, otherwise `item.name` (or the string value when `item` is a string).
 */
export function normalize(
  item: string | any,
  index: number,
  type?: string,
): Normalized {
  if (typeof item === "string") {
    return { id: index + 1, label: item, value: item };
  }
  if (type === "studio") {
    return { id: item.id, label: item.name, value: item.id };
  }
  return {
    id: "id" in item ? item.id : index + 1,
    label: "normal" in item ? item.normal : item.name,
    value: "query" in item ? item.query : item.name,
  };
}

/**
 * Populate a FilterState object from URL query parameters.
 *
 * Reads supported query keys from `params` and maps them into a new FilterState based on `initialFilters`:
 * - `q` → Query (string)
 * - `genres`, `tags`, `formats` → comma-separated lists matched against the corresponding static catalog entries; stored as arrays of catalog options
 * - `year`, `season`, `status`, `sort` → matched by `value` to the corresponding catalog option or set to `null` if not found
 * - `studio` → parsed as integer and matched by `id` to the "Studio" catalog option or set to `null` if not found
 * - `minDuration`, `maxDuration`, `minEpisodes`, `maxEpisodes` → stored as string values (empty string if absent)
 *
 * @param params - URLSearchParams instance containing query parameters to convert
 * @returns A FilterState populated from the provided query parameters
 */
// export function URLParamsToFilters(params: URLSearchParams): FilterState {
//   const filters = { ...initialFilters };
//
//   filters.Query = params.get("q") || "";
//
//   const genresParam = params.get("genres");
//   if (genresParam) {
//     const values = genresParam.split(",");
//     filters.Genres = staticCatalogData
//       .find((d) => d.label === "Genres")!
//       .data.filter((item) => values.includes(item.value));
//   }
//   const tagsParam = params.get("tags");
//   if (tagsParam) {
//     const values = tagsParam.split(",");
//     filters.Tags = staticCatalogData
//       .find((d) => d.label === "Tags")!
//       .data.filter((item) => values.includes(item.value));
//   }
//   const formatsParam = params.get("formats");
//   if (formatsParam) {
//     const values = formatsParam.split(",");
//     filters.Formats = staticCatalogData
//       .find((d) => d.label === "Formats")!
//       .data.filter((item) => values.includes(item.value));
//   }
//   const yearParam = params.get("year");
//   if (yearParam) {
//     filters.Year =
//       staticCatalogData
//         .find((d) => d.label === "Year")!
//         .data.find((item) => item.value === yearParam) || null;
//   }
//   const seasonParam = params.get("season");
//   if (seasonParam) {
//     filters.Season =
//       staticCatalogData
//         .find((d) => d.label === "Season")!
//         .data.find((item) => item.value === seasonParam) || null;
//   }
//   const statusParam = params.get("status");
//   if (statusParam) {
//     filters.Status =
//       staticCatalogData
//         .find((d) => d.label === "Status")!
//         .data.find((item) => item.value === statusParam) || null;
//   }
//   const sortParam = params.get("sort");
//   if (sortParam) {
//     filters["Sort by"] =
//       staticCatalogData
//         .find((d) => d.label === "Sort by")!
//         .data.find((item) => item.value === sortParam) || null;
//   }
//   const studioParam = params.get("studio");
//   if (studioParam) {
//     console.log("[GetParam] found studio param:", studioParam);
//     filters.Studio =
//       staticCatalogData
//         .find((d) => d.label === "Studio")!
//         .data.find((item) => item.id === parseInt(studioParam)) || null;
//     console.log("[StoreParam] stored to filters:", filters.Studio);
//   }
//   filters["Min Duration"] = params.get("minDuration") || "";
//   filters["Max Duration"] = params.get("maxDuration") || "";
//   filters["Min Episodes"] = params.get("minEpisodes") || "";
//   filters["Max Episodes"] = params.get("maxEpisodes") || "";
//   return filters;
// }

/**
 * Serialize a FilterState into URL search parameters.
 *
 * Produces a URLSearchParams object containing only populated filter fields:
 * - `Query` → `q`
 * - multi-select arrays (`Genres`, `Tags`, `Formats`) → comma-separated `value`s in `genres`, `tags`, `formats`
 * - single selects (`Year`, `Season`, `Status`, `Sort by`, `Studio`) → their `.value` in `year`, `season`, `status`, `sort`, `studio`
 * - numeric/string range fields (`Min Duration`, `Max Duration`, `Min Episodes`, `Max Episodes`) → `minDuration`, `maxDuration`, `minEpisodes`, `maxEpisodes`
 *
 * @param filters - The filter state to serialize.
 * @returns A URLSearchParams instance representing the serialized filters.
 */
// export function filtersToURLParams(filters: FilterState): URLSearchParams {
//   const params = new URLSearchParams();
//   if (filters.Query) params.set("q", filters.Query);
//   if (filters.Genres.length)
//     params.set("genres", filters.Genres.map((g) => g.value).join(","));
//   if (filters.Tags.length)
//     params.set("tags", filters.Tags.map((t) => t.value).join(","));
//   if (filters.Formats.length)
//     params.set("formats", filters.Formats.map((f) => f.value).join(","));
//   if (filters.Year) params.set("year", filters.Year.value);
//   if (filters.Season) params.set("season", filters.Season.value);
//   if (filters.Status) params.set("status", filters.Status.value);
//   if (filters["Sort by"]) params.set("sort", filters["Sort by"].value);
//   if (filters.Studio) {
//     console.log("[GetFilters] found studio filter:", filters.Studio);
//     params.set("studio", filters.Studio.value);
//     console.log("[ParamSet] set param for studio:", params);
//   }
//   if (filters["Min Duration"])
//     params.set("minDuration", filters["Min Duration"]);
//   if (filters["Max Duration"])
//     params.set("maxDuration", filters["Max Duration"]);
//   if (filters["Min Episodes"])
//     params.set("minEpisodes", filters["Min Episodes"]);
//   if (filters["Max Episodes"])
//     params.set("maxEpisodes", filters["Max Episodes"]);
//   return params;
// }
