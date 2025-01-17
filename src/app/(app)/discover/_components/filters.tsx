"use client";

import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";
import { memo, ReactNode } from "react";
import { useExploreQueryParams } from "../query-params";
import { PossibleLocationsType, GENRES } from "../types";
import { ClickableTag } from "@/components/remove-tag";
import { SelectToggle } from "@/components/select-toggle";

export const SidebarFiltersRoot = memo(function SidebarFiltersRoot({
  contentType,
}: {
  contentType: PossibleLocationsType;
}) {
  const [{ genres: SelectedGenre }, setExploreQueryParams] =
    useExploreQueryParams();

  const selectedGenres = GENRES[contentType].filter((genre) =>
    SelectedGenre?.includes(genre.id)
  );

  const RemoveTagCallback = (id: number) =>
    setExploreQueryParams((prev) => {
      if (!prev.genres) return prev;

      return {
        genres: [...prev.genres.filter((prevGenreId) => prevGenreId !== id)],
      };
    });

  const SelectGenreCallback = (isSelected: boolean, id: number) =>
    setExploreQueryParams((prev) => {
      if (isSelected && prev.genres) {
        return {
          genres: [...prev.genres.filter((prevGenreId) => prevGenreId !== id)],
        };
      }

      return {
        genres: [...(prev.genres ?? []), id],
        page: 1,
      } as typeof prev;
    });

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl">Filters</h3>
          {/* <Button variant={"secondary"} size={"icon"} className="size-8">
            <X className="size-4" />
          </Button> */}
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedGenres.length > 0 &&
            selectedGenres.map((genre) => (
              <ClickableTag
                key={genre.id}
                label={genre.name}
                onClick={() => RemoveTagCallback(genre.id)}
              />
            ))}
        </div>
      </div>
      <Accordion type="single" defaultValue="genres">
        <AccordionItem value="genres">
          <AccordionTrigger>Genres</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {GENRES[contentType].map((genre) => (
              <SelectToggle
                key={genre.id}
                isSelected={selectedGenres.includes(genre)}
                handleSelect={() =>
                  SelectGenreCallback(selectedGenres.includes(genre), genre.id)
                }
              >
                {genre.name}
              </SelectToggle>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
});

export function SidebarFiltersSheet({ children }: { children: ReactNode }) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            variant={"outline"}
            className="aspect-square w-auto"
          >
            <Filter className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetTitle className="hidden" />
          <SheetDescription className="hidden" />
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
