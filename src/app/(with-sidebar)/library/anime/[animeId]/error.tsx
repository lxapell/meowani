"use client";

import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import FooterClient from "@/components/custom/footer.wrapper";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function InfoErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="min-w-0 max-h-dvh overflow-x-hidden overflow-y-scroll flex flex-1 flex-col pt-0 gap-5 overflow-auto">
      <div className="md:mt-15 px-1.5 md:px-6 lg:px-12 xl:px-14">
        <Item
          variant="outline"
          className="border-amber-500/90 bg-orange-500/10 px-3 py-1.5 text-sm text-foreground/80"
        >
          <ItemMedia variant="icon" className="text-amber-500/90">
            <ExclamationTriangleIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="font-medium text-foreground">
              Anime Info Unavailable
            </ItemTitle>
            <ItemDescription>
              {
                "Oops... looks like there won't be any anime info in the meantime."
              }
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>
      <FooterClient />
    </div>
  );
}
