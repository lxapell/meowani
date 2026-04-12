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

    const json = (await response.json()) as PageResponse;

    if (!json.data) {
      console.error("API Error:", json);
      break;
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
