import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center overflow-hidden">
      <div className="text-center space-y-8 overflow-hidden relative">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          movie
          <span className="font-extrabold text-red-800 uppercase">index</span>
        </h1>
        <p className="md:text-xl text-secondary-foreground">
          Your gateway to endless entertainment
        </p>
        <Button asChild>
          <Link href="/explore">
            Explore Movies <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <div className="absolute mt-0! inset-0 size-full bg-gradient-ellipse-c from-red-950 to-background to-70% -z-10" />
      </div>
    </main>
  );
}
