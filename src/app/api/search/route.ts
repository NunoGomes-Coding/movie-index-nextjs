import { searchAction } from "@/actions/search/search";
// import { rateLimitMiddleware } from "@/middleware/rate-limiter";
import { NextRequest, NextResponse } from "next/server";
import {
  createLoader,
  createParser,
  parseAsString,
} from "nuqs/server";

async function func(req: NextRequest) {
  const { query, page } = loadSearchParams(req);

  if (!query || query.trim() === "") return NextResponse.error();

  return NextResponse.json(await searchAction(query, page), { status: 200 });
}

// export const GET = rateLimitMiddleware(func, 5, 30)
export const GET = func

const parseAsPositiveInteger = createParser({
  parse: (value) => {
    const integer = Number.parseInt(value);
    if (integer <= 0) return null;
    return integer;
  },
  serialize: (value) => {
    return value.toString();
  },
  eq: (a, b) => a === b,
});

const coordinatesSearchParams = {
  query: parseAsString,
  page: parseAsPositiveInteger.withDefault(1),
};

const loadSearchParams = createLoader(coordinatesSearchParams);
