import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextClean,
  CarouselPreviousClean,
} from "../ui/carousel";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RatingBadge } from "../badges/rating-badge";
import { CustomImage } from "./custom-image";
import { Children, ComponentProps, ReactNode } from "react";

type ViewMore =
  | ({
      viewMore?: boolean;
    } & { viewMore: true; viewMoreUrl: string })
  | { viewMore?: false; viewMoreUrl?: undefined };

// type PrefetchBackdrop =
//   | ({ prefetchBackdrop?: boolean } & {
//       prefetchBackdrop?: true;
//       backdrop_path?: string;
//     })
//   | { prefetchBackdrop?: false; backdrop_path?: undefined };

export function CustomCarousel({
  children,
  title,
  ...props
}: {
  children: React.ReactNode;
  container?: boolean;
  title?: string;
} & ViewMore) {
  const count = Children.count(children);

  return (
    <Carousel
      opts={{
        dragFree: true,
        // skipSnaps: true,
        // duration: 30,
        // align: "start",
      }}
      orientation="horizontal"
    >
      <div
        className={cn(
          "flex justify-between items-center mb-2 gap-4",
          !title && "justify-end",
          props.container && "container"
        )}
      >
        {title && <h2 className="text-3xl md:text-4xl">{title}</h2>}
        {/* <div className="flex gap-4 items-center flex-wrap">
          <ViewMoreLink className="max-sm:hidden" to={"/discover/movies"} /> */}
        <div className="flex">
          <CarouselPreviousClean className="bg-muted/60 border-none size-9 rounded-none rounded-tl-xl rounded-bl-xl" />
          <CarouselNextClean className="bg-muted/60 border-none size-9 rounded-none rounded-tr-xl rounded-br-xl" />
        </div>
      </div>
      {/* </div> */}
      {count > 0 ? (
        <CarouselContent
          className={cn(
            "gap-2 rounded-lg",
            props.container && "container m-0 mx-auto"
          )}
        >
          {children}
        </CarouselContent>
      ) : (
        <div className="mx-auto h-60 md:h-72 flex items-center text-xl">No items to be displayed</div>
      )}
    </Carousel>
  );
}

export function CustomCarouselItem(props: {
  id: string | number;
  title: string;
  subtitle?: string | number;
  poster_path: string | undefined;
  poster_type: "poster" | "profile";
  href?: ComponentProps<typeof Link>["href"];
  clean?: boolean;
  rating?: number;
}) {
  return (
    <CarouselItem
      key={`carousel-item-${props.id}`}
      className="bg-transparent lg:max-w-52 sm:max-w-48 max-w-44 select-none aspect-[2/3]"
    >
      <CustomCarouselItemContent
        id={props.id}
        title={props.title}
        href={props.href}
      >
        {props.rating && (
          <RatingBadge
            rating={props.rating}
            className="z-20 absolute top-3 right-3 bg-background/80"
          />
        )}
        <CustomImage
          type={props.poster_type}
          size={"w342"}
          src={props.poster_path}
          alt={props.title || "poster"}
          className={
            "group-hover:scale-[1.035] absolute inset-0 transition-transform duration-300 object-cover scale-1 size-full"
          }
        />
        <div
          className={cn(
            "absolute inset-0",
            !props.clean &&
              "from-background/80 via-background/30 via-30% to-background/0 bg-gradient-to-t",
            props.clean && "bg-black/10"
          )}
        />
        <div className={cn("z-10 space-y-1 w-full", props.clean && "hidden")}>
          <p className="max-w-[90%] font-semibold text-xl truncate">
            {props.title}
          </p>
          <p
            className={cn(
              "text-foreground/70 text-lg truncate",
              props.subtitle === undefined && "hidden"
            )}
          >
            {props.subtitle}
          </p>
        </div>
      </CustomCarouselItemContent>
    </CarouselItem>
  );
}

function CustomCarouselItemContent({
  children,
  ...props
}: {
  id: string | number;
  title: string;
  href?: ComponentProps<typeof Link>["href"];
  children: ReactNode;
}) {
  if (props.href) {
    return (
      <Link
        // onMouseOver={prefetchImage}
        // onFocus={prefetchImage}
        prefetch
        href={props.href}
        // preventScrollReset={!props.href || !!props.preventScroll}
        // replace={props.linkReplace}
        className={cn(
          "size-full flex items-end justify-start p-4 rounded-lg bg-background relative group overflow-hidden active:cursor-grabbing aspect-[2/3]",
          !props.href && "cursor-grab"
        )}
        title={props.title}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className="size-full flex items-end justify-start p-4 rounded-lg bg-background relative group overflow-hidden active:cursor-grabbing aspect-[2/3] cursor-grab"
      title={props.title}
    >
      {children}
    </div>
  );
}
