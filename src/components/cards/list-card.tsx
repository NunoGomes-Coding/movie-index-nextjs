import { ComponentProps, memo } from "react";
import { GridCardProps } from "./grid-card";
import Link from "next/link";
import { DateBadge } from "../badges/date-badge";
import { CustomImage } from "../app/custom-image";
import { RatingBadge } from "../badges/rating-badge";

export type ListCardProps = Omit<GridCardProps, "poster_path"> & {
  date: ComponentProps<typeof DateBadge>["date"];
  backdrop_path: ComponentProps<typeof CustomImage>["src"];
};

export const ListCard = memo(function ListCard({
  id,
  title,
  description,
  date,
  rating,
  media_type,
  backdrop_path,
}: ListCardProps) {
  return (
    <Link
      prefetch
      href={`/${media_type}/${id}`}
      className={
        "w-full flex gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/90 transition-colors relative group overflow-hidden min-h-fit"
      }
      title={title}
    >
      <CustomImage
        type={"backdrop"}
        size={"w500"}
        src={backdrop_path}
        alt={title || "poster"}
        className="aspect-video min-h-[110px] shrink-0 rounded-lg"
        dontAnimate
      />
      <div className="flex flex-col">
        <div className="space-y-2">
          {/* <Icon className={"size-6"} /> */}
          <p className="font-semibold text-2xl line-clamp-1">{title}</p>
          <div className="flex gap-2 text-sm">
            <DateBadge date={date} />
            <RatingBadge rating={rating} />
          </div>
          <p className={"text-muted-foreground text-md line-clamp-2"}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
});
