"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

export function MovieIndexIcon(props: React.ComponentProps<"picture">) {
  const prefersReducedMotion = !useMediaQuery(
    "(prefers-reduced-motion: no-preference)"
  );

  if (prefersReducedMotion) {
    return (
      <picture {...props}>
        {/* <source
          srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/emoji.svg"
          type="image/webp"
          className="size-full !aspect-square"
        /> */}
        <img
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/emoji.svg"
          alt="🍿"
          // width="32"
          // height="32"
          className="mb-16 size-full !aspect-square"
        />
      </picture>
    );
  }

  return (
    <picture {...props}>
      <source
        srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/512.webp"
        type="image/webp"
        className="size-full !aspect-square"
      />
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/512.gif"
        alt="🍿"
        width="32"
        height="32"
        className="size-full !aspect-square"
      />
    </picture>
  );
}
