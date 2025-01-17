"use client";

import { NavbarPreventionLayout } from "@/components/app/navbar-prevention-layout";
import { ReactNode, useMemo } from "react";
import { SidebarFiltersRoot, SidebarFiltersSheet } from "./_components/filters";
import { SortByComponent } from "./_components/sort-by";
import { PossibleLocationsType } from "./types";
import { usePathname } from "next/navigation";

function GetContentType(pathname: string) {
  return pathname.replace("/discover/", "") as PossibleLocationsType;
}

export default function DiscoverMoviesPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const type = GetContentType(pathname);

  const FiltersRoot = useMemo(
    () => <SidebarFiltersRoot contentType={type} />,
    [type]
  );

  return (
    <NavbarPreventionLayout className="container">
      <div className="flex gap-12">
        <div className="max-h-full overflow-y-auto basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 shrink-0 max-lg:hidden">
          {FiltersRoot}
        </div>
        <div className="flex-1">
          <div className="flex gap-2 flex-wrap justify-between">
            <h1 className="text-2xl">
              Explore {type === "movies" ? "Movies" : "TV Shows"}
            </h1>
            <div className="flex gap-2">
              <SortByComponent contentType={type} />
              <SidebarFiltersSheet>{FiltersRoot}</SidebarFiltersSheet>
            </div>
          </div>
          {children}
        </div>
      </div>
    </NavbarPreventionLayout>
  );
}
