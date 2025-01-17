import { tmdbClient } from "@/tmdb/client";
import { ExplorePageMainCarousel } from "./_components/explorePageCarousel";
import { cache } from "react";
import {
  CustomCarousel,
  CustomCarouselItem,
} from "@/components/app/custom-carousel";
import { ExplorePageMainCarouselItems } from "./_components/explorePageCarouselItem";

const getTrendingMovies = cache(async () => {
  return await tmdbClient
    .GET("/trending/movie/{time_window}", {
      params: {
        path: {
          time_window: "week",
        },
      },
    })
    .then((res) => res.data);
});
const getNowPlayingMovies = cache(async () => {
  return await tmdbClient.GET("/movie/now_playing").then((res) => res.data);
});
const getTopRatedMovies = cache(async () => {
  return await tmdbClient.GET("/movie/top_rated").then((res) => res.data);
});
const getTopRatedTvs = cache(async () => {
  return await tmdbClient.GET("/tv/top_rated").then((res) => res.data);
});

export default async function Explore() {
  const [trendingMovies, nowPlayingMovies, topRatedMovies, topRatedTvs] =
    await Promise.all([
      getTrendingMovies(),
      getNowPlayingMovies(),
      getTopRatedMovies(),
      getTopRatedTvs(),
    ]);

  return (
    <>
      <section>
        <ExplorePageMainCarousel numItems={trendingMovies?.results?.length ?? 0}>
          <ExplorePageMainCarouselItems trendingMovies={trendingMovies} />
        </ExplorePageMainCarousel>
      </section>
      <section className="relative max-sm:-mt-16 -mt-24 lg:-mt-40 space-y-6">
        <CustomCarousel container title="In Theaters">
          {nowPlayingMovies?.results?.map((movie) => (
            <CustomCarouselItem
              key={movie.id}
              id={movie.id}
              title={movie.title ?? ""}
              poster_path={movie.poster_path}
              poster_type="profile"
              href={`/movie/${movie.id}`}
              rating={movie.vote_average}
              clean
            />
          ))}
        </CustomCarousel>
        <CustomCarousel container title="Top Rated Movies">
          {topRatedMovies?.results?.map((movie) => (
            <CustomCarouselItem
              key={movie.id}
              id={movie.id}
              title={movie.title ?? ""}
              poster_path={movie.poster_path}
              poster_type="profile"
              href={`/movie/${movie.id}`}
              rating={movie.vote_average}
              clean
            />
          ))}
        </CustomCarousel>
        <CustomCarousel container title="Top Rated TV Shows">
          {topRatedTvs?.results?.map((tv) => (
            <CustomCarouselItem
              key={tv.id}
              id={tv.id}
              title={tv.name ?? ""}
              poster_path={tv.poster_path}
              poster_type="profile"
              href={`/tv/${tv.id}`}
              rating={tv.vote_average}
              clean
            />
          ))}
        </CustomCarousel>
      </section>
    </>
  );
}
