import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/$",
        "/assets/*",
        "/library",
        "/library/anime/*",
        "/library/watch/*",
        "/browse",
      ],
      disallow: "/",
    },
    sitemap: "https://meowani.site/sitemap.xml",
  };
}
