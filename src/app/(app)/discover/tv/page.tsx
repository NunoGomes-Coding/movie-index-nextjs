import type { SearchParams } from "nuqs/server";
import { exploreQueryParamsCache } from "../query-params";
import { tmdbClient } from "@/tmdb/client";
import { Suspense } from "react";
import {
  ExploreResults,
  ExploreResultsSkeleton,
} from "../_components/discover-components";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

export const dynamic = "force-dynamic"

type SortBy =
  | "first_air_date"
  | "first_air_date"
  | "name"
  | "name"
  | "original_name"
  | "original_name"
  | "popularity"
  | "popularity"
  | "vote_average"
  | "vote_average"
  | "vote_count"
  | "vote_count";

async function getDiscoverFeed() {
  const params = exploreQueryParamsCache.all();
  return await tmdbClient
    .GET("/discover/tv", {
      params: {
        query: {
          page: params.page < 1 ? 1 : params.page,
          sort_by: `${params.sortBy as SortBy}.${params.sortDirection}`,
          "vote_average.gte": 5, // Min rating 7
          "vote_average.lte": 9.0, // Max rating 9.5
          "vote_count.gte": 1000, // Avoid obscure movies
          include_adult: false, // Avoid adult content
          with_genres: params.genres.map((genre) => String(genre)).join(","),
        },
      },
    })
    .then((res) => res.data);
}

async function Component() {
  const data = await getDiscoverFeed();

  if (!data?.results || data.results.length === 0)
    return <h1 className="mt-3 text-xl">No items Found!</h1>;

  return (
    <>
      <ExploreResults type="tv" results={data?.results} />
      <div className="flex justify-center w-full">
        <PaginationWithLinks
          page={data.page}
          pageSize={20}
          totalCount={
            data.total_results / 20 > 500 ? 500 * 20 : data.total_results
          }
          // totalPageCount={Math.min(data.total_pages, 500)}
        />
      </div>
    </>
  );
}

export default async function DiscoverMoviesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await exploreQueryParamsCache.parse(searchParams);

  return (
    <Suspense fallback={<ExploreResultsSkeleton />}>
      <Component />
    </Suspense>
  );
}
