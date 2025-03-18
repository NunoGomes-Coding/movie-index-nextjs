"use client";

import { memo, Suspense, useEffect, useRef, useState } from "react";
import { cn, constrainValue, mapValue } from "@/lib/utils";

import { operations } from "@/tmdb/schema";
import {
  MediaPlayer,
  type MediaPlayerInstance,
  MediaProvider,
  useMediaRemote,
} from "@vidstack/react";

import "@vidstack/react/player/styles/base.css";
import { CustomImage } from "@/components/app/custom-image";

type videosType =
  | operations["movie-videos"]["responses"]["200"]["content"]["application/json"]
  | operations["tv-series-videos"]["responses"]["200"]["content"]["application/json"];

function GetTrailer(
  movieVideos: videosType["results"] | undefined
): string | undefined {
  if (!movieVideos) return undefined;

  const videoTeasersAndTrailers = movieVideos.filter(
    (val) =>
      (val.site === "YouTube" || val.site === "Vimeo") &&
      (val.type === "Trailer" || val.type === "Teaser") &&
      val.official === true &&
      val.key !== undefined
  );
  const video =
    videoTeasersAndTrailers.find((val) => val.type === "Trailer") ??
    videoTeasersAndTrailers[0];

  return video ? `${video.site?.toLowerCase()}/${video.key}` : undefined;
}

export function MediaBackground({
  backdrop_path,
  poster_path,
  video,
}: {
  backdrop_path: string | undefined;
  poster_path?: string | undefined;
  video?: videosType;
}) {
  const [scroll, setScroll] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (window) {
      setScroll(window.scrollY);
    }
  };

  useEffect(() => {
    if (window) {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (overlayRef.current) {
      const minScroll = 0;
      const maxScroll = 325;
      const minBlur = 0;
      const maxBlur = 55;

      const amountBlur = mapValue(
        constrainValue(scroll, minScroll, maxScroll),
        minScroll,
        maxScroll,
        minBlur,
        maxBlur
      );

      overlayRef.current.style.backdropFilter = `blur(${amountBlur}px)`;
    }
  }, [scroll]);

  return (
    <section className="fixed inset-0 h-screen">
      {backdrop_path && (
        <CustomImage
          type="backdrop"
          size="original"
          // key={`backdrop-${backdrop_path}`}
          loading="eager"
          src={backdrop_path}
          alt=""
          className={cn(
            "fixed object-top inset-0 object-cover w-screen h-lvh",
            poster_path && "max-md:hidden"
          )}
        />
      )}
      {poster_path && (
        <CustomImage
          type="poster"
          size="w500"
          loading="eager"
          // key={`poster-${poster_path}`}
          src={poster_path}
          alt={"backdrop"}
          className="fixed object-top inset-0 object-cover w-screen md:hidden h-lvh"
        />
      )}
      <Suspense>
        <Player video={video} />;
      </Suspense>
      <div
        ref={overlayRef}
        className="fixed inset-0 size-full bg-linear-to-t from-background from-20% via-background/50 via-70% to-transparent"
      />
    </section>
  );
}

const Player = memo(function Player({
  video,
}: {
  video: videosType | undefined;
}) {
  const player = useRef<MediaPlayerInstance>(null);
  const remote = useMediaRemote(player);

  const onFocus = () => {
    remote.play();
  };

  const onBlur = () => {
    remote.pause();
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus, { passive: true });
    window.addEventListener("blur", onBlur, { passive: true });

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });

  if (!video) return null;

  const trailer = GetTrailer(video.results);

  return (
    <MediaPlayer
      ref={player}
      // playsInline
      title="youtube-background"
      src={trailer}
      load="idle"
      posterLoad="custom"
      autoPlay
      muted
      // loop
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none min-w-full min-h-screen opacity-0 data-playing:opacity-100 transition-opacity duration-500 w-auto!"
    >
      <MediaProvider />
    </MediaPlayer>
  );
});
