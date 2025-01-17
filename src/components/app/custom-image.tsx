"use client"

import {
  useState,
  type ImgHTMLAttributes,
  useMemo,
  memo,
  useRef,
} from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getImageUrl,
  type ImageSize,
  type ImageType,
} from "@/lib/build-image-url";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type ImageProps<T extends ImageType> = {
  type: T;
  size: ImageSize<T> | "original";
  alt: string;
  dontAnimate?: boolean
} & ImgHTMLAttributes<HTMLImageElement>;

export const CustomImage = memo(InternalCustomImage);

function InternalCustomImage<T extends ImageType>({
  src,
  size,
  type,
  alt,
  className,
  dontAnimate = false,
  ...props
}: ImageProps<T>) {
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null)

  const inView = useInView(ref, {
    rootMargin: "80px",
    threshold: 0,
    triggerOnce: true,
  });

  const url = useMemo(() => getImageUrl(src, type, size), [src, type, size]);

  // useEffect(() => {
  //   setLoading(true);
  // }, [url]);

  const isLoading = !inView ? true : loading;

  return (
    <div
      ref={ref}
      className={cn(
        className,
        "overflow-hidden",
        !(className?.includes("absolute") || className?.includes("fixed")) &&
          "relative"
      )}
    >
      {isLoading && (
        <Skeleton
          style={{
            opacity: loading ? 1 : 0,
            zIndex: loading ? "auto" : -5,
            msTransitionDuration: "500ms",
          }}
          className={cn("absolute inset-0 w-full h-full transition-opacity duration-700", dontAnimate && "animate-none")}
          aria-hidden={loading}
        />
      )}
      {inView && (
        <picture
          style={{ opacity: loading ? 0 : 1 }}
          className="transition-opacity duration-500"
        >
          <img
            key={`image-${src}`}
            src={url}
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
            loading="lazy"
            alt={alt || "Image description"}
            {...props}
          />
        </picture>
      )}
    </div>
  );
}
