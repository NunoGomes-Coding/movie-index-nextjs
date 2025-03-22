"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  activeIndex: number;
  onThumbClick: (index: number) => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }
      const selected = api.selectedScrollSnap();
      setActiveIndex(selected);
      api.scrollTo(selected);

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const onThumbClick = React.useCallback(
      (index: number) => {
        if (!api || !api) return;
        api.scrollTo(index);
        api.plugins().autoplay.reset();
      },
      [api]
    );

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
      api?.plugins().autoplay.reset();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
      api?.plugins().autoplay.reset();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          activeIndex,
          onThumbClick,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            "grid gap-2 w-full relative focus:outline-hidden",
            className
          )}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex active:cursor-grabbing cursor-grab",
          // orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          orientation === "vertical" ? "flex-col" : "",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselThumbContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselThumbContainer.displayName = "CarouselThumbContainer";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        // orientation === "vertical" ? "pb-1" : "pr-1",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselIndicator = React.forwardRef<
  HTMLButtonElement,
  { index: number } & React.ComponentProps<typeof Button>
>(({ className, index, ...props }, ref) => {
  const { activeIndex, onThumbClick } = useCarousel();

  const isSlideActive = activeIndex === index;

  return (
    <Button
      ref={ref}
      size="icon"
      className={cn(
        "h-1 w-6 rounded-full flex justify-start",
        "bg-primary/50",
        // "data-[active='false']:bg-primary/50 data-[active='true']:bg-transparent",
        className
      )}
      data-active={isSlideActive}
      onClick={() => onThumbClick(index)}
      {...props}
    >
      <div
        className={cn("max-lg:hidden h-1 bg-white rounded-full", {
          "animate-progress-thumb": isSlideActive,
        })}
      />
      <span className="sr-only">slide {index + 1}</span>
    </Button>
  );
});

CarouselIndicator.displayName = "CarouselIndicator";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <CarouselPreviousClean
      ref={ref}
      className={cn(
        orientation === "horizontal"
          ? "left-0 top-1/2 -translate-y-1/2"
          : "top-0 left-1/2 -translate-x-1/2 rotate-90",
        "absolute rounded-full z-10",
        className
      )}
      {...props}
    />
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselPreviousClean = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("size-8 disabled:pointer-events-none", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPreviousClean.displayName = "CarouselPreviousClean";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <CarouselNextClean
      ref={ref}
      className={cn(
        orientation === "horizontal"
          ? "right-0 top-1/2 -translate-y-1/2"
          : "bottom-0 left-1/2 -translate-x-1/2 rotate-90",
        "absolute rounded-full z-10",
        className
      )}
      {...props}
    />
  );
});
CarouselNext.displayName = "CarouselNext";

const CarouselNextClean = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("size-8 disabled:pointer-events-none", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNextClean.displayName = "CarouselNextClean";

export {
  type CarouselApi,
  useCarousel,
  Carousel,
  CarouselContent,
  CarouselThumbContainer,
  CarouselItem,
  CarouselIndicator,
  CarouselPrevious,
  CarouselNext,
  CarouselPreviousClean,
  CarouselNextClean,
};
