import { Star } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function RatingBadge({
  rating,
  className,
}: { rating: number | undefined } & Pick<ComponentProps<"div">, "className">) {
  if (!rating || rating === 0) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-neutral-700/50 px-2 py-1 rounded-md w-fit text-sm",
        className
      )}
    >
      <Star fill={"#eab308"} className="text-yellow-500 size-4" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}
