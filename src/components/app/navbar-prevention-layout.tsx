import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function NavbarPreventionLayout({
  children,
  className, 
  ...props
}: {
  children: Readonly<React.ReactNode>;
} & ComponentProps<"div"> ) {
  return <div className={cn("pt-24", className)} {...props}>{children}</div>;
}
