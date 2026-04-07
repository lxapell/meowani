import type { ISpotlight } from "@/types/library";

import { Spotlight } from "@/components/custom/spotlight";
import { SOURCE_API } from "@/constants/api";

export async function SpotlightComponent() {
  try {
    const raw = await fetch(SOURCE_API.HIANIME.SPOTLIGHT, {
      next: { revalidate: 86400 },
    });
    const { results } = await raw.json();

    const formatted = await Promise.all(
      results.map(async (item: ISpotlight) => {
        const { malID, alID } = await getItem(item.id);

        return {
          ...item,
          id: `${item.id.split("-").slice(0, -1).join("-")}-m${malID}_a${alID}`,
        };
      }),
    );

    return <Spotlight items={formatted} />;
  } catch (error) {
    console.error("[SpotlightFormatter] Error processing spotlight", error);
    return <>Banana</>;
  }
}

async function getItem(id: string) {
  const req = await fetch(`${SOURCE_API.HIANIME.INFO}id=${id}`, {
    next: { revalidate: 86400 },
  });
  const { malID, alID } = await req.json();

  return { malID, alID };
}
