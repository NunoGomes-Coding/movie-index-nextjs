import { CarouselSkeleton } from "@/components/app/carousel-skeleton";
import {
  CustomCarousel,
  CustomCarouselItem,
} from "@/components/app/custom-carousel";
import { CustomImage } from "@/components/app/custom-image";
import { NavbarPreventionLayout } from "@/components/app/navbar-prevention-layout";
import { getImageUrl } from "@/lib/build-image-url";
import { tmdbClient } from "@/tmdb/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

const getPerson = cache(async (id: number) => {
  const person = await tmdbClient
    .GET("/person/{person_id}", {
      params: {
        path: {
          person_id: id,
        },
      },
    })
    .then((res) => res.data);

  if (!person) return notFound();

  return person;
});

const getPersonMovieCredits = cache(async (id: number) => {
  return await tmdbClient
    .GET("/person/{person_id}/movie_credits", {
      params: {
        path: {
          person_id: id,
        },
      },
    })
    .then((res) => res.data?.cast);
});

const getPersonTvCredits = cache(async (id: number) => {
  return await tmdbClient
    .GET("/person/{person_id}/tv_credits", {
      params: {
        path: {
          person_id: id,
        },
      },
    })
    .then((res) => res.data?.cast);
});

const MoviesCarousel = cache(
  async ({
    personId,
    personName,
  }: {
    personId: number;
    personName: string | undefined;
  }) => {
    const movies = await getPersonMovieCredits(personId);
    return (
      <CustomCarousel title={`Movies featuring ${personName}`} container>
        {movies
          ?.sort((a, b) => b.popularity - a.popularity)
          .slice(0, 15)
          .map((movie) => (
            <CustomCarouselItem
              id={movie.id}
              key={movie.id}
              href={`/movie/${movie.id}`}
              poster_path={movie.poster_path}
              title={movie.title ?? ""}
              subtitle={movie.character}
              rating={movie.vote_average}
              poster_type="poster"
            />
          ))}
      </CustomCarousel>
    );
  }
);
const TvCarousel = cache(
  async ({
    personId,
    personName,
  }: {
    personId: number;
    personName: string | undefined;
  }) => {
    const tvs = await getPersonTvCredits(personId);

    const seen = new Set<number>();
    const uniqueTvs = tvs?.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
    return (
      <CustomCarousel title={`TV Shows featuring ${personName}`} container>
        {uniqueTvs
          ?.sort((a, b) => b.popularity - a.popularity)
          .slice(0, 15)
          .map((tv) => (
            <CustomCarouselItem
              id={tv.id}
              key={tv.id}
              href={`/tv/${tv.id}`}
              poster_path={tv.poster_path}
              title={tv.name ?? ""}
              subtitle={tv.character}
              rating={tv.vote_average}
              poster_type="poster"
            />
          ))}
      </CustomCarousel>
    );
  }
);

function ContentHead({
  person,
}: {
  person: Awaited<ReturnType<typeof getPerson>>;
}) {
  return (
    <div className="pt-4">
      <div className="md:hidden container relative">
        <h1 className="text-center text-3xl font-semibold">{person.name}</h1>
        <h4 className="text-center text-lg text-muted-foreground mb-2">
          {person.birthday}
          {person.deathday ? " - " + person.deathday : ""} &middot;{" "}
          {person.place_of_birth}
        </h4>
      </div>
      <div className="px-6 md:pb-8 md:pt-4 flex flex-col">
        <div className="xl:flex container z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            // type="profile"
            // size="w45"
            loading="eager"
            src={getImageUrl(person?.profile_path, "profile", "w342")}
            alt=""
            className="max-h-[350px] max-md:max-w-[45%] object-cover size-auto rounded-lg select-none aspect-2/3 max-xl:float-left mr-4 md:mr-6 mb-2"
          />
          <div className="block md:pr-2">
            <h1 className="max-md:hidden text-3xl font-semibold">
              {person.name}
            </h1>
            <h4 className="max-md:hidden text-lg text-muted-foreground mb-2">
              {person.birthday}
              {person.deathday ? " - " + person.deathday : ""} &middot;{" "}
              {person.place_of_birth}
            </h4>
            <p className="text-justify text-lg mb-4">{person.biography}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<Metadata> {
  const { id } = await params;
  const person = await getPerson(id);

  return {
    title: person.name + " | Movie Index",
    description: "Biography of " + person.name + " | Movie Index",
    openGraph: {
      title: person.name + " | Movie Index",
      description: "Biography of " + person.name + " | Movie Index",
      images: [`https://image.tmdb.org/t/p/w342/${person.profile_path}`],
    },
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const person = await getPerson(id);

  return (
    <NavbarPreventionLayout>
      <CustomImage
        type="profile"
        size="w342"
        src={person?.profile_path}
        alt={""}
        className="fixed inset-0 object-cover object-center h-screen w-screen brightness-[0.25] select-none pointer-events-none -z-10"
      />
      <div className="fixed inset-0 size-full backdrop-blur-3xl bg-linear-to-t from-background to-transparent via-30% to-50% select-none pointer-events-none z-0" />
      <ContentHead person={person} />
      <div className="space-y-10">
        <Suspense fallback={<CarouselSkeleton container />}>
          <MoviesCarousel personId={id} personName={person?.name} />
        </Suspense>
        <Suspense fallback={<CarouselSkeleton container />}>
          <TvCarousel personId={id} personName={person?.name} />
        </Suspense>
      </div>
    </NavbarPreventionLayout>
  );
}
