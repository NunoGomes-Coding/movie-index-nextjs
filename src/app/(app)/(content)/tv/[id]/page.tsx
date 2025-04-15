import { CarouselSkeleton } from "@/components/app/carousel-skeleton";
import { ContentHead } from "@/app/(app)/(content)/_components/content-head";
import { MediaBackground } from "@/app/(app)/(content)/_components/media-background";
// import { NavbarPreventionLayout } from "@/components/app/navbar-prevention-layout";
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

const getTv = cache(async (tvId: number) => {
  const tv = await tmdbClient
    .GET("/tv/{series_id}", {
      params: {
        path: {
          series_id: tvId,
        },
      },
    })
    .then((res) => res.data);

  if (!tv) {
    return notFound();
  }

  return tv;
});

const getTvVideos = cache(async (tvId: number) => {
  return await tmdbClient
    .GET("/tv/{series_id}/videos", {
      params: {
        path: {
          series_id: tvId,
        },
      },
    })
    .then((res) => res.data);
});

const getTvRecommendations = cache(async (tvId: number) => {
  return await tmdbClient
    .GET("/tv/{series_id}/recommendations", {
      params: {
        path: {
          series_id: tvId,
        },
      },
    })
    .then((res) => res.data);
});

const getTvCredits = cache(async (tvId: number) => {
  return await tmdbClient
    .GET("/tv/{series_id}/credits", {
      params: {
        path: {
          series_id: tvId,
        },
      },
    })
    .then((res) => res.data);
});

async function CastCarousel({
  tvId,
  tvTitle,
}: {
  tvId: number;
  tvTitle: string | undefined;
}) {
  const credits = await getTvCredits(tvId);

  return (
    <CustomCarousel
      key={`cast-${tvId}`}
      container
      title={`${tvTitle}${tvTitle?.endsWith("s") ? "'" : "'s"} Main Cast`}
    >
      {credits?.cast?.slice(0, 15).map((person) => (
        <CustomCarouselItem
          id={person.id}
          key={person.credit_id}
          href={`/person/${person.id}`}
          // linkReplace
          poster_path={person.profile_path}
          poster_type="profile"
          title={person.name ?? ""}
          subtitle={person.character}
        />
      ))}
    </CustomCarousel>
  );
}

async function RecommendationsCarousel({ tvId }: { tvId: number }) {
  const recommendations = await getTvRecommendations(tvId);

  return (
    <CustomCarousel
      key={`recommendations-${tvId}`}
      container
      title="You should try:"
    >
      {recommendations?.results
        ?.sort((a, b) => b.popularity - a.popularity)
        // .slice(0, MAX_CAROUSEL_ITEMS)
        .map((tv) => (
          <CustomCarouselItem
            id={tv.id}
            key={tv.id}
            href={`/tv/${tv.id}`}
            poster_path={tv.poster_path}
            poster_type="poster"
            title={tv.name ?? ""}
            rating={tv.vote_average}
            clean
          />
        ))}
    </CustomCarousel>
  );
}

async function SeasonsCarousel({tv}: {tv: Awaited<ReturnType<typeof getTv>>}) {
  return <CustomCarousel title="Seasons" container>
  {tv.seasons?.map((season) => (
    <CustomCarouselItem
      key={season.id}
      id={season.id}
      title={season.name ?? ""}
      poster_path={season.poster_path}
      poster_type="poster"
      // linkReplace
      rating={season.vote_average}
    />
  ))}
</CustomCarousel>
}

async function MediaComponent({
  movie,
}: {
  movie: Awaited<ReturnType<typeof getTv>>;
}) {
  const videos = await getTvVideos(movie.id);

  return (
    <MediaBackground
      poster_path={movie.poster_path}
      backdrop_path={movie.backdrop_path}
      video={videos}
      title={movie.name}
    />
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: number }> },
): Promise<Metadata> {
  const { id } = await params;
  const movie = await getTv(id);

  return {
    title: movie.name + " | Movie Index",
    description: movie.overview + " | Movie Index",
    openGraph: {
      title: movie.name + " | Movie Index",
      description: movie.overview + " | Movie Index",
      images: [`https://image.tmdb.org/t/p/w342/${movie.poster_path}`],
    },
  };
}


export default async function Movie({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const tv = await getTv(id);

  if (!tv) return notFound();

  return (
    <div>
      <Suspense>
        <MediaComponent movie={tv} />
      </Suspense>
      <section className="relative bg-transparent">
        <ContentHead
          type="tv"
          title={tv.name}
          overview={tv.overview}
          poster_path={tv.poster_path}
          genres={tv.genres}
          release_date={tv.first_air_date}
          spoken_languages={tv.spoken_languages}
          status={tv.status}
          vote_average={tv.vote_average}
        />

        <div className="space-y-6 mt-8">
          <Suspense fallback={<CarouselSkeleton container />}>
            <SeasonsCarousel tv={tv} />
          </Suspense>

          <Suspense fallback={<CarouselSkeleton container />}>
            <CastCarousel tvId={tv.id} tvTitle={tv.name} />
          </Suspense>

          <Suspense fallback={<CarouselSkeleton container />}>
            <RecommendationsCarousel tvId={tv.id} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
