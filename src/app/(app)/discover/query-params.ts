import { useQueryStates } from 'nuqs';
import {
  createLoader,
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const EXPLORE_PARAMS_DEFAULTS = {
  genres: null,
  sortBy: "popularity",
  sortDirection: "desc",
  page: 1,
  view: "grid",
} as const;

const parseAsSortDirection = createParser({
  parse(queryValue) {
    if (queryValue === "asc" || queryValue === "desc") return queryValue;
    return null;
  },
  serialize(value) {
    return value;
  },
});

const parsePage = createParser({
  parse(queryValue) {
    const page = Number.parseInt(queryValue, 10);
    if (page >= 0) return page;
    return null;
  },
  serialize(value) {
    return String(value);
  },
});

export const parseView = createParser({
  parse(queryValue) {
    if (queryValue === "grid" || queryValue === "list") return queryValue;
    return null;
  },
  serialize(value) {
    return value;
  },
});


export const exploreQueryParsers = {
  genres: parseAsArrayOf(parseAsInteger, ",").withDefault([]).withOptions({
    clearOnDefault: true,
  }),
  sortBy: parseAsString.withDefault(EXPLORE_PARAMS_DEFAULTS.sortBy),
  sortDirection: parseAsSortDirection.withDefault(
    EXPLORE_PARAMS_DEFAULTS.sortDirection
  ),
  page: parsePage.withDefault(EXPLORE_PARAMS_DEFAULTS.page),
  view: parseView.withDefault(EXPLORE_PARAMS_DEFAULTS.view),
}

export const useExploreQueryParams = () =>
  useQueryStates(
    exploreQueryParsers,
    { urlKeys: { sortBy: "sort_by", sortDirection: "order" }, history: "push", shallow: false }
  );

export const exploreQueryParamsCache = createSearchParamsCache(
  exploreQueryParsers,
  { urlKeys: { sortBy: "sort_by", sortDirection: "order" } }
);


export const loadQueryParams = createLoader(exploreQueryParsers)