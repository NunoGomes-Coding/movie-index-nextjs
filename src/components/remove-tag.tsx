// "use client"

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { memo } from "react";

export const ClickableTag = memo(function ClickableTag({
  label,
  // onRemove,
  className,
  ...props
}: {
  label: string;
  // onRemove: () => void;
} & Omit<ButtonProps, "children">) {
  return (
    <Button
      variant="outline"
      // onClick={onRemove}
      className={cn(
        "rounded-xl px-3 py-1 text-xs bg-secondary/70 text-white h-7",
        className
      )}
      {...props}
    >
      <span>{label}</span>
      <X className="ml-1 size-4" />
    </Button>
  );
});