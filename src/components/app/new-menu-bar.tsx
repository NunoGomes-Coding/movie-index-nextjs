"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Film, LucideIcon, Menu, Tv, X } from "lucide-react";
import { useCallback, useState } from "react";
import Link from "next/link";
import { SearchButton } from "./search-button";
import { NavLink } from "../navlink";

type NavigationItem = {
  title: string;
  icon: LucideIcon;
  // description: string;
  href: string;
  items: Array<{ title: string; href: string }>;
};

const navigationItems: Array<NavigationItem> = [
  {
    title: "Movies",
    icon: Film,
    // description: "",
    href: "/discover/movies",
    items: [
      {
        title: "Popular",
        href: "/discover/movies",
      },
      {
        title: "Top Rated",
        href: "/discover/movies?sort_by=vote_average",
      },
      {
        title: "Action",
        href: "/discover/movies?genres=28",
      },
      {
        title: "Science Fiction",
        href: "/discover/movies?genres=878",
      },
    ],
  },
  {
    title: "TV Series",
    icon: Tv,
    // description: "",
    href: "/discover/tv",
    items: [
      {
        title: "Popular",
        href: "/discover/tv",
      },
      {
        title: "Top Rated",
        href: "/discover/tv?sort_by=vote_average",
      },
      {
        title: "Action & Adventure",
        href: "/discover/tv?genres=10759",
      },
      {
        title: "Drame",
        href: "/discover/tv?genres=18",
      },
    ],
  },
];

export const NewNavBar = () => {
  const [isOpen, setOpen] = useState(false);

  const onClick = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <header
        className={`w-full z-40 fixed top-0 left-0 backdrop-blur-lg h-fit ${
          !isOpen ? "bg-background/50" : "bg-background/80"
        }`}
      >
        <nav className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-2 items-center">
          <div className="justify-start items-center gap-4 flex flex-row">
            <Link
              prefetch
              href="/explore"
              className="font-semibold text-xl xl:text-2xl lowercase"
            >
              movie
              <span className="font-extrabold text-red-700 uppercase">
                index
              </span>
            </Link>
            {/* <NavigationMenu className="lg:flex justify-start items-start hidden">
              <NavigationMenuList className="flex justify-start gap-4 flex-row">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="font-medium text-sm bg-transparent">
                      <item.icon className="mr-2 size-4" />
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="w-[450px]! p-4">
                      <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                        <div className="flex flex-col h-full justify-between">
                          <div className="flex flex-col gap-3">
                            <item.icon className="size-7" />
                            <p className="text-xl">{item.title}</p>
                          </div>
                          <Button size="sm" className="mt-10" asChild>
                            <Link href={item.href}>
                              Explore {item.title}{" "}
                              <ArrowRight className="size-4" />
                            </Link>
                          </Button>
                        </div>
                        <div className="flex flex-col text-sm h-full justify-end">
                          {item.items?.map((subItem) => (
                            <NavigationMenuLink
                              href={subItem.href}
                              key={subItem.title}
                              className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                            >
                              <span>{subItem.title}</span>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu> */}
            <div className="lg:flex justify-start items-start gap-2 hidden">
              {navigationItems.map((item, index) => (
                <NavLink
                  key={index}
                  href={item.href}
                  text={item.title}
                  Icon={<item.icon className="size-4" />}
                  className="text-sm"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end w-full gap-4">
            <SearchButton />
            {/* <Button variant="ghost" className="hidden md:inline">
            Book a demo
            </Button>
            <div className="border-r hidden md:inline"></div>
            <Button variant="outline">Sign in</Button>
            <Button>Get started</Button> */}
          </div>
          <div className="flex w-12 shrink lg:hidden items-end justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen((bool) => !bool)}
              className="hover:bg-foreground/[15%]"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
            {isOpen && (
              <div className="fixed top-20 border-t border-b w-screen right-0 bg-background/80 shadow-lg py-4 px-1 z-20">
                <div className="container flex flex-col gap-8">
                  {navigationItems.map((item) => (
                    <div key={item.title} className="flex flex-col gap-2">
                      <Link
                        href={item.href}
                        onClick={onClick}
                        className="flex justify-between items-center"
                      >
                        <span className="text-xl">{item.title}</span>
                        {/* <ArrowRight className="w-4 h-4 stroke-1" /> */}
                      </Link>
                      {item.items &&
                        item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={onClick}
                            className="flex justify-between items-center group"
                          >
                            <span className="text-muted-foreground group-hover:text-foreground">
                              {subItem.title}
                            </span>
                            <ArrowRight className="w-4 h-4 stroke-1" />
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
      {isOpen && (
        <div
          className="fixed bg-background/80 backdrop-blur-lg z-10 w-screen h-screen lg:hidden" // This is the shade
          onClick={onClick} // Close the menu when clicked outside
        />
      )}
    </>
  );
};
