import { MovieIndexIcon } from "@/components/icons/movie-icon";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center overflow-hidden">
      <MovieIndexIcon className="max-h-[50vh] -bottom-[15%] fixed z-auto" />
      <div className="backdrop-blur-lg size-full fixed" />

      <div className="text-center space-y-8 z-10 overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          movie<span className="font-extrabold text-red-800">INDEX</span>
        </h1>
        <p className="md:text-xl text-secondary-foreground">
          Your gateway to endless entertainment
        </p>
        <Button asChild>
          <Link href="/explore">
            Explore Movies <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
