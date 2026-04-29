import fs from "fs/promises";
import path from "path";

const anilist = "https://graphql.anilist.co";

interface Studio {
  id: number;
  name: string;
  isAnimationStudio: boolean;
}

interface PageResponse {
  data: {
    Page: {
      pageInfo: { hasNextPage: boolean };
      studios: Studio[];
    };
  };
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches all studios from the AniList GraphQL API by iterating through paginated results.
 *
 * The function pages through results until no more pages are available, applying short delays and periodic longer pauses to avoid exceeding rate limits. Retrieved items include each studio's `id`, `name`, and `isAnimationStudio` fields.
 *
 * @returns An array of `Studio` objects retrieved from AniList (each with `id`, `name`, and `isAnimationStudio`).
 */
async function fetchAllStudios(): Promise<Studio[]> {
  const studios: Studio[] = [];
  let page = 1;
  let hasNextPage = true;
  let requestsThisMinute = 0;

  while (hasNextPage) {
    if (requestsThisMinute >= 28) {
      console.log("Pausing for 90 seconds");
      await delay(90000);
      requestsThisMinute = 0;
    }
    const query = `
      query($page: Int) {
        Page(page: $page, perPage: 50) {
          pageInfo { hasNextPage }
          studios {
            id
            name
            isAnimationStudio
          }
        }
      }
    `;

    const response = await fetch(anilist, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { page } }),
    });
    if (!response.ok) {
      throw new Error(`AniList request failed: ${response.status}`);
    }

    const json = (await response.json()) as
      | PageResponse
      | { errors?: { message: string }[] };

    if (!("data" in json) || !json.data?.Page) {
      const message =
        "errors" in json && json.errors?.[0]?.message
          ? json.errors[0].message
          : "Unknown AniList API error";
      throw new Error(message);
    }

    studios.push(...json.data.Page.studios);
    hasNextPage = json.data.Page.pageInfo.hasNextPage;
    page++;
    requestsThisMinute++;

    console.log(`Fetched ${page - 1}, total studios: ${studios.length}`);
    await delay(500);
  }
  return studios;
}

/**
 * Fetches all studios from AniList, filters for animation studios, and writes a sorted
 * list of `{ id, name }` objects to `data/animation-studios.json` in the current working directory.
 *
 * Ensures the target directory exists and logs progress and completion.
 */
async function main() {
  console.log("Fetching all animation studios...");
  const studios = await fetchAllStudios();
  const animationStudios = studios
    .filter((studio) => studio.isAnimationStudio)
    .map(({ id, name }) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const outputPath = path.join(process.cwd(), "data", "animation-studios.json");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(animationStudios, null, 2));

  console.log(`Saved ${animationStudios.length} studios to ${outputPath}`);
}

main().catch(console.error);
