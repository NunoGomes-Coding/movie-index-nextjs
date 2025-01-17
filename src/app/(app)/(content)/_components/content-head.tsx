import { memo } from "react";
import { DateBadge } from "@/components/badges/date-badge";
import { GenreBadge } from "@/components/badges/genre-badge";
import { LanguageBadge } from "@/components/badges/language-badge";
import { RatingBadge } from "@/components/badges/rating-badge";
import { StatusBadge } from "@/components/badges/status-badge";
import { CustomImage } from "@/components/app/custom-image";

type ContentHeadProps = {
  poster_path: string | undefined;
  title: string | undefined;
  overview: string | undefined;
  release_date: string | undefined;
  vote_average: number | undefined;
  status: string | undefined;
  spoken_languages:
    | {
        english_name?: string;
        iso_639_1?: string;
        name?: string;
      }[]
    | undefined;
  genres:
    | {
        id: number;
        name?: string;
      }[]
    | undefined;
  type: "tv" | "movies"
};

export const ContentHead = memo(InternalContentHead);

function InternalContentHead({ ...content }: ContentHeadProps) {
  return (
    <>
      <div className="h-screen bg-transparent" />
      <div className="flex gap-8 container max-md:-mt-[20rem] -mt-[26rem]">
        <CustomImage
          type="poster"
          size="w342"
          loading="eager"
          // key={`poster-${movie.id}`}
          src={content?.poster_path}
          alt=""
          className="max-md:hidden rounded-lg w-auto h-[350px] select-none aspect-[2/3] object-cover"
        />

        <div className="space-y-4 w-full md:w-[60%]">
          <h1 className="font-semibold text-5xl md:text-6xl">
            {content?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 font-semibold text-foreground text-sm">
            <DateBadge date={content.release_date} />
            <RatingBadge rating={content.vote_average} />
            <StatusBadge status={content.status} />
          </div>
          {content.spoken_languages &&
            content.spoken_languages.length !== 0 && (
              <div className="flex flex-wrap items-center gap-2 font-semibold text-foreground text-sm">
                {content.spoken_languages?.map((lang) => (
                  <LanguageBadge
                    lang={lang.iso_639_1}
                    key={lang.iso_639_1}
                    name={lang.english_name}
                  />
                ))}
              </div>
            )}
          {content.genres && content.genres.length !== 0 && (
            <div className="flex flex-wrap gap-2 text-sm">
              {content.genres.map((genre) => (
                <GenreBadge
                  key={`genre-badge-${genre.id}`}
                  id={genre.id}
                  name={genre.name}
                  type={content.type}
                />
              ))}
            </div>
          )}
          <h3 className="text-lg">{content?.overview}</h3>
          <div className="flex gap-2 trailer">
            {/* <Suspense>
                <Await resolve={videos}>
                {({results}) => {
                  if (!results) return null
                  const trailer = GetTrailerFromMovie(results)
                  if (!trailer) return null;
                  return (
                    <TrailerModal
                    movieTitle={movie.title ?? ""}
                    originalMovieTitle={movie.original_title}
                        trailerKey={trailer}
                      />
                      );
                  }}
                </Await>
                </Suspense> */}

            {/* <Button asChild variant={"secondary"}>
                <Link
                to={`https://embed.su/embed${location.pathname}`}
                target="_blank"
                rel="noreferrer"
                >
                <Airplay className="size-[1.125rem] mr-2" /> Watch Movie
                </Link>
                </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}
