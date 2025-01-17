"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

export function NavLink({
  Icon,
  href,
  text,
  exact,
  className
}: {
  Icon: JSX.Element;
  href: string;
  text: string;
  exact?: boolean;
  className?: string
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      prefetch
      href={href}
      className={
        cn(
          "select-none h-10 px-4 py-2 rounded-md transition-colors flex gap-2 items-center hover:bg-foreground/[15%] aria-[disabled]:pointer-events-none aria-[disabled]:opacity-50 disabled:pointer-events-none disabled:opacity-50",
          className,
          active && "bg-foreground/10"
        )
      }
    >
      {Icon}
      <span className="max-md:hidden">{text}</span>
    </Link>
  );
}