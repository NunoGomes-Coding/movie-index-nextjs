"use client";

import {
  Carousel,
  CarouselThumbContainer,
  CarouselIndicator,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ReactNode } from "react";

export function ExplorePageMainCarousel({
  children,
  numItems,
}: {
  children: ReactNode;
  numItems: number;
}) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          playOnInit: true,
          delay: 4 * 1000,
          stopOnMouseEnter: false,
          stopOnFocusIn: false,
          stopOnInteraction: false,
        }),
        Fade(),
      ]}
      opts={{
        loop: true,
        duration: 8,
        containScroll: false,
      }}
    >
      {children}
      {/* <CarouselPreviousClean className="bg-background/40 hover:bg-background/50 border-none backdrop-blur-lg size-8" />
      <CarouselNextClean className="bg-background/40 hover:bg-background/50 border-none backdrop-blur-lg size-8" /> */}
      <CarouselThumbContainer className="bottom-48 absolute flex justify-center items-end gap-2 max-lg:hidden px-4 w-full h-fit translate-x-0!">
        {[...Array(numItems)].map((_, index) => (
          <CarouselIndicator
            key={index}
            index={index}
            className="z-20 w-2 data-[active='true']:w-6 hover:bg-white/80 transition-all duration-200"
          />
        ))}
      </CarouselThumbContainer>
    </Carousel>
  );
}
