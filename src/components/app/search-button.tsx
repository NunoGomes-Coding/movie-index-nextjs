"use client";

import { ArrowRight, HeartCrack, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { memo, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { RatingBadge } from "../badges/rating-badge";
import { DateBadge } from "../badges/date-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { CustomImage } from "./custom-image";
import { searchAction } from "@/actions/search/search";
import Link from "next/link";
import { ArrayElement } from "@/types/types";
import { operations } from "@/tmdb/schema";

type SearchResultType =
  | (ArrayElement<
      operations["search-tv"]["responses"]["200"]["content"]["application/json"]["results"]
    > & { media_type: "tv" })
  | (ArrayElement<
      operations["search-person"]["responses"]["200"]["content"]["application/json"]["results"]
    > & { media_type: "person" })
  | (ArrayElement<
      operations["search-movie"]["responses"]["200"]["content"]["application/json"]["results"]
    > & { media_type: "movie" });

const MAX_RESULTS = 10;

export function SearchButton() {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 300);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] =
    useState<Awaited<ReturnType<typeof searchAction>>>(undefined);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value !== "") setLoading(true);
    setValue(event.target.value);
  }

  function handleClose() {
    setOpen(false);
    setValue("");
    setData(undefined);
  }

  useEffect(() => {
    if (debouncedValue && debouncedValue !== "") {
      const fetchData = async () => {
        setLoading(true);
        const url = `/api/search?query=${debouncedValue}`;
        const data = await fetch(encodeURI(url)).then(
          (res) => res.json() as ReturnType<typeof searchAction>
        );
        setData(data);
        setLoading(false);
      };

      fetchData();
    } else {
      setData(undefined);
    }
  }, [debouncedValue]);

  const className = "max-sm:items-start max-sm:py-6";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="select-none hover:bg-foreground/[15%]"
        >
          <Search className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        noClose
        outerdivclassname={className}
        className="bg-transparent border-none p-0 shadow-none gap-0 rounded-md w-[32rem]! max-w-[95vw]!"
      >
        <DialogTitle className="hidden">Search Modal</DialogTitle>
        {/* sm:max-w-[600px] max-sm:max-w-[94vw] max-md:top-5 max-md:translate-y-0 max-h-[96dvh] */}
        <div className="flex flex-col w-full gap-2">
          <div className="flex w-full pl-2 justify-between items-end">
            <div className="flex gap-2 items-center">
              <Button
                size="icon"
                variant="ghost"
                className="sm:hidden"
                onClick={handleClose}
              >
                <X className="size-6" />
              </Button>
              <span className="text-xl font-medium">Search</span>
            </div>
            <Select defaultValue="all">
              <SelectTrigger disabled className="w-44 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-150">
                <SelectItem value="all">All</SelectItem>
                <SelectItem disabled value="movies">
                  Movies
                </SelectItem>
                <SelectItem disabled value="tv">
                  Tv Shows
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full relative mr-auto bg-background/60 backdrop-blur-xs rounded-xl group overflow-hidden h-12 border border-input">
            <div className="flex items-center justify-center absolute pointer-events-none top-1/2 -translate-y-1/2 w-12 left-0">
              <Search className="text-gray-300" />
            </div>
            <Input
              className="bg-transparent size-full p-6 pl-12 text-base font-medium border-none!"
              placeholder="What movie is on your mind?"
              value={value}
              onChange={handleInputChange}
              autoFocus
            />
            {value !== "" && (
              <div className="flex items-center cursor-pointer justify-center absolute top-1/2 -translate-y-1/2 w-12 right-0 text-gray-300! hover:text-gray-100!">
                <X
                  className="text-gray-300 cursor-pointer"
                  onClick={() => setValue("")}
                />
              </div>
            )}
          </div>

          <div
            className={cn(
              "flex flex-col gap-2 max-h-[55vh] bg-background/60 overflow-y-auto p-2 rounded-xl overflow-x-hidden border border-input",
              value === "" && "hidden"
            )}
          >
            {loading ? (
              <SearchSkeleton />
            ) : (
              <>
                {data?.results && data.results.length > 0 ? (
                  <>
                    {data?.results
                      ?.sort((a, b) => b.popularity - a.popularity)
                      .slice(0, MAX_RESULTS)
                      .map((result) => (
                        <SearchResult
                          key={result.id}
                          result={result as SearchResultType}
                          onClick={handleClose}
                        />
                      ))}

                    <Link
                      onClick={handleClose}
                      href={"/search?query=" + encodeURI(debouncedValue.trim())}
                      className={cn(
                        "flex gap-2 hover:bg-white/10 transition-colors duration-100 rounded-md p-2 justify-start items-center",
                        data?.results?.length <= MAX_RESULTS && "hidden"
                      )}
                      replace
                    >
                      See more <ArrowRight className="size-4" />
                    </Link>
                  </>
                ) : (
                  <span className="w-full flex justify-center items-center gap-2 px-10 py-24">
                    No results found <HeartCrack className="size-4" />
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// hard-coded for slighty better performance as its only 5 elements
// not a big deal being hard-coded for a small num of elements
// leaving the array loop version if needed in the future
/*
  return Array({length: 5}).map((_, index) => (
    <Skeleton key={index} className="rounded-md w-full h-[488px]" />
  ));
*/
const SearchSkeleton = memo(function SearchSkeleton() {
  return (
    <>
      <Skeleton className="rounded-md w-full h-[488px]" />
      <Skeleton className="rounded-md w-full h-[488px]" />
      <Skeleton className="rounded-md w-full h-[488px]" />
      <Skeleton className="rounded-md w-full h-[488px]" />
      <Skeleton className="rounded-md w-full h-[488px]" />
    </>
  );
});

const SearchResult = memo(function SearchResult({
  onClick,
  result,
}: {
  onClick: () => void;
} & { result: SearchResultType }) {
  const image =
    result.media_type === "person" ? result.profile_path : result.poster_path;
  const title = result.media_type === "movie" ? result.title : result.name;
  const subtitle =
    result.media_type !== "person"
      ? result.overview
      : result.known_for_department;
  const date =
    result.media_type === "movie"
      ? result.release_date
      : result.media_type === "tv"
      ? result.first_air_date
      : undefined;
  const rating =
    result.media_type !== "person" ? result.vote_average : undefined;

  return (
    <Link
      onClick={onClick}
      href={`/${result.media_type}/${result.id}`}
      className="flex gap-2 hover:bg-white/10 transition-colors duration-100 rounded-md p-2 justify-start"
    >
      <CustomImage
        type="poster"
        size="w342"
        className="aspect-2/3 h-[6.5rem] w-auto rounded shrink-0"
        src={image}
        alt={`poster-${result.id}`}
      />
      <div>
        <p className="line-clamp-2">{title}</p>
        <p className="line-clamp-2 text-muted-foreground">{subtitle}</p>
        <div className="mt-1 flex gap-2">
          <RatingBadge rating={rating} />
          <DateBadge date={date} className="text-sm" />
        </div>
      </div>
    </Link>
  );
});
