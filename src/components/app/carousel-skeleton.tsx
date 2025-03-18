import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextClean,
  CarouselPreviousClean,
} from "../ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function CarouselSkeleton({
  title,
  container
}: {
  container?: boolean;
  title?: string
}) {
  return (
    <Carousel
      opts={{
        watchDrag: false
        // dragFree: true,
        // skipSnaps: true,
        // duration: 30,
        // align: "start",
      }}
      orientation="horizontal"
    >
      <div className={cn("flex justify-between items-center mb-2 gap-4", container && "container")}>
        {title && <h2 className="text-3xl md:text-4xl">{title}</h2>}
        {!title && <Skeleton className="h-[2.25rem] max-w-[400px] w-full" />}
        {/* <div className="flex gap-4 items-center flex-wrap">
          <ViewMoreLink className="max-sm:hidden" to={"/discover/movies"} /> */}
        <div className="flex">
          <CarouselPreviousClean disabled className="bg-muted/60 border-none size-9 rounded-none rounded-tl-xl rounded-bl-xl" />
          <CarouselNextClean disabled className="bg-muted/60 border-none size-9 rounded-none rounded-tr-xl rounded-br-xl" />
        </div>
      </div>
      {/* </div> */}
      <CarouselContent
        className={cn(
          "gap-2 rounded-lg cursor-default active:cursor-default",
          container && "container m-0 mx-auto"
        )}
      >
        {Array.from({length: 8}).map((_, index) => (
          <CarouselItemSkeleton key={index} />
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export function CarouselItemSkeleton() {
  return (
    <CarouselItem
      // key={`carousel-item-${props.id}`}
      className="bg-transparent lg:max-w-52 sm:max-w-48 max-w-44 select-none aspect-2/3"
    >
      <Skeleton className="size-full rounded-lg" />
    </CarouselItem>
  );
}
