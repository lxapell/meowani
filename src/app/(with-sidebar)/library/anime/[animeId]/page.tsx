import { AnimeInfoBanner, AnimeInfoTabs } from "@/components/custom/anime-info";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col pt-0 gap-5">
      <AnimeInfoBanner />
      <AnimeInfoTabs />
    </div>
  );
}
