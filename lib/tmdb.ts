import { MinimalReview, TMDBReview } from "@/app/types/tmdb";
import "server-only";

const baseUrl = process.env.TMDB_BASE_URL;
const apiKey = process.env.TMDB_API_KEY;
const token = process.env.TMDB_ACCESS_TOKEN;

if (!baseUrl || !apiKey || !token) {
  throw new Error("TMDB environment variables are missing.");
}

async function tmdb(path: string, params?: Record<string, string>) {
  const url = new URL(`${baseUrl}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

export async function getMovieDetails(
  movieId: string | number,
  language = "en-US",
) {
  return tmdb(`/movie/${movieId}`, { language });
}

export async function getMovieReviews(
  movieId: string | number,
  page = 1,
  language = "en-US",
): Promise<MinimalReview[]> {
  const data = await tmdb(`/movie/${movieId}/reviews`, {
    page: String(page),
    language,
  });

  const results: TMDBReview[] = Array.isArray(data.results) ? data.results : [];

  return results.map((r) => ({
    author: r.author,
    updated_at: r.updated_at,
    content: r.content,
  }));
}


export async function searchMovie(query: string, page = 1, language = "en-US") {
  const data = await tmdb("/search/movie", {
    query,
    page: String(page),
    language,
  });

  return data.results;
}
