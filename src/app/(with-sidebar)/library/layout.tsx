import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime Library",
  description:
    "Discover featured anime, trending now, popular this season, all-time favorites, and upcoming anime. Watch free on MeowAni.",
  openGraph: {
    title: "Anime Library | MeowAni",
    type: "website",
    siteName: "MeowAni",
    description:
      "Discover featured anime, trending now, popular this season, all-time favorites, and upcoming anime.",
    url: "https://meowani.site/library",
  },
  twitter: {
    title: "Anime Library | MeowAni",
    site: "MeowAni",
    description:
      "Discover featured anime, trending now, popular this season, all-time favorites, and upcoming anime.",
  },
  alternates: {
    canonical: "https://meowani.site/library",
  },
};

/**
 * Layout component that renders its children without adding any wrappers or layout structure.
 *
 * @param children - The page content to render within this layout.
 * @returns The provided `children` React nodes.
 */
export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
