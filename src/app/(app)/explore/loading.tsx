import { CarouselSkeleton } from "@/components/app/carousel-skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <section>
        <div className="h-screen w-[calc(100vw-15px)] flex justify-center items-center">
          <Spinner size="lg" className="z-10" loading />
        </div>
      </section>
      <section className="relative -mt-24 lg:-mt-40 space-y-6">
        <CarouselSkeleton container />
        <CarouselSkeleton container />
        <CarouselSkeleton container />
      </section>
    </>
  );
}
