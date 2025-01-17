import { NavbarPreventionLayout } from "@/components/app/navbar-prevention-layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, HeartCrack } from "lucide-react";
import Link from "next/link";

export default function Page404() {
  return (
    <NavbarPreventionLayout className="container flex flex-col justify-center items-center gap-6 min-h-[85vh] md:min-h-[90vh]">
      <h1 className="text-9xl text-muted-foreground font-black tracking-wider">
        404
      </h1>
      <h2 className="text-2xl text-center font-bold tracking-wide max-w-[80vw]">
        We didn&apos;t find what you were looking for.
      </h2>
      <HeartCrack className="text-muted-foreground size-12" />
      <Button variant={"link"} asChild className="text-base">
        <Link href={"/explore"}>Explore Movies <ArrowRight /></Link>
      </Button>
    </NavbarPreventionLayout>
  );
}
