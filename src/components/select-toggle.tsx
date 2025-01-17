import { memo } from "react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const SelectToggle = memo(function SelectToggle({
  isSelected,
  handleSelect,
  className,
  children,
  ...props
}: {
  isSelected: boolean;
  handleSelect: (isSelected: boolean) => void;
} & Omit<ButtonProps, "onClick">) {
  return (
    <Button
      variant="outline"
      onClick={() => handleSelect(isSelected)}
      className={cn(
        "rounded-lg inline-flex justify-between items-center gap-2 px-4 py-2 text-sm w-full text-white",
        className,
        isSelected
          ? "bg-secondary"
          : "bg-transparent hover:bg-secondary/70 transition-colors duration-200 ease-in-out hover:text-white"
      )}
      {...props}
    >
      <div className="flex gap-2 justify-between items-center w-full">
        {children}
        {isSelected && <Check className="size-4" />}
      </div>
    </Button>
  );
});