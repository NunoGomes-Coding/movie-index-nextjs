"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, List, LayoutGrid } from "lucide-react";
import { memo } from "react";
import { useExploreQueryParams, EXPLORE_PARAMS_DEFAULTS } from "../query-params";
import { PossibleLocationsType } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SortOptions: Record<PossibleLocationsType, Array<[string, string]>> = {
  movies: [
    ["Popularity", "popularity"],
    ["Rating", "vote_average"],
    ["Release Date", "primary_release_date"],
    ["Title", "title"],
  ],
  tv: [
    ["Popularity", "popularity"],
    ["Rating", "vote_average"],
    ["Release Date", "first_air_date"],
    ["Title", "name"],
  ],
} as const;

export const SortByComponent = memo(function SortByComponent({
  contentType,
}: {
  contentType: PossibleLocationsType;
}) {
  const [{ sortBy, sortDirection, view }, setExploreQueryParams] =
    useExploreQueryParams();

  return (
    <div className="flex gap-2">
      <Select
        value={sortBy}
        onValueChange={(val) =>
          setExploreQueryParams({
            sortBy: val,
            page: EXPLORE_PARAMS_DEFAULTS.page,
          })
        }
        defaultValue="popularity.desc"
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SortOptions[contentType].map(([name, value]) => (
            <SelectItem key={value} value={value}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        size={"icon"}
        variant={"outline"}
        className="aspect-square w-auto"
        onClick={() => {
          setExploreQueryParams({
            sortDirection: sortDirection === "desc" ? "asc" : "desc",
            page: EXPLORE_PARAMS_DEFAULTS.page,
          });
        }}
      >
        <ArrowUp
          className={cn(
            "size-5 h-10 transition-transform rotate-180",
            sortDirection === "asc" && "rotate-0"
          )}
        />
      </Button>
      <Button
        size={"icon"}
        variant={"outline"}
        className="aspect-square w-auto"
        onClick={() => {
          setExploreQueryParams({
            view: view === "grid" ? "list" : "grid",
          });
        }}
      >
        {view === "grid" ? (
          <List className="size-5 h-10" />
        ) : (
          <LayoutGrid className="size-5 h-10" />
        )}
      </Button>
    </div>
  );
});
