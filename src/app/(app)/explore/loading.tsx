import { CarouselSkeleton } from "@/components/app/carousel-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <section>
        <Skeleton className="h-screen w-screen from-transparent to-muted bg-gradient-to-t" />
      </section>
      <section className="relative -mt-24 lg:-mt-40 space-y-6">
        <CarouselSkeleton container />
        <CarouselSkeleton container />
        <CarouselSkeleton container />
      </section>
    </>
  );
}
