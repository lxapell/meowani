type GraphQLResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

/**
 * @param query {*} - GraphQL query string
 * @param variables - The qury variable objects
 * @param taken - Optional OAuth token for authenticated requests
 */
export async function anilistRequest<T>(
  query: string,
  variables?: Record<string, any>,
  token?: string,
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`[AnilistRequest] Request failed: ${response.statusText}`);
  }

  const json = (await response.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}
