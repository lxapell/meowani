import { CatalogSearch } from "@/components/custom/catalog-search";

export default function BrowsePage() {
  return (
    <div className="w-full flex flex-col flex-1 px-6 md:px-12 md:pt-16 overflow-y-scroll max-h-screen">
      <CatalogSearch />
    </div>
  );
}
