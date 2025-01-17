import Link from "next/link";

export function GenreBadge(genre: {
  id: number;
  name: string | undefined;
  type: "tv" | "movies";
  static?: boolean;
}) {
  if (!genre.name) return null;

  if (genre.static) {
    return (
      <div className="bg-neutral-700/50 px-2 py-1 rounded-md w-fit">
        {genre.name}
      </div>
    );
  }

  return (
    <Link
      key={genre.id}
      href={`/discover/${genre.type}?genre=${genre.id}`}
      className="bg-neutral-700/50 px-2 py-1 rounded-md w-fit"
    >
      {genre.name}
    </Link>
  );
}
