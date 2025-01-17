import { Calendar } from "lucide-react";
import { ComponentProps } from "react";
import { cn, formatDate } from "@/lib/utils";

export function DateBadge({ date, className }: { date: string | undefined } & Pick<ComponentProps<"div">, "className">) {
  if (!date) return null
  const formattedDate = formatDate(date)
  return (
    <div className={cn("flex items-center gap-2 bg-neutral-700/50 px-2 py-1 rounded-md w-fit", className)}>
      <Calendar className="size-4" />
      <span>{formattedDate}</span>
    </div>
  );
}
