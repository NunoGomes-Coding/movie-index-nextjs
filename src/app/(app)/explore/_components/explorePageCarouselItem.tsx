import { CustomImage } from "@/components/app/custom-image";
import { DateBadge } from "@/components/badges/date-badge";
import { RatingBadge } from "@/components/badges/rating-badge";
import {
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { operations } from "@/tmdb/schema";
import Link from "next/link";

export function ExplorePageMainCarouselItems({
  trendingMovies,
}: {
  trendingMovies:
    | operations["trending-movies"]["responses"]["200"]["content"]["application/json"]
    | undefined;
}) {
  // const isMobile = useMediaQuery("(max-width: 768px)");

  if (!trendingMovies) return null;
  return (
    <CarouselContent className="h-[72lvh] max-sm:h-[80lvh] lg:h-screen select-none">
      {trendingMovies?.results?.map((result) => (
        <CarouselItem
          // index={index}
          key={result.id}
          className="data-[active='false']:opacity-50 p-0 transition-opacity duration-300"
        >
          <Link
            prefetch
            href={`/movie/${result.id}`}
            className="relative flex justify-start max-sm:pt-40 max-lg:pt-20 items-center bg-background rounded-xl active:cursor-grabbing overflow-hidden group size-full"
          >
            <CustomImage
              // key={`backdrop-${result.backdrop_path}`}
              type="backdrop"
              // // ?! ORIGINAL LAGS A BIT IN THE CAROUSEL WHEN TRANSITIONING SLIDES
              size="w154"
              src={result.backdrop_path}
              alt=""
              className="object-top absolute inset-0 transition-transform duration-300 object-cover size-full brightness-90"
            />
            {/* <CustomImage
                // key={`poster-${result.poster_path}`}
                type="poster"
                size="w780"
                src={result.poster_path}
                alt=""
                className="object-top absolute inset-0 transition-transform duration-300 object-cover size-full"
              /> */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-60% via-background/40 to-background/0 backdrop-blur-2xl" />
            <div className="z-10 container flex lg:flex-row flex-col justify-start items-center gap-12">
              <CustomImage
                // key={`poster-${result.poster_path}`}
                type="poster"
                size="w500"
                src={result.poster_path}
                alt=""
                className="w-full max-w-72 max-sm:max-w-48 md:max-w-80 aspect-[2/3] h-full rounded-xl"
              />
              <div className="max-lg:pb-36 max-lg:text-center flex flex-col gap-3 lg:gap-5 lg:justify-center lg:h-full">
                <p className="font-semibold text-3xl lg:text-6xl">
                  {result.title}
                </p>
                <p className="max-lg:hidden max-w-[72%] line-clamp-3">{result.overview}</p>
                <div className="flex flex-wrap max-lg:justify-center items-center gap-2 font-semibold text-foreground text-sm">
                  <DateBadge date={result.release_date} />
                  <RatingBadge rating={result.vote_average} />
                </div>
              </div>
            </div>
          </Link>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
