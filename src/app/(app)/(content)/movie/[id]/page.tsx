import { CarouselSkeleton } from "@/components/app/carousel-skeleton";
import { ContentHead } from "@/app/(app)/(content)/_components/content-head";
import { MediaBackground } from "@/app/(app)/(content)/_components/media-background";
import { tmdbClient } from "@/tmdb/client";
import { cache, Suspense } from "react";
import { notFound } from "next/navigation";
import {
  CustomCarousel,
  CustomCarouselItem,
} from "@/components/app/custom-carousel";
import { Metadata } from "next";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 3600;

const getMovie = cache(async (movieId: number) => {
  const movie = await tmdbClient
    .GET("/movie/{movie_id}", {
      params: {
        path: {
          movie_id: movieId,
        },
      },
    })
    .then((res) => res.data);

  if (!movie) {
    return notFound();
  }

  return movie;
});

const getMovieVideos = cache(async (movieId: number) => {
  return await tmdbClient
    .GET("/movie/{movie_id}/videos", {
      params: {
        path: {
          movie_id: movieId,
        },
      },
    })
    .then((res) => res.data);
});

const getMovieRecommendations = cache(async (movieId: number) => {
  return await tmdbClient
    .GET("/movie/{movie_id}/recommendations", {
      params: {
        path: {
          movie_id: movieId,
        },
      },
    })
    .then((res) => res.data);
});

const getMovieCredits = cache(async (movieId: number) => {
  return await tmdbClient
    .GET("/movie/{movie_id}/credits", {
      params: {
        path: {
          movie_id: movieId,
        },
      },
    })
    .then((res) => res.data);
});
const getMovieCollection = cache(async (collectionId: number | undefined) => {
  if (collectionId === undefined) return undefined;

  return await tmdbClient
    .GET("/collection/{collection_id}", {
      params: {
        path: {
          collection_id: collectionId,
        },
      },
    })
    .then((res) => res.data);
});

async function CastCarousel({
  movieId,
  movieTitle,
}: {
  movieId: number;
  movieTitle: string | undefined;
}) {
  const credits = await getMovieCredits(movieId);

  return (
    <CustomCarousel
      key={`cast-${movieId}`}
      container
      title={`${movieTitle}${movieTitle?.endsWith("s") ? "'" : "'s"} Main Cast`}
    >
      {credits?.cast?.slice(0, 15).map((person) => (
        <CustomCarouselItem
          id={person.cast_id}
          key={person.credit_id}
          href={`/person/${person.id}`}
          // linkReplace
          poster_path={person.profile_path}
          poster_type="profile"
          title={`${person.name}`}
          subtitle={person.character}
        />
      ))}
    </CustomCarousel>
  );
}

async function CollectionCarousel({ collectionId }: { collectionId: number }) {
  const collection = await getMovieCollection(collectionId);

  return (
    <CustomCarousel
      key={`collection-${collectionId}`}
      container
      title={collection?.name}
    >
      {collection?.parts
        ?.sort(
          (a, b) =>
            new Date(a.release_date ?? "").getTime() -
            new Date(b.release_date ?? "").getTime()
        )
        // .slice(0, MAX_CAROUSEL_ITEMS)
        ?.map((movie) => (
          <CustomCarouselItem
            id={movie.id}
            key={movie.id}
            href={`/movie/${movie.id}`}
            poster_path={movie.poster_path}
            poster_type="poster"
            title={movie.title ?? ""}
            rating={movie.vote_average}
            clean
          />
        ))}
    </CustomCarousel>
  );
}

async function RecommendationsCarousel({ movieId }: { movieId: number }) {
  const recommendations = await getMovieRecommendations(movieId);

  return (
    <CustomCarousel
      key={`recommendations-${movieId}`}
      container
      title="You should try:"
    >
      {recommendations?.results
        .sort((a, b) => b.popularity - a.popularity)
        // .slice(0, MAX_CAROUSEL_ITEMS)
        .map((movie) => (
          <CustomCarouselItem
            id={movie.id}
            key={movie.id}
            href={`/movie/${movie.id}`}
            poster_path={movie.poster_path}
            poster_type="poster"
            title={movie.title ?? ""}
            rating={movie.vote_average}
            clean
          />
        ))}
    </CustomCarousel>
  );
}

async function MediaComponent({
  movie,
}: {
  movie: Awaited<ReturnType<typeof getMovie>>;
}) {
  const videos = await getMovieVideos(movie.id);

  return (
    <MediaBackground
      poster_path={movie.poster_path}
      backdrop_path={movie.backdrop_path}
      video={videos}
      title={movie.title}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  return {
    title: movie.title + " | Movie Index",
    description: movie.overview + " | Movie Index",
    openGraph: {
      title: movie.title + " | Movie Index",
      description: movie.overview + " | Movie Index",
      images: [`https://image.tmdb.org/t/p/w342/${movie.poster_path}`],
    },
  };
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) return notFound();

  return (
    <div>
      <Suspense>
        <MediaComponent movie={movie} />
      </Suspense>
      <section className="relative bg-transparent">
        <ContentHead
          type="movies"
          title={movie.title}
          overview={movie.overview}
          poster_path={movie.poster_path}
          genres={movie.genres}
          release_date={movie.release_date}
          spoken_languages={movie.spoken_languages}
          status={movie.status}
          vote_average={movie.vote_average}
        />

        <div className="space-y-6 mt-8">
          <Suspense fallback={<CarouselSkeleton container />}>
            <CastCarousel movieId={movie.id} movieTitle={movie.title} />
          </Suspense>

          {movie.belongs_to_collection && (
            <Suspense fallback={<CarouselSkeleton container />}>
              <CollectionCarousel
                collectionId={movie.belongs_to_collection.id}
              />
            </Suspense>
          )}

          <Suspense fallback={<CarouselSkeleton container />}>
            <RecommendationsCarousel movieId={movie.id} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
