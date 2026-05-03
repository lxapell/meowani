import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime Library",
  description:
    "Discover featured anime, trending now, popular this season, all-time favorites, and upcoming anime. Watch free on MeowAni.",
  openGraph: {
    title: "Anime Library | MeowAni",
    description:
      "Discover featured anime, trending now, popular this season, all-time favorites, and upcoming anime.",
    url: "https://meowani.site/library",
  },
  twitter: {
    title: "Anime Library | MeowAni",
    description:
      "Discover featured anime, trending now, popular this season, all-time favorites, and upcoming anime.",
  },
  alternates: {
    canonical: "https://meowani.site/library",
  },
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
