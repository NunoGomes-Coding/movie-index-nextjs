"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type MediaPlayerInstance,
  useMediaRemote,
  useMediaState,
  MediaPlayer,
  MediaProvider,
} from "@vidstack/react";
import { memo, useRef, useEffect, type ComponentProps } from "react";
import type { videosType } from "./media-background";
import { Maximize } from "lucide-react";
import { defaultLayoutIcons, DefaultVideoLayout } from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import '@vidstack/react/player/styles/default/layouts/video.css';

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

export const Player = memo(function Player({
  video,
  title
}: {
  video: videosType | undefined;
  title: string | undefined
}) {
  const player = useRef<MediaPlayerInstance>(null);
  const remote = useMediaRemote(player);
  const isFullscreen = useMediaState("fullscreen", player);
  // const firstTimeFullscreen = useRef<boolean>(false);

  const onFullscreenChange = (isFullscreen: boolean) => {
    if (isFullscreen) {
      // if (firstTimeFullscreen.current === false) {
      //   firstTimeFullscreen.current = true;
      //   remote.seek(0);
      // }
      remote.unmute();
    } else {
      remote.mute();
      remote.play()
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const onFocus = () => {
      remote.play();
    };

    const onBlur = () => {
      remote.pause();
    };

    window.addEventListener("focus", onFocus, { passive: true });
    window.addEventListener("blur", onBlur, { passive: true });

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!video) return null;

  const trailer = GetTrailer(video.results);

  return (
    <>
      <FullscreenButton onClick={() => remote.enterFullscreen()} />
      <MediaPlayer
        ref={player}
        playsInline
        title={title}
        src={trailer}
        load="idle"
        posterLoad="custom"
        autoPlay
        muted
        // loop
        className={cn(
          !isFullscreen &&
            "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none min-w-full min-h-screen opacity-0 data-playing:opacity-100 transition-opacity duration-500 w-auto!"
        )}
        onFullscreenChange={onFullscreenChange}
      >
        <MediaProvider />
        {isFullscreen && (
          <DefaultVideoLayout icons={defaultLayoutIcons} />
        )}
      </MediaPlayer>
    </>
  );
});

const MAX_SCROLL = 275;

function FullscreenButton(props: ComponentProps<typeof Button>) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const opacity = window.scrollY < MAX_SCROLL ? 1 : 0;

        buttonRef.current.style.opacity = String(opacity);
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
    <div className="container fixed z-[1000] top-24 left-0 right-0 w-full">
      <Button
        ref={buttonRef}
        variant="ghost"
        className="float-end transition-all gap-3 flex backdrop-blur-2xl bg-muted/30 hover:bg-foreground/10"
        {...props}
      >
        <span className="capitalize">Watch Trailer</span>
        <Maximize />
      </Button>
    </div>
  );
}
