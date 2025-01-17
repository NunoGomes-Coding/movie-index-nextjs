import "server-only";

import createClient from "openapi-fetch";
import type { paths } from "./schema";

const API_BASE_URL = "https://api.themoviedb.org/3" as const;

export const tmdbClient = createClient<paths>({
  baseUrl: API_BASE_URL,
  fetch: (req) =>
    fetch(req.url, { method: req.method, body: req.body, headers: req.headers, next: { revalidate: 3600 } }),
  keepalive: true,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});
