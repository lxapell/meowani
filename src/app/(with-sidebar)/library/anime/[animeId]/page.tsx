import { AnimeInfoBanner, AnimeInfoTabs } from "@/components/custom/anime-info";

import { anilistRequest } from "@/lib/anilist/client";
import { animeInfo } from "@/constants/anilist/queries";

// const raw = await anilistRequest(animeInfo, { id: 180745 });
// const mapped = raw.Media.characters.edges.map((character) => {
//   const voiceActor = character.voiceActorRoles.map((actor) =>
//     console.log({
//       id: actor.voiceActor.id,
//       name: actor.voiceActor.name.userPreferred,
//       image: actor.voiceActor.image.large,
//     }),
//   );
//   return {
//     id: character.id,
//     role: character.role,
//     name: character.node.name.userPreferred,
//     image: character.node.image.large,
//     voiceActor: voiceActor,
//   };
// });
// console.log(mapped);

export default function Page() {
  return (
    <div className="flex flex-1 flex-col pt-0 gap-5 overflow-auto">
      <AnimeInfoBanner />
      <AnimeInfoTabs />
    </div>
  );
}
