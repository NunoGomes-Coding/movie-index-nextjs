import { CarouselSkeleton } from "@/components/app/carousel-skeleton";
import { ScrollToTop } from "@/components/app/scroll-to-top";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="relative bg-transparent">
      <ScrollToTop />
      <div className="h-screen bg-transparent" />
      <div className="flex gap-8 container max-md:-mt-[20rem] -mt-[26rem]">
        <Skeleton className="max-md:hidden rounded-lg w-auto h-[350px] select-none aspect-[2/3] object-cover" />

        <div className="space-y-4 w-full md:w-[60%]">
          <Skeleton className="font-semibold w-2/3 h-[60px]" />
          <div className="flex flex-wrap items-center gap-2 font-semibold text-foreground text-sm">
            <Skeleton className="w-32 h-7" />
            <Skeleton className="w-14 h-7" />
          </div>
          <Skeleton className="w-[60px] h-7" />
          <div className="flex gap-2">
            <Skeleton className="w-20 h-7" />
            <Skeleton className="w-16 h-7" />
          </div>
          <div className="space-y-3 *:h-7">
            <Skeleton className="w-full" />
            <Skeleton className="w-full" />
            <Skeleton className="w-full" />
            <Skeleton className="w-1/2" />
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-8">
        <CarouselSkeleton container />
      </div>
    </section>
  );
}
