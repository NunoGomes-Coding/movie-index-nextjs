import { NewNavBar } from "@/components/app/new-menu-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <nav className="z-30 fixed inset-0 bg-background/50 backdrop-blur-lg py-4 w-full h-fit">
        <div className="flex justify-between items-center gap-2 container">
          <div className="flex items-center gap-4">
            <Link
              prefetch
              href="/explore"
              className="font-semibold text-lg lg:text-xl xl:text-2xl lowercase"
            >
              Movie
              <span className="font-extrabold text-red-700 uppercase">
                Index
              </span>
            </Link>
            <NavMenu />
          </div>
          <SearchButton />
        </div>
      </nav> */}
      <NewNavBar />
      <main className="flex-grow">{children}</main>
      <footer className="relative flex flex-col items-start gap-1 bg-background mt-4 p-4 border-t w-full text-muted-foreground text-sm">
        <div className="flex flex-wrap justify-between container gap-2">
          <span className="text-foreground">Copyright &copy;Nuno Gomes 2024-2025.</span>
          <span>
            This site does not store any files on its server. All contents are
            provided by non-affiliated third parties.
          </span>
        </div>
      </footer>
    </>
  );
}
