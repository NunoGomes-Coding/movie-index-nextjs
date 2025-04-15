"use client";

import { Suspense, useEffect, useRef } from "react";
import { cn, constrainValue, mapValue } from "@/lib/utils";
import { CustomImage } from "@/components/app/custom-image";

import type { operations } from "@/tmdb/schema";

import { Player } from "./video-player";

export type videosType =
  | operations["movie-videos"]["responses"]["200"]["content"]["application/json"]
  | operations["tv-series-videos"]["responses"]["200"]["content"]["application/json"];

const MIN_SCROLL = 0;
const MAX_SCROLL = 325;
const MIN_BLUR = 0;
const MAX_BLUR = 55;

export function MediaBackground({
  backdrop_path,
  poster_path,
  video,
  title
}: {
  backdrop_path: string | undefined;
  poster_path?: string | undefined;
  video?: videosType;
  title: string | undefined
}) {
  // const [scroll, setScroll] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // const handleScroll = () => {
  //   if (window) {
  //     setScroll(window.scrollY);
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      if (overlayRef.current) {
        const amountBlur = mapValue(
          constrainValue(window.scrollY, MIN_SCROLL, MAX_SCROLL),
          MIN_SCROLL,
          MAX_SCROLL,
          MIN_BLUR,
          MAX_BLUR
        );

        overlayRef.current.style.backdropFilter = `blur(${amountBlur}px)`;
      }
    };

    if (window) {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

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
        <Player video={video} title={title} />
      </Suspense>
      <div
        ref={overlayRef}
        className="fixed inset-0 size-full bg-linear-to-t from-background from-20% via-background/50 via-70% to-transparent"
      />
    </section>
  );
}
