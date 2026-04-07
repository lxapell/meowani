import * as React from "react";

import { SpotlightComponent } from "./spotlight";
import { SpotlightSkeleton } from "@/components/custom/spotlight";

export default function LibraryPage() {
  return (
    <div className="min-w-0 flex flex-1 flex-col pt-0 overflow-x-hidden">
      <React.Suspense fallback={<SpotlightSkeleton />}>
        <SpotlightComponent />
      </React.Suspense>
      {/*<ScrollBar />*/}
    </div>
  );
}
