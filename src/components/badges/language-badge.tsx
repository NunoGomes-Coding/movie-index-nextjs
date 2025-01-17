import { hasCountry, MapLangToCountry } from "@/lib/countries";
import Image from "next/image";

// iso_639_1
export function LanguageBadge({
  lang,
  name,
}: {
  lang: string | undefined;
  name: string | undefined;
}) {
  if (!lang) return null;

  return (
    <div
      className="flex justify-center items-center gap-2 bg-neutral-700/50 px-2 py-1 rounded-md w-fit"
      title={name}
    >
      {lang && hasCountry(lang) && (
        <Image
          alt="flag"
          width={16}
          height={16}
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${MapLangToCountry(
            lang
          )}.svg`}
        />
      )}
      <span>{lang?.toUpperCase()}</span>
    </div>
  );
}
