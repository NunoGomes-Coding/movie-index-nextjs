import { GridCard } from "@/components/cards/grid-card";
import { ListCard } from "@/components/cards/list-card";
import { Skeleton } from "@/components/ui/skeleton";
import { operations } from "@/tmdb/schema";
import { ArrayElement } from "@/types/types";
import { memo, ReactNode } from "react";
import { exploreQueryParamsCache } from "../query-params";

type MovieResultType = ArrayElement<
  operations["discover-movie"]["responses"]["200"]["content"]["application/json"]["results"]
>;

type TVResultType = ArrayElement<
  operations["discover-tv"]["responses"]["200"]["content"]["application/json"]["results"]
>;

const ExploreResultsLayout = memo(function ExploreResultsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const view = exploreQueryParamsCache.get("view");

  if (view === "list")
    return <div className="flex flex-col gap-2 w-full py-4">{children}</div>;

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 py-4">
      {children}
    </div>
  );
});

export const ExploreResultsSkeleton = memo(function ExploreResultsSkeleton() {
  return (
    <ExploreResultsLayout>
      {[...Array(20)].map((_, index) => (
        <Skeleton key={index} className="size-full" />
      ))}
    </ExploreResultsLayout>
  );
});

export const ExploreResults = memo(function ExploreResults({
  results,
  type,
}: {
  results: MovieResultType[] | TVResultType[];
  type: "movie" | "tv";
}) {
  const view = exploreQueryParamsCache.get("view");

  return (
    <ExploreResultsLayout>
      {results?.map((result) => {
        return view === "grid" ? (
          <GridSearchResult
            key={result.id}
            result={{ ...result, media_type: type } as DiscoverResultType}
          />
        ) : (
          <ListSearchResult
            key={result.id}
            result={{ ...result, media_type: type } as DiscoverResultType}
          />
        );
      })}
    </ExploreResultsLayout>
  );
});

export type DiscoverResultType =
  | (MovieResultType & { media_type: "movie" })
  | (TVResultType & { media_type: "tv" });

const ListSearchResult = memo(function SearchResult({
  result,
}: {
  result: DiscoverResultType;
}) {
  const title = result.media_type === "movie" ? result.title : result.name;
  const date =
    result.media_type === "movie" ? result.release_date : result.first_air_date;

  return (
    <ListCard
      id={result.id}
      title={title}
      description={result.overview}
      media_type={result.media_type}
      rating={result.vote_average}
      backdrop_path={result.backdrop_path}
      date={date}
    />
  );
});

const GridSearchResult = memo(function SearchResult({
  result,
}: {
  result: DiscoverResultType;
}) {
  const title = result.media_type === "movie" ? result.title : result.name;

  return (
    <GridCard
      id={result.id}
      title={title}
      description={result.overview}
      media_type={result.media_type}
      rating={result.vote_average}
      poster_path={result.poster_path}
    />
  );
});
