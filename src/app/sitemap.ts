import type { MetadataRoute } from "next";
import { brand, navigation } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = navigation.map((item) => ({
    url: new URL(item.href, brand.siteUrl).toString(),
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    {
      url: new URL("/epyxdermaadmin", brand.siteUrl).toString(),
      lastModified: new Date(),
    },
  ];
}
