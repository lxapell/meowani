import Providers from "./providers";
import { Suspense } from "react";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Suspense fallback={<div>Hi</div>}>{children}</Suspense>
    </Providers>
  );
}
