import { tmdbClient } from "@/tmdb/client";
import { cache } from "react";

export const searchAction = cache(async (query: string, page = 1) => {
  return await tmdbClient
    .GET("/search/multi", {
      params: {
        query: {
          query,
          page,
          include_adult: false,
        },
      },
    })
    .then((res) => res.data);
});

