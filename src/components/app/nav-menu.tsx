import { ChevronDown, Film, Tv } from "lucide-react";
import { NavLink } from "../navlink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

export function NavMenu() {
  return (
    <>
      <div className="flex gap-2 max-md:hidden">
        <NavLink
          href="/discover/movies"
          text="Movies"
          Icon={<Film className="size-4" />}
        />
        <NavLink
          href="/discover/tv"
          text="TV Shows"
          Icon={<Tv className="size-4" />}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden flex gap-2 items-center outline-hidden select-none h-10 px-4 py-2 rounded-md transition-colors hover:bg-foreground/[15%] aria-[disabled]:pointer-events-none aria-[disabled]:opacity-50 disabled:pointer-events-none disabled:opacity-50">
          <span>Discover</span>
          <ChevronDown className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card/80 backdrop-blur-md">
          <DropdownMenuItem asChild className="p-3">
            <Link href="/discover/movies">
              <Film className="size-3 mr-1" /> Movies
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="p-3">
            <Link href="/discover/tv">
              <Tv className="size-3 mr-1" /> TV Shows
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
