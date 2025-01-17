import { Clock } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
}: { status: string | undefined } & Pick<ComponentProps<"div">, "className">) {
  if (status?.toLowerCase() === "released") return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-cyan-700/50 px-2 py-1 rounded-md w-fit text-sm",
        className
      )}
    >
      <Clock className="size-4" />
      <span>{status}</span>
    </div>
  );
}