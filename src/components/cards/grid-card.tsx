import { ComponentProps, memo } from "react";
import { RatingBadge } from "../badges/rating-badge";
import { CustomImage } from "../app/custom-image";
import Link from "next/link";

export type GridCardProps = {
  id: number
  media_type: "movie" | "tv" | "person"
  title: string | undefined
  description: string | undefined
  poster_path: ComponentProps<typeof CustomImage>["src"],
  rating: ComponentProps<typeof RatingBadge>["rating"],
}

export const GridCard = memo(function GridCard({id, media_type, title, description, poster_path, rating}: GridCardProps) {
  return (
    <Link
      prefetch
      href={`/${media_type}/${id}`}
      className={
        "size-full flex items-end justify-start p-4 rounded-lg bg-background relative group overflow-hidden aspect-2/3"
      }
      title={title}
    >
      <RatingBadge
        rating={rating}
        className="z-1 absolute top-3 right-3 bg-background/80"
      />
      <CustomImage
        type={media_type === "person" ? "profile" : "poster"}
        size={"w500"}
        src={poster_path}
        alt={title || "poster"}
        className="absolute inset-0 transition-transform duration-300 object-cover w-full"
        dontAnimate
      />
      <div className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 from-background via-background/50 via-40% to-background/0 bg-linear-to-t transform-gpu" />
      <div className="space-y-1 w-full translate-y-0 lg:translate-y-24 transition-transform duration-300 lg:group-hover:translate-y-0 transform-gpu">
        <p className="font-semibold text-lg line-clamp-1">{title}</p>
        <p className={"text-muted-foreground text-md line-clamp-2"}>
          {description}
        </p>
      </div>
    </Link>
  );
});
