import type { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";

type GraphQLResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

const base = new GraphQLClient("https://graphql.anilist.co", {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Send a GraphQL request to the AniList API and return the parsed response data.
 *
 * @param query - A GraphQL query as a string or a `DocumentNode`
 * @param variables - Optional map of GraphQL variables for the query
 * @param token - Optional OAuth bearer token to authenticate the request
 * @returns The response `data` from AniList, typed as `T`
 */
export async function anilistRequest<T>(
  query: string | DocumentNode,
  variables?: Record<string, any>,
  token?: string,
): Promise<T> {
  // const headers: HeadersInit = {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // };
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`;
  // }

  // const queryString =
  //   typeof query === "string" ? query : query.loc?.source.body;

  // if (!queryString) {
  //   throw new Error(
  //     "[AnilistRequest] Request failed: unable to extract query string",
  //   );
  //  }

  // const response = await fetch("https://graphql.anilist.co", {
  //   method: "POST",
  //   headers,
  //   body: JSON.stringify({ query, variables }),
  // });

  // if (!response.ok) {
  //   throw new Error(`[AnilistRequest] Request failed: ${response.statusText}`);
  // }

  // const json = (await response.json()) as GraphQLResponse<T>;
  // if (json.errors?.length) {
  //   throw new Error(json.errors[0].message);
  // }

  // return json.data;

  const client = token
    ? new GraphQLClient("https://graphql.anilist.co", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    : base;

  return client.request<T>({
    document: query,
    variables,
  });
}
